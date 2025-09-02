import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function MapaLeaflet() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [categoria, setCategoria] = useState('todas')
  const [preco, setPreco] = useState('todos')
  const [distancia, setDistancia] = useState(3000)
  const [userLocation, setUserLocation] = useState(null)
  const [lugaresVisiveis, setLugaresVisiveis] = useState([])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }



  const calcularDistancia = (lat1, lng1, lat2, lng2) => {
    const R = 6371 // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setUserLocation({ lat, lng })
          
          // Buscar nome da localização usando coordenadas
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&limit=1`)
            .then(response => response.json())
            .then(data => {
              if (data && data.display_name) {
                const searchInput = document.getElementById('searchInput')
                if (searchInput) {
                  searchInput.value = data.display_name
                }
                alert(`Localização encontrada: ${data.display_name}`)
              } else {
                alert(`Localização encontrada: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
              }
            })
            .catch(() => {
              alert(`Localização encontrada: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
            })
        },
        (error) => {
          alert('Erro ao obter localização: ' + error.message)
        }
      )
    } else {
      alert('Geolocalização não é suportada neste navegador.')
    }
  }

  const lugares = [
    { nome: 'Cristo Redentor', lat: -22.9519, lng: -43.2105, cor: '#e74c3c', cidade: 'Rio de Janeiro - RJ', categoria: 'monumentos', preco: 'pago' },
    { nome: 'Pão de Açúcar', lat: -22.9487, lng: -43.1566, cor: '#3498db', cidade: 'Rio de Janeiro - RJ', categoria: 'natureza', preco: 'pago' },
    { nome: 'Cataratas do Iguaçu', lat: -25.6953, lng: -54.4367, cor: '#2ecc71', cidade: 'Foz do Iguaçu - PR', categoria: 'natureza', preco: 'pago' },
    { nome: 'Pelourinho', lat: -12.9714, lng: -38.5014, cor: '#f39c12', cidade: 'Salvador - BA', categoria: 'cultura', preco: 'gratuito' },
    { nome: 'Fernando de Noronha', lat: -3.8549, lng: -32.4229, cor: '#9b59b6', cidade: 'Pernambuco - PE', categoria: 'praias', preco: 'pago' },
    { nome: 'Pantanal', lat: -16.3394, lng: -56.4669, cor: '#1abc9c', cidade: 'Mato Grosso - MT', categoria: 'natureza', preco: 'pago' },
    { nome: 'Teatro Amazonas', lat: -3.1302, lng: -60.0231, cor: '#4caf50', cidade: 'Manaus - AM', categoria: 'monumentos', preco: 'pago' },
    { nome: 'Palácio da Justiça', lat: -3.1319, lng: -60.0212, cor: '#ff5722', cidade: 'Manaus - AM', categoria: 'monumentos', preco: 'gratuito' },
    { nome: 'Mercado Municipal Adolpho Lisboa', lat: -3.1365, lng: -60.0235, cor: '#795548', cidade: 'Manaus - AM', categoria: 'monumentos', preco: 'gratuito' },
    { nome: 'Igreja São Sebastião', lat: -3.1298, lng: -60.0178, cor: '#607d8b', cidade: 'Manaus - AM', categoria: 'monumentos', preco: 'gratuito' },
    { nome: 'Palácio Rio Negro', lat: -3.1285, lng: -60.0195, cor: '#9c27b0', cidade: 'Manaus - AM', categoria: 'monumentos', preco: 'pago' },
    { nome: 'Centro Cultural Palácio da Justiça', lat: -3.1315, lng: -60.0208, cor: '#ff9800', cidade: 'Manaus - AM', categoria: 'monumentos', preco: 'gratuito' },
    { nome: 'Monumento à Abertura dos Portos', lat: -3.1275, lng: -60.0165, cor: '#3f51b5', cidade: 'Manaus - AM', categoria: 'monumentos', preco: 'gratuito' },
    { nome: 'Encontro das Águas', lat: -3.1285, lng: -59.9070, cor: '#8bc34a', cidade: 'Manaus - AM', categoria: 'natureza', preco: 'gratuito' },
    { nome: 'Parque Nacional do Jaú', lat: -1.9000, lng: -61.6000, cor: '#cddc39', cidade: 'Novo Airão - AM', categoria: 'natureza', preco: 'pago' },
    { nome: 'Reserva Mamirauá', lat: -3.0833, lng: -64.8500, cor: '#66bb6a', cidade: 'Tefé - AM', categoria: 'natureza', preco: 'pago' },
    { nome: 'Floresta Amazônica', lat: -3.4653, lng: -62.2159, cor: '#2e7d32', cidade: 'Amazonas - AM', categoria: 'natureza', preco: 'gratuito' },
    { nome: 'Rio Amazonas', lat: -3.1190, lng: -60.0217, cor: '#1976d2', cidade: 'Amazonas - AM', categoria: 'natureza', preco: 'gratuito' }
  ]

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
    
    setLugaresVisiveis(lugares)
    
    // Aguardar um pouco antes de carregar o mapa
    setTimeout(() => {
      // Carregar Leaflet
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
      
      const script = document.createElement('script')
      script.src = `https://unpkg.com/leaflet@1.9.4/dist/leaflet.js?v=${Date.now()}`
      script.onload = () => {
        console.log('LEAFLET CARREGADO EM:', new Date().toLocaleTimeString())
        setTimeout(() => {
          if (window.L && document.getElementById('map')) {
            const map = window.L.map('map').setView([-14.2350, -51.9253], 4)
            
            window.L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
              attribution: '© Google Maps',
              maxZoom: 20
            }).addTo(map)
            
            window.mapMarkers = []
            
            // MARCADORES BONITOS - DEBUG
            console.log('TOTAL DE LUGARES:', lugares.length)
            lugares.forEach((lugar, index) => {
              console.log(`MARCADOR ${index + 1}:`, lugar.nome, 'Coordenadas:', lugar.lat, lugar.lng, 'Cor:', lugar.cor)
              
              try {
                const marker = window.L.circleMarker([lugar.lat, lugar.lng], {
                  radius: 12,
                  fillColor: lugar.cor,
                  color: 'white',
                  weight: 3,
                  opacity: 1,
                  fillOpacity: 0.9
                }).addTo(map)
                
                console.log(`MARCADOR ${index + 1} CRIADO COM SUCESSO`)
              
              const icone = lugar.categoria === 'monumentos' ? '🏛️' : 
                           lugar.categoria === 'natureza' ? '🌳' : 
                           lugar.categoria === 'praias' ? '🏖️' : '🏢'
              
              marker.bindPopup(`
                <div style="padding: 15px; font-family: Arial; min-width: 200px;">
                  <h3 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">${icone} ${lugar.nome}</h3>
                  <p style="margin: 0 0 10px 0; color: #666; font-size: 13px;">${lugar.cidade}</p>
                  <div style="display: flex; gap: 5px; margin-bottom: 12px;">
                    <span style="background: #667eea; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px;">${lugar.categoria}</span>
                    <span style="background: ${lugar.preco === 'gratuito' ? '#2ecc71' : '#e74c3c'}; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px;">${lugar.preco}</span>
                  </div>
                  <button 
                    onclick="window.location.href='${lugar.cidade.includes('AM') ? '/amazonas' : '/lugares'}'" 
                    style="
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      color: white;
                      border: none;
                      padding: 10px 20px;
                      border-radius: 25px;
                      cursor: pointer;
                      font-size: 13px;
                      font-weight: 600;
                      width: 100%;
                      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                      transition: all 0.3s ease;
                      text-transform: uppercase;
                      letter-spacing: 0.5px;
                    "
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.6)'"
                    onmouseout="this.style.transform='translateY(0px)'; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.4)'"
                  >
                    Ver Detalhes
                  </button>
                </div>
              `)
              
                window.mapMarkers.push(marker)
                console.log(`MARCADOR ${index + 1} ADICIONADO AO ARRAY. Total no array:`, window.mapMarkers.length)
              } catch (error) {
                console.error(`ERRO AO CRIAR MARCADOR ${index + 1}:`, error)
              }
            })
            
            console.log('RESUMO FINAL:')
            console.log('- Lugares processados:', lugares.length)
            console.log('- Marcadores no array:', window.mapMarkers.length)
            console.log('- Marcadores no mapa:', map._layers ? Object.keys(map._layers).length : 'N/A')
            
            window.currentMap = map
            console.log('TOTAL DE MARCADORES:', window.mapMarkers.length)
            alert(`${window.mapMarkers.length} MARCADORES COLORIDOS ADICIONADOS!`)
          }
        }, 500)
      }
      document.head.appendChild(script)
    }, 100)
    
    return () => document.head.removeChild(style)
  }, [])

  const buscarLocal = (local) => {
    if (!local) {
      console.log('Local vazio')
      return
    }
    
    console.log('Buscando local:', local)
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(local)}&limit=1`)
      .then(response => {
        console.log('Response status:', response.status)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log('Dados recebidos:', data)
        if (data.length > 0 && data[0].lat && data[0].lon) {
          const lat = parseFloat(data[0].lat)
          const lng = parseFloat(data[0].lon)
          if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            setUserLocation({ lat, lng })
            
            if (window.currentMap) {
              window.currentMap.setView([lat, lng], 10)
            }
            alert(`Local encontrado: ${local}`)
          } else {
            alert('Coordenadas inválidas')
          }
        } else {
          alert('Local não encontrado')
        }
      })
      .catch(error => {
        console.error('Erro na busca:', error)
        alert(`Erro na busca: ${error.message}`)
      })
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
          <li className="dropdown" style={{ position: 'relative' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Estados Brasileiros ▼</a>
            <div className="dropdown-content" style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: 'white',
              minWidth: '200px',
              maxHeight: '300px',
              overflowY: 'auto',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              borderRadius: '5px',
              display: 'none',
              zIndex: 1002
            }}>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Acre</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Alagoas</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Amapá</a>
              <Link to="/amazonas" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Amazonas</Link>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Bahia</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Ceará</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Distrito Federal</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Espírito Santo</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Goiás</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Maranhão</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Mato Grosso</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Mato Grosso do Sul</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Minas Gerais</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Pará</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Paraíba</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Paraná</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Pernambuco</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Piauí</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Rio de Janeiro</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Rio Grande do Norte</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Rio Grande do Sul</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Rondônia</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Roraima</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Santa Catarina</a>
              <Link to="/sao-paulo" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>São Paulo</Link>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Sergipe</a>
              <a href="#" style={{ color: 'black', textDecoration: 'none', padding: '0.5rem 1rem', display: 'block' }}>Tocantins</a>
            </div>
          </li>
          <li><Link to="/lugares" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Lugares</Link></li>
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none', padding: '0.5rem 1rem', cursor: 'not-allowed' }}>Mapa (atual)</a></li>
          <li><Link to="/adicionar-local" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Adicionar Local</Link></li>
          <li><Link to="/perfil" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Meu Perfil</Link></li>
          <li><Link to="/sobre" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Sobre</Link></li>
          <li><Link to="/contato" onClick={() => document.querySelector('.nav-links').classList.remove('active')} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Contato</Link></li>
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
            Mapa Interativo
          </h1>
          
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.8,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Explore pontos turísticos pelo Brasil<br />
            <span style={{ color: '#667eea', fontWeight: '500' }}>Descubra destinos incríveis em um mapa interativo</span>
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
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '3rem', 
            textAlign: 'center',
            color: darkMode ? 'white' : '#2c3e50',
            fontWeight: '700'
          }}>Mapa do Brasil</h2>
          
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '1.5rem',
                borderRadius: '15px'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: '#667eea'
                }}>Categoria:</label>
                <select 
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    background: darkMode ? '#333' : 'white',
                    color: darkMode ? 'white' : '#333',
                    fontSize: '1rem'
                  }}>
                  <option value="todas">Todas as categorias</option>
                  <option value="monumentos">🏛️ Monumentos</option>
                  <option value="natureza">🌳 Natureza</option>
                  <option value="praias">🏖️ Praias</option>
                  <option value="cultura">🏢 Cultura</option>
                </select>
              </div>
              
              <div style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '1.5rem',
                borderRadius: '15px'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: '#667eea'
                }}>Preço:</label>
                <select 
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    background: darkMode ? '#333' : 'white',
                    color: darkMode ? 'white' : '#333',
                    fontSize: '1rem'
                  }}>
                  <option value="todos">Todos os preços</option>
                  <option value="gratuito">🆓 Gratuito</option>
                  <option value="pago">💵 Pago</option>
                </select>
              </div>
              
              <div style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '1.5rem',
                borderRadius: '15px'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: '#667eea'
                }}>Distância máxima:</label>
                <input 
                  type="range" 
                  min="1" 
                  max="3000" 
                  value={distancia}
                  onChange={(e) => {
                    const novaDistancia = parseInt(e.target.value)
                    console.log('Distância alterada para:', novaDistancia)
                    setDistancia(novaDistancia)
                  }}
                  style={{
                    width: '100%',
                    marginBottom: '0.5rem'
                  }}
                />
                <div style={{ textAlign: 'center', fontSize: '0.9rem', opacity: 0.7 }}>{distancia}km</div>
              </div>
              
              <div style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '1.5rem',
                borderRadius: '15px'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: '#667eea'
                }}>Localização:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input 
                    id="searchInput"
                    type="text"
                    placeholder="Buscar local (ex: Manaus)"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(102, 126, 234, 0.3)',
                      background: darkMode ? '#333' : 'white',
                      color: darkMode ? 'white' : '#333',
                      fontSize: '0.9rem'
                    }}
                  />
                  <button 
                    onClick={getMyLocation}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(102, 126, 234, 0.3)',
                      background: '#667eea',
                      color: 'white',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                    📍 Minha Localização
                  </button>
                  <button 
                    onClick={() => {
                      if (window.currentMap) {
                        window.currentMap.setView([-14.2350, -51.9253], 4)
                      }
                      setUserLocation(null)
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(102, 126, 234, 0.3)',
                      background: '#764ba2',
                      color: 'white',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                    🇧🇷 Ver Brasil Inteiro
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <button 
                onClick={() => {
                  console.log('=== APLICANDO FILTROS ===')
                  
                  let filtrados = lugares
                  
                  // Filtro por categoria
                  if (categoria !== 'todas') {
                    filtrados = filtrados.filter(lugar => lugar.categoria === categoria)
                    console.log(`Filtro categoria '${categoria}':`, filtrados.length, 'lugares')
                  }
                  
                  // Filtro por preço
                  if (preco !== 'todos') {
                    filtrados = filtrados.filter(lugar => lugar.preco === preco)
                    console.log(`Filtro preço '${preco}':`, filtrados.length, 'lugares')
                  }
                  
                  // Filtro por distância
                  if (userLocation) {
                    filtrados = filtrados.filter(lugar => {
                      const distanciaKm = calcularDistancia(
                        userLocation.lat, userLocation.lng,
                        lugar.lat, lugar.lng
                      )
                      return distanciaKm <= parseInt(distancia)
                    })
                    console.log(`Filtro distância ${distancia}km:`, filtrados.length, 'lugares')
                  }
                  
                  // Atualizar lista
                  setLugaresVisiveis(filtrados)
                  
                  // Atualizar marcadores no mapa
                  if (window.currentMap && window.mapMarkers) {
                    console.log('Removendo', window.mapMarkers.length, 'marcadores antigos')
                    
                    // Remover todos os marcadores
                    window.mapMarkers.forEach(marker => {
                      window.currentMap.removeLayer(marker)
                    })
                    window.mapMarkers = []
                    
                    // Adicionar apenas marcadores filtrados
                    console.log('Adicionando', filtrados.length, 'marcadores filtrados:')
                    filtrados.forEach((lugar, index) => {
                      console.log(`  ${index + 1}. ${lugar.nome} em [${lugar.lat}, ${lugar.lng}] - Cor: ${lugar.cor}`)
                      
                      // Verificar se já existe marcador nessa posição
                      const coordsExistentes = window.mapMarkers.find(m => 
                        m.getLatLng && m.getLatLng().lat === lugar.lat && m.getLatLng().lng === lugar.lng
                      )
                      if (coordsExistentes) {
                        console.log(`    ATENÇÃO: Já existe marcador em [${lugar.lat}, ${lugar.lng}]`)
                      }
                      
                      const marker = window.L.circleMarker([lugar.lat, lugar.lng], {
                        radius: 15, // Aumentando o raio para ficar mais visível
                        fillColor: lugar.cor,
                        color: 'white',
                        weight: 4,
                        opacity: 1,
                        fillOpacity: 1
                      }).addTo(window.currentMap)
                      
                      console.log(`    Marcador ${index + 1} criado com sucesso`)
                      
                      const icone = lugar.categoria === 'monumentos' ? '🏛️' : 
                                   lugar.categoria === 'natureza' ? '🌳' : 
                                   lugar.categoria === 'praias' ? '🏖️' : '🏢'
                      
                      marker.bindPopup(`
                        <div style="padding: 15px; font-family: Arial; min-width: 200px;">
                          <h3 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">${icone} ${lugar.nome}</h3>
                          <p style="margin: 0 0 10px 0; color: #666; font-size: 13px;">${lugar.cidade}</p>
                          <div style="display: flex; gap: 5px; margin-bottom: 12px;">
                            <span style="background: #667eea; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px;">${lugar.categoria}</span>
                            <span style="background: ${lugar.preco === 'gratuito' ? '#2ecc71' : '#e74c3c'}; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px;">${lugar.preco}</span>
                          </div>
                          <button 
                            onclick="window.location.href='${lugar.cidade.includes('AM') ? '/amazonas' : '/lugares'}'" 
                            style="
                              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                              color: white;
                              border: none;
                              padding: 10px 20px;
                              border-radius: 25px;
                              cursor: pointer;
                              font-size: 13px;
                              font-weight: 600;
                              width: 100%;
                              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                              transition: all 0.3s ease;
                              text-transform: uppercase;
                              letter-spacing: 0.5px;
                            "
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.6)'"
                            onmouseout="this.style.transform='translateY(0px)'; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.4)'"
                          >
                            Ver Detalhes
                          </button>
                        </div>
                      `)
                      
                      window.mapMarkers.push(marker)
                      console.log(`    Marcador ${index + 1} adicionado ao array. Total: ${window.mapMarkers.length}`)
                    })
                    
                    console.log('\n=== RESUMO FINAL ===')
                    console.log('Lugares filtrados:', filtrados.length)
                    console.log('Marcadores criados:', window.mapMarkers.length)
                    console.log('Lista de marcadores:')
                    window.mapMarkers.forEach((marker, i) => {
                      if (marker.getLatLng) {
                        const pos = marker.getLatLng()
                        console.log(`  Marcador ${i + 1}: [${pos.lat}, ${pos.lng}]`)
                      }
                    })
                  }
                  
                  // Buscar local se digitado
                  const searchInput = document.getElementById('searchInput')
                  if (searchInput && searchInput.value.trim()) {
                    console.log('Buscando local:', searchInput.value)
                    buscarLocal(searchInput.value)
                  }
                  
                  const msgDistancia = userLocation ? ` (dentro de ${distancia}km)` : ''
                  alert(`Filtros aplicados! ${filtrados.length} lugares mostrados${msgDistancia}`)
                }}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 3rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                🔍 Aplicar Filtros
              </button>
            </div>
          
            <div style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              padding: '1rem',
              borderRadius: '20px',
              minHeight: '600px',
              border: '1px solid rgba(102, 126, 234, 0.3)'
            }}>
              <div id="map" style={{
                width: '100%',
                height: '580px',
                borderRadius: '15px'
              }}></div>
            </div>
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
          }}>Pontos Populares</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {lugaresVisiveis.map((ponto, index) => (
              <div key={index} style={{
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                padding: '2rem',
                borderRadius: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#667eea'
                }}>{ponto.nome}</h3>
                <p style={{ 
                  opacity: 0.7,
                  fontSize: '1rem',
                  marginBottom: '0.5rem'
                }}>{ponto.cidade}</p>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>{ponto.categoria}</span>
                  <span style={{
                    background: ponto.preco === 'gratuito' ? '#2ecc71' : '#e74c3c',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>{ponto.preco === 'gratuito' ? '🆓 Gratuito' : '💵 Pago'}</span>
                </div>
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
            <Link 
              to="/"
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
                letterSpacing: '0.5px',
                textDecoration: 'none'
              }}
            >
              Voltar ao Início
            </Link>
            
            <Link 
              to="/lugares"
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
                letterSpacing: '0.5px',
                textDecoration: 'none'
              }}
            >
              Ver Lugares
            </Link>
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

export default MapaLeaflet