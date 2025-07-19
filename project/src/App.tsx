import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CaseBriefing from './components/CaseBriefing';
import InvestigationDashboard from './components/InvestigationDashboard';
import Header from './components/Header';
import { CaseProvider } from './context/CaseContext';
import { VoiceProvider } from './context/VoiceContext';

function App() {
  const [currentCase, setCurrentCase] = useState<any>(null);

  return (
    <CaseProvider>
      <VoiceProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-gray-100">
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/briefing" element={<CaseBriefing />} />
              <Route path="/investigation" element={<InvestigationDashboard />} />
            </Routes>
          </div>
        </Router>
      </VoiceProvider>
    </CaseProvider>
  );
}

export default App;