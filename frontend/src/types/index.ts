export interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  short_desc: string;
  full_desc: string;
  icon_name: string;
  eligibility_info?: string;
  documents_required?: string;
  disclaimer?: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
}

export interface ProjectImage {
  id: number;
  image_url: string;
  caption?: string;
  order_index: number;
}

export interface ProjectItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  city: string;
  state: string;
  short_desc: string;
  full_desc: string;
  total_units?: string;
  property_type?: string;
  availability_status: string;
  price_range: string;
  amenities?: string;
  project_status: string;
  rera_number?: string;
  featured_image?: string;
  is_verified_label: string;
  is_published: boolean;
  order_index: number;
  created_at: string;
  images: ProjectImage[];
}

export interface PartnerItem {
  id: number;
  name: string;
  relationship_status: string;
  service_categories: string;
  official_website?: string;
  disclosure_notes?: string;
  logo_url?: string;
  is_active: boolean;
  order_index: number;
}

export interface EnquiryNote {
  id: number;
  author_name: string;
  note: string;
  created_at: string;
}

export interface EnquiryItem {
  id: number;
  reference_id: string;
  full_name: string;
  phone: string;
  email?: string;
  service_required: string;
  project_id?: number;
  preferred_contact_method: string;
  loan_amount?: string;
  message?: string;
  consent: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  notes: EnquiryNote[];
}

export interface DashboardStats {
  total_enquiries: number;
  new_enquiries: number;
  contacted_enquiries: number;
  converted_enquiries: number;
  total_projects: number;
  total_services: number;
  total_partners: number;
}

export interface SiteSettings {
  phone: string;
  email: string;
  whatsapp: string;
  experience: string;
  location: string;
  qualifications: string;
  [key: string]: string;
}
