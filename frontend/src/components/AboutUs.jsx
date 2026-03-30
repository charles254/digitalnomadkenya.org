import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { setCanonical, updateMetaTags } from '../utils/seo'

const AboutUs = () => {
  React.useEffect(() => {
    document.title = "About Us: Digital Nomad Kenya"
    updateMetaTags({
      "description": "Digital Nomad Kenya is Kenya's leading digital nomad permit automation platform. Learn about our mission, team, and commitment to simplifying immigration for remote workers.",
      "og:title": "About Us | Digital Nomad Kenya",
      "og:description": "Kenya's leading digital nomad permit automation platform.",
      "og:url": "https://digitalnomad.ke/about"
    })
    setCanonical("https://digitalnomad.ke/about")
  }, [])

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: '120px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>About Digital Nomad Kenya</h1>

          <div style={{ color: 'var(--text-muted)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>Our Mission</h2>
              <p>Digital Nomad Kenya was built to eliminate the friction of Kenyan immigration bureaucracy for digital nomads and remote workers. We automate the Class N permit application process — from document auditing to dossier generation — so you can focus on what matters: your work and your new life in Kenya.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>What We Do</h2>
              <p>Our AI-powered platform scans your documents against the Kenya Immigration Act 2024 requirements in real time. We identify issues before the government does — expired passports, unstamped bank statements, incorrect police clearance certificates — and generate a submission-ready dossier that meets e-Citizen portal standards.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>Why Kenya?</h2>
              <p>Kenya is the Silicon Savannah — Africa's tech capital with world-class fiber infrastructure, a thriving expat community, and some of the most beautiful landscapes on Earth. From Diani's white sand beaches to Nanyuki's Mt. Kenya views, Kenya offers digital nomads an unmatched combination of affordability, connectivity, and quality of life.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>Our Track Record</h2>
              <div className="grid-3" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-emerald)' }}>200+</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Permits Processed</div>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>13</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Nationalities Served</div>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6' }}>100%</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Approval Rate</div>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Us</h2>
              <p>Have questions? Reach out at concierge@digitalnomad.ke or find us on Twitter @vizabotke. For partnership inquiries, visit our <a href="/partner" style={{ color: 'var(--primary-emerald)' }}>Partner Portal</a>.</p>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default AboutUs
