# NutriSight - Intelligent  Insight

An AI-powered web app that scans food ingredient labels using OCR and AI to provide comprehensive health analysis, risk assessments, and personalized recommendations.

> **🚀 Latest Update**: Enhanced dashboard with real-time analytics and improved user experience!

## Features

- 📸 Upload or capture images of ingredient labels using camera or file upload
- 🔍 **OCR text extraction** with intelligent ingredient parsing
- 🤖 AI-powered ingredient analysis with comprehensive health scoring
- ⚠️ **Advanced Health Risk Analysis**: Cholesterol, diabetes, blood pressure, cancer risks
- 🏥 **Medical-Grade Insights**: Heart health, digestive health, allergic reactions
- 📊 Color-coded health indicators with detailed risk assessments
- 📱 Mobile-friendly responsive design with real-time camera capture
- 🏪 **Product Database**: Check if products already exist in community database
- ⭐ **User Ratings**: Rate products and read community reviews
- 📝 **Product Submission**: Submit new products for community review
- 🔍 **Product Search**: Search existing products by name or ingredients
- 👥 **Community-Driven**: Crowdsourced data with moderation system
- 🎨 **NutriSight Branding**: Professional logo and color scheme

## Current Status

✅ **Working Features:**
- Image upload and camera capture
- AI ingredient analysis with comprehensive health risk assessment
- Advanced health risk analysis (cholesterol, diabetes, blood pressure, cancer)
- Medical-grade insights and nutritional profiling
- Community rating system
- Product database and search
- Admin dashboard for moderation
- Real-time camera functionality
- NutriSight branding and professional UI

⚠️ **In Development:**
- Full OCR text extraction (currently using enhanced fallback)
- Complete product matching with database

## Project Structure

```
NutriSight/
├── frontend/          # React + Tailwind CSS
├── backend/           # FastAPI + Python
├── requirements.txt   # Python dependencies
└── README.md         # This file
```

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

5. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`

## API Endpoints

### Core Analysis
- `POST /analyze` - Upload image and get ingredient analysis
- `GET /health` - Health check endpoint

### Product Management
- `GET /products/search` - Search products by name or ingredients
- `GET /products/{product_id}` - Get detailed product information
- `POST /submit-product` - Submit new product for community review
- `POST /rate-product` - Rate a product with stars and review

### Database Schema
- **Products**: Main product database with AI scores and community ratings
- **Ingredients**: Central knowledge base of ingredients with risk levels
- **User Ratings**: Community ratings and reviews
- **Product Submissions**: Queue for new product submissions awaiting moderation

## Environment Variables

Create a `.env` file in the backend directory:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Technologies Used

### Backend
- FastAPI - Modern Python web framework
- EasyOCR - OCR text extraction
- OpenAI API - AI ingredient analysis
- Pillow - Image processing
- Uvicorn - ASGI server
- SQLAlchemy - Database ORM
- SQLite - Database (easily upgradeable to PostgreSQL)

### Frontend
- React 18 - UI framework
- Tailwind CSS - Styling
- Vite - Build tool
- Axios - HTTP client

## Usage

### Basic Scanning
1. Open the app in your browser
2. Upload an image of an ingredient label or take a photo using the camera
3. Wait for OCR processing and AI analysis
4. View the health score, warnings, and recommendations

### Community Features
- **Existing Products**: If the product exists in our database, you'll see community ratings and reviews
- **Rate Products**: Leave star ratings and written reviews for products
- **Submit New Products**: Help the community by submitting new products for review
- **Search Products**: Use the search feature to find products by name or ingredients

### Camera Features
- **Real-time Capture**: Use your device's camera to capture ingredient labels
- **Mobile Optimized**: Automatically uses the back camera on mobile devices
- **High Quality**: Captures high-resolution images for better OCR accuracy

## Future Enhancements

- User preferences (vegan, low-sodium, etc.)
- Recent scans history
- Integration with Open Food Facts API
- Nutrition score APIs (Edamam, USDA)
- Ingredient explanations and tooltips
