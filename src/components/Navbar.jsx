import { useState } from 'react'

function Navbar({ darkMode, toggleTheme, userType }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header style={{
      background: darkMode ? '#0d1117' : '#1a237e',
      color: 'white',
      padding: '1rem 0'
    }}>
      <nav style={{
        width: '100%',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <img 
          src="/logo.png" 
          alt="GADYS" 
          style={{
            height: '40px',
            background: 'lightblue',
            borderRadius: '50%',
            padding: '8px'
          }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              zIndex: 1002
            }}
            onClick={toggleMenu}
          >
            <span style={{
              width: '25px',
              height: '3px',
              background: 'white',
              margin: '3px 0',
              transition: '0.3s'
            }} />
            <span style={{
              width: '25px',
              height: '3px',
              background: 'white',
              margin: '3px 0',
              transition: '0.3s'
            }} />
            <span style={{
              width: '25px',
              height: '3px',
              background: 'white',
              margin: '3px 0',
              transition: '0.3s'
            }} />
          </div>
        </div>

        {menuOpen && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000
            }}
            onClick={toggleMenu}
          />
        )}

        <ul style={{
          position: 'fixed',
          top: 0,
          right: menuOpen ? 0 : '-100%',
          width: '300px',
          height: '100vh',
          background: darkMode ? '#0d1117' : '#1a237e',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '2rem',
          margin: 0,
          padding: '4rem 0',
          listStyle: 'none',
          transition: 'right 0.3s ease',
          zIndex: 1001,
          overflowY: 'scroll'
        }}>
          <li>
            <a 
              href="/" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              Início
            </a>
          </li>
          
          <li style={{ position: 'relative', display: 'inline-block' }}>
            <a 
              href="#estados"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                transition: 'background 0.3s'
              }}
            >
              Estados Brasileiros ▼
            </a>
          </li>
          
          <li>
            <a 
              href="/mapa-real-api.html"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              Mapa
            </a>
          </li>
          
          <li>
            <a 
              href="/perfil.html"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              Meu Perfil
            </a>
          </li>
          
          <li>
            <a 
              href="/sobre.html"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              Sobre
            </a>
          </li>
          
          <li>
            <a 
              href="/contato.html"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              Contato
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar