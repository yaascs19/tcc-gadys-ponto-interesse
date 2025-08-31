import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function MonumentosAmazonas2() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  const monumentos = [
    {
      nome: 'Teatro Amazonas',
      desc: 'Majestoso teatro do período áureo da borracha, inaugurado em 1896',
      detalhes: 'Símbolo de Manaus, construído durante o ciclo da borracha com materiais europeus',
      img: '/teatro-amazonas1.jpeg',
      localizacao: 'Centro Histórico de Manaus'
    },
    {
      nome: 'Forte de São José',
      desc: 'Fortaleza histórica que marca o início da colonização portuguesa',
      detalhes: 'Construído em 1669 para defender a região dos invasores holandeses',
      img: '/forte.jpeg',
      localizacao: 'Rio Negro, Manaus'
    },
    {
      nome: 'Palácio da Justiça',
      desc: 'Edifício histórico com arquitetura colonial preservada',
      detalhes: 'Sede do poder judiciário amazonense, exemplo da arquitetura do século XIX',
      img: '/jus.jpeg',
      localizacao: 'Centro de Manaus'
    },
    {
      nome: 'Mercado Municipal',
      desc: 'Mercado histórico inspirado no mercado de Les Halles de Paris',
      detalhes: 'Construído em 1882, é um dos principais pontos turísticos de Manaus',
      img: '/mer.jpeg',
      localizacao: 'Porto de Manaus'
    },
    {
      nome: 'Igreja de São Sebastião',
      desc: 'Igreja histórica do século XVIII no centro de Manaus',
      detalhes: 'Uma das igrejas mais antigas da cidade, marco da colonização religiosa',
      img: '/sao.jpeg',
      localizacao: 'Centro Histórico de Manaus'
    },
    {
      nome: 'Palácio Rio Negro',
      desc: 'Antiga residência dos governadores, hoje centro cultural',
      detalhes: 'Construído em 1903, abriga exposições e eventos culturais',
      img: '/pala.jpeg',
      localizacao: 'Centro de Manaus'
    }
  ]

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  useEffect(() => {
    window.scrollTo(0, 0)
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
      background: darkMode ? 'linear-gradient(135deg, #0d2818 0%, #1a4d2e 50%, #2d5a3d 100%)' : 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
      color: darkMode ? '#e8f5e8' : '#1b5e20',
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
        background: darkMode ? 'radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 195, 74, 0.15) 0%, transparent 50%)' : 'radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)',
        zIndex: 1
      }} />

      <header style={{
        background: darkMode ? 'rgba(13, 40, 24, 0.8)' : '#2e7d32',
        backdropFilter: 'blur(30px)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(76, 175, 80, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="/logo.png" 
            alt="GADYS" 
            style={{
              height: '45px',
              background: 'linear-gradient(135deg, #4caf50, #8bc34a)',
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
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
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
            background: '#2e7d32',
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
          <li><Link to="/" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Início</Link></li>
          <li><Link to="/amazonas" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Amazonas</Link></li>
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none', padding: '0.5rem 1rem', cursor: 'not-allowed' }}>Monumentos (atual)</a></li>
          <li><Link to="/lugares" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Lugares</Link></li>
          <li><Link to="/mapa" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Mapa</Link></li>
          <li><Link to="/perfil" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Meu Perfil</Link></li>
          <li><Link to="/sobre" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Sobre</Link></li>
          <li><Link to="/contato" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Contato</Link></li>
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
          background: darkMode ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(139, 195, 74, 0.05) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
          borderRadius: '0 0 50px 50px',
          marginBottom: '6rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 50%, #cddc39 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem',
            letterSpacing: '-3px',
            lineHeight: '1.1'
          }}>
            Monumentos do Amazonas
          </h1>
          
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.8,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Patrimônios históricos que contam a rica história amazônica
          </p>
        </section>

        <section style={{
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(139, 195, 74, 0.1) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: '1px solid rgba(76, 175, 80, 0.2)',
          boxShadow: '0 30px 60px rgba(76, 175, 80, 0.1)'
        }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '4rem', 
            textAlign: 'center',
            fontWeight: '700'
          }}>Monumentos Históricos</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem'
          }}>
            {monumentos.map((monumento, index) => (
              <div
                key={index}
                style={{
                  background: darkMode ? 'linear-gradient(135deg, rgba(13, 40, 24, 0.8) 0%, rgba(26, 77, 46, 0.6) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(232, 245, 232, 0.7) 100%)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(76, 175, 80, 0.1)',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(76, 175, 80, 0.2)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.1)'
                }}
              >
                <img 
                  src={monumento.img}
                  alt={monumento.nome}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    color: '#4caf50',
                    fontWeight: '700'
                  }}>
                    {monumento.nome}
                  </h3>
                  <p style={{
                    opacity: 0.8,
                    lineHeight: 1.6,
                    marginBottom: '1rem'
                  }}>
                    {monumento.desc}
                  </p>
                  <p style={{
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    marginBottom: '1rem',
                    fontStyle: 'italic'
                  }}>
                    {monumento.detalhes}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    color: '#4caf50',
                    fontSize: '0.9rem'
                  }}>
                    📍 {monumento.localizacao}
                  </div>
                  <button 
                    onClick={() => {
                      if (monumento.nome === 'Teatro Amazonas') {
                        navigate('/teatro-amazonas')
                      } else if (monumento.nome === 'Forte de São José') {
                        navigate('/forte-sao-jose')
                      } else if (monumento.nome === 'Palácio da Justiça') {
                        navigate('/palacio-justica')
                      } else if (monumento.nome === 'Mercado Municipal') {
                        navigate('/mercado-municipal')
                      } else if (monumento.nome === 'Igreja de São Sebastião') {
                        navigate('/igreja-sao-sebastiao')
                      } else if (monumento.nome === 'Palácio Rio Negro') {
                        navigate('/palacio-rio-negro')
                      }
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.8rem 2rem',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      transition: 'all 0.3s'
                    }}
                  >
                    Saiba Mais
                  </button>
                </div>
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
            <Link 
              to="/amazonas"
              style={{
                background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
                color: 'white',
                border: 'none',
                padding: '1.5rem 3rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.3s',
                textDecoration: 'none'
              }}
            >
              Voltar ao Amazonas
            </Link>
            
            <Link 
              to="/mapa"
              style={{
                background: 'transparent',
                color: darkMode ? '#e8f5e8' : '#1b5e20',
                border: '2px solid #4caf50',
                padding: '1.5rem 3rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.3s',
                textDecoration: 'none'
              }}
            >
              Ver no Mapa
            </Link>
          </div>
        </section>
      </main>

      <footer style={{
        background: darkMode ? 'rgba(13, 40, 24, 0.9)' : 'rgba(46, 125, 50, 0.9)',
        textAlign: 'center',
        padding: '3rem',
        borderTop: '1px solid rgba(76, 175, 80, 0.3)',
        position: 'relative',
        zIndex: 10
      }}>
        <p style={{ opacity: 0.7, fontSize: '1rem', color: 'white' }}>&copy; 2025 GADYS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default MonumentosAmazonas2