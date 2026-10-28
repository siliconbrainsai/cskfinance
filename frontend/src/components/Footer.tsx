import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, CheckCircle2, Award, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: 'var(--primary-dark)', color: '#94A3B8', paddingTop: '60px', borderTop: '1px solid #1E293B' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', paddingBottom: '50px' }}>
          {/* Column 1: Profile & Disclaimer */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'var(--secondary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', fontWeight: 800 }}>
                CSK
              </div>
              <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.15rem' }}>
                C. SANTOSH KUMAR
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px', color: '#94A3B8' }}>
              Financial Services Consultant & Real Estate Professional with 17 years of experience helping customers explore loan approvals, insurance protection, and quality residential property investments across Hyderabad and Telangana.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem' }}>
              <Award size={14} color="var(--accent-gold)" />
              <span>B.Com | 17 Years Professional Track Record</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '18px', position: 'relative' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/about" style={{ color: '#94A3B8', transition: 'color 0.2s' }}>About Santosh Kumar</Link></li>
              <li><Link to="/services" style={{ color: '#94A3B8' }}>Home & Construction Loans</Link></li>
              <li><Link to="/services" style={{ color: '#94A3B8' }}>Mortgage / Loan Against Property</Link></li>
              <li><Link to="/projects" style={{ color: '#94A3B8' }}>Featured Real Estate Projects</Link></li>
              <li><Link to="/partners" style={{ color: '#94A3B8' }}>Banking & Financial Directory</Link></li>
              <li><Link to="/calculator" style={{ color: '#94A3B8' }}>Interactive EMI Calculator</Link></li>
              <li><Link to="/contact" style={{ color: '#94A3B8' }}>Enquiry & Appointment</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '18px' }}>
              Contact Information
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Phone size={16} color="var(--accent-gold)" style={{ marginTop: 3 }} />
                <div>
                  <div style={{ color: '#E2E8F0', fontWeight: 600 }}>Phone Consultation</div>
                  <a href="tel:9296206177" style={{ color: '#94A3B8' }}>+91 9296206177</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Mail size={16} color="var(--accent-gold)" style={{ marginTop: 3 }} />
                <div>
                  <div style={{ color: '#E2E8F0', fontWeight: 600 }}>Email Address</div>
                  <a href="mailto:cherukupally.santosh@gmail.com" style={{ color: '#94A3B8' }}>cherukupally.santosh@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={16} color="var(--accent-gold)" style={{ marginTop: 3 }} />
                <div>
                  <div style={{ color: '#E2E8F0', fontWeight: 600 }}>Operating Area</div>
                  <span>Hyderabad & Major Locations in Telangana</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Clock size={16} color="var(--accent-gold)" style={{ marginTop: 3 }} />
                <div>
                  <div style={{ color: '#E2E8F0', fontWeight: 600 }}>Working Hours</div>
                  <span>Mon - Sat: 9:30 AM to 7:00 PM (IST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Compliance & Disclaimers */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '18px' }}>
              Statutory Disclaimers
            </h4>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.78rem', lineHeight: 1.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '6px' }}>
                <Shield size={14} />
                <span>Notice to Customers</span>
              </div>
              <p style={{ marginBottom: '8px' }}>
                All loan sanctioning, interest rates, eligibility appraisals, and disbursements are governed solely by respective authorized banks, HFCs, and financial institutions.
              </p>
              <p>
                Real estate project details and unit availability are based on project profile submissions and are subject to TG-RERA regulations and final builder agreement terms.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.82rem' }}>
          <div>
            © {new Date().getFullYear()} C. Santosh Kumar. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy" style={{ color: '#94A3B8' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: '#94A3B8' }}>Terms & Conditions</Link>
            <Link to="/disclaimer" style={{ color: '#94A3B8' }}>Regulatory Disclaimers</Link>
            <Link to="/admin" style={{ color: 'var(--accent-gold)' }}>Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
