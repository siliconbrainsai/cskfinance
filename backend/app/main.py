import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.core.database import engine, Base, SessionLocal
from app.api.endpoints import router as api_router
from app.core.seed import seed_initial_data

# Ensure uploads folder exists
os.makedirs("uploads", exist_ok=True)

# Create tables
Base.metadata.create_all(bind=engine)

# Seed database
db = SessionLocal()
try:
    seed_initial_data(db)
finally:
    db.close()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for C. Santosh Kumar Professional Financial Services & Real Estate Portal",
    version="1.0.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploaded media files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "C. Santosh Kumar Portal API",
        "version": "1.0.0",
        "docs": "/docs"
    }
