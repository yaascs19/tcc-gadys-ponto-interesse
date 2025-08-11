import React, { useState } from 'react'

function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header style={{background: '#1a237e', color: 'white', padding: '1rem 0'}}>
      <nav style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <img src="/logo.png" alt="GADYS" style={{height: '40px', background: 'lightblue', borderRadius: '50%', padding: '8px'}} />

        
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <div 
            onClick={toggleMenu}
            style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              zIndex: 1002
            }}
          >
            <span style={{width: '25px', height: '3px', background: 'white', margin: '3px 0', transition: '0.3s'}}></span>
            <span style={{width: '25px', height: '3px', background: 'white', margin: '3px 0', transition: '0.3s'}}></span>
            <span style={{width: '25px', height: '3px', background: 'white', margin: '3px 0', transition: '0.3s'}}></span>
          </div>
        </div>
        
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            opacity: isMenuOpen ? 1 : 0,
            visibility: isMenuOpen ? 'visible' : 'hidden',
            transition: 'all 0.3s ease'
          }}
          onClick={toggleMenu}
        ></div>
        
        <ul style={{
          position: 'fixed',
          top: 0,
          right: isMenuOpen ? 0 : '-100%',
          width: '300px',
          height: '100vh',
          background: '#1a237e',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: '2rem',
          margin: 0,
          padding: '3rem 0',
          listStyle: 'none',
          transition: 'right 0.3s ease',
          zIndex: 1001,
          overflowY: 'scroll'
        }}>
          <li><a href="/" style={{color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '5px', transition: 'background 0.3s'}}>Início</a></li>
          <li>
            <span style={{color: 'white', padding: '0.5rem 1rem', cursor: 'pointer'}}>Estados Brasileiros ▼</span>
            <div style={{display: 'none', position: 'absolute', background: 'white', minWidth: '200px', boxShadow: '0px 8px 16px rgba(0,0,0,0.2)', borderRadius: '5px'}}>
              <a href="/amazonas.html" style={{color: '#333', padding: '12px 16px', display: 'block', textDecoration: 'none'}}>Amazonas</a>
            </div>
          </li>
          <li><a href="/perfil.html" style={{color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '5px', transition: 'background 0.3s'}}>Meu Perfil</a></li>
          <li><a href="/mapa.html" style={{color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '5px', transition: 'background 0.3s'}}>Mapa</a></li>
          <li><a href="/sobre.html" style={{color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '5px', transition: 'background 0.3s'}}>Sobre</a></li>
          <li><a href="/contato.html" style={{color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '5px', transition: 'background 0.3s'}}>Contato</a></li>
          <li><a href="#" style={{color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '5px', transition: 'background 0.3s'}}>Administração</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default AdminNavbar