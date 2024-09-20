// Función para manejar el comportamiento de los dots y el scroll
function initScrollIndicator() {
    const dots = document.querySelectorAll('.scroll-indicator .dot');
    const sections = document.querySelectorAll('.project-section');

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            dots.forEach(dot => dot.classList.remove('active'));
            dot.classList.add('active');
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = index;
            }
        });

        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSection].classList.add('active');
    });
}

// Función para manejar el modo oscuro
function initDarkMode() {
    const toggleButton = document.getElementById('toggle-dark-mode');
    const footer = document.querySelector('footer');
    
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        footer.classList.add('dark-mode');
        toggleButton.checked = true; 
    }

    toggleButton.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        footer.classList.toggle('dark-mode');

        const projectContents = document.querySelectorAll('.project-content');
        projectContents.forEach(content => {
            content.classList.toggle('dark-mode');
        });

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
}

function init() {
    initScrollIndicator();
    initDarkMode();
}

document.addEventListener('DOMContentLoaded', init);