import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const slides = document.querySelectorAll('.carousel-slide')
    const dots = document.querySelectorAll('.nav-dot')
    let currentSlide = 0

    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'))
      dots.forEach(dot => dot.classList.remove('active'))
      slides[index].classList.add('active')
      dots[index].classList.add('active')
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index
        showSlide(currentSlide)
      })
    })

    const autoSlide = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length
      showSlide(currentSlide)
    }, 4000)

    // Food carousel
    const foodSlides = document.querySelectorAll('.food-slide')
    const foodDots = document.querySelectorAll('.food-dot')
    let currentFoodSlide = 0

    const showFoodSlide = (index) => {
      foodSlides.forEach(slide => slide.classList.remove('active'))
      foodDots.forEach(dot => dot.classList.remove('active'))
      foodSlides[index].classList.add('active')
      foodDots[index].classList.add('active')
    }

    foodDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentFoodSlide = index
        showFoodSlide(currentFoodSlide)
      })
    })

    const autoFoodSlide = setInterval(() => {
      currentFoodSlide = (currentFoodSlide + 1) % foodSlides.length
      showFoodSlide(currentFoodSlide)
    }, 3000)

    return () => {
      clearInterval(autoSlide)
      clearInterval(autoFoodSlide)
    }
  }, [])
  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <h1 className="logo">GADYS</h1>
          <ul className="nav-links">
            <li><a href="#home">Início</a></li>
            <li><a href="#explore">Explorar</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#contact">Contato</a></li>
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
                <button className="cta-button">Começar Exploração</button>
              </div>
            </div>
            <div className="carousel-slide">
              <div className="hero-content">
                <h2>Monumentos Históricos</h2>
                <p>Descubra marcos históricos e arquitetônicos únicos</p>
                <button className="cta-button">Ver Monumentos</button>
              </div>
            </div>
            <div className="carousel-slide">
              <div className="hero-content">
                <h2>Natureza Exuberante</h2>
                <p>Explore parques, trilhas e áreas naturais preservadas</p>
                <button className="cta-button">Explorar Natureza</button>
              </div>
            </div>
          </div>
          <div className="carousel-nav">
            <button className="nav-dot active" data-slide="0"></button>
            <button className="nav-dot" data-slide="1"></button>
            <button className="nav-dot" data-slide="2"></button>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h3>Principais Categorias</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>🏛️ Monumentos</h4>
                <p>Descubra marcos históricos e arquitetônicos</p>
              </div>
              <div className="feature-card">
                <h4>🌳 Natureza</h4>
                <p>Explore parques, trilhas e áreas naturais</p>
              </div>
              <div className="feature-card">
                <h4>🍽️ Gastronomia</h4>
                <p>Encontre restaurantes e experiências culinárias</p>
              </div>
              <div className="feature-card">
                <h4>🎨 Cultura</h4>
                <p>Visite museus, galerias e centros culturais</p>
              </div>
            </div>
          </div>
        </section>

        <section className="food-carousel-section">
          <div className="container">
            <h3>Sabores do Brasil</h3>
            <div className="food-carousel">
              <div className="food-slide active">
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Feijoada" />
                <h4>Feijoada</h4>
                <p>O prato mais tradicional do Brasil</p>
              </div>
              <div className="food-slide">
                <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Pão de Açúcar" />
                <h4>Pão de Açúcar</h4>
                <p>Doce tradicional brasileiro</p>
              </div>
              <div className="food-slide">
                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Açaí" />
                <h4>Açaí</h4>
                <p>Superfruit amazônico</p>
              </div>
              <div className="food-slide">
                <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Coxinha" />
                <h4>Coxinha</h4>
                <p>Salgado mais amado do Brasil</p>
              </div>
            </div>
            <div className="food-nav">
              <button className="food-dot active" data-slide="0"></button>
              <button className="food-dot" data-slide="1"></button>
              <button className="food-dot" data-slide="2"></button>
              <button className="food-dot" data-slide="3"></button>
            </div>
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
