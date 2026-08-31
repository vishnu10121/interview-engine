import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # API Keys - with default values
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "467625625228-vs1j0u5plelrhnb59qrktmnvu6t7tlub.apps.googleusercontent.com")
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///:memory:")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-this")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

settings = Settings()