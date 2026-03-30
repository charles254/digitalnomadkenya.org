import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { setCanonical, updateMetaTags } from '../utils/seo'

const TermsOfService = () => {
  React.useEffect(() => {
    document.title = "Terms of Service: Digital Nomad Kenya"
    updateMetaTags({
      "description": "Digital Nomad Kenya Terms of Service. Understand the terms governing your use of our Kenya digital nomad permit automation platform.",
      "og:title": "Terms of Service | Digital Nomad Kenya",
      "og:description": "Terms governing Digital Nomad Kenya services.",
      "og:url": "https://digitalnomad.ke/terms"
    })
    setCanonical("https://digitalnomad.ke/terms")
  }, [])

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: '120px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Terms of Service</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Last updated: March 30, 2026</p>

          <div style={{ color: 'var(--text-muted)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Service Description</h2>
              <p>Digital Nomad Kenya provides automated eligibility audits and document preparation assistance for Kenya immigration permits, including Class N (Digital Nomad) and Class G (Investor) permits. We are not a law firm and do not provide legal advice. Our tools assist with document preparation and eligibility assessment only.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>2. User Responsibilities</h2>
              <p>You are responsible for providing accurate and truthful information. Submitting false documentation or misrepresenting your eligibility may result in application rejection by the Kenya Department of Immigration Services and potential legal consequences.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>3. No Guarantee of Approval</h2>
              <p>Digital Nomad Kenya does not guarantee permit approval. Final decisions are made solely by the Kenya Department of Immigration Services. Our audit results indicate eligibility likelihood based on publicly available criteria and should not be construed as a guarantee.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Payment & Refunds</h2>
              <p>Free audit simulations carry no charge. Paid services (VIP Fixer, Dossier Generation) are subject to the pricing displayed at the time of purchase. Refunds are available within 14 days if no dossier has been generated.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Limitation of Liability</h2>
              <p>Digital Nomad Kenya is not liable for immigration application outcomes, delays in government processing, or changes to Kenyan immigration law that may affect your application after submission.</p>
            </section>

            <section>
              <h2 style={{ color: 'var(--text-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>6. Contact</h2>
              <p>For questions about these terms, contact us at legal@digitalnomad.ke or write to: Digital Nomad Kenya, Nairobi, Kenya.</p>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default TermsOfService
