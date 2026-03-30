import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert'
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign'
import Calendar from 'lucide-react/dist/esm/icons/calendar'
import Briefcase from 'lucide-react/dist/esm/icons/briefcase'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import AlertOctagon from 'lucide-react/dist/esm/icons/alert-octagon'
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle'

const EligibilityScorer = () => {
  const navigate = useNavigate()
  const [income, setIncome] = useState(24000)
  const [employment, setEmployment] = useState('Foreign')
  const [history, setHistory] = useState('Clean')

  const isIncomeOk = income >= 24000
  const isEmploymentOk = employment === 'Foreign'
  const isHistoryOk = history === 'Clean'

  const score = (isIncomeOk ? 33 : 0) + (isEmploymentOk ? 34 : 0) + (isHistoryOk ? 33 : 0)

  return (
    <div className="glass-card" style={{ padding: '3rem', marginTop: '4rem', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Class N Eligibility Scorer</h2>
        <p style={{ color: 'var(--text-muted)' }}>Pre-verify your candidacy before initiating the $1,000 issuance process.</p>
      </div>

      <div className="grid-2" style={{ gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Income Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={16} color="var(--primary-emerald)" /> Annual Income (USD)
              </label>
              <span style={{ fontWeight: 'bold', color: isIncomeOk ? 'var(--primary-emerald)' : '#ef4444' }}>${income.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="10000" max="150000" step="1000" 
              value={income} onChange={(e) => setIncome(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: isIncomeOk ? 'var(--primary-emerald)' : '#ef4444' }} 
            />
          </div>

          {/* Employment Type */}
          <div>
            <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-white)' }}>Origin of Employment</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {['Foreign', 'Kenyan'].map(t => (
                <button 
                  key={t}
                  onClick={() => setEmployment(t)}
                  style={{ 
                    padding: '1rem', 
                    background: employment === t ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255,255,255,0.03)',
                    border: employment === t ? '1px solid #a855f7' : '1px solid var(--border-glass)',
                    borderRadius: '12px',
                    color: 'var(--text-white)',
                    cursor: 'pointer'
                  }}
                >
                  {t} Entity
                </button>
              ))}
            </div>
          </div>

          {/* Background Check */}
          <div>
            <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-white)' }}>Criminal Record (HAB Habitual)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {['Clean', 'Issue'].map(t => (
                <button 
                  key={t}
                  onClick={() => setHistory(t)}
                  style={{ 
                    padding: '1rem', 
                    background: history === t ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255,255,255,0.03)',
                    border: history === t ? '1px solid #a855f7' : '1px solid var(--border-glass)',
                    borderRadius: '12px',
                    color: 'var(--text-white)',
                    cursor: 'pointer'
                  }}
                >
                  {t === 'Clean' ? 'PCC Verified' : 'Prior Record'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.03)', 
          borderRadius: '24px', 
          padding: '2.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid var(--border-glass)',
          textAlign: 'center'
        }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1rem' }}>Approval Probability</div>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: score === 100 ? 'var(--primary-emerald)' : (score > 60 ? 'var(--accent-gold)' : '#ef4444') }}>
            {score}%
          </div>

          <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            {score === 100 && <span style={{ color: 'var(--primary-emerald)' }}>✨ Highly Eligible. You meet all 2026 Class N criteria.</span>}
            {score < 100 && score > 30 && <span style={{ color: 'var(--accent-gold)' }}>⚠️ Attention Required: {!isIncomeOk ? 'Income Gap' : (!isEmploymentOk ? 'Local Conflict' : 'Background Verification')}.</span>}
            {score <= 30 && <span style={{ color: '#ef4444' }}>❌ Non-Eligible: Primary criteria not met. Recommend Class G instead.</span>}
          </div>

          <button 
            onClick={() => navigate('/audit')}
            className="btn-primary" 
            style={{ marginTop: '2.5rem', width: '100%', padding: '1.2rem' }}
          >
            Generate Full Audit Dossier ($20)
          </button>
        </div>
      </div>
    </div>
  )
}

export default EligibilityScorer
