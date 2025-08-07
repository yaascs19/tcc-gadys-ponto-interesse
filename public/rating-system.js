// Sistema de avaliações global
function setRating(localId, rating) {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        alert('Você precisa estar logado para avaliar!');
        return;
    }
    
    let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {};
    let userRatings = JSON.parse(localStorage.getItem('userRatings')) || {};
    const userKey = `${userName}_${localId}`;
    
    if (!avaliacoes[localId]) {
        avaliacoes[localId] = [];
    }
    
    if (!userRatings[userKey]) {
        avaliacoes[localId].push(rating);
    } else {
        const oldRating = userRatings[userKey];
        const index = avaliacoes[localId].indexOf(oldRating);
        if (index > -1) {
            avaliacoes[localId][index] = rating;
        }
    }
    
    userRatings[userKey] = rating;
    
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    localStorage.setItem('userRatings', JSON.stringify(userRatings));
    
    updateRatingDisplay(localId);
    updateUserStars(localId, rating);
}

function updateRatingDisplay(localId) {
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {};
    const localAvaliacoes = avaliacoes[localId] || [];
    
    const ratingElement = document.getElementById(`rating-${localId}`);
    const starsElement = document.getElementById(`stars-${localId}`);
    const countElement = document.getElementById(`count-${localId}`);
    
    if (localAvaliacoes.length > 0 && ratingElement && starsElement && countElement) {
        const media = localAvaliacoes.reduce((sum, rating) => sum + rating, 0) / localAvaliacoes.length;
        ratingElement.textContent = media.toFixed(1);
        starsElement.textContent = getStarsDisplay(media);
        countElement.textContent = `(${localAvaliacoes.length})`;
    }
}

function updateUserStars(localId, rating) {
    const stars = document.querySelectorAll(`[onclick*="'${localId}'"]`);
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.textContent = '★';
        } else {
            star.classList.remove('active');
            star.textContent = '☆';
        }
    });
}

function getStarsDisplay(rating) {
    const fullStars = Math.floor(rating);
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    while (stars.length < 5) {
        stars += '☆';
    }
    return stars;
}

function loadAllRatings() {
    // Carrega avaliações para todos os elementos com rating na página
    const ratingElements = document.querySelectorAll('[id^="rating-"]');
    ratingElements.forEach(element => {
        const localId = element.id.replace('rating-', '');
        updateRatingDisplay(localId);
        
        const userName = localStorage.getItem('userName');
        const userRatings = JSON.parse(localStorage.getItem('userRatings')) || {};
        const userKey = `${userName}_${localId}`;
        
        if (userRatings[userKey]) {
            updateUserStars(localId, userRatings[userKey]);
        }
    });
}

// Carrega avaliações quando a página é carregada
document.addEventListener('DOMContentLoaded', loadAllRatings);