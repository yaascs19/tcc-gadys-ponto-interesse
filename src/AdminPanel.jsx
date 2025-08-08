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
    } else {
      // Cadastra automaticamente a Yasmin como administradora
      const initialAdmin = [{
        userName: 'Yasmin',
        email: 'yasmincunegundes25@gmail.com',
        userType: 'adm',
        lastAccess: 'Nunca acessou',
        accessCount: 0,
        ip: 'localhost'
      }]
      setUserAccess(initialAdmin)
      localStorage.setItem('userAccess', JSON.stringify(initialAdmin))
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
    
    // Carrega comentários dos lugares
    const commentsStored = localStorage.getItem('placeComments')
    if (commentsStored) {
      setComments(JSON.parse(commentsStored))
    }
    
    // Carrega todos os locais do site (pré-existentes + adicionados)
    const locaisAdicionados = JSON.parse(localStorage.getItem('locaisAdicionados')) || []
    
    // Locais pré-existentes do site
    const locaisPreExistentes = [
      // Monumentos
      { id: 'teatro', nome: 'Teatro Amazonas', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Majestoso teatro construído durante o período áureo da borracha' },
      { id: 'forte', nome: 'Forte de São José', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Fortaleza histórica que marca o início da colonização de Manaus' },
      { id: 'mercado', nome: 'Mercado Municipal', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Mercado histórico inspirado no mercado Les Halles de Paris' },
      { id: 'justica', nome: 'Palácio da Justiça', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Edifício histórico com arquitetura colonial preservada' },
      { id: 'igreja', nome: 'Igreja de São Sebastião', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Igreja histórica com arquitetura colonial e importância religiosa' },
      { id: 'palacio', nome: 'Palácio Rio Negro', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Antiga residência dos governadores, hoje centro cultural' },
      
      // Natureza
      { id: 'floresta', nome: 'Floresta Amazônica', categoria: 'natureza', cidade: 'Amazonas', estado: 'AM', descricao: 'A maior floresta tropical do mundo com biodiversidade única' },
      { id: 'encontro', nome: 'Encontro das Águas', categoria: 'natureza', cidade: 'Manaus', estado: 'AM', descricao: 'Fenômeno natural onde os rios Negro e Solimões se encontram' },
      { id: 'anavilhanas', nome: 'Parque Nacional de Anavilhanas', categoria: 'natureza', cidade: 'Novo Airão', estado: 'AM', descricao: 'Maior arquipélago fluvial do mundo com rica biodiversidade' },
      { id: 'mamiraui', nome: 'Reserva Mamirauá', categoria: 'natureza', cidade: 'Tefé', estado: 'AM', descricao: 'Maior reserva de várzea do mundo com fauna única' },
      { id: 'jau', nome: 'Parque Nacional do Jaú', categoria: 'natureza', cidade: 'Novo Airão', estado: 'AM', descricao: 'Uma das maiores unidades de conservação da Amazônia' },
      { id: 'rioamazonas', nome: 'Rio Amazonas', categoria: 'natureza', cidade: 'Amazonas', estado: 'AM', descricao: 'O maior rio do mundo em volume de água e extensão' },
      
      // Gastronomia
      { id: 'acai', nome: 'Açaí', categoria: 'gastronomia', cidade: 'Amazonas', estado: 'AM', descricao: 'Fruto amazônico rico em nutrientes e sabor único' },
      { id: 'tucuma', nome: 'Tucumã', categoria: 'gastronomia', cidade: 'Amazonas', estado: 'AM', descricao: 'Fruto típico consumido com farinha de mandioca' },
      { id: 'pirarucu', nome: 'Pirarucu', categoria: 'gastronomia', cidade: 'Amazonas', estado: 'AM', descricao: 'Peixe gigante da Amazônia preparado de diversas formas' },
      { id: 'cupuacu', nome: 'Cupuaçu', categoria: 'gastronomia', cidade: 'Amazonas', estado: 'AM', descricao: 'Fruto amazônico usado em doces e sucos refrescantes' },
      { id: 'tacaca', nome: 'Tacacá', categoria: 'gastronomia', cidade: 'Amazonas', estado: 'AM', descricao: 'Prato típico com tucumã, camarão seco e jambu' },
      { id: 'farinha', nome: 'Farinha de Mandioca', categoria: 'gastronomia', cidade: 'Amazonas', estado: 'AM', descricao: 'Ingrediente essencial da culinária amazônica' },
      
      // Cultura
      { id: 'festival', nome: 'Festival de Parintins', categoria: 'cultura', cidade: 'Parintins', estado: 'AM', descricao: 'Maior festival folclórico do Brasil com bois-bumbás' },
      { id: 'lendas', nome: 'Lendas Amazônicas', categoria: 'cultura', cidade: 'Região Amazônica', estado: 'AM', descricao: 'Curupira, Boto-cor-de-rosa, Iara e outras lendas da floresta' },
      { id: 'artesanato', nome: 'Artesanato Indígena', categoria: 'cultura', cidade: 'Comunidades Indígenas', estado: 'AM', descricao: 'Cestas, cerâmicas e objetos tradicionais dos povos originários' },
      { id: 'ciranda', nome: 'Ciranda Amazônica', categoria: 'cultura', cidade: 'Manaus', estado: 'AM', descricao: 'Dança tradicional em roda com cantos e instrumentos regionais' },
      { id: 'carimbo', nome: 'Carimbó', categoria: 'cultura', cidade: 'Região Norte', estado: 'AM', descricao: 'Ritmo e dança típica com tambores e movimentos sensuais' },
      { id: 'rituais', nome: 'Rituais Xamânicos', categoria: 'cultura', cidade: 'Floresta Amazônica', estado: 'AM', descricao: 'Cerimônias ancestrais com plantas sagradas e cura espiritual' }
    ]
    
    const todosLocais = [...locaisPreExistentes, ...locaisAdicionados]
    setSiteLocations(todosLocais)
    
    // Carrega lixeira
    const lixeira = JSON.parse(localStorage.getItem('trashedLocations')) || []
    setTrashedLocations(lixeira)
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
    if (newUser.userName.trim() && newUser.email.trim() && newUser.senha.trim()) {
      const userData = {
        userName: newUser.userName,
        email: newUser.email,
        senha: newUser.senha,
        userType: newUser.userType,
        lastAccess: new Date().toLocaleString('pt-BR'),
        accessCount: 0,
        ip: 'localhost'
      }
      const updatedUsers = [...userAccess, userData]
      setUserAccess(updatedUsers)
      localStorage.setItem('userAccess', JSON.stringify(updatedUsers))
      setNewUser({ userName: '', email: '', senha: '', userType: 'usuario' })
      setShowAddUserModal(false)
      alert('Usuário cadastrado com sucesso!')
    } else {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, Email e Senha)!')
    }
  }

  const handleRemoveLocation = (id) => {
    if (confirm('Tem certeza que deseja mover este local para a lixeira?')) {
      // Encontra o local a ser movido para lixeira
      const locationToTrash = siteLocations.find(location => location.id === id)
      
      // Move para lixeira
      const updatedTrash = [...trashedLocations, {...locationToTrash, trashedAt: new Date().toLocaleString('pt-BR')}]
      setTrashedLocations(updatedTrash)
      localStorage.setItem('trashedLocations', JSON.stringify(updatedTrash))
      
      // Remove dos locais adicionados (se existir lá)
      const locaisAdicionados = JSON.parse(localStorage.getItem('locaisAdicionados')) || []
      const updatedAdicionados = locaisAdicionados.filter(location => location.id !== id)
      localStorage.setItem('locaisAdicionados', JSON.stringify(updatedAdicionados))
      
      // Atualiza a lista completa
      const updatedLocations = siteLocations.filter(location => location.id !== id)
      setSiteLocations(updatedLocations)
      
      alert('Local movido para a lixeira!')
    }
  }

  const handleRestoreLocation = (id) => {
    const locationToRestore = trashedLocations.find(location => location.id === id)
    const locaisPredefinidos = ['teatro', 'forte', 'mercado', 'justica', 'igreja', 'palacio', 'floresta', 'encontro', 'anavilhanas', 'mamiraui', 'jau', 'rioamazonas', 'acai', 'tucuma', 'pirarucu', 'cupuacu', 'tacaca', 'farinha', 'festival', 'lendas', 'artesanato', 'ciranda', 'carimbo', 'rituais']
    
    // Remove da lixeira
    const updatedTrash = trashedLocations.filter(location => location.id !== id)
    setTrashedLocations(updatedTrash)
    localStorage.setItem('trashedLocations', JSON.stringify(updatedTrash))
    
    const restoredLocation = {...locationToRestore}
    delete restoredLocation.trashedAt
    
    // Se não for um local predefinido, adiciona aos locais adicionados
    if (!locaisPredefinidos.includes(id)) {
      const locaisAdicionados = JSON.parse(localStorage.getItem('locaisAdicionados')) || []
      locaisAdicionados.push(restoredLocation)
      localStorage.setItem('locaisAdicionados', JSON.stringify(locaisAdicionados))
    }
    
    // Atualiza a lista completa
    setSiteLocations([...siteLocations, restoredLocation])
    
    alert('Local restaurado com sucesso!')
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
            🗑️ Lixeira ({trashedLocations.length})
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
        
        {activeTab === 'ranking' && rankings.map((place, index) => {
          const placeComments = comments[place.name] || []
          const isExpanded = expandedCard === `ranking-${index}`
          return (
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
                <p><strong>Total de comentários:</strong> {placeComments.length}</p>
                <p><strong>Posição:</strong> {index + 1}º lugar</p>
              </div>
              
              {placeComments.length > 0 && (
                <div className="card-actions">
                  <button 
                    className="expand-btn"
                    onClick={() => toggleExpand(`ranking-${index}`)}
                  >
                    {isExpanded ? 'Ocultar Comentários' : `Ver Comentários (${placeComments.length})`}
                  </button>
                </div>
              )}
              
              {isExpanded && placeComments.length > 0 && (
                <div style={{marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px'}}>
                  <h4 style={{marginBottom: '0.8rem', color: '#495057', fontSize: '1rem'}}>💬 Todos os Comentários:</h4>
                  {placeComments.map((comment, idx) => (
                    <div key={idx} style={{marginBottom: '0.8rem', padding: '0.8rem', background: 'white', borderRadius: '8px', border: '1px solid #dee2e6'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem'}}>
                        <strong style={{color: '#495057'}}>{comment.userName}</strong>
                        <span style={{fontSize: '0.75rem', color: '#6c757d'}}>{comment.date}</span>
                      </div>
                      <p style={{fontSize: '0.9rem', color: '#333', lineHeight: '1.4'}}>{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
        
        {activeTab === 'locations' && (
          <div style={{width: '100%'}}>
            {['monumentos', 'natureza', 'gastronomia', 'cultura'].map(categoria => {
              const locaisCategoria = siteLocations.filter(location => location.categoria === categoria)
              if (locaisCategoria.length === 0) return null
              
              return (
                <div key={categoria} style={{marginBottom: '3rem'}}>
                  <h3 style={{textAlign: 'center', color: '#2c3e50', fontSize: '1.8rem', marginBottom: '2rem', textTransform: 'capitalize'}}>
                    {categoria === 'monumentos' ? '🏦 Monumentos' : 
                     categoria === 'natureza' ? '🌳 Natureza' :
                     categoria === 'gastronomia' ? '🍽️ Gastronomia' : '🎨 Cultura'}
                  </h3>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem'}}>
                    {locaisCategoria.map((location) => (
                      <div key={location.id} className="admin-card">
                        <div className="card-header">
                          <h3>{location.nome}</h3>
                          <span className={`category-badge`}>{location.categoria}</span>
                        </div>
                        
                        <div className="card-info">
                          <p><strong>Cidade:</strong> {location.cidade} - {location.estado}</p>
                          <p><strong>Descrição:</strong> {location.descricao}</p>
                          <p><strong>Localização:</strong> {location.localizacao || 'N/A'}</p>
                        </div>
                        
                        <div className="card-actions">
                          <button 
                            className="remove-btn"
                            onClick={() => handleRemoveLocation(location.id)}
                          >
                            Mover para Lixeira
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        
        {activeTab === 'trash' && trashedLocations.map((location) => (
          <div key={location.id} className="admin-card">
            <div className="card-header">
              <h3>{location.nome}</h3>
              <span className={`category-badge`}>{location.categoria}</span>
            </div>
            
            <div className="card-info">
              <p><strong>Cidade:</strong> {location.cidade} - {location.estado}</p>
              <p><strong>Descrição:</strong> {location.descricao}</p>
              <p><strong>Excluído em:</strong> {location.trashedAt}</p>
            </div>
            
            <div className="card-actions">
              <button 
                className="approve-btn"
                onClick={() => handleRestoreLocation(location.id)}
              >
                Restaurar
              </button>
              <button 
                className="reject-btn"
                onClick={() => handlePermanentDelete(location.id)}
              >
                Excluir Permanentemente
              </button>
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
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', color: '#333'}}>Senha:</label>
                <input 
                  type="password" 
                  value={newUser.senha}
                  onChange={(e) => setNewUser({...newUser, senha: e.target.value})}
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