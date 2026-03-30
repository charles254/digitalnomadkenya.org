import React from 'react'
import { motion } from 'framer-motion'
import Quote from 'lucide-react/dist/esm/icons/quote'

const testimonials = [
  {
    name: "Alex",
    role: "Senior UX Designer, Berlin",
    quote: "I was stuck in loop with the e-Citizen portal. VizaBot audited my stamped statements and generated the exact cover letter I needed for my Class N. Approved in 14 days.",
    image: "https://i.pravatar.cc/100?img=11"
  },
  {
    name: "Marcus",
    role: "Crypto Trader, Cape Town",
    quote: "The tax residency breakdown was a lifesaver. VizaBot explained how to maintain my nomad status without getting caught in the KRA's 183-day trap.",
    image: "https://i.pravatar.cc/100?img=12"
  },
  {
    name: "Elena",
    role: "Senior Dev, San Francisco",
    quote: "I was worried about the internet in Diani. VizaBot's connectivity report guided me to the exact villa with Liquid Fiber. 100Mbps in paradise!",
    image: "https://i.pravatar.cc/100?img=22"
  },
  {
    name: "Zhang",
    role: "Tech Investor, Singapore",
    quote: "Most efficient business setup I've experienced. Class G permit and company registration were handled in record time. Truly the Silk Road to the Silicon Savannah.",
    image: "https://i.pravatar.cc/100?img=33"
  },
  {
    name: "Chloe",
    role: "Travel Writer, Paris",
    quote: "The free audit simulator gave me the confidence to move. I wasn't just guessing—I had a data-backed legal roadmap before I even booked my flight.",
    image: "https://i.pravatar.cc/100?img=44"
  },
  {
    name: "Siddharth",
    role: "Marketing Lead, Bangalore",
    quote: "The safest entry into the African tech scene. VizaBot didn't just give me a permit; they gave me a community. Highly recommend the VIP service for scaling your network.",
    image: "https://i.pravatar.cc/100?img=60"
  }
]

const Testimonials = () => {
  return (
    <section id="testimonials" style={{ padding: '6rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Trusted by Global Nomads</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Join the community of remote workers and investors thriving in Kenya.
        </p>
      </div>

      <div className="grid-3">
        {testimonials.map((t, idx) => (
          <motion.div 
            key={idx}
            className="testimonial-card glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
          >
            <Quote size={40} color="var(--bg-glass-heavy)" style={{ position: 'absolute', top: '2rem', right: '2rem' }} />
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '2rem', position: 'relative', zIndex: 1, color: 'var(--text-white)' }}>
              "{t.quote}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={t.image} alt={t.name} style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid var(--primary-emerald)' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{t.name}</h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
