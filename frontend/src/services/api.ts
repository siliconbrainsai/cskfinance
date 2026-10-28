import { ServiceItem, ProjectItem, PartnerItem, EnquiryItem, DashboardStats, SiteSettings } from '../types';

const API_BASE = '/api/v1';

export const api = {
  // Public
  async getServices(): Promise<ServiceItem[]> {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },

  async getService(slug: string): Promise<ServiceItem> {
    const res = await fetch(`${API_BASE}/services/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch service detail');
    return res.json();
  },

  async getProjects(category?: string): Promise<ProjectItem[]> {
    const url = category && category !== 'All' ? `${API_BASE}/projects?category=${encodeURIComponent(category)}` : `${API_BASE}/projects`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async getProject(slug: string): Promise<ProjectItem> {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch project detail');
    return res.json();
  },

  async getPartners(): Promise<PartnerItem[]> {
    const res = await fetch(`${API_BASE}/partners`);
    if (!res.ok) throw new Error('Failed to fetch partners');
    return res.json();
  },

  async submitEnquiry(data: Partial<EnquiryItem>): Promise<EnquiryItem> {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to submit enquiry');
    }
    return res.json();
  },

  async getSiteSettings(): Promise<SiteSettings> {
    const res = await fetch(`${API_BASE}/site-settings/public`);
    if (!res.ok) throw new Error('Failed to fetch site settings');
    return res.json();
  },

  // Auth
  async login(formData: FormData): Promise<{ access_token: string; token_type: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Invalid login credentials');
    }
    return res.json();
  },

  async getMe(token: string) {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Session expired');
    return res.json();
  },

  // Admin
  async getDashboardStats(token: string): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to load dashboard statistics');
    return res.json();
  },

  async getAdminEnquiries(token: string, status?: string): Promise<EnquiryItem[]> {
    const url = status && status !== 'All' ? `${API_BASE}/admin/enquiries?status=${encodeURIComponent(status)}` : `${API_BASE}/admin/enquiries`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to load enquiries');
    return res.json();
  },

  async updateEnquiryStatus(token: string, id: number, status: string): Promise<EnquiryItem> {
    const res = await fetch(`${API_BASE}/admin/enquiries/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update enquiry status');
    return res.json();
  },

  async addEnquiryNote(token: string, id: number, note: string): Promise<EnquiryItem> {
    const res = await fetch(`${API_BASE}/admin/enquiries/${id}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ note })
    });
    if (!res.ok) throw new Error('Failed to add note');
    return res.json();
  },

  async uploadPropertyImage(token: string, file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/admin/upload-image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to upload image');
    }
    return res.json();
  },

  async createProject(token: string, projectData: Partial<ProjectItem>): Promise<ProjectItem> {
    const res = await fetch(`${API_BASE}/admin/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to save property project');
    }
    return res.json();
  },

  async deleteProject(token: string, id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Failed to delete project');
  }
};
