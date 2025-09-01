import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function MapaSimples() {
  const mapRef = useRef(null)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [categoria, setCategoria] = useState('todas')
  const [preco, setPreco] = useState('todos')
  const [lugaresVisiveis, setLugaresVisiveis] = useState([])

  const lugares = [
    { nome: 'Cristo Redentor', lat: -22.9519, lng: -43.2105, cor: '#e74c3c', cidade: 'Rio de Janeiro - RJ', categoria: 'monumentos', preco: 'pago' },
    { nome: 'Pão de Açúcar', lat: -22.9487, lng: -43.1566, cor: '#3498db', cidade: 'Rio de Janeiro - RJ', categoria: 'natureza', preco: 'pago' },
    { nome: 'Teatro Amazonas', lat: -3.1302, lng: -60.0231, cor: '#4caf50', cidade: 'Manaus - AM', categoria: 'monumentos', preco: 'pago' },
    { nome: 'Palácio da Justiça', lat: -3.1319, lng: -60.0212, cor: '#ff5722', cidade: 'Manaus - AM', categoria: 'monumentos', preco: 'gratuito' },
    { nome: 'Encontro das Águas', lat: -3.1285, lng: -59.9070, cor: '#8bc34a', cidade: 'Manaus - AM', categoria: 'natureza', preco: 'gratuito' }
  ]

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  useEffect(() => {
    setLugaresVisiveis(lugares)

    // Carregar Leaflet
    const loadLeaflet = async () => {
      if (!window.L) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)

        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        
        await new Promise((resolve) => {
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      if (mapRef.current && window.L) {
        const map = window.L.map(mapRef.current).setView([-14.2350, -51.9253], 4)
        
        window.L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          attribution: '© Mapbox © OpenStreetMap',
          tileSize: 512,
          zoomOffset: -1
        }).addTo(map)

        // Adicionar marcadores personalizados
        lugares.forEach(lugar => {
          const customIcon = window.L.divIcon({
            html: `<div style="
              background: ${lugar.cor};
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 4px 15px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
            ">${lugar.categoria === 'monumentos' ? '🏛️' : '🌳'}</div>`,
            className: 'custom-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })
          
          window.L.marker([lugar.lat, lugar.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(`
              <div style="font-family: Inter, sans-serif; padding: 10px; min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">${lugar.nome}</h3>
                <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">${lugar.cidade}</p>
                <div style="display: flex; gap: 5px; margin-top: 8px;">
                  <span style="background: #667eea; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${lugar.categoria}</span>
                  <span style="background: ${lugar.preco === 'gratuito' ? '#2ecc71' : '#e74c3c'}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${lugar.preco}</span>
                </div>
              </div>
            `)
        })

        window.currentMap = map
      }
    }

    loadLeaflet()
  }, [])

  const aplicarFiltros = () => {
    let filtrados = lugares

    if (categoria !== 'todas') {
      filtrados = filtrados.filter(lugar => lugar.categoria === categoria)
    }

    if (preco !== 'todos') {
      filtrados = filtrados.filter(lugar => lugar.preco === preco)
    }

    setLugaresVisiveis(filtrados)
    alert(`Filtros aplicados! ${filtrados.length} lugares encontrados.`)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode 
        ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' 
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: darkMode ? 'white' : 'white',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      
      <header style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        marginBottom: '3rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>Mapa Interativo</h1>
        
        <button 
          onClick={toggleTheme}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.8rem',
            borderRadius: '15px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        {/* Filtros */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          padding: '2rem',
          borderRadius: '25px',
          marginBottom: '3rem',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <select 
              value={categoria} 
              onChange={(e) => setCategoria(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '15px',
                fontSize: '1rem',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer'
              }}
            >
              <option value="todas" style={{background: '#333', color: 'white'}}>🌟 Todas as categorias</option>
              <option value="monumentos" style={{background: '#333', color: 'white'}}>🏛️ Monumentos</option>
              <option value="natureza" style={{background: '#333', color: 'white'}}>🌳 Natureza</option>
            </select>

            <select 
              value={preco} 
              onChange={(e) => setPreco(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '15px',
                fontSize: '1rem',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer'
              }}
            >
              <option value="todos" style={{background: '#333', color: 'white'}}>💰 Todos os preços</option>
              <option value="gratuito" style={{background: '#333', color: 'white'}}>🆓 Gratuito</option>
              <option value="pago" style={{background: '#333', color: 'white'}}>💵 Pago</option>
            </select>

            <button 
              onClick={aplicarFiltros} 
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
                border: '1px solid rgba(255,255,255,0.4)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '15px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
            >
              ✨ Aplicar Filtros
            </button>
          </div>
        </div>

        {/* Mapa */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          padding: '2rem',
          borderRadius: '25px',
          marginBottom: '3rem',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div 
            ref={mapRef} 
            style={{ 
              width: '100%', 
              height: '600px', 
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
            }}
          ></div>
        </div>

        {/* Cards dos Lugares */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          padding: '3rem 2rem',
          borderRadius: '25px',
          marginBottom: '3rem',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'white'
          }}>Pontos Turísticos</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {lugaresVisiveis.map((lugar, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(15px)',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'white'
                }}>{lugar.nome}</h3>
                <p style={{ 
                  opacity: 0.9,
                  marginBottom: '0.5rem',
                  color: 'white'
                }}>{lugar.cidade}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>{lugar.categoria}</span>
                  <span style={{
                    background: lugar.preco === 'gratuito' ? 'rgba(46, 204, 113, 0.8)' : 'rgba(231, 76, 60, 0.8)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>{lugar.preco === 'gratuito' ? '🆓 Gratuito' : '💵 Pago'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botão Voltar */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link 
            to="/" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
              border: '1px solid rgba(255,255,255,0.4)',
              color: 'white',
              padding: '1.5rem 3rem',
              borderRadius: '25px',
              fontSize: '1.2rem',
              fontWeight: '600',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}
          >
            🏠 Voltar ao Início
          </Link>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}

export default MapaSimples