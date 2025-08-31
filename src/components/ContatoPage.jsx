import { useState, useEffect } from 'react'

function ContatoPage({ setCurrentPage }) {
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
      .contact-card {
        transform: translateY(0);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .contact-card:hover {
        transform: translateY(-15px) scale(1.02);
      }
      .form-input {
        transition: all 0.3s ease;
      }
      .form-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
        transform: scale(1.02);
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
        background: darkMode ? 
          'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(102, 126, 234, 0.2) 0%, transparent 50%)' : 
          'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
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
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="/logo.png" 
            alt="GADYS" 
            style={{
              height: '45px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '50%',
              padding: '8px',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
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
          <li><a href="/" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Início</a></li>
          <li><a href="/amazonas.html" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Amazonas</a></li>
          <li><a href="/lugares.html" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Lugares</a></li>
          <li><a href="#" onClick={() => {setCurrentPage('mapapage'); document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Mapa</a></li>
          <li><a href="/perfil.html" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Perfil</a></li>
          <li><a href="#" onClick={() => {setCurrentPage('sobrepage'); document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Sobre</a></li>
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none', padding: '0.5rem 1rem', cursor: 'not-allowed' }}>Contato (atual)</a></li>
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
          marginBottom: '6rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'conic-gradient(from 0deg, transparent, rgba(102, 126, 234, 0.1), transparent)',
            animation: 'rotate 20s linear infinite',
            zIndex: -1
          }} />
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem',
            letterSpacing: '-3px',
            lineHeight: '1.1',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
          }}>
            Entre em Contato
          </h1>
          
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.8,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Estamos aqui para ajudar você<br />
            <span style={{ color: '#667eea', fontWeight: '500' }}>Fale conosco através dos canais abaixo</span>
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
            fontSize: '2.5rem', 
            marginBottom: '3rem', 
            textAlign: 'center',
            fontWeight: '700'
          }}>Informações de Contato</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {[
              { title: 'Email', desc: 'contato@gadys.com.br', color: '#667eea' },
              { title: 'Telefone', desc: '(11) 9999-9999', color: '#764ba2' },
              { title: 'Endereço', desc: 'São Paulo, SP - Brasil', color: '#f093fb' }
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
                  padding: '2rem',
                  borderRadius: '25px',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
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
                  fontSize: '1.3rem', 
                  marginBottom: '1rem',
                  fontWeight: '600',
                  color: item.color
                }}>{item.title}</h3>
                <p style={{ 
                  opacity: 0.8,
                  lineHeight: 1.6,
                  fontSize: '1rem',
                  color: 'white'
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
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
            fontSize: '2.5rem', 
            marginBottom: '3rem', 
            textAlign: 'center',
            fontWeight: '700'
          }}>Nossas Redes Sociais</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {[
              { title: 'Facebook', desc: '@gadys.oficial', color: '#1877f2' },
              { title: 'Instagram', desc: '@gadys_turismo', color: '#e4405f' },
              { title: 'Twitter', desc: '@gadys_br', color: '#1da1f2' },
              { title: 'LinkedIn', desc: 'GADYS Turismo', color: '#0077b5' }
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
                  padding: '2rem',
                  borderRadius: '25px',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
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
                  fontSize: '1.3rem', 
                  marginBottom: '1rem',
                  fontWeight: '600',
                  color: item.color
                }}>{item.title}</h3>
                <p style={{ 
                  opacity: 0.8,
                  lineHeight: 1.6,
                  fontSize: '1rem',
                  color: 'white'
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '6rem'
        }}>
          <div 
            className="contact-card"
            style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
              padding: '4rem 3rem',
              borderRadius: '30px',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              boxShadow: '0 30px 60px rgba(102, 126, 234, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #667eea, #764ba2)'
            }} />
            
            <h2 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '3rem',
              textAlign: 'center',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Envie uma Mensagem</h2>
            
            <form 
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              onSubmit={(e) => {
                e.preventDefault()
                alert('Mensagem enviada com sucesso!')
              }}
            >
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Seu nome"
                  className="form-input"
                  required
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    borderRadius: '15px',
                    border: '2px solid rgba(102, 126, 234, 0.3)',
                    background: 'rgba(255,255,255,0.1)',
                    color: darkMode ? 'white' : '#2c3e50',
                    fontSize: '1.1rem',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  placeholder="Seu email"
                  className="form-input"
                  required
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    borderRadius: '15px',
                    border: '2px solid rgba(102, 126, 234, 0.3)',
                    background: 'rgba(255,255,255,0.1)',
                    color: darkMode ? 'white' : '#2c3e50',
                    fontSize: '1.1rem',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <div style={{ position: 'relative' }}>
                <textarea 
                  placeholder="Sua mensagem"
                  rows="6"
                  className="form-input"
                  required
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    borderRadius: '15px',
                    border: '2px solid rgba(102, 126, 234, 0.3)',
                    background: 'rgba(255,255,255,0.1)',
                    color: darkMode ? 'white' : '#2c3e50',
                    fontSize: '1.1rem',
                    resize: 'vertical',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              
              <button 
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1.5rem 2rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-5px) scale(1.02)'
                  e.target.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.6)'
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)'
                  e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)'
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Enviar Mensagem</span>
              </button>
            </form>
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
              🏠 Voltar ao Início
            </button>
            
            <button 
              onClick={() => setCurrentPage('sobrepage')}
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
              ℹ️ Sobre Nós
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

export default ContatoPage