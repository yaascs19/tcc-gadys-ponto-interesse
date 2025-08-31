import { useState } from 'react'
import Navbar from './Navbar'

function Contato({ setCurrentPage }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
  }

  return (
    <div className={`page ${darkMode ? 'dark-mode' : ''}`} style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.6,
      color: darkMode ? '#e0e0e0' : '#333',
      background: darkMode ? '#1a1a1a' : '#fff'
    }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} setCurrentPage={setCurrentPage} />

      <main style={{ flex: 1, padding: '4rem 2rem' }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{
            background: darkMode ? '#21262d' : 'white',
            padding: '3rem',
            borderRadius: '15px',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: '#1a237e',
              textAlign: 'center'
            }}>
              Entre em Contato
            </h1>
            
            <p style={{
              color: darkMode ? '#8b949e' : '#555',
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              Tem alguma dúvida, sugestão ou quer compartilhar sua experiência? Estamos aqui para ajudar!
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ color: '#1a237e', marginBottom: '0.5rem' }}>📧 E-mail</h4>
                <a href="mailto:contato@gadys.com.br" style={{ color: darkMode ? '#8b949e' : '#555', textDecoration: 'none' }}>contato@gadys.com.br</a>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ color: '#1a237e', marginBottom: '0.5rem' }}>📞 Telefone</h4>
                <p style={{ color: darkMode ? '#8b949e' : '#555', margin: 0 }}>(11) 99999-9999</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ color: '#1a237e', marginBottom: '0.5rem' }}>📍 Endereço</h4>
                <p style={{ color: darkMode ? '#8b949e' : '#555', margin: 0 }}>São Paulo - SP<br />Brasil</p>
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              <h4 style={{ color: '#1a237e', marginBottom: '1rem' }}>Redes Sociais</h4>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📷</div>
                  <p style={{ color: darkMode ? '#8b949e' : '#555', margin: 0, fontSize: '0.9rem' }}>Instagram<br />@gadys_brasil</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👥</div>
                  <p style={{ color: darkMode ? '#8b949e' : '#555', margin: 0, fontSize: '0.9rem' }}>Facebook<br />/gadys.brasil</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🐦</div>
                  <p style={{ color: darkMode ? '#8b949e' : '#555', margin: 0, fontSize: '0.9rem' }}>Twitter<br />@gadys_br</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📺</div>
                  <p style={{ color: darkMode ? '#8b949e' : '#555', margin: 0, fontSize: '0.9rem' }}>YouTube<br />/gadys-brasil</p>
                </div>
              </div>
            </div>
          </div>



          <div style={{
            background: darkMode ? '#21262d' : 'white',
            padding: '3rem',
            borderRadius: '15px',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: darkMode ? '#f0f6fc' : '#2c3e50'
                }}>
                  Nome *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: `1px solid ${darkMode ? '#30363d' : '#ddd'}`,
                    borderRadius: '5px',
                    fontSize: '1rem',
                    background: darkMode ? '#0d1117' : 'white',
                    color: darkMode ? '#e0e0e0' : '#333'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: darkMode ? '#f0f6fc' : '#2c3e50'
                }}>
                  E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: `1px solid ${darkMode ? '#30363d' : '#ddd'}`,
                    borderRadius: '5px',
                    fontSize: '1rem',
                    background: darkMode ? '#0d1117' : 'white',
                    color: darkMode ? '#e0e0e0' : '#333'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: darkMode ? '#f0f6fc' : '#2c3e50'
                }}>
                  Assunto *
                </label>
                <select
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: `1px solid ${darkMode ? '#30363d' : '#ddd'}`,
                    borderRadius: '5px',
                    fontSize: '1rem',
                    background: darkMode ? '#0d1117' : 'white',
                    color: darkMode ? '#e0e0e0' : '#333'
                  }}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="problema">Problema Técnico</option>
                  <option value="parceria">Parceria</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: darkMode ? '#f0f6fc' : '#2c3e50'
                }}>
                  Mensagem *
                </label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: `1px solid ${darkMode ? '#30363d' : '#ddd'}`,
                    borderRadius: '5px',
                    fontSize: '1rem',
                    background: darkMode ? '#0d1117' : 'white',
                    color: darkMode ? '#e0e0e0' : '#333',
                    resize: 'vertical'
                  }}
                  placeholder="Descreva sua mensagem aqui..."
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#1a237e',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background 0.3s',
                  width: '100%'
                }}
                onMouseOver={(e) => e.target.style.background = '#0d1a5c'}
                onMouseOut={(e) => e.target.style.background = '#1a237e'}
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer style={{
        background: darkMode ? '#0d1117' : '#2c3e50',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <p>&copy; 2025 GADYS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default Contato