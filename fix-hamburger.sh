#!/bin/bash

# Lista de arquivos para corrigir (páginas específicas, não principais)
files=(
    "cupuacu.html"
    "farinha-mandioca.html"
    "encontro-aguas.html"
    "rituais-xamanicos.html"
    "festival-parintins.html"
    "lendas-amazonicas.html"
    "mercado-municipal.html"
    "carimbo.html"
    "pirarucu.html"
    "rio-amazonas.html"
    "parque-anavilhanas.html"
    "palacio-justica.html"
    "tucuma.html"
    "tacaca.html"
    "floresta-amazonica.html"
    "ciranda-amazonica.html"
    "palacio-rio-negro.html"
    "artesanato-indigena.html"
    "acai.html"
    "parque-jau.html"
    "igreja-sao-sebastiao.html"
    "reserva-mamiraui.html"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Corrigindo $file..."
        
        # Adicionar CSS do hamburger
        sed -i '/\.nav-links {/,/}/ {
            /display: flex;/c\
            position: fixed;\
            top: 0;\
            right: -100%;\
            width: 300px;\
            height: 100vh;\
            background: #1a237e;\
            display: flex;\
            flex-direction: column;\
            justify-content: flex-start;\
            align-items: center;\
            gap: 1rem;\
            margin: 0;\
            padding: 2rem 0;\
            list-style: none;\
            transition: right 0.3s ease;\
            z-index: 1001;\
            overflow-y: scroll;
        }
        
        .nav-links.active {
            right: 0;
        }
        
        .hamburger {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            z-index: 1002;
        }
        
        .hamburger span {
            width: 25px;
            height: 3px;
            background: white;
            margin: 3px 0;
            transition: 0.3s;
        }
        
        .nav-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        }' "$file"
        
        # Adicionar HTML do hamburger
        sed -i 's|<ul class="nav-links">|<div style="display: flex; align-items: center; gap: 1rem;"><div class="hamburger"><span></span><span></span><span></span></div></div><div class="nav-overlay"></div><ul class="nav-links">|' "$file"
        
        # Adicionar JavaScript
        sed -i 's|</body>|<script>document.querySelector(".hamburger").addEventListener("click", () => {document.querySelector(".nav-links").classList.toggle("active");document.querySelector(".nav-overlay").classList.toggle("active");});document.querySelector(".nav-overlay").addEventListener("click", () => {document.querySelector(".nav-links").classList.remove("active");document.querySelector(".nav-overlay").classList.remove("active");});</script></body>|' "$file"
    fi
done

echo "Correção concluída!"