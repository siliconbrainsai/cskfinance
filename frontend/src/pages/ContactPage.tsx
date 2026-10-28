import React from 'react';
import { EnquiryForm } from '../components/EnquiryForm';
import { Phone, Mail, MapPin, Clock, MessageSquare, Shield, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ background: 'var(--primary-navy)', color: '#FFFFFF', padding: '60px 0' }}>
        <div className="container">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>Get in Touch</span>
          <h1 style={{ fontSize: '2.8rem', color: '#FFFFFF', marginBottom: '12px' }}>
            Contact & Consultation
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#CBD5E1', maxWidth: 700 }}>
            Connect directly with C. Santosh Kumar for customized home financing, property acquisition enquiries, or insurance advisory.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'flex-start' }}>
          {/* Left Contact Details */}
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>
              Direct Contact Channels
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '30px' }}>
              Feel free to call during office hours or send a WhatsApp message anytime. All customer submissions are treated with utmost privacy.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
              <div className="custom-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(221, 168, 83, 0.15)', color: 'var(--accent-gold-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Phone Enquiries</div>
                  <a href="tel:9296206177" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                    +91 9296206177
                  </a>
                </div>
              </div>

              <div className="custom-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>WhatsApp Direct</div>
                  <a
                    href={`https://wa.me/919296206177?text=${encodeURIComponent("Hello Santosh garu, I am contacting you from the website.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '1.15rem', fontWeight: 700, color: '#15803D' }}
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="custom-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(30, 62, 98, 0.12)', color: 'var(--secondary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Email Correspondence</div>
                  <a href="mailto:cherukupally.santosh@gmail.com" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-navy)' }}>
                    cherukupally.santosh@gmail.com
                  </a>
                </div>
              </div>

              <div className="custom-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(100, 116, 139, 0.12)', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Consultation Timings</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary-navy)' }}>
                    Mon – Sat: 9:30 AM to 7:00 PM (IST)
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', display: 'flex', gap: '12px' }}>
              <Shield size={20} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.5 }}>
                <strong>No Advance Commission Policy:</strong> We never charge unauthorized advance service fees or request confidential passwords/banking OTPs.
              </div>
            </div>
          </div>

          {/* Right Lead Submission Form */}
          <div>
            <div style={{ marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Send a Direct Consultation Request</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                We respond to all qualified queries within 1 business day.
              </p>
            </div>
            <EnquiryForm defaultService="Home Loan" />
          </div>
        </div>
      </div>
    </div>
  );
};
