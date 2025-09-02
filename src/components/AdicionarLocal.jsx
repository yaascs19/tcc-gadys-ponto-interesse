import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function AdicionarLocal() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    subcategoria: '',
    cidade: '',
    estado: '',
    descricao: '',
    imagem: '',
    localizacao: '',
    coordenadas: '',
    horario: '',
    preco: '',
    infoAdicional: ''
  })
  
  const [showSubcategoria, setShowSubcategoria] = useState(false)
  
  const [showSuccess, setShowSuccess] = useState(false)
  const [tipoImagem, setTipoImagem] = useState('url')

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .nav-links.active {
        right: 0 !important;
      }
      .nav-overlay.active {
        opacity: 1 !important;
        visibility: visible !important;
      }
      .nav-links li:hover .dropdown-content {
        display: block !important;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'categoria') {
      setShowSubcategoria(value !== '')
      setFormData(prev => ({
        ...prev,
        subcategoria: '' // Reset subcategoria quando categoria muda
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const userName = localStorage.getItem('userName') || 'Usuário Anônimo'
    const userType = localStorage.getItem('userType')
    
    const localData = {
      id: Date.now(),
      ...formData,
      submittedBy: userName,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'pendente'
    }
    
    if (userType === 'adm') {
      let approvedLocations = JSON.parse(localStorage.getItem('approvedLocations')) || []
      approvedLocations.push(localData)
      localStorage.setItem('approvedLocations', JSON.stringify(approvedLocations))
    } else {
      let pendingLocations = JSON.parse(localStorage.getItem('pendingLocations')) || []
      pendingLocations.push(localData)
      localStorage.setItem('pendingLocations', JSON.stringify(pendingLocations))
    }
    
    setShowSuccess(true)
    setFormData({
      nome: '',
      categoria: '',
      subcategoria: '',
      cidade: '',
      estado: '',
      descricao: '',
      imagem: '',
      localizacao: '',
      coordenadas: '',
      horario: '',
      preco: '',
      infoAdicional: ''
    })
    
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      color: darkMode ? 'white' : '#2c3e50',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <header style={{
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="/logo.png" 
            alt="GADYS" 
            style={{
              height: '45px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '50%',
              padding: '8px'
            }}
          />
          <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '1px', color: 'white' }}>GADYS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={toggleTheme}
            style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              border: darkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.2)',
              color: darkMode ? 'white' : '#2c3e50',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '10px',
              transition: 'all 0.3s'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              zIndex: 1002
            }}
            onClick={() => document.querySelector('.nav-links').classList.toggle('active')}
          >
            <span style={{
              width: '25px',
              height: '3px',
              background: 'white',
              margin: '3px 0',
              transition: '0.3s'
            }} />
            <span style={{
              width: '25px',
              height: '3px',
              background: 'white',
              margin: '3px 0',
              transition: '0.3s'
            }} />
            <span style={{
              width: '25px',
              height: '3px',
              background: 'white',
              margin: '3px 0',
              transition: '0.3s'
            }} />
          </div>
        </div>
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            opacity: 0,
            visibility: 'hidden',
            transition: 'all 0.3s ease'
          }}
          className="nav-overlay"
          onClick={() => document.querySelector('.nav-links').classList.remove('active')}
        />
        <ul 
          className="nav-links"
          style={{
            position: 'fixed',
            top: 0,
            right: '-100%',
            width: '300px',
            height: '100vh',
            background: darkMode ? '#1a237e' : '#1a237e',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '2rem',
            margin: 0,
            padding: '4rem 0',
            listStyle: 'none',
            transition: 'right 0.3s ease',
            zIndex: 1001,
            overflowY: 'scroll',
            boxShadow: '-5px 0 15px rgba(0,0,0,0.1)'
          }}
        >
          <li><Link to="/" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Início</Link></li>
          <li><Link to="/lugares" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Lugares</Link></li>
          <li><Link to="/mapa" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Mapa</Link></li>
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none', padding: '0.5rem 1rem', cursor: 'not-allowed' }}>Adicionar Local (atual)</a></li>
          <li><Link to="/perfil" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Meu Perfil</Link></li>
          <li><Link to="/sobre" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Sobre</Link></li>
          <li><Link to="/contato" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Contato</Link></li>
        </ul>
      </header>

      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <section style={{
          textAlign: 'center',
          padding: '6rem 0 4rem',
          background: darkMode ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
          borderRadius: '0 0 50px 50px',
          marginBottom: '4rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            letterSpacing: '-2px',
            lineHeight: '1.1'
          }}>
            Adicionar Novo Local
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Compartilhe lugares incríveis do Brasil<br />
            <span style={{ color: '#667eea', fontWeight: '500' }}>Ajude outros viajantes a descobrir novos destinos</span>
          </p>
        </section>

        <section style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          padding: '3rem',
          borderRadius: '30px',
          marginBottom: '4rem',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          boxShadow: '0 30px 60px rgba(102, 126, 234, 0.1)'
        }}>
          {showSuccess && (
            <div style={{
              background: '#d4edda',
              border: '1px solid #c3e6cb',
              color: '#155724',
              padding: '1rem',
              borderRadius: '15px',
              marginBottom: '2rem',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              Local enviado com sucesso! Aguarde a aprovação.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#667eea' }}>
                Nome do Local:
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '15px',
                  border: '2px solid rgba(102, 126, 234, 0.3)',
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  color: darkMode ? 'white' : '#333',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#667eea' }}>
                Categoria Principal:
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '15px',
                  border: '2px solid rgba(102, 126, 234, 0.3)',
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  color: darkMode ? 'white' : '#333',
                  fontSize: '1rem'
                }}
              >
                <option value="">Selecione uma categoria</option>
                <option value="curiosidades">Curiosidades</option>
                <option value="lugares-visitar">Lugares para Visitar</option>
              </select>
            </div>

            {showSubcategoria && (
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#667eea' }}>
                  Subcategoria:
                </label>
                <select
                  name="subcategoria"
                  value={formData.subcategoria}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '15px',
                    border: '2px solid rgba(102, 126, 234, 0.3)',
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                    color: darkMode ? 'white' : '#333',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Selecione uma subcategoria</option>
                  {formData.categoria === 'curiosidades' && (
                    <>
                      <option value="gastronomia">Gastronomia</option>
                      <option value="cultura">Cultura</option>
                    </>
                  )}
                  {formData.categoria === 'lugares-visitar' && (
                    <>
                      <option value="natureza">Natureza</option>
                      <option value="monumentos">Monumentos</option>
                    </>
                  )}
                </select>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#667eea' }}>
                  Cidade:
                </label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '15px',
                    border: '2px solid rgba(102, 126, 234, 0.3)',
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                    color: darkMode ? 'white' : '#333',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#667eea' }}>
                  Estado:
                </label>
                <input
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '15px',
                    border: '2px solid rgba(102, 126, 234, 0.3)',
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                    color: darkMode ? 'white' : '#333',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#667eea' }}>
                Descrição:
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Descreva o local, suas características e o que o torna especial..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '15px',
                  border: '2px solid rgba(102, 126, 234, 0.3)',
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  color: darkMode ? 'white' : '#333',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#667eea' }}>
                URL da Imagem:
              </label>
              <input
                type="url"
                name="imagem"
                value={formData.imagem}
                onChange={handleInputChange}
                placeholder="https://exemplo.com/imagem.jpg"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '15px',
                  border: '2px solid rgba(102, 126, 234, 0.3)',
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  color: darkMode ? 'white' : '#333',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#667eea' }}>
                  Horário:
                </label>
                <input
                  type="text"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  placeholder="Ex: 8h às 18h"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '15px',
                    border: '2px solid rgba(102, 126, 234, 0.3)',
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                    color: darkMode ? 'white' : '#333',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#667eea' }}>
                  Preço:
                </label>
                <input
                  type="text"
                  name="preco"
                  value={formData.preco}
                  onChange={handleInputChange}
                  placeholder="Ex: Gratuito, R$ 10,00"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '15px',
                    border: '2px solid rgba(102, 126, 234, 0.3)',
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                    color: darkMode ? 'white' : '#333',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '1.5rem',
                borderRadius: '25px',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
                letterSpacing: '0.5px'
              }}
            >
              Adicionar Local
            </button>
          </form>
        </section>

        <section style={{
          textAlign: 'center',
          padding: '2rem 0 4rem'
        }}>
          <Link 
            to="/"
            style={{
              background: 'transparent',
              color: darkMode ? 'white' : '#2c3e50',
              border: darkMode ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(44, 62, 80, 0.3)',
              padding: '1rem 2rem',
              borderRadius: '25px',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            Voltar ao Início
          </Link>
        </section>
      </main>

      <footer style={{
        background: darkMode ? 'rgba(15, 12, 41, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        padding: '2rem',
        borderTop: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        <p style={{ opacity: 0.7, fontSize: '1rem' }}>&copy; 2025 GADYS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default AdicionarLocal