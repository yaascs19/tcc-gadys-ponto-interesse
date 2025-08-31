import { useState, useEffect } from 'react'

function SobrePage({ setCurrentPage }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .nav-links.active {
        right: 0 !important;
      }
      .nav-overlay.active {
        opacity: 1 !important;
        visibility: visible !important;
      }
      .nav-links li:hover .dropdown-content {
        display: block !important;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      color: darkMode ? 'white' : '#2c3e50',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: darkMode ? 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)' : 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
        zIndex: 1
      }} />

      <header style={{
        background: darkMode ? 'rgba(15, 12, 41, 0.8)' : '#1a237e',
        backdropFilter: 'blur(30px)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="/logo.png" 
            alt="GADYS" 
            style={{
              height: '45px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '50%',
              padding: '8px'
            }}
          />
          <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '1px', color: 'white' }}>GADYS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={toggleTheme}
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              border: darkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.2)',
              color: darkMode ? 'white' : '#2c3e50',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '10px',
              transition: 'all 0.3s'
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
            onClick={() => document.querySelector('.nav-links').classList.toggle('active')}
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
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            opacity: 0,
            visibility: 'hidden',
            transition: 'all 0.3s ease'
          }}
          className="nav-overlay"
          onClick={() => document.querySelector('.nav-links').classList.remove('active')}
        />
        <ul 
          className="nav-links"
          style={{
            position: 'fixed',
            top: 0,
            right: '-100%',
            width: '300px',
            height: '100vh',
            background: darkMode ? '#1a237e' : '#1a237e',
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
            overflowY: 'scroll',
            boxShadow: '-5px 0 15px rgba(0,0,0,0.1)'
          }}
        >
          <li><a href="#" onClick={() => {setCurrentPage('home'); document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Início</a></li>
          <li className="dropdown" style={{ position: 'relative' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Estados Brasileiros ▼</a>
            <div className="dropdown-content" style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: 'white',
              minWidth: '200px',
              maxHeight: '300px',
              overflowY: 'auto',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              borderRadius: '5px',
              display: 'none',
              zIndex: 1002
            }}>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Acre</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Alagoas</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Amapá</a>
              <a href="/amazonas.html" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Amazonas</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Bahia</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Ceará</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Distrito Federal</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Espírito Santo</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Goiás</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Maranhão</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Mato Grosso</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Mato Grosso do Sul</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Minas Gerais</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Pará</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Paraíba</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Paraná</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Pernambuco</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Piauí</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Rio de Janeiro</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Rio Grande do Norte</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Rio Grande do Sul</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Rondônia</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Roraima</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Santa Catarina</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>São Paulo</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Sergipe</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Tocantins</a>
            </div>
          </li>
          <li><a href="#" onClick={() => {setCurrentPage('lugarespage'); document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Lugares</a></li>
          <li><a href="#" onClick={() => {setCurrentPage('mapapage'); document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Mapa</a></li>
          <li><a href="#" onClick={(e) => {e.preventDefault(); if (!localStorage.getItem('isLoggedIn')) setCurrentPage('login'); else window.location.href='/adicionar-locais.html'; document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Adicionar Local</a></li>
          <li><a href="#" onClick={() => {setCurrentPage('perfilpage'); document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Meu Perfil</a></li>
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none', padding: '0.5rem 1rem', cursor: 'not-allowed' }}>Sobre (atual)</a></li>
          <li><a href="#" onClick={() => {setCurrentPage('contatopage'); document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Contato</a></li>
        </ul>
      </header>

      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <section style={{
          textAlign: 'center',
          padding: '8rem 0 6rem',
          background: darkMode ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
          borderRadius: '0 0 50px 50px',
          marginBottom: '6rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem',
            letterSpacing: '-3px',
            lineHeight: '1.1'
          }}>
            Sobre a GADYS
          </h1>
          
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.8,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Guia de Atrativos e Destinos Turísticos<br />
            <span style={{ color: '#667eea', fontWeight: '500' }}>Conectando você aos lugares mais incríveis do Brasil</span>
          </p>
        </section>

        <section style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          boxShadow: '0 30px 60px rgba(102, 126, 234, 0.1)'
        }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '3rem', 
            textAlign: 'center',
            color: darkMode ? 'white' : '#2c3e50',
            fontWeight: '700'
          }}>Quem Somos</h2>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: 1.8, 
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Somos uma plataforma inovadora dedicada a conectar viajantes com as maravilhas do Brasil. 
            Nossa equipe é apaixonada por turismo e comprometida em promover as riquezas naturais, 
            culturais e históricas do nosso país através de tecnologia de ponta e experiência especializada.
          </p>
        </section>

        <section style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          boxShadow: '0 30px 60px rgba(102, 126, 234, 0.1)'
        }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '3rem',
            textAlign: 'center',
            fontWeight: '700'
          }}>Nossa Missão</h2>
          <p style={{ 
            fontSize: '1.3rem', 
            lineHeight: 1.8,
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            Promover o turismo nacional, conectando viajantes com experiências autênticas e 
            memoráveis em todo o território brasileiro. Valorizamos a diversidade cultural, 
            natural e histórica do nosso país, oferecendo informações confiáveis e atualizadas 
            sobre os melhores destinos turísticos.
          </p>
        </section>

        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '4rem', 
            textAlign: 'center',
            fontWeight: '700'
          }}>Nossos Objetivos</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {[
              { title: 'Preservar', desc: 'Valorizar e promover o patrimônio histórico e cultural brasileiro', color: '#667eea' },
              { title: 'Sustentabilidade', desc: 'Incentivar o turismo responsável e a preservação ambiental', color: '#764ba2' },
              { title: 'Cultura Local', desc: 'Destacar a riqueza gastronômica e tradições regionais', color: '#f093fb' },
              { title: 'Diversidade', desc: 'Celebrar a pluralidade cultural e artística do Brasil', color: '#ff6b6b' }
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
                  padding: '3rem 2rem',
                  borderRadius: '25px',
                  backdropFilter: 'blur(20px)',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                  boxShadow: darkMode ? '0 20px 40px rgba(0,0,0,0.2)' : '0 20px 40px rgba(0,0,0,0.1)',
                  transform: 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)'
                  e.currentTarget.style.boxShadow = darkMode ? '0 40px 80px rgba(0,0,0,0.3)' : '0 40px 80px rgba(0,0,0,0.15)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = darkMode ? '0 20px 40px rgba(0,0,0,0.2)' : '0 20px 40px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${item.color}, transparent)`
                }} />

                <h3 style={{ 
                  fontSize: '1.8rem', 
                  marginBottom: '1.5rem',
                  fontWeight: '600',
                  color: item.color
                }}>{item.title}</h3>
                <p style={{ 
                  opacity: 0.8,
                  lineHeight: 1.6,
                  fontSize: '1.1rem',
                  color: 'white'
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          background: darkMode ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '4rem',
            textAlign: 'center',
            fontWeight: '700'
          }}>Nossa Equipe</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { name: 'Ana Silva', role: 'CEO & Fundadora' },
              { name: 'Carlos Santos', role: 'CTO' },
              { name: 'Maria Oliveira', role: 'Designer UX/UI' },
              { name: 'João Costa', role: 'Desenvolvedor' },
              { name: 'Lucia Ferreira', role: 'Marketing' }
            ].map((member, index) => (
              <div key={index} style={{ 
                textAlign: 'center',
                transition: 'all 0.3s'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: '3px solid rgba(255,255,255,0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.5)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)'
                }}
                >
                  👤
                </div>
                <h4 style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}>{member.name}</h4>
                <p style={{ 
                  opacity: 0.7,
                  fontSize: '1rem',
                  color: '#667eea'
                }}>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          textAlign: 'center',
          padding: '4rem 0 6rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => window.location.href = '/'}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '1.5rem 3rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
                letterSpacing: '0.5px'
              }}
            >
              Voltar ao Início
            </button>
            
            <button 
              onClick={() => setCurrentPage('contatopage')}
              style={{
                background: 'transparent',
                color: darkMode ? 'white' : '#2c3e50',
                border: darkMode ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(44, 62, 80, 0.3)',
                padding: '1.5rem 3rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                letterSpacing: '0.5px'
              }}
            >
              Entre em Contato
            </button>
          </div>
        </section>
      </main>

      <footer style={{
        background: darkMode ? 'rgba(15, 12, 41, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        padding: '3rem',
        borderTop: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        <p style={{ opacity: 0.7, fontSize: '1rem' }}>&copy; 2025 GADYS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default SobrePage