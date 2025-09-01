import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function MapaPageFuncional() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [distancia, setDistancia] = useState(3000)
  const [userLocation, setUserLocation] = useState(null)
  const [mapSrc, setMapSrc] = useState('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15776119.828125!2d-54.0625!3d-14.235004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c59c7ebcc28cf%3A295a1506f2293e63!2sBrasil!5e0!3m2!1spt-BR!2sbr!4v1704067200000!5m2!1spt-BR!2sbr')

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setUserLocation({ lat, lng })
          
          // Atualizar o mapa para mostrar a localização do usuário
          const newMapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1spt-BR!2sbr!4v1704067200000!5m2!1spt-BR!2sbr`
          setMapSrc(newMapSrc)
          
          alert(`Localização encontrada: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
        },
        (error) => {
          alert('Erro ao obter localização: ' + error.message)
        }
      )
    } else {
      alert('Geolocalização não é suportada neste navegador.')
    }
  }

  const lugares = [
    { nome: 'Cristo Redentor', x: '75%', y: '65%', cor: '#e74c3c', cidade: 'Rio de Janeiro - RJ' },
    { nome: 'Pão de Açúcar', x: '76%', y: '66%', cor: '#3498db', cidade: 'Rio de Janeiro - RJ' },
    { nome: 'Cataratas do Iguaçu', x: '68%', y: '75%', cor: '#2ecc71', cidade: 'Foz do Iguaçu - PR' },
    { nome: 'Pelourinho', x: '82%', y: '45%', cor: '#f39c12', cidade: 'Salvador - BA' },
    { nome: 'Fernando de Noronha', x: '88%', y: '25%', cor: '#9b59b6', cidade: 'Pernambuco - PE' },
    { nome: 'Pantanal', x: '58%', y: '60%', cor: '#1abc9c', cidade: 'Mato Grosso - MT' },
    { nome: 'Teatro Amazonas', x: '35%', y: '25%', cor: '#4caf50', cidade: 'Manaus - AM' },
    { nome: 'Encontro das Águas', x: '36%', y: '26%', cor: '#8bc34a', cidade: 'Manaus - AM' },
    { nome: 'Parque Nacional do Jaú', x: '32%', y: '20%', cor: '#cddc39', cidade: 'Novo Airão - AM' },
    { nome: 'Reserva Mamirauá', x: '40%', y: '22%', cor: '#66bb6a', cidade: 'Tefé - AM' },
    { nome: 'Floresta Amazônica', x: '30%', y: '15%', cor: '#2e7d32', cidade: 'Amazonas - AM' },
    { nome: 'Rio Amazonas', x: '45%', y: '25%', cor: '#1976d2', cidade: 'Amazonas - AM' }
  ]

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
      @keyframes pulse {
        0% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
        100% { transform: translate(-50%, -50%) scale(1); }
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
          <li><Link to="/lugares" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Lugares</Link></li>
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none', padding: '0.5rem 1rem', cursor: 'not-allowed' }}>Mapa (atual)</a></li>
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
            Mapa Interativo
          </h1>
          
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.8,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Explore pontos turísticos pelo Brasil<br />
            <span style={{ color: '#667eea', fontWeight: '500' }}>Descubra destinos incríveis em um mapa interativo</span>
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
          }}>Mapa do Brasil</h2>
          
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '1.5rem',
                borderRadius: '15px'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: '#667eea'
                }}>Categoria:</label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  background: darkMode ? '#333' : 'white',
                  color: darkMode ? 'white' : '#333',
                  fontSize: '1rem'
                }}>
                  <option>Todas as categorias</option>
                  <option>🏛️ Monumentos</option>
                  <option>🌳 Natureza</option>
                  <option>🏖️ Praias</option>
                  <option>🏢 Cultura</option>
                </select>
              </div>
              
              <div style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '1.5rem',
                borderRadius: '15px'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: '#667eea'
                }}>Preço:</label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  background: darkMode ? '#333' : 'white',
                  color: darkMode ? 'white' : '#333',
                  fontSize: '1rem'
                }}>
                  <option>Todos os preços</option>
                  <option>🆓 Gratuito</option>
                  <option>💵 Pago</option>
                </select>
              </div>
              
              <div style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '1.5rem',
                borderRadius: '15px'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: '#667eea'
                }}>Distância máxima:</label>
                <input 
                  type="range" 
                  min="1" 
                  max="3000" 
                  value={distancia}
                  onChange={(e) => setDistancia(e.target.value)}
                  style={{
                    width: '100%',
                    marginBottom: '0.5rem'
                  }}
                />
                <div style={{ textAlign: 'center', fontSize: '0.9rem', opacity: 0.7 }}>{distancia}km</div>
              </div>
              
              <div style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '1.5rem',
                borderRadius: '15px'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: '#667eea'
                }}>Localização:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button 
                    onClick={getMyLocation}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(102, 126, 234, 0.3)',
                      background: '#667eea',
                      color: 'white',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                    📍 Minha Localização
                  </button>
                  <button 
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(102, 126, 234, 0.3)',
                      background: '#764ba2',
                      color: 'white',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                    Simular Local
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 3rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}>
                Aplicar Filtros
              </button>
            </div>
          
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '1rem',
              borderRadius: '20px',
              minHeight: '600px',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              position: 'relative'
            }}>
              <iframe
                src={mapSrc}
                width="100%"
                height="580"
                style={{
                  border: 0,
                  borderRadius: '15px'
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa do Brasil"
              />
              
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                right: '1rem',
                bottom: '1rem',
                pointerEvents: 'none',
                borderRadius: '15px'
              }}>
                {lugares.map((lugar, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      left: lugar.x,
                      top: lugar.y,
                      width: '20px',
                      height: '20px',
                      background: lugar.cor,
                      border: '3px solid white',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 100,
                      transition: 'all 0.3s'
                    }}
                    title={`${lugar.nome} - ${lugar.cidade}`}
                  />
                ))}
                
                {userLocation && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: '25px',
                      height: '25px',
                      background: '#ff4444',
                      border: '4px solid white',
                      borderRadius: '50%',
                      boxShadow: '0 0 20px rgba(255, 68, 68, 0.6)',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 200,
                      animation: 'pulse 2s infinite'
                    }}
                    title="Sua Localização"
                  />
                )}
              </div>
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
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '4rem',
            textAlign: 'center',
            fontWeight: '700'
          }}>Pontos Populares</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { nome: 'Cristo Redentor', cidade: 'Rio de Janeiro - RJ', categoria: 'Monumento' },
              { nome: 'Cataratas do Iguaçu', cidade: 'Foz do Iguaçu - PR', categoria: 'Natureza' },
              { nome: 'Pelourinho', cidade: 'Salvador - BA', categoria: 'Histórico' },
              { nome: 'Teatro Amazonas', cidade: 'Manaus - AM', categoria: 'Cultural' },
              { nome: 'Pão de Açúcar', cidade: 'Rio de Janeiro - RJ', categoria: 'Natureza' },
              { nome: 'Encontro das Águas', cidade: 'Manaus - AM', categoria: 'Natureza' }
            ].map((ponto, index) => (
              <div key={index} style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '2rem',
                borderRadius: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#667eea'
                }}>{ponto.nome}</h3>
                <p style={{ 
                  opacity: 0.7,
                  fontSize: '1rem',
                  marginBottom: '0.5rem'
                }}>{ponto.cidade}</p>
                <span style={{
                  background: '#667eea',
                  color: 'white',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>{ponto.categoria}</span>
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
                textDecoration: 'none'
              }}
            >
              Voltar ao Início
            </Link>
            
            <Link 
              to="/lugares"
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
              Ver Lugares
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

export default MapaPageFuncional