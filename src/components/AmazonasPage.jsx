import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function AmazonasPage() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [secaoAtiva, setSecaoAtiva] = useState('lugares')
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  
  const atrativos = {
    monumentos: [
      { nome: 'Teatro Amazonas', desc: 'Majestoso teatro do período áureo da borracha', img: '/teatro-amazonas1.jpeg' },
      { nome: 'Forte de São José', desc: 'Fortaleza histórica que marca o início da colonização', img: '/forte.jpeg' },
      { nome: 'Palácio da Justiça', desc: 'Edifício histórico com arquitetura colonial', img: '/jus.jpeg' }
    ],
    natureza: [
      { nome: 'Encontro das Águas', desc: 'Fenômeno natural dos rios Negro e Solimões', img: '/encontro.jpeg' },
      { nome: 'Parque Nacional do Jaú', desc: 'Maior parque nacional do Brasil', img: '/jau.jpeg' },
      { nome: 'Reserva Mamirauá', desc: 'Reserva de desenvolvimento sustentável', img: '/reserva.jpeg' }
    ],
    cultura: [
      { nome: 'Festival de Parintins', desc: 'Maior festival folclórico do Norte', img: '/festival.jpeg' },
      { nome: 'Artesanato Indígena', desc: 'Arte tradicional dos povos amazônicos', img: '/art.jpeg' },
      { nome: 'Rituais Xamânicos', desc: 'Tradições espirituais milenares', img: '/rit.jpeg' }
    ],
    gastronomia: [
      { nome: 'Tacaçá', desc: 'Prato típico com tucumã e camarão seco', img: '/taca.jpeg' },
      { nome: 'Pirarucu', desc: 'Peixe gigante da Amazônia preparado tradicionalmente', img: '/pira.jpeg' },
      { nome: 'Cupuaçu', desc: 'Fruta exótica com sabor único', img: '/cupu.jpeg' }
    ]
  }

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
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none', padding: '0.5rem 1rem', cursor: 'not-allowed' }}>Amazonas (atual)</a></li>
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
            Amazonas
          </h1>
          
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.8,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Coração da Floresta Amazônica<br />
            <span style={{ color: '#4caf50', fontWeight: '500' }}>O pulmão verde do mundo</span>
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
            marginBottom: '3rem', 
            textAlign: 'center',
            fontWeight: '700'
          }}>O Estado do Amazonas</h2>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: 1.8, 
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            O Amazonas é o maior estado brasileiro, abrigando a maior floresta tropical do mundo. 
            Com uma biodiversidade incomparável, rios majestosos e culturas indígenas milenares, 
            representa um dos ecossistemas mais importantes do planeta. Manaus, sua capital, 
            é o portal de entrada para aventuras inesquecíveis na selva amazônica.
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
          }}>Explore por Categoria</h2>
          
          {/* Seletor de Seção */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              { key: 'lugares', name: 'Lugares para Visitar', desc: 'Destinos físicos para explorar' },
              { key: 'curiosidades', name: 'Curiosidades', desc: 'Cultura e gastronomia local' }
            ].map((secao) => (
              <button
                key={secao.key}
                onClick={() => {
                  setSecaoAtiva(secao.key)
                  setCategoriaAtiva('todos')
                }}
                style={{
                  background: secaoAtiva === secao.key 
                    ? 'linear-gradient(135deg, #2d5016, #4a7c59)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: secaoAtiva === secao.key ? '2px solid #4a7c59' : '2px solid transparent',
                  padding: '1.5rem 2.5rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  minWidth: '200px'
                }}
              >
                <div>{secao.name}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.5rem' }}>{secao.desc}</div>
              </button>
            ))}
          </div>

          {/* Categorias da Seção Ativa */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '4rem'
          }}>
            {(secaoAtiva === 'lugares' ? [
              { key: 'monumentos', name: '🏛️ Monumentos', desc: 'Patrimônios históricos' },
              { key: 'natureza', name: '🌿 Natureza', desc: 'Parques e reservas' }
            ] : [
              { key: 'cultura', name: '🎭 Cultura', desc: 'Tradições e festivais' },
              { key: 'gastronomia', name: '🍽️ Gastronomia', desc: 'Sabores amazônicos' }
            ]).map((categoria) => (
              <div key={categoria.key} style={{
                background: darkMode ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(139, 195, 74, 0.1) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(232, 245, 232, 0.7) 100%)',
                padding: '2rem',
                borderRadius: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                minWidth: '200px',
                maxWidth: '250px'
              }}
              onClick={() => {
                if (categoria.key === 'monumentos') {
                  window.location.href = '/amazonas/monumentos'
                } else if (categoria.key === 'natureza') {
                  window.location.href = '/amazonas/natureza'
                } else if (categoria.key === 'cultura') {
                  window.location.href = '/amazonas/cultura'
                } else {
                  setCategoriaAtiva(categoria.key)
                }
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(76, 175, 80, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                  color: '#4caf50'
                }}>{categoria.name}</h3>
                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.8,
                  lineHeight: 1.4
                }}>{categoria.desc}</p>
              </div>
            ))}
          </div>
          
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: 1.8,
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            O Amazonas abriga mais de 40.000 espécies de plantas, 3.000 espécies de peixes, 
            1.300 espécies de aves e 430 espécies de mamíferos. Explore cada categoria para 
            descobrir as riquezas únicas desta região extraordinária.
          </p>
        </section>

        {categoriaAtiva !== 'todos' && atrativos[categoriaAtiva] && (
          <section style={{
            background: darkMode ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(139, 195, 74, 0.05) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)',
            padding: '5rem 4rem',
            borderRadius: '30px',
            marginBottom: '6rem',
            border: '1px solid rgba(76, 175, 80, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '3rem'
            }}>
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700'
              }}>
                {secaoAtiva === 'lugares' ? 'Lugares para Visitar' : 'Curiosidades'} - 
                {categoriaAtiva === 'monumentos' && '🏛️ Monumentos'}
                {categoriaAtiva === 'natureza' && '🌿 Natureza'}
                {categoriaAtiva === 'cultura' && '🎭 Cultura'}
                {categoriaAtiva === 'gastronomia' && '🍽️ Gastronomia'}
              </h2>
              <button
                onClick={() => setCategoriaAtiva('todos')}
                style={{
                  background: 'transparent',
                  border: '2px solid #4caf50',
                  color: '#4caf50',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#4caf50'
                  e.target.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.color = '#4caf50'
                }}
              >
                Ver Todas
              </button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {atrativos[categoriaAtiva]?.map((atrativo, index) => (
                <div key={index} style={{
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
                }}>
                  <img 
                    src={atrativo.img}
                    alt={atrativo.nome}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.4rem',
                      marginBottom: '1rem',
                      color: '#4caf50',
                      fontWeight: '600'
                    }}>{atrativo.nome}</h3>
                    <p style={{
                      opacity: 0.8,
                      lineHeight: 1.6,
                      marginBottom: '1.5rem'
                    }}>{atrativo.desc}</p>
                    <button style={{
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
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(1.05)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1)'
                    }}>
                      Explorar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '4rem', 
            textAlign: 'center',
            fontWeight: '700'
          }}>Principais Atrativos</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {[
              { title: 'Encontro das Águas', desc: 'Fenômeno natural onde os rios Negro e Solimões se encontram', color: '#4caf50' },
              { title: 'Teatro Amazonas', desc: 'Ópera histórica no coração de Manaus', color: '#8bc34a' },
              { title: 'Floresta Amazônica', desc: 'A maior floresta tropical do mundo', color: '#66bb6a' },
              { title: 'Comunidades Ribeirinhas', desc: 'Cultura tradicional amazônica preservada', color: '#81c784' }
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  background: darkMode ? 'linear-gradient(135deg, rgba(13, 40, 24, 0.8) 0%, rgba(26, 77, 46, 0.6) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(232, 245, 232, 0.7) 100%)',
                  padding: '3rem 2rem',
                  borderRadius: '25px',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(76, 175, 80, 0.2)',
                  boxShadow: '0 20px 40px rgba(76, 175, 80, 0.1)',
                  transform: 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 40px 80px rgba(76, 175, 80, 0.2)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(76, 175, 80, 0.1)'
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
                  fontSize: '1.1rem'
                }}>{item.desc}</p>
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
              Voltar ao Início
            </Link>
            
            <Link 
              to="/lugares"
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
              Explorar Lugares
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

export default AmazonasPage