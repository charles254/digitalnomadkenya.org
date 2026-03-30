import React, { useState, useEffect } from 'react'
import { m } from 'framer-motion'
import Home from 'lucide-react/dist/esm/icons/home'
import Utensils from 'lucide-react/dist/esm/icons/utensils'
import Car from 'lucide-react/dist/esm/icons/car'
import Wifi from 'lucide-react/dist/esm/icons/wifi'
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign'
import Zap from 'lucide-react/dist/esm/icons/zap'

const LivingCostCalculator = () => {
  const [rent, setRent] = useState(700)
  const [food, setFood] = useState(500)
  const [transport, setTransport] = useState(150)
  const [lifestyle, setLifestyle] = useState(200)

  const total = rent + food + transport + lifestyle

  const presets = [
    { label: 'Budget', rent: 400, food: 300, transport: 50, lifestyle: 100, color: 'var(--primary-emerald)' },
    { label: 'Standard', rent: 800, food: 600, transport: 200, lifestyle: 300, color: 'var(--accent-gold)' },
    { label: 'Luxury', rent: 2200, food: 1200, transport: 800, lifestyle: 1000, color: '#ec4899' }
  ]

  const applyPreset = (p) => {
    setRent(p.rent)
    setFood(p.food)
    setTransport(p.transport)
    setLifestyle(p.lifestyle)
  }

  return (
    <div className="glass-card" style={{ padding: '3rem', marginTop: '4rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Relocation Budget Calculator</h2>
        <p style={{ color: 'var(--text-muted)' }}>Tailor your monthly expenses to your preferred Kenyan lifestyle.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
        {presets.map((p, i) => (
          <button 
            key={i} 
            onClick={() => applyPreset(p)}
            className="btn-secondary"
            style={{ 
              padding: '0.5rem 1.5rem', 
              fontSize: '0.85rem', 
              borderColor: p.color,
              color: 'var(--text-white)'
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Rent Slider */}
          <div className="slider-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Home size={16} color="var(--primary-emerald)" /> Housing (Rent)
              </label>
              <span style={{ color: 'var(--primary-emerald)', fontWeight: 'bold' }}>${rent}</span>
            </div>
            <input 
              type="range" min="300" max="4000" step="50" 
              value={rent} onChange={(e) => setRent(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary-emerald)' }} 
            />
          </div>

          {/* Food Slider */}
          <div className="slider-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Utensils size={16} color="var(--accent-gold)" /> Dining & Groceries
              </label>
              <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>${food}</span>
            </div>
            <input 
              type="range" min="200" max="2000" step="50" 
              value={food} onChange={(e) => setFood(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-gold)' }} 
            />
          </div>

          {/* Transport Slider */}
          <div className="slider-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Car size={16} color="#3b82f6" /> Transport (Uber/Car)
              </label>
              <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>${transport}</span>
            </div>
            <input 
              type="range" min="50" max="1500" step="50" 
              value={transport} onChange={(e) => setTransport(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#3b82f6' }} 
            />
          </div>

          {/* Lifestyle Slider */}
          <div className="slider-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={16} color="#ec4899" /> Fun & Workspace
              </label>
              <span style={{ color: '#ec4899', fontWeight: 'bold' }}>${lifestyle}</span>
            </div>
            <input 
              type="range" min="100" max="2500" step="50" 
              value={lifestyle} onChange={(e) => setLifestyle(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#ec4899' }} 
            />
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
          <div style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1rem' }}>Estimated Monthly Cost</div>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--text-white)', display: 'flex', alignItems: 'flex-start', gap: '0.2rem' }}>
            <span style={{ fontSize: '2rem', marginTop: '0.5rem', opacity: 0.5 }}>$</span>
            {total.toLocaleString()}
          </div>
          <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary-emerald)', fontSize: '0.9rem' }}>
             Recommended for Class N Permit: <strong>$2,000+</strong>
          </div>
          <button className="btn-primary" style={{ marginTop: '2.5rem', width: '100%' }}>
            Save This Budget
          </button>
        </div>
      </div>
    </div>
  )
}

export default LivingCostCalculator
