import os
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, create_access_token, oauth2_scheme
from app.models.models import User, Service, Project, Partner, Enquiry, EnquiryNote, SiteSetting
from app.schemas.schemas import (
    Token, LoginRequest, UserResponse,
    ServiceResponse, ServiceCreate,
    ProjectResponse, ProjectCreate,
    PartnerResponse, PartnerCreate,
    EnquiryCreate, EnquiryResponse, EnquiryStatusUpdate, EnquiryNoteCreate,
    DashboardStats
)
from jose import JWTError, jwt
from app.core.config import settings

router = APIRouter()

# Dependency for protected endpoints
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# ----------------- PUBLIC ENDPOINTS -----------------

@router.get("/services", response_model=List[ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    return db.query(Service).filter(Service.is_active == True).order_by(Service.order_index.asc()).all()

@router.get("/services/{slug}", response_model=ServiceResponse)
def get_service(slug: str, db: Session = Depends(get_db)):
    svc = db.query(Service).filter(Service.slug == slug, Service.is_active == True).first()
    if not svc:
        raise HTTPException(status_code=404, detail="Service not found")
    return svc

@router.get("/projects", response_model=List[ProjectResponse])
def get_projects(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Project).filter(Project.is_published == True)
    if category and category != "All":
        query = query.filter(Project.category == category)
    return query.order_by(Project.order_index.asc()).all()

@router.get("/projects/{slug}", response_model=ProjectResponse)
def get_project(slug: str, db: Session = Depends(get_db)):
    proj = db.query(Project).filter(Project.slug == slug, Project.is_published == True).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    return proj

@router.get("/partners", response_model=List[PartnerResponse])
def get_partners(db: Session = Depends(get_db)):
    return db.query(Partner).filter(Partner.is_active == True).order_by(Partner.order_index.asc()).all()

@router.post("/enquiries", response_model=EnquiryResponse)
def submit_enquiry(enquiry_in: EnquiryCreate, db: Session = Depends(get_db)):
    ref_id = f"CSK-{uuid.uuid4().hex[:6].upper()}"
    new_enquiry = Enquiry(
        reference_id=ref_id,
        full_name=enquiry_in.full_name,
        phone=enquiry_in.phone,
        email=enquiry_in.email,
        service_required=enquiry_in.service_required,
        project_id=enquiry_in.project_id,
        preferred_contact_method=enquiry_in.preferred_contact_method,
        loan_amount=enquiry_in.loan_amount,
        message=enquiry_in.message,
        consent=enquiry_in.consent,
        status="New"
    )
    db.add(new_enquiry)
    db.commit()
    db.refresh(new_enquiry)
    return new_enquiry

@router.get("/site-settings/public")
def get_public_settings(db: Session = Depends(get_db)):
    settings_items = db.query(SiteSetting).all()
    res = {
        "phone": settings.BUSINESS_PHONE,
        "email": settings.BUSINESS_EMAIL,
        "whatsapp": settings.WHATSAPP_NUMBER,
        "experience": "17 Years (Financial Services & Real Estate)",
        "location": "Hyderabad & Telangana",
        "qualifications": "B.Com"
    }
    for item in settings_items:
        res[item.key] = item.value
    return res

# ----------------- AUTH ENDPOINTS -----------------

@router.post("/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(data={"sub": user.email, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/auth/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# ----------------- PROTECTED ADMIN ENDPOINTS -----------------

@router.get("/admin/dashboard", response_model=DashboardStats)
def get_dashboard_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    total_enquiries = db.query(Enquiry).count()
    new_enquiries = db.query(Enquiry).filter(Enquiry.status == "New").count()
    contacted_enquiries = db.query(Enquiry).filter(Enquiry.status == "Contacted").count()
    converted_enquiries = db.query(Enquiry).filter(Enquiry.status == "Converted").count()
    total_projects = db.query(Project).count()
    total_services = db.query(Service).count()
    total_partners = db.query(Partner).count()

    return {
        "total_enquiries": total_enquiries,
        "new_enquiries": new_enquiries,
        "contacted_enquiries": contacted_enquiries,
        "converted_enquiries": converted_enquiries,
        "total_projects": total_projects,
        "total_services": total_services,
        "total_partners": total_partners,
    }

@router.get("/admin/enquiries", response_model=List[EnquiryResponse])
def get_admin_enquiries(
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Enquiry)
    if status and status != "All":
        query = query.filter(Enquiry.status == status)
    return query.order_by(Enquiry.created_at.desc()).all()

@router.patch("/admin/enquiries/{id}", response_model=EnquiryResponse)
def update_enquiry_status(
    id: int,
    status_update: EnquiryStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    enquiry = db.query(Enquiry).filter(Enquiry.id == id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    enquiry.status = status_update.status
    db.commit()
    db.refresh(enquiry)
    return enquiry

@router.post("/admin/enquiries/{id}/notes", response_model=EnquiryResponse)
def add_enquiry_note(
    id: int,
    note_in: EnquiryNoteCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    enquiry = db.query(Enquiry).filter(Enquiry.id == id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    new_note = EnquiryNote(
        enquiry_id=enquiry.id,
        author_name=current_user.full_name or "Admin",
        note=note_in.note
    )
    db.add(new_note)
    db.commit()
    db.refresh(enquiry)
    return enquiry

# Projects CRUD
@router.post("/admin/projects", response_model=ProjectResponse)
def create_project(project_in: ProjectCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    proj = Project(**project_in.model_dump())
    db.add(proj)
    db.commit()
    db.refresh(proj)
    return proj

@router.delete("/admin/projects/{id}")
def delete_project(id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    proj = db.query(Project).filter(Project.id == id).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(proj)
    db.commit()
    return {"message": "Project deleted successfully"}

# Property Image Upload
@router.post("/admin/upload-image")
async def upload_property_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    # Validate file format
    allowed_extensions = {".jpg", ".jpeg", ".png", ".webp", ".avif"}
    ext = os.path.splitext(file.filename)[1].lower() if file.filename else ""
    if ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid file format. Allowed: JPG, PNG, WEBP, AVIF")

    filename = f"property_{uuid.uuid4().hex[:10]}{ext}"
    filepath = os.path.join("uploads", filename)

    content = await file.read()
    if len(content) > 10 * 1024 * 1024: # 10MB max
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 10MB.")

    with open(filepath, "wb") as f:
        f.write(content)

    return {
        "url": f"/uploads/{filename}",
        "filename": filename
    }
