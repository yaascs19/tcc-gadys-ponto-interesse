// Script para padronizar navbar das páginas específicas
function padronizarNavbar() {
    const navbarHTML = `
        <li><a href="/">Início</a></li>
        <li class="dropdown">
            <a href="#estados">Estados Brasileiros ▼</a>
            <div class="dropdown-content">
                <a href="#">Acre</a>
                <a href="#">Alagoas</a>
                <a href="#">Amapá</a>
                <a href="/amazonas.html">Amazonas</a>
                <a href="#">Bahia</a>
                <a href="#">Ceará</a>
                <a href="#">Distrito Federal</a>
                <a href="#">Espírito Santo</a>
                <a href="#">Goiás</a>
                <a href="#">Maranhão</a>
                <a href="#">Mato Grosso</a>
                <a href="#">Mato Grosso do Sul</a>
                <a href="#">Minas Gerais</a>
                <a href="#">Pará</a>
                <a href="#">Paraíba</a>
                <a href="#">Paraná</a>
                <a href="#">Pernambuco</a>
                <a href="#">Piauí</a>
                <a href="#">Rio de Janeiro</a>
                <a href="#">Rio Grande do Norte</a>
                <a href="#">Rio Grande do Sul</a>
                <a href="#">Rondônia</a>
                <a href="#">Roraima</a>
                <a href="#">Santa Catarina</a>
                <a href="#">São Paulo</a>
                <a href="#">Sergipe</a>
                <a href="#">Tocantins</a>
            </div>
        </li>
        <li><a href="/perfil.html">Meu Perfil</a></li>
        <li><a href="/mapa.html">Mapa</a></li>
        <li><a href="/sobre.html">Sobre</a></li>
        <li><a href="/contato.html">Contato</a></li>
        ${(function() {
            const userType = localStorage.getItem('userType');
            console.log('UserType na navbar:', userType);
            return userType === 'adm' ? '<li><a href="/" onclick="sessionStorage.setItem(\'openAdmin\', \'true\');">Administração</a></li>' : '';
        })()}
    `;
    
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.innerHTML = navbarHTML;
    }
}

// CSS para dropdown
const dropdownCSS = `
    .nav-links {
        display: flex;
        list-style: none;
        gap: 2rem;
    }
    
    .nav-links a {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        transition: background 0.3s;
    }
    
    .nav-links a:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .dropdown {
        position: relative;
        display: inline-block;
    }
    
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: white;
        min-width: 200px;
        max-height: 300px;
        overflow-y: auto;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1000;
        border-radius: 5px;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .dropdown-content a {
        color: #333 !important;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        transition: background-color 0.3s;
        text-align: center;
    }
    
    .dropdown-content a:hover {
        background-color: #f1f1f1;
        color: #1a237e !important;
    }
    
    .dropdown:hover .dropdown-content {
        display: block;
    }
`;

// Adicionar CSS
const style = document.createElement('style');
style.textContent = dropdownCSS;
document.head.appendChild(style);

// Executar quando página carregar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(padronizarNavbar, 100);
});