import React, { useState } from 'react'
import { m } from 'framer-motion'
import Wifi from 'lucide-react/dist/esm/icons/wifi'
import Video from 'lucide-react/dist/esm/icons/video'
import Zap from 'lucide-react/dist/esm/icons/zap'
import Terminal from 'lucide-react/dist/esm/icons/terminal'
import Layers from 'lucide-react/dist/esm/icons/layers'
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2'
import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle'

const profiles = [
  { name: 'Standard', icon: <Video size={18} />, speed: 20, desc: 'Zoom calls, 1080p streaming, basic docs.' },
  { name: 'Developer', icon: <Terminal size={18} />, speed: 50, desc: 'Large git pushes/pulls, Docker images, cloud IDEs.' },
  { name: 'Creator', icon: <Layers size={18} />, speed: 100, desc: '4K video uploads, Raw asset sync, heavy creative suite.' }
]

const ConnectivityAuditor = () => {
  const [profile, setProfile] = useState('Standard')
  const [devices, setDevices] = useState(2)

  const requiredSpeed = profiles.find(p => p.name === profile).speed * (1 + (devices - 1) * 0.5)
  const isOptimal = requiredSpeed <= 100 // Nairobi/Diani fiber typical tops at 100-250 for nomads
  const score = Math.max(0, 100 - (requiredSpeed / 2))

  return (
    <div className="glass-card" style={{ padding: '3rem', marginTop: '4rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Connectivity Reliability Auditor</h2>
        <p style={{ color: 'var(--text-muted)' }}>Scan if Kenyan fiber infrastructure supports your specific work-from-home needs.</p>
      </div>

      <div className="grid-2" style={{ gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-white)' }}>Select Your Work Profile</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
              {profiles.map(p => (
                <button 
                  key={p.name}
                  onClick={() => setProfile(p.name)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    padding: '1rem', 
                    background: profile === p.name ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.03)',
                    border: profile === p.name ? '1px solid #3b82f6' : '1px solid var(--border-glass)',
                    borderRadius: '12px',
                    color: 'var(--text-white)',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ color: profile === p.name ? '#3b82f6' : 'var(--text-muted)' }}>{p.icon}</div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-white)' }}>Concurrent Devices</label>
              <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{devices} Active</span>
            </div>
            <input 
              type="range" min="1" max="10" step="1" 
              value={devices} onChange={(e) => setDevices(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#3b82f6' }} 
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
          <div style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>Kenya Uptime Score</div>
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            border: `4px solid ${isOptimal ? 'var(--primary-emerald)' : 'var(--accent-gold)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--text-white)',
            marginBottom: '1.5rem',
            boxShadow: `0 0 20px ${isOptimal ? 'rgba(16, 185, 129, 0.2)' : 'rgba(251, 191, 36, 0.2)'}`
          }}>
            {Math.round(score)}%
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: isOptimal ? 'var(--primary-emerald)' : 'var(--accent-gold)',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            {isOptimal ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
            {isOptimal ? 'High-Performance Ready' : 'Optimization Required'}
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: '1.5' }}>
            Requires a <strong>{Math.round(requiredSpeed)} Mbps</strong> low-latency fiber connection. 
            Standard Safaricom/Zuku fiber in Nairobi & Diani meets this easily.
          </p>
          
          <button className="btn-secondary" style={{ marginTop: '2rem', width: '100%', fontSize: '0.8rem' }}>
            Download Connection Guide (PDF)
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConnectivityAuditor
