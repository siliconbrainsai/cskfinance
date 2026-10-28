from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.core.database import Base

def utcnow():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    role = Column(String(50), default="admin") # "admin", "staff"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=utcnow)

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(200), nullable=False)
    category = Column(String(100), default="Loan") # "Loan", "Insurance", "Advisory"
    short_desc = Column(Text, nullable=False)
    full_desc = Column(Text, nullable=False)
    icon_name = Column(String(50), default="FileText")
    eligibility_info = Column(Text, nullable=True)
    documents_required = Column(Text, nullable=True)
    disclaimer = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=utcnow)

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    category = Column(String(100), default="Apartments") # "Apartments", "Independent Houses", "Residential Properties", "Construction Projects"
    location = Column(String(255), nullable=False)
    city = Column(String(100), default="Hyderabad")
    state = Column(String(100), default="Telangana")
    short_desc = Column(Text, nullable=False)
    full_desc = Column(Text, nullable=False)
    total_units = Column(String(100), nullable=True) # e.g. "Approx. 90 Flats (To be verified)"
    property_type = Column(String(100), default="2 & 3 BHK")
    availability_status = Column(String(100), default="Enquire for Availability")
    price_range = Column(String(100), default="Price on Request")
    amenities = Column(Text, nullable=True) # JSON or comma separated
    project_status = Column(String(100), default="Ongoing / Upcoming")
    rera_number = Column(String(100), default="Subject to RERA Verification")
    featured_image = Column(String(500), nullable=True)
    is_verified_label = Column(String(100), default="Under Verification")
    is_published = Column(Boolean, default=True)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=utcnow)

    images = relationship("ProjectImage", back_populates="project", cascade="all, delete-orphan")

class ProjectImage(Base):
    __tablename__ = "project_images"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    image_url = Column(String(500), nullable=False)
    caption = Column(String(255), nullable=True)
    order_index = Column(Integer, default=0)

    project = relationship("Project", back_populates="images")

class Partner(Base):
    __tablename__ = "partners"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    relationship_status = Column(String(100), default="Enquiry Support / DSA Under Verification") # e.g. "Authorized DSA", "Enquiry Support"
    service_categories = Column(String(255), default="Housing Loans, Home Equity")
    official_website = Column(String(255), nullable=True)
    disclosure_notes = Column(Text, default="Not an endorsement or direct branch. Independent DSA enquiry support.")
    logo_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=utcnow)

class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    reference_id = Column(String(50), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(255), nullable=True)
    service_required = Column(String(100), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    preferred_contact_method = Column(String(50), default="Phone") # "Phone", "WhatsApp", "Email"
    loan_amount = Column(String(100), nullable=True)
    message = Column(Text, nullable=True)
    consent = Column(Boolean, default=True)
    status = Column(String(50), default="New") # "New", "Contacted", "Follow-up Required", "Qualified", "Converted", "Closed"
    created_at = Column(DateTime, default=utcnow)
    updated_at = Column(DateTime, default=utcnow, onupdate=utcnow)

    notes = relationship("EnquiryNote", back_populates="enquiry", cascade="all, delete-orphan")

class EnquiryNote(Base):
    __tablename__ = "enquiry_notes"

    id = Column(Integer, primary_key=True, index=True)
    enquiry_id = Column(Integer, ForeignKey("enquiries.id"), nullable=False)
    author_name = Column(String(100), default="Admin")
    note = Column(Text, nullable=False)
    created_at = Column(DateTime, default=utcnow)

    enquiry = relationship("Enquiry", back_populates="notes")

class SiteSetting(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False)
    value = Column(Text, nullable=False)
    description = Column(String(255), nullable=True)
    updated_at = Column(DateTime, default=utcnow, onupdate=utcnow)
