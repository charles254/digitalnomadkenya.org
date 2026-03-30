import React from 'react'
import Search from 'lucide-react/dist/esm/icons/search'
import Sparkles from 'lucide-react/dist/esm/icons/sparkles'

const SearchBar = () => {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      position: 'relative',
      zIndex: 10
    }}>
      <div className="premium-glass" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0.75rem 1.5rem', 
        borderRadius: '100px',
        gap: '1rem'
      }}>
        <Search size={20} color="var(--primary-emerald)" />
        <input 
          type="text" 
          placeholder="Search for permits, KRA PINs, taxation..." 
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'white', 
            flex: 1, 
            outline: 'none',
            fontSize: '1rem',
            padding: '0.5rem 0'
          }}
        />
        <div style={{ 
          background: 'var(--bg-glass-heavy)', 
          padding: '0.5rem 1.25rem', 
          borderRadius: '100px',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--accent-gold)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          cursor: 'pointer'
        }}>
            <Sparkles size={14} /> Power Search
        </div>
      </div>
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        justifyContent: 'center', 
        marginTop: '1.5rem',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
      }}>
        <span>Trending: <b>Class N Threshold</b></span>
        <span><b>KRA PIN</b></span>
        <span><b>Diani Fiber</b></span>
      </div>
    </div>
  )
}

export default SearchBar
