// Sistema para carregar dados da API em todas as páginas

// Carregar locais de uma categoria específica
async function loadLocaisFromAPI(categoria) {
    try {
        const response = await fetch(`http://localhost:3001/api/locais/categoria/${categoria}`);
        if (response.ok) {
            const locais = await response.json();
            return locais;
        }
    } catch (error) {
        console.log('API indisponível, usando dados locais');
    }
    return null;
}

// Adicionar locais da API ao grid existente
async function addAPILocaisToGrid(categoria) {
    const locais = await loadLocaisFromAPI(categoria);
    if (!locais) return;
    
    const grid = document.querySelector('.grid');
    if (!grid) return;
    
    locais.forEach(local => {
        // Verifica se o local já existe na página
        const existingCard = Array.from(grid.children).find(card => 
            card.querySelector('.card-title')?.textContent === local.Nome
        );
        
        if (!existingCard) {
            const card = document.createElement('div');
            card.className = 'card';
            
            const localId = local.Nome.toLowerCase().replace(/[^a-z]/g, '');
            
            card.innerHTML = `
                <img src="${local.ImagemURL || '/minha-imagem.jpg'}" alt="${local.Nome}" onerror="this.src='/minha-imagem.jpg'">
                <div class="card-info">
                    <h3 class="card-title">${local.Nome}</h3>
                    <p class="cidade">${local.Cidade} - ${local.EstadoSigla}</p>
                    <p class="descricao">${local.Descricao}</p>
                    <div class="rating-section">
                        <div class="rating-display">
                            <span class="stars" id="stars-${localId}">☆☆☆☆☆</span>
                            <span class="rating-number" id="rating-${localId}">0.0</span>
                            <span class="rating-count" id="count-${localId}">(0)</span>
                        </div>
                        <div class="user-rating">
                            <span>Avaliar:</span>
                            <span class="star" onclick="setRating('${localId}', 1)">☆</span>
                            <span class="star" onclick="setRating('${localId}', 2)">☆</span>
                            <span class="star" onclick="setRating('${localId}', 3)">☆</span>
                            <span class="star" onclick="setRating('${localId}', 4)">☆</span>
                            <span class="star" onclick="setRating('${localId}', 5)">☆</span>
                        </div>
                    </div>
                    <div class="comments-section">
                        <h4>💬 Comentários</h4>
                        <textarea placeholder="Compartilhe sua experiência..."></textarea>
                        <button class="comments-btn ${categoria.toLowerCase()}" onclick="addComment('${localId}', this)">Comentar</button>
                    </div>
                    <button class="button" onclick="window.location.href='/detalhes-local.html?id=${local.ID}'">
                        ${categoria === 'Monumentos' ? 'Visitar' : 
                          categoria === 'Natureza' ? 'Explorar' : 
                          categoria === 'Gastronomia' ? 'Experimentar' : 'Vivenciar'}
                    </button>
                </div>
            `;
            
            grid.appendChild(card);
        }
    });
}

// Detectar categoria da página atual e carregar dados
function detectAndLoadCategory() {
    const url = window.location.pathname;
    let categoria = null;
    
    if (url.includes('monumentos')) categoria = 'Monumentos';
    else if (url.includes('natureza')) categoria = 'Natureza';
    else if (url.includes('gastronomia')) categoria = 'Gastronomia';
    else if (url.includes('cultura')) categoria = 'Cultura';
    
    if (categoria) {
        addAPILocaisToGrid(categoria);
    }
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    detectAndLoadCategory();
});