import React from 'react'
import { motion } from 'framer-motion'
import Users from 'lucide-react/dist/esm/icons/users'
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up'
import Activity from 'lucide-react/dist/esm/icons/activity'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Bell from 'lucide-react/dist/esm/icons/bell'
import Settings from 'lucide-react/dist/esm/icons/settings'
import LogOut from 'lucide-react/dist/esm/icons/log-out'
import { Link } from 'react-router-dom'

const statIcons = {
  leads: <Users size={24} color="var(--primary-emerald)" />,
  conversions: <TrendingUp size={24} color="var(--accent-gold)" />,
  uptime: <Activity size={24} color="#a855f7" />
}

const PartnerDashboard = () => {
  React.useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'robots'; document.head.appendChild(meta) }
    meta.content = 'noindex, nofollow'
    return () => { meta.content = 'index, follow' }
  }, [])
  const stats = [
    { label: "Total Leads", value: "124", icon: statIcons.leads, trend: "+12%" },
    { label: "Conversions", value: "18", icon: statIcons.conversions, trend: "+3%" },
    { label: "Current Uptime", value: "99.8%", icon: statIcons.uptime, trend: "All systems go" }
  ]

  const leads = [
    { name: "Alex (Berlin)", date: "Mar 05, 2026", duration: "12 Months", status: "ACTIVE AUDIT", color: "var(--primary-emerald)" },
    { name: "Sarah (London)", date: "Mar 04, 2026", duration: "24 Months", status: "BOOKED", color: "var(--accent-gold)" },
    { name: "James (Toronto)", date: "Mar 02, 2026", duration: "6 Months", status: "PENDING DOCS", color: "#3b82f6" },
    { name: "Mia (Sydney)", date: "Feb 28, 2026", duration: "12 Months", status: "COMPLETED", color: "#a1a1aa" }
  ]

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
            <span className="logo">Digital Nomad<span className="logo-accent">Kenya</span></span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} />
            </button>
            <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={18} />
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
              <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Partner Portal: <span style={{ color: 'var(--primary-emerald)' }}>BeachVillas Diani</span></h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Tracking your 'Nomad-Standard' leads and property uptime.</p>
            </div>
            <button className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
              Generate Report <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            {stats.map((stat, idx) => (
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

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Nomad Leads</h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Lead Name</th>
                  <th style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Interest Date</th>
                  <th style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Target Duration</th>
                  <th style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, idx) => (
                  <motion.tr 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '1.25rem 1rem', fontWeight: '500' }}>{lead.name}</td>
                    <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>{lead.date}</td>
                    <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>{lead.duration}</td>
                    <td style={{ padding: '1.25rem 1rem' }}>
                      <span style={{ 
                        padding: '0.35rem 0.75rem', 
                        borderRadius: '100px', 
                        fontSize: '0.75rem', 
                        fontWeight: '700', 
                        backgroundColor: `${lead.color}20`, // 20% opacity hex hack
                        color: lead.color,
                        border: `1px solid ${lead.color}40`
                      }}>
                        {lead.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PartnerDashboard
