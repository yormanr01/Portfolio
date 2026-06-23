// Scripts para el Perfil Digital de Yorman Romero Ávila

document.addEventListener('DOMContentLoaded', () => {
  // Manejo de scroll suave para enlaces internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      
      if (targetId === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Menú Hamburguesa para Móviles
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navToggleIcon = document.getElementById('nav-toggle-icon');

  if (navToggle && navMenu && navToggleIcon) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggleIcon.className = isOpen ? 'ti ti-x' : 'ti ti-menu-2';
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Cerrar menú al hacer clic en un enlace (para móviles)
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          document.body.classList.remove('no-scroll');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggleIcon.className = 'ti ti-menu-2';
        }
      });
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggleIcon.className = 'ti ti-menu-2';
      }
    });
  }

  // Botones de acción del Hero
  const btnContacto = document.getElementById('btn-contacto');
  const btnExperiencia = document.getElementById('btn-experiencia');

  if (btnContacto) {
    btnContacto.addEventListener('click', () => {
      document.getElementById('contacto')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  if (btnExperiencia) {
    btnExperiencia.addEventListener('click', () => {
      document.getElementById('experiencia')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
  // Año dinámico en el footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Scroll Reveal ──────────────────────────────────────────
  // Solo si el usuario no prefiere movimiento reducido
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

    // Elementos individuales que se revelan al hacer scroll
    const revealSelectors = [
      '.section-label',
      '.section-title',
      '.about-text p',
      '.exp-item',
      '.skill-chip',
      '.project-card',
      '.cert-item',
      '.contact-item',
      '.stat-item',
      '.hero-tag',
      '.hero h1',
      '.hero-sub',
      '.hero-actions',
    ];

    // Aplicar stagger delay (retardo escalonado) a grupos
    const staggerSelectors = [
      '.stat-item',
      '.exp-item',
      '.skill-chip',
      '.project-card',
      '.cert-item',
      '.contact-item',
      '.about-text p',
    ];
    staggerSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.style.transitionDelay = `${i * 80}ms`;
      });
    });

    // Agregar clase base y observar todos los elementos
    const allReveal = document.querySelectorAll(revealSelectors.join(', '));
    allReveal.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // animar solo una vez
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -32px 0px',
    });

    allReveal.forEach(el => revealObserver.observe(el));
  }

  // ── Botón volver al inicio ─────────────────────────────────
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    // Mostrar u ocultar según la posición del scroll
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    // Throttle con requestAnimationFrame para mejor rendimiento
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleBackToTop();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Scroll suave al hacer clic
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

