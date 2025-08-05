import { useState, useEffect } from 'react'
import './AdminPanel.css'

function AdminPanel() {
  const [expandedCard, setExpandedCard] = useState(null)
  const [pendingLocations, setPendingLocations] = useState([])
  
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
  }, [])

  const handleApprove = (id) => {
    const locationToApprove = pendingLocations.find(location => location.id === id)
    const updatedLocations = pendingLocations.filter(location => location.id !== id)
    
    // Move para lista de aprovados
    let approvedLocations = JSON.parse(localStorage.getItem('approvedLocations')) || []
    approvedLocations.push(locationToApprove)
    localStorage.setItem('approvedLocations', JSON.stringify(approvedLocations))
    
    // Remove da lista de pendentes
    setPendingLocations(updatedLocations)
    localStorage.setItem('pendingLocations', JSON.stringify(updatedLocations))
    
    alert(`Local aprovado e adicionado ao site!`)
  }

  const handleReject = (id) => {
    const updatedLocations = pendingLocations.filter(location => location.id !== id)
    setPendingLocations(updatedLocations)
    localStorage.setItem('pendingLocations', JSON.stringify(updatedLocations))
    alert(`Local rejeitado e removido da lista!`)
  }

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <p>Locais pendentes de aprovação</p>
      </div>
      
      <div className="admin-grid">
        {pendingLocations.map(location => (
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
      </div>
    </div>
  )
}

export default AdminPanel