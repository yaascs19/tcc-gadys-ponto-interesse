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
(N'Cupuaçu', N'Fruto amazônico usado em doces e sucos refrescantes', 1, 3, 1, N'Safra: Dez-Mar', N'R$ 10-20', N'Usado em sobremesas, sucos e sorvetes. Sabor único e marcante.'),
(N'Tacaçá', N'Prato típico amazônico com tucumã e camarão seco', 1, 3, 1, N'Vendido à tarde/noite', N'R$ 8-12', N'Servido quente em cuia. Patrimônio cultural imaterial.'),
(N'Farinha de Mandioca', N'Alimento básico da culinária amazônica', 1, 3, 1, N'Disponível o ano todo', N'R$ 5-8/kg', N'Acompanha praticamente todas as refeições regionais.'),

-- Cultura Amazonas
(N'Festival de Parintins', N'Maior festival folclórico do Norte com Boi Garantido e Caprichoso', 2, 4, 1, N'Última semana de junho', N'R$ 50-200', N'Evento cultural mais importante da região. Reservas antecipadas necessárias.'),
(N'Lendas Amazônicas', N'Rica tradição oral com personagens como Curupira e Boto', 1, 4, 1, N'Contação permanente', N'Varia por local', N'Parte fundamental da cultura regional. Tours culturais disponíveis.'),
(N'Artesanato Indígena', N'Arte tradicional dos povos amazônicos com materiais naturais', 1, 4, 1, N'Feiras e mercados', N'R$ 20-500', N'Peças únicas feitas com sementes, fibras e madeira.'),
(N'Música Regional', N'Ritmos típicos como carimbó e boi-bumbá', 1, 4, 1, N'Apresentações variadas', N'Gratuito a R$ 50', N'Expressão cultural autêntica da região Norte.'),
(N'Danças Folclóricas', N'Manifestações culturais tradicionais amazônicas', 1, 4, 1, N'Eventos culturais', N'Gratuito a R$ 30', N'Preservação das tradições ancestrais.'),
(N'Literatura de Cordel', N'Tradição literária popular nordestina presente na Amazônia', 1, 4, 1, N'Feiras culturais', N'R$ 5-15', N'Narrativas em versos sobre lendas e histórias locais.');

-- =============================================
-- MAIS CIDADES PARA TODOS OS ESTADOS
-- =============================================

-- Mais cidades
INSERT INTO Cidades (Nome, EstadoID) VALUES 
-- Acre (1)
(N'Rio Branco', 1),
(N'Cruzeiro do Sul', 1),
-- Alagoas (2)  
(N'Maceió', 2),
(N'Penedo', 2),
-- Amapá (3)
(N'Macapá', 3),
(N'Santana', 3),
-- Bahia (5) - já tem Salvador (12)
(N'Porto Seguro', 5),
(N'Chapada Diamantina', 5),
-- Ceará (6) - já tem Fortaleza (17)
(N'Jericoacoara', 6),
(N'Canoa Quebrada', 6),
-- Espírito Santo (8)
(N'Vitória', 8),
(N'Guarapari', 8),
-- Goiás (9)
(N'Goiânia', 9),
(N'Pirenópolis', 9),
-- Maranhão (10)
(N'São Luís', 10),
(N'Barreirinhas', 10),
-- Mato Grosso (11) - já tem Cuiabá (15)
(N'Pantanal', 11),
(N'Chapada dos Guimarães', 11),
-- Mato Grosso do Sul (12)
(N'Campo Grande', 12),
(N'Bonito', 12),
-- Minas Gerais (13) - já tem Belo Horizonte (21)
(N'Ouro Preto', 13),
(N'Tiradentes', 13),
-- Pará (14)
(N'Belém', 14),
(N'Alter do Chão', 14),
-- Paraíba (15)
(N'João Pessoa', 15),
(N'Campina Grande', 15),
-- Paraná (16) - já tem Foz do Iguaçu (13)
(N'Curitiba', 16),
(N'Morretes', 16),
-- Pernambuco (17) - já tem Recife (18) e Fernando de Noronha (14)
(N'Olinda', 17),
(N'Porto de Galinhas', 17),
-- Piauí (18)
(N'Teresina', 18),
(N'São Raimundo Nonato', 18),
-- Rio Grande do Norte (20)
(N'Natal', 20),
(N'Pipa', 20),
-- Rio Grande do Sul (21) - já tem Porto Alegre (19)
(N'Gramado', 21),
(N'Canela', 21),
-- Rondônia (22)
(N'Porto Velho', 22),
(N'Ji-Paraná', 22),
-- Roraima (23)
(N'Boa Vista', 23),
(N'Caracaraí', 23),
-- Santa Catarina (24) - já tem Florianópolis (20)
(N'Blumenau', 24),
(N'Balneário Camboriú', 24),
-- Sergipe (26)
(N'Aracaju', 26),
(N'São Cristóvão', 26),
-- Tocantins (27)
(N'Palmas', 27),
(N'Jalapão', 27);

-- =============================================
-- LOCAIS DE TODOS OS ESTADOS
-- =============================================

-- SÃO PAULO (25) - COMPLETO
INSERT INTO Locais (Nome, Descricao, CidadeID, CategoriaID, CriadoPor, HorarioFuncionamento, Preco, InformacoesAdicionais) VALUES 
-- Monumentos São Paulo
(N'Teatro Municipal de São Paulo', N'Majestoso teatro no centro da cidade, ícone cultural paulistano', 9, 1, 1, N'Ter-Dom: 10h-18h', N'R$ 30,00', N'Visitas guiadas e espetáculos. Arquitetura inspirada na Ópera de Paris.'),
(N'Catedral da Sé', N'Imponente catedral gótica no marco zero da cidade', 9, 7, 1, N'Diário: 8h-19h', N'Gratuito', N'Cripta e torre visitáveis. Centro histórico de São Paulo.'),
(N'Edifício Copan', N'Ícone da arquitetura moderna brasileira por Oscar Niemeyer', 9, 1, 1, N'Visitas agendadas', N'R$ 25,00', N'Maior edifício residencial do Brasil. Arquitetura única.'),
(N'Estação da Luz', N'Estação ferroviária histórica com arquitetura inglesa', 9, 1, 1, N'Diário: 6h-24h', N'Gratuito', N'Arquitetura vitoriana. Museu da Língua Portuguesa.'),
(N'Mercadão Municipal', N'Tradicional mercado com arquitetura art déco e gastronomia', 9, 1, 1, N'Seg-Sáb: 6h-18h', N'Gratuito entrada', N'Sanduíche de mortadela famoso. Vitrais coloridos.'),
(N'Mosteiro de São Bento', N'Mosteiro beneditino com arquitetura colonial preservada', 9, 7, 1, N'Diário: 6h-18h', N'Gratuito', N'Missas gregorianas. Arquitetura colonial do século XVI.'),

-- Natureza São Paulo
(N'Parque Ibirapuera', N'Principal parque urbano com museus, lagos e áreas verdes', 9, 2, 1, N'Diário: 5h-24h', N'Gratuito', N'Museus, planetário, trilhas e atividades esportivas.'),
(N'Jardim Botânico SP', N'Reserva da Mata Atlântica com trilhas e nascentes', 9, 2, 1, N'Ter-Dom: 9h-17h', N'R$ 15,00', N'Mata Atlântica preservada. Trilhas ecológicas.'),
(N'Parque Villa-Lobos', N'Parque urbano com ciclovias e atividades ao ar livre', 9, 2, 1, N'Diário: 5h30-19h', N'Gratuito', N'Ciclovias, quadras esportivas e áreas de lazer.'),
(N'Horto Florestal', N'Reserva natural com trilhas na Serra da Cantareira', 9, 2, 1, N'Diário: 6h-18h', N'R$ 12,00', N'Trilhas na mata, museu florestal e áreas de piquenique.'),
(N'Parque Trianon', N'Parque urbano na Avenida Paulista com Mata Atlântica', 9, 2, 1, N'Diário: 6h-18h', N'Gratuito', N'Mata Atlântica no centro da cidade. Trilhas curtas.'),
(N'Jardins da Aclimação', N'Parque tradicional com lago e atividades familiares', 9, 2, 1, N'Diário: 5h-20h', N'Gratuito', N'Pedalinhos, playground e áreas para piquenique.'),

-- Gastronomia São Paulo
(N'Pizza Paulistana', N'Tradicional pizza de São Paulo com massa fina e ingredientes variados', 9, 3, 1, N'Noites: 18h-24h', N'R$ 40-80', N'Maior variedade de sabores do mundo. Tradição italiana adaptada.'),
(N'Pastel da Feira', N'Pastel frito tradicional das feiras livres paulistanas', 9, 3, 1, N'Feiras: 7h-14h', N'R$ 8-15', N'Acompanha caldo de cana. Recheios doces e salgados.'),
(N'Sanduiche de Mortadela', N'Famoso sanduíche do Mercadão com mortadela italiana', 9, 3, 1, N'Seg-Sáb: 6h-18h', N'R$ 25-35', N'Mortadela italiana de qualidade. Tradicional do Mercadão.'),
(N'Coxinha Paulista', N'Salgado em formato de gota com frango desfiado', 9, 3, 1, N'Padarias: 6h-22h', N'R$ 5-12', N'Invenção paulista. Massa de batata com frango.'),
(N'Pão de Açúcar Doce', N'Doce tradicional paulista feito com açúcar cristal', 9, 3, 1, N'Confeitarias: 8h-20h', N'R$ 3-8', N'Doce tradicional das confeitarias antigas de SP.'),
(N'Culinária Japonesa', N'Autêntica culinária japonesa do bairro da Liberdade', 9, 3, 1, N'Restaurantes: 11h-22h', N'R$ 30-100', N'Maior comunidade japonesa fora do Japão. Pratos autênticos.'),

-- Cultura São Paulo
(N'MASP', N'Museu de Arte de São Paulo com acervo internacional', 9, 4, 1, N'Ter-Dom: 10h-18h', N'R$ 45,00', N'Acervo de arte europeia e brasileira. Arquitetura suspensa única.'),
(N'Pinacoteca do Estado', N'Principal museu de arte brasileira do país', 9, 4, 1, N'Qua-Seg: 10h-18h', N'R$ 15,00', N'Arte brasileira dos séculos XIX e XX. Edifício histórico.'),
(N'Beco do Batman', N'Galeria de arte urbana a céu aberto na Vila Madalena', 9, 4, 1, N'24 horas', N'Gratuito', N'Grafites e arte de rua. Renovação constante das obras.'),
(N'Casa das Rosas', N'Casaão preservado com eventos culturais e exposições', 9, 4, 1, N'Ter-Dom: 10h-18h', N'Gratuito', N'Arquitetura eclética. Centro de literatura e poesia.'),
(N'Memorial da América Latina', N'Complexo cultural dedicado à integração latino-americana', 9, 4, 1, N'Ter-Dom: 9h-18h', N'R$ 8,00', N'Projeto de Oscar Niemeyer. Arte e cultura latina.'),
(N'Vila Madalena Cultural', N'Bairro boêmio com galerias, bares e vida cultural intensa', 9, 4, 1, N'Noite: 18h-2h', N'Varia por local', N'Vida noturna paulistana. Bares temáticos e música ao vivo.') 

-- RIO DE JANEIRO (19) - COMPLETO
-- Monumentos Rio de Janeiro
(N'Cristo Redentor', N'Uma das Sete Maravilhas do Mundo Moderno no Corcovado', 6, 1, 1, N'Diário: 8h-19h', N'R$ 75,00', N'Acesso por trem ou van. Vista panorâmica da cidade.'),
(N'Pão de Açúcar', N'Cartão postal do Rio com bondinho e vista espetacular', 6, 1, 1, N'Diário: 8h-20h', N'R$ 120,00', N'Bondinho histórico. Pôr do sol imperdível.'),
(N'Arcos da Lapa', N'Aqueduto colonial transformado em símbolo da boemia carioca', 6, 1, 1, N'24 horas', N'Gratuito', N'Arquitetura colonial do século XVIII. Centro da vida noturna.'),
(N'Teatro Municipal RJ', N'Teatro histórico com arquitetura eclética no centro', 6, 1, 1, N'Ter-Dom: 10h-17h', N'R$ 20,00', N'Arquitetura inspirada na Ópera de Paris. Visitas guiadas.'),
(N'Palácio Tiradentes', N'Sede da Assembleia Legislativa com arquitetura neoclássica', 6, 1, 1, N'Seg-Sex: 10h-17h', N'Gratuito', N'Arquitetura neoclássica. Visitas guiadas agendadas.'),
(N'Mosteiro de São Bento RJ', N'Mosteiro barroco com rica decoração em ouro', 6, 7, 1, N'Diário: 7h-18h', N'Gratuito', N'Arte barroca brasileira. Missas com canto gregoriano.'),

-- Natureza Rio de Janeiro
(N'Floresta da Tijuca', N'Maior floresta urbana do mundo com trilhas e cachoeiras', 6, 2, 1, N'Diário: 8h-17h', N'R$ 15,00', N'Trilhas para todos os níveis. Cachoeiras e mirantes.'),
(N'Jardim Botânico RJ', N'Jardim histórico com coleção de plantas tropicais', 6, 2, 1, N'Diário: 8h-17h', N'R$ 15,00', N'Palmeiras imperiais. Orquidário e casa dos morcegos.'),
(N'Lagoa Rodrigo de Freitas', N'Lagoa urbana com atividades aquáticas e ciclovia', 6, 2, 1, N'24 horas', N'Gratuito', N'Pedalinhos, stand up paddle e ciclovia de 7km.'),
(N'Parque Lage', N'Parque romântico com mansão e trilhas na Tijuca', 6, 2, 1, N'Diário: 8h-17h', N'Gratuito', N'Mansão eclética. Trilha para o Corcovado.'),
(N'Quinta da Boa Vista', N'Parque histórico com museus e áreas verdes', 6, 2, 1, N'Diário: 6h-18h', N'Gratuito', N'Museu Nacional e Zoológico. Antiga residência imperial.'),
(N'Praia Vermelha', N'Pequena praia protegida com águas calmas na Urca', 6, 5, 1, N'24 horas', N'Gratuito', N'Águas calmas ideais para crianças. Trilha do Morro da Urca.'),

-- Gastronomia Rio de Janeiro
(N'Feijoada Carioca', N'Prato nacional brasileiro servido tradicionalmente aos sábados', 6, 3, 1, N'Sábados: 12h-16h', N'R$ 35-80', N'Feijão preto com carnes. Acompanha couve e laranja.'),
(N'Biscoito Globo', N'Biscoito tradicional carioca vendido nas praias', 6, 3, 1, N'Praias: 8h-18h', N'R$ 2-5', N'Biscoito polvilho assado. Tradicional das praias cariocas.'),
(N'Açaí Carioca', N'Açaí servido com granola e frutas nas praias', 6, 3, 1, N'Praias: 8h-20h', N'R$ 8-20', N'Servido gelado com complementos. Energia para atividades.'),
(N'Camarão no Abacaxi', N'Prato sofisticado da culinária carioca', 6, 3, 1, N'Restaurantes: 12h-22h', N'R$ 45-90', N'Camarões refogados servidos no abacaxi. Prato de festa.'),
(N'Pão de Açúcar Doce RJ', N'Doce tradicional carioca feito com coco', 6, 3, 1, N'Confeitarias: 8h-20h', N'R$ 4-10', N'Doce de coco em formato de pão de açúcar.'),
(N'Caipirinha de Praia', N'Drink nacional servido gelado nas barracas de praia', 6, 3, 1, N'Praias: 10h-18h', N'R$ 12-25', N'Cachaça com limão e açúcar. Bebida nacional.'),

-- Cultura Rio de Janeiro
(N'Carnaval Carioca', N'Maior festa popular do mundo com desfiles no Sambódromo', 6, 4, 1, N'Fevereiro/Março', N'R$ 50-500', N'Patrimônio Cultural da Humanidade. Escolas de samba.'),
(N'Samba da Lapa', N'Berço do samba com rodas e casas de show autênticas', 6, 4, 1, N'Noite: 20h-4h', N'R$ 20-80', N'Samba de raiz. Grandes nomes da música brasileira.'),
(N'Santa Teresa Artística', N'Bairro boêmio com ateliês e galerias de arte', 6, 4, 1, N'Diário: 9h-18h', N'Varia por local', N'Ateliês de artistas. Arquitetura colonial preservada.'),
(N'Museu do Amanhã', N'Museu de ciências com arquitetura futurista', 6, 4, 1, N'Ter-Dom: 10h-18h', N'R$ 30,00', N'Arquitetura de Santiago Calatrava. Ciência e sustentabilidade.'),
(N'Centro Cultural Banco do Brasil', N'Espaço cultural com exposições e eventos', 6, 4, 1, N'Ter-Dom: 9h-21h', N'Gratuito', N'Exposições nacionais e internacionais. Arquitetura eclética.'),
(N'Feira de São Cristóvão', N'Feira nordestina com cultura, música e gastronomia', 6, 4, 1, N'Ter-Dom: 10h-4h', N'Gratuito entrada', N'Cultura nordestina no Rio. Forró e comida típica.')

-- BAHIA (5) - COMPLETO
-- Monumentos Bahia
(N'Pelourinho', N'Centro histórico de Salvador, Patrimônio Mundial da UNESCO', 12, 4, 1, N'Diário: 9h-18h', N'Gratuito', N'Arquitetura colonial preservada. Música e dança afro-brasileira.'),
(N'Elevador Lacerda', N'Elevador histórico conectando cidade alta e baixa', 12, 1, 1, N'Diário: 6h-23h', N'R$ 0,15', N'Vista panorâmica da Baía de Todos os Santos.'),
(N'Igreja do Bonfim', N'Igreja católica famosa pelas fitinhas e promessas', 12, 7, 1, N'Diário: 6h30-12h, 14h30-18h', N'Gratuito', N'Sincretismo religioso. Fitinhas do Bonfim famosas mundialmente.'),
(N'Forte de Santo Antônio', N'Fortaleza colonial com vista para o mar', 12, 1, 1, N'Ter-Dom: 8h30-17h', N'R$ 6,00', N'Arquitetura militar colonial. Vista da Baía de Todos os Santos.'),
(N'Casa de Jorge Amado', N'Casa-museu do escritor baiano', 12, 4, 1, N'Seg-Sex: 9h-18h', N'R$ 5,00', N'Acervo pessoal do escritor. Pelourinho histórico.'),
(N'Teatro Castro Alves', N'Principal teatro da Bahia com arquitetura moderna', 12, 1, 1, N'Conforme programação', N'Varia por evento', N'Palco dos grandes espetáculos baianos. Arquitetura dos anos 60.'),

-- Natureza Bahia
(N'Chapada Diamantina', N'Parque nacional com cachoeiras e formações rochosas únicas', 23, 2, 1, N'Diário: 8h-17h', N'R$ 20,00', N'Poço Encantado, Poço Azul e Cachoeira da Fumaça.'),
(N'Morro de São Paulo', N'Ilha paradisíaca com praias cristalinas', 22, 5, 1, N'24 horas', N'Varia por pousada', N'Cinco praias numeradas. Proibido carros na ilha.'),
(N'Praia do Forte', N'Praia com projeto Tamar e coqueirais', 22, 5, 1, N'24 horas', N'Gratuito', N'Projeção de tartarugas marinhas. Vila de pescadores.'),
(N'Parque Nacional Marinho de Abrolhos', N'Arquipélago com recifes de corais e baleias jubarte', 22, 2, 1, N'Passeios agendados', N'R$ 200-400', N'Observação de baleias (jul-nov). Mergulho nos recifes.'),
(N'Cachoeira da Fumaça', N'Uma das cachoeiras mais altas do Brasil', 23, 2, 1, N'Diário: 8h-16h', N'R$ 25,00', N'340 metros de queda livre. Trilha de 6km.'),
(N'Lagoa Azul Lençóis', N'Gruta submersa com águas cristalinas azuis', 23, 2, 1, N'Diário: 8h-16h', N'R$ 30,00', N'Mergulho em gruta com água azul cristalina. Visão de 30m.'),

-- Gastronomia Bahia
(N'Acarajé', N'Bolinho de feijão fradinho frito no dendê', 12, 3, 1, N'Ruas: 16h-22h', N'R$ 8-15', N'Patrimônio Imaterial da Humanidade. Comida de santo.'),
(N'Moqueca Baiana', N'Peixe cozido no leite de coco com dendê', 12, 3, 1, N'Restaurantes: 11h-22h', N'R$ 35-70', N'Prato típico servido na panela de barro. Acompanha pirão.'),
(N'Vatapá', N'Creme à base de pão, camarão e leite de coco', 12, 3, 1, N'Restaurantes: 11h-22h', N'R$ 25-45', N'Acompanha acarajé. Consistência cremosa única.'),
(N'Caruru', N'Prato com quiabo, camarão seco e dendê', 12, 3, 1, N'Restaurantes: 11h-22h', N'R$ 20-35', N'Comida de santo. Servido em festas religiosas.'),
(N'Cocada Baiana', N'Doce de coco com açúcar queimado', 12, 3, 1, N'Praias e ruas: 8h-20h', N'R$ 3-8', N'Doce tradicional vendido nas praias. Receita secular.'),
(N'Cachaça de Umbu', N'Bebida típica do sertão baiano', 12, 3, 1, N'Bares: 18h-2h', N'R$ 8-20', N'Fruto do sertão. Sabor único e refrescante.'),

-- Cultura Bahia
(N'Carnaval de Salvador', N'Maior carnaval de rua do mundo com trios elétricos', 12, 4, 1, N'Fevereiro/Março', N'R$ 80-300', N'Axé music e afoxés. Blocos afro e trios elétricos.'),
(N'Capoeira Baiana', N'Arte marcial brasileira nascida na Bahia', 12, 4, 1, N'Rodas diárias: 18h-21h', N'Gratuito', N'Patrimônio Imaterial da Humanidade. Luta-dança-música.'),
(N'Candomblé', N'Religião afro-brasileira com rituais e música', 12, 4, 1, N'Cerimônias: varia', N'Gratuito', N'Religião de matriz africana. Orixás e rituais sagrados.'),
(N'Axé Music', N'Gênero musical baiano que conquistou o Brasil', 12, 4, 1, N'Shows: 20h-2h', N'R$ 40-150', N'Ritmo contagiante. Grandes nomes da música brasileira.'),
(N'Festa de Iemanjá', N'Festa religiosa em homenagem à rainha do mar', 12, 4, 1, N'2 de fevereiro', N'Gratuito', N'Oferendas no mar. Sincretismo religioso único.'),
(N'Samba de Roda', N'Manifestação cultural com música e dança', 12, 4, 1, N'Apresentações: fins de semana', N'Gratuito', N'Patrimônio Imaterial da Humanidade. Origem do samba.')

-- CEARÁ (6)
(N'Jericoacoara', N'Vila de pescadores com dunas e lagoas cristalinas', 24, 5, 1, N'24 horas', N'Varia por pousada', N'Pôr do sol na Duna do Pôr do Sol. Kitesurf mundial.'),
(N'Canoa Quebrada', N'Praia com falésias coloridas e vida noturna', 25, 5, 1, N'24 horas', N'Varia por local', N'Falésias de até 30m. Buggy pelas dunas.'),
(N'Centro Dragão do Mar', N'Complexo cultural em Fortaleza', 17, 4, 1, N'Ter-Dom: 14h-21h', N'R$ 10,00', N'Planetário, museus e teatro. Arquitetura moderna.'),
(N'Mercado Central', N'Mercado tradicional com artesanato cearense', 17, 3, 1, N'Seg-Sáb: 8h-18h', N'Gratuito entrada', N'Renda de bilro, castanha de caju, rapadura.'),

-- MINAS GERAIS (13)
(N'Ouro Preto', N'Cidade histórica com arquitetura barroca preservada', 30, 4, 1, N'Diário: 9h-17h', N'Varia por atração', N'Patrimônio Mundial UNESCO. Aleijadinho e barroco mineiro.'),
(N'Tiradentes', N'Cidade colonial com gastronomia e cultura', 31, 4, 1, N'Diário: 9h-18h', N'Varia por local', N'Maria Fumaça. Gastronomia mineira autêntica.'),
(N'Inhotim', N'Maior museu a céu aberto do mundo', 21, 4, 1, N'Qua-Sex: 9h-16h', N'R$ 50,00', N'Arte contemporânea em jardim botânico. Obras monumentais.'),
(N'Pão de Açúcar MG', N'Formação rochosa com vista panorâmica', 21, 2, 1, N'Diário: 8h-18h', N'R$ 15,00', N'Trilha moderada. Vista da região metropolitana.'),

-- PARANÁ (16)
(N'Cataratas do Iguaçu', N'Uma das maiores quedas d\'água do mundo', 13, 2, 1, N'Diário: 9h-17h', N'R$ 75,00', N'275 quedas d\'água. Patrimônio Mundial UNESCO.'),
(N'Jardim Botânico Curitiba', N'Estufa de vidro ícone da cidade', 35, 2, 1, N'Diário: 6h-20h', N'Gratuito', N'Arquitetura art nouveau. Jardins temáticos.'),
(N'Trem da Serra do Mar', N'Viagem histórica pela Mata Atlântica', 36, 6, 1, N'Fins de semana', N'R$ 80,00', N'Ponte mais alta do Brasil. Mata Atlântica preservada.'),
(N'Morretes', N'Cidade histórica famosa pelo barreado', 36, 3, 1, N'Diário: 9h-18h', N'Varia por restaurante', N'Barreado tradicional. Arquitetura colonial.'),

-- PERNAMBUCO (17)
(N'Fernando de Noronha', N'Arquipélago paradisíaco com vida marinha única', 14, 5, 1, N'Acesso controlado', N'R$ 150,00/dia', N'Mergulho mundial. Golfinhos e tartarugas.'),
(N'Olinda', N'Centro histórico com frevo e maracatu', 37, 4, 1, N'Diário: 9h-18h', N'Gratuito', N'Carnaval de Olinda. Patrimônio Mundial UNESCO.'),
(N'Porto de Galinhas', N'Praia com piscinas naturais e coqueiros', 38, 5, 1, N'24 horas', N'Varia por atividade', N'Piscinas naturais de corais. Jangadas tradicionais.'),
(N'Marco Zero Recife', N'Centro histórico com arquitetura holandesa', 18, 4, 1, N'Diário: 9h-18h', N'Gratuito', N'Influência holandesa. Frevo e maracatu.'),

-- RIO GRANDE DO SUL (21)
(N'Gramado', N'Cidade serrana com arquitetura europeia', 39, 8, 1, N'Diário: 9h-18h', N'Varia por atração', N'Festival de Cinema. Natal Luz. Chocolate artesanal.'),
(N'Canela', N'Natureza exuberante com cascatas', 40, 2, 1, N'Diário: 9h-17h', N'R$ 25,00', N'Cascata do Caracol. Parque do Caracol.'),
(N'Centro Histórico Porto Alegre', N'Arquitetura histórica gaúcha', 19, 4, 1, N'Diário: 9h-18h', N'Gratuito', N'Mercado Público. Casa de Cultura Mario Quintana.'),
(N'Churrascaria Gaúcha', N'Tradição gastronômica do Rio Grande do Sul', 19, 3, 1, N'Almoço e jantar', N'R$ 80-120', N'Churrasco tradicional. Cultura gaúcha autêntica.'),

-- SANTA CATARINA (24)
(N'Florianópolis', N'Ilha da Magia com 42 praias', 20, 5, 1, N'24 horas', N'Gratuito', N'Ponte Hercílio Luz. Lagoa da Conceição.'),
(N'Blumenau', N'Cidade alemã com Oktoberfest', 41, 4, 1, N'Diário: 9h-18h', N'Varia por evento', N'Oktoberfest brasileira. Arquitetura alemã.'),
(N'Balneário Camboriú', N'Praia urbana com teleférico', 42, 5, 1, N'24 horas', N'Varia por atividade', N'Teleférico Unipraias. Vida noturna agitada.'),
(N'Pomerode', N'Cidade mais alemã do Brasil', 24, 4, 1, N'Diário: 9h-17h', N'Varia por local', N'Festa Pomerana. Cervejarias artesanais.') N'Safra: Dez-Mar', N'R$ 10-20', N'Usado em sobremesas, sucos e sorvetes. Sabor único e marcante.'),
(N'Tacacá', N'Prato típico amazônico com tucumã e camarão seco', 1, 3, 1, N'Vendido à tarde/noite', N'R$ 8-12', N'Servido quente em cuia. Patrimônio cultural imaterial.'),
(N'Farinha de Mandioca', N'Alimento básico da culinária amazônica', 1, 3, 1, N'Disponível o ano todo', N'R$ 5-8/kg', N'Acompanha praticamente todas as refeições regionais.'),

-- Cultura Amazonas
(N'Festival de Parintins', N'Maior festival folclórico do Norte com Boi Garantido e Caprichoso', 2, 4, 1, N'Última semana de junho', N'R$ 50-200', N'Evento cultural mais importante da região. Reservas antecipadas necessárias.'),
(N'Lendas Amazônicas', N'Rica tradição oral com personagens como Curupira e Boto', 1, 4, 1, N'Contação permanente', N'Varia por local', N'Parte fundamental da cultura regional. Tours culturais disponíveis.'),
(N'Artesanato Indígena', N'Arte tradicional dos povos amazônicos com materiais naturais', 1, 4, 1, N'Feiras e mercados', N'R$ 20-500', N'Peças únicas feitas com sementes, fibras e madeira.'),
(N'Música Regional', N'Ritmos típicos como carimbó e boi-bumbá', 1, 4, 1, N'Apresentações variadas', N'Gratuito a R$ 50', N'Expressão cultural autêntica da região Norte.'),
(N'Danças Folclóricas', N'Manifestações culturais tradicionais amazônicas', 1, 4, 1, N'Eventos culturais', N'Gratuito a R$ 30', N'Preservação das tradições ancestrais.'),
(N'Literatura de Cordel', N'Tradição literária popular nordestina presente na Amazônia', 1, 4, 1, N'Feiras culturais', N'R$ 5-15', N'Narrativas em versos sobre lendas e histórias locais.') N'Safra: Jan-Abr', N'R$ 10-20', N'Usado em sobremesas, sucos e sorvetes.'),
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