import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Shield from 'lucide-react/dist/esm/icons/shield'
import Phone from 'lucide-react/dist/esm/icons/phone'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import Users from 'lucide-react/dist/esm/icons/users'
import CheckSquare from 'lucide-react/dist/esm/icons/check-square'
import Square from 'lucide-react/dist/esm/icons/square'
import Info from 'lucide-react/dist/esm/icons/info'

const SafetyChecklist = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Joined local expat WhatsApp/Facebook groups', checked: false },
    { id: 2, text: 'Installed & verified Uber/Bolt (standard transport)', checked: false },
    { id: 3, text: 'Saved 999 and local diplomatic numbers', checked: false },
    { id: 4, text: 'Verified residential "Night Guard" protocols', checked: false },
    { id: 5, text: 'Learned basic "Sheng" or Swahili greetings', checked: false },
    { id: 6, text: 'Registered with "Smart Traveler" / Home Embassy', checked: false }
  ])

  const toggleItem = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
  }

  const checkedCount = items.reduce((acc, i) => acc + (i.checked ? 1 : 0), 0)
  const score = Math.round((checkedCount / items.length) * 100)

  return (
    <div className="glass-card" style={{ padding: '3rem', marginTop: '4rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Safety & Logistics Readiness</h2>
        <p style={{ color: 'var(--text-muted)' }}>Audit your preparation level for a secure and frictionless landing in Kenya.</p>
      </div>

      <div className="grid-2" style={{ gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map(item => (
            <div 
              key={item.id} 
              onClick={() => toggleItem(item.id)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1.2rem', 
                background: item.checked ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.02)',
                border: item.checked ? '1px solid var(--primary-emerald)' : '1px solid var(--border-glass)',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {item.checked ? <CheckSquare size={20} color="var(--primary-emerald)" /> : <Square size={20} color="var(--text-muted)" />}
              <span style={{ fontSize: '0.95rem', color: item.checked ? 'var(--text-white)' : 'var(--text-muted)' }}>{item.text}</span>
            </div>
          ))}
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
          <div style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>Readiness Score</div>
          <div style={{ 
            fontSize: '5rem', 
            fontWeight: 'bold', 
            color: score > 80 ? 'var(--primary-emerald)' : (score > 40 ? 'var(--accent-gold)' : '#ef4444'),
            lineHeight: 1
          }}>
            {score}%
          </div>

          <div style={{ 
            marginTop: '2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            width: '100%'
          }}>
            <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
               {score === 100 ? "🎉 You're fully prepared for Kenyan logistics!" : `Complete ${items.length - checkedCount} more items to reach 100%.`}
            </div>
            <button className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Info size={16} /> Get VIP Safety Briefing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SafetyChecklist
