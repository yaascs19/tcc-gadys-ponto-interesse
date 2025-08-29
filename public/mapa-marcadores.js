// Sistema de Marcadores para o Mapa GADYS
class MapaMarcadores {
    constructor() {
        this.map = null;
        this.marcadores = [];
        this.infoWindows = [];
        this.localizacaoAtual = {lat: -3.1319, lng: -60.0239}; // Manaus padrão
        this.initLocais();
    }

    initLocais() {
        // Locais do seu site com coordenadas reais
        this.locais = [
            // AMAZONAS - MONUMENTOS
            {
                id: 1,
                nome: "Teatro Amazonas",
                categoria: "monumentos",
                preco: "pago",
                lat: -3.1305,
                lng: -60.0239,
                descricao: "Majestoso teatro construído durante o período áureo da borracha",
                horario: "Ter-Sáb: 9h-17h",
                valor: "R$ 20,00",
                imagem: "/teatro-amazonas1.jpeg",
                link: "/teatro-amazonas.html"
            },
            {
                id: 2,
                nome: "Forte de São José",
                categoria: "monumentos", 
                preco: "pago",
                lat: -3.1365,
                lng: -60.0166,
                descricao: "Fortaleza histórica que marca o início da colonização de Manaus",
                horario: "Ter-Dom: 8h-17h",
                valor: "R$ 10,00",
                imagem: "/forte.jpeg",
                link: "/forte-sao-jose.html"
            },
            {
                id: 3,
                nome: "Mercado Municipal",
                categoria: "monumentos",
                preco: "gratuito",
                lat: -3.1365,
                lng: -60.0166,
                descricao: "Mercado histórico inspirado no mercado Les Halles de Paris",
                horario: "Seg-Sáb: 6h-18h",
                valor: "Gratuito",
                imagem: "/mer.jpeg",
                link: "/mercado-municipal.html"
            },
            {
                id: 4,
                nome: "Palácio da Justiça",
                categoria: "monumentos",
                preco: "gratuito",
                lat: -3.1300,
                lng: -60.0250,
                descricao: "Edifício histórico com arquitetura colonial preservada",
                horario: "Seg-Sex: 8h-17h",
                valor: "Gratuito",
                imagem: "/jus.jpeg",
                link: "/palacio-justica.html"
            },
            {
                id: 5,
                nome: "Igreja de São Sebastião",
                categoria: "monumentos",
                preco: "gratuito",
                lat: -3.1320,
                lng: -60.0220,
                descricao: "Igreja histórica com arquitetura colonial e importância religiosa",
                horario: "Diário: 6h-18h",
                valor: "Gratuito",
                imagem: "/sao.jpeg",
                link: "/igreja-sao-sebastiao.html"
            },
            {
                id: 6,
                nome: "Palácio Rio Negro",
                categoria: "monumentos",
                preco: "pago",
                lat: -3.1290,
                lng: -60.0210,
                descricao: "Antiga residência dos governadores, hoje centro cultural",
                horario: "Ter-Dom: 10h-17h",
                valor: "R$ 5,00",
                imagem: "/pala.jpeg",
                link: "/palacio-rio-negro.html"
            },

            // AMAZONAS - NATUREZA
            {
                id: 7,
                nome: "Floresta Amazônica",
                categoria: "natureza",
                preco: "pago",
                lat: -3.4653,
                lng: -62.2159,
                descricao: "A maior floresta tropical do mundo com biodiversidade única",
                horario: "24 horas",
                valor: "Varia por tour",
                imagem: "/floresta.jpeg",
                link: "/floresta-amazonica.html"
            },
            {
                id: 8,
                nome: "Encontro das Águas",
                categoria: "natureza",
                preco: "pago",
                lat: -3.1319,
                lng: -59.9825,
                descricao: "Fenômeno natural onde os rios Negro e Solimões se encontram",
                horario: "Diário: 6h-18h",
                valor: "R$ 80-150",
                imagem: "/encontro.jpeg",
                link: "/encontro-aguas.html"
            },
            {
                id: 9,
                nome: "Parque Nacional de Anavilhanas",
                categoria: "natureza",
                preco: "pago",
                lat: -2.3833,
                lng: -60.9167,
                descricao: "Maior arquipélago fluvial do mundo com rica biodiversidade",
                horario: "Diário: 8h-17h",
                valor: "R$ 15,00",
                imagem: "/anavilhas.jpeg",
                link: "/parque-anavilhanas.html"
            },
            {
                id: 10,
                nome: "Reserva Mamirauá",
                categoria: "natureza",
                preco: "pago",
                lat: -3.0833,
                lng: -64.8333,
                descricao: "Maior reserva de várzea do mundo com fauna única",
                horario: "Tours programados",
                valor: "R$ 200-500/dia",
                imagem: "/reserva.jpeg",
                link: "/reserva-mamiraui.html"
            },
            {
                id: 11,
                nome: "Parque Nacional do Jaú",
                categoria: "natureza",
                preco: "pago",
                lat: -1.9000,
                lng: -61.6000,
                descricao: "Uma das maiores unidades de conservação da Amazônia",
                horario: "Acesso controlado",
                valor: "R$ 25,00",
                imagem: "/jau.jpeg",
                link: "/parque-jau.html"
            },
            {
                id: 12,
                nome: "Rio Amazonas",
                categoria: "natureza",
                preco: "pago",
                lat: -3.1319,
                lng: -59.9825,
                descricao: "O maior rio do mundo em volume de água e extensão",
                horario: "24 horas",
                valor: "Varia por atividade",
                imagem: "/rioamz.jpeg",
                link: "/rio-amazonas.html"
            },

            // BRASIL - OUTROS ESTADOS
            {
                id: 13,
                nome: "Cristo Redentor",
                categoria: "monumentos",
                preco: "pago",
                lat: -22.9519,
                lng: -43.2105,
                descricao: "Estátua icônica do Rio de Janeiro",
                horario: "Diário: 8h-19h",
                valor: "R$ 75,00",
                imagem: "/cristo.jpg",
                link: "/cristo-redentor.html"
            },
            {
                id: 14,
                nome: "Pão de Açúcar",
                categoria: "monumentos",
                preco: "pago",
                lat: -22.9486,
                lng: -43.1566,
                descricao: "Cartão postal do Rio de Janeiro",
                horario: "Diário: 8h-19h",
                valor: "R$ 120,00",
                imagem: "/pao.jpg",
                link: "/pao-acucar.html"
            },
            {
                id: 15,
                nome: "Pelourinho",
                categoria: "monumentos",
                preco: "gratuito",
                lat: -12.9714,
                lng: -38.5014,
                descricao: "Centro histórico de Salvador",
                horario: "24 horas",
                valor: "Gratuito",
                imagem: "/pelourinho.jpg",
                link: "/pelourinho.html"
            },
            {
                id: 16,
                nome: "Cataratas do Iguaçu",
                categoria: "natureza",
                preco: "pago",
                lat: -25.6953,
                lng: -54.4367,
                descricao: "Uma das maiores quedas d'água do mundo",
                horario: "Diário: 9h-17h",
                valor: "R$ 85,00",
                imagem: "/cataratas.jpeg",
                link: "/cataratas-iguacu.html"
            },
            {
                id: 17,
                nome: "Fernando de Noronha",
                categoria: "natureza",
                preco: "pago",
                lat: -3.8549,
                lng: -32.4229,
                descricao: "Arquipélago paradisíaco",
                horario: "24 horas",
                valor: "Taxa ambiental",
                imagem: "/noronha.jpeg",
                link: "/fernando-noronha.html"
            },
            {
                id: 18,
                nome: "Pantanal",
                categoria: "natureza",
                preco: "pago",
                lat: -19.0208,
                lng: -57.6531,
                descricao: "Maior planície alagável do mundo",
                horario: "24 horas",
                valor: "Varia por tour",
                imagem: "/pantanal.jpeg",
                link: "/pantanal.html"
            }
        ];
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: this.localizacaoAtual,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });

        this.adicionarTodosMarcadores();
    }

    initMapWithoutAPI() {
        // Mapa sem API - usando iframe interativo
        document.getElementById('map').innerHTML = `
            <div style="position: relative; width: 100%; height: 100%; background: #f0f0f0; border-radius: 15px; overflow: hidden;">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127572.72!2d-60.0239!3d-3.1319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x926c05173c0b0f5b%3A0x2ec5c8c93a2c7e0!2sManaus%2C%20AM!5e0!3m2!1spt!2sbr!4v1234567890123" 
                    width="100%" 
                    height="100%" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
                <div style="position: absolute; top: 10px; left: 10px; background: rgba(255,255,255,0.9); padding: 10px; border-radius: 8px; font-size: 12px; max-width: 200px;">
                    <strong>🗺️ Mapa Interativo</strong><br>
                    Use os filtros abaixo para encontrar locais próximos!
                </div>
            </div>
        `;
    }

    adicionarTodosMarcadores() {
        this.locais.forEach(local => {
            this.adicionarMarcador(local);
        });
    }

    adicionarMarcador(local) {
        const icone = this.getIconePorCategoria(local.categoria);
        
        const marker = new google.maps.Marker({
            position: { lat: local.lat, lng: local.lng },
            map: this.map,
            title: local.nome,
            icon: {
                url: icone,
                scaledSize: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 40)
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: this.criarConteudoInfoWindow(local)
        });

        marker.addListener('click', () => {
            // Fechar outras info windows
            this.infoWindows.forEach(iw => iw.close());
            infoWindow.open(this.map, marker);
        });

        this.marcadores.push(marker);
        this.infoWindows.push(infoWindow);
    }

    criarConteudoInfoWindow(local) {
        return `
            <div style="max-width: 300px; font-family: 'Segoe UI', sans-serif;">
                <div style="position: relative; margin-bottom: 10px;">
                    <img src="${local.imagem}" alt="${local.nome}" 
                         style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
                    <div style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">
                        ${local.categoria === 'monumentos' ? '🏛️ Monumento' : '🌳 Natureza'}
                    </div>
                </div>
                
                <h3 style="margin: 0 0 8px 0; color: #1a237e; font-size: 16px;">${local.nome}</h3>
                
                <p style="margin: 0 0 8px 0; color: #666; font-size: 13px; line-height: 1.4;">
                    ${local.descricao}
                </p>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="background: ${local.preco === 'gratuito' ? '#4caf50' : '#ff9800'}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">
                        ${local.valor}
                    </span>
                    <span style="color: #666; font-size: 11px;">
                        📅 ${local.horario}
                    </span>
                </div>
                
                <div style="display: flex; gap: 8px; margin-top: 12px;">
                    <a href="${local.link}" target="_blank" 
                       style="flex: 1; background: linear-gradient(135deg, #1a237e, #3f51b5); color: white; text-decoration: none; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px; font-weight: bold;">
                        📖 Ver Detalhes
                    </a>
                    <button onclick="mapaMarcadores.calcularRota(${local.lat}, ${local.lng})" 
                            style="flex: 1; background: linear-gradient(135deg, #4caf50, #45a049); color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer;">
                        🗺️ Como Chegar
                    </button>
                </div>
            </div>
        `;
    }

    getIconePorCategoria(categoria) {
        const icones = {
            'monumentos': 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8b4513">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    <path d="M12 4L4 8v9c0 4.28 3.22 7.78 8 8.93 4.78-1.15 8-4.65 8-8.93V8l-8-4z" fill="white"/>
                    <text x="12" y="16" text-anchor="middle" fill="#8b4513" font-size="8">🏛️</text>
                </svg>
            `),
            'natureza': 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#228b22">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="8" fill="white"/>
                    <text x="12" y="16" text-anchor="middle" fill="#228b22" font-size="8">🌳</text>
                </svg>
            `)
        };
        return icones[categoria] || icones['monumentos'];
    }

    filtrarMarcadores(categoria, preco, distanciaMax) {
        // Filtrar locais (sem API do Google Maps)
        const locaisFiltrados = this.locais.filter(local => {
            const passaCategoria = !categoria || local.categoria === categoria;
            const passaPreco = !preco || local.preco === preco;
            
            const distancia = this.calcularDistancia(
                this.localizacaoAtual.lat, 
                this.localizacaoAtual.lng, 
                local.lat, 
                local.lng
            );
            const passaDistancia = distancia <= distanciaMax;
            
            return passaCategoria && passaPreco && passaDistancia;
        });

        // Atualizar mapa com locais filtrados
        if (locaisFiltrados.length > 0) {
            this.atualizarMapaComFiltros(locaisFiltrados);
        }

        return locaisFiltrados;
    }

    atualizarMapaComFiltros(locais) {
        if (locais.length === 1) {
            // Mostrar local específico
            const local = locais[0];
            const novoMapa = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000!2d${local.lng}!3d${local.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zM8KwMDcnNTQuMCJTIDYwwrAwMScyNi4wIlc!5e0!3m2!1spt!2sbr!4v1234567890123`;
            document.getElementById('map').innerHTML = `
                <iframe 
                    src="${novoMapa}" 
                    width="100%" 
                    height="100%" 
                    style="border:0; border-radius: 15px;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
            `;
        } else {
            // Mostrar região geral
            const centro = this.calcularCentroLocais(locais);
            const novoMapa = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500000!2d${centro.lng}!3d${centro.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt!2sbr!4v1234567890123`;
            document.getElementById('map').innerHTML = `
                <iframe 
                    src="${novoMapa}" 
                    width="100%" 
                    height="100%" 
                    style="border:0; border-radius: 15px;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
            `;
        }
    }

    calcularCentroLocais(locais) {
        const lat = locais.reduce((sum, local) => sum + local.lat, 0) / locais.length;
        const lng = locais.reduce((sum, local) => sum + local.lng, 0) / locais.length;
        return {lat, lng};
    }

    ajustarZoomParaMarcadores(locais) {
        if (locais.length === 1) {
            this.map.setCenter({lat: locais[0].lat, lng: locais[0].lng});
            this.map.setZoom(12);
        } else if (locais.length > 1) {
            const bounds = new google.maps.LatLngBounds();
            locais.forEach(local => {
                bounds.extend(new google.maps.LatLng(local.lat, local.lng));
            });
            this.map.fitBounds(bounds);
        }
    }

    calcularDistancia(lat1, lng1, lat2, lng2) {
        const R = 6371; // Raio da Terra em km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                 Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    calcularRota(destLat, destLng) {
        const origem = `${this.localizacaoAtual.lat},${this.localizacaoAtual.lng}`;
        const destino = `${destLat},${destLng}`;
        const url = `https://www.google.com/maps/dir/${origem}/${destino}`;
        window.open(url, '_blank');
    }

    atualizarLocalizacao(lat, lng) {
        this.localizacaoAtual = {lat, lng};
        
        // Atualizar mapa para nova localização
        const novoMapa = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt!2sbr!4v1234567890123`;
        document.getElementById('map').innerHTML = `
            <iframe 
                src="${novoMapa}" 
                width="100%" 
                height="100%" 
                style="border:0; border-radius: 15px;" 
                allowfullscreen="" 
                loading="lazy">
            </iframe>
        `;
    }
}

// Instância global
let mapaMarcadores;