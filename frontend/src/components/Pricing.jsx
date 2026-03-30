import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import Check from 'lucide-react/dist/esm/icons/check'
import Star from 'lucide-react/dist/esm/icons/star'
import Zap from 'lucide-react/dist/esm/icons/zap'
import Crown from 'lucide-react/dist/esm/icons/crown'
import X from 'lucide-react/dist/esm/icons/x'
import Send from 'lucide-react/dist/esm/icons/send'

const Pricing = () => {
  const navigate = useNavigate()
  const cards = [
    {
      title: "Eligibility Pass",
      price: "Free",
      icon: <Zap size={24} color="var(--primary-emerald)" />,
      features: ["Digital Document Audit", "Rock factor check", "Digital Result Dashboard"],
      button: "Start Audit",
      popular: false
    },
    {
      title: "Application Pack",
      price: "$20",
      icon: <Star size={24} color="var(--accent-gold)" />,
      features: ["Full Dossier PDF", "e-Citizen Video Guide", "KRA PIN Video Guide", "Nairobi Slack"],
      button: "Go Pro",
      popular: true
    },
    {
      title: "VIP Fixer",
      price: "$250",
      icon: <Crown size={24} color="#a855f7" />,
      features: ["Human-in-the-loop", "JKIA Concierge", "NCBA Bank intro", "Housing Uptime report"],
      button: "Contact Concierge",
      popular: false,
      isVip: true
    }
  ]

  const [showModal, setShowModal] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', whatsapp: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleVipSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call for VIP lead
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        setShowModal(false)
        setSubmitted(false)
        setFormState({ name: '', email: '', whatsapp: '', message: '' })
      }, 3000)
    }, 1500)
  }

  return (
    <section className="pricing-section" id="pricing" style={{ marginTop: '8rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 800 }}>Digital Nomad Kenya <span className="logo-accent">Pricing</span></h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Transparent, automated immigration logistics. Choose the tier that fits your relocation speed.
        </p>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
        {cards.map((card, idx) => (
          <m.div 
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className={`premium-glass glow-border ${card.popular ? 'popular-card glass-heavy' : ''}`}
            style={{ 
              borderRadius: '35px',
              padding: '4rem 3rem',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              zIndex: card.popular ? 2 : 1
            }}
            whileHover={{ 
              y: -15,
              scale: 1.02,
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6)'
            }}
          >
            {card.popular && (
              <m.div 
                initial={{ opacity: 0, scale: 0.8, x: '-50%' }}
                animate={{ opacity: 1, scale: 1, x: '-50%' }}
                style={{ 
                  position: 'absolute', 
                  top: '-15px', 
                  left: '50%',
                  padding: '0.6rem 1.5rem', 
                  background: 'linear-gradient(135deg, var(--primary-emerald), #34d399)', 
                  color: 'var(--bg-dark)', 
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  boxShadow: '0 10px 20px var(--primary-glow)',
                  zIndex: 10
                }}
              >
                RECOMMENDED
              </m.div>
            )}
            
            <m.div 
              style={{ 
                width: '70px', 
                height: '70px', 
                borderRadius: '24px', 
                background: 'rgba(255,255,255,0.04)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '2.5rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
            >
              {card.icon}
            </m.div>

            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{card.title}</h3>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '3rem' }}>
              <span className="price-value" style={{ fontSize: '4.5rem', fontWeight: 900 }}>{card.price}</span>
              {card.price !== "Free" && <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>/ dossier</span>}
            </div>
            
            <ul style={{ listStyle: 'none', marginBottom: '3.5rem', flex: 1 }}>
              {card.features.map((f, i) => (
                <m.li 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1.2rem', 
                    color: 'var(--text-white)', 
                    marginBottom: '1.25rem', 
                    fontSize: '1rem',
                    opacity: 0.9
                  }}
                >
                  <div style={{ 
                    minWidth: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: 'rgba(16, 185, 129, 0.15)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Check size={14} color="var(--primary-emerald)" strokeWidth={4} />
                  </div>
                  {f}
                </m.li>
              ))}
            </ul>

            <m.div 
              className="magnetic-wrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                className={card.popular ? 'btn-primary' : 'btn-secondary'} 
                style={{ 
                  width: '100%', 
                  height: '64px',
                  borderRadius: '18px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderColor: card.isVip ? '#a855f7' : '',
                  boxShadow: card.popular ? '0 15px 30px -5px var(--primary-glow)' : 'none'
                }}
                onClick={() => {
                  if (card.isVip) {
                    setShowModal(true)
                  } else if (card.title === "Application Pack") {
                    alert("Redirecting to secure Stripe checkout for Digital Nomad Kenya Application Pack ($20)...")
                  } else {
                    navigate('/audit')
                  }
                }}
              >
                {card.button}
              </button>
            </m.div>
          </m.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <m.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <m.div 
              className="glass-card modal-content"
              style={{ padding: '3rem 2rem' }}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Crown size={48} color="#a855f7" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>VIP Fixer Application</h3>
                <p style={{ color: 'var(--text-muted)' }}>Due to extremely high demand, our VIP JKIA Concierge holds a waitlist. Apply below.</p>
              </div>

              {submitted ? (
                <m.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2rem 0' }}
                >
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Check size={32} color="var(--primary-emerald)" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Application Received</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Our concierge agent will contact you via WhatsApp within 2 hours.</p>
                </m.div>
              ) : (
                <form onSubmit={handleVipSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    className="input-field"
                    style={{ padding: '1rem' }}
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({...prev, name: e.target.value}))}
                  />
                  <input 
                    type="email" 
                    placeholder="Work Email" 
                    required 
                    className="input-field"
                    style={{ padding: '1rem' }}
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({...prev, email: e.target.value}))}
                  />
                  <input 
                    type="tel" 
                    placeholder="WhatsApp Number (with country code)" 
                    required 
                    className="input-field"
                    style={{ padding: '1rem' }}
                    value={formState.whatsapp}
                    onChange={(e) => setFormState(prev => ({...prev, whatsapp: e.target.value}))}
                  />
                  <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, var(--primary-emerald), #34d399)' }} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="spin" style={{ display: 'inline-block' }}><Zap size={18} /></span>
                    ) : (
                      <>Submit Request <Send size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Pricing
