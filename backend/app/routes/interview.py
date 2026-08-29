from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import openai
from app.config import settings

router = APIRouter()

class AnswerEvaluation(BaseModel):
    question: str
    answer: str
    category: str
    difficulty: str

@router.post("/evaluate")
async def evaluate_answer(data: AnswerEvaluation):
    """Evaluate answer using AI and return score with feedback"""
    
    try:
        # If OpenAI API key is available, use it
        if settings.OPENAI_API_KEY:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": """You are a senior interviewer with 20+ years of experience. 
                        Evaluate the candidate's answer and return ONLY valid JSON:
                        {
                            "score": 0-100,
                            "feedback": "detailed feedback",
                            "strengths": ["strength1", "strength2"],
                            "improvements": ["improvement1", "improvement2"],
                            "correct": true/false
                        }
                        Score 80-100: Excellent, 60-79: Good, 40-59: Average, Below 40: Needs Improvement"""
                    },
                    {
                        "role": "user",
                        "content": f"""Question: {data.question}
                        Category: {data.category}
                        Difficulty: {data.difficulty}
                        Candidate's Answer: {data.answer}
                        
                        Evaluate the answer strictly. Be honest and accurate."""
                    }
                ],
                temperature=0.3,
                max_tokens=500
            )
            
            import json
            result = json.loads(response.choices[0].message.content)
            return result
        
        else:
            # Fallback: Rule-based evaluation
            return rule_based_evaluation(data.question, data.answer, data.category, data.difficulty)
            
    except Exception as e:
        # Fallback to rule-based if AI fails
        return rule_based_evaluation(data.question, data.answer, data.category, data.difficulty)


def rule_based_evaluation(question, answer, category, difficulty):
    """Rule-based fallback evaluation"""
    
    if not answer or len(answer.strip()) < 10:
        return {
            "score": 20,
            "feedback": "Answer is too short. Please provide a detailed response.",
            "strengths": [],
            "improvements": ["Provide a more detailed answer", "Explain your thought process"],
            "correct": False
        }
    
    # Check for keywords based on question
    keywords = get_keywords(question, category)
    matched_keywords = [kw for kw in keywords if kw.lower() in answer.lower()]
    
    # Calculate score based on keyword match
    keyword_score = min(100, (len(matched_keywords) / max(len(keywords), 1)) * 100)
    
    # Check answer length
    word_count = len(answer.split())
    length_score = min(100, (word_count / 50) * 100) if word_count < 50 else 100
    
    # Combined score
    score = int((keyword_score * 0.6) + (length_score * 0.4))
    
    # Ensure score is realistic
    if score < 30:
        score = 30 + (len(matched_keywords) * 5)
    
    score = min(100, max(20, score))
    
    # Generate feedback
    if score >= 80:
        feedback = "Excellent answer! You demonstrated strong understanding of the concept."
        correct = True
    elif score >= 60:
        feedback = "Good answer. You have the right idea but could provide more detail."
        correct = True
    elif score >= 40:
        feedback = "Average answer. Consider adding more specific details and examples."
        correct = False
    else:
        feedback = "Needs improvement. Please study this topic more thoroughly."
        correct = False
    
    return {
        "score": score,
        "feedback": feedback,
        "strengths": [f"Used {len(matched_keywords)} relevant keywords"] if matched_keywords else ["Try to use more technical terms"],
        "improvements": [f"Add more details about: {', '.join(keywords[:3])}"] if keywords else ["Provide more specific examples"],
        "correct": correct
    }


def get_keywords(question, category):
    """Extract keywords based on question and category"""
    
    # Category-specific keywords
    category_keywords = {
        "HR": ["leadership", "team", "communication", "conflict", "motivation", "goal", "achievement", "collaboration"],
        "Technical": ["architecture", "design", "scalability", "performance", "database", "API", "microservices", "cloud"],
        "DSA": ["algorithm", "complexity", "optimization", "data structure", "time complexity", "space complexity", "recursion"],
        "Machine Learning": ["model", "training", "data", "accuracy", "validation", "features", "algorithm", "neural network"],
        "Data Science": ["data", "analysis", "visualization", "statistics", "model", "cleaning", "insights", "EDA"],
        "Frontend": ["React", "state", "component", "DOM", "render", "props", "hooks", "performance"],
        "Backend": ["API", "database", "authentication", "caching", "scalability", "microservices", "load balancing"],
        "Full Stack": ["frontend", "backend", "database", "API", "deployment", "authentication", "scalability"],
        "System Design": ["scalability", "availability", "consistency", "load balancing", "caching", "sharding", "replication"]
    }
    
    # Extract keywords from question
    question_words = question.lower().split()
    important_words = [w for w in question_words if len(w) > 3]
    
    # Combine with category keywords
    cat_kw = category_keywords.get(category, [])
    all_keywords = list(set(important_words + cat_kw))
    
    return all_keywords[:8]  # Return top 8 keywords