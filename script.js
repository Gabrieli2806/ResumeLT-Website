// Sistema de cambio de idioma
let idiomaActual = 'es';

function cambiarIdioma(idioma) {
    idiomaActual = idioma;
    
    // Actualizar botones
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`btn-${idioma}`).classList.add('active');
    
    // Actualizar contenido
    document.querySelectorAll('[data-es]').forEach(elemento => {
        if (idioma === 'es') {
            elemento.textContent = elemento.getAttribute('data-es');
        } else {
            elemento.textContent = elemento.getAttribute('data-en');
        }
    });
    
    // Guardar preferencia
    localStorage.setItem('idioma-preferido', idioma);
}

// Cargar idioma guardado al iniciar
document.addEventListener('DOMContentLoaded', function() {
    const idiomaGuardado = localStorage.getItem('idioma-preferido');
    if (idiomaGuardado) {
        cambiarIdioma(idiomaGuardado);
    }
    
    // Agregar animaciones al hacer scroll (para páginas de portfolio)
    if (document.querySelector('.portfolio-page')) {
        observarElementos();
        activarZoomEnImagenes();
    }
});

// Intersection Observer para animaciones al hacer scroll
function observarElementos() {
    const opciones = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observador = new IntersectionObserver(function(entradas, observador) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, opciones);
    
    // Observar secciones
    document.querySelectorAll('.slide-in-up').forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observador.observe(elemento);
    });
}

function activarZoomEnImagenes() {
    const elementosZoom = document.querySelectorAll('.zoom-in');
    if (!elementosZoom.length) {
        return;
    }

    elementosZoom.forEach((elemento, index) => {
        const delay = 0.1 * (index + 1);
        elemento.dataset.zoomDelay = delay.toFixed(1);
        elemento.style.opacity = '0';
        elemento.style.transform = 'scale(0.92)';
    });

    const observadorZoom = new IntersectionObserver((entradas, observer) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const objetivo = entrada.target;
                const delay = objetivo.dataset.zoomDelay || '0';
                objetivo.style.animationDelay = `${delay}s`;
                objetivo.classList.add('is-visible');
                observer.unobserve(objetivo);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    elementosZoom.forEach(elemento => observadorZoom.observe(elemento));
}

// Animación de entrada para las tarjetas de proyecto
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 150);
    });
});

// Efecto hover mejorado para las tarjetas
document.querySelectorAll('.profile-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Prevenir carga de imágenes rotas
document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('img');
    imagenes.forEach(img => {
        img.addEventListener('error', function() {
            // Si la imagen no carga, mostrar solo el placeholder del CSS
            this.style.display = 'none';
        });
    });
});
