import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { setCanonical, updateMetaTags } from '../utils/seo'

const PrivacyPolicy = () => {
  React.useEffect(() => {
    document.title = "Privacy Policy: Digital Nomad Kenya"
    updateMetaTags({
      "description": "Digital Nomad Kenya Privacy Policy. Learn how we collect, use, and protect your personal data during the Kenya digital nomad permit application process.",
      "og:title": "Privacy Policy | Digital Nomad Kenya",
      "og:description": "How Digital Nomad Kenya handles your personal data.",
      "og:url": "https://digitalnomadkenya.org/privacy"
    })
    setCanonical("https://digitalnomadkenya.org/privacy")
  }, [])

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: '120px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Last updated: March 30, 2026</p>

          <div style={{ color: 'var(--text-muted)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
              <p>We collect information you provide directly, including your name, email address, WhatsApp number, passport expiry date, and income documentation when using our audit simulator or requesting a quote. We do not store bank statements or sensitive financial documents beyond the duration of the audit session.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
              <p>Your data is used exclusively to process your Kenya digital nomad permit eligibility audit, generate your application dossier, and communicate with you about your application status. We never sell your personal data to third parties.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>3. Data Security</h2>
              <p>All data is encrypted in transit (TLS 1.3) and at rest. Our servers are hosted in EU-compliant data centers. Uploaded documents are automatically purged after 30 days unless you request retention for ongoing applications.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Your Rights</h2>
              <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at privacy@digitalnomadkenya.org. We comply with the Kenya Data Protection Act, 2019 and GDPR where applicable.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Contact</h2>
              <p>For privacy inquiries, contact us at privacy@digitalnomadkenya.org or write to: Digital Nomad Kenya, Nairobi, Kenya.</p>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default PrivacyPolicy
