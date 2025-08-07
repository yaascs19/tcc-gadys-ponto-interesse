-- Banco de Dados GADYS - Sistema de Pontos de Interesse
CREATE DATABASE gadys_db;
USE gadys_db;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('usuario', 'adm') DEFAULT 'usuario',
    ultimo_acesso DATETIME,
    total_acessos INT DEFAULT 0,
    ip_acesso VARCHAR(45),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Estados
CREATE TABLE estados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    sigla CHAR(2) UNIQUE NOT NULL
);

-- Tabela de Cidades
CREATE TABLE cidades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    estado_id INT,
    FOREIGN KEY (estado_id) REFERENCES estados(id)
);

-- Tabela de Categorias
CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    icone VARCHAR(10),
    cor VARCHAR(7)
);

-- Tabela de Locais/Pontos de Interesse
CREATE TABLE locais (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    cidade_id INT,
    categoria_id INT,
    endereco TEXT,
    coordenadas VARCHAR(50),
    horario_funcionamento TEXT,
    preco VARCHAR(100),
    informacoes_adicionais TEXT,
    imagem_url VARCHAR(500),
    status ENUM('ativo', 'inativo', 'pendente') DEFAULT 'ativo',
    criado_por INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_aprovacao DATETIME,
    aprovado_por INT,
    FOREIGN KEY (cidade_id) REFERENCES cidades(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (criado_por) REFERENCES usuarios(id),
    FOREIGN KEY (aprovado_por) REFERENCES usuarios(id)
);

-- Tabela de Avaliações
CREATE TABLE avaliacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    local_id INT,
    usuario_id INT,
    nota INT CHECK (nota >= 1 AND nota <= 5),
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (local_id) REFERENCES locais(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    UNIQUE KEY unique_user_rating (local_id, usuario_id)
);

-- Tabela de Comentários
CREATE TABLE comentarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    local_id INT,
    usuario_id INT,
    texto TEXT NOT NULL,
    data_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (local_id) REFERENCES locais(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabela de Locais Excluídos (Lixeira)
CREATE TABLE locais_excluidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    local_original_id INT,
    nome VARCHAR(200),
    descricao TEXT,
    dados_completos JSON,
    data_exclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    excluido_por INT,
    FOREIGN KEY (excluido_por) REFERENCES usuarios(id)
);

-- Inserção de dados iniciais

-- Estados
INSERT INTO estados (nome, sigla) VALUES 
('Amazonas', 'AM'),
('São Paulo', 'SP'),
('Rio de Janeiro', 'RJ');

-- Cidades
INSERT INTO cidades (nome, estado_id) VALUES 
('Manaus', 1),
('Parintins', 1),
('Tefé', 1),
('Novo Airão', 1);

-- Categorias
INSERT INTO categorias (nome, icone, cor) VALUES 
('Monumentos', '🏛️', '#8b4513'),
('Natureza', '🌳', '#228b22'),
('Gastronomia', '🍽️', '#ff8c00'),
('Cultura', '🎨', '#800080');

-- Usuário Administrador
INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES 
('Yasmin', 'yasmincunegundes25@gmail.com', 'Cun*1925', 'adm');

-- Locais pré-existentes
INSERT INTO locais (nome, descricao, cidade_id, categoria_id, criado_por) VALUES 
-- Monumentos
('Teatro Amazonas', 'Majestoso teatro construído durante o período áureo da borracha', 1, 1, 1),
('Forte de São José', 'Fortaleza histórica que marca o início da colonização de Manaus', 1, 1, 1),
('Mercado Municipal', 'Mercado histórico inspirado no mercado Les Halles de Paris', 1, 1, 1),
('Palácio da Justiça', 'Edifício histórico com arquitetura colonial preservada', 1, 1, 1),
('Igreja de São Sebastião', 'Igreja histórica com arquitetura colonial e importância religiosa', 1, 1, 1),
('Palácio Rio Negro', 'Antiga residência dos governadores, hoje centro cultural', 1, 1, 1),

-- Natureza
('Floresta Amazônica', 'A maior floresta tropical do mundo com biodiversidade única', 1, 2, 1),
('Encontro das Águas', 'Fenômeno natural onde os rios Negro e Solimões se encontram', 1, 2, 1),
('Parque Nacional de Anavilhanas', 'Maior arquipélago fluvial do mundo com rica biodiversidade', 4, 2, 1),
('Reserva Mamirauá', 'Maior reserva de várzea do mundo com fauna única', 3, 2, 1),
('Parque Nacional do Jaú', 'Uma das maiores unidades de conservação da Amazônia', 4, 2, 1),
('Rio Amazonas', 'O maior rio do mundo em volume de água e extensão', 1, 2, 1),

-- Gastronomia
('Açaí', 'Fruto amazônico rico em nutrientes e sabor único', 1, 3, 1),
('Tucumã', 'Fruto típico consumido com farinha de mandioca', 1, 3, 1),
('Pirarucu', 'Peixe gigante da Amazônia preparado de diversas formas', 1, 3, 1),
('Cupuaçu', 'Fruto amazônico usado em doces e sucos refrescantes', 1, 3, 1),
('Tacacá', 'Prato típico com tucumã, camarão seco e jambu', 1, 3, 1),
('Farinha de Mandioca', 'Ingrediente essencial da culinária amazônica', 1, 3, 1),

-- Cultura
('Festival de Parintins', 'Maior festival folclórico do Brasil com bois-bumbás', 2, 4, 1),
('Lendas Amazônicas', 'Curupira, Boto-cor-de-rosa, Iara e outras lendas da floresta', 1, 4, 1),
('Artesanato Indígena', 'Cestas, cerâmicas e objetos tradicionais dos povos originários', 1, 4, 1),
('Ciranda Amazônica', 'Dança tradicional em roda com cantos e instrumentos regionais', 1, 4, 1),
('Carimbó', 'Ritmo e dança típica com tambores e movimentos sensuais', 1, 4, 1),
('Rituais Xamânicos', 'Cerimônias ancestrais com plantas sagradas e cura espiritual', 1, 4, 1);

-- Views úteis
CREATE VIEW ranking_locais AS
SELECT 
    l.id,
    l.nome,
    c.nome as categoria,
    AVG(a.nota) as media_avaliacoes,
    COUNT(a.id) as total_avaliacoes,
    COUNT(com.id) as total_comentarios
FROM locais l
LEFT JOIN avaliacoes a ON l.id = a.local_id
LEFT JOIN comentarios com ON l.id = com.local_id
LEFT JOIN categorias c ON l.categoria_id = c.id
WHERE l.status = 'ativo'
GROUP BY l.id, l.nome, c.nome
ORDER BY media_avaliacoes DESC, total_avaliacoes DESC;

CREATE VIEW locais_completos AS
SELECT 
    l.*,
    c.nome as categoria,
    c.icone as categoria_icone,
    c.cor as categoria_cor,
    cid.nome as cidade,
    e.nome as estado,
    e.sigla as estado_sigla,
    u.nome as criado_por_nome
FROM locais l
JOIN categorias c ON l.categoria_id = c.id
JOIN cidades cid ON l.cidade_id = cid.id
JOIN estados e ON cid.estado_id = e.id
JOIN usuarios u ON l.criado_por = u.id;