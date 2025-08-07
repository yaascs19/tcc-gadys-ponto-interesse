function addComment(localId, buttonElement) {
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
    
    // Carrega comentários existentes
    let placeComments = JSON.parse(localStorage.getItem('placeComments')) || {};
    
    if (!placeComments[localId]) {
        placeComments[localId] = [];
    }
    
    // Adiciona novo comentário
    const newComment = {
        userName: userName,
        text: commentText,
        date: new Date().toLocaleString('pt-BR')
    };
    
    placeComments[localId].push(newComment);
    
    // Salva no localStorage
    localStorage.setItem('placeComments', JSON.stringify(placeComments));
    
    // Limpa o textarea
    textarea.value = '';
    
    alert('✅ Comentário adicionado com sucesso! Obrigado por compartilhar sua experiência.');
}