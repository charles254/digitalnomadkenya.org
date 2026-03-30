import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Hero from './Hero'
import HowItWorks from './HowItWorks'
import Destinations from './Destinations'
import Features from './Features'
import Requirements from './Requirements'
import Testimonials from './Testimonials'
import Pricing from './Pricing'
import Footer from './Footer'
import { injectJSONLD, setCanonical } from '../utils/seo'

const LandingPage = () => {

  React.useEffect(() => {
    document.title = "Digital Nomad Kenya"
    
    const metaDesc = document.querySelector('meta[name="description"]')
    const descText = "Automate your Kenya Class N Digital Nomad permit application. Verified success for remote workers, premium document audit, and seamless expat logistics in Kenya."
    
    if (metaDesc) {
      metaDesc.setAttribute("content", descText)
    } else {
      const meta = document.createElement('meta')
      meta.name = "description"
      meta.content = descText
      document.head.appendChild(meta)
    }

    setCanonical("https://digitalnomadkenya.org/")

    // Organization Schema
    injectJSONLD({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Digital Nomad Kenya",
      "url": "https://digitalnomadkenya.org",
      "logo": "https://digitalnomadkenya.org/logo.png",
      "sameAs": [
        "https://twitter.com/vizabotke",
        "https://linkedin.com/company/vizabot-ke"
      ]
    }, 'org-schema');

    // Service Schema
    injectJSONLD({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Kenyan Immigration Automation",
      "provider": {
        "@type": "Organization",
        "name": "Digital Nomad Kenya"
      },
      "areaServed": "Kenya",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Nomad Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Class N Permit Automation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "VIP Fixer Service"
            }
          }
        ]
      }
    }, 'service-schema');

    // HowTo Schema
    injectJSONLD({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Get a Kenya Digital Nomad Permit",
      "description": "A 3-step process to automate your Kenya Class N Digital Nomad permit application.",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Secure Document Upload", "text": "Create your secure portal, enter your passport expiry date, and upload stamped bank statements." },
        { "@type": "HowToStep", "position": 2, "name": "Real-time Digital Audit", "text": "Our system scans for rock factors like invalid stamps and expiring passports instantly." },
        { "@type": "HowToStep", "position": 3, "name": "Get Your Dossier", "text": "Download a legally compliant PDF application packet ready to submit to the Kenyan e-Citizen portal." }
      ]
    }, 'howto-schema');
  }, [])

  const navigate = useNavigate()
  const handleStart = () => {
    navigate('/audit')
  }

  return (
    <>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '100px' }}>
        <Hero onStart={handleStart} />
        
        <HowItWorks />
        
        <Pricing />
        
        <Requirements />
        
        <Destinations />
        
        <Features />
        
        <Testimonials />
        
        <Footer />
      </div>
    </>
  )
}

export default LandingPage
