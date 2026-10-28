import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MessageSquare, Shield, Menu, X, Landmark, Home, Award } from 'lucide-react';

interface NavbarProps {
  phone?: string;
  whatsapp?: string;
  email?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  phone = "9296206177",
  whatsapp = "919296206177",
  email = "cherukupally.santosh@gmail.com"
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About Santosh", path: "/about" },
    { title: "Financial Services", path: "/services" },
    { title: "Property Projects", path: "/projects" },
    { title: "Banking Partners", path: "/partners" },
    { title: "EMI Calculator", path: "/calculator" },
    { title: "Contact", path: "/contact" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 900, background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
      {/* Top Bar with verified draft contact info */}
      <div style={{ background: 'var(--primary-navy)', color: '#94A3B8', fontSize: '0.85rem', padding: '6px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#E2E8F0' }}>
              <Award size={14} color="var(--accent-gold)" />
              17+ Years Industry Experience | Financial Services & Real Estate
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(221, 168, 83, 0.2)', color: 'var(--accent-gold)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
              Hyderabad & Telangana
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href={`tel:${phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#E2E8F0', transition: 'color 0.2s' }}>
              <Phone size={13} color="var(--accent-gold)" />
              <span>+91 {phone}</span>
            </a>
            <a href={`mailto:${email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#E2E8F0' }}>
              <Mail size={13} color="var(--accent-gold)" />
              <span>{email}</span>
            </a>
            <Link to="/admin" style={{ color: '#94A3B8', fontSize: '0.78rem', borderLeft: '1px solid #334155', paddingLeft: '12px' }}>
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 44, height: 44, borderRadius: '10px', background: 'var(--primary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', fontWeight: 800, fontSize: '1.25rem', border: '1px solid var(--accent-gold)' }}>
            CSK
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary-navy)', letterSpacing: '-0.01em' }}>
              C. SANTOSH KUMAR
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Financial Services & Real Estate Consultant (B.Com)
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                fontSize: '0.92rem',
                fontWeight: isActive(item.path) ? 700 : 500,
                color: isActive(item.path) ? 'var(--accent-gold-hover)' : 'var(--primary-navy)',
                position: 'relative',
                padding: '6px 0',
                transition: 'color 0.2s'
              }}
            >
              {item.title}
              {isActive(item.path) && (
                <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'var(--accent-gold)', borderRadius: 2 }} />
              )}
            </Link>
          ))}
        </nav>

        {/* Quick CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href={`tel:${phone}`}
            className="btn btn-outline"
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <Phone size={15} color="var(--accent-gold-hover)" />
            <span>Call: +91 {phone}</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--primary-navy)' }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '8px 0',
                fontSize: '1rem',
                fontWeight: isActive(item.path) ? 700 : 500,
                color: isActive(item.path) ? 'var(--accent-gold-hover)' : 'var(--primary-navy)'
              }}
            >
              {item.title}
            </Link>
          ))}
          <div style={{ paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ color: '#64748B', fontSize: '0.9rem' }}>
              Admin Dashboard Login
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};
