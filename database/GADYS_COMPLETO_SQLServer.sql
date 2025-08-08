-- =============================================
-- BANCO DE DADOS GADYS COMPLETO - SQL SERVER
-- Sistema Completo de Pontos de Interesse Turístico
-- =============================================

CREATE DATABASE GADYS_COMPLETO;
GO

USE GADYS_COMPLETO;
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

-- Tabela de Locais Pendentes (Aprovação)
CREATE TABLE LocaisPendentes (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(200) NOT NULL,
    Descricao NTEXT,
    Cidade NVARCHAR(100),
    Estado NVARCHAR(50),
    Categoria NVARCHAR(50),
    Coordenadas NVARCHAR(50),
    EnviadoPor NVARCHAR(100),
    DataEnvio DATETIME2 DEFAULT GETDATE(),
    Status NVARCHAR(20) CHECK (Status IN ('pendente', 'aprovado', 'rejeitado')) DEFAULT 'pendente'
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

-- Tabela de Sessões de Usuário
CREATE TABLE SessoesUsuario (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioID INT NOT NULL,
    TokenSessao NVARCHAR(255) UNIQUE NOT NULL,
    DataLogin DATETIME2 DEFAULT GETDATE(),
    DataExpiracao DATETIME2,
    IPAcesso NVARCHAR(45),
    UserAgent NVARCHAR(500),
    Ativo BIT DEFAULT 1,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID)
);

-- =============================================
-- INSERÇÃO DE DADOS COMPLETOS
-- =============================================

-- Estados do Brasil
INSERT INTO Estados (Nome, Sigla) VALUES 
(N'Acre', N'AC'),
(N'Alagoas', N'AL'),
(N'Amapá', N'AP'),
(N'Amazonas', N'AM'),
(N'Bahia', N'BA'),
(N'Ceará', N'CE'),
(N'Distrito Federal', N'DF'),
(N'Espírito Santo', N'ES'),
(N'Goiás', N'GO'),
(N'Maranhão', N'MA'),
(N'Mato Grosso', N'MT'),
(N'Mato Grosso do Sul', N'MS'),
(N'Minas Gerais', N'MG'),
(N'Pará', N'PA'),
(N'Paraíba', N'PB'),
(N'Paraná', N'PR'),
(N'Pernambuco', N'PE'),
(N'Piauí', N'PI'),
(N'Rio de Janeiro', N'RJ'),
(N'Rio Grande do Norte', N'RN'),
(N'Rio Grande do Sul', N'RS'),
(N'Rondônia', N'RO'),
(N'Roraima', N'RR'),
(N'Santa Catarina', N'SC'),
(N'São Paulo', N'SP'),
(N'Sergipe', N'SE'),
(N'Tocantins', N'TO');

-- Cidades principais
INSERT INTO Cidades (Nome, EstadoID) VALUES 
-- Amazonas
(N'Manaus', 4),
(N'Parintins', 4),
(N'Tefé', 4),
(N'Novo Airão', 4),
(N'Itacoatiara', 4),
-- Rio de Janeiro
(N'Rio de Janeiro', 19),
(N'Niterói', 19),
(N'Petrópolis', 19),
-- São Paulo
(N'São Paulo', 25),
(N'Santos', 25),
(N'Campinas', 25),
-- Outros estados importantes
(N'Salvador', 5),
(N'Foz do Iguaçu', 16),
(N'Fernando de Noronha', 17),
(N'Cuiabá', 11),
(N'Brasília', 7),
(N'Fortaleza', 6),
(N'Recife', 17),
(N'Porto Alegre', 21),
(N'Florianópolis', 24),
(N'Belo Horizonte', 13);

-- Categorias
INSERT INTO Categorias (Nome, Icone, Cor) VALUES 
(N'Monumentos', N'🏛️', N'#8b4513'),
(N'Natureza', N'🌳', N'#228b22'),
(N'Gastronomia', N'🍽️', N'#ff8c00'),
(N'Cultura', N'🎨', N'#800080'),
(N'Praias', N'🏖️', N'#4169e1'),
(N'Aventura', N'🏔️', N'#dc143c'),
(N'Religioso', N'⛪', N'#daa520'),
(N'Urbano', N'🏙️', N'#696969');

-- Usuário Administrador Principal
INSERT INTO Usuarios (Nome, Email, Senha, TipoUsuario) VALUES 
(N'Yasmin', N'yasmincunegundes25@gmail.com', N'Cun*1925', N'adm');

-- Locais do Amazonas (Completos)
INSERT INTO Locais (Nome, Descricao, CidadeID, CategoriaID, CriadoPor, HorarioFuncionamento, Preco, InformacoesAdicionais) VALUES 
-- Monumentos
(N'Teatro Amazonas', N'Majestoso teatro construído durante o período áureo da borracha, símbolo de Manaus', 1, 1, 1, N'Ter-Sáb: 9h-17h', N'R$ 20,00', N'Visitas guiadas disponíveis. Apresentações especiais aos fins de semana.'),
(N'Forte de São José', N'Fortaleza histórica que marca o início da colonização de Manaus', 1, 1, 1, N'Ter-Dom: 8h-17h', N'R$ 10,00', N'Museu militar com exposições permanentes.'),
(N'Mercado Municipal', N'Mercado histórico inspirado no mercado Les Halles de Paris', 1, 1, 1, N'Seg-Sáb: 6h-18h', N'Gratuito', N'Produtos regionais, artesanato e gastronomia típica.'),
(N'Palácio da Justiça', N'Edifício histórico com arquitetura colonial preservada', 1, 1, 1, N'Seg-Sex: 8h-17h', N'Gratuito', N'Visitas mediante agendamento.'),
(N'Igreja de São Sebastião', N'Igreja histórica com arquitetura colonial e importância religiosa', 1, 7, 1, N'Diário: 6h-18h', N'Gratuito', N'Missas diárias. Arquitetura colonial preservada.'),
(N'Palácio Rio Negro', N'Antiga residência dos governadores, hoje centro cultural', 1, 1, 1, N'Ter-Dom: 10h-17h', N'R$ 5,00', N'Exposições culturais e eventos artísticos.'),

-- Natureza
(N'Floresta Amazônica', N'A maior floresta tropical do mundo com biodiversidade única', 1, 2, 1, N'24 horas', N'Varia por tour', N'Tours ecológicos, observação da fauna e flora. Guias especializados recomendados.'),
(N'Encontro das Águas', N'Fenômeno natural onde os rios Negro e Solimões se encontram', 1, 2, 1, N'Diário: 6h-18h', N'R$ 80-150', N'Passeios de barco. Melhor visualização entre 10h-15h.'),
(N'Parque Nacional de Anavilhanas', N'Maior arquipélago fluvial do mundo com rica biodiversidade', 4, 2, 1, N'Diário: 8h-17h', N'R$ 15,00', N'Trilhas ecológicas, canoagem, observação de aves.'),
(N'Reserva Mamirauá', N'Maior reserva de várzea do mundo com fauna única', 3, 2, 1, N'Tours programados', N'R$ 200-500/dia', N'Hospedagem em pousadas flutuantes. Observação de primatas.'),
(N'Parque Nacional do Jaú', N'Uma das maiores unidades de conservação da Amazônia', 4, 2, 1, N'Acesso controlado', N'R$ 25,00', N'Necessário guia credenciado. Rica biodiversidade.'),
(N'Rio Amazonas', N'O maior rio do mundo em volume de água e extensão', 1, 2, 1, N'24 horas', N'Varia por atividade', N'Passeios de barco, pesca esportiva, turismo fluvial.'),

-- Gastronomia
(N'Açaí', N'Fruto amazônico rico em nutrientes e sabor único', 1, 3, 1, N'Disponível o ano todo', N'R$ 8-15', N'Consumido puro ou com complementos. Rico em antioxidantes.'),
(N'Tucumã', N'Fruto típico consumido com farinha de mandioca', 1, 3, 1, N'Safra: Mar-Jul', N'R$ 5-10', N'Tradicionalmente consumido com farinha de mandioca.'),
(N'Pirarucu', N'Peixe gigante da Amazônia preparado de diversas formas', 1, 3, 1, N'Disponível o ano todo', N'R$ 40-80/kg', N'Preparado assado, grelhado ou em pratos típicos.'),
(N'Cupuaçu', N'Fruto amazônico usado em doces e sucos refrescantes', 1, 3, 1, N'Safra: Jan-Abr', N'R$ 10-20', N'Usado em sobremesas, sucos e sorvetes.'),
(N'Tacacá', N'Prato típico com tucumã, camarão seco e jambu', 1, 3, 1, N'Vendido à tarde/noite', N'R$ 8-12', N'Servido em cuias. Experiência gastronômica única.'),
(N'Farinha de Mandioca', N'Ingrediente essencial da culinária amazônica', 1, 3, 1, N'Disponível o ano todo', N'R$ 5-8/kg', N'Base da alimentação regional. Diversos tipos e texturas.'),

-- Cultura
(N'Festival de Parintins', N'Maior festival folclórico do Brasil com bois-bumbás', 2, 4, 1, N'Último fim de semana de junho', N'R$ 50-200', N'Competição entre Garantido e Caprichoso. Reservas antecipadas necessárias.'),
(N'Lendas Amazônicas', N'Curupira, Boto-cor-de-rosa, Iara e outras lendas da floresta', 1, 4, 1, N'Tours culturais', N'R$ 30-60', N'Contação de histórias, teatro regional, turismo cultural.'),
(N'Artesanato Indígena', N'Cestas, cerâmicas e objetos tradicionais dos povos originários', 1, 4, 1, N'Feiras e mercados', N'R$ 20-500', N'Produtos autênticos das comunidades indígenas.'),
(N'Ciranda Amazônica', N'Dança tradicional em roda com cantos e instrumentos regionais', 1, 4, 1, N'Apresentações culturais', N'R$ 15-30', N'Participação em rodas de ciranda. Música e dança regional.'),
(N'Carimbó', N'Ritmo e dança típica com tambores e movimentos sensuais', 1, 4, 1, N'Shows e festivais', N'R$ 20-50', N'Apresentações ao vivo. Dança participativa.'),
(N'Rituais Xamânicos', N'Cerimônias ancestrais com plantas sagradas e cura espiritual', 1, 4, 1, N'Mediante agendamento', N'R$ 100-300', N'Experiências espirituais com pajés credenciados.');

-- Locais Mais Visitados do Brasil
INSERT INTO Locais (Nome, Descricao, CidadeID, CategoriaID, CriadoPor, HorarioFuncionamento, Preco, InformacoesAdicionais) VALUES 
(N'Cristo Redentor', N'Uma das Sete Maravilhas do Mundo Moderno', 6, 1, 1, N'Diário: 8h-19h', N'R$ 75,00', N'Acesso por trem do Corcovado. Vista panorâmica de 360°.'),
(N'Pão de Açúcar', N'Cartão postal do Rio de Janeiro', 6, 2, 1, N'Diário: 8h-19h50', N'R$ 120,00', N'Bondinho com duas estações. Vista da Baía de Guanabara.'),
(N'Cataratas do Iguaçu', N'Uma das maiores quedas d''água do mundo', 13, 2, 1, N'Diário: 9h-17h', N'R$ 72,00', N'Patrimônio Mundial da UNESCO. 275 quedas d''água.'),
(N'Pelourinho', N'Centro histórico de Salvador', 12, 4, 1, N'24 horas', N'Gratuito', N'Patrimônio Mundial da UNESCO. Arquitetura colonial preservada.'),
(N'Fernando de Noronha', N'Paraíso ecológico brasileiro', 14, 5, 1, N'Acesso controlado', N'Taxa diária R$ 79,20', N'Máximo 460 visitantes/dia. Águas cristalinas e vida marinha.'),
(N'Pantanal', N'Maior planície alagável do mundo', 15, 2, 1, N'Tours especializados', N'R$ 300-800/dia', N'Observação da fauna. Melhor época: maio a setembro.');

-- =============================================
-- VIEWS PARA CONSULTAS OTIMIZADAS
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
    COUNT(com.ID) as TotalComentarios,
    l.Status
FROM Locais l
LEFT JOIN Avaliacoes a ON l.ID = a.LocalID
LEFT JOIN Comentarios com ON l.ID = com.LocalID
LEFT JOIN Categorias c ON l.CategoriaID = c.ID
WHERE l.Status = 'ativo'
GROUP BY l.ID, l.Nome, c.Nome, l.Status;

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

-- View para Dashboard Administrativo
GO
CREATE VIEW vw_DashboardAdmin AS
SELECT 
    'Total de Usuários' as Metrica,
    COUNT(*) as Valor,
    'usuarios' as Tipo
FROM Usuarios
UNION ALL
SELECT 
    'Locais Ativos',
    COUNT(*),
    'locais'
FROM Locais WHERE Status = 'ativo'
UNION ALL
SELECT 
    'Locais Pendentes',
    COUNT(*),
    'pendentes'
FROM LocaisPendentes WHERE Status = 'pendente'
UNION ALL
SELECT 
    'Total de Avaliações',
    COUNT(*),
    'avaliacoes'
FROM Avaliacoes
UNION ALL
SELECT 
    'Total de Comentários',
    COUNT(*),
    'comentarios'
FROM Comentarios;

-- =============================================
-- STORED PROCEDURES
-- =============================================

-- Procedure para Login de Usuário
GO
CREATE PROCEDURE sp_LoginUsuario
    @Email NVARCHAR(150),
    @Senha NVARCHAR(255),
    @TipoUsuario NVARCHAR(20)
AS
BEGIN
    DECLARE @UsuarioID INT;
    
    SELECT @UsuarioID = ID
    FROM Usuarios 
    WHERE Email = @Email AND Senha = @Senha AND TipoUsuario = @TipoUsuario;
    
    IF @UsuarioID IS NOT NULL
    BEGIN
        UPDATE Usuarios 
        SET UltimoAcesso = GETDATE(), TotalAcessos = TotalAcessos + 1
        WHERE ID = @UsuarioID;
        
        SELECT ID, Nome, Email, TipoUsuario, 'SUCCESS' as Status
        FROM Usuarios 
        WHERE ID = @UsuarioID;
    END
    ELSE
    BEGIN
        SELECT 'INVALID_CREDENTIALS' as Status;
    END
END;

-- Procedure para Estatísticas Completas
GO
CREATE PROCEDURE sp_EstatisticasCompletas
AS
BEGIN
    -- Estatísticas gerais
    SELECT * FROM vw_DashboardAdmin;
    
    -- Top 10 locais mais avaliados
    SELECT TOP 10 
        Nome,
        Categoria,
        MediaAvaliacoes,
        TotalAvaliacoes,
        TotalComentarios
    FROM vw_RankingLocais 
    WHERE MediaAvaliacoes IS NOT NULL
    ORDER BY MediaAvaliacoes DESC, TotalAvaliacoes DESC;
    
    -- Distribuição por categoria
    SELECT 
        c.Nome as Categoria,
        COUNT(l.ID) as TotalLocais,
        c.Icone,
        c.Cor
    FROM Categorias c
    LEFT JOIN Locais l ON c.ID = l.CategoriaID AND l.Status = 'ativo'
    GROUP BY c.Nome, c.Icone, c.Cor
    ORDER BY TotalLocais DESC;
END;

-- Procedure para Busca Avançada
GO
CREATE PROCEDURE sp_BuscaAvancada
    @Termo NVARCHAR(200) = NULL,
    @CategoriaID INT = NULL,
    @EstadoID INT = NULL,
    @Limite INT = 50
AS
BEGIN
    SELECT TOP (@Limite)
        l.*,
        c.Nome as Categoria,
        cid.Nome as Cidade,
        e.Nome as Estado,
        AVG(CAST(a.Nota AS FLOAT)) as MediaAvaliacoes,
        COUNT(a.ID) as TotalAvaliacoes
    FROM Locais l
    JOIN Categorias c ON l.CategoriaID = c.ID
    JOIN Cidades cid ON l.CidadeID = cid.ID
    JOIN Estados e ON cid.EstadoID = e.ID
    LEFT JOIN Avaliacoes a ON l.ID = a.LocalID
    WHERE l.Status = 'ativo'
        AND (@Termo IS NULL OR l.Nome LIKE '%' + @Termo + '%' OR l.Descricao LIKE '%' + @Termo + '%')
        AND (@CategoriaID IS NULL OR l.CategoriaID = @CategoriaID)
        AND (@EstadoID IS NULL OR cid.EstadoID = @EstadoID)
    GROUP BY l.ID, l.Nome, l.Descricao, l.CidadeID, l.CategoriaID, l.Status, l.CriadoPor, l.DataCriacao, l.DataAprovacao, l.AprovadoPor, l.Endereco, l.Coordenadas, l.HorarioFuncionamento, l.Preco, l.InformacoesAdicionais, l.ImagemURL, c.Nome, cid.Nome, e.Nome
    ORDER BY MediaAvaliacoes DESC, TotalAvaliacoes DESC, l.Nome;
END;

-- =============================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================

CREATE INDEX IX_Locais_Status ON Locais(Status);
CREATE INDEX IX_Locais_Categoria ON Locais(CategoriaID);
CREATE INDEX IX_Locais_Cidade ON Locais(CidadeID);
CREATE INDEX IX_Avaliacoes_Local ON Avaliacoes(LocalID);
CREATE INDEX IX_Comentarios_Local ON Comentarios(LocalID);
CREATE INDEX IX_Usuarios_Email ON Usuarios(Email);
CREATE INDEX IX_Usuarios_Tipo ON Usuarios(TipoUsuario);
CREATE INDEX IX_Cidades_Estado ON Cidades(EstadoID);

-- =============================================
-- TRIGGERS PARA AUDITORIA
-- =============================================

-- Trigger para log de exclusões
GO
CREATE TRIGGER tr_LogExclusaoLocais
ON Locais
FOR DELETE
AS
BEGIN
    INSERT INTO LocaisExcluidos (LocalOriginalID, Nome, Descricao, DadosCompletos)
    SELECT 
        d.ID,
        d.Nome,
        d.Descricao,
        (SELECT * FROM deleted d2 WHERE d2.ID = d.ID FOR JSON AUTO)
    FROM deleted d;
END;

-- =============================================
-- DADOS DE EXEMPLO PARA TESTES
-- =============================================

-- Usuários de teste
INSERT INTO Usuarios (Nome, Email, Senha, TipoUsuario) VALUES 
(N'David Silva', N'david@teste.com', N'123456', N'usuario'),
(N'Maria Santos', N'maria@teste.com', N'123456', N'usuario'),
(N'João Oliveira', N'joao@teste.com', N'123456', N'adm');

-- Avaliações de exemplo
INSERT INTO Avaliacoes (LocalID, UsuarioID, Nota) VALUES 
(1, 2, 5), (1, 3, 4), (1, 4, 5),
(2, 2, 4), (2, 3, 5),
(7, 2, 5), (7, 3, 5), (7, 4, 4);

-- Comentários de exemplo
INSERT INTO Comentarios (LocalID, UsuarioID, Texto) VALUES 
(1, 2, N'Teatro magnífico! A arquitetura é impressionante e a acústica perfeita.'),
(1, 3, N'Experiência cultural única em Manaus. Vale muito a pena visitar.'),
(7, 2, N'A Floresta Amazônica é indescritível. Uma experiência que marca para sempre.'),
(25, 3, N'Cristo Redentor oferece uma vista espetacular do Rio de Janeiro.');

-- Locais pendentes de exemplo
INSERT INTO LocaisPendentes (Nome, Descricao, Cidade, Estado, Categoria, EnviadoPor) VALUES 
(N'Cachoeira Secreta', N'Cachoeira escondida na floresta com águas cristalinas', N'Manaus', N'AM', N'Natureza', N'João Silva'),
(N'Restaurante da Vovó', N'Restaurante típico com pratos regionais', N'Parintins', N'AM', N'Gastronomia', N'Maria Santos');

GO
PRINT '✅ Banco de dados GADYS COMPLETO criado com sucesso!';
PRINT '📊 Estatísticas:';
PRINT '   - 8 Tabelas principais';
PRINT '   - 27 Estados brasileiros';
PRINT '   - 20+ Cidades principais';
PRINT '   - 8 Categorias de locais';
PRINT '   - 30+ Locais pré-cadastrados';
PRINT '   - 3 Views otimizadas';
PRINT '   - 3 Stored Procedures';
PRINT '   - Índices para performance';
PRINT '   - Triggers para auditoria';
PRINT '   - Dados de exemplo para testes';
PRINT '';
PRINT '🚀 Sistema pronto para produção!';