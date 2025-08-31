import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Pelourinho() {
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
            background: '#1a237e',
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
              <a href="/amazonas.html" onClick={(e) => {e.preventDefault(); window.location.href='/amazonas.html'; document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Amazonas</a>
            </div>
          </li>
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
            Pelourinho
          </h1>
          
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.8,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Centro histórico de Salvador<br />
            <span style={{ color: '#667eea', fontWeight: '500' }}>Salvador - BA</span>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <img 
                src="/pelo.jpg" 
                alt="Pelourinho"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)'
                }}
              />
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: '700' }}>Sobre o Local</h2>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.8, opacity: 0.9, marginBottom: '2rem' }}>
                O Pelourinho é o centro histórico de Salvador, considerado Patrimônio Cultural da Humanidade pela UNESCO. 
                Com suas ruas de paralelepípedos e casarões coloniais coloridos, representa um dos conjuntos arquitetônicos 
                coloniais mais importantes das Américas. É o coração cultural da Bahia, onde pulsam a música, a dança, 
                a gastronomia e as tradições afro-brasileiras.
              </p>
            </div>
          </div>
        </section>

        <section style={{
          background: darkMode ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center', fontWeight: '700' }}>História</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, opacity: 0.9, marginBottom: '2rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto 2rem' }}>
            Fundado em 1549, o Pelourinho foi o primeiro centro urbano do Brasil e um dos principais portos de entrada 
            de escravos africanos. O nome deriva do pelourinho (poste onde eram castigados os escravos) que ficava na praça central. 
            Após décadas de decadência, foi restaurado na década de 1990, recuperando sua importância como centro cultural 
            e turístico, sendo declarado Patrimônio Mundial da UNESCO em 1985.
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
          <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center', fontWeight: '700' }}>Informações Práticas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem' }}>
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '2rem',
              borderRadius: '20px'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#667eea', fontWeight: '600' }}>Como Chegar</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Metrô: Estação Campo da Pólvora</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Ônibus: Várias linhas até o Centro</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Elevador Lacerda (Cidade Baixa)</li>
              </ul>
            </div>
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '2rem',
              borderRadius: '20px'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#667eea', fontWeight: '600' }}>Atrações</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Igreja do Rosário dos Pretos</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Fundação Casa de Jorge Amado</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Museu da Cidade</li>
              </ul>
            </div>
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '2rem',
              borderRadius: '20px'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#667eea', fontWeight: '600' }}>Horários</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Visitação: 24 horas</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Museus: 9h às 18h</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Apresentações: Terças às 20h</li>
              </ul>
            </div>
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '2rem',
              borderRadius: '20px'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#667eea', fontWeight: '600' }}>Dicas</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Visite durante o dia</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Prove a culinária baiana</li>
                <li style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Assista apresentações culturais</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{
          background: darkMode ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center', fontWeight: '700' }}>Curiosidades</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { title: 'Patrimônio UNESCO', desc: 'Primeiro sítio brasileiro declarado Patrimônio Mundial em 1985' },
              { title: 'Casarões Coloridos', desc: 'Mais de 800 imóveis restaurados em cores vibrantes' },
              { title: 'Berço do Axé', desc: 'Local onde nasceu o movimento musical Axé Music' },
              { title: 'Jorge Amado', desc: 'Cenário de diversos romances do escritor baiano' },
              { title: 'Olodum', desc: 'Sede do famoso bloco afro que conquistou o mundo' },
              { title: 'Arquitetura Colonial', desc: 'Maior conjunto arquitetônico colonial do Brasil' }
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
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.2)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#667eea', fontWeight: '600' }}>{item.title}</h3>
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
              to="/lugares"
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
                letterSpacing: '0.5px',
                textDecoration: 'none'
              }}
            >
              Voltar aos Lugares
            </Link>
            
            <Link 
              to="/mapa"
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

export default Pelourinho