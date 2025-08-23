function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt',
        autoDisplay: false
    }, 'google_translate_element');
}

let isTranslating = false;

function translatePage(lang) {
    if (isTranslating) return;
    isTranslating = true;
    
    setTimeout(() => {
        var selectField = document.querySelector('.goog-te-combo');
        if (selectField && selectField.value !== lang) {
            selectField.value = lang;
            selectField.dispatchEvent(new Event('change'));
        }
        
        setTimeout(() => {
            isTranslating = false;
        }, 2000);
    }, 1000);
}