from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from app.services.code_executor import CodeExecutor
from app.services.ai_review import AIReviewer

router = APIRouter()
executor = CodeExecutor()
reviewer = AIReviewer()

class CodeRequest(BaseModel):
    code: str
    language: str
    question_id: int

class CodeSubmitRequest(BaseModel):
    code: str
    language: str
    question_id: int
    test_cases: list

@router.post("/run")
async def run_code(request: CodeRequest):
    """Compile and run code like an online compiler without judge checks."""
    try:
        executor.normalize_language(request.language)
        result = executor.run_raw_code(request.code, request.language)
        return {"success": True, "result": result}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

@router.post("/submit")
async def submit_code(request: CodeSubmitRequest):
    """Submit code for evaluation."""
    try:
        normalized_language = executor.normalize_language(request.language)
        result = executor.execute_code(request.code, normalized_language, request.test_cases)
        review = reviewer.review_code(request.code, normalized_language)

        return {
            "success": True,
            "execution": result,
            "review": review,
        }
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

@router.get("/questions/{question_id}")
async def get_question(question_id: int):
    """Get coding question details"""
    # Dummy questions
    questions = {
        1: {
            "id": 1,
            "title": "Two Sum",
            "problem": "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
            "constraints": ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
            "input_format": "First line: n, Second line: array elements, Third line: target",
            "output_format": "Indices of two numbers",
            "sample_input": "4\n2 7 11 15\n9",
            "sample_output": "0 1",
            "difficulty": "Easy"
        },
        2: {
            "id": 2,
            "title": "Valid Parentheses",
            "problem": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
            "constraints": ["1 <= s.length <= 10^4"],
            "input_format": "String s",
            "output_format": "true or false",
            "sample_input": "()[]{}",
            "sample_output": "true",
            "difficulty": "Easy"
        }
    }
    
    question = questions.get(question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    return question