import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ServiceItem } from '../types';
import { EnquiryForm } from '../components/EnquiryForm';
import { Landmark, Check, FileText, AlertCircle, ArrowRight, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (err) {
        console.error("Failed to load services", err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const filtered = activeTab === "All" ? services : services.filter(s => s.category === activeTab);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ background: 'var(--primary-navy)', color: '#FFFFFF', padding: '60px 0' }}>
        <div className="container">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>Advisory & Loan Assistance</span>
          <h1 style={{ fontSize: '2.8rem', color: '#FFFFFF', marginBottom: '12px' }}>
            Financial Services & Loan Advisory
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#CBD5E1', maxWidth: 700 }}>
            Structured, step-by-step guidance for Home Loans, Construction Finance, Mortgage Loans, and Insurance Solutions across Telangana.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="container" style={{ marginTop: '40px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {["All", "Loan", "Insurance"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "btn btn-primary" : "btn btn-outline"}
              style={{ padding: '8px 20px', fontSize: '0.9rem' }}
            >
              {tab === "All" ? "All Services" : `${tab} Services`}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {filtered.map((svc) => {
            const isExpanded = expandedId === svc.id;

            return (
              <div key={svc.id} className="custom-card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ width: 54, height: 54, borderRadius: '12px', background: 'rgba(221, 168, 83, 0.15)', color: 'var(--accent-gold-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Landmark size={28} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <h2 style={{ fontSize: '1.45rem', color: 'var(--primary-navy)' }}>{svc.title}</h2>
                        <span className="badge-navy">{svc.category}</span>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: 750, lineHeight: 1.6 }}>
                        {svc.short_desc}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                    className="btn btn-outline"
                    style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                  >
                    <span>{isExpanded ? "Hide Details" : "View Checklist & Details"}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                {/* Collapsible Details */}
                {isExpanded && (
                  <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E2E8F0', animation: 'fadeIn 0.3s ease' }}>
                    <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>
                      {svc.full_desc}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                      {svc.eligibility_info && (
                        <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                          <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-navy)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Check size={16} color="var(--accent-gold)" />
                            Eligibility Guidelines
                          </h4>
                          <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                            {svc.eligibility_info}
                          </p>
                        </div>
                      )}

                      {svc.documents_required && (
                        <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
                          <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-navy)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FileText size={16} color="var(--accent-gold)" />
                            Documentation Checklist
                          </h4>
                          <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                            {svc.documents_required}
                          </p>
                        </div>
                      )}
                    </div>

                    {svc.disclaimer && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFBEB', border: '1px solid #FDE68A', padding: '10px 16px', borderRadius: '8px', fontSize: '0.82rem', color: '#92400E', marginBottom: '20px' }}>
                        <AlertCircle size={16} style={{ flexShrink: 0 }} />
                        <span>{svc.disclaimer}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <a href="#enquiry-section" className="btn btn-primary">
                        <span>Enquire for {svc.title}</span>
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Enquiry Anchor Section */}
        <div id="enquiry-section" style={{ marginTop: '60px', background: '#F8FAFC', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0' }}>
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 30px' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)' }}>
              Submit a Loan or Advisory Enquiry
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Fill in your details below. C. Santosh Kumar will evaluate your requirement and assist you with preliminary documentation review.
            </p>
          </div>

          <div style={{ maxWidth: 650, margin: '0 auto' }}>
            <EnquiryForm defaultService="Home Loan" />
          </div>
        </div>
      </div>
    </div>
  );
};
