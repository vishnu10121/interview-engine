class AIReviewer:
    def __init__(self):
        pass
    
    def review_code(self, code: str, language: str):
        """Review code and provide feedback"""
        review = {
            "correctness": self._check_correctness(code),
            "code_quality": self._check_quality(code),
            "readability": self._check_readability(code),
            "optimization": self._suggest_optimizations(code),
            "time_complexity": self._analyze_time_complexity(code),
            "space_complexity": self._analyze_space_complexity(code),
            "edge_cases": self._check_edge_cases(code),
            "better_approach": self._suggest_better_approach(code),
            "score": 0
        }
        
        # Calculate overall score
        score = 0
        if review["correctness"] == "good":
            score += 30
        if review["code_quality"] == "good":
            score += 20
        if review["readability"] == "good":
            score += 20
        if len(review["optimization"]) == 0:
            score += 15
        if len(review["edge_cases"]) == 0:
            score += 15
        
        review["score"] = min(score, 100)
        return review
    
    def _check_correctness(self, code: str):
        """Check if code appears correct"""
        # Basic syntax checks
        if "def " in code or "class " in code:
            return "good"
        return "needs_review"
    
    def _check_quality(self, code: str):
        """Check code quality"""
        quality_score = 0
        lines = code.split('\n')
        
        # Check for comments
        if " #" in code or "//" in code:
            quality_score += 10
        
        # Check for proper naming
        if " " in code:
            quality_score += 10
        
        # Check for functions/methods
        if "def " in code or "function " in code or "()" in code:
            quality_score += 10
        
        return "good" if quality_score > 20 else "needs_improvement"
    
    def _check_readability(self, code: str):
        """Check code readability"""
        if len(code.split('\n')) > 10:
            return "good"
        return "needs_improvement"
    
    def _suggest_optimizations(self, code: str):
        """Suggest optimizations"""
        suggestions = []
        
        if "for " in code and "range" in code:
            suggestions.append("Consider using list comprehensions for better performance")
        
        if "if " in code and "elif" not in code:
            suggestions.append("Consider using elif for better readability")
        
        return suggestions
    
    def _analyze_time_complexity(self, code: str):
        """Analyze time complexity"""
        if "for " in code and "for " in code[code.find("for ")+1:]:
            return "O(n²) - Nested loops detected"
        elif "for " in code:
            return "O(n) - Single loop detected"
        elif "while" in code:
            return "O(log n) - While loop detected"
        else:
            return "O(1) - Constant time operations"
    
    def _analyze_space_complexity(self, code: str):
        """Analyze space complexity"""
        if "list" in code or "array" in code:
            return "O(n) - Using data structures"
        return "O(1) - Using primitive variables"
    
    def _check_edge_cases(self, code: str):
        """Check edge cases"""
        missing = []
        if "if len" not in code and "if len" not in code:
            missing.append("Empty input handling")
        if "None" not in code and "null" not in code:
            missing.append("Null/None value handling")
        return missing
    
    def _suggest_better_approach(self, code: str):
        """Suggest better approach"""
        if "for " in code and "range" in code:
            return "Consider using built-in functions like map(), filter() or reduce()"
        return "Current approach is acceptable"