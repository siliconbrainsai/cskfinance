import React, { useState } from 'react';
import { api } from '../services/api';
import { CheckCircle2, AlertCircle, Send, Loader2, Shield } from 'lucide-react';

interface EnquiryFormProps {
  defaultService?: string;
  projectId?: number;
  projectTitle?: string;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  defaultService = "Home Loan",
  projectId,
  projectTitle,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    service_required: defaultService,
    loan_amount: '',
    preferred_contact_method: 'Phone',
    message: '',
    consent: true
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.full_name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.consent) {
      setErrorMsg("You must grant consent to be contacted regarding your enquiry.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        project_id: projectId
      };
      const res = await api.submitEnquiry(payload);
      setSubmittedRef(res.reference_id);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submittedRef) {
    return (
      <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 'var(--radius-lg)', padding: '36px 28px', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#22C55E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle2 size={32} />
        </div>
        <h3 style={{ color: '#15803D', marginBottom: '8px' }}>Enquiry Received Successfully!</h3>
        <p style={{ color: '#166534', fontSize: '0.95rem', marginBottom: '16px' }}>
          Thank you for reaching out. C. Santosh Kumar or an authorized representative will review your requirement and connect with you shortly.
        </p>
        <div style={{ display: 'inline-block', background: '#DCFCE7', padding: '8px 18px', borderRadius: '8px', border: '1px dashed #22C55E', fontSize: '0.92rem', color: '#14532D', fontWeight: 600, marginBottom: '20px' }}>
          Reference ID: {submittedRef}
        </div>
        <p style={{ fontSize: '0.85rem', color: '#4ADE80' }}>
          A confirmation record has been logged in our system.
        </p>
        <button
          onClick={() => {
            setSubmittedRef(null);
            setFormData({
              full_name: '',
              phone: '',
              email: '',
              service_required: defaultService,
              loan_amount: '',
              preferred_contact_method: 'Phone',
              message: '',
              consent: true
            });
          }}
          className="btn btn-navy"
          style={{ marginTop: '16px' }}
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
      {projectTitle && (
        <div style={{ background: 'rgba(221, 168, 83, 0.1)', border: '1px solid rgba(221, 168, 83, 0.3)', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.88rem', color: '#854D0E', fontWeight: 600 }}>
          Enquiring for: {projectTitle}
        </div>
      )}

      {errorMsg && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.88rem', color: '#B91C1C', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="Enter your name"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
            Phone Number *
          </label>
          <input
            type="tel"
            required
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
            Email Address (Optional)
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
            Service Required *
          </label>
          <select
            value={formData.service_required}
            onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
            style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none', background: '#FFFFFF' }}
          >
            <option value="Home Loan">Home Loan</option>
            <option value="Construction Loan">Construction Loan</option>
            <option value="Loan Against Property">Loan Against Property (LAP)</option>
            <option value="Personal Loan">Personal Loan</option>
            <option value="Business Loan">Business Loan</option>
            <option value="Education Loan">Education Loan</option>
            <option value="Insurance">Insurance Services</option>
            <option value="Real Estate / Property">Real Estate / Property Enquiry</option>
            <option value="Other">Other Financial Advisory</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
            Estimated Loan / Budget Amount
          </label>
          <input
            type="text"
            placeholder="e.g. ₹45 Lakhs"
            value={formData.loan_amount}
            onChange={(e) => setFormData({ ...formData, loan_amount: e.target.value })}
            style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
            Preferred Contact Method
          </label>
          <select
            value={formData.preferred_contact_method}
            onChange={(e) => setFormData({ ...formData, preferred_contact_method: e.target.value })}
            style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none', background: '#FFFFFF' }}
          >
            <option value="Phone">Phone Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
          Message / Requirement Details
        </label>
        <textarea
          rows={3}
          placeholder="Briefly describe your requirements or queries..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none', resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '22px' }}>
        <input
          type="checkbox"
          id="consentCheck"
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          style={{ marginTop: 4 }}
        />
        <label htmlFor="consentCheck" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
          I authorize C. Santosh Kumar and associates to contact me via phone, WhatsApp, or email regarding this enquiry. (No sensitive financial documents or OTPs will ever be requested via this form).
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Submitting Enquiry...</span>
          </>
        ) : (
          <>
            <Send size={18} />
            <span>Submit Qualified Enquiry</span>
          </>
        )}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px', fontSize: '0.75rem', color: '#94A3B8' }}>
        <Shield size={13} color="var(--accent-gold)" />
        <span>Your information is strictly protected and never shared with unauthorized parties.</span>
      </div>
    </form>
  );
};
