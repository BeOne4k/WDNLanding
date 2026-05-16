// ─────────────────────────────────────────────
// WeedeN Taxi Affiliate – Main JS
// ─────────────────────────────────────────────

(function () {
  'use strict';

  // ── Animate cards on scroll into view ──────
  function initScrollReveal() {
    const cards = document.querySelectorAll('.step-card');
    const connectors = document.querySelectorAll('.connector-down');
    const cta = document.querySelector('.cta-section');

    // Initial hidden state applied via JS (graceful degradation if JS disabled)
    const revealItems = [...cards, ...connectors, cta].filter(Boolean);

    revealItems.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    // Stagger delay per card
    revealItems.forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
      observer.observe(el);
    });
  }



  // ── Animate header logo on load ────────────
  function initLogoAnimation() {
    const logo = document.querySelector('.logo-text');
    const dot  = document.querySelector('.logo-dot');
    const divider = document.querySelector('.divider-line');

    if (!logo) return;

    logo.style.opacity = '0';
    logo.style.transform = 'translateY(-12px)';
    logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    if (dot) {
      dot.style.opacity = '0';
      dot.style.transition = 'opacity 0.4s ease 0.5s';
    }

    if (divider) {
      divider.style.opacity = '0';
      divider.style.transition = 'opacity 0.5s ease 0.3s';
    }

    requestAnimationFrame(() => {
      setTimeout(() => {
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
        if (dot) dot.style.opacity = '1';
        if (divider) divider.style.opacity = '1';
      }, 100);
    });
  }

  // ── Init ───────────────────────────────────
  function init() {
    initLogoAnimation();
    initScrollReveal();;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
