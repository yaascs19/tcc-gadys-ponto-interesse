-- BANCO GADYS - SQLite (mais simples)
-- Execute: sqlite3 gadys.db < gadys_sqlite.sql

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    tipo_usuario TEXT CHECK (tipo_usuario IN ('usuario', 'adm')) DEFAULT 'usuario',
    ultimo_acesso DATETIME,
    total_acessos INTEGER DEFAULT 0,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Locais
CREATE TABLE locais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    cidade TEXT,
    estado TEXT,
    categoria TEXT,
    status TEXT DEFAULT 'ativo',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Comentários
CREATE TABLE comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    local_nome TEXT NOT NULL,
    usuario_nome TEXT NOT NULL,
    texto TEXT NOT NULL,
    data_comentario DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados iniciais
INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES 
('Yasmin', 'yasmincunegundes25@gmail.com', 'Cun*1925', 'adm');

-- Locais do Amazonas
INSERT INTO locais (nome, descricao, cidade, estado, categoria) VALUES 
('Teatro Amazonas', 'Majestoso teatro construído durante o período áureo da borracha', 'Manaus', 'AM', 'monumentos'),
('Floresta Amazônica', 'A maior floresta tropical do mundo', 'Manaus', 'AM', 'natureza'),
('Açaí', 'Fruto amazônico rico em nutrientes', 'Manaus', 'AM', 'gastronomia'),
('Festival de Parintins', 'Maior festival folclórico do Brasil', 'Parintins', 'AM', 'cultura');