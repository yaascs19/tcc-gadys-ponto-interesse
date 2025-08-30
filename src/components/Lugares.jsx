import { useState, useEffect } from 'react'

function Lugares() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  const setRating = (localId, rating) => {
    const userName = localStorage.getItem('userName')
    if (!userName) {
      alert('Você precisa estar logado para avaliar!')
      return
    }
    
    let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {}
    let userRatings = JSON.parse(localStorage.getItem('userRatings')) || {}
    const userKey = `${userName}_${localId}`
    
    if (!avaliacoes[localId]) {
      avaliacoes[localId] = []
    }
    
    if (!userRatings[userKey]) {
      avaliacoes[localId].push(rating)
    } else {
      const oldRating = userRatings[userKey]
      const index = avaliacoes[localId].indexOf(oldRating)
      if (index > -1) {
        avaliacoes[localId][index] = rating
      }
    }
    
    userRatings[userKey] = rating
    
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes))
    localStorage.setItem('userRatings', JSON.stringify(userRatings))
    
    updateRatingDisplay(localId)
    updateUserStars(localId, rating)
  }

  const updateRatingDisplay = (localId) => {
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {}
    const localAvaliacoes = avaliacoes[localId] || []
    
    if (localAvaliacoes.length > 0) {
      const media = localAvaliacoes.reduce((sum, rating) => sum + rating, 0) / localAvaliacoes.length
      const ratingElement = document.getElementById(`rating-${localId}`)
      const starsElement = document.getElementById(`stars-${localId}`)
      const countElement = document.getElementById(`count-${localId}`)
      
      if (ratingElement) ratingElement.textContent = media.toFixed(1)
      if (starsElement) starsElement.textContent = getStarsDisplay(media)
      if (countElement) countElement.textContent = `(${localAvaliacoes.length})`
    }
  }

  const updateUserStars = (localId, rating) => {
    const stars = document.querySelectorAll(`[onclick*="'${localId}'"]`)
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active')
        star.textContent = '★'
      } else {
        star.classList.remove('active')
        star.textContent = '☆'
      }
    })
  }

  const getStarsDisplay = (rating) => {
    const fullStars = Math.floor(rating)
    let stars = ''
    for (let i = 0; i < fullStars; i++) {
      stars += '★'
    }
    while (stars.length < 5) {
      stars += '☆'
    }
    return stars
  }

  const lugares = [
    {
      id: 'cristo',
      nome: 'Cristo Redentor',
      cidade: 'Rio de Janeiro - RJ',
      descricao: 'Uma das Sete Maravilhas do Mundo Moderno',
      imagem: '/cristo2.jpg',
      link: '/cristo-redentor.html'
    },
    {
      id: 'pao',
      nome: 'Pão de Açúcar',
      cidade: 'Rio de Janeiro - RJ',
      descricao: 'Cartão postal do Rio de Janeiro',
      imagem: '/pao.jpg',
      link: '/pao-acucar.html'
    },
    {
      id: 'cataratas',
      nome: 'Cataratas do Iguaçu',
      cidade: 'Foz do Iguaçu - PR',
      descricao: 'Uma das maiores quedas d\'água do mundo',
      imagem: '/cata.jpg',
      link: '/cataratas-iguacu.html'
    },
    {
      id: 'pelourinho',
      nome: 'Pelourinho',
      cidade: 'Salvador - BA',
      descricao: 'Centro histórico de Salvador',
      imagem: '/pelo.jpg',
      link: '/pelourinho.html'
    },
    {
      id: 'noronha',
      nome: 'Fernando de Noronha',
      cidade: 'Pernambuco - PE',
      descricao: 'Paraíso ecológico brasileiro',
      imagem: '/fer.jpg',
      link: '/fernando-noronha.html'
    },
    {
      id: 'pantanal',
      nome: 'Pantanal',
      cidade: 'Mato Grosso - MT',
      descricao: 'Maior planície alagável do mundo',
      imagem: '/pan.jpg',
      link: '/pantanal.html'
    }
  ]

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
            style={{ height: '40px' }}
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
          background: 'linear-gradient(rgba(26, 35, 126, 0.8), rgba(26, 35, 126, 0.8)), url("https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '6rem 2rem 4rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            fontWeight: 700
          }}>
            Lugares Mais Visitados do Brasil
          </h1>
          <p style={{
            fontSize: '1.3rem',
            opacity: 0.9
          }}>
            Descubra os destinos mais procurados pelos turistas
          </p>
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
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {lugares.map((lugar) => (
                <div 
                  key={lugar.id}
                  style={{
                    background: darkMode ? '#21262d' : 'white',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img 
                    src={lugar.imagem} 
                    alt={lugar.nome}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      marginBottom: '0.5rem',
                      color: darkMode ? '#f0f6fc' : '#2c3e50'
                    }}>
                      {lugar.nome}
                    </h3>
                    <p style={{
                      color: darkMode ? '#8b949e' : '#7f8c8d',
                      fontSize: '0.9rem',
                      marginBottom: '1rem',
                      fontWeight: 500
                    }}>
                      {lugar.cidade}
                    </p>
                    <p style={{
                      color: darkMode ? '#8b949e' : '#555',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem'
                    }}>
                      {lugar.descricao}
                    </p>
                    
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e0e0e0'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{
                          color: '#f39c12',
                          fontSize: '1.2rem'
                        }} id={`stars-${lugar.id}`}>
                          ☆☆☆☆☆
                        </span>
                        <span style={{
                          fontWeight: 'bold',
                          color: '#f39c12'
                        }} id={`rating-${lugar.id}`}>
                          0.0
                        </span>
                        <span style={{
                          color: '#7f8c8d',
                          fontSize: '0.9rem'
                        }} id={`count-${lugar.id}`}>
                          (0)
                        </span>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.5rem'
                      }}>
                        <span>Avaliar:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            style={{
                              fontSize: '1.5rem',
                              cursor: 'pointer',
                              color: '#ddd',
                              transition: 'color 0.3s'
                            }}
                            onClick={() => setRating(lugar.id, star)}
                            onMouseOver={(e) => e.target.style.color = '#f39c12'}
                            onMouseOut={(e) => e.target.style.color = '#ddd'}
                          >
                            ☆
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      style={{
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '0.8rem 2rem',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: 'background 0.3s',
                        marginTop: '1rem'
                      }}
                      onClick={() => window.location.href = lugar.link}
                      onMouseOver={(e) => e.target.style.background = '#c0392b'}
                      onMouseOut={(e) => e.target.style.background = '#e74c3c'}
                    >
                      Visitar
                    </button>
                  </div>
                </div>
              ))}
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

export default Lugares