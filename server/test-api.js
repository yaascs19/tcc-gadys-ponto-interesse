// Teste simples da API
const testAPI = async () => {
    const baseURL = 'http://localhost:3001/api';
    
    try {
        // Testar conexão
        console.log('🔍 Testando API...');
        
        // Listar usuários
        const usuarios = await fetch(`${baseURL}/usuarios`);
        const usuariosData = await usuarios.json();
        console.log('👥 Usuários:', usuariosData);
        
        // Listar locais
        const locais = await fetch(`${baseURL}/locais`);
        const locaisData = await locais.json();
        console.log('📍 Locais:', locaisData.length);
        
        // Ranking
        const ranking = await fetch(`${baseURL}/ranking`);
        const rankingData = await ranking.json();
        console.log('🏆 Ranking:', rankingData);
        
        // Estatísticas
        const stats = await fetch(`${baseURL}/estatisticas`);
        const statsData = await stats.json();
        console.log('📊 Estatísticas:', statsData);
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
};

// Executar teste
testAPI();