import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { PartnerItem } from '../types';
import { Landmark, Shield, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const data = await api.getPartners();
        setPartners(data);
      } catch (err) {
        console.error("Failed to fetch partners", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ background: 'var(--primary-navy)', color: '#FFFFFF', padding: '60px 0' }}>
        <div className="container">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>Institutional Directory</span>
          <h1 style={{ fontSize: '2.8rem', color: '#FFFFFF', marginBottom: '12px' }}>
            Banking & Financial Institutions
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#CBD5E1', maxWidth: 700 }}>
            Directory of Housing Finance Companies (HFCs), Scheduled Banks, and DSA Channel Networks through which customer loan enquiries are facilitated.
          </p>
        </div>
      </section>

      {/* Directory Content */}
      <div className="container" style={{ marginTop: '50px' }}>
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '20px 24px', borderRadius: 'var(--radius-md)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309', fontWeight: 700, marginBottom: '6px' }}>
            <Shield size={20} />
            <span>Transparency & Channel Relationship Notice</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#92400E', lineHeight: 1.6 }}>
            C. Santosh Kumar acts as an independent Direct Selling Agent (DSA) liaison / customer consultant. This website is not directly owned, managed, or endorsed by any specific bank or HFC. Logos and names are cited solely for institutional identification and preliminary customer guidance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
          {partners.map((prt) => (
            <div key={prt.id} className="custom-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '12px', background: 'var(--primary-navy)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800 }}>
                    <Landmark size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)' }}>{prt.name}</h3>
                    <div style={{ display: 'inline-block', background: 'rgba(221, 168, 83, 0.15)', color: '#B47B1F', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600, marginTop: 2 }}>
                      {prt.relationship_status}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.04em' }}>Service Coverage</span>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 500, marginTop: 2 }}>
                    {prt.service_categories}
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 2 }}>
                    Disclosure & Operations Note:
                  </span>
                  <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                    {prt.disclosure_notes}
                  </p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {prt.official_website ? (
                  <a
                    href={prt.official_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--secondary-navy)', fontWeight: 600 }}
                  >
                    <span>Visit Institution</span>
                    <ExternalLink size={14} />
                  </a>
                ) : <div />}

                <Link to="/contact" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  Enquire for Loan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
