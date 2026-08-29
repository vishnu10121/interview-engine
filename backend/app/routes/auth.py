from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from jose import JWTError, jwt
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from app.config import settings

# ✅ Router define
router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Hardcoded users (No Database!)
users_db = {
    "admin@example.com": {
        "id": 1,
        "name": "Admin",
        "email": "admin@example.com",
        "password": "admin123"
    },
    "vishnuraj.40132@gmail.com": {
        "id": 2,
        "name": "Vishnu",
        "email": "vishnuraj.40132@gmail.com",
        "password": "123456"
    }
}

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class GoogleUserLogin(BaseModel):
    email: EmailStr | None = None
    name: str | None = None
    provider: str = "google"
    google_token: str | None = None
    credential: str | None = None

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

# ============ LOGIN ROUTE ============
@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    """Login with hardcoded users"""
    if user.email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    db_user = users_db[user.email]
    
    if user.password != db_user["password"]:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": db_user["email"]})
    
    return {"access_token": access_token, "token_type": "bearer"}

# ============ GOOGLE LOGIN ROUTE ============
@router.post("/google-login", response_model=Token)
async def google_login(user: GoogleUserLogin):
    """Authenticate a user signed in with Google and issue a session JWT."""
    if not settings.GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail="Google client ID is not configured on the server")

    credential = user.credential or user.google_token
    if not credential:
        raise HTTPException(status_code=400, detail="Google credential is missing")

    try:
        id_info = id_token.verify_oauth2_token(
            credential,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID,
        )
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=f"Invalid Google token: {str(exc)}")

    email = (id_info.get("email") or user.email or "").lower()
    name = id_info.get("name") or user.name or email.split("@")[0] if email else "Google User"

    if not email:
        raise HTTPException(status_code=400, detail="Google email not found in token")

    if email not in users_db:
        users_db[email] = {
            "id": len(users_db) + 1,
            "name": name,
            "email": email,
            "password": ""
        }

    access_token = create_access_token(data={"sub": email, "provider": user.provider})
    return {"access_token": access_token, "token_type": "bearer"}

# ============ GET USER ROUTE ============
@router.get("/me", response_model=UserResponse)
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        if email not in users_db:
            raise HTTPException(status_code=401, detail="User not found")
        
        user = users_db[email]
        return {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ============ REGISTER ROUTE ============
@router.post("/register")
async def register(user: UserCreate):
    try:
        if user.email in users_db:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        users_db[user.email] = {
            "id": len(users_db) + 1,
            "name": user.name,
            "email": user.email,
            "password": user.password
        }
        
        return {
            "message": "User created successfully",
            "user_id": users_db[user.email]["id"],
            "name": user.name,
            "email": user.email
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")