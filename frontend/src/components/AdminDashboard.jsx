import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Users from 'lucide-react/dist/esm/icons/users'
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up'
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Bell from 'lucide-react/dist/esm/icons/bell'
import Settings from 'lucide-react/dist/esm/icons/settings'
import LogOut from 'lucide-react/dist/esm/icons/log-out'
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw'
import Send from 'lucide-react/dist/esm/icons/send'
import { Link } from 'react-router-dom'
const getAxios = () => import('axios').then(m => m.default)

const AdminDashboard = () => {
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'robots'; document.head.appendChild(meta) }
    meta.content = 'noindex, nofollow'
    return () => { meta.content = 'index, follow' }
  }, [])

  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState({
    total_leads: 0,
    conversion_rate: '0%',
    vip_alerts: 0
  })
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const axios = await getAxios()
      const [leadsRes, statsRes] = await Promise.all([
        axios.get('/api/admin/leads'),
        axios.get('/api/admin/stats')
      ])
      setLeads(leadsRes.data)
      setStats(statsRes.data)
    } catch (error) {
      console.error("Error fetching admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const statCards = [
    { label: "TotalCaptured Leads", value: stats.total_leads, icon: <Users size={24} color="var(--primary-emerald)" />, trend: "Real-time sync" },
    { label: "Audit Success Rate", value: stats.conversion_rate, icon: <TrendingUp size={24} color="var(--accent-gold)" />, trend: "Qualified applicants" },
    { label: "VIP Fixer Alerts", value: stats.vip_alerts, icon: <ShieldAlert size={24} color="#f43f5e" />, trend: "Urgent airport escort" }
  ]

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Eligible': return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary-emerald)' };
      case 'Blocked': return { bg: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' };
      case 'ActionRequired': return { bg: 'rgba(234, 179, 8, 0.1)', color: 'var(--accent-gold)' };
      default: return { bg: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)' };
    }
  }

  return (
    <div className="app-wrapper" style={{ minHeight: '100vh' }}>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2" style={{ bottom: 'auto', top: '40%', left: '-10%' }}></div>
      </div>

      <nav className="navbar nav-scrolled" style={{ position: 'sticky' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="logo-container">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <span className="logo">Digital Nomad<span className="logo-accent">Kenya</span> <span style={{ fontSize: '0.6rem', background: 'var(--accent-gold)', color: '#000', padding: '0.1rem 0.4rem', borderRadius: '4px', marginLeft: '0.5rem', verticalAlign: 'middle' }}>ADMIN</span></span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button onClick={fetchData} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={18} className={loading ? 'spin' : ''} />
            </button>
            <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} />
            </button>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', marginLeft: '1rem' }}>
              <LogOut size={16} /> Exit
            </Link>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{ padding: '3rem' }}
        >
          <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Global Command <span style={{ color: 'var(--primary-emerald)' }}>Center</span></h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Real-time audit monitoring and VIP fixer coordination.</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>System Status</div>
                <div style={{ color: 'var(--primary-emerald)', fontSize: '0.9rem', fontWeight: 'bold' }}>● Operational</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            {statCards.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</h4>
                  <div style={{ padding: '0.5rem', background: 'var(--bg-glass)', borderRadius: '12px' }}>
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--text-white)', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{stat.trend}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Incoming Leads & Audits</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Showing {leads.length} most recent</div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Lead Details</th>
                  <th style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Tier</th>
                  <th style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Permit</th>
                  <th style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Audit Status</th>
                  <th style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No leads captured yet. Perform an audit to see results here.
                    </td>
                  </tr>
                ) : leads.map((lead, idx) => {
                  const statusStyle = getStatusStyle(lead.status)
                  return (
                    <motion.tr 
                      key={lead.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (idx % 10) }}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1.25rem 1rem' }}>
                        <div style={{ fontWeight: '600', color: 'var(--text-white)' }}>{lead.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.email}</div>
                      </td>
                      <td style={{ padding: '1.25rem 1rem' }}>
                        {lead.is_vip ? (
                          <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(234, 179, 8, 0.1)', color: 'var(--accent-gold)', borderRadius: '4px', fontWeight: 'bold', border: '1px solid rgba(234, 179, 8, 0.3)' }}>VIP GOLD</span>
                        ) : (
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>STANDARD</span>
                        )}
                      </td>
                      <td style={{ padding: '1.25rem 1rem', fontWeight: 'bold', color: 'var(--text-white)' }}>Class {lead.permit_class}</td>
                      <td style={{ padding: '1.25rem 1rem' }}>
                        <span style={{ 
                          padding: '0.35rem 0.75rem', 
                          borderRadius: '100px', 
                          fontSize: '0.75rem', 
                          fontWeight: '700', 
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color,
                          border: `1px solid ${statusStyle.color}40`
                        }}>
                          {lead.status}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem 1rem' }}>
                         <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                           Notify Fixer <Send size={12} />
                         </button>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
