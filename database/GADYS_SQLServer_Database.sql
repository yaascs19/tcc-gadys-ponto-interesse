-- =============================================
-- BANCO DE DADOS GADYS - SQL SERVER
-- Sistema de Pontos de Interesse Turístico
-- =============================================

-- Criar banco de dados
CREATE DATABASE GADYS_DB;
GO

USE GADYS_DB;
GO

-- =============================================
-- TABELAS PRINCIPAIS
-- =============================================

-- Tabela de Usuários
CREATE TABLE Usuarios (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) UNIQUE NOT NULL,
    Senha NVARCHAR(255) NOT NULL,
    TipoUsuario NVARCHAR(20) CHECK (TipoUsuario IN ('usuario', 'adm')) DEFAULT 'usuario',
    UltimoAcesso DATETIME2,
    TotalAcessos INT DEFAULT 0,
    IPAcesso NVARCHAR(45),
    DataCadastro DATETIME2 DEFAULT GETDATE()
);

-- Tabela de Estados
CREATE TABLE Estados (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(50) NOT NULL,
    Sigla NCHAR(2) UNIQUE NOT NULL
);

-- Tabela de Cidades
CREATE TABLE Cidades (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    EstadoID INT NOT NULL,
    FOREIGN KEY (EstadoID) REFERENCES Estados(ID)
);

-- Tabela de Categorias
CREATE TABLE Categorias (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(50) NOT NULL,
    Icone NVARCHAR(10),
    Cor NVARCHAR(7)
);

-- Tabela de Locais/Pontos de Interesse
CREATE TABLE Locais (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(200) NOT NULL,
    Descricao NTEXT,
    CidadeID INT,
    CategoriaID INT,
    Endereco NTEXT,
    Coordenadas NVARCHAR(50),
    HorarioFuncionamento NTEXT,
    Preco NVARCHAR(100),
    InformacoesAdicionais NTEXT,
    ImagemURL NVARCHAR(500),
    Status NVARCHAR(20) CHECK (Status IN ('ativo', 'inativo', 'pendente')) DEFAULT 'ativo',
    CriadoPor INT,
    DataCriacao DATETIME2 DEFAULT GETDATE(),
    DataAprovacao DATETIME2,
    AprovadoPor INT,
    FOREIGN KEY (CidadeID) REFERENCES Cidades(ID),
    FOREIGN KEY (CategoriaID) REFERENCES Categorias(ID),
    FOREIGN KEY (CriadoPor) REFERENCES Usuarios(ID),
    FOREIGN KEY (AprovadoPor) REFERENCES Usuarios(ID)
);

-- Tabela de Avaliações
CREATE TABLE Avaliacoes (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    LocalID INT NOT NULL,
    UsuarioID INT NOT NULL,
    Nota INT CHECK (Nota >= 1 AND Nota <= 5),
    DataAvaliacao DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (LocalID) REFERENCES Locais(ID) ON DELETE CASCADE,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID),
    CONSTRAINT UK_Usuario_Local UNIQUE (LocalID, UsuarioID)
);

-- Tabela de Comentários
CREATE TABLE Comentarios (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    LocalID INT NOT NULL,
    UsuarioID INT NOT NULL,
    Texto NTEXT NOT NULL,
    DataComentario DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (LocalID) REFERENCES Locais(ID) ON DELETE CASCADE,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID)
);

-- Tabela de Locais Excluídos (Lixeira)
CREATE TABLE LocaisExcluidos (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    LocalOriginalID INT,
    Nome NVARCHAR(200),
    Descricao NTEXT,
    DadosCompletos NVARCHAR(MAX),
    DataExclusao DATETIME2 DEFAULT GETDATE(),
    ExcluidoPor INT,
    FOREIGN KEY (ExcluidoPor) REFERENCES Usuarios(ID)
);

-- =============================================
-- INSERÇÃO DE DADOS INICIAIS
-- =============================================

-- Estados
INSERT INTO Estados (Nome, Sigla) VALUES 
(N'Amazonas', N'AM'),
(N'São Paulo', N'SP'),
(N'Rio de Janeiro', N'RJ'),
(N'Paraná', N'PR'),
(N'Bahia', N'BA'),
(N'Pernambuco', N'PE'),
(N'Mato Grosso', N'MT');

-- Cidades
INSERT INTO Cidades (Nome, EstadoID) VALUES 
(N'Manaus', 1),
(N'Parintins', 1),
(N'Tefé', 1),
(N'Novo Airão', 1),
(N'Rio de Janeiro', 3),
(N'Foz do Iguaçu', 4),
(N'Salvador', 5),
(N'Fernando de Noronha', 6),
(N'Cuiabá', 7);

-- Categorias
INSERT INTO Categorias (Nome, Icone, Cor) VALUES 
(N'Monumentos', N'🏛️', N'#8b4513'),
(N'Natureza', N'🌳', N'#228b22'),
(N'Gastronomia', N'🍽️', N'#ff8c00'),
(N'Cultura', N'🎨', N'#800080');

-- Usuário Administrador Principal
INSERT INTO Usuarios (Nome, Email, Senha, TipoUsuario) VALUES 
(N'Yasmin', N'yasmincunegundes25@gmail.com', N'Cun*1925', N'adm');

-- Locais do Amazonas
INSERT INTO Locais (Nome, Descricao, CidadeID, CategoriaID, CriadoPor) VALUES 
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

-- Locais Mais Visitados do Brasil
INSERT INTO Locais (Nome, Descricao, CidadeID, CategoriaID, CriadoPor) VALUES 
(N'Cristo Redentor', N'Uma das Sete Maravilhas do Mundo Moderno', 5, 1, 1),
(N'Pão de Açúcar', N'Cartão postal do Rio de Janeiro', 5, 2, 1),
(N'Cataratas do Iguaçu', N'Uma das maiores quedas d''água do mundo', 6, 2, 1),
(N'Pelourinho', N'Centro histórico de Salvador', 7, 4, 1),
(N'Fernando de Noronha', N'Paraíso ecológico brasileiro', 8, 2, 1),
(N'Pantanal', N'Maior planície alagável do mundo', 9, 2, 1);

-- =============================================
-- VIEWS PARA CONSULTAS
-- =============================================

-- View para Ranking de Locais
GO
CREATE VIEW vw_RankingLocais AS
SELECT 
    l.ID,
    l.Nome,
    c.Nome as Categoria,
    AVG(CAST(a.Nota AS FLOAT)) as MediaAvaliacoes,
    COUNT(a.ID) as TotalAvaliacoes,
    COUNT(com.ID) as TotalComentarios
FROM Locais l
LEFT JOIN Avaliacoes a ON l.ID = a.LocalID
LEFT JOIN Comentarios com ON l.ID = com.LocalID
LEFT JOIN Categorias c ON l.CategoriaID = c.ID
WHERE l.Status = 'ativo'
GROUP BY l.ID, l.Nome, c.Nome;

-- View para Locais Completos
GO
CREATE VIEW vw_LocaisCompletos AS
SELECT 
    l.*,
    c.Nome as Categoria,
    c.Icone as CategoriaIcone,
    c.Cor as CategoriaCor,
    cid.Nome as Cidade,
    e.Nome as Estado,
    e.Sigla as EstadoSigla,
    u.Nome as CriadoPorNome
FROM Locais l
JOIN Categorias c ON l.CategoriaID = c.ID
JOIN Cidades cid ON l.CidadeID = cid.ID
JOIN Estados e ON cid.EstadoID = e.ID
JOIN Usuarios u ON l.CriadoPor = u.ID;

-- =============================================
-- STORED PROCEDURES
-- =============================================

-- Procedure para obter estatísticas do sistema
GO
CREATE PROCEDURE sp_EstatisticasSistema
AS
BEGIN
    SELECT 
        'Usuários Cadastrados' as Metrica,
        COUNT(*) as Valor
    FROM Usuarios
    
    UNION ALL
    
    SELECT 
        'Locais Ativos' as Metrica,
        COUNT(*) as Valor
    FROM Locais 
    WHERE Status = 'ativo'
    
    UNION ALL
    
    SELECT 
        'Total de Avaliações' as Metrica,
        COUNT(*) as Valor
    FROM Avaliacoes
    
    UNION ALL
    
    SELECT 
        'Total de Comentários' as Metrica,
        COUNT(*) as Valor
    FROM Comentarios;
END;

-- Procedure para buscar locais por categoria
GO
CREATE PROCEDURE sp_LocalsPorCategoria
    @CategoriaID INT
AS
BEGIN
    SELECT 
        l.*,
        c.Nome as Categoria,
        cid.Nome as Cidade,
        e.Nome as Estado
    FROM Locais l
    JOIN Categorias c ON l.CategoriaID = c.ID
    JOIN Cidades cid ON l.CidadeID = cid.ID
    JOIN Estados e ON cid.EstadoID = e.ID
    WHERE l.CategoriaID = @CategoriaID 
    AND l.Status = 'ativo'
    ORDER BY l.Nome;
END;

-- =============================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================

CREATE INDEX IX_Locais_Status ON Locais(Status);
CREATE INDEX IX_Locais_Categoria ON Locais(CategoriaID);
CREATE INDEX IX_Avaliacoes_Local ON Avaliacoes(LocalID);
CREATE INDEX IX_Comentarios_Local ON Comentarios(LocalID);
CREATE INDEX IX_Usuarios_Email ON Usuarios(Email);

-- =============================================
-- CONSULTAS DE EXEMPLO
-- =============================================

-- Ranking dos locais mais bem avaliados
SELECT TOP 10 * FROM vw_RankingLocais 
ORDER BY MediaAvaliacoes DESC, TotalAvaliacoes DESC;

-- Locais por categoria
SELECT * FROM vw_LocaisCompletos 
WHERE Categoria = 'Natureza' 
ORDER BY Nome;

-- Estatísticas do sistema
EXEC sp_EstatisticasSistema;

-- Comentários recentes
SELECT TOP 10 
    c.Texto,
    c.DataComentario,
    u.Nome as Usuario,
    l.Nome as Local
FROM Comentarios c
JOIN Usuarios u ON c.UsuarioID = u.ID
JOIN Locais l ON c.LocalID = l.ID
ORDER BY c.DataComentario DESC;

GO
PRINT 'Banco de dados GADYS criado com sucesso!';
PRINT 'Total de tabelas: 8';
PRINT 'Total de views: 2';
PRINT 'Total de procedures: 2';
PRINT 'Dados iniciais inseridos: Estados, Cidades, Categorias, Usuário Admin e Locais';