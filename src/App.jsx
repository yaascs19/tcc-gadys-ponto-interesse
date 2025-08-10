import { useEffect, useState } from 'react'
import './App.css'
import Login from './Login'
import AdminPanel from './AdminPanel'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  const [currentPage, setCurrentPage] = useState('home')
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || 'usuario'
  })
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  const handleLogin = async (loginUserType, userName) => {
    setIsLoggedIn(true)
    setUserType(loginUserType)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userType', loginUserType)
    localStorage.setItem('userName', userName)
    
    try {
      // Registra acesso na API
      await fetch('http://localhost:3001/api/usuarios/acesso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: userName,
          tipoUsuario: loginUserType
        })
      })
    } catch (error) {
      // Fallback localStorage
      const userAccess = JSON.parse(localStorage.getItem('userAccess')) || []
      const existingUser = userAccess.find(user => user.userName === userName)
      
      if (existingUser) {
        existingUser.lastAccess = new Date().toLocaleString('pt-BR')
        existingUser.accessCount += 1
      } else {
        userAccess.push({
          userName: userName,
          userType: loginUserType,
          lastAccess: new Date().toLocaleString('pt-BR'),
          accessCount: 1,
          ip: 'localhost'
        })
      }
      
      localStorage.setItem('userAccess', JSON.stringify(userAccess))
    }
    
    setCurrentPage('home')
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType('usuario')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userType')
    localStorage.removeItem('userName')
    setCurrentPage('login')
  }

  useEffect(() => {
    if (!isLoggedIn || currentPage === 'login') return

    const timer = setTimeout(() => {
      const slides = document.querySelectorAll('.carousel-slide')
      const dots = document.querySelectorAll('.nav-dot')
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

      // Add click listeners to dots
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

      // Start auto slide
      if (slides.length > 0) {
        startAutoSlide()
      }

      return () => {
        stopAutoSlide()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isLoggedIn, currentPage])

  if (!isLoggedIn || currentPage === 'login') {
    return <Login onLogin={handleLogin} />
  }

  if (currentPage === 'admin' && userType === 'adm') {
    return (
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <header className="header">
          <nav className="nav">
            <img src="/logo.png" alt="GADYS" className="logo" style={{height: '40px'}} />
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
            <ul className="nav-links">
              <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('home'); document.querySelector('.nav-links').classList.remove('active')}}>Voltar ao Início</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('admin'); document.querySelector('.nav-links').classList.remove('active')}}>Administração</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); handleLogout(); document.querySelector('.nav-links').classList.remove('active')}}>Logout</a></li>
            </ul>
          </nav>
        </header>
        <AdminPanel />
      </div>
    )
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <nav className="nav">
          <img src="/logo.png" alt="GADYS" className="logo" style={{height: '40px'}} />
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
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('home'); document.querySelector('.nav-links').classList.remove('active')}}>Início</a></li>
            <li className="dropdown">
              <a href="#features" onClick={(e) => {e.preventDefault(); document.getElementById('features').scrollIntoView({behavior: 'smooth'})}}>Estados Brasileiros ▼</a>
              <div className="dropdown-content">
                <a href="#">Acre</a>
                <a href="#">Alagoas</a>
                <a href="#">Amapá</a>
                <a href="/amazonas.html">Amazonas</a>
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
                <a href="#">São Paulo</a>
                <a href="#">Sergipe</a>
                <a href="#">Tocantins</a>
              </div>
            </li>

            <li><a href="/perfil.html" onClick={() => document.querySelector('.nav-links').classList.remove('active')}>Meu Perfil</a></li>
            <li><a href="/mapa.html" onClick={() => document.querySelector('.nav-links').classList.remove('active')}>🗺️ Mapa</a></li>
            <li><a href="/sobre.html" onClick={() => document.querySelector('.nav-links').classList.remove('active')}>Sobre</a></li>
            <li><a href="/contato.html" onClick={() => document.querySelector('.nav-links').classList.remove('active')}>Contato</a></li>
            {userType === 'adm' && (
              <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('admin'); document.querySelector('.nav-links').classList.remove('active')}}>Administração</a></li>
            )}
            <li><a href="#" onClick={(e) => {e.preventDefault(); handleLogout(); document.querySelector('.nav-links').classList.remove('active')}}>Logout</a></li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <div className="carousel">
            <div className="carousel-slide active">
              <div className="hero-content">
                <div className="welcome-box">
                  <h3>Bem-vindo, {localStorage.getItem('userName') || 'Usuário'}!</h3>
                  <p>Tipo de acesso: {localStorage.getItem('userType') === 'adm' ? 'Administrador' : 'Usuário'}</p>
                </div>
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
                <div className="carousel-nav">
                  <button className="nav-dot active" data-slide="0"></button>
                  <button className="nav-dot" data-slide="1"></button>
                  <button className="nav-dot" data-slide="2"></button>
                </div>
              </div>
            </div>
            <div className="carousel-slide">
              <div className="hero-content">
                <div className="welcome-box">
                  <h3>Bem-vindo, {localStorage.getItem('userName') || 'Usuário'}!</h3>
                  <p>Tipo de acesso: {localStorage.getItem('userType') === 'adm' ? 'Administrador' : 'Usuário'}</p>
                </div>
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
                <div className="carousel-nav">
                  <button className="nav-dot" data-slide="0"></button>
                  <button className="nav-dot active" data-slide="1"></button>
                  <button className="nav-dot" data-slide="2"></button>
                </div>
              </div>
            </div>
            <div className="carousel-slide">
              <div className="hero-content">
                <div className="welcome-box">
                  <h3>Bem-vindo, {localStorage.getItem('userName') || 'Usuário'}!</h3>
                  <p>Tipo de acesso: {localStorage.getItem('userType') === 'adm' ? 'Administrador' : 'Usuário'}</p>
                </div>
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
                <div className="carousel-nav">
                  <button className="nav-dot" data-slide="0"></button>
                  <button className="nav-dot" data-slide="1"></button>
                  <button className="nav-dot active" data-slide="2"></button>
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

export default App