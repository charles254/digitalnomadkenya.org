import React from 'react'
import { Link } from 'react-router-dom'
import Building from 'lucide-react/dist/esm/icons/building'
import Users from 'lucide-react/dist/esm/icons/users'
import Shield from 'lucide-react/dist/esm/icons/shield'
import FileText from 'lucide-react/dist/esm/icons/file-text'
import Map from 'lucide-react/dist/esm/icons/map'
import Wifi from 'lucide-react/dist/esm/icons/wifi'
import Hash from 'lucide-react/dist/esm/icons/hash'
import Twitter from 'lucide-react/dist/esm/icons/twitter'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import Globe from 'lucide-react/dist/esm/icons/globe'
import CreditCard from 'lucide-react/dist/esm/icons/credit-card'
import BookOpen from 'lucide-react/dist/esm/icons/book-open'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import pseoData from '../data/pseo_data.json'

const Footer = () => {
  return (
    <footer style={{ padding: '6rem 0 4rem', borderTop: '1px solid var(--border-glass)', marginTop: '8rem' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '2.5rem', 
        marginBottom: '4rem', 
        alignItems: 'start' 
      }}>
        {/* Column 1: Brand */}
        <div style={{ textAlign: 'left' }}>
          <div className="logo-container" style={{ marginBottom: '1.5rem', cursor: 'default' }}>
            <Globe className="logo-icon" size={32} />
            <div className="logo">
              VizaBot <span className="logo-accent">KE</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
            The standard for Kenyan immigration automation. Trusted by 200+ digital nomads and investors.
          </p>
        </div>
        
        {/* Column 2: Company */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-white)', fontSize: '1rem' }}>Company</h4>
          <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building size={14} color="var(--primary-emerald)" /> About Us
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={14} color="var(--primary-emerald)" /> 
              <Link to="/partner" style={{ color: 'inherit', textDecoration: 'none' }}>Partner Portal</Link>
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={14} color="var(--primary-emerald)" /> Privacy Policy
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={14} color="var(--primary-emerald)" /> Terms of Service
            </li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-white)', fontSize: '1rem' }}>Resources</h4>
          <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} color="var(--accent-gold)" /> Diani Guide
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Wifi size={14} color="var(--accent-gold)" /> Nairobi Fiber Map
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Hash size={14} color="var(--accent-gold)" /> KRA PIN Guide
            </li>
          </ul>
        </div>

        {/* Column 4: Essential Guides */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-white)', fontSize: '1rem' }}>Essential Guides</h4>
          <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={14} color="var(--accent-gold)" />
              <Link to="/guide/cost-of-living" style={{ color: 'inherit', textDecoration: 'none' }}>Cost of Living Guide</Link>
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Wifi size={14} color="var(--accent-gold)" />
              <Link to="/guide/internet-speed" style={{ color: 'inherit', textDecoration: 'none' }}>Internet & Uptime Guide</Link>
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={14} color="var(--accent-gold)" />
              <Link to="/guide/permit-requirements" style={{ color: 'inherit', textDecoration: 'none' }}>Visa Requirements Guide</Link>
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} color="var(--accent-gold)" />
              <Link to="/guide/safety-for-expats" style={{ color: 'inherit', textDecoration: 'none' }}>Safety & Logistics Guide</Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Popular Guides */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-white)', fontSize: '1rem' }}>Popular Guides</h4>
          <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={14} color="var(--primary-emerald)" />
              <Link to="/immigration-guide/diani/german" style={{ color: 'inherit', textDecoration: 'none' }}>Diani for Germans</Link>
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={14} color="var(--primary-emerald)" />
              <Link to="/immigration-guide/kilimani/american" style={{ color: 'inherit', textDecoration: 'none' }}>Nairobi for Americans</Link>
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={14} color="var(--primary-emerald)" />
              <Link to="/immigration-guide/lamu/british" style={{ color: 'inherit', textDecoration: 'none' }}>Lamu for British</Link>
            </li>
            <li style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowRight size={14} color="var(--primary-emerald)" />
              <Link to="/immigration-guide" style={{ color: 'var(--primary-emerald)', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.8rem' }}>View All Guides</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div style={{ pt: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} VizaBot KE. Built with pride in the Silicon Savannah. 🇰🇪
        </p>
      </div>
    </footer>
  )
}

export default Footer
