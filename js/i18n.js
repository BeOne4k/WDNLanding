// ─────────────────────────────────────────────
// WeedeN – i18n (EN / RU / TH)
// ─────────────────────────────────────────────

(function () {
  'use strict';

  var translations = {
    en: {
      pageTitle:   'WeedeN – Taxi Affiliate Program',
      headerSub:   'Taxi Affiliate Program',
      step1badge:  'Step 1',
      step1desc:   'Register<br>at WeedeN shops',
      step2badge:  'Step 2',
      step2desc:   'Get your personal<br>Taxi Referral card',
      step3badge:  'Step 3',
      step3desc:   'Bring or recommend<br>customers to WeedeN',
      step4badge:  'Step 4',
      step4desc:   'Show your Taxi card &amp;<br>earn 15% commission<br>on customers purchase',
      step5badge:  'Step 5',
      step5desc:   'Commission<br>Calculating',
      step6badge:  'Step 6',
      step6desc:   'Receive Payment<br>Monday or Thursday',
      cta:         "Let's Drive &amp; Earn!",
      btnLine:     'Contact us on LINE',
      btnTg:       'Contact us on Telegram',
      btnWa:       'Contact us on WhatsApp',
    },

    ru: {
      pageTitle:   'WeedeN – Партнёрская программа для такси',
      headerSub:   'Партнёрская программа для такси',
      step1badge:  'Шаг 1',
      step1desc:   'Зарегистрируйтесь<br>в магазинах WeedeN',
      step2badge:  'Шаг 2',
      step2desc:   'Получите личную<br>реферальную карту такси',
      step3badge:  'Шаг 3',
      step3desc:   'Приводите или рекомендуйте<br>клиентов в WeedeN',
      step4badge:  'Шаг 4',
      step4desc:   'Покажите карту такси &amp;<br>получайте 15% комиссии<br>с покупки клиента',
      step5badge:  'Шаг 5',
      step5desc:   'Расчёт<br>комиссии',
      step6badge:  'Шаг 6',
      step6desc:   'Получайте выплату<br>в понедельник или четверг',
      cta:         'Поехали зарабатывать!',
      btnLine:     'Написать нам в LINE',
      btnTg:       'Написать нам в Telegram',
      btnWa:       'Написать нам в WhatsApp',
    },

    th: {
      pageTitle:   'WeedeN – โปรแกรมพาร์ทเนอร์แท็กซี่',
      headerSub:   'โปรแกรมพาร์ทเนอร์แท็กซี่',
      step1badge:  'ขั้นตอนที่ 1',
      step1desc:   'ลงทะเบียน<br>ที่ร้าน WeedeN',
      step2badge:  'ขั้นตอนที่ 2',
      step2desc:   'รับบัตรแนะนำแท็กซี่<br>ส่วนตัวของคุณ',
      step3badge:  'ขั้นตอนที่ 3',
      step3desc:   'พาหรือแนะนำ<br>ลูกค้ามาที่ WeedeN',
      step4badge:  'ขั้นตอนที่ 4',
      step4desc:   'แสดงบัตรแท็กซี่ &amp;<br>รับค่าคอมมิชชัน 15%<br>จากยอดซื้อของลูกค้า',
      step5badge:  'ขั้นตอนที่ 5',
      step5desc:   'การคำนวณ<br>ค่าคอมมิชชัน',
      step6badge:  'ขั้นตอนที่ 6',
      step6desc:   'รับเงินทุก<br>วันจันทร์หรือวันพฤหัสบดี',
      cta:         'ขับรถแล้วมาหาเงินด้วยกัน!',
      btnLine:     'ติดต่อเราทาง LINE',
      btnTg:       'ติดต่อเราทาง Telegram',
      btnWa:       'ติดต่อเราทาง WhatsApp',
    },
  };

  // ── Detect language ─────────────────────────
  function detectLang() {
    var saved = localStorage.getItem('weeden_lang');
    if (saved && translations[saved]) return saved;

    var langs = navigator.languages || [navigator.language || navigator.userLanguage || 'en'];
    for (var i = 0; i < langs.length; i++) {
      var code = langs[i].toLowerCase().split('-')[0];
      if (code === 'ru') return 'ru';
      if (code === 'th') return 'th';
      if (code === 'en') return 'en';
    }
    return 'en'; // default fallback
  }

  // ── Apply translations to DOM ───────────────
  function applyLang(lang) {
    var t = translations[lang];
    if (!t) return;

    document.documentElement.lang = lang;
    document.title = t.pageTitle;

    function set(sel, html) {
      var el = document.querySelector(sel);
      if (el) el.innerHTML = html;
    }

    set('.divider-line',                           t.headerSub);
    set('[data-step="1"] .step-badge',             t.step1badge);
    set('[data-step="1"] .step-desc',              t.step1desc);
    set('[data-step="2"] .step-badge',             t.step2badge);
    set('[data-step="2"] .step-desc',              t.step2desc);
    set('[data-step="3"] .step-badge',             t.step3badge);
    set('[data-step="3"] .step-desc',              t.step3desc);
    set('[data-step="4"] .step-badge',             t.step4badge);
    set('[data-step="4"] .step-desc',              t.step4desc);
    set('[data-step="5"] .step-badge',             t.step5badge);
    set('[data-step="5"] .step-desc',              t.step5desc);
    set('[data-step="6"] .step-badge',             t.step6badge);
    set('[data-step="6"] .step-desc',              t.step6desc);
    set('.cta-text',                               t.cta);
    set('.msg-btn--line .btn-label',               t.btnLine);
    set('.msg-btn--tg .btn-label',                 t.btnTg);
    set('.msg-btn--wa .btn-label',                 t.btnWa);

    // update active state on switcher buttons
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('lang-btn--active', btn.dataset.lang === lang);
    });
  }

  // ── Build language switcher UI ──────────────
  function buildSwitcher(currentLang) {
    var switcher = document.createElement('div');
    switcher.className = 'lang-switcher';

    var labels = { en: 'EN', ru: 'RU', th: 'TH' };
    Object.keys(labels).forEach(function (code) {
      var btn = document.createElement('button');
      btn.className = 'lang-btn' + (code === currentLang ? ' lang-btn--active' : '');
      btn.dataset.lang = code;
      btn.textContent = labels[code];
      btn.setAttribute('aria-label', 'Switch language to ' + code.toUpperCase());
      btn.addEventListener('click', function () {
        localStorage.setItem('weeden_lang', code);
        applyLang(code);
      });
      switcher.appendChild(btn);
    });

    return switcher;
  }

  // ── Init ────────────────────────────────────
  function init() {
    var lang = detectLang();
    applyLang(lang);

    var switcher = buildSwitcher(lang);
    document.body.insertBefore(switcher, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
