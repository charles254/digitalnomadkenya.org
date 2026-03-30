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

const Simulator = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    income: 30000,
    permit_class: 'N',
    passport_expiry: '',
    is_bank_statement_stamped: true
  })
  const [result, setResult] = useState(null)
  const [scanningPhase, setScanningPhase] = useState(0)
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleNext = () => setStep(s => s + 1)
  const handleBack = () => setStep(s => s - 1)

  const handleLeadCapture = async (e) => {
    e.preventDefault()
    setStep(4) // Move to scanning screen
    
    // Simulate multi-stage AI scan in frontend before fetching actual result
    setScanningPhase(1)
    setTimeout(() => setScanningPhase(2), 1500)
    setTimeout(() => setScanningPhase(3), 3000)
    
    try {
      // In a real app, you would also save formData (email, whatsapp) to your CRM here
      const resp = await (await getAxios()).post('http://localhost:8000/audit', formData)
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

  const downloadDossier = async () => {
    try {
      const response = await (await getAxios()).post('http://localhost:8000/dossier', {
        name: result.user_data.name,
        income: result.user_data.income,
        permit_class: result.user_data.permit_class
      }, { responseType: 'blob' })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `DigitalNomadKenya_Dossier_${result.user_data.name.replace(' ', '_')}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error("Failed to download dossier", err)
      alert("Failed to generate dossier. Please try again.")
    }
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-content"
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3>Legal Profile Audit</h3>
              <p style={{ color: 'var(--text-muted)' }}>Provide basic details to personalize your Kenya visa eligibility report.</p>
            </div>
            
            <div className="input-group">
              <label>Full Name</label>
              <input 
                className="input-field"
                type="text" 
                placeholder="e.g. Sarah J. (London)" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
              />
            </div>

            <div className="input-group">
              <label>Permit Target</label>
              <select 
                className="input-field"
                value={formData.permit_class}
                onChange={(e) => setFormData(prev => ({...prev, permit_class: e.target.value}))}
              >
                <option value="N">Class N (Digital Nomad - $24k+)</option>
                <option value="G">Class G (Investor - $100k+)</option>
              </select>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={handleNext}
              disabled={!formData.name}
            >
              Continue <ChevronRight size={20} />
            </button>
          </motion.div>
        )
      case 2:
        return (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-content"
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3>Financial Data Audit</h3>
              <p style={{ color: 'var(--text-muted)' }}>Securely submit your annual income and bank statement. Data is encrypted on EU servers.</p>
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label>Annual Income (USD)</label>
                <input 
                  className="input-field"
                  type="number" 
                  value={formData.income}
                  onChange={(e) => setFormData(prev => ({...prev, income: parseFloat(e.target.value)}))}
                />
              </div>
              <div className="input-group">
                <label>Passport Expiry (Date Only - For Your Privacy)</label>
                <input 
                  className="input-field"
                  type="date" 
                  value={formData.passport_expiry}
                  onChange={(e) => setFormData(prev => ({...prev, passport_expiry: e.target.value}))}
                />
              </div>
            </div>

            {/* Mock File Upload Box */}
            <div 
              className="upload-box" 
              onClick={() => {
                setFileUploaded(true)
                setFormData(prev => ({...prev, is_bank_statement_stamped: true})) // Mocking a stamped file being uploaded
              }}
              style={{
                border: fileUploaded ? '2px solid var(--primary-emerald)' : '2px dashed var(--border-glass)',
                borderRadius: '16px',
                padding: '2.5rem',
                textAlign: 'center',
                background: fileUploaded ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-glass-heavy)',
                cursor: 'pointer',
                marginBottom: '2rem',
                transition: 'all 0.3s ease'
              }}
            >
              {fileUploaded ? (
                <>
                  <CheckCircle2 size={32} color="var(--primary-emerald)" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontWeight: '600' }}>statement_dec2025.pdf</div>
                  <div style={{ color: 'var(--primary-emerald)', fontSize: '0.85rem' }}>Attached Successfully</div>
                </>
              ) : (
                <>
                  <UploadCloud size={32} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontWeight: '600' }}>Drop Bank Statement Here</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>PDF only. Must bear official bank stamp.</div>
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-secondary" onClick={handleBack} style={{ flex: 1 }}>
                Back
              </button>
              <button 
                className="btn-primary" 
                style={{ flex: 2 }}
                onClick={handleNext}
                disabled={!formData.passport_expiry || !fileUploaded}
              >
                Continue to Audit
              </button>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-content"
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Zap size={48} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
              <h3>Where Should We Send Your Results?</h3>
              <p style={{ color: 'var(--text-muted)' }}>Enter your details to receive your free Visa Eligibility Report.</p>
            </div>
            
            <form onSubmit={handleLeadCapture}>
              <div className="input-group">
                <label>Email Address</label>
                <input 
                  className="input-field"
                  type="email" 
                  required
                  placeholder="nomad@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                />
              </div>

              <div className="input-group">
                <label>WhatsApp Number</label>
                <input 
                  className="input-field"
                  type="tel"
                  required 
                  placeholder="+49 123 4567 890" 
                  value={formData.whatsapp}
                  onChange={(e) => setFormData(prev => ({...prev, whatsapp: e.target.value}))}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn-secondary" onClick={handleBack} style={{ flex: 1 }}>
                  Back
                </button>
                <button 
                  type="submit"
                  className="btn-primary" 
                  style={{ flex: 2 }}
                  disabled={!formData.email || !formData.whatsapp}
                >
                  Run Free Legal Audit
                </button>
              </div>
            </form>
          </motion.div>
        )
      case 4:
        return (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="step-content"
            style={{ textAlign: 'center', padding: '3rem 0' }}
          >
            <div className="scan-animation" style={{ marginBottom: '2rem' }}>
              <FileSearch size={64} className="pulse-icon" color="var(--primary-emerald)" style={{ margin: '0 auto' }} />
            </div>
            
            <h3 style={{ marginBottom: '1.5rem' }}>Digital Document Audit in Progress...</h3>
            
            <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: scanningPhase >= 1 ? 'var(--text-white)' : 'var(--text-muted)' }}>
                {scanningPhase >= 1 ? <CheckCircle2 size={20} color="var(--primary-emerald)"/> : <Loader2 size={20} className="spin" />}
                <span>Verifying Financial Thresholds</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: scanningPhase >= 2 ? 'var(--text-white)' : 'var(--text-muted)' }}>
                {scanningPhase >= 2 ? <CheckCircle2 size={20} color="var(--primary-emerald)"/> : (scanningPhase === 1 ? <Loader2 size={20} className="spin" /> : <div style={{width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--border-glass)'}}/>)}
                <span>Analyzing Passport Validity</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: scanningPhase >= 3 ? 'var(--text-white)' : 'var(--text-muted)' }}>
                {scanningPhase >= 3 ? <CheckCircle2 size={20} color="var(--primary-emerald)"/> : (scanningPhase === 2 ? <Loader2 size={20} className="spin" /> : <div style={{width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--border-glass)'}}/>)}
                <span>Detecting Official Bank Stamps</span>
              </div>
            </div>
          </motion.div>
        )
      case 5:
        return (
          <motion.div 
            key="step5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="step-content"
            style={{ textAlign: 'center' }}
          >
            {result && (
              <>
                <div style={{ marginBottom: '2.5rem' }}>
                  {result.status === 'Eligible' && <CheckCircle2 size={64} color="var(--primary-emerald)" />}
                  {result.status === 'Blocked' && <XCircle size={64} color="#ef4444" />}
                  {result.status === 'ActionRequired' && <AlertTriangle size={64} color="var(--accent-gold)" />}
                  {result.status === 'Error' && <AlertTriangle size={64} color="#ef4444" />}
                </div>

                <h2 style={{ marginBottom: '1rem' }}>{result.status}</h2>
                <div style={{ 
                  background: result.status === 'Eligible' ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-glass-heavy)',
                  border: `1px solid ${result.status === 'Eligible' ? 'var(--primary-glow)' : 'var(--border-glass)'}`,
                  padding: '1.5rem',
                  borderRadius: '16px',
                  marginBottom: '2.5rem'
                }}>
                  <p style={{ color: 'var(--text-white)', fontSize: '1.05rem', margin: 0 }}>
                    {result.message}
                  </p>
                </div>

                {result.status === 'Eligible' ? (
                  <button className="btn-primary" style={{ width: '100%', padding: '1.25rem' }} onClick={downloadDossier}>
                    Pay $20 & Generate Dossier <ChevronRight size={20} />
                  </button>
                ) : (
                  <button className="btn-secondary" style={{ width: '100%' }} onClick={() => { setStep(2); setScanningPhase(0); }}>
                    Update Documents & Re-Audit
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
    <section className="simulator-container" id="simulator">
      <div className="step-indicator">
        <div className={`step-dot ${step >= 1 ? 'active' : ''}`} />
        <div className={`step-dot ${step >= 2 ? 'active' : ''}`} />
        <div className={`step-dot ${step >= 3 ? 'active' : ''}`} />
      </div>

      <div className="gradient-border-wrap" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="glass-card" style={{ padding: '3.5rem' }}>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Simulator
