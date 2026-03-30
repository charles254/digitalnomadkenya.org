import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const LandingPage = lazy(() => import('./components/LandingPage'))
const PartnerDashboard = lazy(() => import('./components/PartnerDashboard'))
const ProgrammaticLandingPage = lazy(() => import('./components/ProgrammaticLandingPage'))
const NomadDirectory = lazy(() => import('./components/NomadDirectory'))
const TopicLandingPage = lazy(() => import('./components/TopicLandingPage'))
const AuditSimulatorPage = lazy(() => import('./components/AuditSimulatorPage'))
const SocialProof = lazy(() => import('./components/SocialProof'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard'))

function App() {
  return (
    <div className="app-wrapper">
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      <div className="bg-grid"></div>
      
      <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spin" style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary-emerald)', borderRadius: '50%' }} /></div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/partner" element={<PartnerDashboard />} />
        <Route path="/immigration-guide" element={<NomadDirectory />} />
        <Route path="/immigration-guide/:location" element={<NomadDirectory />} />
        <Route path="/immigration-guide/:location/:nationality" element={<ProgrammaticLandingPage />} />
        
        {/* Legacy Redirects */}
        <Route path="/nomad" element={<Navigate to="/immigration-guide" replace />} />
        <Route path="/nomad/:location" element={<Navigate to="/immigration-guide/:location" replace />} />
        <Route path="/nomad/:location/:nationality" element={<Navigate to="/immigration-guide/:location/:nationality" replace />} />
        
        <Route path="/guide/:topic" element={<TopicLandingPage />} />
        <Route path="/audit" element={<AuditSimulatorPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <SocialProof />
      </Suspense>
    </BrowserRouter>
    </div>
  )
}

export default App
