import React from 'react'
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import BookOpen from 'lucide-react/dist/esm/icons/book-open'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import Zap from 'lucide-react/dist/esm/icons/zap'
import Shield from 'lucide-react/dist/esm/icons/shield'
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle'
import Navbar from './Navbar'
import Breadcrumbs from './Breadcrumbs'
import Footer from './Footer'
import Requirements from './Requirements'
const LivingCostCalculator = React.lazy(() => import('./LivingCostCalculator'))
const ConnectivityAuditor = React.lazy(() => import('./ConnectivityAuditor'))
const EligibilityScorer = React.lazy(() => import('./EligibilityScorer'))
const SafetyChecklist = React.lazy(() => import('./SafetyChecklist'))
import pseoData from '../data/pseo_data.json'
import { injectJSONLD, updateMetaTags, setCanonical } from '../utils/seo'

const TopicLandingPage = () => {
  const { topic: topicId } = useParams()
  const topicData = pseoData.topics.find(t => t.id === topicId)

  React.useEffect(() => {
    if (topicData) {
      const pageTitle = `${topicData.title}: Digital Nomad Kenya`
      const pageDesc = `${topicData.desc} Verified expert insights for digital nomads in Kenya. Includes ${topicData.entities.join(', ')}.`
      const pageUrl = `https://digitalnomad.ke/guide/${topicData.id}`

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

      // Article/Guide Schema
      injectJSONLD({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": topicData.title,
        "description": topicData.desc,
        "author": {
          "@type": "Organization",
          "name": "Digital Nomad Kenya"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Digital Nomad Kenya",
          "logo": {
            "@type": "ImageObject",
            "url": "https://digitalnomad.ke/globe_favicon.png"
          }
        },
        "datePublished": "2026-03-06",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl
        }
      }, 'article-schema');

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
          "name": topicData.keyword,
          "item": pageUrl
        }]
      }, 'breadcrumb-schema');

      // FAQPage Schema
      if (topicData.faqs && topicData.faqs.length > 0) {
        injectJSONLD({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": topicData.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        }, 'faq-schema');
      }
    }
  }, [topicId])

  if (!topicData) {
    return <Navigate to="/immigration-guide" replace />
  }

  const navigate = useNavigate()
  const handleStart = () => {
    navigate('/audit')
  }

  return (
    <>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '120px' }}>
        <Breadcrumbs />
        <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div className="premium-badge">
            <Zap size={16} /> Official 2026 Digital Nomad Guide
          </div>
          <h1 className="hero-title" style={{ fontSize: '3.5rem', marginTop: '1.5rem', lineHeight: '1.2' }}>
            {topicData.title}
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: '800px', margin: '2rem auto' }}>
            {topicData.desc} Managed by Digital Nomad Kenya – Kenya's standard for immigration automation and expat logistics.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {topicData.entities.map((entity, i) => (
              <span key={i} style={{ 
                padding: '0.5rem 1rem', 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid var(--border-glass)', 
                borderRadius: '50px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}>
                #{entity}
              </span>
            ))}
          </div>
        </header>

        <section className="section-p" style={{ padding: '6rem 0' }}>
          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
            <div className="glass-card">
              <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--primary-emerald)' }}>
                {topicData.keyword} Index
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {topicData.entities.map(entity => (
                  <div key={entity} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-white)' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-emerald)' }} />
                    {entity}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{topicData.title}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
                {topicData.desc}
              </p>
              <button className="btn-primary" onClick={handleStart}>
                Start a Free Audit Simulator
              </button>
            </div>
          </div>
        </section>

        <section className="container section-m" style={{ marginBottom: '8rem' }}>
          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
            <div className="glass-card" style={{ padding: '3.5rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-white)' }}>
                Key Data Points
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ color: 'var(--primary-emerald)' }}><CheckCircle size={24} /></div>
                  <div>
                    <h4 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>Verified Accuracy</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Updated weekly against official Kenya Gazette and Immigration notices.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ color: 'var(--primary-emerald)' }}><CheckCircle size={24} /></div>
                  <div>
                    <h4 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>Entity Relationship</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Cross-referenced with KRA (Tax) and Central Bank of Kenya (Logistics).</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ color: 'var(--primary-emerald)' }}><CheckCircle size={24} /></div>
                  <div>
                    <h4 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>Legal Standing</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Focus on Class N (Work from home) and Class G (Investment) compliance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Deep Dive: {topicData.keyword}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
                Navigating {topicData.keyword} in a new country can be daunting. Digital Nomad Kenya's data engine provides 
                real-time insights for the tech-savvy professional. Whether you're planning a relocation to Diani or 
                a short-term stint in Nairobi, understanding these core pillars is essential for a frictionless experience.
              </p>
              
              {topicData.proTips && (
                <div style={{ background: 'rgba(212, 175, 55, 0.1)', borderLeft: '4px solid var(--accent-gold)', padding: '1.5rem', borderRadius: '0 12px 12px 0', marginBottom: '2rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>
                     <Zap size={18} /> PRO TIP
                   </div>
                   <p style={{ color: 'var(--text-white)', fontSize: '0.95rem', fontStyle: 'italic' }}>"{topicData.proTips}"</p>
                </div>
              )}

              <button className="btn-primary" onClick={handleStart} style={{ width: '100%', padding: '1.2rem' }}>
                Audit Your Eligibility Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {topicData.faqs && (
          <section className="container" style={{ marginBottom: '8rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {topicData.faqs.map((faq, i) => (
                <div key={i} className="glass-card" style={{ padding: '2rem' }}>
                  <h4 style={{ color: 'var(--primary-emerald)', marginBottom: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle size={20} /> {faq.q}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <Requirements />

        <React.Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading tool...</div>}>
          {topicId === 'cost-of-living' && (
            <section className="container" style={{ marginBottom: '8rem' }}>
              <LivingCostCalculator />
            </section>
          )}

          {topicId === 'internet-speed' && (
            <section className="container" style={{ marginBottom: '8rem' }}>
              <ConnectivityAuditor />
            </section>
          )}

          {topicId === 'permit-requirements' && (
            <section className="container" style={{ marginBottom: '8rem' }}>
              <EligibilityScorer />
            </section>
          )}

          {topicId === 'safety-for-expats' && (
            <section className="container" style={{ marginBottom: '8rem' }}>
              <SafetyChecklist />
            </section>
          )}
        </React.Suspense>

        <section style={{ padding: '6rem 0', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>Explore Local Guides</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {pseoData.locations.map(loc => (
              <Link 
                key={loc.id} 
                to={`/immigration-guide/${loc.id}`} 
                className="glass-card hover-card" 
                style={{ padding: '2rem', textDecoration: 'none' }}
              >
                <h4 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>{loc.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{loc.vibe}</p>
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default TopicLandingPage
