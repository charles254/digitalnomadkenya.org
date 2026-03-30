import React from 'react'
import { m } from 'framer-motion'
import UploadCloud from 'lucide-react/dist/esm/icons/upload-cloud'
import FileSearch from 'lucide-react/dist/esm/icons/file-search'
import Send from 'lucide-react/dist/esm/icons/send'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'

const steps = [
  {
    icon: <UploadCloud size={24} color="var(--primary-emerald)" />,
    title: "1. Secure Document Upload",
    desc: "Create your secure portal, enter your passport expiry date, and upload stamped bank statements. Your data is encrypted and stored in the EU."
  },
  {
    icon: <FileSearch size={24} color="var(--accent-gold)" />,
    title: "2. Real-time Digital Audit",
    desc: "Our secure digital system scans for 'rock factors' (e.g. invalid stamps, expiring passports) instantly, preventing costly government rejections."
  },
  {
    icon: <CheckCircle size={24} color="#a855f7" />,
    title: "3. Get Your Dossier",
    desc: "Download a perfectly structured, legally compliant PDF application packet, ready to submit to the Kenyan e-Citizen portal."
  }
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{ padding: '8rem 0', background: 'var(--bg-glass-heavy)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Zero Legal Friction</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            We've condensed weeks of confusing legal bureaucracy into a seamless 3-step digital checkout process.
          </p>
        </div>

        <div className="timeline-container" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: '32px', top: '0', bottom: '0', width: '2px', background: 'var(--border-glass)' }} className="timeline-line"></div>

          {steps.map((step, idx) => (
            <m.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              style={{ display: 'flex', gap: '2rem', marginBottom: idx === steps.length - 1 ? '0' : '4rem', position: 'relative' }}
            >
              {/* Icon Node */}
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-dark)', border: '2px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', zIndex: 1, boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
                {step.icon}
              </div>
              
              {/* Content */}
              <div style={{ paddingTop: '10px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
