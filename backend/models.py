from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

Base = declarative_base()

class RiskLevel(enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class SubmissionStatus(enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class Product(Base):
    __tablename__ = "products"
    
    product_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    upc_barcode = Column(String(50), unique=True, index=True)
    ingredients_text = Column(Text)
    ai_score = Column(Float)
    avg_user_rating = Column(Float, default=0.0)
    total_ratings = Column(Integer, default=0)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    ingredients = relationship("ProductIngredient", back_populates="product")
    ratings = relationship("UserRating", back_populates="product")

class Ingredient(Base):
    __tablename__ = "ingredients"
    
    ingredient_id = Column(Integer, primary_key=True, index=True)
    standard_name = Column(String(255), unique=True, nullable=False, index=True)
    risk_level = Column(Enum(RiskLevel), default=RiskLevel.LOW)
    common_aliases = Column(Text)  # JSON string of aliases
    diet_flags = Column(Text)  # JSON string of diet flags
    
    # Relationships
    products = relationship("ProductIngredient", back_populates="ingredient")

class ProductIngredient(Base):
    __tablename__ = "product_ingredients"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    ingredient_id = Column(Integer, ForeignKey("ingredients.ingredient_id"), nullable=False)
    order_in_list = Column(Integer, nullable=False)
    
    # Relationships
    product = relationship("Product", back_populates="ingredients")
    ingredient = relationship("Ingredient", back_populates="products")

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    ratings = relationship("UserRating", back_populates="user")
    submissions = relationship("ProductSubmission", back_populates="user", foreign_keys="ProductSubmission.user_id")
    reviewed_submissions = relationship("ProductSubmission", back_populates="reviewer", foreign_keys="ProductSubmission.reviewed_by")

class UserRating(Base):
    __tablename__ = "user_ratings"
    
    rating_id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    star_rating = Column(Integer, nullable=False)  # 1-5 stars
    review_text = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    product = relationship("Product", back_populates="ratings")
    user = relationship("User", back_populates="ratings")

class ProductSubmission(Base):
    __tablename__ = "product_submissions"
    
    submission_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    product_name = Column(String(255), nullable=False)
    upc_barcode = Column(String(50))
    raw_image_url = Column(String(500))
    ai_extracted_text = Column(Text)
    ai_analysis = Column(Text)  # JSON string of AI analysis
    moderator_status = Column(Enum(SubmissionStatus), default=SubmissionStatus.PENDING)
    submission_date = Column(DateTime(timezone=True), server_default=func.now())
    reviewed_at = Column(DateTime(timezone=True))
    reviewed_by = Column(Integer, ForeignKey("users.user_id"))
    
    # Relationships
    user = relationship("User", back_populates="submissions", foreign_keys=[user_id])
    reviewer = relationship("User", foreign_keys=[reviewed_by])
