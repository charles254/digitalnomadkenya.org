import React, { useState, useRef } from 'react'
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
import { injectJSONLD } from '../utils/seo'

const LandingPage = () => {

  React.useEffect(() => {
    document.title = "VizaBot KE: Kenya's #1 Digital Nomad Permit Automation"
    
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

    // Organization Schema
    injectJSONLD({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "VizaBot KE",
      "url": "https://vizabot.ke",
      "logo": "https://vizabot.ke/logo.png",
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
        "name": "VizaBot KE"
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
  }, [])

  const handleStart = () => {
    window.location.href = '/audit'
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
