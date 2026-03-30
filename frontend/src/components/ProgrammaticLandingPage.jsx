import React from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import Zap from 'lucide-react/dist/esm/icons/zap'
import Compass from 'lucide-react/dist/esm/icons/compass'
import Shield from 'lucide-react/dist/esm/icons/shield'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import Globe from 'lucide-react/dist/esm/icons/globe'
import CreditCard from 'lucide-react/dist/esm/icons/credit-card'
import Scale from 'lucide-react/dist/esm/icons/scale'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Breadcrumbs from './Breadcrumbs'
import Hero from './Hero'
import Pricing from './Pricing'
import Footer from './Footer'
import Requirements from './Requirements'
import RelocationSavingsTool from './RelocationSavingsTool'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import pseoData from '../data/pseo_data.json'
import { injectJSONLD, updateMetaTags, setCanonical } from '../utils/seo'

const ProgrammaticLandingPage = () => {
  const { location: locId, nationality: natId } = useParams()

  const locationData = pseoData.locations.find(l => l.id === locId)
  const nationalityData = pseoData.nationalities.find(n => n.id === natId)

  React.useEffect(() => {
    if (locationData && nationalityData) {
      const pageTitle = `${locationData.name} Guide for ${nationalityData.plural}: Kenya Digital Nomad Permit`
      const pageDesc = `Learn how ${nationalityData.name} citizens can move to ${locationData.name}, Kenya. Automated Class N permit audit, cost of living for ${nationalityData.plural}, and internet speed guide.`
      const pageUrl = `https://digitalnomad.ke/immigration-guide/${locationData.id}/${nationalityData.id}`

      document.title = pageTitle
      
      updateMetaTags({
        "description": pageDesc,
        "og:title": pageTitle,
        "og:description": pageDesc,
        "og:url": pageUrl,
        "twitter:title": pageTitle,
        "twitter:description": pageDesc
      })

      setCanonical(pageUrl)

      // Guide/Service Schema
      injectJSONLD({
        "@context": "https://schema.org",
        "@type": "Guide",
        "name": `Moving to ${locationData.name} for ${nationalityData.plural}`,
        "description": `Comprehensive guide for ${nationalityData.name} citizens relocating to ${locationData.name}, Kenya.`,
        "educationalAlignment": {
          "@type": "AlignmentObject",
          "alignmentType": "Immigration Laws",
          "educationalFramework": "Kenya Immigration Act 2024"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Digital Nomad Kenya"
        }
      }, 'guide-schema');

      // Breadcrumb Schema
      injectJSONLD({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://digitalnomad.ke"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "Immigration Guide",
          "item": "https://digitalnomad.ke/immigration-guide"
        },{
          "@type": "ListItem",
          "position": 3,
          "name": locationData.name,
          "item": `https://digitalnomad.ke/immigration-guide/${locationData.id}`
        },{
          "@type": "ListItem",
          "position": 4,
          "name": `${nationalityData.name} Guide`,
          "item": pageUrl
        }]
      }, 'breadcrumb-schema');
    }
  }, [locId, natId])

  // Redirect if data not found
  if (!locationData || !nationalityData) {
    return <Navigate to="/" replace />
  }

  const navigate = useNavigate()
  const handleStart = () => {
    navigate('/audit')
  }

  return (
    <>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '100px' }}>
        <Breadcrumbs />
        <header className="hero-content">
          <div className="premium-badge">
             Verified for {nationalityData.name} Citizens
          </div>
          <h1 className="hero-title" style={{ fontSize: '3.5rem' }}>
            Kenya Digital Nomad Permit (Class N):<br />
            {locationData.name} Guide for {nationalityData.plural}
          </h1>
          <p className="hero-subtitle">
            Moving from {nationalityData.country} to {locationData.name}? <br />
            Digital Nomad Kenya automates your Kenya Digital Nomad Permit. 
            Get your secure application dossier for the Silicon Savannah.
          </p>
          <button className="btn-primary" onClick={handleStart}>
            Start Free Audit for {nationalityData.plural}
          </button>
          
          <div className="grid-3" style={{ marginTop: '3rem', gap: '1.5rem' }}>
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
        </header>

        <section className="section-p" style={{ padding: '3rem 0' }}>
          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
            <div className="glass-card">
              <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--primary-emerald)' }}>
                {locationData.name} Lifestyle Specs
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: 'var(--text-white)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={18} color="var(--primary-emerald)" /> Connectivity & Office
                  </h4>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{locationData.internet} available. {locationData.vibe}.</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {locationData.coworking?.map(space => (
                      <span key={space} style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid var(--border-glass)' }}>
                        {space}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ color: 'var(--text-white)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Compass size={18} color="var(--primary-emerald)" /> Neighborhood Selection
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {locationData.neighborhoods?.map(hood => (
                      <div key={hood} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary-emerald)' }} />
                        {hood}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ color: 'var(--text-white)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={18} color="var(--primary-emerald)" /> Logistics & Safety Setup
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {locationData.logistics?.map((item, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--primary-emerald)' }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Kenya Visa for {nationalityData.name} Citizens</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
                For {nationalityData.name} citizens, the Kenya Class N permit requires a minimum annual income of $24,000. 
                Digital Nomad Kenya streamlines the legal document audit to ensure your {nationalityData.country}-based remote contract meets the 2024 Immigration Act standards.
              </p>
              
              {nationalityData.legal_gotcha && (
                <div className="premium-glass glow-border" style={{ padding: '1.5rem', marginBottom: '2rem', borderRadius: '16px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>
                     <Shield size={18} /> <strong>{nationalityData.name} Legal Alert</strong>
                   </div>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{nationalityData.legal_gotcha}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--bg-glass-heavy)', borderRadius: '12px', flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--primary-emerald)' }}>100% Success</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>For {nationalityData.name} Applicants</div>
                </div>
                <div style={{ padding: '1rem', background: 'var(--bg-glass-heavy)', borderRadius: '12px', flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--accent-gold)' }}>Zero Friction</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No Lawyer Required</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Section */}
        {locationData.description_long && (
          <section className="section-p" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-glass)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem', textAlign: 'center' }}>{locationData.name} Nomad Deep-Dive</h2>
               <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '3rem' }}>
                  {locationData.description_long.split('\n\n').map((para, i) => (
                    <p key={i} style={{ marginBottom: '1.5rem' }}>{para}</p>
                  ))}
               </div>
               
               {locationData.legality_tips && (
                 <div style={{ padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Scale size={24} /> Local Legal Residency Tip
                    </h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>{locationData.legality_tips}</p>
                 </div>
               )}
            </div>
          </section>
        )}

        <section className="container section-m" style={{ marginBottom: '4rem' }}>
          <RelocationSavingsTool
            nationalityName={nationalityData.name}
            targetLocation={locationData.name}
            locationRent={locationData.rent}
            onStart={handleStart}
          />
        </section>

        {/* Document Checklist Section */}
        {nationalityData.document_checklist && (
          <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-glass)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
              {nationalityData.name} Document Checklist for Class N
            </h2>
            <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '700px', margin: '0 auto' }}>
              {nationalityData.document_checklist.map((doc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={18} color="var(--primary-emerald)" style={{ flexShrink: 0 }} />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Enriched Nationality Details */}
        <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-glass)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
            Practical Info for {nationalityData.plural} Moving to Kenya
          </h2>
          <div className="grid-2" style={{ gap: '2rem' }}>
            {nationalityData.embassy && (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--primary-emerald)', marginBottom: '1rem', fontSize: '1.1rem' }}>Embassy / High Commission</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{nationalityData.embassy}</p>
              </div>
            )}
            {nationalityData.direct_flights && (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--primary-emerald)', marginBottom: '1rem', fontSize: '1.1rem' }}>Direct Flight Routes</h3>
                {nationalityData.direct_flights.map((f, i) => (
                  <p key={i} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{f}</p>
                ))}
              </div>
            )}
            {nationalityData.exchange_tip && (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '1.1rem' }}>Currency ({nationalityData.currency}) Tips</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{nationalityData.exchange_tip}</p>
              </div>
            )}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '1.1rem' }}>Tax Treaty Status</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {nationalityData.tax_treaty
                  ? nationalityData.tax_treaty_details
                  : `${nationalityData.country} and Kenya do not have a Double Taxation Agreement. Consult a tax advisor before relocating.`}
              </p>
            </div>
            {nationalityData.health_insurance_note && (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem', fontSize: '1.1rem' }}>Health Insurance</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{nationalityData.health_insurance_note}</p>
              </div>
            )}
            {nationalityData.community_estimate && (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem', fontSize: '1.1rem' }}>Community in Kenya</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{nationalityData.community_estimate}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Avg. processing time: ~{nationalityData.avg_processing_weeks} weeks</p>
              </div>
            )}
          </div>
        </section>

        {/* Testimonial */}
        {nationalityData.testimonial && (
          <section style={{ padding: '3rem 0' }}>
            <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '700px', margin: '0 auto', textAlign: 'center', borderLeft: '4px solid var(--primary-emerald)' }}>
              <p style={{ color: 'var(--text-white)', fontSize: '1.1rem', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "{nationalityData.testimonial.quote}"
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                — {nationalityData.testimonial.name}, {nationalityData.testimonial.location}
              </p>
            </div>
          </section>
        )}

        {/* Cross-Links: Other Locations for this Nationality */}
        <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-glass)' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>
            Other Kenya Locations for {nationalityData.plural}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {pseoData.locations.filter(l => l.id !== locId).map(loc => (
              <Link
                key={loc.id}
                to={`/immigration-guide/${loc.id}/${natId}`}
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

        {/* Cross-Links: Other Nationalities for this Location */}
        <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-glass)' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>
            Other Nationalities in {locationData.name}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {pseoData.nationalities.filter(n => n.id !== natId).map(nat => (
              <Link
                key={nat.id}
                to={`/immigration-guide/${locId}/${nat.id}`}
                className="glass-card hover-card"
                style={{ padding: '1.25rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <Globe size={16} color="var(--accent-gold)" />
                <span style={{ color: 'var(--text-white)', fontSize: '0.9rem' }}>{nat.name}</span>
                <ArrowRight size={14} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
              </Link>
            ))}
          </div>
        </section>

        <Requirements />
        <Pricing />
        <Footer />
      </div>
    </>
  )
}

export default ProgrammaticLandingPage
