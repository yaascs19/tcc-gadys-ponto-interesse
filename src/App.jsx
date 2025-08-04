import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
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
  }, [])

  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <img src="/gadys-logo.svg" alt="GADYS" className="logo" style={{height: '40px'}} />
          <ul className="nav-links">
            <li><a href="#home">Início</a></li>
            <li className="dropdown">
              <a href="#features" onClick={(e) => {e.preventDefault(); document.getElementById('features').scrollIntoView({behavior: 'smooth'})}}>Categorias ▼</a>
              <div className="dropdown-content">
                <a href="/monumentos.html">🏛️ Monumentos</a>
                <a href="/natureza.html">🌳 Natureza</a>
                <a href="/gastronomia.html">🍽️ Gastronomia</a>
                <a href="/cultura.html">🎨 Cultura</a>
              </div>
            </li>
            <li><a href="/adicionar-locais.html">Adicionar locais</a></li>
            <li><a href="/sobre.html">Sobre</a></li>
            <li><a href="/contato.html">Contato</a></li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <div className="carousel">
            <div className="carousel-slide active">
              <div className="hero-content">
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
              </div>
            </div>
            <div className="carousel-slide">
              <div className="hero-content">
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
              </div>
            </div>
            <div className="carousel-slide">
              <div className="hero-content">
                <h2>Descubra Lugares Incríveis</h2>
                <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
                <button className="cta-button" onClick={() => window.location.href = '/lugares.html'}>Começar Exploração</button>
              </div>
            </div>
          </div>
          <div className="carousel-nav">
            <button className="nav-dot active" data-slide="0"></button>
            <button className="nav-dot" data-slide="1"></button>
            <button className="nav-dot" data-slide="2"></button>
          </div>
        </section>

      </main>

      <footer className="footer">
        <p>&copy; 2024 GADYS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default App