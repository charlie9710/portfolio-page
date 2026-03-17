document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Cambiar icono de hamburguesa a X (opcional si se usa FontAwesome)
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });
});

function copyToClipboard() {
  const email = document.getElementById('emailText').innerText;
  const icon = document.getElementById('copyIcon');

  navigator.clipboard.writeText(email).then(() => {
    // Feedback visual: cambia el icono a un check
    icon.classList.replace('far', 'fas');
    icon.classList.replace('fa-copy', 'fa-check');
    
    // Vuelve al estado original después de 2 segundos
    setTimeout(() => {
      icon.classList.replace('fas', 'far');
      icon.classList.replace('fa-check', 'fa-copy');
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar: ', err);
  });
}
