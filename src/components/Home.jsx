import { useEffect } from 'react'

function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/login.html'
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: 'linear-gradient(135deg, #1a237e, #3f51b5)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        padding: '3rem'
      }}>
        <img 
          src="/logo.png" 
          alt="GADYS" 
          style={{
            height: '80px',
            marginBottom: '2rem',
            background: 'lightblue',
            borderRadius: '50%',
            padding: '8px'
          }}
        />
        
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Bem-vindo ao GADYS
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '3rem',
          opacity: 0.9
        }}>
          Descubra os pontos de interesse mais incríveis do Brasil. Explore monumentos, natureza, gastronomia e cultura de cada estado.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '3rem',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap'
        }}>
          <a 
            href="/login.html" 
            style={{
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '25px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textDecoration: 'none',
              display: 'inline-block',
              background: 'white',
              color: '#1a237e'
            }}
          >
            Fazer Login
          </a>
          
          <a 
            href="/amazonas.html" 
            style={{
              padding: '1rem 2rem',
              border: '2px solid white',
              borderRadius: '25px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textDecoration: 'none',
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              color: 'white'
            }}
          >
            Pular
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home