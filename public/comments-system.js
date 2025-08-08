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
        } else {
            throw new Error('Erro na API');
        }
    } catch (error) {
        // Fallback para localStorage se API não estiver disponível
        let placeComments = JSON.parse(localStorage.getItem('placeComments')) || {};
        
        if (!placeComments[localId]) {
            placeComments[localId] = [];
        }
        
        const newComment = {
            userName: userName,
            text: commentText,
            date: new Date().toLocaleString('pt-BR')
        };
        
        placeComments[localId].push(newComment);
        localStorage.setItem('placeComments', JSON.stringify(placeComments));
        
        textarea.value = '';
        alert('✅ Comentário salvo localmente! (Servidor indisponível)');
    }
}