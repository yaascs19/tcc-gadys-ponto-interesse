import { useState, useEffect } from 'react'
import './AdminPanel.css'

function AdminPanel() {
  const [expandedCard, setExpandedCard] = useState(null)
  const [pendingLocations, setPendingLocations] = useState([])
  const [approvedLocations, setApprovedLocations] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  const [userAccess, setUserAccess] = useState([])
  const [rankings, setRankings] = useState([])
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [newUser, setNewUser] = useState({ userName: '', email: '', userType: 'usuario' })
  
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
    
    // Carrega dados de acesso dos usuários
    const userAccessStored = localStorage.getItem('userAccess')
    if (userAccessStored) {
      setUserAccess(JSON.parse(userAccessStored))
    }
    
    // Carrega e processa rankings dos lugares
    const ratingsStored = localStorage.getItem('placeRatings')
    if (ratingsStored) {
      const ratings = JSON.parse(ratingsStored)
      const rankingData = Object.entries(ratings).map(([placeName, data]) => ({
        name: placeName,
        averageRating: data.average,
        totalRatings: data.count
      })).sort((a, b) => b.averageRating - a.averageRating)
      setRankings(rankingData)
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
        imagem: locationToApprove.imagem || '/minha-imagem.jpg',
        localizacao: locationToApprove.localizacao || '',
        horario: locationToApprove.horario || '',
        preco: locationToApprove.preco || '',
        infoAdicional: locationToApprove.infoAdicional || '',
        id: locationToApprove.id
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

  const handleRemoveUser = (index) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      const updatedUsers = userAccess.filter((_, i) => i !== index)
      setUserAccess(updatedUsers)
      localStorage.setItem('userAccess', JSON.stringify(updatedUsers))
      alert('Usuário excluído com sucesso!')
    }
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    if (newUser.userName.trim()) {
      const userData = {
        userName: newUser.userName,
        email: newUser.email,
        userType: newUser.userType,
        lastAccess: new Date().toLocaleString('pt-BR'),
        accessCount: 0,
        ip: 'localhost'
      }
      const updatedUsers = [...userAccess, userData]
      setUserAccess(updatedUsers)
      localStorage.setItem('userAccess', JSON.stringify(updatedUsers))
      setNewUser({ userName: '', email: '', userType: 'usuario' })
      setShowAddUserModal(false)
      alert('Usuário cadastrado com sucesso!')
    }
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
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Usuários ({userAccess.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ranking' ? 'active' : ''}`}
            onClick={() => setActiveTab('ranking')}
          >
            Ranking ({rankings.length})
          </button>
        </div>
      </div>
      
      {activeTab === 'users' && (
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <button 
            onClick={() => setShowAddUserModal(true)}
            style={{background: '#28a745', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem'}}
          >
            + Cadastrar Usuário
          </button>
        </div>
      )}
      
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
        
        {activeTab === 'users' && userAccess.map((user, index) => (
          <div key={index} className="admin-card">
            <div className="card-header">
              <h3>{user.userName}</h3>
              <span className={`category-badge ${user.userType === 'adm' ? 'admin' : 'user'}`}>{user.userType === 'adm' ? 'Admin' : 'Usuário'}</span>
            </div>
            
            <div className="card-info">
              <p><strong>Email:</strong> {user.email || 'N/A'}</p>
              <p><strong>Último acesso:</strong> {user.lastAccess}</p>
              <p><strong>Total de acessos:</strong> {user.accessCount}</p>
              <p><strong>IP:</strong> {user.ip || 'N/A'}</p>
            </div>
            
            <div className="card-actions">
              <button 
                className="remove-btn"
                onClick={() => handleRemoveUser(index)}
              >
                Excluir Usuário
              </button>
            </div>
          </div>
        ))}
        
        {activeTab === 'ranking' && rankings.map((place, index) => (
          <div key={index} className="admin-card">
            <div className="card-header">
              <h3>#{index + 1} {place.name}</h3>
              <span className={`category-badge ranking-${index < 3 ? 'top' : 'normal'}`}>
                ⭐ {place.averageRating.toFixed(1)}
              </span>
            </div>
            
            <div className="card-info">
              <p><strong>Avaliação média:</strong> {place.averageRating.toFixed(2)} estrelas</p>
              <p><strong>Total de avaliações:</strong> {place.totalRatings}</p>
              <p><strong>Posição:</strong> {index + 1}º lugar</p>
            </div>
          </div>
        ))}
      </div>
      
      {showAddUserModal && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000}}>
          <div style={{background: 'white', padding: '2rem', borderRadius: '15px', width: '400px', maxWidth: '90%'}}>
            <h3 style={{marginBottom: '1rem', color: '#2c3e50'}}>Cadastrar Novo Usuário</h3>
            <form onSubmit={handleAddUser}>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', color: '#333'}}>Nome do Usuário:</label>
                <input 
                  type="text" 
                  value={newUser.userName}
                  onChange={(e) => setNewUser({...newUser, userName: e.target.value})}
                  style={{width: '100%', padding: '0.8rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
                  required
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', color: '#333'}}>Email:</label>
                <input 
                  type="email" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  style={{width: '100%', padding: '0.8rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
                  required
                />
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', color: '#333'}}>Tipo de Usuário:</label>
                <select 
                  value={newUser.userType}
                  onChange={(e) => setNewUser({...newUser, userType: e.target.value})}
                  style={{width: '100%', padding: '0.8rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
                >
                  <option value="usuario">Usuário</option>
                  <option value="adm">Administrador</option>
                </select>
              </div>
              <div style={{display: 'flex', gap: '1rem'}}>
                <button type="submit" style={{flex: 1, background: '#28a745', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer'}}>Cadastrar</button>
                <button type="button" onClick={() => setShowAddUserModal(false)} style={{flex: 1, background: '#6c757d', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer'}}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel