async function addComment(localId, buttonElement) {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        alert('Você precisa estar logado para comentar!');
        return;
    }
    
    const textarea = buttonElement.parentElement.querySelector('textarea');
    const commentText = textarea.value.trim();
    
    if (!commentText) {
        alert('Por favor, escreva um comentário!');
        return;
    }
    
    try {
        // Tentar salvar na API
        const response = await fetch('http://localhost:3001/api/comentarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                localId: localId,
                usuarioId: 1, // ID padrão, idealmente pegar do login
                texto: commentText
            })
        });
        
        if (response.ok) {
            textarea.value = '';
            alert('✅ Comentário adicionado com sucesso! Obrigado por compartilhar sua experiência.');
            
            // Disparar evento para atualizar contador no perfil
            window.dispatchEvent(new CustomEvent('commentAdded'));
        } else {
            throw new Error('Erro na API');
        }
    } catch (error) {
        // Fallback para localStorage se API não estiver disponível
        let placeComments = JSON.parse(localStorage.getItem('placeComments')) || {};
        
        if (!placeComments[localId]) {
            placeComments[localId] = [];
        }
        
        // Obter nome completo do local
        const localFullName = getLocalFullName(localId);
        
        const newComment = {
            userName: userName,
            text: commentText,
            date: new Date().toLocaleString('pt-BR'),
            localFullName: localFullName
        };
        
        placeComments[localId].push(newComment);
        localStorage.setItem('placeComments', JSON.stringify(placeComments));
        
        textarea.value = '';
        alert('✅ Comentário adicionado com sucesso!');
        
        // Disparar evento para atualizar contador no perfil
        window.dispatchEvent(new CustomEvent('commentAdded'));
    }
}

function getLocalFullName(localId) {
    const nameMap = {
        'teatro': 'Teatro Amazonas',
        'forte': 'Forte de São José',
        'justica': 'Palácio da Justiça',
        'mercado': 'Mercado Municipal',
        'igreja': 'Igreja de São Sebastião',
        'palacio': 'Palácio Rio Negro',
        'festival': 'Festival de Parintins',
        'lendas': 'Lendas Amazônicas',
        'artesanato': 'Artesanato Indígena',
        'ciranda': 'Ciranda Amazônica',
        'carimbo': 'Carimbó',
        'rituais': 'Rituais Xamânicos',
        'floresta': 'Floresta Amazônica',
        'encontro': 'Encontro das Águas',
        'anavilhanas': 'Parque Nacional de Anavilhanas',
        'mamiraui': 'Reserva Mamirauá',
        'jau': 'Parque Nacional do Jaú',
        'rioamazonas': 'Rio Amazonas',
        'pirarucu': 'Pirarucu',
        'acai': 'Açaí',
        'cupuacu': 'Cupuaçu',
        'tucuma': 'Tucumã',
        'tacaca': 'Tacacá',
        'farinha': 'Farinha de Mandioca'
    };
    
    // Tentar encontrar pelo título da página
    const pageTitle = document.title;
    if (pageTitle.includes(' - ')) {
        const titlePart = pageTitle.split(' - ')[1];
        if (titlePart && titlePart !== 'GADYS') {
            return titlePart;
        }
    }
    
    // Tentar encontrar pelo h1 da página
    const h1 = document.querySelector('h1');
    if (h1 && h1.textContent.trim()) {
        return h1.textContent.replace(/🍽️|🎨|🏛️|🌳/g, '').trim();
    }
    
    // Usar mapeamento como fallback
    return nameMap[localId] || localId;
}