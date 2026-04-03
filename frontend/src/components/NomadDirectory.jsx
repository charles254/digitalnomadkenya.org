import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { m } from 'framer-motion'
import Navbar from './Navbar'
import Breadcrumbs from './Breadcrumbs'
import Footer from './Footer'
import Roadmap from './Roadmap'
import RelocationSavingsTool from './RelocationSavingsTool'
import pseoData from '../data/pseo_data.json'
import { injectJSONLD, updateMetaTags, setCanonical } from '../utils/seo'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import Globe from 'lucide-react/dist/esm/icons/globe'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Compass from 'lucide-react/dist/esm/icons/compass'
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
import BookOpen from 'lucide-react/dist/esm/icons/book-open'
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check'
import CreditCard from 'lucide-react/dist/esm/icons/credit-card'
import Briefcase from 'lucide-react/dist/esm/icons/briefcase'
import Scale from 'lucide-react/dist/esm/icons/scale'
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle'
import Building2 from 'lucide-react/dist/esm/icons/building-2'
import FileText from 'lucide-react/dist/esm/icons/file-text'
import Zap from 'lucide-react/dist/esm/icons/zap'
import Shield from 'lucide-react/dist/esm/icons/shield'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'

const NomadDirectory = () => {
  const { location: locId } = useParams()
  const navigate = useNavigate()

  const featuredLocation = locId ? pseoData.locations.find(l => l.id === locId) : null
  const locationsToShow = featuredLocation ? [featuredLocation] : pseoData.locations

  // Track which nationality accordion is open
  const [openNationality, setOpenNationality] = React.useState(null)

  // On mount, check URL hash for nationality anchor (e.g., #american)
  React.useEffect(() => {
    if (featuredLocation) {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        const nat = pseoData.nationalities.find(n => n.id === hash)
        if (nat) {
          setOpenNationality(hash)
          // Scroll to the nationality section after render
          setTimeout(() => {
            const el = document.getElementById(`nat-${hash}`)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 300)
        }
      }
    }
  }, [locId])

  React.useEffect(() => {
    if (featuredLocation) {
      document.title = `${featuredLocation.name} Digital Nomad Guide — Visa, Cost & Setup for All Nationalities`
    } else {
      document.title = "Immigration, Tax & Settlement Guide: Digital Nomad Kenya"
    }

    const descText = featuredLocation
      ? `Complete digital nomad guide for ${featuredLocation.name}, Kenya. Visa requirements, document checklists, tax treaties, embassy info and cost of living for Americans, Britons, Germans and 10 more nationalities.`
      : "The authoritative 2026 Kenya Legal Guide. Everything you need to know about Class N Permits, KRA PINs, Tax Residency, and Foreign Investor registration."

    const pageTitle = featuredLocation
      ? `${featuredLocation.name} Digital Nomad Guide — Visa, Cost & Setup | Digital Nomad Kenya`
      : "Official Kenya Legal Guide | Digital Nomad Kenya"
    const pageUrl = featuredLocation
      ? `https://digitalnomadkenya.org/immigration-guide/${featuredLocation.id}`
      : "https://digitalnomadkenya.org/immigration-guide"

    updateMetaTags({
      "description": descText,
      "og:title": pageTitle,
      "og:description": descText,
      "og:url": pageUrl,
      "twitter:title": pageTitle,
      "twitter:description": descText
    })
    setCanonical(pageUrl)

    // Breadcrumb Schema
    const breadcrumbs = [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://digitalnomadkenya.org"
    }];

    if (featuredLocation) {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
      "name": "Immigration Guide",
      "item": "https://digitalnomadkenya.org/immigration-guide"
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": featuredLocation.name,
      "item": `https://digitalnomadkenya.org/immigration-guide/${featuredLocation.id}`
    });
  } else {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Immigration Guide",
      "item": "https://digitalnomadkenya.org/immigration-guide"
    });
  }
    injectJSONLD({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    }, 'breadcrumb-schema');

    // Place Schema for location hub pages
    if (featuredLocation) {
      injectJSONLD({
        "@context": "https://schema.org",
        "@type": "Place",
        "name": featuredLocation.name,
        "description": featuredLocation.description_long,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": featuredLocation.region,
          "addressCountry": "KE"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Internet", "value": featuredLocation.internet },
          { "@type": "LocationFeatureSpecification", "name": "Vibe", "value": featuredLocation.vibe },
          { "@type": "LocationFeatureSpecification", "name": "Rent Range", "value": featuredLocation.rent }
        ]
      }, 'place-schema');

      // FAQPage Schema with nationality-specific content aggregated
      const faqEntries = pseoData.nationalities.map(nat => ({
        "@type": "Question",
        "name": `What documents do ${nat.name} citizens need for Kenya's Class N permit?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": nat.document_checklist ? nat.document_checklist.join(', ') : `${nat.name} citizens need a valid passport, police clearance, tax transcripts, bank statements, and proof of remote employment.`
        }
      }));
      faqEntries.push(
        { "@type": "Question", "name": "How long does a Class N (Nomad) permit take?", "acceptedAnswer": { "@type": "Answer", "text": "Official processing is 2-4 weeks, though we recommend allowing 60 days for unforeseen delays on the e-FNS portal." }},
        { "@type": "Question", "name": "Can I work for Kenyan companies on a Class N permit?", "acceptedAnswer": { "@type": "Answer", "text": "Generally, Class N permits are for foreign source income only. To work locally, you require a Class D permit." }}
      );

      injectJSONLD({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqEntries
      }, 'faq-schema');
    }

    // FAQPage Schema (only on main directory page)
    if (!featuredLocation) {
      injectJSONLD({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "How long does a Class N (Nomad) permit take?", "acceptedAnswer": { "@type": "Answer", "text": "Official processing is 2-4 weeks, though we recommend allowing 60 days for unforeseen delays on the e-FNS portal." }},
          { "@type": "Question", "name": "Do I need a Kenya trust account?", "acceptedAnswer": { "@type": "Answer", "text": "No, but you must prove you have at least $55,000 USD in annual income for Class N eligibility." }},
          { "@type": "Question", "name": "Can I work for Kenyan companies?", "acceptedAnswer": { "@type": "Answer", "text": "Generally, Class N permits are for foreign source income only. To work locally, you require a Class D permit." }},
          { "@type": "Question", "name": "How do I get my KRA PIN as a non-resident?", "acceptedAnswer": { "@type": "Answer", "text": "You can apply via the iTax portal, but it requires a 'Nominee' or official representation which Digital Nomad Kenya automates." }}
        ]
      }, 'faq-schema');
    }
  }, [locId])

  const knowledgeHubs = [
    {
      title: "Immigration & Permits",
      icon: <ShieldCheck size={28} color="var(--primary-emerald)" />,
      items: [
        { name: "Class N (Digital Nomad)", path: "/guide/permit-requirements" },
        { name: "Cost of Living Guide", path: "/guide/cost-of-living" },
        { name: "Safety & Logistics", path: "/guide/safety-for-expats" },
        { name: "Internet & Uptime", path: "/guide/internet-speed" }
      ]
    },
    {
      title: "Audit & Tools",
      icon: <Scale size={28} color="var(--accent-gold)" />,
      items: [
        { name: "Free Permit Audit", path: "/audit" },
        { name: "Visa Requirements", path: "/guide/permit-requirements" },
        { name: "Connectivity Auditor", path: "/guide/internet-speed" },
        { name: "Living Cost Calculator", path: "/guide/cost-of-living" }
      ]
    },
    {
      title: "Location Guides",
      icon: <Building2 size={28} color="#3b82f6" />,
      items: [
        { name: "Diani Beach", path: "/immigration-guide/diani" },
        { name: "Kilimani, Nairobi", path: "/immigration-guide/kilimani" },
        { name: "Lamu Island", path: "/immigration-guide/lamu" },
        { name: "Nanyuki", path: "/immigration-guide/nanyuki" }
      ]
    }
  ]

  const faqs = [
    { q: "How long does a Class N (Nomad) permit take?", a: "Official processing is 2-4 weeks, though we recommend allowing 60 days for unforeseen delays on the e-FNS portal." },
    { q: "Do I need a Kenya trust account?", a: "No, but you must prove you have at least $24,000 USD in annual income for Class N eligibility." },
    { q: "Can I work for Kenyan companies?", a: "Generally, Class N permits are for foreign source income only. To work locally, you require a Class D permit." },
    { q: "How do I get my KRA PIN as a non-resident?", a: "You can apply via the iTax portal, but it requires a 'Nominee' or official representation which Digital Nomad Kenya automates." }
  ]

  const handleStart = () => {
    navigate('/audit')
  }

  const toggleNationality = (natId) => {
    const next = openNationality === natId ? null : natId
    setOpenNationality(next)
    if (next) {
      // Update hash without triggering navigation
      window.history.replaceState(null, '', `#${next}`)
    } else {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  return (
    <>
      <Navbar />

      <div className="container" style={{ paddingTop: '120px' }}>
        <Breadcrumbs />

        {/* Hub Hero */}
        <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-badge"
          >
            <Scale size={16} /> Official 2026 Kenya Legal & Immigration Guide
          </m.div>
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
              ? `Complete immigration and legal breakdown for ${featuredLocation.name}. Tailored compliance data, document checklists, and visa requirements for 13+ nationalities.`
              : 'The definitive source for Kenya\'s immigration, tax, and business laws. Navigate complex legal requirements with precision-guided expertise.'}
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
                    onClick={() => window.location.href='mailto:concierge@digitalnomadkenya.org'}
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

        {/* === LOCATION HUB PAGE: Full content with nationality sections === */}
        {featuredLocation && (
          <>
            {/* Permit Overview */}
            <section style={{ marginBottom: '4rem' }}>
              <div className="grid-3" style={{ gap: '1.5rem' }}>
                <div className="premium-glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ color: 'var(--primary-emerald)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Permit Type</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Class N (Digital Nomad)</div>
                </div>
                <div className="premium-glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                  <div style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Min. Income</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>$24,000 USD Annually</div>
                </div>
                <div className="premium-glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Source Authority</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Kenya Immigration Act 2024</div>
                </div>
              </div>
            </section>

            {/* Location Lifestyle Specs */}
            <section style={{ marginBottom: '4rem' }}>
              <div className="glass-card">
                <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--primary-emerald)' }}>
                  {featuredLocation.name} Lifestyle Specs
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  <div>
                    <h3 style={{ color: 'var(--text-white)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Zap size={18} color="var(--primary-emerald)" /> Connectivity & Office
                    </h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{featuredLocation.internet} available. {featuredLocation.vibe}.</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {featuredLocation.coworking?.map(space => (
                        <span key={space} style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid var(--border-glass)' }}>
                          {space}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: 'var(--text-white)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Compass size={18} color="var(--primary-emerald)" /> Neighborhoods
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      {featuredLocation.neighborhoods?.map(hood => (
                        <div key={hood} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary-emerald)' }} />
                          {hood}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: 'var(--text-white)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Shield size={18} color="var(--primary-emerald)" /> Logistics & Safety
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {featuredLocation.logistics?.map((item, i) => (
                        <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--primary-emerald)' }}>•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Deep Dive Section */}
            {featuredLocation.description_long && (
              <section style={{ marginBottom: '4rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                   <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem', textAlign: 'center' }}>{featuredLocation.name} Nomad Deep-Dive</h2>
                   <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '3rem' }}>
                      {featuredLocation.description_long.split('\n\n').map((para, i) => (
                        <p key={i} style={{ marginBottom: '1.5rem' }}>{para}</p>
                      ))}
                   </div>

                   {featuredLocation.legality_tips && (
                     <div style={{ padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Scale size={24} /> Local Legal Residency Tip
                        </h3>
                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>{featuredLocation.legality_tips}</p>
                     </div>
                   )}
                </div>
              </section>
            )}

            {/* Nationality Comparison Table */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                Visa Requirements by Nationality
              </h2>
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                Select your nationality below to see specific document requirements, embassy info, tax treaties, and practical tips for moving to {featuredLocation.name}.
              </p>

              {/* Quick comparison table */}
              <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--primary-emerald)' }}>Nationality</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--primary-emerald)' }}>Processing</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--primary-emerald)' }}>Tax Treaty</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--primary-emerald)' }}>Community</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pseoData.nationalities.map(nat => (
                      <tr
                        key={nat.id}
                        onClick={() => toggleNationality(nat.id)}
                        style={{
                          borderBottom: '1px solid rgba(255,255,255,0.03)',
                          cursor: 'pointer',
                          background: openNationality === nat.id ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                          transition: 'background 0.2s'
                        }}
                        className="hover-card"
                      >
                        <td style={{ padding: '0.75rem', color: 'var(--text-white)', fontWeight: 500 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Globe size={14} color="var(--accent-gold)" /> {nat.name}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>~{nat.avg_processing_weeks} weeks</td>
                        <td style={{ padding: '0.75rem', color: nat.tax_treaty ? 'var(--primary-emerald)' : 'var(--text-muted)' }}>
                          {nat.tax_treaty ? 'Yes' : 'No'}
                        </td>
                        <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{nat.community_estimate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Nationality Accordion Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pseoData.nationalities.map(nat => {
                  const isOpen = openNationality === nat.id
                  return (
                    <div key={nat.id} id={`nat-${nat.id}`} className="glass-card" style={{ overflow: 'hidden' }}>
                      {/* Accordion Header */}
                      <button
                        onClick={() => toggleNationality(nat.id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '1.5rem 2rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--text-white)',
                          fontSize: '1.15rem',
                          fontWeight: 600
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Globe size={20} color="var(--accent-gold)" />
                          {featuredLocation.name} Guide for {nat.plural}
                        </span>
                        <ChevronDown
                          size={20}
                          style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                            color: 'var(--primary-emerald)'
                          }}
                        />
                      </button>

                      {/* Accordion Content */}
                      {isOpen && (
                        <div style={{ padding: '0 2rem 2rem' }}>
                          {/* Legal Alert */}
                          {nat.legal_gotcha && (
                            <div className="premium-glass glow-border" style={{ padding: '1.5rem', marginBottom: '2rem', borderRadius: '16px' }}>
                               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>
                                 <Shield size={18} /> <strong>{nat.name} Legal Alert</strong>
                               </div>
                               <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{nat.legal_gotcha}</p>
                            </div>
                          )}

                          {/* Document Checklist */}
                          {nat.document_checklist && (
                            <div style={{ marginBottom: '2rem' }}>
                              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-emerald)' }}>
                                {nat.name} Document Checklist for Class N
                              </h3>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {nat.document_checklist.map((doc, i) => (
                                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                                    <CheckCircle size={16} color="var(--primary-emerald)" style={{ flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.9rem' }}>{doc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Info Grid */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                            {nat.embassy && (
                              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                                <h4 style={{ color: 'var(--primary-emerald)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Embassy / High Commission</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{nat.embassy}</p>
                              </div>
                            )}
                            {nat.direct_flights && (
                              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                                <h4 style={{ color: 'var(--primary-emerald)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Direct Flight Routes</h4>
                                {nat.direct_flights.map((f, i) => (
                                  <p key={i} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 0.4rem' }}>{f}</p>
                                ))}
                              </div>
                            )}
                            {nat.exchange_tip && (
                              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Currency ({nat.currency}) Tips</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{nat.exchange_tip}</p>
                              </div>
                            )}
                            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                              <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Tax Treaty Status</h4>
                              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                                {nat.tax_treaty
                                  ? nat.tax_treaty_details
                                  : `${nat.country} and Kenya do not have a Double Taxation Agreement. Consult a tax advisor before relocating.`}
                              </p>
                            </div>
                            {nat.health_insurance_note && (
                              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                                <h4 style={{ color: '#3b82f6', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Health Insurance</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{nat.health_insurance_note}</p>
                              </div>
                            )}
                            {nat.community_estimate && (
                              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                                <h4 style={{ color: '#3b82f6', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Community in Kenya</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{nat.community_estimate}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0.5rem 0 0' }}>Avg. processing: ~{nat.avg_processing_weeks} weeks</p>
                              </div>
                            )}
                          </div>

                          {/* Testimonial */}
                          {nat.testimonial && (
                            <div style={{ padding: '1.5rem', textAlign: 'center', borderLeft: '4px solid var(--primary-emerald)', background: 'rgba(255,255,255,0.02)', borderRadius: '0 12px 12px 0' }}>
                              <p style={{ color: 'var(--text-white)', fontSize: '1rem', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                                "{nat.testimonial.quote}"
                              </p>
                              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                                — {nat.testimonial.name}, {nat.testimonial.location}
                              </p>
                            </div>
                          )}

                          {/* CTA */}
                          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <button className="btn-primary" onClick={handleStart}>
                              Start Free Audit for {nat.plural}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Relocation Savings Tool */}
            <section className="container section-m" style={{ marginBottom: '4rem' }}>
              <RelocationSavingsTool
                nationalityName={openNationality ? pseoData.nationalities.find(n => n.id === openNationality)?.name || 'Your' : 'Your'}
                targetLocation={featuredLocation.name}
                locationRent={featuredLocation.rent}
                onStart={handleStart}
              />
            </section>

            {/* Cross-Links: Other Locations */}
            <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-glass)' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>
                Explore Other Kenya Locations
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {pseoData.locations.filter(l => l.id !== locId).map(loc => (
                  <Link
                    key={loc.id}
                    to={`/immigration-guide/${loc.id}`}
                    className="glass-card hover-card"
                    style={{ padding: '1.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                  >
                    <MapPin size={16} color="var(--primary-emerald)" />
                    <div>
                      <div style={{ color: 'var(--text-white)', fontWeight: 'bold', fontSize: '0.95rem' }}>{loc.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{loc.vibe}</div>
                    </div>
                    <ArrowRight size={14} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Locations Grid (Hub page only - no longer links to nationality subpages) */}
        {!featuredLocation && (
          <section style={{ marginBottom: '8rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '3rem', color: 'var(--text-white)' }}>
              Regional Logistics Guides
            </h2>
            <div className="grid-2" style={{ gap: '2rem' }}>
              {locationsToShow.map(loc => (
                <Link key={loc.id} to={`/immigration-guide/${loc.id}`} className="glass-card hover-card" style={{ padding: '2.5rem', textDecoration: 'none', display: 'block' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <MapPin color="var(--primary-emerald)" size={24} />
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-white)' }}>{loc.name}</h3>
                  </div>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.7 }}>{loc.vibe}. {loc.highlights}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-emerald)', fontSize: '0.9rem' }}>
                    View full guide for 13 nationalities <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

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
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{faq.q}</h3>
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
