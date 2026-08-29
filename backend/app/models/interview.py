from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.database import Base

class Interview(Base):
    __tablename__ = "interviews"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category = Column(String(50))  # HR, Technical, DSA, ML, etc.
    difficulty = Column(String(20))  # Easy, Medium, Hard
    duration = Column(Integer)  # in minutes
    total_questions = Column(Integer, default=0)
    answered_questions = Column(Integer, default=0)
    score = Column(Float, default=0.0)
    status = Column(String(20), default="in_progress")  # in_progress, completed
    created_at = Column(DateTime, server_default=func.now())
    completed_at = Column(DateTime, nullable=True)