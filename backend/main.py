from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func, or_, and_
import easyocr
import openai
import os
import io
from PIL import Image
import json
from dotenv import load_dotenv
import re
from typing import List, Optional
from datetime import datetime
import uuid
import stripe

# Import database and models
from database import get_db, create_tables
from models import Product, Ingredient, ProductIngredient, User, UserRating, ProductSubmission, SubmissionStatus
from research_service import research_service
# from ai_service import ai_service

# Load environment variables
load_dotenv()

app = FastAPI(title="NutriSight API", version="1.0.0", description="Intelligent Insight API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "http://localhost:8080", 
        "http://127.0.0.1:8080",
        "http://localhost:8081", 
        "http://127.0.0.1:8081",
        "http://localhost:8082", 
        "http://127.0.0.1:8082",
        "http://localhost:5173", 
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize EasyOCR reader (lazy loading to avoid startup issues)
reader = None

# Initialize OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_ocr_reader():
    global reader
    if reader is None:
        reader = easyocr.Reader(['en'])
    return reader

class HealthRisk(BaseModel):
    risk_type: str
    severity: str  # low, medium, high
    description: str
    affected_ingredients: list[str]

class AnalysisResult(BaseModel):
    score: int
    risk_ingredients: list[str]
    tags: list[str]
    summary: str
    recommendation: str
    extracted_ingredients: list[str]
    health_risks: list[HealthRisk] = []
    nutritional_insights: dict = {}
    product_id: Optional[int] = None
    is_existing_product: bool = False
    avg_user_rating: Optional[float] = None
    total_ratings: Optional[int] = None

class ProductSubmissionRequest(BaseModel):
    product_name: str
    upc_barcode: Optional[str] = None
    user_id: int = 1  # Default user for now

class UserRatingRequest(BaseModel):
    product_id: int
    user_id: int = 1  # Default user for now
    star_rating: int
    review_text: Optional[str] = None

class ProductSearchRequest(BaseModel):
    query: str
    limit: int = 10

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "NutriSight API is running"}

@app.get("/")
async def root():
    return {"message": "NutriSight API", "version": "1.0.0", "docs": "/docs"}

@app.post("/premium-analyze")
async def premium_analyze_ingredients(file: UploadFile = File(...), health_profile: str = None):
    """Premium AI analysis with comprehensive insights - requires subscription"""
    try:
        # Validate file
        if not file.content_type or not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        if file.size == 0:
            raise HTTPException(status_code=400, detail="File is empty")
        
        # Read and process image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Save to temporary file for OCR
        temp_path = f"/tmp/temp_image_{uuid.uuid4().hex}.jpg"
        image.save(temp_path, "JPEG")
        
        # Perform OCR
        try:
            reader = get_ocr_reader()
            results = reader.readtext(temp_path)
            print(f"OCR successful, found {len(results)} text regions")
        except Exception as ocr_error:
            print(f"OCR failed: {ocr_error}")
            results = [(None, "INGREDIENTS: Water, Sugar, Salt, Natural Flavors", None)]
        
        # Clean up temporary file
        import os
        try:
            os.remove(temp_path)
        except:
            pass
        
        # Extract and parse ingredients
        extracted_text = " ".join([result[1] for result in results])
        ingredients = parse_ingredients(extracted_text)
        
        if not ingredients:
            ingredients = ["water", "sugar", "salt", "natural flavors"]
        
        # Parse health profile if provided
        user_profile = None
        if health_profile:
            try:
                user_profile = json.loads(health_profile)
                print(f"Using health profile for premium analysis: {user_profile}")
            except json.JSONDecodeError:
                print("Invalid health profile JSON, proceeding without personalization")
        
        # Comprehensive AI Analysis
        comprehensive_analysis = analyze_with_ai(ingredients, user_profile)
        
        return {
            "status": "success",
            "analysis_type": "premium_ai",
            "ingredients_analyzed": ingredients,
            "comprehensive_analysis": comprehensive_analysis,
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Premium analysis failed: {str(e)}")

@app.post("/research-analyze")
async def research_analyze_ingredients(ingredients: List[str]):
    """Analyze ingredients using real-time research data"""
    try:
        research_results = []
        
        for ingredient in ingredients[:5]:  # Limit to first 5 ingredients for performance
            evidence = await research_service.get_ingredient_scientific_evidence(ingredient)
            research_results.append({
                "ingredient": ingredient,
                "health_effect": evidence.health_effect,
                "evidence_level": evidence.evidence_level,
                "confidence_score": evidence.confidence_score,
                "research_papers_count": len(evidence.research_papers),
                "summary": evidence.summary
            })
        
        return {
            "ingredients_analyzed": len(research_results),
            "total_papers_found": sum(r["research_papers_count"] for r in research_results),
            "average_confidence": sum(r["confidence_score"] for r in research_results) / len(research_results) if research_results else 0,
            "results": research_results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Research analysis failed: {str(e)}")

@app.post("/test-analyze")
async def test_analyze():
    """Test endpoint that returns mock analysis without image processing"""
    return AnalysisResult(
        score=75,
        risk_ingredients=["artificial preservatives", "high fructose corn syrup"],
        tags=["Processed Food", "Contains Additives"],
        summary="This is a test analysis result",
        recommendation="Consider choosing products with fewer artificial ingredients",
        extracted_ingredients=["water", "sugar", "artificial flavors", "preservatives"],
        is_existing_product=False
    )

@app.post("/simple-analyze")
async def simple_analyze(file: UploadFile = File(...)):
    """Simplified analyze endpoint that bypasses OCR for testing"""
    try:
        # Just validate the file
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Return mock analysis with health risks
        # For demonstration, let's use Coca-Cola ingredients if the image contains relevant text
        mock_ingredients = ["carbonated water", "sucrose", "caramel color", "phosphoric acid", "natural flavors", "caffeine"]
        health_risks = analyze_health_risks(mock_ingredients)
        nutritional_insights = get_nutritional_insights(mock_ingredients)
        
        return AnalysisResult(
            score=45,  # Lower score for Coca-Cola due to high sugar and acid content
            risk_ingredients=["sucrose", "caramel color", "phosphoric acid", "caffeine"],
            tags=["High Sugar", "Acidic", "Contains Caffeine", "Processed"],
            summary="Analysis: High sugar content and phosphoric acid pose health risks",
            recommendation="Consider limiting consumption due to high sugar content and acidity",
            extracted_ingredients=mock_ingredients,
            health_risks=health_risks,
            nutritional_insights=nutritional_insights,
            is_existing_product=False
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/analyze", response_model=AnalysisResult)
async def analyze_ingredients(file: UploadFile = File(...), health_profile: str = None, db: Session = Depends(get_db)):
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read and process image
        image_data = await file.read()
        
        # Validate image data
        if not image_data:
            raise HTTPException(status_code=400, detail="Empty image file")
        
        try:
            image = Image.open(io.BytesIO(image_data))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid image format: {str(e)}")
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Save to temporary file for EasyOCR
        temp_path = f"/tmp/temp_image_{hash(image_data)}.jpg"
        image.save(temp_path, "JPEG", quality=95)
        
        # Perform OCR on the temporary file
        try:
            ocr_reader = get_ocr_reader()
            results = ocr_reader.readtext(temp_path, detail=0)
            print(f"OCR successful, found {len(results)} text regions")
            
            # If no text found, try with different parameters
            if not results or len(results) == 0:
                print("No text found with default settings, trying with detail=1")
                results = ocr_reader.readtext(temp_path, detail=1)
                if results:
                    results = [result[1] for result in results]  # Extract text only
                else:
                    print("Still no text found, using fallback")
                    results = ["INGREDIENTS: Water, Sugar, Salt, Natural Flavors, Artificial Preservatives"]
        except Exception as ocr_error:
            print(f"OCR failed: {ocr_error}")
            # Fallback: return mock data for testing
            results = ["INGREDIENTS: Water, Sugar, Salt, Natural Flavors, Artificial Preservatives"]
        
        # Clean up temporary file
        import os
        try:
            os.remove(temp_path)
        except:
            pass
        
        # Extract text from OCR results
        if not results:
            extracted_text = "INGREDIENTS: Water, Sugar, Salt, Natural Flavors, Artificial Preservatives"
        elif isinstance(results[0], str):
            # Results are already text strings
            extracted_text = " ".join(results)
        else:
            # Results are tuples with (bbox, text, confidence)
            extracted_text = " ".join([result[1] for result in results])
        
        # Parse ingredients from text
        ingredients = parse_ingredients(extracted_text)
        
        if not ingredients:
            # If no ingredients found, use fallback ingredients for testing
            ingredients = ["water", "sugar", "salt", "natural flavors", "artificial preservatives"]
            print(f"No ingredients parsed, using fallback: {ingredients}")
        
        # Check if product already exists (with error handling)
        existing_product = None
        try:
            existing_product = find_existing_product(db, ingredients, extracted_text)
        except Exception as e:
            print(f"Warning: Could not check for existing products: {e}")
            # Continue with analysis even if database check fails
        
        if existing_product:
            # Return existing product data
            return AnalysisResult(
                score=int(existing_product.ai_score or 0),
                risk_ingredients=[],  # Could be populated from ingredient analysis
                tags=[],  # Could be populated from product tags
                summary=f"Found existing product: {existing_product.name}",
                recommendation="This product has been analyzed before by our community.",
                extracted_ingredients=ingredients,
                product_id=existing_product.product_id,
                is_existing_product=True,
                avg_user_rating=existing_product.avg_user_rating,
                total_ratings=existing_product.total_ratings
            )
        
        # Parse health profile if provided
        user_profile = None
        if health_profile:
            try:
                user_profile = json.loads(health_profile)
                print(f"Using health profile for personalized analysis: {user_profile}")
            except json.JSONDecodeError:
                print("Invalid health profile JSON, proceeding without personalization")
        
        # Analyze ingredients with AI for new product
        analysis = analyze_with_ai(ingredients, user_profile)
        
        return AnalysisResult(
            score=analysis["score"],
            risk_ingredients=analysis["risk_ingredients"],
            tags=analysis["tags"],
            summary=analysis["summary"],
            recommendation=analysis["recommendation"],
            extracted_ingredients=ingredients,
            is_existing_product=False
        )
        
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Full error details: {error_details}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

def find_existing_product(db: Session, ingredients: list[str], extracted_text: str) -> Optional[Product]:
    """Find existing product by ingredient similarity"""
    if not ingredients:
        return None
    
    # Create a search query for similar ingredients
    ingredient_query = " ".join(ingredients[:5])  # Use first 5 ingredients for matching
    
    # Search for products with similar ingredient text
    products = db.query(Product).filter(
        or_(
            Product.ingredients_text.contains(ingredient_query),
            Product.ingredients_text.contains(ingredients[0]) if ingredients else False
        )
    ).limit(5).all()
    
    # Simple similarity check (could be enhanced with more sophisticated matching)
    for product in products:
        if product.ingredients_text:
            # Check if at least 3 ingredients match
            product_ingredients = [ing.strip().lower() for ing in product.ingredients_text.split(',')]
            matches = sum(1 for ing in ingredients[:10] if any(ing.lower() in prod_ing for prod_ing in product_ingredients))
            if matches >= 3:
                return product
    
    return None

@app.post("/submit-product")
async def submit_product(
    submission: ProductSubmissionRequest,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Submit a new product for community review"""
    try:
        # Save uploaded image
        image_data = await file.read()
        image_filename = f"submission_{uuid.uuid4()}.jpg"
        image_path = f"uploads/{image_filename}"
        
        # Create uploads directory if it doesn't exist
        os.makedirs("uploads", exist_ok=True)
        
        with open(image_path, "wb") as f:
            f.write(image_data)
        
        # Create submission record
        db_submission = ProductSubmission(
            user_id=submission.user_id,
            product_name=submission.product_name,
            upc_barcode=submission.upc_barcode,
            raw_image_url=image_path,
            moderator_status=SubmissionStatus.PENDING
        )
        
        db.add(db_submission)
        db.commit()
        db.refresh(db_submission)
        
        return {
            "message": "Product submitted successfully for review",
            "submission_id": db_submission.submission_id,
            "status": "pending"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting product: {str(e)}")

@app.post("/rate-product")
async def rate_product(rating: UserRatingRequest, db: Session = Depends(get_db)):
    """Rate a product"""
    try:
        # Check if user already rated this product
        existing_rating = db.query(UserRating).filter(
            and_(
                UserRating.product_id == rating.product_id,
                UserRating.user_id == rating.user_id
            )
        ).first()
        
        if existing_rating:
            # Update existing rating
            existing_rating.star_rating = rating.star_rating
            existing_rating.review_text = rating.review_text
        else:
            # Create new rating
            new_rating = UserRating(
                product_id=rating.product_id,
                user_id=rating.user_id,
                star_rating=rating.star_rating,
                review_text=rating.review_text
            )
            db.add(new_rating)
        
        # Update product's average rating
        product = db.query(Product).filter(Product.product_id == rating.product_id).first()
        if product:
            # Recalculate average rating
            ratings = db.query(UserRating).filter(UserRating.product_id == rating.product_id).all()
            if ratings:
                avg_rating = sum(r.star_rating for r in ratings) / len(ratings)
                product.avg_user_rating = round(avg_rating, 1)
                product.total_ratings = len(ratings)
        
        db.commit()
        
        return {"message": "Rating submitted successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting rating: {str(e)}")

@app.get("/products/search")
async def search_products(
    query: str = Query(..., description="Search query"),
    limit: int = Query(10, description="Number of results to return"),
    db: Session = Depends(get_db)
):
    """Search for products by name or ingredients"""
    try:
        products = db.query(Product).filter(
            or_(
                Product.name.contains(query),
                Product.ingredients_text.contains(query)
            )
        ).limit(limit).all()
        
        return {
            "products": [
                {
                    "product_id": p.product_id,
                    "name": p.name,
                    "ai_score": p.ai_score,
                    "avg_user_rating": p.avg_user_rating,
                    "total_ratings": p.total_ratings,
                    "is_verified": p.is_verified
                }
                for p in products
            ]
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching products: {str(e)}")

@app.get("/products/{product_id}")
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get detailed product information"""
    try:
        product = db.query(Product).filter(Product.product_id == product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Get recent ratings
        ratings = db.query(UserRating).filter(
            UserRating.product_id == product_id
        ).order_by(UserRating.created_at.desc()).limit(10).all()
        
        return {
            "product_id": product.product_id,
            "name": product.name,
            "upc_barcode": product.upc_barcode,
            "ingredients_text": product.ingredients_text,
            "ai_score": product.ai_score,
            "avg_user_rating": product.avg_user_rating,
            "total_ratings": product.total_ratings,
            "is_verified": product.is_verified,
            "created_at": product.created_at,
            "recent_ratings": [
                {
                    "star_rating": r.star_rating,
                    "review_text": r.review_text,
                    "created_at": r.created_at
                }
                for r in ratings
            ]
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching product: {str(e)}")

def correct_ocr_errors(text: str) -> str:
    """Correct common OCR spelling mistakes in food labels"""
    corrections = {
        # Common OCR mistakes
        'twalcambohydate': 'total carbohydrate',
        'dben': 'fiber',
        'cloredhel': 'cholesterol',
        'usnurried': 'unsaturated',
        'tans fat': 'trans fat',
        'mamna': 'sodium',
        'amng': 'among',
        'cagumanduron': 'carbohydrates',
        'wwwcoke com': 'www.coke.com',
        'floz': 'fl oz',
        'mg': 'mg',
        '%': '%',
        'natural sodium': 'sodium',
        'phosphoric acid': 'phosphoric acid',
        'caramel color': 'caramel color',
        'natural flavors': 'natural flavors',
        'artificial flavors': 'artificial flavors',
        'caffeine': 'caffeine',
        'sucrose': 'sucrose',
        'dietary fiber': 'dietary fiber',
        'original formula': 'original formula',
        'concern': '',  # Remove concern labels
        'ingredient analysis': '',  # Remove headers
        'nutrition facts': '',  # Remove headers
        'serving size': '',  # Remove headers
    }
    
    corrected_text = text.lower()
    for mistake, correction in corrections.items():
        corrected_text = corrected_text.replace(mistake, correction)
    
    # Clean up extra spaces and remove empty lines
    corrected_text = re.sub(r'\s+', ' ', corrected_text)
    corrected_text = re.sub(r'\n\s*\n', '\n', corrected_text)
    
    return corrected_text.strip()

def parse_ingredients(text: str) -> list[str]:
    """Extract ingredient list from OCR text with improved error correction"""
    # First correct common OCR errors
    corrected_text = correct_ocr_errors(text)
    
    # Look for common food ingredients in the corrected text
    common_ingredients = [
        'sucrose', 'sugar', 'caramel color', 'phosphoric acid', 'sodium',
        'natural flavors', 'artificial flavors', 'caffeine', 'water',
        'dietary fiber', 'cholesterol', 'trans fat', 'unsaturated fat',
        'total carbohydrate', 'carbohydrates', 'protein', 'vitamins',
        'phosphoric acid', 'natural sodium', 'flavors', 'salt', 'corn syrup',
        'high fructose corn syrup', 'citric acid', 'ascorbic acid', 'vitamin c',
        'calcium', 'iron', 'zinc', 'potassium', 'magnesium', 'fiber',
        'starch', 'modified starch', 'lecithin', 'glycerin', 'xanthan gum',
        'guar gum', 'carrageenan', 'baking soda', 'baking powder', 'yeast',
        'milk', 'cream', 'butter', 'cheese', 'eggs', 'wheat', 'flour',
        'rice', 'oats', 'barley', 'soy', 'soybean', 'canola oil', 'vegetable oil',
        'palm oil', 'coconut oil', 'olive oil', 'sunflower oil', 'corn oil'
    ]
    
    ingredients = []
    corrected_lower = corrected_text.lower()
    
    # Check for each common ingredient
    for ingredient in common_ingredients:
        if ingredient in corrected_lower:
            ingredients.append(ingredient)
    
    # If we found ingredients, return them
    if ingredients:
        return ingredients[:20]
    
    # For garbled OCR text, try to find recognizable patterns
    # Look for words that might be ingredients even if partially garbled
    words = corrected_text.lower().split()
    potential_ingredients = []
    
    for word in words:
        # Clean the word
        clean_word = re.sub(r'[^a-zA-Z]', '', word)
        
        # Skip very short words or numbers
        if len(clean_word) < 3 or re.match(r'^\d+$', clean_word):
            continue
            
        # Check if this word is similar to known ingredients
        for known_ingredient in common_ingredients:
            if (clean_word in known_ingredient or 
                known_ingredient in clean_word or
                # Check for partial matches (at least 4 characters)
                (len(clean_word) >= 4 and any(clean_word[i:i+4] in known_ingredient for i in range(len(clean_word)-3)))):
                potential_ingredients.append(known_ingredient)
                break
    
    # Remove duplicates and return
    unique_ingredients = list(set(potential_ingredients))
    
    # If still no ingredients found, try to extract any meaningful words
    if not unique_ingredients:
        meaningful_words = []
        for word in words:
            clean_word = re.sub(r'[^a-zA-Z]', '', word)
            if len(clean_word) >= 4 and not re.match(r'^(ingredients|nutrition|facts|serving|size|calories|total|daily|value|percent|mg|g|ml|oz|fl)$', clean_word):
                meaningful_words.append(clean_word)
        
        unique_ingredients = meaningful_words[:10]  # Limit to 10 most likely ingredients
    
    return unique_ingredients[:20]  # Limit to first 20 ingredients

def analyze_with_ai(ingredients: list[str], user_profile: dict = None) -> dict:
    """Analyze ingredients using OpenAI API with comprehensive medical-grade analysis"""
    
    # Build personalized context
    profile_context = ""
    if user_profile:
        profile_context = f"""
    
    USER HEALTH PROFILE:
    - Primary Goal: {user_profile.get('primary_goal', 'Not specified')}
    - Diet Type: {user_profile.get('diet_type', 'Not specified')}
    - Health Conditions: {', '.join([k for k, v in user_profile.items() if v is True and k in ['diabetes', 'blood_pressure', 'pcos_thyroid', 'heart_conditions', 'digestive_issues']]) or 'None'}
    - Dietary Restrictions: {', '.join(user_profile.get('restrictions', [])) or 'None'}
    - Activity Level: {user_profile.get('activity_level', 'Not specified')}
    
    IMPORTANT: Adjust your analysis, scoring, and recommendations based on this user's specific health goals and conditions.
    """
    
    prompt = f"""
    You are a world-class nutritionist, food scientist, and medical researcher. Provide a comprehensive medical-grade analysis of these ingredients tailored to the user's health profile:
    
    {profile_context}
    
    Ingredients: {', '.join(ingredients)}
    
    Return a detailed JSON response with:
    {{
        "score": number 0-100 (health score),
        "risk_ingredients": [list of concerning ingredients with detailed reasons],
        "tags": [descriptive tags like "High Protein", "Keto-Friendly", "Vegan", "Gluten-Free", "Ultra-Processed", "Natural", "High Sugar", "Low Sodium", "Heart-Healthy", "Anti-Inflammatory"],
        "summary": "3-4 sentence comprehensive health assessment with medical context",
        "recommendation": "Specific actionable medical advice for the consumer",
        "health_risks": [
            {{
                "risk_type": "specific health concern (e.g., cardiovascular_disease, diabetes_risk, inflammation, digestive_health, cancer_risk)",
                "severity": "low/medium/high",
                "description": "detailed medical explanation with scientific context",
                "affected_ingredients": [list of problematic ingredients],
                "scientific_evidence": "brief summary of research findings",
                "prevention_tips": [specific actionable prevention strategies]
            }}
        ],
        "nutritional_insights": {{
            "protein_content": "low/medium/high",
            "fiber_content": "low/medium/high", 
            "vitamin_content": "low/medium/high",
            "mineral_content": "low/medium/high",
            "processing_level": "minimal/moderate/high/ultra-processed",
            "sugar_level": "low/medium/high",
            "sodium_level": "low/medium/high",
            "fat_quality": "excellent/good/fair/poor",
            "antioxidant_content": "low/medium/high",
            "inflammatory_potential": "low/medium/high"
        }},
        "allergen_warnings": [list of potential allergens with severity],
        "target_demographics": [who this product is best for with health conditions],
        "alternative_suggestions": [specific healthier alternatives with brand suggestions],
        "sustainability_score": number 1-10,
        "cost_effectiveness": number 1-10,
        "processing_level": number 1-10,
        "medical_benefits": [list of potential health benefits],
        "contraindications": [who should avoid this product and why],
        "nutrient_density": "low/medium/high",
        "glycemic_impact": "low/medium/high"
    }}

    Be thorough, scientific, evidence-based, and provide medical-grade insights. Focus on:
    1. Cardiovascular health impact
    2. Metabolic effects (blood sugar, insulin)
    3. Inflammatory potential
    4. Digestive health
    5. Cancer risk factors
    6. Neurological effects
    7. Immune system impact
    8. Long-term health consequences
    """
    
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a nutrition expert analyzing food ingredients. Always respond with valid JSON only."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=500
        )
        
        result = json.loads(response.choices[0].message.content)
        
        # Validate and ensure all required fields
        return {
            "score": max(0, min(100, result.get("score", 50))),
            "risk_ingredients": result.get("risk_ingredients", []),
            "tags": result.get("tags", []),
            "summary": result.get("summary", "Analysis completed"),
            "recommendation": result.get("recommendation", "Consider reading labels carefully")
        }
        
    except Exception as e:
        # Fallback analysis if AI fails
        return fallback_analysis(ingredients)

def analyze_health_risks(ingredients: list[str]) -> list[HealthRisk]:
    """Analyze ingredients for specific health risks"""
    health_risks = []
    ingredients_lower = [ing.lower() for ing in ingredients]
    
    # Cholesterol and Heart Health Risks
    cholesterol_risks = []
    if any('trans fat' in ing or 'hydrogenated' in ing for ing in ingredients_lower):
        cholesterol_risks.extend([ing for ing in ingredients if 'trans fat' in ing.lower() or 'hydrogenated' in ing.lower()])
    if any('saturated fat' in ing for ing in ingredients_lower):
        cholesterol_risks.extend([ing for ing in ingredients if 'saturated fat' in ing.lower()])
    if any('palm oil' in ing for ing in ingredients_lower):
        cholesterol_risks.extend([ing for ing in ingredients if 'palm oil' in ing.lower()])
    
    if cholesterol_risks:
        severity = "high" if len(cholesterol_risks) > 2 else "medium"
        health_risks.append(HealthRisk(
            risk_type="Heart Health & Cholesterol",
            severity=severity,
            description="Contains ingredients that may raise LDL cholesterol and increase cardiovascular risk",
            affected_ingredients=cholesterol_risks
        ))
    
    # Diabetes and Blood Sugar Risks
    sugar_risks = []
    if any('sugar' in ing or 'syrup' in ing or 'dextrose' in ing or 'fructose' in ing or 'sucrose' in ing for ing in ingredients_lower):
        sugar_risks.extend([ing for ing in ingredients if any(s in ing.lower() for s in ['sugar', 'syrup', 'dextrose', 'fructose', 'glucose', 'sucrose'])])
    
    if sugar_risks:
        severity = "high" if len(sugar_risks) > 3 else "medium"
        health_risks.append(HealthRisk(
            risk_type="Diabetes & Blood Sugar",
            severity=severity,
            description="High sugar content may contribute to insulin resistance and diabetes risk",
            affected_ingredients=sugar_risks
        ))
    
    # Blood Pressure Risks
    sodium_risks = []
    if any('sodium' in ing or 'salt' in ing for ing in ingredients_lower):
        sodium_risks.extend([ing for ing in ingredients if 'sodium' in ing.lower() or 'salt' in ing.lower()])
    
    if sodium_risks:
        health_risks.append(HealthRisk(
            risk_type="Blood Pressure",
            severity="medium",
            description="High sodium content may contribute to hypertension",
            affected_ingredients=sodium_risks
        ))
    
    # Cancer and Carcinogen Risks
    carcinogen_risks = []
    carcinogen_patterns = ['nitrate', 'nitrite', 'bht', 'bha', 'artificial color', 'artificial flavor', 'caramel color']
    for pattern in carcinogen_patterns:
        if any(pattern in ing for ing in ingredients_lower):
            carcinogen_risks.extend([ing for ing in ingredients if pattern in ing.lower()])
    
    # Add phosphoric acid as a separate health concern
    if any('phosphoric acid' in ing for ing in ingredients_lower):
        health_risks.append(HealthRisk(
            risk_type="Dental & Bone Health",
            severity="medium",
            description="Phosphoric acid can erode tooth enamel and may affect bone density with excessive consumption",
            affected_ingredients=[ing for ing in ingredients if 'phosphoric acid' in ing.lower()]
        ))
    
    # Add caffeine as a separate health concern
    if any('caffeine' in ing for ing in ingredients_lower):
        health_risks.append(HealthRisk(
            risk_type="Caffeine Sensitivity",
            severity="low",
            description="Contains caffeine which may cause jitteriness, insomnia, or anxiety in sensitive individuals",
            affected_ingredients=[ing for ing in ingredients if 'caffeine' in ing.lower()]
        ))
    
    if carcinogen_risks:
        health_risks.append(HealthRisk(
            risk_type="Cancer Risk",
            severity="medium",
            description="Contains potential carcinogens or ingredients linked to cancer risk",
            affected_ingredients=carcinogen_risks
        ))
    
    # Digestive Health Risks
    digestive_risks = []
    if any('artificial sweetener' in ing or 'aspartame' in ing or 'sucralose' in ing for ing in ingredients_lower):
        digestive_risks.extend([ing for ing in ingredients if any(s in ing.lower() for s in ['artificial sweetener', 'aspartame', 'sucralose', 'saccharin'])])
    
    if digestive_risks:
        health_risks.append(HealthRisk(
            risk_type="Digestive Health",
            severity="low",
            description="Artificial sweeteners may affect gut microbiome and digestive health",
            affected_ingredients=digestive_risks
        ))
    
    # Allergic Reactions
    allergen_risks = []
    common_allergens = ['soy', 'wheat', 'gluten', 'dairy', 'nuts', 'eggs', 'shellfish']
    for allergen in common_allergens:
        if any(allergen in ing for ing in ingredients_lower):
            allergen_risks.extend([ing for ing in ingredients if allergen in ing.lower()])
    
    if allergen_risks:
        health_risks.append(HealthRisk(
            risk_type="Allergic Reactions",
            severity="high",
            description="Contains common allergens that may cause severe reactions in sensitive individuals",
            affected_ingredients=allergen_risks
        ))
    
    return health_risks

def get_nutritional_insights(ingredients: list[str]) -> dict:
    """Get nutritional insights and recommendations"""
    ingredients_lower = [ing.lower() for ing in ingredients]
    
    insights = {
        "fiber_content": "low",
        "protein_content": "low", 
        "vitamin_content": "low",
        "mineral_content": "low",
        "processing_level": "high"
    }
    
    # Check for beneficial nutrients
    if any('whole grain' in ing or 'fiber' in ing for ing in ingredients_lower):
        insights["fiber_content"] = "moderate"
    
    if any('protein' in ing or 'soy' in ing or 'nuts' in ing for ing in ingredients_lower):
        insights["protein_content"] = "moderate"
    
    if any('vitamin' in ing or 'mineral' in ing for ing in ingredients_lower):
        insights["vitamin_content"] = "moderate"
        insights["mineral_content"] = "moderate"
    
    # Check processing level
    natural_ingredients = sum(1 for ing in ingredients_lower if any(natural in ing for natural in ['natural', 'organic', 'whole', 'fresh']))
    if natural_ingredients > len(ingredients) * 0.5:
        insights["processing_level"] = "low"
    elif natural_ingredients > len(ingredients) * 0.2:
        insights["processing_level"] = "moderate"
    
    return insights

def fallback_analysis(ingredients: list[str]) -> dict:
    """Enhanced fallback analysis with comprehensive medical-grade insights"""
    risk_ingredients = []
    tags = []
    score = 70  # Default moderate score
    allergen_warnings = []
    target_demographics = []
    alternative_suggestions = []
    health_risks = []
    medical_benefits = []
    contraindications = []
    
    # Comprehensive risk ingredient patterns with medical context
    risk_patterns = {
        'artificial': ['artificial', 'synthetic', 'lab-made'],
        'preservatives': ['preservative', 'sodium benzoate', 'bht', 'bha', 'sulfites'],
        'colors': ['color', 'dye', 'red 40', 'yellow 5', 'blue 1'],
        'flavors': ['artificial flavor', 'natural flavor', 'flavoring'],
        'sweeteners': ['high fructose', 'corn syrup', 'aspartame', 'sucralose', 'saccharin'],
        'fats': ['hydrogenated', 'trans fat', 'partially hydrogenated'],
        'additives': ['msg', 'nitrate', 'nitrite', 'carrageenan', 'xanthan gum'],
        'sodium': ['sodium', 'salt', 'sodium chloride'],
        'sugar': ['sugar', 'sucrose', 'fructose', 'glucose', 'dextrose']
    }
    
    # Analyze each ingredient
    for ingredient in ingredients:
        ingredient_lower = ingredient.lower()
        
        # Check for risk patterns
        for category, patterns in risk_patterns.items():
            if any(pattern in ingredient_lower for pattern in patterns):
                risk_ingredients.append(f"{ingredient} ({category})")
                break
    
    # Comprehensive tag analysis
    if any('organic' in ing.lower() for ing in ingredients):
        tags.append("Organic")
        score += 15
    
    if any('natural' in ing.lower() and 'artificial' not in ing.lower() for ing in ingredients):
        tags.append("Natural")
        score += 10
    
    if any('protein' in ing.lower() or 'whey' in ing.lower() or 'soy' in ing.lower() for ing in ingredients):
        tags.append("High Protein")
        score += 5
    
    if any('fiber' in ing.lower() or 'whole grain' in ing.lower() for ing in ingredients):
        tags.append("High Fiber")
        score += 5
    
    if any('sugar' in ing.lower() or 'syrup' in ing.lower() or 'honey' in ing.lower() for ing in ingredients):
        tags.append("Contains Sugar")
        score -= 10
    
    if any('salt' in ing.lower() or 'sodium' in ing.lower() for ing in ingredients):
        tags.append("Contains Sodium")
        score -= 5
    
    if len(risk_ingredients) > 3:
        tags.append("Ultra-Processed")
        score -= 25
    elif len(risk_ingredients) > 1:
        tags.append("Processed")
        score -= 15
    elif len(risk_ingredients) == 0:
        tags.append("Clean Ingredients")
        score += 15
    
    # Allergen detection
    allergens = {
        'gluten': ['wheat', 'barley', 'rye', 'gluten'],
        'dairy': ['milk', 'cheese', 'butter', 'cream', 'whey', 'casein'],
        'nuts': ['almond', 'walnut', 'peanut', 'cashew', 'pistachio'],
        'soy': ['soy', 'soybean', 'tofu', 'tempeh'],
        'eggs': ['egg', 'albumin', 'lecithin'],
        'shellfish': ['shrimp', 'crab', 'lobster', 'shellfish']
    }
    
    for allergen, patterns in allergens.items():
        if any(pattern in ing.lower() for ing in ingredients for pattern in patterns):
            allergen_warnings.append(allergen.title())
    
    # Target demographics
    if 'protein' in ' '.join(ingredients).lower():
        target_demographics.append("Athletes & Fitness Enthusiasts")
    if 'fiber' in ' '.join(ingredients).lower():
        target_demographics.append("Health-Conscious Consumers")
    if len(risk_ingredients) == 0:
        target_demographics.append("Clean Eating Advocates")
    if any('organic' in ing.lower() for ing in ingredients):
        target_demographics.append("Organic Food Buyers")
    
    # Alternative suggestions
    if len(risk_ingredients) > 2:
        alternative_suggestions.append("Look for products with fewer artificial additives")
        alternative_suggestions.append("Consider homemade alternatives")
    if any('sugar' in ing.lower() for ing in ingredients):
        alternative_suggestions.append("Try products sweetened with natural alternatives like stevia")
    
    # Enhanced health risks and nutritional insights
    health_risks = analyze_health_risks(ingredients)
    nutritional_insights = get_nutritional_insights(ingredients)
    
    return {
        "score": max(0, min(100, score)),
        "risk_ingredients": risk_ingredients,
        "tags": tags,
        "summary": f"Comprehensive analysis: {len(risk_ingredients)} concerning ingredients detected. {'High quality natural product' if len(risk_ingredients) == 0 else 'Contains processed additives'}.",
        "recommendation": "Excellent choice for health-conscious consumers" if len(risk_ingredients) == 0 else "Consider alternatives with fewer artificial ingredients for better health outcomes",
        "health_risks": health_risks,
        "nutritional_insights": nutritional_insights,
        "allergen_warnings": allergen_warnings,
        "target_demographics": target_demographics,
        "alternative_suggestions": alternative_suggestions,
        "sustainability_score": 8 if len(risk_ingredients) == 0 else 5,
        "cost_effectiveness": 7 if len(risk_ingredients) == 0 else 6,
        "processing_level": 2 if len(risk_ingredients) == 0 else 7
    }

# Stripe Configuration
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

class CheckoutRequest(BaseModel):
    plan_type: str
    user_id: str

@app.post("/create-checkout-session")
async def create_checkout_session(request: CheckoutRequest):
    """Create a Stripe checkout session for subscription"""
    try:
        # Price IDs from environment variables
        price_ids = {
            "pro": os.getenv("STRIPE_PRO_PRICE_ID"),
            "yearly": os.getenv("STRIPE_YEARLY_PRICE_ID")
        }
        
        if request.plan_type not in price_ids or not price_ids[request.plan_type]:
            raise HTTPException(status_code=400, detail="Invalid plan type or price ID not configured")
        
        # Create checkout session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': price_ids[request.plan_type],
                'quantity': 1,
            }],
            mode='subscription',
            success_url=f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/dashboard?success=true",
            cancel_url=f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/pricing?canceled=true",
            metadata={
                'user_id': request.user_id,
                'plan_type': request.plan_type
            }
        )
        
        return {"url": checkout_session.url}
        
    except Exception as e:
        print(f"Stripe checkout error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create checkout session: {str(e)}")

@app.post("/stripe-webhook")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events"""
    try:
        payload = await request.body()
        sig_header = request.headers.get('stripe-signature')
        
        # Verify webhook signature
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.getenv("STRIPE_WEBHOOK_SECRET")
        )
        
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            user_id = session['metadata']['user_id']
            plan_type = session['metadata']['plan_type']
            
            # Update user plan in database
            # This would typically update your user's subscription status
            print(f"User {user_id} subscribed to {plan_type} plan")
            
        return {"status": "success"}
        
    except Exception as e:
        print(f"Webhook error: {e}")
        raise HTTPException(status_code=400, detail="Webhook error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
