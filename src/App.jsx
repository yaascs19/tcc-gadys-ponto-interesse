import { useEffect, useState } from 'react'
import './App.css'
import Login from './Login'
import AdminPanel from './AdminPanel'
import Home from './components/Home'
import Amazonas from './components/Amazonas'
import Lugares from './components/Lugares'
import SobrePage from './components/SobrePage'
import ContatoPage from './components/ContatoPage'
import PerfilPage from './components/PerfilPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  
  // Verificar se deve abrir login
  const shouldOpenLogin = new URLSearchParams(window.location.search).get('login') === 'true'
  
  // Verificar admin ANTES de definir página inicial
  const shouldOpenAdmin = sessionStorage.getItem('openAdmin') === 'true' && localStorage.getItem('userType') === 'adm'
  
  // Roteamento simples baseado na URL
  const getInitialPage = () => {
    const path = window.location.pathname
    if (shouldOpenLogin) return 'login'
    if (shouldOpenAdmin) return 'admin'
    if (path === '/home' || path === '/home.html') return 'welcome'
    if (path === '/amazonas' || path === '/amazonas.html') return 'amazonas'
    if (path === '/lugares' || path === '/lugares.html') return 'lugares'
    return 'home'
  }
  
  const [currentPage, setCurrentPage] = useState(getInitialPage)
  
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || 'usuario'
  })
  
  // Limpar flag se foi usada
  if (shouldOpenAdmin) {
    sessionStorage.removeItem('openAdmin')
  }
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
    // Verificar se deve abrir admin automaticamente - IMEDIATO
    if (sessionStorage.getItem('openAdmin') === 'true' && userType === 'adm') {
      sessionStorage.removeItem('openAdmin');
      setCurrentPage('admin');
      return;
    }
    
    if (currentPage === 'login') return

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
  }, [isLoggedIn, currentPage, userType])

  if (currentPage === 'welcome') {
    return <Home />
  }
  
  if (currentPage === 'amazonas') {
    return <Amazonas />
  }
  
  if (currentPage === 'lugares') {
    return <Lugares />
  }
  
  if (currentPage === 'sobrepage') {
    return <SobrePage setCurrentPage={setCurrentPage} />
  }
  
  if (currentPage === 'contatopage') {
    return <ContatoPage setCurrentPage={setCurrentPage} />
  }
  
  if (currentPage === 'perfilpage') {
    return <PerfilPage setCurrentPage={setCurrentPage} />
  }
  
  if (currentPage === 'sobre') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a237e, #3f51b5)',
        color: 'white',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}>
          <img src="/logo.png" alt="GADYS" style={{
            height: '80px',
            marginBottom: '2rem',
            background: 'lightblue',
            borderRadius: '50%',
            padding: '8px'
          }} />
          <h1 style={{fontSize: '3rem', marginBottom: '2rem'}}>Sobre o GADYS</h1>
          <p style={{fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9}}>
            Plataforma dedicada a promover os pontos de interesse mais incríveis do Brasil
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '15px'
            }}>
              <h3 style={{marginBottom: '1rem'}}>🏛️ Monumentos</h3>
              <p>Descubra a história do Brasil</p>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '15px'
            }}>
              <h3 style={{marginBottom: '1rem'}}>🌿 Natureza</h3>
              <p>Explore paisagens únicas</p>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '15px'
            }}>
              <h3 style={{marginBottom: '1rem'}}>🍽️ Gastronomia</h3>
              <p>Sabores regionais autênticos</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentPage('home')}
            style={{
              background: 'white',
              color: '#1a237e',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    )
  }
  
  if (currentPage === 'contato') {
    return (
      <div style={{padding: '2rem', textAlign: 'center'}}>
        <h1>Contato</h1>
        <p>Entre em contato conosco</p>
        <button onClick={() => setCurrentPage('home')}>Voltar</button>
      </div>
    )
  }
  
  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} />
  }
  
  if (currentPage === 'adminLogin') {
    return <Login onLogin={handleLogin} isAdminAccess={true} />
  }

  if (currentPage === 'admin' && userType === 'adm') {
    return (
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <header className="header">
          <nav className="nav">
            <img src="/logo.png" alt="GADYS" className="logo" style={{height: '40px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', padding: '8px'}} />
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
              <li><a href="#" onClick={() => {setCurrentPage('perfilpage'); document.querySelector('.nav-links').classList.remove('active')}}>Meu Perfil</a></li>
              <li><a href="/mapa-real-api.html" onClick={() => document.querySelector('.nav-links').classList.remove('active')}>Mapa</a></li>
              <li><a href="/sobre.html" onClick={() => document.querySelector('.nav-links').classList.remove('active')}>Sobre</a></li>
              <li><a href="/contato.html" onClick={() => document.querySelector('.nav-links').classList.remove('active')}>Contato</a></li>

            </ul>
          </nav>
        </header>
        <AdminPanel />
      </div>
    )
  }

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

            <li><a href="/mapa-real-api.html" onClick={() => document.querySelector('.nav-links').classList.remove('active')}>Mapa</a></li>
            <li><a href="#" onClick={(e) => {e.preventDefault(); if (!localStorage.getItem('isLoggedIn')) setCurrentPage('login'); else window.location.href='/adicionar-locais.html'; document.querySelector('.nav-links').classList.remove('active')}}>Adicionar Local</a></li>
            <li><a href="#" onClick={() => {setCurrentPage('perfilpage'); document.querySelector('.nav-links').classList.remove('active')}}>Meu Perfil</a></li>
            <li><a href="#" onClick={() => {setCurrentPage('sobrepage'); document.querySelector('.nav-links').classList.remove('active')}}>Sobre</a></li>
            <li><a href="#" onClick={() => {setCurrentPage('contatopage'); document.querySelector('.nav-links').classList.remove('active')}}>Contato</a></li>


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
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
                <div className="carousel-nav">
                  <span className="nav-dot active" data-slide="0" onClick={(e) => {e.preventDefault(); e.stopPropagation(); document.querySelectorAll('.carousel-slide').forEach((slide, i) => slide.classList.toggle('active', i === 0)); document.querySelectorAll('.nav-dot').forEach((dot, i) => dot.classList.toggle('active', i === 0));}}></span>
                  <span className="nav-dot" data-slide="1" onClick={(e) => {e.preventDefault(); e.stopPropagation(); document.querySelectorAll('.carousel-slide').forEach((slide, i) => slide.classList.toggle('active', i === 1)); document.querySelectorAll('.nav-dot').forEach((dot, i) => dot.classList.toggle('active', i === 1));}}></span>
                  <span className="nav-dot" data-slide="2" onClick={(e) => {e.preventDefault(); e.stopPropagation(); document.querySelectorAll('.carousel-slide').forEach((slide, i) => slide.classList.toggle('active', i === 2)); document.querySelectorAll('.nav-dot').forEach((dot, i) => dot.classList.toggle('active', i === 2));}}></span>
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
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
                <div className="carousel-nav">
                  <span className="nav-dot" data-slide="0" onClick={(e) => {e.preventDefault(); e.stopPropagation();}}></span>
                  <span className="nav-dot active" data-slide="1" onClick={(e) => {e.preventDefault(); e.stopPropagation();}}></span>
                  <span className="nav-dot" data-slide="2" onClick={(e) => {e.preventDefault(); e.stopPropagation();}}></span>
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
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
                <div className="carousel-nav">
                  <span className="nav-dot" data-slide="0" onClick={(e) => {e.preventDefault(); e.stopPropagation();}}></span>
                  <span className="nav-dot" data-slide="1" onClick={(e) => {e.preventDefault(); e.stopPropagation();}}></span>
                  <span className="nav-dot active" data-slide="2" onClick={(e) => {e.preventDefault(); e.stopPropagation();}}></span>
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