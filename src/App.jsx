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

  const handleLogin = (loginUserType, userName) => {
    setIsLoggedIn(true)
    setUserType(loginUserType)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userType', loginUserType)
    localStorage.setItem('userName', userName)
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
        if (slides.length === 0 || dots.length === 0) return
        
        slides.forEach(slide => slide.classList.remove('active'))
        dots.forEach(dot => dot.classList.remove('active'))
        
        if (slides[index] && dots[index]) {
          slides[index].classList.add('active')
          dots[index].classList.add('active')
        }
      }

      const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
          currentSlide = (currentSlide + 1) % slides.length
          showSlide(currentSlide)
        }, 4000)
      }

      const stopAutoSlide = () => {
        if (autoSlideInterval) {
          clearInterval(autoSlideInterval)
        }
      }

      // Add click listeners to dots
      dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault()
          stopAutoSlide()
          currentSlide = index
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
            <img src="/gadys-logo.svg" alt="GADYS" className="logo" style={{height: '40px'}} />
            <ul className="nav-links">
              <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('home')}}>Voltar ao Início</a></li>
              <li><a href="/adicionar-locais.html">Adicionar locais</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('admin')}}>Administração</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); toggleDarkMode()}}>{darkMode ? '☀️' : '🌙'}</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); handleLogout()}}>Logout</a></li>
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
          <img src="/gadys-logo.svg" alt="GADYS" className="logo" style={{height: '40px'}} />
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('home')}}>Início</a></li>
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
            <li><a href="/adicionar-locais.html">Adicionar locais</a></li>
            <li><a href="/buscar.html">Buscar</a></li>
            <li><a href="/perfil.html">Perfil</a></li>
            <li><a href="/sobre.html">Sobre</a></li>
            <li><a href="/contato.html">Contato</a></li>
            {userType === 'adm' && (
              <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('admin')}}>Administração</a></li>
            )}
            <li><a href="#" onClick={(e) => {e.preventDefault(); toggleDarkMode()}}>{darkMode ? '☀️' : '🌙'}</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault(); handleLogout()}}>Logout</a></li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <div className="carousel">
            <div className="carousel-slide active">
              <div className="hero-content">
                <div className="welcome-box">
                  <h3>Bem-vindo, {localStorage.getItem('userName') || 'Usuário'}! 🖐️</h3>
                  <p>Tipo de acesso: {localStorage.getItem('userType') === 'adm' ? 'Administrador' : 'Usuário'}</p>
                </div>
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
              </div>
            </div>
            <div className="carousel-slide">
              <div className="hero-content">
                <div className="welcome-box">
                  <h3>Bem-vindo, {localStorage.getItem('userName') || 'Usuário'}! 🖐️</h3>
                  <p>Tipo de acesso: {localStorage.getItem('userType') === 'adm' ? 'Administrador' : 'Usuário'}</p>
                </div>
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
              </div>
            </div>
            <div className="carousel-slide">
              <div className="hero-content">
                <div className="welcome-box">
                  <h3>Bem-vindo, {localStorage.getItem('userName') || 'Usuário'}! 🖐️</h3>
                  <p>Tipo de acesso: {localStorage.getItem('userType') === 'adm' ? 'Administrador' : 'Usuário'}</p>
                </div>
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
              </div>
            </div>
          </div>
          <div className="carousel-nav">
            <button className="nav-dot active"></button>
            <button className="nav-dot"></button>
            <button className="nav-dot"></button>
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