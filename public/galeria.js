// Sistema de Galeria de Fotos para Locais
class GaleriaFotos {
    constructor() {
        this.fotos = {
            'teatro-amazonas': [
                '/teatro-amazonas1.jpeg',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
            ],
            'encontro-aguas': [
                '/encontro.jpeg',
                'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
                'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'
            ],
            'floresta-amazonica': [
                '/floresta.jpeg',
                'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800',
                'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800'
            ]
        };
        this.init();
    }

    init() {
        this.adicionarGaleriasAosLocais();
    }

    adicionarGaleriasAosLocais() {
        // Procurar por cards de locais e adicionar galerias
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const titulo = card.querySelector('.card-title');
            if (titulo) {
                const localId = this.getLocalId(titulo.textContent);
                if (this.fotos[localId]) {
                    this.criarGaleria(card, localId);
                }
            }
        });
    }

    getLocalId(nome) {
        const mapeamento = {
            'Teatro Amazonas': 'teatro-amazonas',
            'Encontro das Águas': 'encontro-aguas',
            'Floresta Amazônica': 'floresta-amazonica'
        };
        return mapeamento[nome];
    }

    criarGaleria(card, localId) {
        const fotos = this.fotos[localId];
        const imgElement = card.querySelector('img');
        
        if (imgElement && fotos.length > 1) {
            // Criar container da galeria
            const galeriaContainer = document.createElement('div');
            galeriaContainer.className = 'galeria-container';
            galeriaContainer.style.cssText = `
                position: relative;
                overflow: hidden;
                border-radius: 15px 15px 0 0;
            `;

            // Criar slides
            fotos.forEach((foto, index) => {
                const slide = document.createElement('div');
                slide.className = 'galeria-slide';
                slide.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 250px;
                    opacity: ${index === 0 ? '1' : '0'};
                    transition: opacity 0.5s ease;
                `;

                const img = document.createElement('img');
                img.src = foto;
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                `;
                
                slide.appendChild(img);
                galeriaContainer.appendChild(slide);
            });

            // Criar indicadores
            const indicadores = document.createElement('div');
            indicadores.className = 'galeria-indicadores';
            indicadores.style.cssText = `
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 5px;
                z-index: 10;
            `;

            fotos.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'galeria-dot';
                dot.style.cssText = `
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    border: none;
                    background: ${index === 0 ? 'white' : 'rgba(255,255,255,0.5)'};
                    cursor: pointer;
                    transition: all 0.3s;
                `;
                
                dot.addEventListener('click', () => {
                    this.mostrarSlide(galeriaContainer, index);
                });
                
                indicadores.appendChild(dot);
            });

            galeriaContainer.appendChild(indicadores);

            // Substituir imagem original
            imgElement.parentNode.replaceChild(galeriaContainer, imgElement);

            // Auto-slide
            let currentSlide = 0;
            setInterval(() => {
                currentSlide = (currentSlide + 1) % fotos.length;
                this.mostrarSlide(galeriaContainer, currentSlide);
            }, 4000);
        }
    }

    mostrarSlide(container, index) {
        const slides = container.querySelectorAll('.galeria-slide');
        const dots = container.querySelectorAll('.galeria-dot');

        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });

        dots.forEach((dot, i) => {
            dot.style.background = i === index ? 'white' : 'rgba(255,255,255,0.5)';
        });
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new GaleriaFotos();
});