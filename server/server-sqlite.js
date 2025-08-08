const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao banco SQLite
const dbPath = path.join(__dirname, '../database/gadys.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Erro ao conectar ao SQLite:', err);
    } else {
        console.log('✅ Conectado ao SQLite');
    }
});

// =============================================
// ROTAS BÁSICAS PARA TESTE
// =============================================

// Rota de teste
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'API funcionando!',
        database: 'SQLite',
        timestamp: new Date().toISOString()
    });
});

// Listar locais (simulado)
app.get('/api/locais', (req, res) => {
    const locais = [
        {
            id: 1,
            nome: 'Teatro Amazonas',
            descricao: 'Majestoso teatro construído durante o período áureo da borracha',
            categoria: 'Monumentos',
            cidade: 'Manaus',
            estado: 'Amazonas'
        },
        {
            id: 2,
            nome: 'Encontro das Águas',
            descricao: 'Fenômeno natural onde os rios Negro e Solimões se encontram',
            categoria: 'Natureza',
            cidade: 'Manaus',
            estado: 'Amazonas'
        }
    ];
    res.json(locais);
});

// Login básico
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    
    // Login básico para teste
    if (email && senha) {
        res.json({ 
            success: true, 
            user: { 
                id: 1, 
                nome: 'Usuário Teste', 
                email: email,
                tipoUsuario: 'usuario'
            }
        });
    } else {
        res.status(401).json({ error: 'Credenciais inválidas!' });
    }
});

// Adicionar local
app.post('/api/locais', (req, res) => {
    const { nome, descricao, cidade, categoria } = req.body;
    
    if (nome && descricao) {
        res.json({ 
            success: true, 
            message: 'Local cadastrado com sucesso!',
            local: { nome, descricao, cidade, categoria }
        });
    } else {
        res.status(400).json({ error: 'Dados incompletos!' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor SQLite rodando na porta ${PORT}`);
    console.log(`📡 API disponível em http://localhost:${PORT}`);
    console.log(`🗄️ Banco: SQLite (${dbPath})`);
});

module.exports = app;