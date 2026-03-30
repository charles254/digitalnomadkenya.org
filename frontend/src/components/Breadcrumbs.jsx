import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'
import Home from 'lucide-react/dist/esm/icons/home'

const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  // Avoid rendering on the main landing page or partner dashboard entirely
  if (pathnames.length === 0 || pathnames[0] === 'partner') return null

  // Function to format the URL segments into human-readable text
  const formatSegment = (segment) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.4rem', 
      fontSize: '0.85rem', 
      color: 'var(--text-muted)',
      flexWrap: 'wrap',
      marginBottom: '2rem'
    }}>
      <Link to="/" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', textDecoration: 'none', transition: 'color 0.2s' }} className="breadcrumb-link">
        <Home size={14} />
      </Link>
      
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1

        return (
          <React.Fragment key={to}>
            <ChevronRight size={14} style={{ opacity: 0.4 }} />
            {isLast ? (
              <span style={{ color: 'var(--primary-emerald)', fontWeight: 600 }}>
                {formatSegment(value)}
              </span>
            ) : (
              <Link to={to} style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} className="breadcrumb-link">
                {formatSegment(value)}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Breadcrumbs
