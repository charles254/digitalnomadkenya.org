import React, { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import BadgeCheck from 'lucide-react/dist/esm/icons/badge-check'
import X from 'lucide-react/dist/esm/icons/x'

// Data pools for procedural generation
const firstNames = ["Michael", "Sarah", "David", "Emma", "Lukas", "Sophie", "James", "Noah", "Olivia", "William", "Ava", "Alexander", "Mia", "Benjamin", "Charlotte", "Daniel", "Amelia", "Mateo"]
const lastInitials = ["T.", "J.", "L.", "W.", "M.", "R.", "B.", "H.", "C.", "S.", "K.", "P.", "D.", "F."]
const countries = ["Germany", "UK", "USA", "Australia", "Switzerland", "France", "Canada", "Netherlands", "Sweden", "Norway", "Denmark", "Ireland", "Italy", "Spain", "New Zealand"]
const items = ["Application Pack", "VIP Fixer", "Eligibility Pass", "Application Pack", "Application Pack", "VIP Fixer"] // Weighted
const times = ["just now", "1 minute ago", "2 minutes ago", "3 minutes ago", "5 minutes ago", "10 minutes ago", "just now"] // Weighted

const generateRandomNotification = () => {
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastInitials[Math.floor(Math.random() * lastInitials.length)]}`
  const country = countries[Math.floor(Math.random() * countries.length)]
  const item = items[Math.floor(Math.random() * items.length)]
  const time = times[Math.floor(Math.random() * times.length)]
  
  return { name, country, item, time }
}

const SocialProof = () => {
  const [currentNotification, setCurrentNotification] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeoutId

    const cycle = () => {
      setCurrentNotification(generateRandomNotification())
      setIsVisible(true)

      // Hide after 5 seconds
      timeoutId = setTimeout(() => {
        setIsVisible(false)
        
        // Wait 12 to 25 seconds before showing the next one
        const nextWait = Math.floor(Math.random() * (25000 - 12000 + 1) + 12000)
        timeoutId = setTimeout(cycle, nextWait)
      }, 5000)
    }

    // Initial trigger after 4 seconds
    timeoutId = setTimeout(cycle, 4000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && currentNotification && (
        <m.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="social-proof-toast"
        >
          <div className="social-proof-icon">
            <BadgeCheck size={20} color="#fff" />
          </div>
          <div className="social-proof-content">
            <p className="social-proof-name">
              <strong>{currentNotification.name}</strong> from {currentNotification.country}
            </p>
            <p className="social-proof-action">
              Just generated the <span className="highlight-item">{currentNotification.item}</span>
            </p>
            <p className="social-proof-time">{currentNotification.time}</p>
          </div>
          <button className="social-proof-close" aria-label="Close notification" onClick={() => setIsVisible(false)}>
            <X size={14} />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default SocialProof
