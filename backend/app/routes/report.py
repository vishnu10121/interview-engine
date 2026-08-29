from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.interview import Interview
from app.models.user import User
from app.services.report_gen import ReportGenerator

router = APIRouter()
report_gen = ReportGenerator()

@router.get("/{interview_id}")
async def get_report(interview_id: int, db: Session = Depends(get_db)):
    """Get interview report"""
    interview = db.query(Interview).filter(Interview.id == interview_id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    
    user = db.query(User).filter(User.id == interview.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    report = report_gen.generate_report(interview, user)
    return report

@router.post("/generate/{interview_id}")
async def generate_report(interview_id: int, db: Session = Depends(get_db)):
    """Generate and save PDF report"""
    interview = db.query(Interview).filter(Interview.id == interview_id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    
    # Generate PDF
    pdf_path = report_gen.generate_pdf(interview)
    
    return {
        "success": True,
        "message": "Report generated",
        "pdf_url": pdf_path
    }