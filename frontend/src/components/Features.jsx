import React from 'react'
import { m } from 'framer-motion'
import BrainCircuit from 'lucide-react/dist/esm/icons/brain-circuit'
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert'
import WifiHigh from 'lucide-react/dist/esm/icons/wifi-high'
import FileSearch from 'lucide-react/dist/esm/icons/file-search'
import Building2 from 'lucide-react/dist/esm/icons/building-2'
import Briefcase from 'lucide-react/dist/esm/icons/briefcase'

const features = [
  {
    icon: <FileSearch size={32} color="var(--primary-emerald)" />,
    title: "Digital Document Audits",
    desc: "Instantly verify bank stamp validity and secure passport expiry dates (no passport upload required)."
  },
  {
    icon: <ShieldAlert size={32} color="var(--accent-gold)" />,
    title: "Rock Factor Detection",
    desc: "Identify critical application blockers before you pay government fees."
  },
  {
    icon: <WifiHigh size={32} color="#a855f7" />,
    title: 'The "Fiber & Power" Map',
    desc: "Nomads fear the Nairobi Blackouts. Access our verified list of Airbnbs and co-working spaces with solar inverters and 5G backup."
  },
  {
    icon: <BrainCircuit size={32} color="#3b82f6" />,
    title: "Immigration Compliance Engine",
    desc: "Technical logic updated for the 2026 Kenya Immigration Act. Includes current KRA non-resident tax codes."
  },
  {
    icon: <Building2 size={32} color="#ec4899" />,
    title: "KRA PIN Fast-Track",
    desc: "Automate your Non-Resident KRA PIN data entry. Buy a local vehicle once your visa is approved."
  },
  {
    icon: <Briefcase size={32} color="var(--primary-emerald)" />,
    title: "Corporate Soft Landing",
    desc: "Relocate engineering teams to Nairobi. We manage permits, SHIF registration, and local school searches."
  }
]

const Features = () => {
  return (
    <section id="services" style={{ padding: '8rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Digital Nomad Kenya Standard</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          We replace expensive immigration lawyers with precise, specialized automation trained specifically for Kenyan Class N & G permits.
        </p>
      </div>

      <div className="grid-features">
        {features.map((feat, idx) => (
          <m.div 
            key={idx}
            className="feature-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <div className="feature-icon-wrapper">
              {feat.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '1.5rem' }}>{feat.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{feat.desc}</p>
          </m.div>
        ))}
      </div>
    </section>
  )
}

export default Features
