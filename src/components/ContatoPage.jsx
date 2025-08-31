import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ContatoPage() {
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
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.1)',
              border: darkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.2)',
              color: darkMode ? 'white' : 'white',
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
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Acre</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Alagoas</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Amapá</a>
              <Link to="/amazonas" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Amazonas</Link>
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
          <li><Link to="/lugares" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Lugares</Link></li>
          <li><Link to="/mapa" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Mapa</Link></li>
          <li><a href="#" onClick={(e) => {e.preventDefault(); if (!localStorage.getItem('isLoggedIn')) setCurrentPage('login'); else window.location.href='/adicionar-locais.html'; document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Adicionar Local</a></li>
          <li><Link to="/perfil" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Meu Perfil</Link></li>
          <li><Link to="/sobre" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Sobre</Link></li>
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
            Tem dúvidas ou sugestões?<br />
            <span style={{ color: '#667eea', fontWeight: '500' }}>Estamos aqui para ajudar você</span>
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
            marginBottom: '4rem',
            textAlign: 'center',
            fontWeight: '700'
          }}>Informações de Contato</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem',
            marginBottom: '4rem'
          }}>
            <div style={{
              background: '#000',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              border: '3px solid #667eea'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#667eea', fontWeight: '600' }}>E-mail</h3>
              <p style={{ fontSize: '1rem', opacity: 0.8, color: 'white' }}>contato@gadys.com.br</p>
            </div>
            
            <div style={{
              background: '#000',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              border: '3px solid #764ba2'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#764ba2', fontWeight: '600' }}>Telefone</h3>
              <p style={{ fontSize: '1rem', opacity: 0.8, color: 'white' }}>(11) 99999-9999</p>
            </div>
            
            <div style={{
              background: '#000',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              border: '3px solid #f093fb'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#f093fb', fontWeight: '600' }}>Endereço</h3>
              <p style={{ fontSize: '1rem', opacity: 0.8, color: 'white' }}>São Paulo - SP<br />Brasil</p>
            </div>
          </div>
          
          <h3 style={{ 
            fontSize: '2rem', 
            marginBottom: '2rem',
            textAlign: 'center',
            fontWeight: '600'
          }}>Redes Sociais</h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { name: 'Instagram', handle: '@gadys_brasil', color: '#E4405F' },
              { name: 'Facebook', handle: '/gadys.brasil', color: '#1877F2' },
              { name: 'Twitter', handle: '@gadys_br', color: '#1DA1F2' },
              { name: 'YouTube', handle: '/gadys-brasil', color: '#FF0000' }
            ].map((social, index) => (
              <div key={index} style={{ 
                textAlign: 'center',
                transition: 'all 0.3s'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: social.color,
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  boxShadow: `0 10px 30px ${social.color}40`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  color: 'white'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.boxShadow = `0 15px 40px ${social.color}60`
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = `0 10px 30px ${social.color}40`
                }}
                >
                  {social.name === 'Instagram' && '📷'}
                  {social.name === 'Facebook' && '👥'}
                  {social.name === 'Twitter' && '🐦'}
                  {social.name === 'YouTube' && '📺'}
                </div>
                <h4 style={{ 
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}>{social.name}</h4>
                <p style={{ 
                  opacity: 0.7,
                  fontSize: '0.9rem',
                  color: social.color
                }}>{social.handle}</p>
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
          boxShadow: '0 30px 60px rgba(102, 126, 234, 0.1)',
          maxWidth: '600px',
          margin: '0 auto 6rem'
        }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '3rem', 
            textAlign: 'center',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-2px',
            lineHeight: '1.1'
          }}>Formulário de Contato</h2>
          
          <form style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#667eea'
              }}>Nome:</label>
              <input type="text" required style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '15px',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                color: darkMode ? 'white' : '#333',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid #667eea'
                e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.4)'
                e.target.style.transform = 'scale(1.02)'
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid rgba(102, 126, 234, 0.3)'
                e.target.style.boxShadow = 'none'
                e.target.style.transform = 'scale(1)'
              }} />
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#667eea'
              }}>Email:</label>
              <input type="email" required style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '15px',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                color: darkMode ? 'white' : '#333',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid #764ba2'
                e.target.style.boxShadow = '0 0 20px rgba(118, 75, 162, 0.4)'
                e.target.style.transform = 'scale(1.02)'
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid rgba(102, 126, 234, 0.3)'
                e.target.style.boxShadow = 'none'
                e.target.style.transform = 'scale(1)'
              }} />
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#667eea'
              }}>Mensagem:</label>
              <textarea rows="5" required style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '15px',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                color: darkMode ? 'white' : '#333',
                fontSize: '1rem',
                resize: 'vertical',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid #f093fb'
                e.target.style.boxShadow = '0 0 20px rgba(240, 147, 251, 0.4)'
                e.target.style.transform = 'scale(1.02)'
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid rgba(102, 126, 234, 0.3)'
                e.target.style.boxShadow = 'none'
                e.target.style.transform = 'scale(1)'
              }} />
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button type="submit" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                transform: 'scale(1)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)'
                e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.5)'
                e.target.style.background = 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)'
                e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}>
                Enviar Mensagem
              </button>
            </div>
          </form>
        </section>

        <section style={{
          textAlign: 'center',
          padding: '4rem 0 6rem'
        }}>
          <Link 
            to="/"
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
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Voltar ao Início
          </Link>
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