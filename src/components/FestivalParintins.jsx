import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function FestivalParintins() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

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
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none', padding: '0.5rem 1rem', cursor: 'not-allowed' }}>Festival de Parintins (atual)</a></li>
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
            Festival de Parintins
          </h1>
          
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.8,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Maior festival folclórico do Brasil<br />
            <span style={{ color: '#4caf50', fontWeight: '500' }}>Parintins - AM</span>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <img 
                src="/festival.jpeg" 
                alt="Festival de Parintins"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(76, 175, 80, 0.2)'
                }}
              />
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: '700' }}>Sobre o Festival</h2>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.8, opacity: 0.9, marginBottom: '2rem' }}>
                O Festival Folclórico de Parintins é o maior festival do gênero no Brasil, 
                realizado anualmente no último fim de semana de junho. A disputa entre os 
                bois Garantido (vermelho) e Caprichoso (azul) transforma a cidade em um 
                espetáculo único de música, dança, teatro e arte amazônica.
              </p>
            </div>
          </div>
        </section>

        <section style={{
          background: darkMode ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.06) 0%, rgba(139, 195, 74, 0.02) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: darkMode ? '1px solid rgba(76, 175, 80, 0.1)' : '1px solid rgba(76, 175, 80, 0.2)'
        }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center', fontWeight: '700' }}>História</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, opacity: 0.9, marginBottom: '2rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto 2rem' }}>
            O festival teve origem na década de 1960, inspirado nas tradições do bumba-meu-boi. 
            Os bois Garantido e Caprichoso foram criados em 1913 e 1915, respectivamente. 
            A partir de 1987, o evento ganhou formato competitivo oficial, transformando-se 
            no maior espetáculo folclórico a céu aberto do mundo, atraindo milhares de 
            visitantes de todo o Brasil e exterior.
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
          <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center', fontWeight: '700' }}>Informações Práticas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem' }}>
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '2rem',
              borderRadius: '20px'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4caf50', fontWeight: '600' }}>Quando Acontece</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Último fim de semana de junho</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>3 noites de apresentação</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Bumbódromo de Parintins</li>
              </ul>
            </div>
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '2rem',
              borderRadius: '20px'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4caf50', fontWeight: '600' }}>Como Chegar</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Voo para Parintins</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Barco de Manaus</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>420 km de Manaus</li>
              </ul>
            </div>
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '2rem',
              borderRadius: '20px'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4caf50', fontWeight: '600' }}>O que Esperar</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Apresentações dos bois</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Alegorias gigantes</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Toadas emocionantes</li>
              </ul>
            </div>
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '2rem',
              borderRadius: '20px'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4caf50', fontWeight: '600' }}>Dicas</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Reserve com antecedência</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Use cores do seu boi</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Chegue cedo ao bumbódromo</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{
          background: darkMode ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.06) 0%, rgba(139, 195, 74, 0.02) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: darkMode ? '1px solid rgba(76, 175, 80, 0.1)' : '1px solid rgba(76, 175, 80, 0.2)'
        }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center', fontWeight: '700' }}>Curiosidades</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { title: 'Rivalidade', desc: 'Garantido (vermelho) vs Caprichoso (azul)' },
              { title: 'Bumbódromo', desc: '35 mil pessoas de capacidade' },
              { title: 'Transmissão', desc: 'Exibido nacionalmente pela TV' },
              { title: 'Economia', desc: 'Movimenta milhões na região' },
              { title: 'Artistas', desc: 'Grandes nomes da música brasileira' },
              { title: 'Tradição', desc: 'Patrimônio Cultural do Brasil' }
            ].map((item, index) => (
              <div key={index} style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '2rem',
                borderRadius: '20px',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(76, 175, 80, 0.2)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#4caf50', fontWeight: '600' }}>{item.title}</h3>
                <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.5 }}>{item.desc}</p>
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
              to="/amazonas/cultura"
              style={{
                background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
                color: 'white',
                border: 'none',
                padding: '1.5rem 3rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 15px 35px rgba(76, 175, 80, 0.4)',
                letterSpacing: '0.5px',
                textDecoration: 'none'
              }}
            >
              Voltar à Cultura
            </Link>
            
            <Link 
              to="/mapa"
              style={{
                background: 'transparent',
                color: darkMode ? '#e8f5e8' : '#1b5e20',
                border: darkMode ? '2px solid rgba(76, 175, 80, 0.5)' : '2px solid rgba(76, 175, 80, 0.7)',
                padding: '1.5rem 3rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                letterSpacing: '0.5px',
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

export default FestivalParintins