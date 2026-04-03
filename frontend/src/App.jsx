import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'

const LandingPage = lazy(() => import('./components/LandingPage'))
const PartnerDashboard = lazy(() => import('./components/PartnerDashboard'))
// ProgrammaticLandingPage removed — content consolidated into NomadDirectory location pages
const NomadDirectory = lazy(() => import('./components/NomadDirectory'))
const TopicLandingPage = lazy(() => import('./components/TopicLandingPage'))
const AuditSimulatorPage = lazy(() => import('./components/AuditSimulatorPage'))
const SocialProof = lazy(() => import('./components/SocialProof'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard'))
const AboutUs = lazy(() => import('./components/AboutUs'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/TermsOfService'))

const NomadRedirect = () => {
  const { location } = useParams()
  return <Navigate to={`/immigration-guide/${location}`} replace />
}

// Redirect old nationality pages to consolidated location pages
const NationalityRedirect = () => {
  const { location, nationality } = useParams()
  return <Navigate to={`/immigration-guide/${location}#${nationality}`} replace />
}

// Legacy /nomad/ nationality redirect
const NomadNatRedirect = () => {
  const { location, nationality } = useParams()
  return <Navigate to={`/immigration-guide/${location}#${nationality}`} replace />
}

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
        <Route path="/immigration-guide/:location/:nationality" element={<NationalityRedirect />} />
        
        {/* Legacy Redirects */}
        <Route path="/nomad" element={<Navigate to="/immigration-guide" replace />} />
        <Route path="/nomad/:location" element={<NomadRedirect />} />
        <Route path="/nomad/:location/:nationality" element={<NomadNatRedirect />} />
        
        <Route path="/guide/:topic" element={<TopicLandingPage />} />
        <Route path="/audit" element={<AuditSimulatorPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      <SocialProof />
      </Suspense>
    </BrowserRouter>
    </div>
  )
}

export default App
