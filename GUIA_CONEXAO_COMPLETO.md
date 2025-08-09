# 🚀 GUIA COMPLETO - CONECTAR GADYS COM SQL SERVER

## 📋 PASSO A PASSO DETALHADO

### 🔧 PASSO 1: INSTALAR SQL SERVER

#### Opção A - SQL Server Express (Recomendado)
1. **Baixe SQL Server Express:**
   - Acesse: https://www.microsoft.com/pt-br/sql-server/sql-server-downloads
   - Clique em "Baixar agora" na seção Express
   - Execute o instalador

2. **Durante a instalação:**
   - Escolha "Básico"
   - Aceite os termos
   - Aguarde a instalação
   - **ANOTE** a string de conexão que aparece no final

3. **Baixe SQL Server Management Studio (SSMS):**
   - Acesse: https://docs.microsoft.com/pt-br/sql/ssms/download-sql-server-management-studio-ssms
   - Baixe e instale o SSMS

#### Opção B - Docker (Alternativa)
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=MinhaSenh@123" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2019-latest
```

### 🗄️ PASSO 2: CRIAR O BANCO DE DADOS

1. **Abra o SQL Server Management Studio (SSMS)**

2. **Conecte no servidor:**
   - Server name: `localhost` ou `.\SQLEXPRESS`
   - Authentication: Windows Authentication (ou SQL Server se configurou senha)
   - Clique "Connect"

3. **Execute o script do banco:**
   - No SSMS, clique em "File" → "Open" → "File"
   - Navegue até: `tcc-gadys-ponto-interesse/database/GADYS_COMPLETO_SQLServer.sql`
   - Abra o arquivo
   - Clique em "Execute" (F5) ou no botão ▶️
   - Aguarde a execução (deve aparecer "Commands completed successfully")

### ⚙️ PASSO 3: CONFIGURAR A CONEXÃO

1. **Abra o arquivo de configuração:**
   - Navegue até: `tcc-gadys-ponto-interesse/server/.env`
   - Abra com qualquer editor de texto

2. **Configure suas credenciais:**
```env
DB_SERVER=localhost
DB_NAME=GADYS_COMPLETO
DB_USER=sa
DB_PASSWORD=sua_senha_aqui
PORT=3001
```

**⚠️ IMPORTANTE:** 
- Se usou Windows Authentication, use: `DB_USER=` (vazio)
- Se configurou senha SA, coloque sua senha em `DB_PASSWORD`
- Se usou Docker, senha é: `MinhaSenh@123`

### 🚀 PASSO 4: INICIAR O SISTEMA

#### Opção A - Script Automático (Windows)
1. **Execute o arquivo:**
   - Clique duas vezes em: `start-system.bat`
   - Aguarde abrir 2 janelas (Backend e Frontend)

#### Opção B - Manual
1. **Terminal 1 - Backend:**
```bash
cd tcc-gadys-ponto-interesse/server
npm start
```

2. **Terminal 2 - Frontend:**
```bash
cd tcc-gadys-ponto-interesse
npm run dev
```

### ✅ PASSO 5: TESTAR A CONEXÃO

1. **Acesse:** http://localhost:5173

2. **Teste o login:**
   - Email: `yasmincunegundes25@gmail.com`
   - Senha: `Cun*1925`
   - Tipo: Administrador

3. **Verifique se funcionou:**
   - ✅ Login realizado com sucesso
   - ✅ Painel administrativo carrega dados
   - ✅ Consegue cadastrar usuários
   - ✅ Sistema de comentários funciona
   - ✅ Avaliações são salvas

## 🔍 SOLUÇÃO DE PROBLEMAS

### ❌ Erro: "Cannot connect to server"
**Solução:**
1. Verifique se SQL Server está rodando
2. Confirme o nome do servidor no `.env`
3. Teste a conexão no SSMS primeiro

### ❌ Erro: "Login failed"
**Solução:**
1. Verifique usuário e senha no `.env`
2. Se usar Windows Auth, deixe `DB_USER=` vazio
3. Confirme se o usuário tem permissões

### ❌ Erro: "Database does not exist"
**Solução:**
1. Execute novamente o script SQL
2. Verifique se o banco `GADYS_COMPLETO` foi criado
3. Confirme o nome no `.env`

### ❌ Erro: "Port 3001 already in use"
**Solução:**
1. Mude a porta no `.env`: `PORT=3002`
2. Ou mate o processo: `taskkill /f /im node.exe`

## 📊 VERIFICAÇÃO FINAL

### ✅ Checklist de Sucesso:
- [ ] SQL Server instalado e rodando
- [ ] SSMS conecta no servidor
- [ ] Banco `GADYS_COMPLETO` criado
- [ ] Arquivo `.env` configurado
- [ ] Backend inicia sem erros (porta 3001)
- [ ] Frontend inicia sem erros (porta 5173)
- [ ] Login funciona
- [ ] Dados são salvos no banco

### 🎯 URLs do Sistema:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001
- **Teste API:** http://localhost:3001/api/usuarios

## 🆘 PRECISA DE AJUDA?

### Comandos Úteis:
```bash
# Verificar se SQL Server está rodando
services.msc

# Testar conexão com o banco
sqlcmd -S localhost -E -Q "SELECT @@VERSION"

# Ver logs do backend
cd server && npm start

# Reinstalar dependências
cd server && npm install
```

### Arquivos Importantes:
- `server/.env` - Configuração do banco
- `server/server.js` - Código da API
- `database/GADYS_COMPLETO_SQLServer.sql` - Script do banco
- `start-system.bat` - Script de inicialização

---

## 🎉 PARABÉNS!

Se chegou até aqui, seu sistema GADYS está **100% conectado** com SQL Server!

Agora todos os dados são salvos no banco e sincronizados entre computadores.

**Sistema pronto para produção!** 🚀