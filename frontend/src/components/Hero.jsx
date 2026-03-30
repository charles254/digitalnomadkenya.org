import React from 'react'
import { motion } from 'framer-motion'
import Sparkles from 'lucide-react/dist/esm/icons/sparkles'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'

const Hero = ({ onStart }) => {
  return (
    <header className="hero-content" style={{ position: 'relative', overflow: 'visible' }}>
      {/* Decorative background glow */}
      <div style={{ 
        position: 'absolute', 
        top: '20%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '800px', 
        height: '400px', 
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="premium-badge"
        style={{ 
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          padding: '0.75rem 1.5rem',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
        }}
        animate={{ 
          y: [0, -5, 0],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Sparkles size={16} className="pulse-icon" /> 
        Verified for 2026 Immigration Act
      </motion.div>

      <motion.h1 
        className="hero-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: [0.23, 1, 0.32, 1] }}
        style={{ 
          lineHeight: 1,
          letterSpacing: '-0.04em',
          marginBottom: '2.5rem'
        }}
      >
        <span style={{ 
          background: 'linear-gradient(to bottom, #fff 30%, #a1a1aa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Kenya Digital Nomad Permit:</span><br />
        <span style={{
          background: 'linear-gradient(135deg, var(--primary-emerald) 0%, #34d399 50%, var(--accent-gold) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Automated in Seconds.</span>
      </motion.h1>

      <motion.p 
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }}
        style={{ 
          maxWidth: '750px',
          fontSize: '1.65rem',
          lineHeight: 1.5,
          marginBottom: '4rem',
          opacity: 0.85
        }}
      >
        Digital Nomad Kenya transforms the complex Class N permit into a seamless digital journey. 
        Verify your eligibility in seconds and get your secure application dossier.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        <motion.div className="magnetic-wrap" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button 
            className="btn-primary" 
            onClick={onStart}
            style={{ 
              padding: '1.5rem 3.5rem',
              fontSize: '1.25rem',
              borderRadius: '20px',
              gap: '1rem'
            }}
          >
            Start Free Audit Simulator <ArrowRight size={22} />
          </button>
        </motion.div>
      </motion.div>
    </header>
  )
}

export default Hero
