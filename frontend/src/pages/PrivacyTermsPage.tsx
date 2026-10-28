import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyTermsPage: React.FC<{ type: 'privacy' | 'terms' | 'disclaimer' }> = ({ type }) => {
  if (type === 'privacy') {
    return (
      <div style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: 850 }}>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
            Last updated: October 2026. Applicable to visitors and enquiry submissions on santoshkumar.in
          </p>
          <div style={{ background: '#FFFFFF', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', lineHeight: 1.7, fontSize: '0.95rem', color: '#334155' }}>
            <h3 style={{ color: 'var(--primary-navy)', marginBottom: '8px' }}>1. Information We Collect</h3>
            <p style={{ marginBottom: '16px' }}>
              We collect minimal personal information strictly required to respond to customer inquiries: your Name, Phone Number, Email Address (optional), Service Interest, and Loan Amount estimate.
            </p>
            <h3 style={{ color: 'var(--primary-navy)', marginBottom: '8px' }}>2. Strict Non-Collection of Sensitive Financial Data</h3>
            <p style={{ marginBottom: '16px' }}>
              We NEVER request or store Aadhaar numbers, PAN cards, NetBanking passwords, credit/debit card PINs, or OTPs through public enquiry forms on this website.
            </p>
            <h3 style={{ color: 'var(--primary-navy)', marginBottom: '8px' }}>3. How Information is Used</h3>
            <p style={{ marginBottom: '16px' }}>
              Your contact details are used exclusively by C. Santosh Kumar and authorized representatives to contact you via telephone, WhatsApp, or email regarding your specific financing or real estate enquiry.
            </p>
            <h3 style={{ color: 'var(--primary-navy)', marginBottom: '8px' }}>4. Data Security</h3>
            <p>
              Lead records are encrypted in transit via HTTPS and stored in access-controlled administrative databases with role-based permissions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'terms') {
    return (
      <div style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: 850 }}>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>
            Terms & Conditions
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
            General Terms of Engagement for Financial Advisory & Real Estate Services
          </p>
          <div style={{ background: '#FFFFFF', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', lineHeight: 1.7, fontSize: '0.95rem', color: '#334155' }}>
            <h3 style={{ color: 'var(--primary-navy)', marginBottom: '8px' }}>1. Scope of Services</h3>
            <p style={{ marginBottom: '16px' }}>
              C. Santosh Kumar acts as an advisory facilitator and authorized DSA channel liaison connecting borrowers and property purchasers with licensed banks, HFCs, and real estate developers.
            </p>
            <h3 style={{ color: 'var(--primary-navy)', marginBottom: '8px' }}>2. Independent Underwriting</h3>
            <p style={{ marginBottom: '16px' }}>
              All loan decisions, interest rate determinations, and property approvals are made independently by the respective lending institution or regulatory authorities. Submitting an enquiry does not constitute an agreement or guarantee of approval.
            </p>
            <h3 style={{ color: 'var(--primary-navy)', marginBottom: '8px' }}>3. Real Estate Transactions</h3>
            <p>
              Property measurements, prices, and specifications must be confirmed against registered developer agreements and Telangana RERA filings prior to financial commitment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 850 }}>
        <h1 style={{ fontSize: '2.4rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>
          Regulatory Disclaimers
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
          Mandatory Indian Banking and Real Estate Statutory Notices
        </p>
        <div style={{ background: '#FFFFFF', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', lineHeight: 1.7, fontSize: '0.95rem', color: '#334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold-hover)', fontWeight: 700, marginBottom: '10px' }}>
            <Shield size={20} />
            <span>Important Notice to Visitors</span>
          </div>
          <p style={{ marginBottom: '16px' }}>
            <strong>Banking Disclosures:</strong> C. Santosh Kumar is not a bank or licensed Non-Banking Financial Company (NBFC). Loan options are subject to the policies of the respective banks/lenders.
          </p>
          <p style={{ marginBottom: '16px' }}>
            <strong>Real Estate Disclosures:</strong> Real estate projects referenced on this website (such as Shanmukha Sankalp, Anagha Western, Parambh, S.V. Constructions) are governed by the Real Estate (Regulation and Development) Act, 2016 and TG-RERA regulations.
          </p>
          <p>
            <strong>Insurance Disclosures:</strong> Insurance is a subject matter of solicitation. All policy terms, conditions, and exclusions are determined exclusively by the respective registered insurer.
          </p>
        </div>
      </div>
    </div>
  );
};
