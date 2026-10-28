import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ProjectItem } from '../types';
import { MapPin, Building, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { EnquiryForm } from '../components/EnquiryForm';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [enquiringProject, setEnquiringProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = ["All", "Apartments", "Residential Properties", "Independent Houses"];
  const filtered = selectedCategory === "All" ? projects : projects.filter(p => p.category === selectedCategory);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ background: 'var(--primary-navy)', color: '#FFFFFF', padding: '60px 0' }}>
        <div className="container">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>Real Estate Portfolio</span>
          <h1 style={{ fontSize: '2.8rem', color: '#FFFFFF', marginBottom: '12px' }}>
            Featured Real Estate Projects
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#CBD5E1', maxWidth: 700 }}>
            Curated apartment complexes, gated layouts, and independent residential builds in Hyderabad and surrounding growth zones.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="container" style={{ marginTop: '40px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? "btn btn-primary" : "btn btn-outline"}
              style={{ padding: '8px 20px', fontSize: '0.9rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Showcase */}
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
          {filtered.map((proj) => (
            <div key={proj.id} className="custom-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                <img
                  src={proj.featured_image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"}
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: 14, left: 14 }}>
                  <span style={{ background: 'rgba(7, 16, 30, 0.85)', backdropFilter: 'blur(4px)', color: 'var(--accent-gold)', padding: '5px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                    {proj.category}
                  </span>
                </div>
                <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
                  <span style={{ background: 'rgba(255, 255, 255, 0.95)', color: 'var(--primary-navy)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {proj.is_verified_label}
                  </span>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
                    <MapPin size={15} color="var(--accent-gold)" />
                    <span>{proj.location}, {proj.city}</span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '10px', color: 'var(--primary-navy)' }}>
                    {proj.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '18px' }}>
                    {proj.full_desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
                    {proj.total_units && (
                      <span style={{ background: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', color: '#475569' }}>
                        {proj.total_units}
                      </span>
                    )}
                    <span style={{ background: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', color: '#475569' }}>
                      {proj.property_type}
                    </span>
                    <span style={{ background: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', color: '#475569' }}>
                      {proj.project_status}
                    </span>
                  </div>

                  {proj.amenities && (
                    <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                        Key Amenities
                      </span>
                      <p style={{ fontSize: '0.82rem', color: '#334155' }}>
                        {proj.amenities}
                      </p>
                    </div>
                  )}

                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={14} color="var(--accent-gold)" />
                    <span>RERA Status: {proj.rera_number}</span>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Price Range</div>
                    <div style={{ fontWeight: 700, color: 'var(--primary-navy)', fontSize: '1rem' }}>{proj.price_range}</div>
                  </div>
                  <button
                    onClick={() => setEnquiringProject(proj)}
                    className="btn btn-primary"
                    style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                  >
                    Enquire on Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Enquiring directly on a selected project */}
        {enquiringProject && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(7, 16, 30, 0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)' }}>Project Enquiry</h3>
                <button
                  onClick={() => setEnquiringProject(null)}
                  style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748B' }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: '24px' }}>
                <EnquiryForm
                  defaultService="Real Estate / Property"
                  projectId={enquiringProject.id}
                  projectTitle={enquiringProject.title}
                  onSuccess={() => {
                    setTimeout(() => setEnquiringProject(null), 3000);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
