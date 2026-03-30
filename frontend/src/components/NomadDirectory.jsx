import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Breadcrumbs from './Breadcrumbs'
import Footer from './Footer'
import Roadmap from './Roadmap'
import pseoData from '../data/pseo_data.json'
import { injectJSONLD } from '../utils/seo'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import Globe from 'lucide-react/dist/esm/icons/globe'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Compass from 'lucide-react/dist/esm/icons/compass'
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left'
import BookOpen from 'lucide-react/dist/esm/icons/book-open'
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check'
import CreditCard from 'lucide-react/dist/esm/icons/credit-card'
import Briefcase from 'lucide-react/dist/esm/icons/briefcase'
import Scale from 'lucide-react/dist/esm/icons/scale'
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle'
import Building2 from 'lucide-react/dist/esm/icons/building-2'
import FileText from 'lucide-react/dist/esm/icons/file-text'

const NomadDirectory = () => {
  const { location: locId } = useParams()
  
  const featuredLocation = locId ? pseoData.locations.find(l => l.id === locId) : null
  const locationsToShow = featuredLocation ? [featuredLocation] : pseoData.locations

  React.useEffect(() => {
    if (featuredLocation) {
      document.title = `${featuredLocation.name} Digital Nomad Guide: Legal & Logistics Guides`
    } else {
      document.title = "Official Kenya Legal Guide: Immigration, Tax & Settlement Guide"
    }
    
    const metaDesc = document.querySelector('meta[name="description"]')
    const descText = featuredLocation 
      ? `The ultimate digital nomad guide for ${featuredLocation.name}, Kenya. Detailed legal, internet, and lifestyle information for all nationalities.`
      : "The authoritative 2026 Kenya Legal Guide. Everything you need to know about Class N Permits, KRA PINs, Tax Residency, and Foreign Investor registration."
    
    if (metaDesc) {
      metaDesc.setAttribute("content", descText)
    } else {
      const meta = document.createElement('meta')
      meta.name = "description"
      meta.content = descText
      document.head.appendChild(meta)
    }

    // Breadcrumb Schema
    const breadcrumbs = [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://vizabot.ke"
    }];

    if (featuredLocation) {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
      "name": "Immigration Guide",
      "item": "https://vizabot.ke/immigration-guide"
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": featuredLocation.name,
      "item": `https://vizabot.ke/immigration-guide/${featuredLocation.id}`
    });
  } else {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Immigration Guide",
      "item": "https://vizabot.ke/immigration-guide"
    });
  }
    injectJSONLD({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    }, 'breadcrumb-schema');
  }, [locId])

  const knowledgeHubs = [
    {
      title: "Immigration & Permits",
      icon: <ShieldCheck size={28} color="var(--primary-emerald)" />,
      items: [
        { name: "Class N (Digital Nomad)", path: "/guide/digital-nomad-visa" },
        { name: "Class G (Investors)", path: "/guide/class-g-investor-permit" },
        { name: "Permanent Residency", path: "/guide/permanent-residency" },
        { name: "Dependent Passes", path: "/guide/family-dependents" }
      ]
    },
    {
      title: "Tax & Compliance",
      icon: <Scale size={28} color="var(--accent-gold)" />,
      items: [
        { name: "KRA PIN Registration", path: "/guide/kra-pin-guide" },
        { name: "Tax Residency Rules", path: "/guide/tax-residency" },
        { name: "Double Taxation Treaties", path: "/guide/taxation" },
        { name: "Foreign Bank Accounts", path: "/guide/banking" }
      ]
    },
    {
      title: "Business & Assets",
      icon: <Building2 size={28} color="#3b82f6" />,
      items: [
        { name: "Company Incorporation", path: "/guide/business-setup" },
        { name: "Real Estate Laws", path: "/guide/housing" },
        { name: "Local Hiring Compliance", path: "/guide/hiring" },
        { name: "Data Protection Act", path: "/guide/internet" }
      ]
    }
  ]

  const faqs = [
    { q: "How long does a Class N (Nomad) permit take?", a: "Official processing is 2-4 weeks, though we recommend allowing 60 days for unforeseen delays on the e-FNS portal." },
    { q: "Do I need a Kenya trust account?", a: "No, but you must prove you have at least $55,000 USD in annual income for Class N eligibility." },
    { q: "Can I work for Kenyan companies?", a: "Generally, Class N permits are for foreign source income only. To work locally, you require a Class D permit." },
    { q: "How do I get my KRA PIN as a non-resident?", a: "You can apply via the iTax portal, but it requires a 'Nominee' or official representation which VizaBot automates." }
  ]

  return (
    <>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '120px' }}>
        <Breadcrumbs />
        
        {/* Hub Hero */}
        <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-badge"
          >
            <Scale size={16} /> Official 2026 Kenya Legal & Immigration Guide
          </motion.div>
          {locId && (
             <Link to="/immigration-guide" style={{ color: 'var(--primary-emerald)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.9rem' }}>
                <ChevronLeft size={16} /> Back to Legal Guide
             </Link>
          )}
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '2rem' }}>
            {featuredLocation ? `${featuredLocation.name} Immigration Guide` : 'The Kenya Immigration Guide'}
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: '800px', margin: '2rem auto 3.5rem' }}>
            {featuredLocation 
              ? `Authorized immigration and legal breakdown for the ${featuredLocation.name} region. Tailored compliance data for 13+ nationalities.` 
              : 'The definitive source for Kenya’s immigration, tax, and business laws. Navigate complex legal requirements with precision-guided expertise.'}
          </p>
          
        </header>

        {!featuredLocation && (
          <>
            {/* Quick Actions */}
            <section style={{ marginBottom: '8rem' }}>
              <div className="grid-3">
                <Link to="/audit" className="glass-card hover-card" style={{ textDecoration: 'none', padding: '2.5rem' }}>
                  <ShieldCheck size={40} color="var(--primary-emerald)" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'white' }}>Do I Qualify?</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Take the 60-second Eligibility Audit to check your permit status.</p>
                </Link>
                <Link to="#hubs" className="glass-card hover-card" style={{ textDecoration: 'none', padding: '2.5rem' }}>
                  <BookOpen size={40} color="var(--accent-gold)" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'white' }}>Knowledge Base</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Browse comprehensive guides on Taxes, Visas, & Settlement.</p>
                </Link>
                <div 
                    onClick={() => window.location.href='mailto:concierge@vizabot.ke'}
                    className="glass-card hover-card" 
                    style={{ textDecoration: 'none', padding: '2.5rem', cursor: 'pointer' }}
                >
                  <CreditCard size={40} color="#3b82f6" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'white' }}>Get a Custom Quote</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Complex legal situation? Get a tailored roadmap from our VIP fixers.</p>
                </div>
              </div>
            </section>

            {/* Application Roadmap */}
            <section style={{ marginBottom: '10rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Success Roadmap</h2>
                    <p style={{ color: 'var(--text-muted)' }}>From initial audit to your first coffee in Nairobi.</p>
                </div>
                <Roadmap />
            </section>

            {/* Knowledge Hubs */}
            <section id="hubs" style={{ marginBottom: '8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <div style={{ width: '4px', height: '40px', background: 'var(--primary-emerald)', borderRadius: '10px' }}></div>
                    <h2 style={{ fontSize: '2.5rem' }}>Legal Knowledge Base</h2>
                </div>
                <div className="grid-3">
                    {knowledgeHubs.map((hub, idx) => (
                        <div key={idx} className="glass-card" style={{ padding: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                {hub.icon}
                                <h3 style={{ fontSize: '1.4rem' }}>{hub.title}</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {hub.items.map((item, i) => (
                                    <Link 
                                        key={i} 
                                        to={item.path} 
                                        style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}
                                        className="hover-card"
                                    >
                                        <ArrowRight size={14} color="var(--primary-emerald)" /> {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
          </>
        )}

        {/* Locations & Nationalities Grid */}
        <section style={{ marginBottom: '8rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '3rem', color: 'var(--text-white)' }}>
            {featuredLocation ? `Legal Guides for ${featuredLocation.name}` : 'Regional Logistics Guides'}
          </h2>
          <div className={featuredLocation ? "" : "grid-2"} style={{ gap: '2rem' }}>
            {locationsToShow.map(loc => (
              <div key={loc.id} className="glass-card" style={{ padding: '2.5rem', marginBottom: featuredLocation ? '2rem' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <MapPin color="var(--primary-emerald)" size={24} />
                  <h3 style={{ fontSize: '1.5rem' }}>{loc.name} Infrastructure</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>{loc.vibe}. {loc.highlights}</p>
                
                <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-emerald)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>Passport-Specific Nuances:</h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: featuredLocation ? 'repeat(auto-fill, minmax(220px, 1fr))' : '1fr 1fr', 
                  gap: '1rem' 
                }}>
                  {pseoData.nationalities.map(nat => (
                    <Link 
                      key={nat.id}
                      to={`/immigration-guide/${loc.id}/${nat.id}`}
                      style={{ 
                        color: 'var(--text-muted)', 
                        textDecoration: 'none', 
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.03)',
                        transition: 'all 0.3s ease',
                        border: '1px solid transparent'
                      }}
                      className="hover-card"
                    >
                      <Globe size={14} /> {nat.name} Guide <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {!featuredLocation && (
          <>
            {/* Global FAQ */}
            <section style={{ marginBottom: '8rem' }}>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '3rem', textAlign: 'center' }}>Legal FAQ</h2>
                <div className="grid-2">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <HelpCircle color="var(--accent-gold)" size={24} style={{ flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{faq.q}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{faq.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Expert Banner */}
            <section style={{ marginBottom: '8rem' }}>
                <div className="premium-glass glow-border" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center' }}>
                    <ShieldCheck size={48} color="var(--primary-emerald)" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Verified Authority</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        All data on this hub is updated monthly and reviewed by certified Kenyan Immigration Consultants. We track legal amendments in real-time to ensure your application remains compliant.
                    </p>
                </div>
            </section>
          </>
        )}

        <Footer />
      </div>
    </>
  )
}

export default NomadDirectory

