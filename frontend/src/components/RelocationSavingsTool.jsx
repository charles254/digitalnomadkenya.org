import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TrendingDown from 'lucide-react/dist/esm/icons/trending-down'
import Users from 'lucide-react/dist/esm/icons/users'
import Wallet from 'lucide-react/dist/esm/icons/wallet'
import PlaneTakeoff from 'lucide-react/dist/esm/icons/plane-takeoff'
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check'

const RelocationSavingsTool = ({ nationalityName, targetLocation, locationRent, onStart }) => {
  const navigate = useNavigate()
  const [homeRent, setHomeRent] = useState(2500)
  // Parse average rent from location data range (e.g., "$600 - $1,200" → 900)
  const kenyaRent = locationRent
    ? Math.round((parseInt(locationRent.split('-')[0].replace(/\D/g, '')) + parseInt(locationRent.split('-')[1].replace(/\D/g, ''))) / 2)
    : 800

  const monthlySavings = homeRent > kenyaRent ? homeRent - kenyaRent : 0
  const yearlySavings = monthlySavings * 12

  return (
    <div className="glass-card" style={{ padding: '3rem', marginTop: '4rem', border: '1px solid rgba(251, 191, 36, 0.2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
        <TrendingDown size={150} color="var(--accent-gold)" />
      </div>

      <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Arbitrage Calculator</h2>
        <p style={{ color: 'var(--text-muted)' }}>See how much you save by transitioning your {nationalityName} lifestyle to {targetLocation}.</p>
      </div>

      <div className="grid-2" style={{ gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-white)' }}>Current Rent ({nationalityName})</label>
              <span style={{ fontWeight: 'bold', color: 'var(--text-white)' }}>${homeRent.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="800" max="8000" step="100" 
              value={homeRent} onChange={(e) => setHomeRent(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-gold)' }} 
            />
          </div>

          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Equivalent Rent in {targetLocation}</span>
              <span style={{ fontWeight: 'bold', color: 'var(--primary-emerald)' }}>${kenyaRent}</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>*Premium 1-2 Bedroom Luxury Apartment</p>
          </div>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)', 
          borderRadius: '24px', 
          padding: '2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid rgba(251, 191, 36, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Estimated Yearly Savings</div>
          <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--text-white)' }}>
            ${yearlySavings.toLocaleString()}
          </div>
          
          <div style={{ 
            marginTop: '1.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            width: '100%'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
               <ShieldCheck size={14} color="var(--primary-emerald)" /> Fully covers Class N permit fees
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
               <Wallet size={14} color="var(--primary-emerald)" /> Average 65% cost reduction
            </div>
          </div>

          <button 
            onClick={() => navigate('/audit')}
            className="btn-primary" 
            style={{ marginTop: '2rem', width: '100%', background: 'var(--accent-gold)', color: 'var(--bg-dark)' }}
          >
            Start a Free Audit Simulator
          </button>
        </div>
      </div>
    </div>
  )
}

export default RelocationSavingsTool
