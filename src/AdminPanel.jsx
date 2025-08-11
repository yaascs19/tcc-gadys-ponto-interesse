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
  const [locationFilter, setLocationFilter] = useState('')
  
  const loadUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/usuarios')
      if (response.ok) {
        const users = await response.json()
        setUserAccess(users)
      }
    } catch (error) {
      // Carregar usuários do localStorage se não conseguir do servidor
      const localUsers = JSON.parse(localStorage.getItem('registeredUsers')) || []
      setUserAccess(localUsers)
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
      // Carregar locais aprovados do localStorage
      const approved = JSON.parse(localStorage.getItem('approvedLocations')) || []
      setApprovedLocations(approved)
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
      // Carregar todos os locais (originais + adicionados)
      const locaisAdicionados = JSON.parse(localStorage.getItem('locaisAdicionados')) || []
      const approvedLocations = JSON.parse(localStorage.getItem('approvedLocations')) || []
      
      // Locais originais do site
      const locaisOriginais = [
        {id: 'teatro-amazonas', nome: 'Teatro Amazonas', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Majestoso teatro construído durante o período áureo da borracha'},
        {id: 'forte-sao-jose', nome: 'Forte de São José', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Fortaleza histórica que marca o início da colonização de Manaus'},
        {id: 'palacio-justica', nome: 'Palácio da Justiça', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Edifício histórico com arquitetura colonial preservada'},
        {id: 'mercado-municipal', nome: 'Mercado Municipal', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Mercado histórico inspirado no mercado Les Halles de Paris'},
        {id: 'igreja-sao-sebastiao', nome: 'Igreja de São Sebastião', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Igreja histórica com arquitetura colonial e importância religiosa'},
        {id: 'palacio-rio-negro', nome: 'Palácio Rio Negro', categoria: 'monumentos', cidade: 'Manaus', estado: 'AM', descricao: 'Antiga residência dos governadores, hoje centro cultural'},
        {id: 'floresta-amazonica', nome: 'Floresta Amazônica', categoria: 'natureza', cidade: 'Amazonas', estado: 'AM', descricao: 'A maior floresta tropical do mundo com biodiversidade única'},
        {id: 'encontro-aguas', nome: 'Encontro das Águas', categoria: 'natureza', cidade: 'Manaus', estado: 'AM', descricao: 'Fenômeno natural onde os rios Negro e Solimões se encontram'},
        {id: 'parque-anavilhanas', nome: 'Parque Nacional de Anavilhanas', categoria: 'natureza', cidade: 'Novo Airão', estado: 'AM', descricao: 'Maior arquipélago fluvial do mundo com rica biodiversidade'},
        {id: 'reserva-mamiraui', nome: 'Reserva Mamirauá', categoria: 'natureza', cidade: 'Tefé', estado: 'AM', descricao: 'Maior reserva de várzea do mundo com fauna única'},
        {id: 'parque-jau', nome: 'Parque Nacional do Jaú', categoria: 'natureza', cidade: 'Novo Airão', estado: 'AM', descricao: 'Uma das maiores unidades de conservação da Amazônia'},
        {id: 'rio-amazonas', nome: 'Rio Amazonas', categoria: 'natureza', cidade: 'Amazonas', estado: 'AM', descricao: 'O maior rio do mundo em volume de água e extensão'},
        {id: 'acai', nome: 'Açaí', categoria: 'gastronomia', cidade: 'Amazonas', estado: 'AM', descricao: 'Fruto amazônico rico em antioxidantes e energia'},
        {id: 'tucuma', nome: 'Tucumã', categoria: 'gastronomia', cidade: 'Amazonas', estado: 'AM', descricao: 'Fruto amazônico tradicional consumido com farinha'},
        {id: 'pirarucu', nome: 'Pirarucu', categoria: 'gastronomia', cidade: 'Amazonas', estado: 'AM', descricao: 'Peixe gigante da Amazônia, considerado o bacalhau brasileiro'},
        {id: 'cupuacu', nome: 'Cupuaçu', categoria: 'gastronomia', cidade: 'Amazonas', estado: 'AM', descricao: 'Fruto amazônico usado em doces e sucos'},
        {id: 'tacaca', nome: 'Tacacá', categoria: 'gastronomia', cidade: 'Manaus', estado: 'AM', descricao: 'Prato típico amazônico com tucumã e camarão'},
        {id: 'farinha-mandioca', nome: 'Farinha de Mandioca', categoria: 'gastronomia', cidade: 'Amazonas', estado: 'AM', descricao: 'Ingrediente básico da culinária amazônica'},
        {id: 'festival-parintins', nome: 'Festival de Parintins', categoria: 'cultura', cidade: 'Parintins', estado: 'AM', descricao: 'Maior festival folclórico do Brasil com bois Garantido e Caprichoso'},
        {id: 'lendas-amazonicas', nome: 'Lendas Amazônicas', categoria: 'cultura', cidade: 'Amazonas', estado: 'AM', descricao: 'Rica mitologia com Curupira, Boto, Iara e outras lendas'},
        {id: 'artesanato-indigena', nome: 'Artesanato Indígena', categoria: 'cultura', cidade: 'Amazonas', estado: 'AM', descricao: 'Arte tradicional dos povos indígenas amazônicos'},
        {id: 'ciranda-amazonica', nome: 'Ciranda Amazônica', categoria: 'cultura', cidade: 'Amazonas', estado: 'AM', descricao: 'Dança folclórica tradicional da região Norte'},
        {id: 'carimbo', nome: 'Carimbó', categoria: 'cultura', cidade: 'Amazonas', estado: 'AM', descricao: 'Dança e ritmo musical típico da Amazônia'},
        {id: 'rituais-xamanicos', nome: 'Rituais Xamânicos', categoria: 'cultura', cidade: 'Amazonas', estado: 'AM', descricao: 'Práticas espirituais tradicionais dos povos amazônicos'}
      ]
      
      // Combinar todos os locais
      const todosLocais = [...locaisOriginais, ...locaisAdicionados, ...approvedLocations]
      setSiteLocations(todosLocais)
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
      setApprovedLocations([...approvedLocations])
      
      // Adiciona às categorias correspondentes
      let locaisAdicionados = JSON.parse(localStorage.getItem('locaisAdicionados')) || []
      
      const novoLocal = {
        nome: locationToApprove.name,
        cidade: locationToApprove.city.split(',')[0],
        estado: locationToApprove.city.split(',')[1]?.trim() || 'BR',
        categoria: locationToApprove.category,
        descricao: locationToApprove.description,
        imagem: locationToApprove.imageUrl || locationToApprove.imagem || '/minha-imagem.jpg',
        localizacao: locationToApprove.localizacao,
        horario: locationToApprove.horario,
        preco: locationToApprove.preco,
        infoAdicional: locationToApprove.infoAdicional,
        id: locationToApprove.id
      }
      
      locaisAdicionados.push(novoLocal)
      localStorage.setItem('locaisAdicionados', JSON.stringify(locaisAdicionados))
      
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
    if (confirm('Tem certeza que deseja mover este local para a lixeira?')) {
      const locationToRemove = approvedLocations.find(location => location.id === id)
      
      // Mover para lixeira
      let currentTrash = JSON.parse(localStorage.getItem('trashedLocations')) || []
      const updatedTrash = [...currentTrash, {...locationToRemove, trashedAt: new Date().toLocaleString('pt-BR')}]
      setTrashedLocations(updatedTrash)
      localStorage.setItem('trashedLocations', JSON.stringify(updatedTrash))
      
      // Remover de aprovados
      const updatedApproved = approvedLocations.filter(location => location.id !== id)
      setApprovedLocations(updatedApproved)
      localStorage.setItem('approvedLocations', JSON.stringify(updatedApproved))
      
      // Remover de locaisAdicionados
      let locaisAdicionados = JSON.parse(localStorage.getItem('locaisAdicionados')) || []
      locaisAdicionados = locaisAdicionados.filter(local => local.id !== id || local.nome !== locationToRemove.name)
      localStorage.setItem('locaisAdicionados', JSON.stringify(locaisAdicionados))
      
      alert('Local movido para lixeira!')
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
        
        // Mover para lixeira
        let currentTrash = JSON.parse(localStorage.getItem('trashedLocations')) || []
        const updatedTrash = [...currentTrash, {...locationToTrash, trashedAt: new Date().toLocaleString('pt-BR')}]
        setTrashedLocations(updatedTrash)
        localStorage.setItem('trashedLocations', JSON.stringify(updatedTrash))
        
        // Remover de locaisAdicionados
        let locaisAdicionados = JSON.parse(localStorage.getItem('locaisAdicionados')) || []
        locaisAdicionados = locaisAdicionados.filter(local => local.id !== id)
        localStorage.setItem('locaisAdicionados', JSON.stringify(locaisAdicionados))
        
        // Remover de approvedLocations
        let approvedLocations = JSON.parse(localStorage.getItem('approvedLocations')) || []
        approvedLocations = approvedLocations.filter(local => local.id !== id)
        localStorage.setItem('approvedLocations', JSON.stringify(approvedLocations))
        
        // Atualizar lista na tela
        const updatedLocations = siteLocations.filter(location => location.id !== id)
        setSiteLocations(updatedLocations)
        
        alert('Local movido para lixeira!')
      }
    }
  }

  const handleRestoreLocation = (id) => {
    if (confirm('Tem certeza que deseja restaurar este local?')) {
      const locationToRestore = trashedLocations.find(location => location.id === id)
      
      // Remover da lixeira
      const updatedTrash = trashedLocations.filter(location => location.id !== id)
      setTrashedLocations(updatedTrash)
      localStorage.setItem('trashedLocations', JSON.stringify(updatedTrash))
      
      // Adicionar de volta aos locais
      let locaisAdicionados = JSON.parse(localStorage.getItem('locaisAdicionados')) || []
      const { trashedAt, ...cleanLocation } = locationToRestore
      locaisAdicionados.push(cleanLocation)
      localStorage.setItem('locaisAdicionados', JSON.stringify(locaisAdicionados))
      
      // Atualizar lista de locais do site
      loadSiteLocations()
      
      alert('Local restaurado com sucesso!')
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

  const responderMensagem = (id) => {
    const resposta = prompt('Digite sua resposta:')
    if (resposta && resposta.trim()) {
      const mensagens = JSON.parse(localStorage.getItem('mensagensContato')) || []
      const mensagemIndex = mensagens.findIndex(msg => msg.id === id)
      
      if (mensagemIndex !== -1) {
        mensagens[mensagemIndex].resposta = resposta.trim()
        mensagens[mensagemIndex].status = 'respondida'
        localStorage.setItem('mensagensContato', JSON.stringify(mensagens))
        
        // Adicionar à lista de perguntas do usuário
        const userName = mensagens[mensagemIndex].userName
        let perguntasUsuario = JSON.parse(localStorage.getItem('perguntasUsuario')) || {}
        if (!perguntasUsuario[userName]) {
          perguntasUsuario[userName] = []
        }
        
        // Atualizar pergunta existente ou adicionar nova
        const perguntaIndex = perguntasUsuario[userName].findIndex(p => p.id === id)
        if (perguntaIndex !== -1) {
          perguntasUsuario[userName][perguntaIndex].resposta = resposta.trim()
          perguntasUsuario[userName][perguntaIndex].status = 'respondida'
        } else {
          perguntasUsuario[userName].push({
            pergunta: mensagens[mensagemIndex].mensagem,
            resposta: resposta.trim(),
            assunto: mensagens[mensagemIndex].assunto,
            data: new Date().toLocaleString('pt-BR'),
            status: 'respondida',
            id: id
          })
        }
        
        localStorage.setItem('perguntasUsuario', JSON.stringify(perguntasUsuario))
        loadContactMessages()
        alert('Resposta enviada com sucesso!')
      }
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
            Ranking de Locais
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
            Mensagens ({contactMessages.filter(m => m.status === 'nova').length})
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
      
      {activeTab === 'locations' && (
        <div style={{textAlign: 'center', marginBottom: '2rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <select 
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            style={{
              padding: '1rem 1.5rem',
              borderRadius: '15px',
              border: '2px solid #667eea',
              fontSize: '1rem',
              minWidth: '220px',
              background: 'linear-gradient(135deg, #f8f9fa, #ffffff)',
              color: '#2c3e50',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.1)',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)'}
            onBlur={(e) => e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.1)'}
          >
            <option value="">Visite Lugares</option>
            <option value="monumentos">🏛️ Monumentos</option>
            <option value="natureza">🌳 Natureza</option>
          </select>
          <select 
            style={{
              padding: '1rem 1.5rem',
              borderRadius: '15px',
              border: '2px solid #28a745',
              fontSize: '1rem',
              minWidth: '220px',
              background: 'linear-gradient(135deg, #f8f9fa, #ffffff)',
              color: '#2c3e50',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(40, 167, 69, 0.1)',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.3)'}
            onBlur={(e) => e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.1)'}
          >
            <option value="">Curiosidades</option>
            <option value="gastronomia">🍽️ Gastronomia</option>
            <option value="cultura">🎨 Cultura</option>
          </select>
        </div>
      )}
      
      <div className="admin-grid">
        {activeTab === 'ranking' && (() => {
          // Calcular ranking dos locais mais bem avaliados
          const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {};
          const rankingLocais = Object.entries(avaliacoes)
            .map(([local, ratings]) => {
              const media = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
              return {
                nome: local,
                media: media.toFixed(1),
                totalAvaliacoes: ratings.length,
                estrelas: '★'.repeat(Math.floor(media)) + '☆'.repeat(5 - Math.floor(media))
              };
            })
            .filter(local => local.totalAvaliacoes > 0)
            .sort((a, b) => b.media - a.media);
          
          return rankingLocais.length === 0 ? (
            <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
              <p>Nenhuma avaliação encontrada ainda.</p>
            </div>
          ) : (
            rankingLocais.map((local, index) => (
              <div key={index} className="admin-card">
                <div className="card-header">
                  <h3>#{index + 1} {local.nome}</h3>
                  <span className={`category-badge ${index === 0 ? 'approved' : index === 1 ? 'pending' : ''}`}>
                    {index === 0 ? '🥇 1º Lugar' : index === 1 ? '🥈 2º Lugar' : index === 2 ? '🥉 3º Lugar' : `${index + 1}º Lugar`}
                  </span>
                </div>
                
                <div className="card-info">
                  <p><strong>Média:</strong> {local.media} ({local.estrelas})</p>
                  <p><strong>Total de Avaliações:</strong> {local.totalAvaliacoes}</p>
                  <p><strong>Posição:</strong> {index + 1}º lugar no ranking</p>
                </div>
              </div>
            ))
          );
        })()}
        {activeTab === 'approved' && approvedLocations.map((location, index) => (
          <div key={location.id || index} className={`admin-card ${expandedCard === `approved-${location.id}` ? 'expanded' : ''}`}>
            <div className="card-header">
              <h3>{location.name || location.nome}</h3>
              <span className="category-badge approved">{location.category || location.categoria}</span>
            </div>
            
            <div className="card-info">
              <p><strong>Cidade:</strong> {location.city || location.cidade}</p>
              <p><strong>Aprovado em:</strong> {location.approvedAt || 'N/A'}</p>
              <p><strong>Categoria:</strong> {location.category || location.categoria}</p>
            </div>

            {expandedCard === `approved-${location.id}` && (
              <div className="card-details">
                <p><strong>Descrição:</strong> {location.description || location.descricao}</p>
                <p><strong>Localização:</strong> {location.localizacao || 'N/A'}</p>
              </div>
            )}

            <div className="card-actions">
              <button 
                className="expand-btn"
                onClick={() => toggleExpand(`approved-${location.id}`)}
              >
                {expandedCard === `approved-${location.id}` ? 'Recolher' : 'Expandir'}
              </button>
              <button 
                className="reject-btn"
                onClick={() => handleRemove(location.id)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
        
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
        
        {activeTab === 'locations' && siteLocations
          .filter(location => !locationFilter || (location.categoria || location.category) === locationFilter)
          .map((location, index) => (
          <div key={location.id || index} className={`admin-card ${expandedCard === location.id ? 'expanded' : ''}`}>
            <div className="card-header">
              <h3>{location.nome || location.name}</h3>
              <span className="category-badge">{location.categoria || location.category}</span>
            </div>
            
            <div className="card-info">
              <p><strong>Cidade:</strong> {location.cidade || location.city}</p>
              <p><strong>Estado:</strong> {location.estado}</p>
              <p><strong>Categoria:</strong> {location.categoria || location.category}</p>
            </div>

            {expandedCard === location.id && (
              <div className="card-details">
                <p><strong>Descrição:</strong> {location.descricao || location.description}</p>
                <p><strong>Localização:</strong> {location.localizacao || 'N/A'}</p>
                <p><strong>Horário:</strong> {location.horario || 'N/A'}</p>
                <p><strong>Preço:</strong> {location.preco || 'N/A'}</p>
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
                className="reject-btn"
                onClick={() => handleRemoveLocation(location.id)}
              >
                Excluir Local
              </button>
            </div>
          </div>
        ))}
        
        {activeTab === 'users' && userAccess.map((user, index) => (
          <div key={index} className={`admin-card ${expandedCard === `user-${index}` ? 'expanded' : ''}`}>
            <div className="card-header">
              <h3>{user.nome || user.userName || 'Usuário'}</h3>
              <span className={`category-badge ${user.tipoUsuario === 'adm' ? 'approved' : 'pending'}`}>
                {user.tipoUsuario === 'adm' ? 'Admin' : 'Usuário'}
              </span>
            </div>
            
            <div className="card-info">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Tipo:</strong> {user.tipoUsuario || user.userType}</p>
              <p><strong>Cadastrado:</strong> {user.dataCadastro || 'N/A'}</p>
            </div>

            <div className="card-actions">
              <button 
                className="reject-btn"
                onClick={() => handleRemoveUser(user.id, index)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
        
        {activeTab === 'trash' && trashedLocations.map((location, index) => (
          <div key={location.id || index} className={`admin-card ${expandedCard === `trash-${location.id}` ? 'expanded' : ''}`}>
            <div className="card-header">
              <h3>{location.nome || location.name}</h3>
              <span className="category-badge pending">{location.categoria || location.category}</span>
            </div>
            
            <div className="card-info">
              <p><strong>Cidade:</strong> {location.cidade || location.city}</p>
              <p><strong>Excluído em:</strong> {location.trashedAt}</p>
              <p><strong>Categoria:</strong> {location.categoria || location.category}</p>
            </div>

            {expandedCard === `trash-${location.id}` && (
              <div className="card-details">
                <p><strong>Descrição:</strong> {location.descricao || location.description}</p>
                <p><strong>Localização:</strong> {location.localizacao || 'N/A'}</p>
              </div>
            )}

            <div className="card-actions">
              <button 
                className="expand-btn"
                onClick={() => toggleExpand(`trash-${location.id}`)}
              >
                {expandedCard === `trash-${location.id}` ? 'Recolher' : 'Expandir'}
              </button>
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
        
        {activeTab === 'messages' && contactMessages.filter(message => message.status === 'nova').map((message) => (
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
              <button 
                className="approve-btn"
                onClick={() => responderMensagem(message.id)}
              >
                Responder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel