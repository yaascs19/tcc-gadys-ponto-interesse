import { useState } from 'react'
import Navbar from './Navbar'

function Sobre() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  return (
    <div className={`page ${darkMode ? 'dark-mode' : ''}`} style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.6,
      color: darkMode ? '#e0e0e0' : '#333',
      background: darkMode ? '#1a1a1a' : '#fff'
    }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, padding: '4rem 2rem' }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: darkMode ? '#21262d' : 'white',
          padding: '3rem',
          borderRadius: '15px',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '2rem',
            color: '#1a237e',
            textAlign: 'center'
          }}>
            Sobre o GADYS
          </h1>
          
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '1rem',
              color: darkMode ? '#f0f6fc' : '#2c3e50'
            }}>
              Nossa Missão
            </h2>
            <p style={{
              color: darkMode ? '#8b949e' : '#555',
              lineHeight: 1.8,
              marginBottom: '1.5rem'
            }}>
              O GADYS (Guia de Atrativos e Destinos Turísticos) é uma plataforma dedicada a promover e divulgar os pontos de interesse mais incríveis do Brasil. Nossa missão é conectar viajantes com experiências autênticas e memoráveis em todo o território nacional.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '1rem',
              color: darkMode ? '#f0f6fc' : '#2c3e50'
            }}>
              O que Oferecemos
            </h2>
            <ul style={{
              color: darkMode ? '#8b949e' : '#555',
              lineHeight: 1.8,
              paddingLeft: '1.5rem'
            }}>
              <li>Informações detalhadas sobre monumentos históricos</li>
              <li>Guias de destinos naturais e ecológicos</li>
              <li>Descobertas gastronômicas regionais</li>
              <li>Experiências culturais autênticas</li>
              <li>Sistema de avaliações e comentários</li>
              <li>Mapas interativos com localização precisa</li>
            </ul>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '1rem',
              color: darkMode ? '#f0f6fc' : '#2c3e50'
            }}>
              Nossa Visão
            </h2>
            <p style={{
              color: darkMode ? '#8b949e' : '#555',
              lineHeight: 1.8
            }}>
              Ser a principal referência em turismo nacional, promovendo o desenvolvimento sustentável do setor turístico brasileiro e valorizando as riquezas naturais, culturais e históricas de cada região do país.
            </p>
          </div>

          <div style={{
            background: darkMode ? '#0d1117' : '#f8f9fa',
            padding: '2rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: '#1a237e'
            }}>
              Junte-se à Nossa Comunidade
            </h3>
            <p style={{
              color: darkMode ? '#8b949e' : '#555',
              marginBottom: '1.5rem'
            }}>
              Compartilhe suas experiências, descubra novos destinos e ajude outros viajantes a explorar as maravilhas do Brasil.
            </p>
            <button 
              style={{
                background: '#1a237e',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background 0.3s'
              }}
              onClick={() => window.location.href = '/contato.html'}
              onMouseOver={(e) => e.target.style.background = '#0d1a5c'}
              onMouseOut={(e) => e.target.style.background = '#1a237e'}
            >
              Entre em Contato
            </button>
          </div>
        </div>
      </main>

      <footer style={{
        background: darkMode ? '#0d1117' : '#2c3e50',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <p>&copy; 2025 GADYS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default Sobre