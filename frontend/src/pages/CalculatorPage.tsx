import React from 'react';
import { LoanCalculator } from '../components/LoanCalculator';
import { ShieldCheck, Info } from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <section style={{ background: 'var(--primary-navy)', color: '#FFFFFF', padding: '60px 0' }}>
        <div className="container">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>Financial Planning Tool</span>
          <h1 style={{ fontSize: '2.8rem', color: '#FFFFFF', marginBottom: '12px' }}>
            Loan EMI Calculator
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#CBD5E1', maxWidth: 700 }}>
            Simulate your monthly installments, total interest repayment, and loan tenure for Home Loans, Construction Finance, and Loans Against Property.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>
        <LoanCalculator />

        <div style={{ marginTop: '40px', background: '#FFFFFF', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={18} color="var(--accent-gold)" />
            Understanding Your Loan EMI Calculation
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
            Equated Monthly Installment (EMI) consists of both principal and interest components. In the early tenure of a long-term home loan, the interest proportion constitutes a higher percentage of the monthly payment, gradually amortizing the principal amount.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: 'var(--primary-navy)', fontSize: '0.95rem' }}>Fixed vs Floating Interest Rates</div>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: 4 }}>Floating interest rates fluctuate with RBI repo rate cycles, while fixed rates remain locked for a specified window.</p>
            </div>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: 'var(--primary-navy)', fontSize: '0.95rem' }}>Tenure Selection</div>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: 4 }}>A longer loan tenure (e.g., 20–30 years) decreases the monthly cash outflow but increases total cumulative interest.</p>
            </div>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: 'var(--primary-navy)', fontSize: '0.95rem' }}>Prepayment Flexibility</div>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: 4 }}>Under RBI norms, floating rate home loans for individual borrowers carry nil prepayment penalties.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
