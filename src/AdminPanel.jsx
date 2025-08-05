import { useState, useEffect } from 'react'
import './AdminPanel.css'

function AdminPanel() {
  const [expandedCard, setExpandedCard] = useState(null)
  const [pendingLocations, setPendingLocations] = useState([])
  const [approvedLocations, setApprovedLocations] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  
  useEffect(() => {
    // Carrega locais pendentes do localStorage
    const stored = localStorage.getItem('pendingLocations')
    if (stored) {
      setPendingLocations(JSON.parse(stored))
    } else {
      // Dados iniciais mockados
      const initialData = [
        {
          id: 1,
          name: 'Cachoeira Secreta',
          city: 'Manaus, AM',
          category: 'Natureza',
          submittedBy: 'João Silva',
          date: '2025-01-15',
          description: 'Uma cachoeira escondida na floresta amazônica, com águas cristalinas e uma trilha de 2km. Local perfeito para relaxar e se conectar com a natureza.',
          coordinates: '-3.1190, -60.0217'
        },
        {
          id: 2,
          name: 'Restaurante Típico da Vovó',
          city: 'Parintins, AM',
          category: 'Gastronomia',
          submittedBy: 'Maria Santos',
          date: '2025-01-14',
          description: 'Restaurante familiar que serve pratos típicos da região há 30 anos. Especialidade em pirarucu assado e tucumã.',
          coordinates: '-2.6287, -56.7356'
        }
      ]
      setPendingLocations(initialData)
      localStorage.setItem('pendingLocations', JSON.stringify(initialData))
    }
    
    // Carrega locais aprovados
    const approvedStored = localStorage.getItem('approvedLocations')
    if (approvedStored) {
      setApprovedLocations(JSON.parse(approvedStored))
    }
  }, [])

  const handleApprove = (id) => {
    const locationToApprove = pendingLocations.find(location => location.id === id)
    const updatedLocations = pendingLocations.filter(location => location.id !== id)
    
    // Move para lista de aprovados
    let approvedLocations = JSON.parse(localStorage.getItem('approvedLocations')) || []
    approvedLocations.push(locationToApprove)
    localStorage.setItem('approvedLocations', JSON.stringify(approvedLocations))
    
    // Adiciona automaticamente às categorias do Amazonas se for do estado AM
    if (locationToApprove.city.toLowerCase().includes('am') || locationToApprove.city.toLowerCase().includes('amazonas')) {
      let locaisAdicionados = JSON.parse(localStorage.getItem('locaisAdicionados')) || []
      
      const novoLocal = {
        nome: locationToApprove.name,
        cidade: locationToApprove.city.split(',')[0].trim(),
        estado: 'AM',
        categoria: locationToApprove.category.toLowerCase(),
        descricao: locationToApprove.description,
        imagem: '/minha-imagem.jpg' // Imagem padrão
      }
      
      locaisAdicionados.push(novoLocal)
      localStorage.setItem('locaisAdicionados', JSON.stringify(locaisAdicionados))
    }
    
    // Remove da lista de pendentes
    setPendingLocations(updatedLocations)
    localStorage.setItem('pendingLocations', JSON.stringify(updatedLocations))
    
    alert(`Local aprovado e adicionado automaticamente às categorias do Amazonas!`)
  }

  const handleReject = (id) => {
    const updatedLocations = pendingLocations.filter(location => location.id !== id)
    setPendingLocations(updatedLocations)
    localStorage.setItem('pendingLocations', JSON.stringify(updatedLocations))
    alert(`Local rejeitado e removido da lista!`)
  }

  const handleRemove = (id) => {
    if (confirm('Tem certeza que deseja remover este local?')) {
      const locationToRemove = approvedLocations.find(location => location.id === id)
      const updatedApproved = approvedLocations.filter(location => location.id !== id)
      
      // Remove da lista de aprovados
      setApprovedLocations(updatedApproved)
      localStorage.setItem('approvedLocations', JSON.stringify(updatedApproved))
      
      // Remove das categorias do Amazonas se existir
      if (locationToRemove && (locationToRemove.city.toLowerCase().includes('am') || locationToRemove.city.toLowerCase().includes('amazonas'))) {
        let locaisAdicionados = JSON.parse(localStorage.getItem('locaisAdicionados')) || []
        locaisAdicionados = locaisAdicionados.filter(local => local.nome !== locationToRemove.name)
        localStorage.setItem('locaisAdicionados', JSON.stringify(locaisAdicionados))
      }
      
      alert('Local removido com sucesso!')
    }
  }

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pendentes ({pendingLocations.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Aprovados ({approvedLocations.length})
          </button>
        </div>
      </div>
      
      <div className="admin-grid">
        {activeTab === 'pending' && pendingLocations.map(location => (
          <div key={location.id} className={`admin-card ${expandedCard === location.id ? 'expanded' : ''}`}>
            <div className="card-header">
              <h3>{location.name}</h3>
              <span className="category-badge">{location.category}</span>
            </div>
            
            <div className="card-info">
              <p><strong>Cidade:</strong> {location.city}</p>
              <p><strong>Enviado por:</strong> {location.submittedBy}</p>
              <p><strong>Data:</strong> {location.date}</p>
            </div>

            {expandedCard === location.id && (
              <div className="card-details">
                <p><strong>Descrição:</strong> {location.description}</p>
                <p><strong>Coordenadas:</strong> {location.coordinates}</p>
              </div>
            )}

            <div className="card-actions">
              <button 
                className="expand-btn"
                onClick={() => toggleExpand(location.id)}
              >
                {expandedCard === location.id ? 'Recolher' : 'Expandir'}
              </button>
              <button 
                className="approve-btn"
                onClick={() => handleApprove(location.id)}
              >
                Aprovar
              </button>
              <button 
                className="reject-btn"
                onClick={() => handleReject(location.id)}
              >
                Rejeitar
              </button>
            </div>
          </div>
        ))}
        
        {activeTab === 'approved' && approvedLocations.map(location => (
          <div key={location.id} className={`admin-card ${expandedCard === location.id ? 'expanded' : ''}`}>
            <div className="card-header">
              <h3>{location.name}</h3>
              <span className="category-badge approved">{location.category}</span>
            </div>
            
            <div className="card-info">
              <p><strong>Cidade:</strong> {location.city}</p>
              <p><strong>Enviado por:</strong> {location.submittedBy}</p>
              <p><strong>Data:</strong> {location.date}</p>
            </div>

            {expandedCard === location.id && (
              <div className="card-details">
                <p><strong>Descrição:</strong> {location.description}</p>
                <p><strong>Coordenadas:</strong> {location.coordinates}</p>
              </div>
            )}

            <div className="card-actions">
              <button 
                className="expand-btn"
                onClick={() => toggleExpand(location.id)}
              >
                {expandedCard === location.id ? 'Recolher' : 'Expandir'}
              </button>
              <button 
                className="remove-btn"
                onClick={() => handleRemove(location.id)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel