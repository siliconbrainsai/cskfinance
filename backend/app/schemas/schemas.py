from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginRequest(BaseModel):
    username: str # email
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: Optional[str]
    role: str
    is_active: bool

    class Config:
        from_attributes = True

# Service Schemas
class ServiceBase(BaseModel):
    slug: str
    title: str
    category: str
    short_desc: str
    full_desc: str
    icon_name: Optional[str] = "FileText"
    eligibility_info: Optional[str] = None
    documents_required: Optional[str] = None
    disclaimer: Optional[str] = None
    is_active: Optional[bool] = True
    order_index: Optional[int] = 0

class ServiceCreate(ServiceBase):
    pass

class ServiceResponse(ServiceBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Project Schemas
class ProjectImageResponse(BaseModel):
    id: int
    image_url: str
    caption: Optional[str]
    order_index: int

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    slug: str
    title: str
    category: str
    location: str
    city: Optional[str] = "Hyderabad"
    state: Optional[str] = "Telangana"
    short_desc: str
    full_desc: str
    total_units: Optional[str] = None
    property_type: Optional[str] = "2 & 3 BHK"
    availability_status: Optional[str] = "Enquire for Availability"
    price_range: Optional[str] = "Price on Request"
    amenities: Optional[str] = None
    project_status: Optional[str] = "Ongoing / Upcoming"
    rera_number: Optional[str] = "Subject to RERA Verification"
    featured_image: Optional[str] = None
    is_verified_label: Optional[str] = "Under Verification"
    is_published: Optional[bool] = True
    order_index: Optional[int] = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    images: List[ProjectImageResponse] = []

    class Config:
        from_attributes = True

# Partner Schemas
class PartnerBase(BaseModel):
    name: str
    relationship_status: str
    service_categories: str
    official_website: Optional[str] = None
    disclosure_notes: Optional[str] = None
    logo_url: Optional[str] = None
    is_active: Optional[bool] = True
    order_index: Optional[int] = 0

class PartnerCreate(PartnerBase):
    pass

class PartnerResponse(PartnerBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Enquiry Schemas
class EnquiryCreate(BaseModel):
    full_name: str
    phone: str
    email: Optional[str] = None
    service_required: str
    project_id: Optional[int] = None
    preferred_contact_method: Optional[str] = "Phone"
    loan_amount: Optional[str] = None
    message: Optional[str] = None
    consent: bool = True

class EnquiryNoteCreate(BaseModel):
    note: str

class EnquiryNoteResponse(BaseModel):
    id: int
    author_name: str
    note: str
    created_at: datetime

    class Config:
        from_attributes = True

class EnquiryResponse(BaseModel):
    id: int
    reference_id: str
    full_name: str
    phone: str
    email: Optional[str]
    service_required: str
    project_id: Optional[int]
    preferred_contact_method: str
    loan_amount: Optional[str]
    message: Optional[str]
    consent: bool
    status: str
    created_at: datetime
    updated_at: datetime
    notes: List[EnquiryNoteResponse] = []

    class Config:
        from_attributes = True

class EnquiryStatusUpdate(BaseModel):
    status: str

# Dashboard Summary
class DashboardStats(BaseModel):
    total_enquiries: int
    new_enquiries: int
    contacted_enquiries: int
    converted_enquiries: int
    total_projects: int
    total_services: int
    total_partners: int
