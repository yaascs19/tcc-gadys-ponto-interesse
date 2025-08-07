# GADYS Backend API

## Configuração

1. **Instalar dependências:**
```bash
cd server
npm install
```

2. **Configurar banco:**
- Edite o arquivo `.env` com suas credenciais do SQL Server
- Execute o script `GADYS_SQLServer_Database.sql` no SQL Server

3. **Iniciar servidor:**
```bash
npm start
# ou para desenvolvimento:
npm run dev
```

## Endpoints Disponíveis

### Usuários
- `GET /api/usuarios` - Listar usuários
- `POST /api/usuarios` - Cadastrar usuário
- `POST /api/login` - Fazer login

### Locais
- `GET /api/locais` - Listar locais
- `POST /api/locais` - Cadastrar local

### Avaliações
- `POST /api/avaliacoes` - Adicionar avaliação

### Comentários
- `GET /api/comentarios/:localId` - Listar comentários
- `POST /api/comentarios` - Adicionar comentário

### Ranking
- `GET /api/ranking` - Ranking de locais

### Estatísticas
- `GET /api/estatisticas` - Estatísticas do sistema

## Exemplo de Uso

```javascript
// Cadastrar usuário
fetch('http://localhost:3001/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nome: 'David',
        email: 'david@email.com',
        senha: '123456',
        tipoUsuario: 'usuario'
    })
});
```