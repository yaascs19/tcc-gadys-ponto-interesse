import { useState, useEffect } from 'react'

function PerfilPage({ setCurrentPage }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState(() => {
    return JSON.parse(localStorage.getItem('profileData')) || {
      nome: 'João Silva',
      email: 'joao.silva@email.com',
      telefone: '(11) 99999-9999',
      cidade: 'São Paulo, SP',
      foto: null
    }
  })
  
  const [showPhotoOptions, setShowPhotoOptions] = useState(false)
  const [urlInput, setUrlInput] = useState('')

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }
  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newData = { ...profileData, foto: e.target.result }
        setProfileData(newData)
        localStorage.setItem('profileData', JSON.stringify(newData))
        setShowPhotoOptions(false)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleEmojiSelect = (emoji) => {
    const newData = { ...profileData, foto: emoji }
    setProfileData(newData)
    localStorage.setItem('profileData', JSON.stringify(newData))
    setShowPhotoOptions(false)
  }
  
  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      const newData = { ...profileData, foto: urlInput.trim() }
      setProfileData(newData)
      localStorage.setItem('profileData', JSON.stringify(newData))
      setUrlInput('')
      setShowPhotoOptions(false)
    }
  }
  
  const handleSave = () => {
    localStorage.setItem('profileData', JSON.stringify(profileData))
    setEditMode(false)
    alert('Dados salvos com sucesso!')
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
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      color: darkMode ? 'white' : '#2c3e50',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: darkMode ? 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)' : 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
        zIndex: 1
      }} />

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
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
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
            background: '#1a237e',
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
          <li><a href="/" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Início</a></li>
          <li><a href="/amazonas.html" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Amazonas</a></li>
          <li><a href="/lugares.html" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Lugares</a></li>
          <li><a href="/mapa-real-api.html" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Mapa</a></li>
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none', padding: '0.5rem 1rem', cursor: 'not-allowed' }}>Perfil (atual)</a></li>
          <li><a href="#" onClick={() => {setCurrentPage('sobrepage'); document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Sobre</a></li>
          <li><a href="#" onClick={() => {setCurrentPage('contatopage'); document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Contato</a></li>
        </ul>
      </header>

      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <section style={{
          textAlign: 'center',
          padding: '8rem 0 6rem',
          background: darkMode ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
          borderRadius: '0 0 50px 50px',
          marginBottom: '6rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem',
            letterSpacing: '-3px',
            lineHeight: '1.1'
          }}>
            Meu Perfil
          </h1>
          
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.8,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Gerencie suas informações pessoais<br />
            <span style={{ color: '#667eea', fontWeight: '500' }}>Personalize sua experiência no GADYS</span>
          </p>
        </section>

        <section style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          boxShadow: '0 30px 60px rgba(102, 126, 234, 0.1)'
        }}>
          <h2 id="dados-pessoais" style={{ 
            fontSize: '3rem', 
            marginBottom: '3rem', 
            textAlign: 'center',
            color: darkMode ? 'white' : '#2c3e50',
            fontWeight: '700'
          }}>Informações Pessoais</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: profileData.foto && !profileData.foto.startsWith('data:') && !profileData.foto.startsWith('http') ? 'linear-gradient(135deg, #667eea, #764ba2)' : profileData.foto ? `url(${profileData.foto})` : 'linear-gradient(135deg, #667eea, #764ba2)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  margin: '0 auto 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                onMouseEnter={(e) => {
                  const overlay = e.currentTarget.querySelector('.camera-overlay')
                  if (overlay) overlay.style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  const overlay = e.currentTarget.querySelector('.camera-overlay')
                  if (overlay) overlay.style.opacity = '0'
                }}
                >
                  {profileData.foto && !profileData.foto.startsWith('data:') && !profileData.foto.startsWith('http') ? profileData.foto : !profileData.foto ? '👤' : ''}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    fontSize: '0.8rem',
                    padding: '0.2rem',
                    textAlign: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s'
                  }}
                  className="camera-overlay"
                  >📷</div>
                </div>
                
                {showPhotoOptions && (
                  <div style={{
                    position: 'absolute',
                    top: '140px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: darkMode ? '#333' : 'white',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    padding: '1rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    minWidth: '300px'
                  }}>
                    <h4 style={{ marginBottom: '1rem', textAlign: 'center' }}>Escolher Foto</h4>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <button 
                        onClick={() => document.getElementById('photoInput').click()}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          background: '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          marginBottom: '0.5rem'
                        }}
                      >
                        📷 Escolher do Computador
                      </button>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Emojis:</p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {['😊', '😎', '🤓', '😍', '😄', '😁', '🥰', '😌'].map(emoji => (
                          <button 
                            key={emoji}
                            onClick={() => handleEmojiSelect(emoji)}
                            style={{
                              fontSize: '2rem',
                              background: 'none',
                              border: '1px solid #ccc',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              padding: '0.2rem'
                            }}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <input 
                        type="url"
                        placeholder="URL da imagem"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          background: darkMode ? '#444' : 'white',
                          color: darkMode ? 'white' : '#333',
                          marginBottom: '0.5rem'
                        }}
                      />
                      <button 
                        onClick={handleUrlSubmit}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          background: '#764ba2',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        🔗 Usar URL
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => setShowPhotoOptions(false)}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        background: '#ccc',
                        color: '#333',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
                
                <input 
                  id="photoInput"
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>{profileData.nome}</h3>
              <p style={{ opacity: 0.7, fontSize: '1rem' }}>{profileData.email}</p>
            </div>
            
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '2rem',
              borderRadius: '20px'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '600', color: '#667eea' }}>Dados Pessoais</h3>
              {editMode ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <strong>Nome:</strong>
                    <input 
                      type="text" 
                      value={profileData.nome}
                      onChange={(e) => setProfileData({...profileData, nome: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginTop: '0.5rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        background: darkMode ? '#333' : 'white',
                        color: darkMode ? 'white' : '#333'
                      }}
                    />
                  </div>
                  <div>
                    <strong>Email:</strong>
                    <input 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginTop: '0.5rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        background: darkMode ? '#333' : 'white',
                        color: darkMode ? 'white' : '#333'
                      }}
                    />
                  </div>
                  <div>
                    <strong>Telefone:</strong>
                    <input 
                      type="text" 
                      value={profileData.telefone}
                      onChange={(e) => setProfileData({...profileData, telefone: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginTop: '0.5rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        background: darkMode ? '#333' : 'white',
                        color: darkMode ? 'white' : '#333'
                      }}
                    />
                  </div>
                  <div>
                    <strong>Cidade:</strong>
                    <input 
                      type="text" 
                      value={profileData.cidade}
                      onChange={(e) => setProfileData({...profileData, cidade: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginTop: '0.5rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        background: darkMode ? '#333' : 'white',
                        color: darkMode ? 'white' : '#333'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button 
                      onClick={handleSave}
                      style={{
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >Salvar</button>
                    <button 
                      onClick={() => setEditMode(false)}
                      style={{
                        background: '#ccc',
                        color: '#333',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >Cancelar</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <strong>Nome:</strong> {profileData.nome}
                  </div>
                  <div>
                    <strong>Email:</strong> {profileData.email}
                  </div>
                  <div>
                    <strong>Telefone:</strong> {profileData.telefone}
                  </div>
                  <div>
                    <strong>Cidade:</strong> {profileData.cidade}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          boxShadow: '0 30px 60px rgba(102, 126, 234, 0.1)'
        }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '3rem',
            textAlign: 'center',
            fontWeight: '700'
          }}>Preferências de Viagem</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {[
              { title: 'Destinos Favoritos', desc: 'Praias, Montanhas, Cidades Históricas', color: '#667eea' },
              { title: 'Tipo de Turismo', desc: 'Ecoturismo, Turismo Cultural', color: '#764ba2' },
              { title: 'Orçamento Preferido', desc: 'Médio (R$ 500 - R$ 1500)', color: '#f093fb' },
              { title: 'Época do Ano', desc: 'Verão, Inverno', color: '#ff6b6b' }
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
                  padding: '3rem 2rem',
                  borderRadius: '25px',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${item.color}, transparent)`
                }} />
                <h3 style={{ 
                  fontSize: '1.8rem', 
                  marginBottom: '1.5rem',
                  fontWeight: '600',
                  color: item.color
                }}>{item.title}</h3>
                <p style={{ 
                  opacity: 0.8,
                  lineHeight: 1.6,
                  fontSize: '1.1rem',
                  color: 'white'
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          background: darkMode ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)',
          padding: '5rem 4rem',
          borderRadius: '30px',
          marginBottom: '6rem',
          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '4rem',
            textAlign: 'center',
            fontWeight: '700'
          }}>Histórico de Viagens</h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { destino: 'Rio de Janeiro', data: 'Janeiro 2024', avaliacao: '⭐⭐⭐⭐⭐' },
              { destino: 'Salvador', data: 'Março 2024', avaliacao: '⭐⭐⭐⭐' },
              { destino: 'Gramado', data: 'Julho 2024', avaliacao: '⭐⭐⭐⭐⭐' }
            ].map((viagem, index) => (
              <div key={index} style={{ 
                textAlign: 'center',
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '2rem',
                borderRadius: '20px',
                minWidth: '200px'
              }}>
                <h4 style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#667eea'
                }}>{viagem.destino}</h4>
                <p style={{ 
                  opacity: 0.7,
                  fontSize: '1rem',
                  marginBottom: '0.5rem'
                }}>{viagem.data}</p>
                <p style={{ fontSize: '1.2rem' }}>{viagem.avaliacao}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          textAlign: 'center',
          padding: '4rem 0 6rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => setCurrentPage('home')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '1.5rem 3rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
                letterSpacing: '0.5px'
              }}
            >
              Voltar ao Início
            </button>
            
            <button 
              onClick={() => {
                setEditMode(true)
                setTimeout(() => {
                  document.getElementById('dados-pessoais')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
              style={{
                background: 'transparent',
                color: darkMode ? 'white' : '#2c3e50',
                border: darkMode ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(44, 62, 80, 0.3)',
                padding: '1.5rem 3rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                letterSpacing: '0.5px'
              }}
            >
              Editar Perfil
            </button>
          </div>
        </section>
      </main>

      <footer style={{
        background: darkMode ? 'rgba(15, 12, 41, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        padding: '3rem',
        borderTop: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        <p style={{ opacity: 0.7, fontSize: '1rem' }}>&copy; 2025 GADYS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default PerfilPage