import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function SaoPaulo() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [secaoAtiva, setSecaoAtiva] = useState('lugares')
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  
  const atrativos = {
    monumentos: [
      { nome: 'Teatro Municipal', desc: 'Majestoso teatro no centro da cidade', img: '/teatro-municipal-sp.jpg' },
      { nome: 'Catedral da Sé', desc: 'Imponente catedral gótica', img: '/catedral-se.jpg' },
      { nome: 'Edifício Copan', desc: 'Ícone da arquitetura moderna', img: '/copan.jpg' }
    ],
    natureza: [
      { nome: 'Parque Ibirapuera', desc: 'O Central Park paulistano', img: '/ibirapuera.jpg' },
      { nome: 'Jardim Botânico', desc: 'Oasis verde na metrópole', img: '/jardim-botanico-sp.jpg' },
      { nome: 'Parque Villa-Lobos', desc: 'Espaço de lazer e esportes', img: '/villa-lobos.jpg' }
    ],
    cultura: [
      { nome: 'MASP', desc: 'Museu de Arte mais importante do país', img: '/masp.jpg' },
      { nome: 'Pinacoteca', desc: 'Arte brasileira em destaque', img: '/pinacoteca.jpg' },
      { nome: 'Beco do Batman', desc: 'Arte urbana e grafite', img: '/beco-batman.jpg' }
    ],
    gastronomia: [
      { nome: 'Mercadão', desc: 'Tradicional mercado municipal', img: '/mercadao.jpg' },
      { nome: 'Liberdade', desc: 'Culinária asiática autêntica', img: '/liberdade.jpg' },
      { nome: 'Vila Madalena', desc: 'Bares e restaurantes badalados', img: '/vila-madalena.jpg' }
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
      background: darkMode ? 'linear-gradient(135deg, #2d0a0a 0%, #4d1414 50%, #5d1a1a 100%)' : 'linear-gradient(135deg, #ffe8e8 0%, #ffcccb 100%)',
      color: darkMode ? '#ffe8e8' : '#8B0000',
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
        background: darkMode ? 'radial-gradient(circle at 20% 80%, rgba(220, 20, 60, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 0, 0, 0.15) 0%, transparent 50%)' : 'radial-gradient(circle at 20% 80%, rgba(220, 20, 60, 0.1) 0%, transparent 50%)',
        zIndex: 1
      }} />

      <header style={{
        background: darkMode ? 'rgba(45, 10, 10, 0.8)' : '#8B0000',
        backdropFilter: 'blur(30px)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(220, 20, 60, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="/logo.png" 
            alt="GADYS" 
            style={{
              height: '45px',
              background: 'linear-gradient(135deg, #DC143C, #B22222)',
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
            background: '#8B0000',
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
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none', padding: '0.5rem 1rem', cursor: 'not-allowed' }}>São Paulo (atual)</a></li>
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
          background: darkMode ? 'linear-gradient(135deg, rgba(220, 20, 60, 0.1) 0%, rgba(139, 0, 0, 0.05) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
          borderRadius: '0 0 50px 50px',
          marginBottom: '6rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #DC143C 0%, #B22222 50%, #8B0000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem',
            letterSpacing: '-3px',
            lineHeight: '1.1'
          }}>
            São Paulo
          </h1>
          
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.8,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            A Maior Metrópole da América do Sul<br />
            <span style={{ color: '#DC143C', fontWeight: '500' }}>Centro econômico e cultural do Brasil</span>
          </p>
        </section>

        <section style={{
          background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.1) 0%, rgba(139, 0, 0, 0.1) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: '1px solid rgba(220, 20, 60, 0.2)',
          boxShadow: '0 30px 60px rgba(220, 20, 60, 0.1)'
        }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '3rem', 
            textAlign: 'center',
            fontWeight: '700'
          }}>O Estado de São Paulo</h2>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: 1.8, 
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            São Paulo é o estado mais populoso e economicamente desenvolvido do Brasil. 
            Com uma rica diversidade cultural, gastronomia mundialmente reconhecida e uma 
            vida urbana pulsante, representa o coração financeiro da América Latina. 
            A capital paulista é uma metrópole global que nunca dorme.
          </p>
        </section>

        <section style={{
          background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.1) 0%, rgba(139, 0, 0, 0.1) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: '1px solid rgba(220, 20, 60, 0.2)',
          boxShadow: '0 30px 60px rgba(220, 20, 60, 0.1)'
        }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '4rem',
            textAlign: 'center',
            fontWeight: '700'
          }}>Explore por Categoria</h2>
          
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
                    ? 'linear-gradient(135deg, #8B0000, #B22222)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: secaoAtiva === secao.key ? '2px solid #B22222' : '2px solid transparent',
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

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '4rem'
          }}>
            {(secaoAtiva === 'lugares' ? [
              { key: 'monumentos', name: '🏛️ Monumentos', desc: 'Patrimônios históricos' },
              { key: 'natureza', name: '🌳 Natureza', desc: 'Parques e áreas verdes' }
            ] : [
              { key: 'cultura', name: '🎭 Cultura', desc: 'Museus e arte' },
              { key: 'gastronomia', name: '🍽️ Gastronomia', desc: 'Sabores paulistanos' }
            ]).map((categoria) => (
              <div key={categoria.key} style={{
                background: darkMode ? 'linear-gradient(135deg, rgba(220, 20, 60, 0.2) 0%, rgba(139, 0, 0, 0.1) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255, 232, 232, 0.7) 100%)',
                padding: '2rem',
                borderRadius: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '1px solid rgba(220, 20, 60, 0.3)',
                minWidth: '200px',
                maxWidth: '250px'
              }}
              onClick={() => setCategoriaAtiva(categoria.key)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 20, 60, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                  color: '#DC143C'
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
            São Paulo abriga mais de 12 milhões de habitantes na capital e 46 milhões no estado. 
            É o maior centro financeiro da América Latina e concentra as principais empresas 
            multinacionais. Explore cada categoria para descobrir as riquezas desta metrópole única.
          </p>
        </section>

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
              { title: 'Avenida Paulista', desc: 'Principal avenida da cidade e centro financeiro', color: '#DC143C' },
              { title: 'Centro Histórico', desc: 'Patrimônio arquitetônico e cultural', color: '#B22222' },
              { title: 'Parque Ibirapuera', desc: 'O Central Park paulistano', color: '#CD5C5C' },
              { title: 'Gastronomia Mundial', desc: 'Culinária de todos os continentes', color: '#F08080' }
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  background: darkMode ? 'linear-gradient(135deg, rgba(45, 10, 10, 0.8) 0%, rgba(77, 20, 20, 0.6) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255, 232, 232, 0.7) 100%)',
                  padding: '3rem 2rem',
                  borderRadius: '25px',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(220, 20, 60, 0.2)',
                  boxShadow: '0 20px 40px rgba(220, 20, 60, 0.1)',
                  transform: 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 40px 80px rgba(220, 20, 60, 0.2)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 20, 60, 0.1)'
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
                background: 'linear-gradient(135deg, #DC143C 0%, #B22222 100%)',
                color: 'white',
                border: 'none',
                padding: '1.5rem 3rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 15px 35px rgba(220, 20, 60, 0.4)',
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
                color: darkMode ? '#ffe8e8' : '#8B0000',
                border: darkMode ? '2px solid rgba(220, 20, 60, 0.5)' : '2px solid rgba(220, 20, 60, 0.7)',
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
        background: darkMode ? 'rgba(45, 10, 10, 0.9)' : 'rgba(139, 0, 0, 0.9)',
        textAlign: 'center',
        padding: '3rem',
        borderTop: '1px solid rgba(220, 20, 60, 0.3)',
        position: 'relative',
        zIndex: 10
      }}>
        <p style={{ opacity: 0.7, fontSize: '1rem', color: 'white' }}>&copy; 2025 GADYS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default SaoPaulo