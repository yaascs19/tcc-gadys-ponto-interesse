// Função global para abrir painel admin
window.openAdminPanel = function() {
    console.log('openAdminPanel chamada!');
    
    if (localStorage.getItem('userType') !== 'adm') {
        alert('Acesso negado! Apenas administradores podem acessar esta página.');
        return;
    }

    // Criar div para modal admin se não existir
    if (!document.getElementById('admin-modal-root')) {
        const adminModalDiv = document.createElement('div');
        adminModalDiv.id = 'admin-modal-root';
        document.body.appendChild(adminModalDiv);
    }

    // Criar modal simples
    const modalHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; width: 80vw; height: 80vh; border-radius: 15px; padding: 2rem; overflow: auto; position: relative;">
                <button onclick="document.getElementById('admin-modal-root').innerHTML = '';" style="position: absolute; top: 20px; right: 20px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.5rem;">×</button>
                <h1 style="text-align: center; color: #2c3e50; margin-bottom: 2rem;">🛠️ Painel Administrativo</h1>
                <div style="text-align: center; padding: 2rem; color: #666;">
                    <p>Painel admin carregado com sucesso!</p>
                    <p>Locais pendentes: ${JSON.parse(localStorage.getItem('pendingLocations') || '[]').length}</p>
                    <p>Locais aprovados: ${JSON.parse(localStorage.getItem('approvedLocations') || '[]').length}</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('admin-modal-root').innerHTML = modalHTML;
    console.log('Modal criado!');
};

// Criar div para modal admin imediatamente
if (!document.getElementById('admin-modal-root')) {
    const adminModalDiv = document.createElement('div');
    adminModalDiv.id = 'admin-modal-root';
    document.body.appendChild(adminModalDiv);
}

console.log('React integration loaded, openAdminPanel:', window.openAdminPanel);