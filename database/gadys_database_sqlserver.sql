-- Banco de Dados GADYS - SQL Server
CREATE DATABASE gadys_db;
GO

USE gadys_db;
GO

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(150) UNIQUE NOT NULL,
    senha NVARCHAR(255) NOT NULL,
    tipo_usuario NVARCHAR(10) CHECK (tipo_usuario IN ('usuario', 'adm')) DEFAULT 'usuario',
    ultimo_acesso DATETIME2,
    total_acessos INT DEFAULT 0,
    ip_acesso NVARCHAR(45),
    data_cadastro DATETIME2 DEFAULT GETDATE()
);

-- Tabela de Estados
CREATE TABLE estados (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL,
    sigla NCHAR(2) UNIQUE NOT NULL
);

-- Tabela de Cidades
CREATE TABLE cidades (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    estado_id INT,
    FOREIGN KEY (estado_id) REFERENCES estados(id)
);

-- Tabela de Categorias
CREATE TABLE categorias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(50) NOT NULL,
    icone NVARCHAR(10),
    cor NVARCHAR(7)
);

-- Tabela de Locais/Pontos de Interesse
CREATE TABLE locais (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(200) NOT NULL,
    descricao NTEXT,
    cidade_id INT,
    categoria_id INT,
    endereco NTEXT,
    coordenadas NVARCHAR(50),
    horario_funcionamento NTEXT,
    preco NVARCHAR(100),
    informacoes_adicionais NTEXT,
    imagem_url NVARCHAR(500),
    status NVARCHAR(10) CHECK (status IN ('ativo', 'inativo', 'pendente')) DEFAULT 'ativo',
    criado_por INT,
    data_criacao DATETIME2 DEFAULT GETDATE(),
    data_aprovacao DATETIME2,
    aprovado_por INT,
    FOREIGN KEY (cidade_id) REFERENCES cidades(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (criado_por) REFERENCES usuarios(id),
    FOREIGN KEY (aprovado_por) REFERENCES usuarios(id)
);

-- Tabela de Avaliações
CREATE TABLE avaliacoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    local_id INT,
    usuario_id INT,
    nota INT CHECK (nota >= 1 AND nota <= 5),
    data_avaliacao DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (local_id) REFERENCES locais(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT unique_user_rating UNIQUE (local_id, usuario_id)
);

-- Tabela de Comentários
CREATE TABLE comentarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    local_id INT,
    usuario_id INT,
    texto NTEXT NOT NULL,
    data_comentario DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (local_id) REFERENCES locais(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabela de Locais Excluídos (Lixeira)
CREATE TABLE locais_excluidos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    local_original_id INT,
    nome NVARCHAR(200),
    descricao NTEXT,
    dados_completos NVARCHAR(MAX),
    data_exclusao DATETIME2 DEFAULT GETDATE(),
    excluido_por INT,
    FOREIGN KEY (excluido_por) REFERENCES usuarios(id)
);

-- Inserção de dados iniciais

-- Estados
INSERT INTO estados (nome, sigla) VALUES 
(N'Amazonas', N'AM'),
(N'São Paulo', N'SP'),
(N'Rio de Janeiro', N'RJ');

-- Cidades
INSERT INTO cidades (nome, estado_id) VALUES 
(N'Manaus', 1),
(N'Parintins', 1),
(N'Tefé', 1),
(N'Novo Airão', 1);

-- Categorias
INSERT INTO categorias (nome, icone, cor) VALUES 
(N'Monumentos', N'🏛️', N'#8b4513'),
(N'Natureza', N'🌳', N'#228b22'),
(N'Gastronomia', N'🍽️', N'#ff8c00'),
(N'Cultura', N'🎨', N'#800080');

-- Usuário Administrador
INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES 
(N'Yasmin', N'yasmincunegundes25@gmail.com', N'Cun*1925', N'adm');

-- Locais pré-existentes
INSERT INTO locais (nome, descricao, cidade_id, categoria_id, criado_por) VALUES 
-- Monumentos
(N'Teatro Amazonas', N'Majestoso teatro construído durante o período áureo da borracha', 1, 1, 1),
(N'Forte de São José', N'Fortaleza histórica que marca o início da colonização de Manaus', 1, 1, 1),
(N'Mercado Municipal', N'Mercado histórico inspirado no mercado Les Halles de Paris', 1, 1, 1),
(N'Palácio da Justiça', N'Edifício histórico com arquitetura colonial preservada', 1, 1, 1),
(N'Igreja de São Sebastião', N'Igreja histórica com arquitetura colonial e importância religiosa', 1, 1, 1),
(N'Palácio Rio Negro', N'Antiga residência dos governadores, hoje centro cultural', 1, 1, 1),

-- Natureza
(N'Floresta Amazônica', N'A maior floresta tropical do mundo com biodiversidade única', 1, 2, 1),
(N'Encontro das Águas', N'Fenômeno natural onde os rios Negro e Solimões se encontram', 1, 2, 1),
(N'Parque Nacional de Anavilhanas', N'Maior arquipélago fluvial do mundo com rica biodiversidade', 4, 2, 1),
(N'Reserva Mamirauá', N'Maior reserva de várzea do mundo com fauna única', 3, 2, 1),
(N'Parque Nacional do Jaú', N'Uma das maiores unidades de conservação da Amazônia', 4, 2, 1),
(N'Rio Amazonas', N'O maior rio do mundo em volume de água e extensão', 1, 2, 1),

-- Gastronomia
(N'Açaí', N'Fruto amazônico rico em nutrientes e sabor único', 1, 3, 1),
(N'Tucumã', N'Fruto típico consumido com farinha de mandioca', 1, 3, 1),
(N'Pirarucu', N'Peixe gigante da Amazônia preparado de diversas formas', 1, 3, 1),
(N'Cupuaçu', N'Fruto amazônico usado em doces e sucos refrescantes', 1, 3, 1),
(N'Tacacá', N'Prato típico com tucumã, camarão seco e jambu', 1, 3, 1),
(N'Farinha de Mandioca', N'Ingrediente essencial da culinária amazônica', 1, 3, 1),

-- Cultura
(N'Festival de Parintins', N'Maior festival folclórico do Brasil com bois-bumbás', 2, 4, 1),
(N'Lendas Amazônicas', N'Curupira, Boto-cor-de-rosa, Iara e outras lendas da floresta', 1, 4, 1),
(N'Artesanato Indígena', N'Cestas, cerâmicas e objetos tradicionais dos povos originários', 1, 4, 1),
(N'Ciranda Amazônica', N'Dança tradicional em roda com cantos e instrumentos regionais', 1, 4, 1),
(N'Carimbó', N'Ritmo e dança típica com tambores e movimentos sensuais', 1, 4, 1),
(N'Rituais Xamânicos', N'Cerimônias ancestrais com plantas sagradas e cura espiritual', 1, 4, 1);

-- Views úteis
GO
CREATE VIEW ranking_locais AS
SELECT 
    l.id,
    l.nome,
    c.nome as categoria,
    AVG(CAST(a.nota AS FLOAT)) as media_avaliacoes,
    COUNT(a.id) as total_avaliacoes,
    COUNT(com.id) as total_comentarios
FROM locais l
LEFT JOIN avaliacoes a ON l.id = a.local_id
LEFT JOIN comentarios com ON l.id = com.local_id
LEFT JOIN categorias c ON l.categoria_id = c.id
WHERE l.status = 'ativo'
GROUP BY l.id, l.nome, c.nome;

GO
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