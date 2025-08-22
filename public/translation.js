// Sistema de tradução PT/EN
const translations = {
    pt: {
        // Navegação
        'inicio': 'Início',
        'estados-brasileiros': 'Estados Brasileiros',
        'meu-perfil': 'Meu Perfil',
        'mapa': 'Mapa',
        'sobre': 'Sobre',
        'contato': 'Contato',
        'sair': 'Sair',
        
        // Páginas principais
        'bem-vindo': 'Bem-vindo ao GADYS',
        'descubra-pontos': 'Descubra os pontos de interesse mais incríveis do Brasil. Explore monumentos, natureza, gastronomia e cultura de cada estado.',
        'fazer-login': 'Fazer Login',
        'pular': 'Pular',
        
        // Amazonas
        'amazonas': 'Amazonas',
        'coracao-amazonia': 'O coração da Amazônia brasileira',
        'visite-lugares': 'Visite Lugares',
        'curiosidades': 'Curiosidades',
        'monumentos': 'Monumentos',
        'natureza': 'Natureza',
        'gastronomia': 'Gastronomia',
        'cultura': 'Cultura',
        'sobre-amazonas': 'Sobre o Amazonas',
        
        // Locais
        'lugares-mais-visitados': 'Lugares Mais Visitados do Brasil',
        'destinos-procurados': 'Descubra os destinos mais procurados pelos turistas',
        'visitar': 'Visitar',
        'avaliar': 'Avaliar',
        'comentarios': 'Comentários',
        'comentar': 'Comentar',
        'compartilhe-experiencia': 'Compartilhe sua experiência...',
        
        // Perfil
        'meu-perfil-titulo': 'Meu Perfil',
        'informacoes-pessoais': 'Informações Pessoais',
        'atividade-recente': 'Atividade Recente',
        'nome': 'Nome',
        'email': 'Email',
        'tipo-conta': 'Tipo de Conta',
        'membro-desde': 'Membro desde',
        'ultimo-acesso': 'Último Acesso',
        'total-acessos': 'Total de Acessos',
        'locais-adicionados': 'Locais Adicionados',
        'avaliacoes-feitas': 'Avaliações Feitas',
        'comentarios-feitos': 'Comentários Feitos',
        'editar-perfil': 'Editar Perfil',
        'adicionar-locais': 'Adicionar Locais',
        'minhas-perguntas': 'Minhas Perguntas',
        'avaliacoes-comentarios': 'Avaliações e Comentários',
        'painel-administrativo': 'Painel Administrativo',
        
        // Adicionar locais
        'adicionar-novo-local': 'Adicionar Novo Local',
        'nome-local': 'Nome do Local',
        'categoria-principal': 'Categoria Principal',
        'subcategoria': 'Subcategoria',
        'cidade': 'Cidade',
        'estado': 'Estado',
        'descricao': 'Descrição',
        'imagem-local': 'Imagem do Local',
        'localizacao-endereco': 'Localização/Endereço',
        'coordenadas': 'Coordenadas (Latitude, Longitude)',
        'horario-funcionamento': 'Horário de Funcionamento',
        'preco-entrada': 'Preço/Entrada',
        'informacoes-adicionais': 'Informações Adicionais',
        
        // Footer
        'direitos-reservados': 'Todos os direitos reservados'
    },
    en: {
        // Navigation
        'inicio': 'Home',
        'estados-brasileiros': 'Brazilian States',
        'meu-perfil': 'My Profile',
        'mapa': 'Map',
        'sobre': 'About',
        'contato': 'Contact',
        'sair': 'Logout',
        
        // Main pages
        'bem-vindo': 'Welcome to GADYS',
        'descubra-pontos': 'Discover the most incredible points of interest in Brazil. Explore monuments, nature, gastronomy and culture of each state.',
        'fazer-login': 'Login',
        'pular': 'Skip',
        
        // Amazonas
        'amazonas': 'Amazonas',
        'coracao-amazonia': 'The heart of the Brazilian Amazon',
        'visite-lugares': 'Visit Places',
        'curiosidades': 'Curiosities',
        'monumentos': 'Monuments',
        'natureza': 'Nature',
        'gastronomia': 'Gastronomy',
        'cultura': 'Culture',
        'sobre-amazonas': 'About Amazonas',
        
        // Places
        'lugares-mais-visitados': 'Most Visited Places in Brazil',
        'destinos-procurados': 'Discover the most sought-after destinations by tourists',
        'visitar': 'Visit',
        'avaliar': 'Rate',
        'comentarios': 'Comments',
        'comentar': 'Comment',
        'compartilhe-experiencia': 'Share your experience...',
        
        // Profile
        'meu-perfil-titulo': 'My Profile',
        'informacoes-pessoais': 'Personal Information',
        'atividade-recente': 'Recent Activity',
        'nome': 'Name',
        'email': 'Email',
        'tipo-conta': 'Account Type',
        'membro-desde': 'Member since',
        'ultimo-acesso': 'Last Access',
        'total-acessos': 'Total Access',
        'locais-adicionados': 'Added Places',
        'avaliacoes-feitas': 'Ratings Made',
        'comentarios-feitos': 'Comments Made',
        'editar-perfil': 'Edit Profile',
        'adicionar-locais': 'Add Places',
        'minhas-perguntas': 'My Questions',
        'avaliacoes-comentarios': 'Ratings and Comments',
        'painel-administrativo': 'Administrative Panel',
        
        // Add places
        'adicionar-novo-local': 'Add New Place',
        'nome-local': 'Place Name',
        'categoria-principal': 'Main Category',
        'subcategoria': 'Subcategory',
        'cidade': 'City',
        'estado': 'State',
        'descricao': 'Description',
        'imagem-local': 'Place Image',
        'localizacao-endereco': 'Location/Address',
        'coordenadas': 'Coordinates (Latitude, Longitude)',
        'horario-funcionamento': 'Opening Hours',
        'preco-entrada': 'Price/Entrance',
        'informacoes-adicionais': 'Additional Information',
        
        // Footer
        'direitos-reservados': 'All rights reserved'
    }
};

let currentLanguage = localStorage.getItem('language') || 'pt';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    localStorage.setItem('language', currentLanguage);
    translatePage();
    updateLanguageButton();
}

function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
}

function updateLanguageButton() {
    const langButton = document.getElementById('languageToggle');
    if (langButton) {
        langButton.textContent = currentLanguage === 'pt' ? '🇺🇸' : '🇧🇷';
        langButton.title = currentLanguage === 'pt' ? 'Switch to English' : 'Mudar para Português';
    }
}

// Inicializar tradução ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    translatePage();
    updateLanguageButton();
});