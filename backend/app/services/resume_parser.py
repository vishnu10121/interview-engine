import PyPDF2
import openai
import re
from app.config import settings

# Set OpenAI API key
openai.api_key = settings.OPENAI_API_KEY


class ResumeParser:
    def __init__(self):
        self.tech_keywords = [
            'python', 'javascript', 'react', 'node', 'node.js', 'sql', 'aws', 'docker',
            'git', 'html', 'css', 'typescript', 'mongodb', 'express', 'angular', 'vue',
            'django', 'flask', 'spring', 'spring boot', 'c++', 'c#', 'php', 'ruby', 'swift',
            'kotlin', 'go', 'rust', 'scala', 'perl', 'matlab', 'r', 'mysql', 'postgresql',
            'oracle', 'firebase', 'redis', 'elasticsearch', 'kafka', 'nginx', 'linux',
            'kubernetes', 'terraform', 'ansible', 'jenkins', 'github', 'gitlab',
            'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'pandas', 'numpy', 'opencv',
            'fastapi', 'rest api', 'restapis', 'ci/cd', 'machine learning', 'data science',
            'power bi', 'tableau', 'azure', 'gcp', 'graphql', 'next.js', 'tailwind', 'mongo'
        ]
        self.stop_words = {
            'the', 'a', 'an', 'and', 'or', 'for', 'with', 'from', 'to', 'in', 'on', 'of',
            'at', 'by', 'as', 'is', 'it', 'this', 'that', 'their', 'his', 'her', 'our', 'your',
            'we', 'you', 'they', 'them', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
            'has', 'had', 'but', 'not', 'no', 'can', 'could', 'should', 'would', 'about', 'into',
            'through', 'between', 'after', 'before', 'during', 'over', 'under', 'more', 'most',
            'using', 'used', 'work', 'worked', 'experience', 'skills', 'resume', 'profile'
        }

    def extract_text_from_pdf(self, pdf_file):
        """Extract text from PDF using PyPDF2"""
        try:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in pdf_reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
            return text
        except Exception as e:
            raise Exception(f"Error reading PDF: {str(e)}")

    def clean_text(self, text):
        """Clean extracted text"""
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'[^\w\s\.\,\-\:\/\(\)]', '', text)
        return text.strip()

    def normalize_text(self, text):
        return re.sub(r'[^a-z0-9+/\s-]', ' ', text.lower())

    def extract_resume_data(self, text):
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        name = ""
        for line in lines[:8]:
            if len(line.split()) <= 4 and len(line) > 2 and not re.search(r'@|\d', line):
                name = line.strip()
                break

        email = ""
        email_match = re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)
        if email_match:
            email = email_match.group()

        phone = ""
        phone_match = re.search(r'\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b', text)
        if phone_match:
            phone = phone_match.group()

        summary = ""
        for line in lines:
            if len(line) > 60 and ('summary' in line.lower() or 'profile' in line.lower() or 'about' in line.lower() or 'developer' in line.lower() or 'engineer' in line.lower()):
                summary = line.strip()
                break

        skills = []
        for skill in self.tech_keywords:
            if skill in text.lower():
                skills.append(skill.title() if skill not in ['ci/cd', 'rest api', 'restapis'] else skill.upper())

        edu_entries = []
        for idx, line in enumerate(lines):
            if re.search(r'(b\.tech|btech|be\b|b\.e\.|bsc|bs\b|mba|master|m\.tech|mtech|phd|degree|bachelor|university|college)', line.lower()):
                degree = line.strip()
                institution = lines[idx + 1].strip() if idx + 1 < len(lines) else ""
                year = ""
                if idx + 2 < len(lines):
                    year_match = re.search(r'(19|20)\d{2}', lines[idx + 2])
                    if year_match:
                        year = year_match.group(0)
                edu_entries.append({"degree": degree, "institution": institution, "year": year})
                break

        return {
            "name": name,
            "email": email,
            "phone": phone,
            "location": "",
            "linkedin": "",
            "github": "",
            "summary": summary or "Professional with strong engineering and product experience.",
            "skills": skills[:15],
            "experience": [],
            "education": edu_entries,
            "projects": [],
            "certifications": [],
            "achievements": []
        }

    def extract_keywords_from_jd(self, job_description):
        tokens = re.findall(r'[a-zA-Z][a-zA-Z0-9+.#/:-]{2,}', job_description)
        keywords = []
        for token in tokens:
            clean = token.lower().strip(".,;()[]{}:/+-")
            if clean and clean not in self.stop_words and len(clean) > 2:
                keywords.append(clean)
        return keywords

    def compute_ats_score(self, resume_text, job_description):
        resume_text = resume_text or ""
        job_description = job_description or ""

        resume_lower = self.normalize_text(resume_text)
        jd_lower = self.normalize_text(job_description)

        jd_keywords = self.extract_keywords_from_jd(job_description)
        skill_matches = []
        for skill in self.tech_keywords:
            if skill in jd_lower and skill in resume_lower:
                skill_matches.append(skill)

        found_keywords = []
        for keyword in jd_keywords:
            if keyword in resume_lower:
                found_keywords.append(keyword)

        section_score = 0
        total_sections = 0
        section_checks = {
            'summary': bool(re.search(r'(summary|profile|about me|about)', resume_lower)),
            'skills': bool(re.search(r'(skills|technologies|tools)', resume_lower)),
            'experience': bool(re.search(r'(experience|work history|employment)', resume_lower)),
            'projects': bool(re.search(r'(projects|project)', resume_lower)),
            'education': bool(re.search(r'(education|b\.tech|btech|degree|university)', resume_lower)),
            'certifications': bool(re.search(r'(certifications|certification|aws|hackathon)', resume_lower)),
        }

        for present in section_checks.values():
            total_sections += 1
            if present:
                section_score += 1

        section_ratio = section_score / total_sections if total_sections else 0
        keyword_ratio = len(set(found_keywords)) / max(1, len(set(jd_keywords)))
        skill_ratio = len(skill_matches) / max(1, len(self.tech_keywords))

        length_score = min(20, max(0, (len(resume_text.split()) / 250) * 20))
        formatting_score = 0
        if re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b', resume_text):
            formatting_score += 10
        if re.search(r'\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b', resume_text):
            formatting_score += 10
        if len(resume_text.split()) >= 150:
            formatting_score += 10

        score = (
            keyword_ratio * 45 +
            section_ratio * 25 +
            skill_ratio * 20 +
            min(10, formatting_score / 3) +
            min(10, length_score / 2)
        )
        score = max(0, min(100, round(score)))

        if score >= 85:
            grade = 'A'
        elif score >= 75:
            grade = 'B+'
        elif score >= 65:
            grade = 'B'
        elif score >= 55:
            grade = 'C+'
        elif score >= 45:
            grade = 'C'
        else:
            grade = 'D'

        missing_keywords = []
        for keyword in list(dict.fromkeys(jd_keywords))[:12]:
            if keyword not in resume_lower and keyword not in self.stop_words:
                missing_keywords.append(keyword)

        matched_skills = list(dict.fromkeys(skill_matches))[:10]
        missing_skills = []
        for skill in self.tech_keywords:
            if skill in jd_lower and skill not in resume_lower and skill not in missing_skills:
                missing_skills.append(skill)

        strengths = []
        if section_ratio >= 0.8:
            strengths.append('Resume includes core hiring sections with clear structure.')
        if len(matched_skills) >= 5:
            strengths.append(f'Matched {len(matched_skills)} relevant skill areas from the job description.')
        if len(resume_text.split()) >= 220:
            strengths.append('Resume has a healthy length with enough detail for ATS evaluation.')
        if not strengths:
            strengths.append('Basic resume structure is present and readable.')

        gaps = []
        if keyword_ratio < 0.5:
            gaps.append('Resume is missing several role-specific keywords from the job description.')
        if len(missing_skills) > 0:
            gaps.append('Add the missing technical skills that are mentioned in the role.')
        if not re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b', resume_text):
            gaps.append('Add a valid email address to improve ATS parsing and contact readability.')
        if not re.search(r'\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b', resume_text):
            gaps.append('Add a clean phone number for contact completeness.')
        if not gaps:
            gaps.append('Improve impact language with measurable outcomes in each role bullet.')

        recommendations = []
        if missing_skills:
            recommendations.append(f'Include the missing skills: {", ".join(missing_skills[:5])}.')
        recommendations.append('Use quantifiable achievements such as revenue impact, efficiency gain, or team size.')
        recommendations.append('Add a short summary section tailored to the target role.')
        recommendations.append('Highlight certifications, tools, and project outcomes using role-specific keywords.')

        return {
            'overallATSScore': score,
            'resumeGrade': grade,
            'atsCompatibility': 'High' if score >= 75 else 'Medium' if score >= 55 else 'Low',
            'keywordMatch': f"{round(keyword_ratio * 100)}%",
            'recruiterReadability': 'Excellent' if score >= 80 else 'Good' if score >= 65 else 'Fair',
            'sectionScores': {
                'formatting': min(20, round(formatting_score / 3)),
                'contactInformation': 20 if re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b', resume_text) and re.search(r'\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b', resume_text) else 10,
                'summary': 20 if 'summary' in resume_lower or 'profile' in resume_lower else 8,
                'skills': min(20, round(len(matched_skills) * 2 + 5)),
                'experience': 18 if 'experience' in resume_lower else 8,
                'projects': 16 if 'project' in resume_lower else 8,
                'education': 18 if 'education' in resume_lower or 'degree' in resume_lower else 8,
                'certifications': 12 if 'certification' in resume_lower or 'aws' in resume_lower else 6,
                'achievements': 12 if 'achievement' in resume_lower or re.search(r'\b\d+%\b|\b\d+\+\b', resume_text) else 6,
                'grammar': 15,
                'keywords': min(20, round(keyword_ratio * 20))
            },
            'strengths': strengths[:5],
            'weaknesses': gaps[:5],
            'missingSkills': missing_skills[:8],
            'matchedSkills': matched_skills[:10],
            'missingKeywords': missing_keywords[:8],
            'recommendations': recommendations[:5],
            'overallFeedback': f"This resume scores {score}% against the target role. It covers core skills and structure, but it can be stronger by improving keyword alignment and measurable achievement statements.",
            'skillsFound': matched_skills[:15]
        }

    def parse_resume_with_ai(self, pdf_file):
        """Extract and structure resume using AI (LLM)"""
        try:
            raw_text = self.extract_text_from_pdf(pdf_file)
            if not raw_text or len(raw_text) < 50:
                return {
                    "success": False,
                    "error": "Could not extract text from PDF. Please paste resume manually.",
                    "raw_text": raw_text[:500] if raw_text else ""
                }

            cleaned_text = self.clean_text(raw_text)

            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {
                            "role": "system",
                            "content": """You are a resume parsing expert. Extract the following information from the resume and return ONLY valid JSON format. Do not add any extra text outside JSON.

Required JSON structure:
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "phone number",
  "location": "City, Country",
  "linkedin": "LinkedIn URL or username",
  "github": "GitHub URL or username",
  "summary": "Professional summary (2-3 sentences)",
  "skills": ["skill1", "skill2", "skill3"],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Start - End",
      "description": "Responsibilities and achievements"
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "Institution Name",
      "year": "Year of completion"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description",
      "technologies": ["tech1", "tech2"]
    }
  ],
  "certifications": ["Certification 1", "Certification 2"],
  "achievements": ["Achievement 1", "Achievement 2"]
}

If any field is not found in the resume, return null or empty array."""
                        },
                        {
                            "role": "user",
                            "content": f"Extract and structure this resume:\n\n{cleaned_text[:8000]}"
                        }
                    ],
                    temperature=0.2,
                    max_tokens=2000
                )

                import json
                structured_data = json.loads(response.choices[0].message.content)
                return {
                    "success": True,
                    "structured_data": structured_data,
                    "raw_text": cleaned_text[:2000] + "..." if len(cleaned_text) > 2000 else cleaned_text
                }

            except openai.error.AuthenticationError:
                return {
                    "success": True,
                    "structured_data": self.extract_resume_data(cleaned_text),
                    "raw_text": cleaned_text[:2000] + "..." if len(cleaned_text) > 2000 else cleaned_text,
                    "note": "OpenAI API key not configured. Used fallback extraction."
                }
            except Exception as e:
                return {
                    "success": True,
                    "structured_data": self.extract_resume_data(cleaned_text),
                    "raw_text": cleaned_text[:2000] + "..." if len(cleaned_text) > 2000 else cleaned_text,
                    "note": f"AI parsing failed: {str(e)}. Used fallback extraction."
                }

        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to parse resume: {str(e)}"
            }

    def _extract_manually(self, text):
        return self.extract_resume_data(text)