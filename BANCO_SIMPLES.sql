-- BANCO GADYS SIMPLES
CREATE DATABASE GADYS_COMPLETO;
GO
USE GADYS_COMPLETO;
GO

-- Tabela de Usuários
CREATE TABLE Usuarios (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) UNIQUE NOT NULL,
    Senha NVARCHAR(255) NOT NULL,
    TipoUsuario NVARCHAR(20) DEFAULT 'usuario',
    UltimoAcesso DATETIME2,
    TotalAcessos INT DEFAULT 0,
    DataCadastro DATETIME2 DEFAULT GETDATE()
);

-- Tabela de Locais
CREATE TABLE Locais (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(200) NOT NULL,
    Descricao NTEXT,
    Cidade NVARCHAR(100),
    Estado NVARCHAR(50),
    Categoria NVARCHAR(50),
    Status NVARCHAR(20) DEFAULT 'ativo',
    DataCriacao DATETIME2 DEFAULT GETDATE()
);

-- Tabela de Avaliações
CREATE TABLE Avaliacoes (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    LocalID INT NOT NULL,
    UsuarioID INT NOT NULL,
    Nota INT CHECK (Nota >= 1 AND Nota <= 5),
    DataAvaliacao DATETIME2 DEFAULT GETDATE()
);

-- Tabela de Comentários
CREATE TABLE Comentarios (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    LocalID INT NOT NULL,
    UsuarioID INT NOT NULL,
    Texto NTEXT NOT NULL,
    DataComentario DATETIME2 DEFAULT GETDATE()
);

-- Usuário Admin
INSERT INTO Usuarios (Nome, Email, Senha, TipoUsuario) VALUES 
('Yasmin', 'yasmincunegundes25@gmail.com', 'Cun*1925', 'adm');

-- Locais básicos
INSERT INTO Locais (Nome, Descricao, Cidade, Estado, Categoria) VALUES 
('Teatro Amazonas', 'Teatro histórico de Manaus', 'Manaus', 'AM', 'Monumentos'),
('Floresta Amazônica', 'Maior floresta tropical do mundo', 'Manaus', 'AM', 'Natureza'),
('Açaí', 'Fruto amazônico típico', 'Manaus', 'AM', 'Gastronomia'),
('Festival de Parintins', 'Festival folclórico brasileiro', 'Parintins', 'AM', 'Cultura');

PRINT 'Banco GADYS criado com sucesso!';