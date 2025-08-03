function LugaresMaisVisitados({ onBack }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1a237e', color: 'white', padding: '1rem 0' }}>
        <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>GADYS</h1>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem', margin: 0, padding: 0 }}>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }} onClick={(e) => {e.preventDefault(); onBack && onBack()}}>Início</a></li>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Categorias</a></li>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Explorar</a></li>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Sobre</a></li>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contato</a></li>
          </ul>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <section style={{ 
          background: 'linear-gradient(rgba(26, 35, 126, 0.8), rgba(26, 35, 126, 0.8)), url("https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '6rem 2rem 4rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 700 }}>Lugares Mais Visitados do Brasil</h1>
          <p style={{ fontSize: '1.3rem', opacity: 0.9 }}>Descubra os destinos mais procurados pelos turistas</p>
        </section>

        <section style={{ padding: '5rem 0', background: '#f8f9fa' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              
              <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)' }}>
                <img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Cristo Redentor" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>Cristo Redentor</h3>
                  <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>Rio de Janeiro - RJ</p>
                  <p style={{ color: '#555', lineHeight: 1.6, marginBottom: '1.5rem' }}>Uma das Sete Maravilhas do Mundo Moderno</p>
                  <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '25px', cursor: 'pointer', fontSize: '1rem' }}>Visitar</button>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)' }}>
                <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Pão de Açúcar" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>Pão de Açúcar</h3>
                  <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>Rio de Janeiro - RJ</p>
                  <p style={{ color: '#555', lineHeight: 1.6, marginBottom: '1.5rem' }}>Cartão postal do Rio de Janeiro</p>
                  <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '25px', cursor: 'pointer', fontSize: '1rem' }}>Visitar</button>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)' }}>
                <img src="https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Cataratas do Iguaçu" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>Cataratas do Iguaçu</h3>
                  <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>Foz do Iguaçu - PR</p>
                  <p style={{ color: '#555', lineHeight: 1.6, marginBottom: '1.5rem' }}>Uma das maiores quedas d'água do mundo</p>
                  <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '25px', cursor: 'pointer', fontSize: '1rem' }}>Visitar</button>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)' }}>
                <img src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Pelourinho" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>Pelourinho</h3>
                  <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>Salvador - BA</p>
                  <p style={{ color: '#555', lineHeight: 1.6, marginBottom: '1.5rem' }}>Centro histórico de Salvador</p>
                  <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '25px', cursor: 'pointer', fontSize: '1rem' }}>Visitar</button>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)' }}>
                <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Fernando de Noronha" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>Fernando de Noronha</h3>
                  <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>Pernambuco - PE</p>
                  <p style={{ color: '#555', lineHeight: 1.6, marginBottom: '1.5rem' }}>Paraíso ecológico brasileiro</p>
                  <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '25px', cursor: 'pointer', fontSize: '1rem' }}>Visitar</button>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)' }}>
                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Pantanal" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>Pantanal</h3>
                  <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>Mato Grosso - MT</p>
                  <p style={{ color: '#555', lineHeight: 1.6, marginBottom: '1.5rem' }}>Maior planície alagável do mundo</p>
                  <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '25px', cursor: 'pointer', fontSize: '1rem' }}>Visitar</button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer style={{ background: '#2c3e50', color: 'white', textAlign: 'center', padding: '2rem' }}>
        <p>&copy; 2024 GADYS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default LugaresMaisVisitados