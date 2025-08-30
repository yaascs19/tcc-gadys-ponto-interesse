import { useState, useEffect } from 'react'

function Amazonas() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { src: '/teatro-amazonas1.jpeg', alt: 'Teatro Amazonas' },
    { src: '/floresta.jpeg', alt: 'Floresta Amazônica' },
    { src: '/ama1.jpg', alt: 'Encontro das Águas' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [slides.length])

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
      <header style={{
        background: darkMode ? '#0d1117' : '#1a237e',
        color: 'white',
        padding: '1rem 0'
      }}>
        <nav style={{
          width: '100%',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <img 
            src="/logo.png" 
            alt="GADYS" 
            style={{
              height: '40px',
              background: 'lightblue',
              borderRadius: '50%',
              padding: '8px'
            }}
          />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section style={{
          position: 'relative',
          overflow: 'hidden',
          height: '80vh',
          borderRadius: '0 0 30px 30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: index === currentSlide ? 1 : 0,
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 1
              }}
            >
              <img 
                src={slide.src} 
                alt={slide.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.8) contrast(1.1)'
                }}
              />
            </div>
          ))}
          
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, rgba(34, 139, 34, 0.7), rgba(0, 100, 0, 0.5))',
            zIndex: 2
          }} />
          
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 4,
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <span style={{
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 500
            }}>
              🌿 Amazônia Brasileira
            </span>
          </div>
          
          <div style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
              background: 'linear-gradient(45deg, #fff, #e8f5e8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Amazonas
            </h1>
            <p style={{
              fontSize: '1.5rem',
              textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
              marginBottom: '2rem',
              color: 'white'
            }}>
              O coração da Amazônia brasileira
            </p>
          </div>
        </section>

        <section style={{
          padding: '5rem 0',
          background: darkMode ? '#0d1117' : '#f8f9fa',
          flex: 1
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <div style={{
              background: darkMode ? '#21262d' : 'white',
              padding: '2rem',
              borderRadius: '15px',
              marginBottom: '3rem',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
              color: darkMode ? '#e0e0e0' : '#333'
            }}>
              <h2 style={{
                color: '#228b22',
                marginBottom: '1rem',
                fontSize: '2rem'
              }}>
                Sobre o Amazonas
              </h2>
              <p style={{
                color: darkMode ? '#8b949e' : '#555',
                lineHeight: 1.8,
                marginBottom: '1rem'
              }}>
                O Amazonas é o maior estado do Brasil, localizado na região Norte do país. Com uma área de mais de 1,5 milhão de km², abriga a maior parte da Floresta Amazônica brasileira e é conhecido mundialmente por sua biodiversidade única.
              </p>
              <p style={{
                color: darkMode ? '#8b949e' : '#555',
                lineHeight: 1.8,
                marginBottom: '1rem'
              }}>
                Manaus, a capital, é um importante centro econômico e turístico da região, famosa pelo Teatro Amazonas e pelo fenômeno natural do Encontro das Águas. O estado possui uma rica cultura indígena e é lar de diversas comunidades tradicionais.
              </p>
              <p style={{
                color: darkMode ? '#8b949e' : '#555',
                lineHeight: 1.8
              }}>
                Com mais de 4 milhões de habitantes, o Amazonas é fundamental para o equilíbrio ecológico mundial e oferece experiências únicas de ecoturismo e turismo cultural.
              </p>
            </div>
          </div>
        </section>
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

export default Amazonas