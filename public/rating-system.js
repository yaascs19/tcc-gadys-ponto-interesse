// Sistema de avaliações global conectado com API
async function setRating(localId, rating) {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        alert('Você precisa estar logado para avaliar!');
        return;
    }
    
    try {
        // Tentar salvar na API
        const response = await fetch('http://localhost:3001/api/avaliacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                localId: getLocalIdByName(localId),
                usuarioId: 1, // ID padrão
                nota: rating
            })
        });
        
        if (response.ok) {
            alert(`Obrigado por avaliar! Você deu ${rating} estrela${rating > 1 ? 's' : ''}.`);
            loadRatingsFromAPI();
        } else {
            const error = await response.json();
            if (error.error.includes('já avaliou')) {
                alert('Você já avaliou este local!');
            } else {
                throw new Error(error.error);
            }
        }
    } catch (error) {
        // Fallback para localStorage
        let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {};
        let userRatings = JSON.parse(localStorage.getItem('userRatings')) || {};
        const userKey = `${userName}_${localId}`;
        
        if (userRatings[userKey]) {
            alert('Você já avaliou este local!');
            return;
        }
        
        if (!avaliacoes[localId]) {
            avaliacoes[localId] = [];
        }
        
        avaliacoes[localId].push(rating);
        userRatings[userKey] = rating;
        
        localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
        localStorage.setItem('userRatings', JSON.stringify(userRatings));
        updatePlaceRatings(localId, avaliacoes[localId]);
        updateRatingDisplay(localId);
        updateUserStars(localId, rating);
        
        alert(`Avaliação salva localmente! ${rating} estrela${rating > 1 ? 's' : ''}.`);
    }
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
    // Sincroniza avaliações existentes para o formato do painel administrativo
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {};
    Object.keys(avaliacoes).forEach(localId => {
        updatePlaceRatings(localId, avaliacoes[localId]);
    });
    
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

function updatePlaceRatings(localId, ratings) {
    let placeRatings = JSON.parse(localStorage.getItem('placeRatings')) || {};
    
    if (ratings.length > 0) {
        const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        placeRatings[localId] = {
            average: average,
            count: ratings.length
        };
    } else {
        delete placeRatings[localId];
    }
    
    localStorage.setItem('placeRatings', JSON.stringify(placeRatings));
}

// Função para mapear nomes para IDs
function getLocalIdByName(localName) {
    const mapping = {
        'teatro': 1, 'forte': 2, 'mercado': 3, 'justica': 4, 'igreja': 5, 'palacio': 6,
        'floresta': 7, 'encontro': 8, 'anavilhanas': 9, 'mamiraui': 10, 'jau': 11, 'rioamazonas': 12,
        'acai': 13, 'tucuma': 14, 'pirarucu': 15, 'cupuacu': 16, 'tacaca': 17, 'farinha': 18,
        'festival': 19, 'lendas': 20, 'artesanato': 21, 'ciranda': 22, 'carimbo': 23, 'rituais': 24,
        'cristo': 25, 'pao': 26, 'cataratas': 27, 'pelourinho': 28, 'noronha': 29, 'pantanal': 30
    };
    return mapping[localName] || 1;
}

// Carregar avaliações da API
async function loadRatingsFromAPI() {
    try {
        const response = await fetch('http://localhost:3001/api/ranking');
        if (response.ok) {
            const rankings = await response.json();
            rankings.forEach(item => {
                const localName = item.Nome.toLowerCase().replace(/[^a-z]/g, '');
                updateRatingDisplayFromAPI(localName, {
                    average: item.MediaAvaliacoes || 0,
                    count: item.TotalAvaliacoes || 0
                });
            });
        }
    } catch (error) {
        console.log('API indisponível, usando dados locais');
        loadAllRatings();
    }
}

function updateRatingDisplayFromAPI(localId, data) {
    const ratingElement = document.getElementById(`rating-${localId}`);
    const starsElement = document.getElementById(`stars-${localId}`);
    const countElement = document.getElementById(`count-${localId}`);
    
    if (ratingElement && starsElement && countElement) {
        ratingElement.textContent = data.average.toFixed(1);
        starsElement.textContent = getStarsDisplay(data.average);
        countElement.textContent = `(${data.count})`;
    }
}

// Carrega avaliações quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    loadRatingsFromAPI();
});