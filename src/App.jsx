import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <h1 className="logo">Pontos de Interesse</h1>
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
          <div className="hero-content">
            <h2>Descubra Lugares Incríveis</h2>
            <p>Explore pontos de interesse únicos e encontre experiências inesquecíveis</p>
            <button className="cta-button">Começar Exploração</button>
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
      </main>

      <footer className="footer">
        <p>&copy; 2024 Pontos de Interesse. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default App
