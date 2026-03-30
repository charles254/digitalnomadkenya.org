import React from 'react'
import { motion } from 'framer-motion'
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2'
import FileText from 'lucide-react/dist/esm/icons/file-text'
import Globe from 'lucide-react/dist/esm/icons/globe'
import GraduationCap from 'lucide-react/dist/esm/icons/graduation-cap'
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check'

const steps = [
  {
    title: "Audit Your Profile",
    desc: "Use our expert-validated legal simulator to check your eligibility against the latest Class N & G requirements.",
    icon: <ShieldCheck size={28} />,
    status: "Step 1"
  },
  {
    title: "Generate Your Dossier",
    desc: "Download your professional application package, cover letters, and checklist customized for your passport.",
    icon: <FileText size={28} />,
    status: "Step 2"
  },
  {
    title: "Apply on e-Citizen",
    desc: "Follow our video guides to upload your documents to the official Kenya Foreign Nationals Services portal.",
    icon: <Globe size={28} />,
    status: "Step 3"
  },
  {
    title: "Touchdown & Support",
    desc: "Land in Nairobi or Diani with a KRA PIN ready and optional VIP fixer support for a frictionless landing.",
    icon: <GraduationCap size={28} />,
    status: "Final Step"
  }
]

const Roadmap = () => {
  return (
    <div style={{ position: 'relative', padding: '4rem 0' }}>
      {/* Connector Line */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '50%', 
          top: '0', 
          bottom: '0', 
          width: '2px', 
          background: 'linear-gradient(to bottom, transparent, var(--primary-emerald), var(--accent-gold), transparent)',
          transform: 'translateX(-50%)',
          opacity: 0.3
        }} 
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
              width: '100%',
              position: 'relative'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
          >
            {/* Center Circle */}
            <div style={{ 
              position: 'absolute', 
              left: '50%', 
              transform: 'translateX(-50%)',
              zIndex: 10,
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: idx === 0 ? 'var(--primary-emerald)' : 'var(--bg-glass-heavy)',
              border: '2px solid var(--bg-dark)',
              boxShadow: idx === 0 ? '0 0 15px var(--primary-emerald)' : 'none'
            }} />

            <div style={{ 
              width: '45%', 
              textAlign: idx % 2 === 0 ? 'right' : 'left',
              padding: idx % 2 === 0 ? '0 3rem 0 0' : '0 0 0 3rem'
            }}>
              <div className="glass-card" style={{ padding: '2rem', textAlign: 'left', borderLeft: idx % 2 === 0 ? 'none' : '4px solid var(--primary-emerald)', borderRight: idx % 2 === 0 ? '4px solid var(--primary-emerald)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ color: 'var(--primary-emerald)' }}>{step.icon}</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)' }}>{step.status}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Roadmap
