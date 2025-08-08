# 🔗 GADYS - Conexão com SQL Server

## ✅ O que foi conectado:

### 🔧 Backend (API)
- ✅ Servidor Express rodando na porta 3001
- ✅ Conexão com SQL Server configurada
- ✅ Rotas para usuários, locais, comentários, ranking

### 💻 Frontend
- ✅ AdminPanel conectado com API para usuários
- ✅ Sistema de comentários usando API
- ✅ Ranking carregado da API
- ✅ Fallback para localStorage se API estiver offline

## 🚀 Como usar:

### 1. Configurar SQL Server
```sql
-- Execute o arquivo: database/GADYS_COMPLETO_SQLServer.sql
-- no SQL Server Management Studio
```

### 2. Configurar conexão
```bash
# Edite o arquivo: server/.env
DB_SERVER=localhost
DB_NAME=GADYS_COMPLETO
DB_USER=sa
DB_PASSWORD=sua_senha_aqui
```

### 3. Iniciar sistema
```bash
# Opção 1: Script automático (Windows)
start-system.bat

# Opção 2: Manual
cd server
npm install
npm start

# Em outro terminal:
npm run dev
```

## 📡 Endpoints da API:

- `POST /api/usuarios` - Cadastrar usuário
- `GET /api/usuarios` - Listar usuários  
- `POST /api/login` - Fazer login
- `GET /api/ranking` - Ranking de locais
- `POST /api/comentarios` - Adicionar comentário
- `GET /api/comentarios/all` - Todos os comentários

## 🔄 Sistema Híbrido:

O sistema funciona de forma **híbrida**:
- **Com API**: Dados salvos no SQL Server
- **Sem API**: Fallback para localStorage

## ✨ Benefícios da conexão:

- ✅ Dados persistem entre computadores
- ✅ Usuários sincronizados
- ✅ Comentários centralizados
- ✅ Ranking em tempo real
- ✅ Backup automático no banco

## 🎯 Status atual:
**CONECTADO** - Sistema funcionando com SQL Server!