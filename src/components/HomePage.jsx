import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [isLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const slides = document.querySelectorAll('.carousel-slide')
      let currentSlide = 0
      let autoSlideInterval

      const showSlide = (index) => {
        if (slides.length === 0) return
        
        slides.forEach(slide => slide.classList.remove('active'))
        document.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('active'))
        
        if (slides[index]) {
          slides[index].classList.add('active')
          document.querySelectorAll(`[data-slide="${index}"]`).forEach(dot => {
            dot.classList.add('active')
          })
        }
      }

      const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
          currentSlide = (currentSlide + 1) % slides.length
          showSlide(currentSlide)
        }, 2000)
      }

      const stopAutoSlide = () => {
        if (autoSlideInterval) {
          clearInterval(autoSlideInterval)
        }
      }

      document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
          e.preventDefault()
          stopAutoSlide()
          const targetSlide = parseInt(dot.getAttribute('data-slide'))
          currentSlide = targetSlide
          showSlide(currentSlide)
          startAutoSlide()
        })
      })

      if (slides.length > 0) {
        startAutoSlide()
      }

      return () => {
        stopAutoSlide()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`} style={{
      background: darkMode ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      color: darkMode ? 'white' : '#2c3e50',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      <header className="header" style={{
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
        <nav className="nav" style={{ display: 'contents' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/logo.png" alt="GADYS" className="logo" style={{height: '40px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', padding: '8px'}} />
            <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '1px', color: 'white' }}>GADYS</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <button 
              onClick={(e) => {e.preventDefault(); toggleDarkMode()}} 
              style={{background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer'}}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <div className="hamburger" onClick={() => document.querySelector('.nav-links').classList.toggle('active')}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="nav-overlay" onClick={() => document.querySelector('.nav-links').classList.remove('active')}></div>
          <ul className="nav-links" style={{paddingTop: '5rem', justifyContent: 'flex-start', gap: '2rem'}}>
            <li><a href="#" style={{color: '#ccc', cursor: 'not-allowed'}} onClick={(e) => e.preventDefault()}>Início (atual)</a></li>
            <li className="dropdown">
              <a href="#features" onClick={(e) => {e.preventDefault(); document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}}>Estados Brasileiros ▼</a>
              <div className="dropdown-content">
                <a href="#">Acre</a>
                <a href="#">Alagoas</a>
                <a href="#">Amapá</a>
                <Link to="/amazonas" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Amazonas</Link>
                <a href="#">Bahia</a>
                <a href="#">Ceará</a>
                <a href="#">Distrito Federal</a>
                <a href="#">Espírito Santo</a>
                <a href="#">Goiás</a>
                <a href="#">Maranhão</a>
                <a href="#">Mato Grosso</a>
                <a href="#">Mato Grosso do Sul</a>
                <a href="#">Minas Gerais</a>
                <a href="#">Pará</a>
                <a href="#">Paraíba</a>
                <a href="#">Paraná</a>
                <a href="#">Pernambuco</a>
                <a href="#">Piauí</a>
                <a href="#">Rio de Janeiro</a>
                <a href="#">Rio Grande do Norte</a>
                <a href="#">Rio Grande do Sul</a>
                <a href="#">Rondônia</a>
                <a href="#">Roraima</a>
                <a href="#">Santa Catarina</a>
                <Link to="/sao-paulo" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>São Paulo</Link>
                <a href="#">Sergipe</a>
                <a href="#">Tocantins</a>
              </div>
            </li>
            <li><a href="#" onClick={() => {navigate('/lugares'); document.querySelector('.nav-links').classList.remove('active')}}>Lugares</a></li>
            <li><a href="#" onClick={() => {navigate('/mapa'); document.querySelector('.nav-links').classList.remove('active')}}>Mapa</a></li>
            <li><a href="#" onClick={() => {navigate('/adicionar-local'); document.querySelector('.nav-links').classList.remove('active')}}>Adicionar Local</a></li>
            {localStorage.getItem('userType') === 'adm' && (
              <li><a href="#" onClick={() => {navigate('/painel-adm'); document.querySelector('.nav-links').classList.remove('active')}}>Administração</a></li>
            )}
            <li><a href="#" onClick={() => {navigate('/perfil'); document.querySelector('.nav-links').classList.remove('active')}}>Meu Perfil</a></li>
            <li><a href="#" onClick={() => {navigate('/sobre'); document.querySelector('.nav-links').classList.remove('active')}}>Sobre</a></li>
            <li><a href="#" onClick={() => {navigate('/contato'); document.querySelector('.nav-links').classList.remove('active')}}>Contato</a></li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <div className="carousel">
            <div className="carousel-slide active">
              <div className="hero-content">
                {isLoggedIn && localStorage.getItem('userName') && (
                  <div className="welcome-box">
                    <h3>Bem-vindo(a), {localStorage.getItem('userName') || 'Usuário'}!</h3>
                    <p>Tipo de acesso: {localStorage.getItem('userType') === 'adm' ? 'Administrador' : 'Usuário'}</p>
                  </div>
                )}
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => navigate('/lugares')}>Começar Exploração</button>
                <div className="carousel-nav">
                  <span className="nav-dot active" data-slide="0"></span>
                  <span className="nav-dot" data-slide="1"></span>
                  <span className="nav-dot" data-slide="2"></span>
                </div>
              </div>
            </div>
            <div className="carousel-slide">
              <div className="hero-content">
                {isLoggedIn && localStorage.getItem('userName') && (
                  <div className="welcome-box">
                    <h3>Bem-vindo(a), {localStorage.getItem('userName') || 'Usuário'}!</h3>
                    <p>Tipo de acesso: {localStorage.getItem('userType') === 'adm' ? 'Administrador' : 'Usuário'}</p>
                  </div>
                )}
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => navigate('/lugares')}>Começar Exploração</button>
                <div className="carousel-nav">
                  <span className="nav-dot" data-slide="0"></span>
                  <span className="nav-dot active" data-slide="1"></span>
                  <span className="nav-dot" data-slide="2"></span>
                </div>
              </div>
            </div>
            <div className="carousel-slide">
              <div className="hero-content">
                {isLoggedIn && localStorage.getItem('userName') && (
                  <div className="welcome-box">
                    <h3>Bem-vindo(a), {localStorage.getItem('userName') || 'Usuário'}!</h3>
                    <p>Tipo de acesso: {localStorage.getItem('userType') === 'adm' ? 'Administrador' : 'Usuário'}</p>
                  </div>
                )}
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => navigate('/lugares')}>Começar Exploração</button>
                <div className="carousel-nav">
                  <span className="nav-dot" data-slide="0"></span>
                  <span className="nav-dot" data-slide="1"></span>
                  <span className="nav-dot active" data-slide="2"></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 GADYS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default HomePage