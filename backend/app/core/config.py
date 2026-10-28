import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "C. Santosh Kumar - Financial Services & Real Estate Portal"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-production-key-change-in-env-98234710293847")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")
    
    # Initial Admin Seed
    DEFAULT_ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "cherukupally.santosh@gmail.com")
    DEFAULT_ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "Santosh@Admin2026")
    
    # Contact & Notifications
    BUSINESS_PHONE: str = "9296206177"
    BUSINESS_EMAIL: str = "cherukupally.santosh@gmail.com"
    WHATSAPP_NUMBER: str = "919296206177"
    
    class Config:
        case_sensitive = True

settings = Settings()
