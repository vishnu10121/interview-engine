from datetime import datetime

class ReportGenerator:
    def generate_report(self, interview, user):
        """Generate comprehensive interview report"""
        return {
            "candidate_name": user.name if user else "Unknown",
            "candidate_email": user.email if user else "Unknown",
            "interview_category": interview.category,
            "interview_difficulty": interview.difficulty,
            "score": interview.score,
            "total_questions": interview.total_questions,
            "answered_questions": interview.answered_questions,
            "completion_rate": self._calculate_completion_rate(interview),
            "status": interview.status,
            "date": interview.completed_at or datetime.utcnow(),
            
            # Detailed scores
            "scores": {
                "technical_score": interview.score * 0.7 + 20,  # Mock scores
                "coding_score": interview.score * 0.6 + 25,
                "communication_score": interview.score * 0.5 + 30,
                "confidence_score": interview.score * 0.4 + 35,
                "problem_solving_score": interview.score * 0.8 + 15,
                "body_language_score": 65  # Mock
            },
            
            "strengths": self._generate_strengths(interview),
            "weaknesses": self._generate_weaknesses(interview),
            "recommendations": self._generate_recommendations(interview),
            
            # Summary
            "summary": self._generate_summary(interview),
            
            # Overall score
            "overall_score": interview.score or 0,
            "grade": self._get_grade(interview.score or 0)
        }
    
    def _calculate_completion_rate(self, interview):
        if interview.total_questions == 0:
            return 0
        return (interview.answered_questions / interview.total_questions) * 100
    
    def _generate_strengths(self, interview):
        strengths = []
        if interview.score > 70:
            strengths.append("Strong technical knowledge")
        if interview.score > 50:
            strengths.append("Good communication skills")
        if interview.answered_questions > 3:
            strengths.append("Able to handle multiple questions")
        strengths.append("Shows enthusiasm for the role")
        return strengths
    
    def _generate_weaknesses(self, interview):
        weaknesses = []
        if interview.score < 50:
            weaknesses.append("Need to improve technical skills")
        if interview.answered_questions < interview.total_questions:
            weaknesses.append("Did not complete all questions")
        return weaknesses
    
    def _generate_recommendations(self, interview):
        recommendations = []
        if interview.category == "Technical":
            recommendations.append("Practice data structures and algorithms")
            recommendations.append("Build more projects to gain experience")
        elif interview.category == "HR":
            recommendations.append("Practice behavioral interview questions")
            recommendations.append("Research more about the company")
        else:
            recommendations.append("Continue practicing")
        return recommendations
    
    def _generate_summary(self, interview):
        if interview.score > 70:
            return "Excellent performance! Candidate shows strong potential."
        elif interview.score > 50:
            return "Good performance with room for improvement."
        else:
            return "Needs more preparation in key areas."
    
    def _get_grade(self, score):
        if score >= 80:
            return "A+"
        elif score >= 70:
            return "A"
        elif score >= 60:
            return "B"
        elif score >= 50:
            return "C"
        else:
            return "D"
    
    def generate_pdf(self, interview):
        """Generate PDF report"""
        # Simple implementation - would use reportlab or fpdf in production
        return f"/reports/interview_{interview.id}.pdf"