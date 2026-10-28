import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(3500000); // 35 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  // Calculate monthly EMI: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="custom-card" style={{ padding: '36px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <div style={{ width: 44, height: 44, borderRadius: '10px', background: 'rgba(221, 168, 83, 0.15)', color: 'var(--accent-gold-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Calculator size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-navy)' }}>Interactive Loan EMI Calculator</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Plan your monthly budget with precision for Home, Construction, and Mortgage Loans.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '28px' }}>
        {/* Sliders Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Loan Amount */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Loan Amount</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>{formatINR(loanAmount)}</span>
            </div>
            <input
              type="range"
              min="500000"
              max="20000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-gold)', height: 6, cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', marginTop: 4 }}>
              <span>₹5 Lakhs</span>
              <span>₹1 Crore</span>
              <span>₹2 Crores</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Interest Rate (% p.a.)</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>{interestRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="6.5"
              max="15.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-gold)', height: 6, cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', marginTop: 4 }}>
              <span>6.5%</span>
              <span>10.0%</span>
              <span>15.0%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Loan Tenure</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>{tenureYears} Years ({totalMonths} Mos)</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-gold)', height: 6, cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', marginTop: 4 }}>
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Calculation Result Breakdown */}
        <div style={{ background: 'var(--light-bg)', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Estimated Monthly EMI
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary-navy)', fontFamily: 'var(--font-heading)', margin: '8px 0 20px' }}>
              {formatINR(emi)} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#64748B' }}>/ month</span>
            </div>

            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Principal Amount:</span>
                <span style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>{formatINR(loanAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Interest Payable:</span>
                <span style={{ fontWeight: 600, color: 'var(--accent-gold-hover)' }}>{formatINR(totalInterest)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', borderTop: '1px dashed #CBD5E1', paddingTop: '10px' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>Total Amount Payable:</span>
                <span style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>{formatINR(totalPayment)}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Link to="/contact" className="btn btn-navy" style={{ width: '100%' }}>
              <span>Apply for this Loan Enquiry</span>
              <ArrowRight size={16} />
            </Link>
            <p style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: 10, textAlign: 'center' }}>
              * Indicative calculations for estimation purposes only. Final terms depend on lender eligibility appraisal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
