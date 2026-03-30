import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import Wifi from 'lucide-react/dist/esm/icons/wifi'
import Sun from 'lucide-react/dist/esm/icons/sun'
import Trees from 'lucide-react/dist/esm/icons/trees'
import Waves from 'lucide-react/dist/esm/icons/waves'
import Mountain from 'lucide-react/dist/esm/icons/mountain'
import Coffee from 'lucide-react/dist/esm/icons/coffee'
import Camera from 'lucide-react/dist/esm/icons/camera'
import Building from 'lucide-react/dist/esm/icons/building'
import Compass from 'lucide-react/dist/esm/icons/compass'
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right'

const destinations = [
  {
    id: "nairobi",
    name: "Nairobi",
    tagline: "The Silicon Savannah",
    image: "https://picsum.photos/seed/nairobikenya/800/600",
    stats: [
      { icon: <Wifi size={16} />, text: "100+ Mbps Fiber" },
      { icon: <Building size={16} />, text: "Coworking Hubs" }
    ],
    desc: "A bustling metropolis with world-class tech infrastructure, vibrant nightlife, and a national park right in the city limits."
  },
  {
    id: "diani",
    name: "Diani Beach",
    tagline: "Tropical Productivity",
    image: "https://picsum.photos/seed/dianibeach/800/600",
    stats: [
      { icon: <Wifi size={16} />, text: "Starlink Ready" },
      { icon: <Sun size={16} />, text: "Pristine Beaches" }
    ],
    desc: "Consistently voted Africa's best beach. Work from oceanfront villas with our vetted list of solar-powered, high-connectivity homes."
  },
  {
    id: "kilifi",
    name: "Kilifi",
    tagline: "The Creative Creek",
    image: "https://picsum.photos/seed/kilifiocean/800/600",
    stats: [
      { icon: <Coffee size={16} />, text: "Remote Communities" },
      { icon: <Waves size={16} />, text: "Sailing & Surf" }
    ],
    desc: "A creative and entrepreneurial haven on the coast. Perfect for slow living, networking with expats, and beachfront brainstorming."
  },
  {
    id: "nanyuki",
    name: "Nanyuki",
    tagline: "Mt. Kenya Basecamp",
    image: "https://picsum.photos/seed/nanyukimountain/800/600",
    stats: [
      { icon: <Camera size={16} />, text: "Wildlife Reserves" },
      { icon: <Mountain size={16} />, text: "Cooler Climate" }
    ],
    desc: "Escape the heat and connect with nature. A sophisticated mountain town offering incredible conservancies and solid fiber internet."
  },
  {
    id: "naivasha",
    name: "Naivasha",
    tagline: "Rift Valley Retreat",
    image: "https://picsum.photos/seed/naivashalake/800/600",
    stats: [
      { icon: <Trees size={16} />, text: "Nature Trails" },
      { icon: <MapPin size={16} />, text: "Geothermal Power" }
    ],
    desc: "Just two hours from Nairobi, surrounded by lakes and national parks. An ideal quiet retreat for focused deep-work sessions."
  },
  {
    id: "watamu",
    name: "Watamu",
    tagline: "Marine Paradise",
    image: "https://picsum.photos/seed/watamubeach/800/600",
    stats: [
      { icon: <Sun size={16} />, text: "Marine Parks" },
      { icon: <Waves size={16} />, text: "Deep Sea Fishing" }
    ],
    desc: "A tranquil coastal village known for its stunning marine national park, pristine white sand beaches, and luxurious coastal resorts."
  },
  {
    id: "kisumu",
    name: "Kisumu",
    tagline: "Lakeside Emerging Tech",
    image: "https://picsum.photos/seed/kisumulake/800/600",
    stats: [
      { icon: <Wifi size={16} />, text: "Growing Tech Scene" },
      { icon: <Compass size={16} />, text: "Lake Victoria Views" }
    ],
    desc: "Kenya's third-largest city sits on Lake Victoria. It offers a relaxed pace of life, stunning sunsets, and an emerging tech community."
  },
  {
    id: "lamu",
    name: "Lamu Island",
    tagline: "Cultural Escape",
    image: "https://picsum.photos/seed/lamutown/800/600",
    stats: [
      { icon: <Coffee size={16} />, text: "Swahili Culture" },
      { icon: <Sun size={16} />, text: "Car-Free Island" }
    ],
    desc: "Step back in time on this UNESCO World Heritage island. No cars, winding Swahili streets, and a deep sense of historical tranquility."
  },
  {
    id: "nakuru",
    name: "Nakuru",
    tagline: "Wildlife & Wellness",
    image: "https://picsum.photos/seed/nakurupark/800/600",
    stats: [
      { icon: <Camera size={16} />, text: "Flamingo Lakes" },
      { icon: <Building size={16} />, text: "Modern Amenities" }
    ],
    desc: "A fast-growing city famous for its proximity to Lake Nakuru National Park. Offers a great balance of city conveniences and nature."
  },
  {
    id: "mombasa",
    name: "Mombasa",
    tagline: "Historic Port City",
    image: "https://picsum.photos/seed/mombasaport/800/600",
    stats: [
      { icon: <MapPin size={16} />, text: "Historic Fort Jesus" },
      { icon: <Wifi size={16} />, text: "Coastal Commerce" }
    ],
    desc: "Kenya's vibrant coastal capital. A melting pot of cultures, historic architecture, and the gateway to the Indian Ocean."
  }
]

const Destinations = () => {
  const [visibleCount, setVisibleCount] = useState(6)

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, destinations.length))
  }

  return (
    <section id="destinations" style={{ padding: '8rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Live & Work in Kenya</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Stop worrying about visas and start planning your lifestyle. We've vetted the best hubs for remote workers and digital investors.
        </p>
      </div>

      <div className="grid-2">
        <AnimatePresence>
          {destinations.slice(0, visibleCount).map((dest, idx) => (
            <motion.div 
              key={dest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: (idx % 2) * 0.1, duration: 0.4 }}
              className="glass-card destination-card"
              style={{ overflow: 'hidden', padding: 0 }}
            >
              <div style={{ height: '300px', position: 'relative' }}>
                <img
                  src={dest.image}
                  alt={`${dest.name} - Digital nomad destination in Kenya`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark), transparent)' }}></div>
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                  <h3 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>{dest.name}</h3>
                  <span style={{ color: 'var(--primary-emerald)', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{dest.tagline}</span>
                </div>
              </div>
              
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  {dest.stats.map((stat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {stat.icon} {stat.text}
                    </div>
                  ))}
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>{dest.desc}</p>
                <Link 
                  to={`/immigration-guide/${dest.id}/american`} 
                  className="btn-secondary" 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', width: '100%', fontSize: '0.85rem', marginTop: 'auto' }}
                >
                  View American Nomad Guide <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {visibleCount < destinations.length && (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button onClick={loadMore} className="btn-secondary" style={{ padding: '1rem 3rem' }}>
            Load More Locations
          </button>
        </div>
      )}
    </section>
  )
}

export default Destinations
