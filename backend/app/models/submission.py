from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class Submission(Base):
    __tablename__ = "submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    interview_id = Column(Integer, ForeignKey("interviews.id"))
    question_id = Column(Integer)
    question_title = Column(String(200))
    code = Column(Text)
    language = Column(String(20))
    status = Column(String(20))  # passed, failed, error
    execution_time = Column(Float, default=0.0)
    memory_usage = Column(Float, default=0.0)
    score = Column(Float, default=0.0)
    feedback = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())