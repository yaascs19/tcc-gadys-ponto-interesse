function toggleNav() {
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.nav-overlay');
    
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeNav() {
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.nav-overlay');
    
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Adiciona evento ao hambúrguer
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleNav);
    }
    
    // Adiciona evento ao overlay
    const overlay = document.querySelector('.nav-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeNav);
    }
    
    // Adiciona evento a todos os links da nav
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });
});