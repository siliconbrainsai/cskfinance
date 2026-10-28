import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { ServiceItem, ProjectItem, PartnerItem } from '../types';
import { EnquiryForm } from '../components/EnquiryForm';
import { LoanCalculator } from '../components/LoanCalculator';
import {
  ShieldCheck, Home, Landmark, Briefcase, Award, CheckCircle,
  ArrowRight, Phone, MessageSquare, ChevronRight, Building, Users, Clock, MapPin
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [sData, pData, prtData] = await Promise.all([
          api.getServices(),
          api.getProjects(),
          api.getPartners()
        ]);
        setServices(sData);
        setProjects(pData);
        setPartners(prtData);
      } catch (err) {
        console.error("Failed to load home data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      {/* 1. Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #07101E 0%, #0B192C 60%, #1E3E62 100%)',
        color: '#FFFFFF',
        padding: '90px 0 100px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background glow */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(221, 168, 83, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <div>
              <div className="badge-gold" style={{ marginBottom: '20px' }}>
                <Award size={14} />
                <span>17 Years Professional Excellence</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)', color: '#FFFFFF', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                Your Trusted Partner in <span style={{ color: 'var(--accent-gold)' }}>Financial Services</span> & Real Estate
              </h1>

              <p style={{ fontSize: '1.15rem', color: '#CBD5E1', marginBottom: '32px', lineHeight: 1.6, maxWidth: 600 }}>
                With 17 years of experience in Hyderabad and Telangana, <strong>C. Santosh Kumar (B.Com)</strong> assists clients in exploring tailored loan solutions, insurance coverage, and premier residential property projects.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '40px' }}>
                <Link to="/services" className="btn btn-primary" style={{ padding: '14px 26px' }}>
                  <span>Explore Services</span>
                  <ArrowRight size={18} />
                </Link>

                <Link to="/projects" className="btn btn-white" style={{ padding: '14px 24px' }}>
                  <span>View Property Projects</span>
                </Link>

                <a
                  href="#hero-enquiry-box"
                  className="btn btn-primary"
                  style={{ padding: '14px 24px', background: 'var(--secondary-navy)', color: '#FFFFFF', border: '1px solid var(--accent-gold)' }}
                >
                  <Briefcase size={17} color="var(--accent-gold)" />
                  <span>Get Free Consultation</span>
                </a>
              </div>

              {/* Verified Trust Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '8px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#FFFFFF' }}>10,000+</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Clients Assisted*</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '8px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#FFFFFF' }}>17 Years</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Financial Track Record</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '8px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                    <Landmark size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#FFFFFF' }}>Banking DSA</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Channel Liaison</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Enquiry Lead Box */}
            <div id="hero-enquiry-box">
              <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                <div style={{ padding: '16px 20px 8px' }}>
                  <span className="badge-navy">Quick Enquiry</span>
                  <h3 style={{ fontSize: '1.25rem', marginTop: '6px', color: 'var(--primary-navy)' }}>
                    Connect with C. Santosh Kumar
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                    Receive transparent, dedicated consultation for home loans, mortgages, or residential purchases.
                  </p>
                </div>
                <EnquiryForm defaultService="Home Loan" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Services Showcase */}
      <section className="section-padding" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 50px' }}>
            <span className="badge-gold">Comprehensive Portfolio</span>
            <h2 style={{ fontSize: '2.4rem', margin: '12px 0 16px' }}>Specialized Financial & Loan Services</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Benefit from experienced navigation of Indian banking procedures, institutional requirements, and documentation check-lists.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
            {services.map((svc) => (
              <div key={svc.id} className="custom-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ width: 50, height: 50, borderRadius: '12px', background: 'rgba(221, 168, 83, 0.15)', color: 'var(--accent-gold-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Landmark size={26} />
                    </div>
                    <span className="badge-navy">{svc.category}</span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--primary-navy)' }}>
                    {svc.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {svc.short_desc}
                  </p>
                </div>

                <div>
                  <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--primary-navy)', fontSize: '0.9rem' }}>
                      <span>View Eligibility & Docs</span>
                      <ChevronRight size={16} />
                    </Link>
                    <Link to="/contact" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/services" className="btn btn-navy">
              <span>View All Financial Services & Checklists</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Featured Real Estate Projects */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            <div>
              <span className="badge-gold">Property Portfolio</span>
              <h2 style={{ fontSize: '2.4rem', marginTop: '10px' }}>Featured Property Projects</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 600 }}>
                Explore curated apartment complexes, residential communities, and custom independent houses across key Hyderabad growth corridors.
              </p>
            </div>
            <Link to="/projects" className="btn btn-outline">
              <span>Browse All Properties</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
            {projects.slice(0, 3).map((proj) => (
              <div key={proj.id} className="custom-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
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

                    <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--primary-navy)' }}>
                      {proj.title}
                    </h3>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '16px' }}>
                      {proj.short_desc}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {proj.total_units && (
                        <span style={{ background: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', color: '#475569' }}>
                          {proj.total_units}
                        </span>
                      )}
                      <span style={{ background: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', color: '#475569' }}>
                        {proj.property_type}
                      </span>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Indicative Pricing</div>
                      <div style={{ fontWeight: 700, color: 'var(--primary-navy)', fontSize: '0.95rem' }}>{proj.price_range}</div>
                    </div>
                    <Link to="/contact" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                      Enquire Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Loan EMI Calculator Section */}
      <section className="section-padding" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <LoanCalculator />
        </div>
      </section>

      {/* 5. Banking Partners Directory Section */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 40px' }}>
            <span className="badge-gold">Institutional Relationships</span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '10px', marginBottom: '14px' }}>
              Banking & Financial Institutions
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Enquiry support and Direct Selling Agent (DSA) channel assistance for major housing finance and banking institutions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {partners.map((prt) => (
              <div key={prt.id} className="custom-card" style={{ padding: '28px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '10px', background: 'var(--primary-navy)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      <Landmark size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)' }}>{prt.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: '#B47B1F', fontWeight: 600 }}>{prt.relationship_status}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, marginBottom: '12px' }}>
                    {prt.service_categories}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', fontStyle: 'italic', background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px' }}>
                    {prt.disclosure_notes}
                  </p>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {prt.official_website && (
                    <a href={prt.official_website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--secondary-navy)', fontWeight: 600 }}>
                      Official Portal ↗
                    </a>
                  )}
                  <Link to="/contact" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                    Check Eligibility
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Santosh Kumar / Credibility Section */}
      <section className="section-padding" style={{ background: 'var(--primary-navy)', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <div>
              <span className="badge-gold" style={{ marginBottom: '16px' }}>Proven Guidance</span>
              <h2 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '20px' }}>
                Why Clients Rely on C. Santosh Kumar
              </h2>
              <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.7, marginBottom: '28px' }}>
                With a Bachelor of Commerce (B.Com) education and 17 dedicated years in the Telangana financial ecosystem, Santosh Kumar provides realistic, grounded advice that prioritizes long-term financial health and clear property titles.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <CheckCircle size={22} color="var(--accent-gold)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '4px' }}>Zero False Promises</h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>Honest eligibility assessment without misleading guarantees or concealed processing charges.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <CheckCircle size={22} color="var(--accent-gold)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '4px' }}>Complete Paperwork Liaison</h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>From municipal plan checks to legal search reports, bank documentation is handled with precision.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <CheckCircle size={22} color="var(--accent-gold)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '4px' }}>Verified Property Coordinates</h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>Assistance with RERA-compliant projects and legally sound freehold independent houses.</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-lg)', padding: '36px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.5rem', marginBottom: '14px' }}>
                Ready to Discuss Your Loan or Property Need?
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.6 }}>
                Call directly or send a message to arrange a personalized consultation session.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                <a href="tel:9296206177" className="btn btn-white" style={{ justifyContent: 'flex-start', padding: '14px 20px' }}>
                  <Phone size={18} color="var(--primary-navy)" />
                  <span>Call +91 9296206177</span>
                </a>

                <a
                  href={`https://wa.me/919296206177?text=${encodeURIComponent("Hello Santosh garu, I want to book an appointment to discuss financial services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ justifyContent: 'flex-start', padding: '14px 20px' }}
                >
                  <MessageSquare size={18} />
                  <span>WhatsApp Message</span>
                </a>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#64748B', textAlign: 'center' }}>
                Serviceable across Hyderabad, Secunderabad, and Telangana regions.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
