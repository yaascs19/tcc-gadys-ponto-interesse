// Script para atualizar navbar em todas as páginas HTML
const fs = require('fs');
const path = require('path');

const publicDir = './public';
const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));

const oldNavbar = `                    <li><a href="/sobre.html">Sobre</a></li>
                    <li><a href="/contato.html">Contato</a></li>`;

const newNavbar = `                    <li><a href="/perfil.html">Meu Perfil</a></li>
                    <li><a href="/sobre.html">Sobre</a></li>
                    <li><a href="/contato.html">Contato</a></li>`;

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(oldNavbar)) {
        content = content.replace(oldNavbar, newNavbar);
        fs.writeFileSync(filePath, content);
        console.log(`✅ Atualizado: ${file}`);
    }
});

console.log('🎉 Navbar atualizada em todas as páginas!');