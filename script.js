// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
    }
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Allow default behavior for contact links (email, whatsapp, phone)
        if (href === '#contacto' || this.classList.contains('btn-primary') || this.classList.contains('btn-whatsapp') || this.classList.contains('btn-phone')) {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and project cards
document.querySelectorAll('.service-card, .project-card, .contact-option').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            nombre: document.getElementById('nombre').value,
            empresa: document.getElementById('empresa').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            tipoProyecto: document.getElementById('tipo-proyecto').value,
            mensaje: document.getElementById('mensaje').value,
            timestamp: new Date().toISOString()
        };
        
        console.log('Datos del formulario:', formData);
        
        // TODO: Descomentar cuando tengas backend en hosting
        // fetch('/api/cotizacion', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         alert('¡Solicitud enviada exitosamente! Nos contactaremos pronto.');
        //         contactForm.reset();
        //     } else {
        //         alert('Error: ' + data.error);
        //     }
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('Error al enviar el formulario');
        // });
        
        // Mensaje temporal (actualmente sin backend)
        alert('Solicitud recibida. Nos contactaremos en breve.');
        contactForm.reset();
    });
}
