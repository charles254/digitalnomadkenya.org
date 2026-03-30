import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Compass from 'lucide-react/dist/esm/icons/compass'
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check'
import CreditCard from 'lucide-react/dist/esm/icons/credit-card'
import BookOpen from 'lucide-react/dist/esm/icons/book-open'
import Globe from 'lucide-react/dist/esm/icons/globe'
import Menu from 'lucide-react/dist/esm/icons/menu'
import X from 'lucide-react/dist/esm/icons/x'
import Send from 'lucide-react/dist/esm/icons/send'
import Zap from 'lucide-react/dist/esm/icons/zap'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', whatsapp: '', needs: '', message: '' })

  const handleQuoteSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        setShowQuoteModal(false)
        setSubmitted(false)
        setQuoteForm({ name: '', email: '', whatsapp: '', needs: '', message: '' })
      }, 3000)
    }, 1500)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      transition={{ duration: 0.6, cubicBezier: [0.23, 1, 0.32, 1] }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Enhanced Logo */}
        <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
          <Globe className="logo-icon" size={32} />
          <div className="logo">
            Digital Nomad <span className="logo-accent">Kenya</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <ul className="nav-links desktop-only">
            <li>
              <a href="/#services">
                <Compass size={18} /> <span>Digital Nomad Services</span>
              </a>
            </li>
            <li>
              <Link to="/audit">
                <ShieldCheck size={18} /> <span>Nomad Permit Audit</span>
              </Link>
            </li>
            <li>
              <Link to="/immigration-guide">
                <BookOpen size={18} /> <span>Immigration Guide</span>
              </Link>
            </li>
            <li>
              <a href="/#pricing">
                <CreditCard size={18} /> <span>Our Prices</span>
              </a>
            </li>
          </ul>

          <div className="magnetic-wrap">
            <button 
              className="btn-primary desktop-only" 
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none' }}
              onClick={(e) => { e.preventDefault(); setShowQuoteModal(true); }}
            >
              <Send size={16} /> Get a Quote
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-only menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Mobile Slide-in Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            <li onClick={closeMobileMenu}>
              <a href="/#services"><Compass size={20} /> Digital Nomad Services</a>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/audit"><ShieldCheck size={20} /> Nomad Permit Audit</Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/immigration-guide"><BookOpen size={20} /> Immigration Guide</Link>
            </li>
            <li onClick={closeMobileMenu}>
              <a href="/#pricing"><CreditCard size={20} /> Our Prices</a>
            </li>
            <li onClick={closeMobileMenu} style={{ marginTop: '1rem' }}>
              <button 
                className="btn-primary" 
                style={{ justifyContent: 'center', width: '100%', border: 'none' }}
                onClick={(e) => { e.preventDefault(); setShowQuoteModal(true); }}
              >
                <Send size={18} /> Get a Quote
              </button>
            </li>
          </ul>
        </div>

      </div>
    </motion.nav>

    <AnimatePresence>
        {showQuoteModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuoteModal(false)}
            style={{ zIndex: 9999 }}
          >
            <motion.div 
              className="glass-card modal-content"
              style={{ padding: '3rem 2rem', width: '90%', maxWidth: '600px' }}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setShowQuoteModal(false)}>
                <X size={24} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Send size={48} color="var(--primary-emerald)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Get a Custom Quote</h3>
                <p style={{ color: 'var(--text-muted)' }}>Tell us about your immigration needs and we'll reply with a custom workflow and pricing.</p>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2rem 0' }}
                >
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <ShieldCheck size={32} color="var(--primary-emerald)" />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Request Received</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Our team will review your requirements and email you a precise quote shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    className="input-field"
                    style={{ padding: '1rem' }}
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm(prev => ({...prev, name: e.target.value}))}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    className="input-field"
                    style={{ padding: '1rem' }}
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm(prev => ({...prev, email: e.target.value}))}
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone / WhatsApp Number" 
                    required 
                    className="input-field"
                    style={{ padding: '1rem' }}
                    value={quoteForm.whatsapp}
                    onChange={(e) => setQuoteForm(prev => ({...prev, whatsapp: e.target.value}))}
                  />
                  <select 
                    required
                    className="input-field"
                    style={{ padding: '1rem', appearance: 'none', background: 'var(--bg-glass-heavy)' }}
                    value={quoteForm.needs}
                    onChange={(e) => setQuoteForm(prev => ({...prev, needs: e.target.value}))}
                  >
                    <option value="" disabled>Select Primary Service</option>
                    <option value="digital_nomad">Class N / Digital Nomad</option>
                    <option value="investor_class_g">Class G / Investor Permit</option>
                    <option value="dependent_pass">Dependent Passes</option>
                    <option value="company_reg">Company Registration & KRA</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                  <textarea 
                    placeholder="Briefly describe your situation or timeline..." 
                    className="input-field"
                    style={{ padding: '1rem', minHeight: '100px', resize: 'vertical' }}
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm(prev => ({...prev, message: e.target.value}))}
                  />
                  <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="spin" style={{ display: 'inline-block' }}><Zap size={18} /></span>
                    ) : (
                      <>Get My Quote <Send size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
