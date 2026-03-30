import React from 'react'
import { motion } from 'framer-motion'
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2'
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert'
import BadgeDollarSign from 'lucide-react/dist/esm/icons/badge-dollar-sign'
import FileSignature from 'lucide-react/dist/esm/icons/file-signature'
import Building from 'lucide-react/dist/esm/icons/building'
import Scale from 'lucide-react/dist/esm/icons/scale'

const reqs = [
  {
    icon: <BadgeDollarSign size={24} color="var(--primary-emerald)" />,
    title: "$24,000 Min. Annual Income",
    desc: "Proof of consistent income (approx $2,000/month) from sources strictly outside of Kenya via bank statements."
  },
  {
    icon: <Building size={24} color="var(--accent-gold)" />,
    title: "Foreign Employment",
    desc: "Must hold an active contract with a foreign company, or operate an established freelance business abroad."
  },
  {
    icon: <Scale size={24} color="#ec4899" />,
    title: "Strict Non-Compete",
    desc: "Written undertaking not to accept any form of local employment or engage with Kenyan-based clients."
  },
  {
    icon: <ShieldAlert size={24} color="#3b82f6" />,
    title: "Clean Criminal Record",
    desc: "A verified police clearance certificate from your current country of habitual residence."
  },
  {
    icon: <FileSignature size={24} color="#a855f7" />,
    title: "Proof of Accommodation",
    desc: "Confirmed hotel reservation, signed lease agreement, or rental contract for your stay in Kenya."
  },
  {
    icon: <CheckCircle2 size={24} color="var(--primary-emerald)" />,
    title: "Valid Passport",
    desc: "Your national passport must have a minimum of six months validity remaining at the time of application."
  }
]

const Requirements = () => {
  return (
    <section id="requirements" style={{ padding: '8rem 0', background: 'var(--bg-glass-heavy)', borderTop: '1px solid var(--border-glass)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Class N Permit Requirements</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            We ensure your application perfectly aligns with the strict eligibility criteria mandated by the Kenya Directorate of Immigration Services.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {reqs.map((req, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{ display: 'flex', gap: '1.5rem', padding: '2rem', background: 'var(--bg-glass)', borderRadius: '24px', border: '1px solid var(--border-glass)' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {req.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>{req.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{req.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <div className="premium-badge" style={{ marginBottom: 0, background: 'rgba(251, 191, 36, 0.1)', borderColor: 'rgba(251, 191, 36, 0.2)', color: 'var(--accent-gold)' }}>
            Processing Fee: $200 USD | Issuance Fee: $1,000 USD Annual
          </div>
        </div>
      </div>
    </section>
  )
}

export default Requirements
