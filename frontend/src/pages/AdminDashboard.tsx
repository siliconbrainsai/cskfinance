import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { EnquiryItem, DashboardStats, ProjectItem } from '../types';
import {
  Users, CheckCircle2, Clock, FileText, Phone, Mail,
  LogOut, Lock, Search, Filter, MessageSquare, AlertCircle, RefreshCw,
  Building, Upload, Plus, Trash2, Image as ImageIcon, Check
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [emailInput, setEmailInput] = useState('cherukupally.santosh@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'enquiries' | 'properties'>('enquiries');

  // Dashboard Data
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [newNote, setNewNote] = useState('');

  // Property Projects Management
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    slug: '',
    category: 'Apartments',
    location: '',
    city: 'Hyderabad',
    state: 'Telangana',
    short_desc: '',
    full_desc: '',
    property_type: '2 & 3 BHK Flats',
    total_units: '',
    price_range: 'Price on Request',
    amenities: 'Elevator, 24/7 Security, Car Parking, Power Backup',
    project_status: 'Ongoing Construction',
    rera_number: 'TG-RERA Under Verification',
    featured_image: '',
    is_verified_label: 'Under Verification',
    is_published: true
  });
  const [projectSaveSuccess, setProjectSaveSuccess] = useState(false);

  // Check login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    try {
      const form = new FormData();
      form.append('username', emailInput);
      form.append('password', passwordInput);
      const res = await api.login(form);
      localStorage.setItem('admin_token', res.access_token);
      setToken(res.access_token);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  // Load Admin Data
  const loadDashboardData = async () => {
    if (!token) return;
    try {
      const [statsData, enquiriesData, projectsData] = await Promise.all([
        api.getDashboardStats(token),
        api.getAdminEnquiries(token, statusFilter),
        api.getProjects()
      ]);
      setStats(statsData);
      setEnquiries(enquiriesData);
      setProjects(projectsData);
      if (selectedEnquiry) {
        const refreshed = enquiriesData.find(e => e.id === selectedEnquiry.id);
        if (refreshed) setSelectedEnquiry(refreshed);
      }
    } catch (err) {
      console.error("Session or fetch error", err);
      handleLogout();
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token, statusFilter]);

  const handleStatusChange = async (enquiryId: number, newStatus: string) => {
    if (!token) return;
    try {
      const updated = await api.updateEnquiryStatus(token, enquiryId, newStatus);
      setEnquiries(enquiries.map(e => e.id === enquiryId ? updated : e));
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry(updated);
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedEnquiry || !newNote.trim()) return;
    try {
      const updated = await api.addEnquiryNote(token, selectedEnquiry.id, newNote.trim());
      setEnquiries(enquiries.map(e => e.id === selectedEnquiry.id ? updated : e));
      setSelectedEnquiry(updated);
      setNewNote('');
    } catch (err) {
      alert("Failed to add follow-up note");
    }
  };

  // Handle Image Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!token || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingImage(true);
    try {
      const res = await api.uploadPropertyImage(token, file);
      setUploadedImageUrl(res.url);
      setNewProject(prev => ({ ...prev, featured_image: res.url }));
    } catch (err: any) {
      alert(err.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Add New Property
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const slugVal = newProject.slug.trim() || newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const payload = {
        ...newProject,
        slug: slugVal,
        featured_image: uploadedImageUrl || newProject.featured_image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
      };
      await api.createProject(token, payload);
      setProjectSaveSuccess(true);
      setTimeout(() => setProjectSaveSuccess(false), 3000);
      loadDashboardData();
      // reset form
      setNewProject({
        title: '',
        slug: '',
        category: 'Apartments',
        location: '',
        city: 'Hyderabad',
        state: 'Telangana',
        short_desc: '',
        full_desc: '',
        property_type: '2 & 3 BHK Flats',
        total_units: '',
        price_range: 'Price on Request',
        amenities: 'Elevator, 24/7 Security, Car Parking, Power Backup',
        project_status: 'Ongoing Construction',
        rera_number: 'TG-RERA Under Verification',
        featured_image: '',
        is_verified_label: 'Under Verification',
        is_published: true
      });
      setUploadedImageUrl(null);
    } catch (err: any) {
      alert(err.message || "Failed to create project");
    }
  };

  // Handle Delete Project
  const handleDeleteProject = async (id: number) => {
    if (!token) return;
    if (!window.confirm("Are you sure you want to remove this property project?")) return;
    try {
      await api.deleteProject(token, id);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || "Failed to delete project");
    }
  };

  // If not logged in, render Login View
  if (!token) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 440, width: '100%', background: '#FFFFFF', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: 50, height: 50, borderRadius: '12px', background: 'var(--primary-navy)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Lock size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Staff & Admin Portal</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              C. Santosh Kumar Lead Management System
            </p>
          </div>

          {loginError && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '10px 14px', borderRadius: '8px', marginBottom: '18px', fontSize: '0.85rem', color: '#B91C1C', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="btn btn-primary"
              style={{ width: '100%', padding: '13px' }}
            >
              {loggingIn ? "Signing in..." : "Sign In to Dashboard"}
            </button>

            <div style={{ marginTop: '20px', background: '#F1F5F9', padding: '12px', borderRadius: '8px', fontSize: '0.78rem', color: '#475569' }}>
              <strong>Pre-seeded Credentials:</strong><br />
              Email: <code>cherukupally.santosh@gmail.com</code><br />
              Password: <code>Santosh@Admin2026</code>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Interface
  return (
    <div style={{ background: '#F1F5F9', minHeight: '90vh', padding: '30px 0 60px' }}>
      <div className="container">
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)' }}>
              C. Santosh Kumar — Portal Administration
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Lead CRM, Property Projects Showcase, and Image Media Uploads.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={loadDashboardData} className="btn btn-outline" style={{ background: '#FFFFFF', padding: '8px 14px', fontSize: '0.85rem' }}>
              <RefreshCw size={15} />
              <span>Refresh</span>
            </button>
            <button onClick={handleLogout} className="btn btn-navy" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={activeTab === 'enquiries' ? 'btn btn-primary' : 'btn btn-white'}
            style={{ padding: '10px 20px', fontSize: '0.92rem' }}
          >
            <Users size={16} />
            <span>Customer Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={activeTab === 'properties' ? 'btn btn-primary' : 'btn btn-white'}
            style={{ padding: '10px 20px', fontSize: '0.92rem' }}
          >
            <Building size={16} />
            <span>Property Projects & Photo Uploads ({projects.length})</span>
          </button>
        </div>

        {/* Quick Statistics Banner */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '18px', marginBottom: '32px' }}>
            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Total Enquiries</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: 4 }}>{stats.total_enquiries}</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 600, textTransform: 'uppercase' }}>New Leads</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563EB', marginTop: 4 }}>{stats.new_enquiries}</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.78rem', color: '#D97706', fontWeight: 600, textTransform: 'uppercase' }}>Contacted</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D97706', marginTop: 4 }}>{stats.contacted_enquiries}</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 600, textTransform: 'uppercase' }}>Converted / Closed</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16A34A', marginTop: 4 }}>{stats.converted_enquiries}</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Active Projects</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: 4 }}>{projects.length}</div>
            </div>
          </div>
        )}

        {/* 1. ENQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div style={{ display: 'grid', gridTemplateColumns: selectedEnquiry ? '1.3fr 1fr' : '1fr', gap: '24px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)' }}>
                  Customer Enquiries ({enquiries.length})
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Filter:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem', background: '#FFFFFF' }}
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow-up Required">Follow-up Required</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              {enquiries.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
                  No enquiries found under the selected filter.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '12px 16px' }}>Ref ID</th>
                        <th style={{ padding: '12px 16px' }}>Customer Name</th>
                        <th style={{ padding: '12px 16px' }}>Service</th>
                        <th style={{ padding: '12px 16px' }}>Phone</th>
                        <th style={{ padding: '12px 16px' }}>Status</th>
                        <th style={{ padding: '12px 16px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.map((enq) => {
                        const isSelected = selectedEnquiry?.id === enq.id;
                        return (
                          <tr
                            key={enq.id}
                            onClick={() => setSelectedEnquiry(enq)}
                            style={{
                              borderBottom: '1px solid #F1F5F9',
                              background: isSelected ? '#EFF6FF' : 'transparent',
                              cursor: 'pointer',
                              transition: 'background 0.15s'
                            }}
                          >
                            <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--primary-navy)' }}>
                              {enq.reference_id}
                            </td>
                            <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                              {enq.full_name}
                            </td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>
                              {enq.service_required}
                            </td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>
                              {enq.phone}
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <span style={{
                                display: 'inline-block',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                background:
                                  enq.status === 'New' ? '#DBEAFE' :
                                  enq.status === 'Contacted' ? '#FEF3C7' :
                                  enq.status === 'Converted' ? '#DCFCE7' : '#F1F5F9',
                                color:
                                  enq.status === 'New' ? '#1E40AF' :
                                  enq.status === 'Contacted' ? '#92400E' :
                                  enq.status === 'Converted' ? '#166534' : '#475569'
                              }}>
                                {enq.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedEnquiry(enq); }}
                                style={{ background: 'none', border: 'none', color: 'var(--secondary-navy)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}
                              >
                                Inspect
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {selectedEnquiry && (
              <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-sm)', height: 'fit-content' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Enquiry Details</div>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)' }}>{selectedEnquiry.full_name}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-hover)', fontWeight: 600 }}>{selectedEnquiry.reference_id}</span>
                  </div>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: '#94A3B8' }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: 6 }}>
                    Update Lead Status
                  </label>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600, background: '#FFFFFF' }}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow-up Required">Follow-up Required</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Phone:</span>
                    <a href={`tel:${selectedEnquiry.phone}`} style={{ fontWeight: 600, color: 'var(--secondary-navy)' }}>
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Email:</span>
                    <span style={{ fontWeight: 500 }}>{selectedEnquiry.email || 'Not provided'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Service:</span>
                    <span style={{ fontWeight: 600 }}>{selectedEnquiry.service_required}</span>
                  </div>
                  {selectedEnquiry.loan_amount && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748B' }}>Budget/Amount:</span>
                      <span style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>{selectedEnquiry.loan_amount}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Preferred Method:</span>
                    <span>{selectedEnquiry.preferred_contact_method}</span>
                  </div>
                </div>

                {selectedEnquiry.message && (
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 4 }}>Customer Message:</span>
                    <p style={{ color: '#334155', fontStyle: 'italic' }}>"{selectedEnquiry.message}"</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="btn btn-navy"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem' }}
                  >
                    <Phone size={14} />
                    <span>Call Customer</span>
                  </a>
                  <a
                    href={`https://wa.me/91${selectedEnquiry.phone}?text=${encodeURIComponent(`Hello ${selectedEnquiry.full_name}, C. Santosh Kumar here regarding your ${selectedEnquiry.service_required} enquiry (${selectedEnquiry.reference_id}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem' }}
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-navy)', marginBottom: '12px' }}>
                    Follow-up Notes ({selectedEnquiry.notes.length})
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto', marginBottom: '14px' }}>
                    {selectedEnquiry.notes.length === 0 ? (
                      <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>No notes recorded yet.</span>
                    ) : (
                      selectedEnquiry.notes.map((n) => (
                        <div key={n.id} style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.72rem', marginBottom: 2 }}>
                            <span style={{ fontWeight: 600 }}>{n.author_name}</span>
                            <span>{new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div style={{ color: '#1E293B' }}>{n.note}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Add follow-up note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none' }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
                      Add
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. PROPERTY PROJECTS & PHOTO UPLOADS TAB */}
        {activeTab === 'properties' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '28px', alignItems: 'flex-start' }}>
            {/* Left: Add New Property with Photo Upload */}
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: 40, height: 40, borderRadius: '8px', background: 'rgba(221, 168, 83, 0.15)', color: 'var(--accent-gold-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)' }}>Add New Property & Upload Photos</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Upload project site pictures and publish listings directly to the website.</p>
                </div>
              </div>

              {projectSaveSuccess && (
                <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', color: '#15803D', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                  <Check size={18} />
                  <span>Property project published successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProject}>
                {/* Photo Upload Box */}
                <div style={{ marginBottom: '20px', padding: '16px', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '2px dashed #CBD5E1', textAlign: 'center' }}>
                  {uploadedImageUrl ? (
                    <div>
                      <img src={uploadedImageUrl} alt="Preview" style={{ maxHeight: 180, width: '100%', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                      <div style={{ fontSize: '0.8rem', color: '#15803D', fontWeight: 600 }}>✓ Property Image Uploaded</div>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon size={36} color="var(--accent-gold)" style={{ margin: '0 auto 8px' }} />
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-navy)' }}>Upload Project Photograph</div>
                      <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '12px' }}>Supports JPG, PNG, WEBP up to 10MB</p>
                    </div>
                  )}

                  <label className="btn btn-navy" style={{ padding: '8px 16px', fontSize: '0.82rem', cursor: 'pointer', display: 'inline-flex' }}>
                    <Upload size={14} />
                    <span>{uploadingImage ? "Uploading..." : "Select Image from Device"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S.V. Enclave"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#FFFFFF' }}
                    >
                      <option value="Apartments">Apartments</option>
                      <option value="Residential Properties">Residential Properties</option>
                      <option value="Independent Houses">Independent Houses</option>
                      <option value="Construction Projects">Construction Projects</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Location / Area *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bachupally, Hyderabad"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Price Range</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹65 Lakhs onwards"
                      value={newProject.price_range}
                      onChange={(e) => setNewProject({ ...newProject, price_range: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Property Type</label>
                    <input
                      type="text"
                      placeholder="e.g. 2 & 3 BHK Luxury Flats"
                      value={newProject.property_type}
                      onChange={(e) => setNewProject({ ...newProject, property_type: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>RERA Status</label>
                    <input
                      type="text"
                      placeholder="e.g. TG-RERA Approved"
                      value={newProject.rera_number}
                      onChange={(e) => setNewProject({ ...newProject, rera_number: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Short Summary *</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief 1-sentence headline for cards"
                    value={newProject.short_desc}
                    onChange={(e) => setNewProject({ ...newProject, short_desc: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Detailed Description</label>
                  <textarea
                    rows={3}
                    placeholder="Comprehensive description of the layout, structure, and location advantages..."
                    value={newProject.full_desc}
                    onChange={(e) => setNewProject({ ...newProject, full_desc: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                  <Plus size={16} />
                  <span>Publish Property Listing</span>
                </button>
              </form>
            </div>

            {/* Right: Existing Properties Gallery & Quick Delete */}
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>
                Existing Real Estate Listings ({projects.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ background: '#FFFFFF', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                    <img
                      src={proj.featured_image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80"}
                      alt={proj.title}
                      style={{ width: 90, height: 75, objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ fontSize: '1rem', color: 'var(--primary-navy)' }}>{proj.title}</h4>
                        <span className="badge-navy">{proj.category}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 2 }}>{proj.location}, {proj.city}</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-gold-hover)', marginTop: 4 }}>{proj.price_range}</div>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      title="Delete Property"
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: 8 }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
