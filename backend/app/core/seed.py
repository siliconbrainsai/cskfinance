from sqlalchemy.orm import Session
from app.models.models import User, Service, Project, Partner, SiteSetting
from app.core.security import get_password_hash
from app.core.config import settings

def seed_initial_data(db: Session):
    # 1. Seed Admin User
    admin = db.query(User).filter(User.email == settings.DEFAULT_ADMIN_EMAIL).first()
    if not admin:
        admin = User(
            email=settings.DEFAULT_ADMIN_EMAIL,
            hashed_password=get_password_hash(settings.DEFAULT_ADMIN_PASSWORD),
            full_name="C. Santosh Kumar",
            role="admin",
            is_active=True
        )
        db.add(admin)
        db.commit()

    # 2. Seed Services from Profile
    if db.query(Service).count() == 0:
        services_data = [
            {
                "slug": "home-loans",
                "title": "Home Loans & Purchase Financing",
                "category": "Loan",
                "short_desc": "Comprehensive guidance on home purchase financing, competitive interest rate comparison, and step-by-step paperwork support.",
                "full_desc": "With 17 years of financial advisory experience, C. Santosh Kumar assists home buyers navigate loan eligibility criteria, compare loan offerings from leading banking partners, and streamline verification and documentation.",
                "icon_name": "Home",
                "eligibility_info": "Salaried individuals (min 2 yrs work exp) or Self-Employed professionals/business owners with steady income. Min age 21 to 65 years.",
                "documents_required": "PAN Card, Aadhaar Card, 3 Months Salary Slips or 3 Years ITR, 6 Months Bank Statement, Property Sale Agreement & Title Deeds.",
                "disclaimer": "Loan approval and interest rate are solely at the discretion of the partner bank/lender upon credit assessment.",
                "order_index": 1
            },
            {
                "slug": "construction-loans",
                "title": "Residential Construction Loans",
                "category": "Loan",
                "short_desc": "Specialized financing solutions for building independent houses, villas, or floor expansions on your owned plot.",
                "full_desc": "Assistance in securing staged construction loans linked with civil engineering progress, builder cost estimates, and municipal plan sanctions.",
                "icon_name": "Hammer",
                "eligibility_info": "Individual plot owners with approved GHMC/HMDA/Municipal building plans and cost estimates.",
                "documents_required": "Plot Title Deed, Approved Building Plan, Detailed Civil Engineer Cost Estimation, Income Proofs, KYC documents.",
                "disclaimer": "Disbursement is processed in tranches based on technical site inspection by the lending institution.",
                "order_index": 2
            },
            {
                "slug": "loan-against-property",
                "title": "Loan Against Property (Mortgage)",
                "category": "Loan",
                "short_desc": "Unlock the monetary value of your existing residential or commercial property for business growth or major financial needs.",
                "full_desc": "High-value financing with longer repayment tenure using your registered freehold property as collateral.",
                "icon_name": "Landmark",
                "eligibility_info": "Property owners with clear titles and encumbrance certificates.",
                "documents_required": "Registered Sale Deed, Link Documents (13-30 yrs), Encumbrance Certificate, Latest Property Tax Receipt, Financial Proofs.",
                "disclaimer": "Loan to Value (LTV) ratio and sanctions depend on legal and technical valuation by the partner lender.",
                "order_index": 3
            },
            {
                "slug": "business-loans",
                "title": "Business Loans & Commercial Finance",
                "category": "Loan",
                "short_desc": "Working capital, expansion funds, and equipment finance for MSMEs, traders, and enterprises.",
                "full_desc": "Expert DSA coordination for MSME loans, machinery finance, and overdraft facilities to empower business growth.",
                "icon_name": "Briefcase",
                "eligibility_info": "Active enterprise with minimum 2-3 years vintage and positive operational cash flow.",
                "documents_required": "GST Returns (12 months), Audited Balance Sheet & P&L, Business PAN, Entity Proofs, 12 Months Current Account Statement.",
                "disclaimer": "Terms governed by partner lending institutions. Subject to credit appraisal.",
                "order_index": 4
            },
            {
                "slug": "personal-loans",
                "title": "Personal Loans",
                "category": "Loan",
                "short_desc": "Quick personal financing assistance for medical needs, education, weddings, or emergency expenses.",
                "full_desc": "Guidance on choosing personal credit solutions with transparent tenure, no hidden fees, and hassle-free documentation.",
                "icon_name": "CreditCard",
                "eligibility_info": "Salaried employees in private/public sector firms or self-employed individuals with stable monthly cash inflows.",
                "documents_required": "Identity Proof, Address Proof, Recent 3 Months Salary Slips, 6 Months Bank Statement.",
                "disclaimer": "Interest rates and eligibility depend on applicant CIBIL score and lender policies.",
                "order_index": 5
            },
            {
                "slug": "insurance-services",
                "title": "Insurance Advisory & Solutions",
                "category": "Insurance",
                "short_desc": "Life insurance, term coverage, and asset security solutions to safeguard your family's future.",
                "full_desc": "Objective guidance in connecting with licensed insurers to identify term plans, savings schemes, and critical health protection tailored to your life stage.",
                "icon_name": "ShieldCheck",
                "eligibility_info": "Resident and Non-Resident Indians seeking life, health, or asset protection.",
                "documents_required": "Age Proof, Income Documents, KYC, Medical Disclosures as mandated by the respective insurer.",
                "disclaimer": "Insurance is a subject matter of solicitation. Santosh Kumar acts as an advisory facilitator connecting with authorized providers.",
                "order_index": 6
            }
        ]
        for s in services_data:
            db.add(Service(**s))
        db.commit()

    # 3. Seed Property Projects from Handwritten Profile
    if db.query(Project).count() == 0:
        projects_data = [
            {
                "slug": "shanmukha-sankalp-apartments",
                "title": "Shanmukha Sankalp Apartments",
                "category": "Apartments",
                "location": "Miyapur - Bachupally Corridor",
                "city": "Hyderabad",
                "state": "Telangana",
                "short_desc": "Modern residential apartment community with well-ventilated 2 & 3 BHK units and premium lifestyle amenities.",
                "full_desc": "Shanmukha Sankalp Apartments represents a prime residential landmark featuring approximately 90 thoughtfully crafted flats. Designed for contemporary urban living with spacious balconies, 100% Vaastu compliance, and convenient access to IT corridors, reputed schools, and healthcare centers.",
                "total_units": "Approx. 90 Flats (Details to be verified)",
                "property_type": "2 & 3 BHK Premium Apartments",
                "availability_status": "Enquire for Availability",
                "price_range": "Price on Request",
                "amenities": "Elevator, 24/7 Security & CCTV, Children Play Area, Power Backup, Covered Car Parking, Rainwater Harvesting",
                "project_status": "Ready to Move / Ongoing",
                "rera_number": "Subject to TG-RERA Registration Verification",
                "featured_image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
                "is_verified_label": "Project Profile Active",
                "is_published": True,
                "order_index": 1
            },
            {
                "slug": "anagha-western",
                "title": "Anagha Western",
                "category": "Apartments",
                "location": "Western Hyderabad Zone",
                "city": "Hyderabad",
                "state": "Telangana",
                "short_desc": "Contemporary urban living enclave designed for comfortable family living and high appreciation potential.",
                "full_desc": "Anagha Western brings together elegant architectural aesthetics, top-grade construction materials, and proximity to major arterial highways and commercial hubs in Western Hyderabad.",
                "total_units": "Multi-Unit Residential (To be verified)",
                "property_type": "2 & 3 BHK Flats",
                "availability_status": "Few Units Available",
                "price_range": "Contact for Best Pricing",
                "amenities": "Grand Entrance Lobby, High-Speed Lifts, DG Power Backup, Landscaped Garden, Security Surveillance",
                "project_status": "Ongoing Construction",
                "rera_number": "TG-RERA Verification in Progress",
                "featured_image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "is_verified_label": "Under Verification",
                "is_published": True,
                "order_index": 2
            },
            {
                "slug": "parambh-residential",
                "title": "Parambh Enclave",
                "category": "Residential Properties",
                "location": "Kompally - Medchal Highway Corridor",
                "city": "Hyderabad",
                "state": "Telangana",
                "short_desc": "Serene green residential community offering peaceful suburban living with urban connectivity.",
                "full_desc": "Parambh Enclave is designed for discerning families who value tranquil environments, open spaces, and modern architecture surrounded by green landscapes.",
                "total_units": "Boutique Residential Project",
                "property_type": "Luxury Living Spaces",
                "availability_status": "Booking Open",
                "price_range": "Affordable Luxury Segment",
                "amenities": "Jogging Track, Landscaping, Clubhouse, Solar Fencing, Dedicated Water Storage",
                "project_status": "Upcoming / Open for Booking",
                "rera_number": "Under Process",
                "featured_image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "is_verified_label": "Details to be Confirmed",
                "is_published": True,
                "order_index": 3
            },
            {
                "slug": "sv-constructions-independent-villas",
                "title": "Independent Houses & Custom Builds (S.V. Constructions)",
                "category": "Independent Houses",
                "location": "Prime Residential Sectors, Hyderabad",
                "city": "Hyderabad",
                "state": "Telangana",
                "short_desc": "Independent duplex houses, standalone villas, and custom architectural builds built to specifications.",
                "full_desc": "Offering customized independent homes with complete ownership of land and terrace. Built with quality structural standards and aesthetic interiors in established residential neighborhoods.",
                "total_units": "Custom Built / Independent Plots",
                "property_type": "Duplex Villas / Independent Houses",
                "availability_status": "Available on Order & Move-in",
                "price_range": "Custom Quote Available",
                "amenities": "Individual Borewell, Covered Portico, Terrace Lounge Area, Independent Electrical Meter",
                "project_status": "Ongoing & Ready Builds",
                "rera_number": "Individual Building Permissions",
                "featured_image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "is_verified_label": "Builder Association to be Confirmed",
                "is_published": True,
                "order_index": 4
            }
        ]
        for p in projects_data:
            db.add(Project(**p))
        db.commit()

    # 4. Seed Partners from Profile
    if db.query(Partner).count() == 0:
        partners_data = [
            {
                "name": "LIC Housing Finance (LIC HFL)",
                "relationship_status": "DSA Channel Relationship (Verification In Progress)",
                "service_categories": "Home Loans, Plot Purchase Loans, Construction Loans",
                "official_website": "https://www.lichousing.com",
                "disclosure_notes": "Facilitator & enquiry assistance. Not an official branch or representative of LIC Housing Finance Ltd.",
                "logo_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=200&q=80",
                "order_index": 1
            },
            {
                "name": "GIC Housing Finance (GIC HFL)",
                "relationship_status": "DSA Support (Relationship to be verified)",
                "service_categories": "Housing Loans, Balance Transfer, Home Extension",
                "official_website": "https://www.gichfindia.com",
                "disclosure_notes": "Enquiry coordination and documentation guidance.",
                "logo_url": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80",
                "order_index": 2
            },
            {
                "name": "Can Fin Homes Ltd",
                "relationship_status": "Channel DSA (Current authorization to be verified)",
                "service_categories": "Affordable Housing Finance, Composite Loans",
                "official_website": "https://www.canfinhomes.com",
                "disclosure_notes": "Customer liaison and preliminary document collection support.",
                "logo_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=200&q=80",
                "order_index": 3
            }
        ]
        for prt in partners_data:
            db.add(Partner(**prt))
        db.commit()
