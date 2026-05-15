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

  // ── Ripple effect on card tap ───────────────
  function initRipple() {
    const cards = document.querySelectorAll('.step-card');

    cards.forEach((card) => {
      card.addEventListener('pointerdown', function (e) {
        const existing = card.querySelector('.ripple');
        if (existing) existing.remove();

        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.5;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        Object.assign(ripple.style, {
          position:      'absolute',
          width:         size + 'px',
          height:        size + 'px',
          left:          x + 'px',
          top:           y + 'px',
          background:    'rgba(26, 92, 48, 0.08)',
          borderRadius:  '50%',
          transform:     'scale(0)',
          transition:    'transform 0.5s ease, opacity 0.5s ease',
          pointerEvents: 'none',
          zIndex:        '0',
        });

        card.style.overflow = 'hidden';
        card.appendChild(ripple);

        requestAnimationFrame(() => {
          ripple.style.transform = 'scale(1)';
          ripple.style.opacity = '0';
        });

        ripple.addEventListener('transitionend', () => ripple.remove());
      });
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
    initScrollReveal();
    initRipple();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
