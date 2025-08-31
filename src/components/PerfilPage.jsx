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
  const [showEditModal, setShowEditModal] = useState(false)
  const [tempProfileData, setTempProfileData] = useState(profileData)

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

  const buttonHoverStyle = {
    onMouseEnter: (e) => {
      e.target.style.transform = 'translateY(-3px) scale(1.05)'
      e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)'
    },
    onMouseLeave: (e) => {
      e.target.style.transform = 'translateY(0) scale(1)'
      e.target.style.boxShadow = 'none'
    }
  }

  const redButtonHoverStyle = {
    onMouseEnter: (e) => {
      e.target.style.transform = 'translateY(-3px) scale(1.05)'
      e.target.style.boxShadow = '0 10px 25px rgba(220, 53, 69, 0.4)'
    },
    onMouseLeave: (e) => {
      e.target.style.transform = 'translateY(0) scale(1)'
      e.target.style.boxShadow = 'none'
    }
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
          <li><a href="#" onClick={() => {setCurrentPage('mapapage'); document.querySelector('.nav-links').classList.remove('active')}} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Mapa</a></li>
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
          padding: '3rem 2rem',
          borderRadius: '20px',
          marginBottom: '4rem',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          boxShadow: '0 15px 30px rgba(102, 126, 234, 0.1)',
          maxWidth: '900px',
          margin: '0 auto 4rem'
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
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            maxWidth: '900px',
            margin: '0 auto',
            alignItems: 'start'
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
              <p style={{ opacity: 0.7, fontSize: '1rem', marginBottom: '0.5rem' }}>{profileData.email}</p>
              <p style={{ opacity: 0.7, fontSize: '1rem', marginBottom: '0.5rem' }}>{profileData.telefone}</p>
              <p style={{ opacity: 0.7, fontSize: '1rem' }}>{profileData.cidade}</p>
              
              {showEditModal && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0,0,0,0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10000
                }}>
                  <div style={{
                    background: darkMode ? '#333' : 'white',
                    padding: '2rem',
                    borderRadius: '20px',
                    maxWidth: '400px',
                    width: '90%',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                  }}>
                    <h3 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#667eea' }}>Editar Perfil</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nome:</label>
                        <input 
                          type="text" 
                          value={tempProfileData.nome}
                          onChange={(e) => setTempProfileData({...tempProfileData, nome: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '10px',
                            border: '1px solid #ccc',
                            background: darkMode ? '#444' : 'white',
                            color: darkMode ? 'white' : '#333',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email:</label>
                        <input 
                          type="email" 
                          value={tempProfileData.email}
                          onChange={(e) => setTempProfileData({...tempProfileData, email: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '10px',
                            border: '1px solid #ccc',
                            background: darkMode ? '#444' : 'white',
                            color: darkMode ? 'white' : '#333',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Telefone:</label>
                        <input 
                          type="text" 
                          value={tempProfileData.telefone}
                          onChange={(e) => setTempProfileData({...tempProfileData, telefone: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '10px',
                            border: '1px solid #ccc',
                            background: darkMode ? '#444' : 'white',
                            color: darkMode ? 'white' : '#333',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Cidade:</label>
                        <input 
                          type="text" 
                          value={tempProfileData.cidade}
                          onChange={(e) => setTempProfileData({...tempProfileData, cidade: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '10px',
                            border: '1px solid #ccc',
                            background: darkMode ? '#444' : 'white',
                            color: darkMode ? 'white' : '#333',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                      <button 
                        onClick={() => {
                          setProfileData(tempProfileData)
                          localStorage.setItem('profileData', JSON.stringify(tempProfileData))
                          setShowEditModal(false)
                          alert('Dados salvos com sucesso!')
                        }}
                        style={{
                          flex: 1,
                          background: '#667eea',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        Salvar
                      </button>
                      
                      <button 
                        onClick={() => setShowEditModal(false)}
                        style={{
                          flex: 1,
                          background: '#ccc',
                          color: '#333',
                          border: 'none',
                          padding: '0.75rem',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {[
                { titulo: 'Último Acesso:', valor: new Date().toLocaleString('pt-BR') },
                { titulo: 'Total de Acessos:', valor: `${JSON.parse(localStorage.getItem('userAccess'))?.find(user => user.userName === localStorage.getItem('userName'))?.accessCount || 1} vezes` },
                { titulo: 'Locais Adicionados:', valor: '0 locais' },
                { titulo: 'Avaliações Feitas:', valor: '0 avaliações' },
                { titulo: 'Comentários Feitos:', valor: '0 comentários' }
              ].map((item, index) => (
                <div key={index} style={{
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  padding: '1rem 1.5rem',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid rgba(102, 126, 234, 0.1)'
                }}>
                  <span style={{ fontSize: '1rem', fontWeight: '500', color: darkMode ? '#ccc' : '#666' }}>{item.titulo}</span>
                  <span style={{ fontSize: '1rem', fontWeight: '600', color: '#667eea' }}>{item.valor}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{
          textAlign: 'center',
          padding: '4rem 0 6rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
            <button 
              onClick={() => {
                setTempProfileData(profileData)
                setShowEditModal(true)
              }}
              {...buttonHoverStyle}
              style={{
                background: 'transparent',
                color: darkMode ? 'white' : '#2c3e50',
                border: darkMode ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(44, 62, 80, 0.3)',
                padding: '1rem 2rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              Editar Perfil
            </button>
            
            <button 
              onClick={() => window.location.href = '/adicionar-locais.html'}
              {...buttonHoverStyle}
              style={{
                background: 'transparent',
                color: darkMode ? 'white' : '#2c3e50',
                border: darkMode ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(44, 62, 80, 0.3)',
                padding: '1rem 2rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              Adicionar Locais
            </button>
            
            <button 
              {...buttonHoverStyle}
              style={{
                background: 'transparent',
                color: darkMode ? 'white' : '#2c3e50',
                border: darkMode ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(44, 62, 80, 0.3)',
                padding: '1rem 2rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              Minhas Perguntas
            </button>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
            <button 
              {...buttonHoverStyle}
              style={{
                background: 'transparent',
                color: darkMode ? 'white' : '#2c3e50',
                border: darkMode ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(44, 62, 80, 0.3)',
                padding: '1rem 2rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              Avaliações e Comentários
            </button>
            
            <button 
              onClick={() => setCurrentPage('home')}
              {...buttonHoverStyle}
              style={{
                background: 'transparent',
                color: darkMode ? 'white' : '#2c3e50',
                border: darkMode ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(44, 62, 80, 0.3)',
                padding: '1rem 2rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              Voltar ao Início
            </button>
            
            <button 
              onClick={() => {
                localStorage.removeItem('isLoggedIn')
                localStorage.removeItem('userType')
                localStorage.removeItem('userName')
                setCurrentPage('home')
              }}
              {...redButtonHoverStyle}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              Sair
            </button>
            </div>
          </div>
        </section>
      </main>

      <footer style={{
        background: darkMode ? 'rgba(15, 12, 41, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        padding: '3rem',
        borderTop: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: showEditModal ? -1 : 10
      }}>
        <p style={{ opacity: 0.7, fontSize: '1rem' }}>&copy; 2025 GADYS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default PerfilPage