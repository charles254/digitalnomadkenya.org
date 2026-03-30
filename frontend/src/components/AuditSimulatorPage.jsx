import React, { useState, useEffect } from 'react'
const getAxios = () => import('axios').then(m => m.default)
import { motion, AnimatePresence } from 'framer-motion'
import Loader2 from 'lucide-react/dist/esm/icons/loader-2'
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2'
import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle'
import XCircle from 'lucide-react/dist/esm/icons/x-circle'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left'
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check'
import FileText from 'lucide-react/dist/esm/icons/file-text'
import UserCircle from 'lucide-react/dist/esm/icons/user-circle'
import UploadCloud from 'lucide-react/dist/esm/icons/upload-cloud'
import FileSearch from 'lucide-react/dist/esm/icons/file-search'
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign'
import Briefcase from 'lucide-react/dist/esm/icons/briefcase'
import History from 'lucide-react/dist/esm/icons/history'
import PlaneTakeoff from 'lucide-react/dist/esm/icons/plane-takeoff'
import Navbar from './Navbar'
import Breadcrumbs from './Breadcrumbs'
import Footer from './Footer'
import { injectJSONLD, updateMetaTags, setCanonical } from '../utils/seo'

const AuditSimulatorPage = () => {
  const [step, setStep] = useState(1)

  React.useEffect(() => {
    document.title = "Free Permit Audit Simulator: Digital Nomad Kenya"
    updateMetaTags({
      "description": "Take the free 60-second Class N Digital Nomad Permit audit. Check your eligibility, income requirements, and document readiness for Kenya immigration.",
      "og:title": "Free Kenya Digital Nomad Permit Audit | Digital Nomad Kenya",
      "og:description": "Check your eligibility for Kenya's Class N Digital Nomad Permit in 60 seconds. AI-powered document audit.",
      "og:url": "https://digitalnomad.ke/audit",
      "twitter:title": "Free Kenya Digital Nomad Permit Audit | Digital Nomad Kenya",
      "twitter:description": "Check your eligibility for Kenya's Class N Digital Nomad Permit in 60 seconds."
    })
    setCanonical("https://digitalnomad.ke/audit")
    injectJSONLD({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Digital Nomad Kenya Permit Audit Simulator",
      "url": "https://digitalnomad.ke/audit",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free AI-powered eligibility audit for Kenya's Class N Digital Nomad Permit."
    }, 'webapp-schema')
  }, [])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    income: 24000,
    permit_class: 'N',
    passport_expiry: '',
    employment_type: 'Foreign', // Foreign, Kenyan, Freelance
    has_criminal_record: 'No',
    is_bank_statement_stamped: true
  })
  const [result, setResult] = useState(null)
  const [scanningPhase, setScanningPhase] = useState(0)
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleNext = () => setStep(s => s + 1)
  const handleBack = () => setStep(s => s - 1)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  const handleLeadCapture = async (e) => {
    e.preventDefault()
    setStep(4) // Move to scanning screen
    
    setScanningPhase(1)
    setTimeout(() => setScanningPhase(2), 1500)
    setTimeout(() => setScanningPhase(3), 3000)
    
    try {
      const resp = await (await getAxios()).post('http://localhost:8000/audit', {
        ...formData,
        is_bank_statement_stamped: true
      })
      
      setTimeout(() => {
        setResult(resp.data)
        setStep(5)
      }, 4500)
    } catch (err) {
      setTimeout(() => {
        setResult({ status: 'Error', message: 'Connection Timeout. Ensure Digital Nomad Kenya Backend is running.' })
        setStep(5)
      }, 4500)
    }
  }

  const renderStep = () => {
    switch(step) {
      // ... steps 1-4 remain similar in logic, just ensuring they look premium
      case 1:
        return (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="step-content"
          >
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <UserCircle size={48} color="var(--primary-emerald)" style={{ marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Identity & Intent</h2>
              <p style={{ color: 'var(--text-muted)' }}>Start your official 2026 Free Audit Simulator for the Class N Permit.</p>
            </div>
            
            <div className="input-group">
              <label>Full Name (as per Passport)</label>
              <input className="input-field" type="text" placeholder="e.g. John Doe" value={formData.name} onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} />
            </div>

            <div className="input-group">
              <label>Employment Structure</label>
              <select className="input-field" value={formData.employment_type} onChange={(e) => setFormData(prev => ({...prev, employment_type: e.target.value}))}>
                <option value="Foreign">Remote Employee (Contracted Outside Kenya)</option>
                <option value="Freelance">Self-Employed / Freelancer (Global Clients)</option>
                <option value="Kenyan">Kenyan-Based Entity (Prohibited for Class N)</option>
              </select>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleNext} disabled={!formData.name}>
              Verify My Income <ChevronRight size={20} />
            </button>
          </motion.div>
        )
      case 2:
        return (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="step-content"
          >
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <DollarSign size={48} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Financial & Proof</h2>
              <p style={{ color: 'var(--text-muted)' }}>Official criteria requires stable income of $2,000/mo ($24k/year).</p>
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label>Annual Income (USD)</label>
                <input className="input-field" type="number" value={formData.income} onChange={(e) => setFormData(prev => ({...prev, income: parseFloat(e.target.value)}))} />
              </div>
              <div className="input-group">
                <label>Passport Expiry Date</label>
                <input className="input-field" type="date" value={formData.passport_expiry} onChange={(e) => setFormData(prev => ({...prev, passport_expiry: e.target.value}))} />
              </div>
            </div>

            <div className="upload-box" onClick={() => setFileUploaded(true)} style={{
                border: fileUploaded ? '2px solid var(--primary-emerald)' : '2px dashed var(--border-glass)',
                borderRadius: '16px', padding: '2.5rem', textAlign: 'center', background: fileUploaded ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-glass-heavy)',
                cursor: 'pointer', marginBottom: '2rem', transition: 'all 0.3s ease'
              }}>
              {fileUploaded ? (
                <>
                  <CheckCircle2 size={32} color="var(--primary-emerald)" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontWeight: '600' }}>bank_statement_proof.pdf</div>
                  <div style={{ color: 'var(--primary-emerald)', fontSize: '0.85rem' }}>Attached for Scanning</div>
                </>
              ) : (
                <>
                  <UploadCloud size={32} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontWeight: '600' }}>Simulate Statement Upload</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Encrypted audit for income thresholds.</div>
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-secondary" onClick={handleBack} style={{ flex: 1 }}>Back</button>
              <button className="btn-primary" style={{ flex: 2 }} onClick={handleNext} disabled={!formData.passport_expiry || !fileUploaded}>
                Final Verification
              </button>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="step-content"
          >
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <History size={48} color="#3b82f6" style={{ marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Legal Standing</h2>
              <p style={{ color: 'var(--text-muted)' }}>Class N requires a clean criminal record (PCC).</p>
            </div>
            
            <div className="input-group">
              <label>Do you have a criminal record in your country of residence?</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                {['No', 'Yes'].map(opt => (
                  <button key={opt} onClick={() => setFormData(prev => ({...prev, has_criminal_record: opt}))} style={{ 
                    padding: '1rem', background: formData.has_criminal_record === opt ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.03)',
                    border: formData.has_criminal_record === opt ? '1px solid #3b82f6' : '1px solid var(--border-glass)',
                    borderRadius: '12px', color: 'var(--text-white)', cursor: 'pointer'
                  }}>
                    {opt === 'No' ? 'Clean Record' : 'Prior Record'}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group" style={{ marginTop: '2rem' }}>
              <label>Official Email for Results Delivery</label>
              <input className="input-field" type="email" placeholder="nomad@example.com" value={formData.email} onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))} />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                <ShieldCheck size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Results are gated. Verification report will be sent to this address only.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button className="btn-secondary" onClick={handleBack} style={{ flex: 1 }}>Back</button>
              <button className="btn-primary" style={{ flex: 2 }} onClick={handleLeadCapture} disabled={!formData.email}>
                Generate Secure Report
              </button>
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div 
            key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="step-content" style={{ textAlign: 'center', padding: '3rem 0' }}
          >
            <div className="scan-animation" style={{ marginBottom: '2rem' }}>
              <FileSearch size={64} className="pulse-icon" color="var(--primary-emerald)" style={{ margin: '0 auto' }} />
            </div>
            <h2 style={{ marginBottom: '1.5rem' }}>Simulating Legal Comparison...</h2>
            <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
              {[
                { phase: 1, text: 'Benchmarking against Kenya Section NSSF Act 2026' },
                { phase: 2, text: 'Confirming Foreign Employment contract validity' },
                { phase: 3, text: 'Analyzing monthly income vs $2,000 requirement' }
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: scanningPhase >= p.phase ? 'var(--text-white)' : 'var(--text-muted)' }}>
                  {scanningPhase >= p.phase ? <CheckCircle2 size={20} color="var(--primary-emerald)"/> : <Loader2 size={20} className="spin" />}
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )
      case 5:
        return (
          <motion.div 
            key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="step-content" style={{ textAlign: 'center' }}
          >
            {result && (
              <>
                <div style={{ marginBottom: '1.5rem' }}>
                  {result.status === 'Success' ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <FileText size={80} color="var(--primary-emerald)" />
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        style={{ position: 'absolute', bottom: -10, right: -10, background: 'var(--accent-gold)', borderRadius: '50%', padding: '5px' }}
                      >
                        <CheckCircle2 size={24} color="var(--bg-dark)" />
                      </motion.div>
                    </div>
                  ) : <AlertTriangle size={80} color="#ef4444" />}
                </div>
                
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {result.status === 'Success' ? 'Check Your Inbox!' : 'Audit Failed'}
                </h2>
                
                <div style={{ background: 'var(--bg-glass-heavy)', border: '1px solid var(--border-glass)', padding: '2rem', borderRadius: '16px', marginBottom: '2.5rem' }}>
                  <p style={{ color: 'var(--text-white)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    {result.message}
                  </p>
                </div>

                {result.status === 'Success' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button className="btn-primary" style={{ width: '100%', padding: '1.25rem' }} onClick={() => window.open('https://mail.google.com')}>
                      Open My Email Client <PlaneTakeoff size={18} style={{ marginLeft: '8px' }} />
                    </button>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Didn't get it? <span style={{ color: 'var(--accent-gold)', cursor: 'pointer', textDecoration: 'underline' }} onClick={handleLeadCapture}>Resend Audit Report</span>
                    </p>
                  </div>
                ) : (
                  <button className="btn-secondary" style={{ width: '100%' }} onClick={() => setStep(3)}>
                    Try Again
                  </button>
                )}
              </>
            )}
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Navbar />
      
      <main className="container" style={{ paddingTop: '8rem', paddingBottom: '8rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '700px', alignSelf: 'center', marginBottom: '2rem' }}>
          <Breadcrumbs />
          <h1 style={{ fontSize: '1.75rem', textAlign: 'center', marginTop: '1rem' }}>Free Kenya Digital Nomad Permit Audit</h1>
        </div>
        <div className="gradient-border-wrap" style={{ width: '100%', maxWidth: '700px' }}>
          <div className="glass-card">
            <div className="step-indicator" style={{ marginBottom: '3rem' }}>
              {[1, 2, 3].map(s => <div key={s} className={`step-dot ${step >= s ? 'active' : ''}`} />)}
            </div>
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default AuditSimulatorPage
