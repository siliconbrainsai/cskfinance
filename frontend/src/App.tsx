import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PartnersPage } from './pages/PartnersPage';
import { ContactPage } from './pages/ContactPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { PrivacyTermsPage } from './pages/PrivacyTermsPage';
import { MessageSquare } from 'lucide-react';

import { InfinitePartnerMarquee } from './components/InfinitePartnerMarquee';

export function App() {
  const whatsappNumber = "919296206177";

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/privacy" element={<PrivacyTermsPage type="privacy" />} />
            <Route path="/terms" element={<PrivacyTermsPage type="terms" />} />
            <Route path="/disclaimer" element={<PrivacyTermsPage type="disclaimer" />} />
          </Routes>
        </main>

        {/* Right-to-Left Infinite Institutional Partner Marquee */}
        <InfinitePartnerMarquee />

        <Footer />

        {/* Global Floating WhatsApp Chat Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Santosh garu, I am contacting you through your official website.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp"
          title="Chat directly on WhatsApp"
        >
          <MessageSquare size={22} />
          <span>WhatsApp Chat</span>
        </a>
      </div>
    </BrowserRouter>
  );
}

export default App;
