import random

class QuestionGenerator:
    def __init__(self):
        self.question_bank = {
            "HR": {
                "Easy": [
                    "Tell me about yourself",
                    "What are your strengths and weaknesses?",
                    "Why do you want to work here?",
                    "Where do you see yourself in 5 years?",
                    "Describe your ideal work environment"
                ],
                "Medium": [
                    "Tell me about a time you faced a challenge at work",
                    "How do you handle conflict with colleagues?",
                    "Describe your leadership style",
                    "How do you handle stress and pressure?",
                    "Why should we hire you?"
                ],
                "Hard": [
                    "Tell me about a time you failed and what you learned",
                    "How would you handle a difficult team member?",
                    "What's the most difficult decision you've made?",
                    "How do you handle criticism?",
                    "Describe a situation where you had to work under pressure"
                ]
            },
            "Technical": {
                "Easy": [
                    "What is the difference between OOP and procedural programming?",
                    "Explain the concept of inheritance",
                    "What is polymorphism?",
                    "Explain the difference between array and linked list",
                    "What is a stack and when would you use it?"
                ],
                "Medium": [
                    "Explain the concept of MVC architecture",
                    "What is the difference between REST and SOAP?",
                    "Explain how garbage collection works",
                    "What is the difference between TCP and UDP?",
                    "Explain the principles of SOLID"
                ],
                "Hard": [
                    "How would you design a scalable microservices architecture?",
                    "Explain the CAP theorem",
                    "How would you handle database sharding?",
                    "Explain the differences between ACID and BASE",
                    "How would you implement a rate limiter?"
                ]
            },
            "DSA": {
                "Easy": [
                    "Reverse a linked list",
                    "Check if a string is palindrome",
                    "Find the maximum element in an array",
                    "Implement a stack using array",
                    "Find the factorial of a number using recursion"
                ],
                "Medium": [
                    "Find the longest substring without repeating characters",
                    "Merge two sorted arrays",
                    "Implement a binary search tree",
                    "Find the next permutation",
                    "Detect cycle in a linked list"
                ],
                "Hard": [
                    "Find the median of two sorted arrays",
                    "Solve the N-Queens problem",
                    "Implement Dijkstra's algorithm",
                    "Find the shortest path in a maze",
                    "Solve the traveling salesman problem"
                ]
            }
        }
    
    def generate_questions(self, category: str, difficulty: str, count: int = 5):
        """Generate questions based on category and difficulty"""
        questions = self.question_bank.get(category, {}).get(difficulty, [])
        
        if not questions:
            # Fallback questions
            questions = [
                "Tell me about yourself",
                "What is your biggest achievement?",
                "Why do you want to work here?",
                "Describe a challenging project",
                "What are your career goals?"
            ]
        
        # Return random questions
        if len(questions) >= count:
            return random.sample(questions, count)
        return questions
    
    def evaluate_answer(self, answer: str) -> float:
        """Evaluate answer and return score (0-100)"""
        # Simple scoring based on length and keywords
        if not answer or len(answer.strip()) < 10:
            return 0.0
        
        score = 0.0
        words = answer.split()
        
        # Length score
        if len(words) > 50:
            score += 20
        elif len(words) > 30:
            score += 15
        elif len(words) > 20:
            score += 10
        
        # Keyword indicators (simplified)
        keywords = ["because", "therefore", "however", "for example", "specifically", 
                   "implement", "design", "approach", "solution", "analyze", "optimize"]
        keyword_count = sum(1 for word in keywords if word.lower() in answer.lower())
        score += min(keyword_count * 5, 30)
        
        # Unique words (vocabulary score)
        unique_words = len(set(words))
        if unique_words > 30:
            score += 20
        elif unique_words > 20:
            score += 15
        elif unique_words > 15:
            score += 10
        
        return min(score, 100)