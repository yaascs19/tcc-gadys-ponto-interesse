// Widget de tradução customizado
function createTranslationWidget() {
    const widget = `
        <div style="position: relative;">
            <button 
                onclick="event.preventDefault(); const dropdown = this.nextElementSibling; dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';" 
                style="background: none; border: none; cursor: pointer; font-size: 1.2rem; color: white;" 
                title="Traduzir página"
            >
                🌐
            </button>
            <div style="display: none; position: absolute; top: 100%; left: 0; background: white; border: 1px solid #ccc; border-radius: 5px; z-index: 1000; min-width: 120px;">
                <div onclick="const combo = document.querySelector('.goog-te-combo'); if (combo) { combo.value = 'pt'; combo.dispatchEvent(new Event('change')); }" style="padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #eee; color: #333;">🇧🇷 PT</div>
                <div onclick="const combo = document.querySelector('.goog-te-combo'); if (combo) { combo.value = 'en'; combo.dispatchEvent(new Event('change')); }" style="padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #eee; color: #333;">🇺🇸 EN</div>
                <div onclick="const combo = document.querySelector('.goog-te-combo'); if (combo) { combo.value = 'es'; combo.dispatchEvent(new Event('change')); }" style="padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #eee; color: #333;">🇪🇸 ES</div>
                <div onclick="const combo = document.querySelector('.goog-te-combo'); if (combo) { combo.value = 'fr'; combo.dispatchEvent(new Event('change')); }" style="padding: 8px 12px; cursor: pointer; color: #333;">🇫🇷 FR</div>
            </div>
            <div id="google_translate_element" style="display: none;"></div>
        </div>
    `;
    return widget;
}

// Inicializar Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt',
        includedLanguages: 'pt,en,es,fr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    const dropdowns = document.querySelectorAll('[style*="position: absolute"][style*="background: white"]');
    dropdowns.forEach(dropdown => {
        if (!dropdown.parentElement.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
});

// Carregar script do Google Translate
if (!document.querySelector('script[src*="translate.google.com"]')) {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
}