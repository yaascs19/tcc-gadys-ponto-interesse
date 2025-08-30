// Script para atualizar páginas HTML para usar componentes React
const fs = require('fs')
const path = require('path')

const redirectTemplate = (pageName) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GADYS - ${pageName}</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>`

const pagesToUpdate = [
  { file: 'public/home.html', name: 'Home' },
  { file: 'public/amazonas.html', name: 'Amazonas' },
  { file: 'public/lugares.html', name: 'Lugares' },
  { file: 'public/sobre.html', name: 'Sobre' },
  { file: 'public/contato.html', name: 'Contato' }
]

pagesToUpdate.forEach(({ file, name }) => {
  const filePath = path.join(__dirname, file)
  const content = redirectTemplate(name)
  
  try {
    fs.writeFileSync(filePath, content)
    console.log(`✅ Atualizado: ${file}`)
  } catch (error) {
    console.error(`❌ Erro ao atualizar ${file}:`, error.message)
  }
})

console.log('\n🎉 Páginas HTML atualizadas para usar componentes React!')
console.log('Execute "npm run dev" para testar as mudanças.')