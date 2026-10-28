import React from 'react';
import { Landmark, ShieldCheck } from 'lucide-react';

interface PartnerLogo {
  name: string;
  category: string;
  badge: string;
  logoUrl?: string;
  abbr: string;
  accentColor: string;
}

const partnersList: PartnerLogo[] = [
  {
    name: "LIC Housing Finance Ltd (LIC HFL)",
    category: "Housing & Plot Loans",
    badge: "DSA Channel Support",
    abbr: "LIC HFL",
    accentColor: "#EAB308",
    logoUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "State Bank of India (SBI)",
    category: "Home & Term Loans",
    badge: "Banking Network",
    abbr: "SBI",
    accentColor: "#0284C7",
    logoUrl: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "GIC Housing Finance (GIC HFL)",
    category: "Home Equity & Mortgage",
    badge: "DSA Channel Support",
    abbr: "GIC HFL",
    accentColor: "#059669",
    logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "HDFC Bank",
    category: "Retail & Mortgage Finance",
    badge: "Premier Housing Finance",
    abbr: "HDFC",
    accentColor: "#1D4ED8",
    logoUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Can Fin Homes Ltd",
    category: "Affordable Housing Finance",
    badge: "Channel Coordination",
    abbr: "CAN FIN",
    accentColor: "#D97706",
    logoUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "ICICI Bank",
    category: "Express Home Loans",
    badge: "Banking Network",
    abbr: "ICICI",
    accentColor: "#DC2626",
    logoUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Axis Bank",
    category: "Home & Business Credit",
    badge: "Lender Network",
    abbr: "AXIS",
    accentColor: "#9333EA",
    logoUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Bajaj Finserv",
    category: "Mortgage & Business Loans",
    badge: "Finance Partner",
    abbr: "BAJAJ",
    accentColor: "#2563EB",
    logoUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=150&q=80"
  }
];

export const InfinitePartnerMarquee: React.FC = () => {
  // Duplicate array so seamless infinite loop scrolls smoothly
  const marqueeItems = [...partnersList, ...partnersList];

  return (
    <section style={{
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      padding: '45px 0 50px',
      borderTop: '1px solid #E2E8F0',
      borderBottom: '1px solid #E2E8F0',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(221, 168, 83, 0.12)', padding: '5px 14px', borderRadius: '9999px', fontSize: '0.78rem', color: '#B47B1F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
          <ShieldCheck size={14} color="var(--accent-gold-hover)" />
          <span>Institutional Channel Facilitation & Enquiry Directory</span>
        </div>
        <h3 style={{ fontSize: '1.45rem', color: 'var(--primary-navy)', fontWeight: 700 }}>
          Assisted Banking & Housing Finance Partners
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 650, margin: '6px auto 0' }}>
          Facilitating loan eligibility comparisons, document coordination, and DSA channel liaison across premier institutions.
        </p>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {marqueeItems.map((item, idx) => (
            <div key={`${item.abbr}-${idx}`} className="marquee-card">
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '10px',
                background: 'var(--primary-navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: item.accentColor,
                fontWeight: 800,
                fontSize: '0.82rem',
                border: `2px solid ${item.accentColor}`,
                flexShrink: 0
              }}>
                {item.abbr}
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--primary-navy)', letterSpacing: '-0.01em' }}>
                  {item.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 3 }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {item.category}
                  </span>
                  <span style={{
                    fontSize: '0.68rem',
                    background: '#F1F5F9',
                    color: '#475569',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {item.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
