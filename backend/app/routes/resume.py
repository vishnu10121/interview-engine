from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.resume_parser import ResumeParser

router = APIRouter()
resume_parser = ResumeParser()


@router.post("/extract")
async def extract_resume(file: UploadFile = File(...)):
    """Extract structured data from uploaded resume PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    try:
        raw_text = resume_parser.extract_text_from_pdf(file.file)
        if not raw_text or len(raw_text.strip()) < 10:
            return {
                "success": False,
                "error": "Could not extract readable text from PDF. The PDF might be scanned/image-based or empty.",
                "raw_text": raw_text[:500] if raw_text else ""
            }

        cleaned_text = resume_parser.clean_text(raw_text)
        structured_data = resume_parser.extract_resume_data(cleaned_text)

        return {
            "success": True,
            "data": {
                "structured_data": structured_data,
                "raw_text": cleaned_text[:2000] + "..." if len(cleaned_text) > 2000 else cleaned_text,
            }
        }
    except Exception as exc:
        return {
            "success": False,
            "error": f"Failed to parse PDF: {str(exc)}"
        }


@router.post("/analyze")
async def analyze_resume(payload: dict):
    """Analyze a resume against a job description and return ATS score."""
    resume_text = payload.get("resume_text") or payload.get("resume")
    job_description = payload.get("job_description") or payload.get("jobDescription") or ""

    if not resume_text or not job_description:
        raise HTTPException(status_code=400, detail="Both resume_text and job_description are required.")

    result = resume_parser.compute_ats_score(resume_text, job_description)
    return {
        "success": True,
        "data": result
    }


@router.get("/test")
async def test_route():
    return {"message": "Resume router is working!"}