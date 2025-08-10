import { useState, useEffect } from 'react'
import './AdminPanel.css'

function AdminPanel() {
  const [expandedCard, setExpandedCard] = useState(null)
  const [pendingLocations, setPendingLocations] = useState([])
  const [approvedLocations, setApprovedLocations] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  const [userAccess, setUserAccess] = useState([])
  const [rankings, setRankings] = useState([])
  const [comments, setComments] = useState({})
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [newUser, setNewUser] = useState({ userName: '', email: '', senha: '', userType: 'usuario' })
  const [siteLocations, setSiteLocations] = useState([])
  const [trashedLocations, setTrashedLocations] = useState([])
  const [contactMessages, setContactMessages] = useState([])
  
  const loadUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/usuarios')
      if (response.ok) {
        const users = await response.json()
        setUserAccess(users)
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    }
  }

  const loadRanking = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/ranking')
      if (response.ok) {
        const ranking = await response.json()
        setRankings(ranking)
      }
    } catch (error) {
      console.error('Erro ao carregar ranking:', error)
    }
  }

  const loadComments = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/comentarios/all')
      if (response.ok) {
        const commentsData = await response.json()
        setComments(commentsData)
      }
    } catch (error) {
      console.error('Erro ao carregar comentários:', error)
    }
  }

  const loadPendingLocations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/locais/pendentes')
      if (response.ok) {
        const pending = await response.json()
        setPendingLocations(pending)
      }
    } catch (error) {
      // Carrega do localStorage
      const pendingData = JSON.parse(localStorage.getItem('pendingLocations')) || []
      setPendingLocations(pendingData)
    }
  }

  const loadApprovedLocations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/locais/aprovados')
      if (response.ok) {
        const approved = await response.json()
        setApprovedLocations(approved)
      }
    } catch (error) {
      console.error('Erro ao carregar locais aprovados:', error)
    }
  }

  const loadSiteLocations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/locais')
      if (response.ok) {
        const locais = await response.json()
        setSiteLocations(locais)
      }
    } catch (error) {
      console.error('Erro ao carregar locais do site:', error)
    }
  }

  const loadTrashedLocations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/locais/lixeira')
      if (response.ok) {
        const lixeira = await response.json()
        setTrashedLocations(lixeira)
      }
    } catch (error) {
      const lixeira = JSON.parse(localStorage.getItem('trashedLocations')) || []
      setTrashedLocations(lixeira)
    }
  }

  const loadContactMessages = () => {
    const messages = JSON.parse(localStorage.getItem('mensagensContato')) || []
    setContactMessages(messages)
  }

  useEffect(() => {
    loadPendingLocations()
    loadApprovedLocations()
    loadUsers()
    loadRanking()
    loadComments()
    loadSiteLocations()
    loadTrashedLocations()
    loadContactMessages()
  }, [])

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/locais/aprovar/${id}`, {
        method: 'POST'
      })
      
      if (response.ok) {
        alert('Local aprovado com sucesso!')
        loadPendingLocations()
        loadApprovedLocations()
      } else {
        alert('Erro ao aprovar local')
      }
    } catch (error) {
      const locationToApprove = pendingLocations.find(location => location.id === id)
      const updatedLocations = pendingLocations.filter(location => location.id !== id)
      
      // Adiciona aos locais aprovados
      let approvedLocations = JSON.parse(localStorage.getItem('approvedLocations')) || []
      approvedLocations.push(locationToApprove)
      localStorage.setItem('approvedLocations', JSON.stringify(approvedLocations))
      
      // Adiciona às categorias do Amazonas se for do AM
      if (locationToApprove.city.toLowerCase().includes('am') || locationToApprove.city.toLowerCase().includes('amazonas')) {
        let locaisAdicionados = JSON.parse(localStorage.getItem('locaisAdicionados')) || []
        
        const novoLocal = {
          nome: locationToApprove.name,
          cidade: locationToApprove.city.split(',')[0],
          estado: 'AM',
          categoria: locationToApprove.category,
          descricao: locationToApprove.description,
          imagem: locationToApprove.imagem || '/minha-imagem.jpg',
          localizacao: locationToApprove.localizacao,
          horario: locationToApprove.horario,
          preco: locationToApprove.preco,
          infoAdicional: locationToApprove.infoAdicional,
          id: locationToApprove.id
        }
        
        locaisAdicionados.push(novoLocal)
        localStorage.setItem('locaisAdicionados', JSON.stringify(locaisAdicionados))
      }
      
      setPendingLocations(updatedLocations)
      localStorage.setItem('pendingLocations', JSON.stringify(updatedLocations))
      
      alert('Local aprovado e adicionado às categorias!')
    }
  }

  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/locais/rejeitar/${id}`, {
        method: 'POST'
      })
      
      if (response.ok) {
        alert('Local rejeitado!')
        loadPendingLocations()
      } else {
        alert('Erro ao rejeitar local')
      }
    } catch (error) {
      const updatedLocations = pendingLocations.filter(location => location.id !== id)
      setPendingLocations(updatedLocations)
      localStorage.setItem('pendingLocations', JSON.stringify(updatedLocations))
      alert('Local rejeitado localmente!')
    }
  }

  const handleRemove = (id) => {
    if (confirm('Tem certeza que deseja remover este local?')) {
      const locationToRemove = approvedLocations.find(location => location.id === id)
      const updatedApproved = approvedLocations.filter(location => location.id !== id)
      
      setApprovedLocations(updatedApproved)
      localStorage.setItem('approvedLocations', JSON.stringify(updatedApproved))
      
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

  const handleRemoveUser = async (userId, index) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/usuarios/${userId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          alert('Usuário excluído com sucesso!')
          loadUsers()
        } else {
          alert('Erro ao excluir usuário')
        }
      } catch (error) {
        const updatedUsers = userAccess.filter((_, i) => i !== index)
        setUserAccess(updatedUsers)
        localStorage.setItem('userAccess', JSON.stringify(updatedUsers))
        alert('Usuário excluído localmente!')
      }
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    if (newUser.userName.trim() && newUser.email.trim() && newUser.senha.trim()) {
      try {
        const response = await fetch('http://localhost:3001/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: newUser.userName,
            email: newUser.email,
            senha: newUser.senha,
            tipoUsuario: newUser.userType
          })
        })
        
        if (response.ok) {
          setNewUser({ userName: '', email: '', senha: '', userType: 'usuario' })
          setShowAddUserModal(false)
          alert('Usuário cadastrado com sucesso!')
          loadUsers()
        } else {
          const error = await response.json()
          alert(error.error || 'Erro ao cadastrar usuário')
        }
      } catch (error) {
        alert('Erro de conexão com o servidor')
      }
    } else {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, Email e Senha)!')
    }
  }

  const handleRemoveLocation = async (id) => {
    if (confirm('Tem certeza que deseja mover este local para a lixeira?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/locais/excluir/${id}`, {
          method: 'POST'
        })
        
        if (response.ok) {
          alert('Local movido para a lixeira!')
          loadSiteLocations()
          loadTrashedLocations()
        } else {
          alert('Erro ao mover local para lixeira')
        }
      } catch (error) {
        const locationToTrash = siteLocations.find(location => location.id === id)
        const updatedTrash = [...trashedLocations, {...locationToTrash, trashedAt: new Date().toLocaleString('pt-BR')}]
        setTrashedLocations(updatedTrash)
        localStorage.setItem('trashedLocations', JSON.stringify(updatedTrash))
        
        const updatedLocations = siteLocations.filter(location => location.id !== id)
        setSiteLocations(updatedLocations)
        
        alert('Local movido para lixeira localmente!')
      }
    }
  }

  const handleRestoreLocation = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/locais/restaurar/${id}`, {
        method: 'POST'
      })
      
      if (response.ok) {
        alert('Local restaurado com sucesso!')
        loadSiteLocations()
        loadTrashedLocations()
      } else {
        alert('Erro ao restaurar local')
      }
    } catch (error) {
      const locationToRestore = trashedLocations.find(location => location.id === id)
      const updatedTrash = trashedLocations.filter(location => location.id !== id)
      setTrashedLocations(updatedTrash)
      localStorage.setItem('trashedLocations', JSON.stringify(updatedTrash))
      
      const restoredLocation = {...locationToRestore}
      delete restoredLocation.trashedAt
      setSiteLocations([...siteLocations, restoredLocation])
      
      alert('Local restaurado localmente!')
    }
  }

  const handlePermanentDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir permanentemente este local? Esta ação não pode ser desfeita!')) {
      const updatedTrash = trashedLocations.filter(location => location.id !== id)
      setTrashedLocations(updatedTrash)
      localStorage.setItem('trashedLocations', JSON.stringify(updatedTrash))
      alert('Local excluído permanentemente!')
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
          <button 
            className={`tab-btn ${activeTab === 'locations' ? 'active' : ''}`}
            onClick={() => setActiveTab('locations')}
          >
            Locais do Site ({siteLocations.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'trash' ? 'active' : ''}`}
            onClick={() => setActiveTab('trash')}
          >
            Lixeira ({trashedLocations.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Mensagens ({contactMessages.length})
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
        
        {activeTab === 'messages' && contactMessages.map((message) => (
          <div key={message.id} className={`admin-card ${expandedCard === message.id ? 'expanded' : ''}`}>
            <div className="card-header">
              <h3>{message.nome}</h3>
              <span className={`category-badge ${message.status === 'nova' ? 'pending' : 'approved'}`}>{message.status}</span>
            </div>
            
            <div className="card-info">
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Assunto:</strong> {message.assunto}</p>
              <p><strong>Data:</strong> {message.data}</p>
            </div>

            {expandedCard === message.id && (
              <div className="card-details">
                <p><strong>Mensagem:</strong></p>
                <div style={{background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem'}}>
                  {message.mensagem}
                </div>
              </div>
            )}

            <div className="card-actions">
              <button 
                className="expand-btn"
                onClick={() => toggleExpand(message.id)}
              >
                {expandedCard === message.id ? 'Recolher' : 'Ver Mensagem'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel