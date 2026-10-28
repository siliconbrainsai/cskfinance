import React from 'react';
import { Award, CheckCircle2, Shield, User, FileText, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header banner */}
      <section style={{ background: 'var(--primary-navy)', color: '#FFFFFF', padding: '60px 0' }}>
        <div className="container">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>Professional Profile</span>
          <h1 style={{ fontSize: '2.8rem', color: '#FFFFFF', marginBottom: '12px' }}>
            About C. Santosh Kumar
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#CBD5E1', maxWidth: 700 }}>
            Dedicated Financial Services Consultant & Real Estate Professional with a 17-year record of advisory integrity and customer guidance in Telangana.
          </p>
        </div>
      </section>

      {/* Main Profile Info */}
      <section className="container" style={{ marginTop: '50px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'flex-start' }}>
          <div>
            <div className="custom-card" style={{ padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary-navy)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800 }}>
                  CSK
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>C. Santosh Kumar</h2>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Financial & Real Estate Advisor</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(221, 168, 83, 0.15)', color: '#B47B1F', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600, marginTop: 4 }}>
                    B.Com Graduate | 17 Yrs Exp.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', borderTop: '1px solid #E2E8F0', paddingTop: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.05em' }}>Academic Qualification</span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-navy)' }}>Bachelor of Commerce (B.Com)</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.05em' }}>Total Experience</span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-navy)' }}>17 Years in Financial Services & Real Estate</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.05em' }}>Customer Outreach</span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-navy)' }}>10,000+ Clients Assisted across Telangana (As per profile records)</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.05em' }}>Geographic Focus</span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-navy)' }}>Hyderabad, Secunderabad, and greater Telangana State</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.05em' }}>Operating Model</span>
                  <div style={{ fontSize: '0.92rem', color: '#475569' }}>Authorized Direct Selling Agent (DSA) Channel Relationships (Subject to ongoing institutional verification)</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>
              Professional Journey & Mission
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Over the past 17 years, C. Santosh Kumar has developed deep expertise across retail banking loans, housing finance processes, and residential real estate dynamics in Telangana. Having guided salaried individuals, business owners, and first-time home buyers, his focus has always remained on clear communication and compliance.
            </p>

            <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', margin: '24px 0 12px' }}>
              Core Philosophy & Values
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                <CheckCircle2 size={24} color="var(--accent-gold)" style={{ marginBottom: 8 }} />
                <h5 style={{ fontSize: '1.05rem', marginBottom: 4 }}>Complete Transparency</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Upfront clarity regarding loan eligibility, documentation requirements, and banking policies.</p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                <CheckCircle2 size={24} color="var(--accent-gold)" style={{ marginBottom: 8 }} />
                <h5 style={{ fontSize: '1.05rem', marginBottom: 4 }}>Responsible Guidance</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Advising tenures and loan amounts that maintain long-term financial stability without distress.</p>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold-hover)', fontWeight: 700, marginBottom: '6px' }}>
                <Shield size={18} />
                <span>Statutory Compliance Commitment</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                In accordance with professional standards and consumer protection guidelines, C. Santosh Kumar does not charge unauthorized advance fees, guarantee loan approvals, or misrepresent property approvals. All listings adhere to TG-RERA and municipal sanction parameters.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary">
                <span>Book a Consultation</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn btn-navy">
                <span>Explore Financial Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
