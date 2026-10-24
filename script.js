/**
 * MURUGAN ARUNACHALAM K — V5 STUDIO ENGINE
 * 1. Premium Pearl Ivory & Royal Amethyst-Indigo Theme (Default Light Mode)
 * 2. Warm Animated Welcome Ribbon + Quote of the Day (On load & every link click)
 * 3. Unique Non-Overlay Animated Mascot per HTML page (Rolls eyes with mouse + Nods head up & down on hover/click)
 * 4. Restored Floating Hover Pill on all diagrams & project tiles + Eye-rolling Sig Bot
 * 5. Direct First-Party CORS Live Business & Brand Signals Engine
 */

(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------------------
  // 1. PREMIUM PEARL IVORY & ROYAL AMETHYST-INDIGO THEME
  // ---------------------------------------------------------------------------
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const THEME_KEY = 'mak_luxury_studio_theme_v5';

  function applyPaletteTokens(mode) {
    if (mode === 'dark') {
      root.style.setProperty('--bg-page', '#0F0E17');
      root.style.setProperty('--bg-surface', '#181724');
      root.style.setProperty('--bg-elevated', '#201E2F');
      root.style.setProperty('--text-primary', '#F7F6FA');
      root.style.setProperty('--text-secondary', '#C5C2D4');
      root.style.setProperty('--cobalt', '#818CF8');
      root.style.setProperty('--coral', '#F59E0B');
      root.style.setProperty('--olive', '#34D399');
    } else {
      root.style.setProperty('--bg-page', '#FAF9F6');
      root.style.setProperty('--bg-surface', '#F1EFEA');
      root.style.setProperty('--bg-elevated', '#FFFFFF');
      root.style.setProperty('--text-primary', '#14131A');
      root.style.setProperty('--text-secondary', '#454352');
      root.style.setProperty('--cobalt', '#4338CA');
      root.style.setProperty('--coral', '#B45309');
      root.style.setProperty('--olive', '#047857');
    }
  }

  function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    applyPaletteTokens(mode);
    if (themeLabel) {
      themeLabel.textContent = mode === 'dark' ? 'Velvet' : 'Paper';
    }
  }

  try {
    localStorage.removeItem('mak_studio_theme');
    localStorage.removeItem('mak_portfolio_theme');
    localStorage.removeItem('mak_atelier_theme_v4');
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  } catch (_) {
    setTheme('light');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (_) {}
    });
  }

  // ---------------------------------------------------------------------------
  // 2. WARM ANIMATED WELCOME NOTE + QUOTE OF THE DAY (TOP BANNER & LINK CLICKS)
  // ---------------------------------------------------------------------------
  const QUOTES_OF_THE_DAY = [
    {
      quote: '“People do not buy goods and services. They buy relations, stories, and magic.”',
      author: 'Seth Godin'
    },
    {
      quote: '“The opposite of a good idea can also be a good idea in consumer psychology.”',
      author: 'Rory Sutherland'
    },
    {
      quote: '“The consumer isn’t a moron; she is your wife. Respect her intelligence and evidence.”',
      author: 'David Ogilvy'
    },
    {
      quote: '“Marketing is not the art of finding clever ways to dispose of what you make. It is the art of creating genuine customer value.”',
      author: 'Philip Kotler'
    },
    {
      quote: '“Nothing in life is as important as you think it is, while you are thinking about it—context shapes every choice.”',
      author: 'Daniel Kahneman'
    },
    {
      quote: '“Trust is earned in drops of competence and lost in buckets of performative noise.”',
      author: 'Consumer Research Field Note'
    }
  ];

  function getTimeGreeting() {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good Morning — Welcome to Murugan’s Studio';
    if (hr < 17) return 'Good Afternoon — Welcome to Murugan’s Studio';
    return 'Good Evening — Welcome to Murugan’s Studio';
  }

  let currentQuoteIdx = new Date().getDate() % QUOTES_OF_THE_DAY.length;

  function injectWelcomeQuoteBanner() {
    if (document.getElementById('welcomeQuoteBanner')) return;
    const header = document.querySelector('.site-header');
    if (!header) return;

    const banner = document.createElement('div');
    banner.className = 'welcome-quote-banner';
    banner.id = 'welcomeQuoteBanner';
    const q = QUOTES_OF_THE_DAY[currentQuoteIdx];

    banner.innerHTML =
      '<div class="container welcome-quote-inner">' +
      '  <span class="welcome-greeting-pill">' +
      '    <span class="welcome-wave-hand" aria-hidden="true">👋</span>' +
      '    <span>' +
      getTimeGreeting() +
      '</span>' +
      '  </span>' +
      '  <p class="quote-of-day-text" id="quoteOfTheDayText">' +
      '    <span class="mono-meta" style="margin-right:0.35rem;">QUOTE OF THE DAY:</span>' +
      '    <em>' +
      q.quote +
      '</em>' +
      '    <span class="quote-author-tag">— ' +
      q.author +
      '</span>' +
      '  </p>' +
      '  <button type="button" class="quote-next-btn" id="nextQuoteBtn" aria-label="Inspire me with another quote">✦ Next Quote</button>' +
      '</div>';

    header.parentNode.insertBefore(banner, header);

    const nextBtn = document.getElementById('nextQuoteBtn');
    const quoteTextEl = document.getElementById('quoteOfTheDayText');
    if (nextBtn && quoteTextEl) {
      nextBtn.addEventListener('click', function () {
        currentQuoteIdx = (currentQuoteIdx + 1) % QUOTES_OF_THE_DAY.length;
        const nextQ = QUOTES_OF_THE_DAY[currentQuoteIdx];
        quoteTextEl.style.opacity = '0';
        setTimeout(function () {
          quoteTextEl.innerHTML =
            '<span class="mono-meta" style="margin-right:0.35rem;">QUOTE OF THE DAY:</span>' +
            '<em>' +
            nextQ.quote +
            '</em>' +
            '<span class="quote-author-tag">— ' +
            nextQ.author +
            '</span>';
          quoteTextEl.style.opacity = '1';
        }, 160);
      });
    }
  }

  injectWelcomeQuoteBanner();

  // ---------------------------------------------------------------------------
  // 3. LINK-CLICK TRANSITION EXPERIENCE WITH WARM QUOTE FEEL
  // ---------------------------------------------------------------------------
  const curtain = document.querySelector('.page-transition-curtain');
  let loaderTimeout = null;

  function upgradeCurtainMarkup() {
    if (!curtain) return;
    const q = QUOTES_OF_THE_DAY[currentQuoteIdx];
    curtain.innerHTML =
      '<div class="loader-card">' +
      '  <div class="loader-brand-row">' +
      '    <span class="loader-monogram">M·A·K</span>' +
      '    <span class="mono-meta">WELCOME TO THE NEXT CHAPTER</span>' +
      '  </div>' +
      '  <div class="loader-wave-track" aria-hidden="true">' +
      '    <div class="loader-wave-bar"></div>' +
      '  </div>' +
      '  <span class="curtain-label" id="curtainLabelText">Opening page…</span>' +
      '  <p class="curtain-quote" id="curtainQuoteText">' +
      q.quote +
      ' <span class="quote-author-tag">— ' +
      q.author +
      '</span></p>' +
      '</div>';
  }

  function hideCurtain() {
    if (loaderTimeout) {
      clearTimeout(loaderTimeout);
      loaderTimeout = null;
    }
    if (curtain) curtain.classList.remove('is-active');
  }

  upgradeCurtainMarkup();
  hideCurtain();
  window.addEventListener('pageshow', hideCurtain);
  window.addEventListener('popstate', hideCurtain);

  if (curtain && !prefersReducedMotion) {
    document.querySelectorAll('a[href]').forEach(function (link) {
      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
        return;
      }

      link.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;
        const labelEl = document.getElementById('curtainLabelText');
        const quoteEl = document.getElementById('curtainQuoteText');
        const nextQ = QUOTES_OF_THE_DAY[(currentQuoteIdx + 1) % QUOTES_OF_THE_DAY.length];
        if (labelEl) {
          labelEl.textContent =
            '✨ ' + (link.getAttribute('data-transition-label') || link.textContent.trim());
        }
        if (quoteEl) {
          quoteEl.innerHTML =
            nextQ.quote + ' <span class="quote-author-tag">— ' + nextQ.author + '</span>';
        }
        e.preventDefault();
        curtain.classList.add('is-active');
        loaderTimeout = setTimeout(hideCurtain, 950);
        setTimeout(function () {
          window.location.href = href;
        }, 280);
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 4. UNIQUE IN-PAGE NON-OVERLAY ANIMATED CHARACTER FOR EACH HTML PAGE
  //    Rolls eyes with mouse + Nods head up & down when hovered or clicked!
  // ---------------------------------------------------------------------------
  function getMascotForCurrentPage() {
    const path = (window.location.pathname || '').toLowerCase();

    if (path.includes('research.html')) {
      return {
        role: 'RESEARCH LAB COMPANION · DR. LOGIC',
        name: 'Dr. Logic — The Mediation Analyst',
        speech:
          'Move your mouse to see my optical sensors track you—or click me (or any diagram node below) and watch me nod!',
        svgBody:
          '<rect x="14" y="16" width="36" height="30" rx="8" fill="var(--bg-elevated)" stroke="var(--cobalt)" stroke-width="2.2"/>' +
          '<line x1="22" y1="6" x2="22" y2="16" stroke="var(--cobalt)" stroke-width="2"/>' +
          '<circle cx="22" cy="6" r="3" fill="var(--coral)"/>' +
          '<line x1="42" y1="6" x2="42" y2="16" stroke="var(--cobalt)" stroke-width="2"/>' +
          '<circle cx="42" cy="6" r="3" fill="var(--olive)"/>' +
          '<circle cx="24" cy="29" r="6.5" fill="var(--cobalt-soft)" stroke="var(--cobalt)" stroke-width="1.6"/>' +
          '<circle cx="40" cy="29" r="6.5" fill="var(--cobalt-soft)" stroke="var(--cobalt)" stroke-width="1.6"/>' +
          '<g class="eye-roll-pupil"><circle cx="24" cy="29" r="2.8" fill="var(--cobalt)"/><circle cx="25" cy="28" r="1" fill="#fff"/><circle cx="40" cy="29" r="2.8" fill="var(--cobalt)"/><circle cx="41" cy="28" r="1" fill="#fff"/></g>' +
          '<path d="M 25 40 Q 32 44 39 40" fill="none" stroke="var(--coral)" stroke-width="2" stroke-linecap="round"/>'
      };
    }

    if (path.includes('capabilities.html')) {
      return {
        role: 'TOOLKIT NAVIGATOR · PRISM',
        name: 'Prism — The Analytics & GEO Guide',
        speech:
          'I watch over Murugan’s verified capabilities & certifications. Hover or click me to see me nod in approval!',
        svgBody:
          '<polygon points="32,8 52,22 46,48 18,48 12,22" fill="var(--bg-elevated)" stroke="var(--cobalt)" stroke-width="2.2"/>' +
          '<circle cx="24" cy="30" r="6" fill="var(--bg-page)" stroke="var(--border-strong)" stroke-width="1.6"/>' +
          '<circle cx="40" cy="30" r="6" fill="var(--bg-page)" stroke="var(--border-strong)" stroke-width="1.6"/>' +
          '<g class="eye-roll-pupil"><circle cx="24" cy="30" r="2.8" fill="var(--cobalt)"/><circle cx="25" cy="29" r="1" fill="#fff"/><circle cx="40" cy="30" r="2.8" fill="var(--cobalt)"/><circle cx="41" cy="29" r="1" fill="#fff"/></g>' +
          '<path d="M 27 41 Q 32 45 37 41" fill="none" stroke="var(--olive)" stroke-width="2" stroke-linecap="round"/>'
      };
    }

    if (path.includes('work.html') || path.includes('project-')) {
      return {
        role: 'CASE STUDY ARCHITECT · VEKTOR',
        name: 'Vektor — The Brand Strategy Fox',
        speech:
          'Hover over any project diagram below for the magnetic preview pill—or click me for an enthusiastic head nod!',
        svgBody:
          '<polygon points="14,10 24,22 14,32" fill="var(--coral-soft)" stroke="var(--coral)" stroke-width="2"/>' +
          '<polygon points="50,10 40,22 50,32" fill="var(--coral-soft)" stroke="var(--coral)" stroke-width="2"/>' +
          '<circle cx="32" cy="32" r="16" fill="var(--bg-elevated)" stroke="var(--cobalt)" stroke-width="2.2"/>' +
          '<circle cx="25" cy="30" r="5.8" fill="var(--bg-page)" stroke="var(--border-strong)" stroke-width="1.5"/>' +
          '<circle cx="39" cy="30" r="5.8" fill="var(--bg-page)" stroke="var(--border-strong)" stroke-width="1.5"/>' +
          '<g class="eye-roll-pupil"><circle cx="25" cy="30" r="2.7" fill="var(--text-primary)"/><circle cx="26" cy="29" r="1" fill="#fff"/><circle cx="39" cy="30" r="2.7" fill="var(--text-primary)"/><circle cx="40" cy="29" r="1" fill="#fff"/></g>' +
          '<polygon points="30,38 34,38 32,41" fill="var(--coral)"/>'
      };
    }

    if (path.includes('about.html')) {
      return {
        role: 'STORY ARCHIVIST · LEDGER',
        name: 'Ledger — From Balance Sheets to Brands',
        speech:
          'Connecting B.Com analytical rigor (8.1 CGPA) with MBA consumer insight. Click me to see me nod!',
        svgBody:
          '<polygon points="32,8 52,16 32,23 12,16" fill="var(--cobalt)" stroke="var(--border-strong)" stroke-width="1.5"/>' +
          '<circle cx="32" cy="34" r="15" fill="var(--bg-elevated)" stroke="var(--border-strong)" stroke-width="2"/>' +
          '<circle cx="25" cy="33" r="5.5" fill="var(--bg-page)" stroke="var(--cobalt)" stroke-width="1.6"/>' +
          '<circle cx="39" cy="33" r="5.5" fill="var(--bg-page)" stroke="var(--cobalt)" stroke-width="1.6"/>' +
          '<line x1="30.5" y1="33" x2="33.5" y2="33" stroke="var(--cobalt)" stroke-width="1.6"/>' +
          '<g class="eye-roll-pupil"><circle cx="25" cy="33" r="2.5" fill="var(--cobalt)"/><circle cx="39" cy="33" r="2.5" fill="var(--cobalt)"/></g>' +
          '<path d="M 27 42 Q 32 45 37 42" fill="none" stroke="var(--coral)" stroke-width="2" stroke-linecap="round"/>'
      };
    }

    if (path.includes('contact.html')) {
      return {
        role: 'CONNECTION CONCIERGE · ECHO',
        name: 'Echo — The Direct Signal Carrier',
        speech:
          'Ready to start a conversation with Murugan? Hover or click me—I nod yes to great marketing opportunities!',
        svgBody:
          '<circle cx="32" cy="30" r="16" fill="var(--bg-elevated)" stroke="var(--olive)" stroke-width="2.2"/>' +
          '<path d="M 8 24 Q 14 16 16 28" fill="none" stroke="var(--cobalt)" stroke-width="2" stroke-linecap="round"/>' +
          '<path d="M 56 24 Q 50 16 48 28" fill="none" stroke="var(--cobalt)" stroke-width="2" stroke-linecap="round"/>' +
          '<circle cx="25" cy="28" r="5.5" fill="var(--bg-page)" stroke="var(--border-strong)" stroke-width="1.5"/>' +
          '<circle cx="39" cy="28" r="5.5" fill="var(--bg-page)" stroke="var(--border-strong)" stroke-width="1.5"/>' +
          '<g class="eye-roll-pupil"><circle cx="25" cy="28" r="2.6" fill="var(--olive)"/><circle cx="39" cy="28" r="2.6" fill="var(--olive)"/></g>' +
          '<path d="M 26 37 Q 32 42 38 37" fill="none" stroke="var(--cobalt)" stroke-width="2" stroke-linecap="round"/>'
      };
    }

    // Default Home Page Mascot: Aura the Insight Owl
    return {
      role: 'STUDIO MASCOT · AURA THE INSIGHT OWL',
      name: 'Aura — Consumer Insight Observer',
      speech:
        'Move your cursor and watch my eyes follow the signal—or hover & click me to see me nod my head!',
      svgBody:
        '<path d="M 16 20 L 22 11 L 28 18 Z" fill="var(--cobalt-soft)" stroke="var(--cobalt)" stroke-width="1.8"/>' +
        '<path d="M 48 20 L 42 11 L 36 18 Z" fill="var(--cobalt-soft)" stroke="var(--cobalt)" stroke-width="1.8"/>' +
        '<circle cx="32" cy="32" r="17" fill="var(--bg-elevated)" stroke="var(--cobalt)" stroke-width="2.2"/>' +
        '<circle cx="24.5" cy="30" r="6.8" fill="var(--bg-page)" stroke="var(--coral)" stroke-width="1.8"/>' +
        '<circle cx="39.5" cy="30" r="6.8" fill="var(--bg-page)" stroke="var(--coral)" stroke-width="1.8"/>' +
        '<g class="eye-roll-pupil"><circle cx="24.5" cy="30" r="3.1" fill="var(--text-primary)"/><circle cx="25.5" cy="28.8" r="1.1" fill="#fff"/><circle cx="39.5" cy="30" r="3.1" fill="var(--text-primary)"/><circle cx="40.5" cy="28.8" r="1.1" fill="#fff"/></g>' +
        '<polygon points="30,36 34,36 32,41" fill="var(--coral)"/>'
    };
  }

  function injectPageMascot() {
    if (document.getElementById('pageMascotDock')) return;
    const targetLead =
      document.querySelector('.hero-stage .lead-copy') ||
      document.querySelector('.case-hero .lead-copy') ||
      document.querySelector('main h1');
    if (!targetLead) return;

    const cfg = getMascotForCurrentPage();
    const dock = document.createElement('div');
    dock.className = 'page-mascot-dock';
    dock.id = 'pageMascotDock';
    dock.setAttribute('role', 'button');
    dock.setAttribute('tabindex', '0');
    dock.setAttribute('aria-label', cfg.name + ' interactive character');

    dock.innerHTML =
      '<div class="mascot-svg-frame">' +
      '  <svg viewBox="0 0 64 60" class="mascot-svg" aria-hidden="true">' +
      '    <g class="mascot-head-group" id="pageMascotHead">' +
      cfg.svgBody +
      '    </g>' +
      '  </svg>' +
      '</div>' +
      '<div class="mascot-info-col">' +
      '  <span class="mascot-role-tag">' +
      cfg.role +
      '</span>' +
      '  <strong class="mascot-name-title">' +
      cfg.name +
      '</strong>' +
      '  <span class="mascot-speech-line" id="pageMascotSpeech">' +
      cfg.speech +
      '</span>' +
      '</div>';

    targetLead.parentNode.insertBefore(dock, targetLead.nextSibling);

    function triggerHeadNod() {
      dock.classList.remove('is-nodding');
      void dock.offsetWidth;
      dock.classList.add('is-nodding');
      const speechEl = document.getElementById('pageMascotSpeech');
      if (speechEl) {
        speechEl.textContent =
          '“Yes! Great choice—keep exploring the evidence and visual artifacts below!”';
      }
      setTimeout(function () {
        dock.classList.remove('is-nodding');
      }, 1000);
    }

    dock.addEventListener('mousedown', triggerHeadNod);
    dock.addEventListener('click', triggerHeadNod);
    dock.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerHeadNod();
      }
    });
  }

  injectPageMascot();

  // ---------------------------------------------------------------------------
  // 5. PRE-DEFINED INTERACTIVE CHATBOT ("SIG CONCIERGE") — STARTS MINIMIZED
  //    SO IT NEVER COVERS PAGE CONTENT + DUAL ROLLING EYES & HEAD NODDING
  // ---------------------------------------------------------------------------
  const BOT_RESPONSES = {
    about_murugan: {
      question: 'Who is Murugan?',
      answer:
        'Murugan Arunachalam K is an MBA Candidate in Marketing at Amrita School of Business, Coimbatore (2025–2027) with a B.Com in Accounting & Finance (8.1 CGPA). He specializes in consumer psychology, marketing research, and brand segmentation.',
      links: [
        { label: 'Read Full Story →', url: 'about.html' },
        { label: 'Capabilities →', url: 'capabilities.html' }
      ]
    },
    brl_research: {
      question: 'Explain BRL Research',
      answer:
        'His Term 5 Business Research Lab (BRL) WIP study examines how Chatbot Anthropomorphism influences Situational Consumer Skepticism in e-commerce via a Hybrid Parallel & Serial Mediation Model (Warmth, Competence, Privacy Concerns, and Authenticity across 14 hypotheses).',
      links: [{ label: 'Explore Interactive Model →', url: 'research.html' }]
    },
    top_projects: {
      question: 'Top Case Studies',
      answer:
        'Selected work includes: (1) Gravity Shift Smart Backpack STP & WTP Strategy, (2) Slow Living Brand Qualitative Discovery & 6-Stage Journey Map, (3) Advertising Media Primary Survey (N=100+, Chi-Square & ANOVA), and (4) Pragati PR Cold-Calling Outreach.',
      links: [
        { label: 'All Work Gallery →', url: 'work.html' },
        { label: 'Gravity Shift →', url: 'project-gravity-shift.html' }
      ]
    },
    skills_tools: {
      question: 'Skills & Certifications',
      answer:
        'Certified in IBM/Coursera Generative AI for Digital Marketing (4 courses incl. GEO), HubSpot Digital Marketing, Microsoft Office Specialist (MOS) Excel Associate 2019, and NPTEL Consumer Psychology.',
      links: [{ label: 'View Toolkit & Proof →', url: 'capabilities.html' }]
    },
    contact_info: {
      question: 'Contact & Hire',
      answer:
        'Murugan is open to Marketing Management Trainee, Brand Strategy, Consumer Research, and Digital Marketing roles. Based in Coimbatore and open to relocation.',
      links: [
        { label: 'Open Contact Page →', url: 'contact.html' },
        { label: 'Email Directly ↗', url: 'mailto:muruganarunachalamk@gmail.com' }
      ]
    }
  };

  function injectInteractiveBot() {
    const oldSig = document.getElementById('sigCompanion');
    if (oldSig) oldSig.remove();
    if (document.getElementById('sigChatbotRoot')) return;

    const rootWidget = document.createElement('aside');
    rootWidget.className = 'sig-chatbot-root';
    rootWidget.id = 'sigChatbotRoot';
    rootWidget.setAttribute('aria-label', 'Sig Pre-Defined Portfolio Chatbot');

    // Starts closed (.is-closed) so it never blocks page text until clicked
    rootWidget.innerHTML =
      '<div class="sig-chat-window is-closed" id="sigChatWindow" role="dialog" aria-label="Portfolio Guide Chat">' +
      '  <div class="sig-chat-header">' +
      '    <div class="sig-chat-header-left">' +
      '      <span class="sig-online-dot" aria-hidden="true"></span>' +
      '      <div>' +
      '        <span class="sig-chat-title">SIG · INTERACTIVE BOT</span>' +
      '        <span class="sig-chat-subtitle">Pre-defined portfolio concierge</span>' +
      '      </div>' +
      '    </div>' +
      '    <button type="button" class="sig-chat-close" id="sigChatCloseBtn" aria-label="Minimize chat">MINIMIZE −</button>' +
      '  </div>' +
      '  <div class="sig-chat-messages" id="sigChatMessages" aria-live="polite">' +
      '    <div class="sig-msg sig-msg-bot">' +
      '      Hi! I’m <strong>Sig</strong>, Murugan’s pre-defined portfolio bot. Pick any question below for an instant briefing:' +
      '    </div>' +
      '  </div>' +
      '  <div class="sig-chat-chips-area">' +
      '    <span class="sig-chips-label">Tap a topic to ask:</span>' +
      '    <div class="sig-chips-list">' +
      '      <button type="button" class="sig-chip-btn" data-bot-topic="about_murugan">Who is Murugan?</button>' +
      '      <button type="button" class="sig-chip-btn" data-bot-topic="brl_research">BRL Research Model</button>' +
      '      <button type="button" class="sig-chip-btn" data-bot-topic="top_projects">Top Case Studies</button>' +
      '      <button type="button" class="sig-chip-btn" data-bot-topic="skills_tools">Skills &amp; Certs</button>' +
      '      <button type="button" class="sig-chip-btn" data-bot-topic="contact_info">Contact &amp; Hire</button>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div class="sig-launcher-row">' +
      '  <button type="button" class="sig-launcher-pill" id="sigLauncherPill">Chat with Sig 💬</button>' +
      '  <button type="button" class="sig-avatar-btn" id="sigAvatarBtn" aria-expanded="false" aria-controls="sigChatWindow" aria-label="Toggle interactive portfolio bot">' +
      '    <svg viewBox="0 0 48 48" class="sig-svg" aria-hidden="true">' +
      '      <g class="sig-bot-head">' +
      '        <line x1="24" y1="3" x2="24" y2="10" stroke="var(--cobalt)" stroke-width="2.2" stroke-linecap="round" />' +
      '        <circle cx="24" cy="3" r="3" fill="var(--coral)" />' +
      '        <rect x="8" y="11" width="32" height="26" rx="10" fill="var(--bg-page)" stroke="var(--cobalt)" stroke-width="2.2" />' +
      '        <circle cx="18" cy="23" r="5.2" fill="var(--cobalt-soft)" stroke="var(--cobalt)" stroke-width="1.4" />' +
      '        <circle cx="30" cy="23" r="5.2" fill="var(--cobalt-soft)" stroke="var(--cobalt)" stroke-width="1.4" />' +
      '        <g class="eye-roll-pupil">' +
      '          <circle cx="18" cy="23" r="2.5" fill="var(--cobalt)" />' +
      '          <circle cx="18.8" cy="22" r="0.9" fill="#ffffff" />' +
      '          <circle cx="30" cy="23" r="2.5" fill="var(--cobalt)" />' +
      '          <circle cx="30.8" cy="22" r="0.9" fill="#ffffff" />' +
      '        </g>' +
      '        <path d="M 19 31 Q 24 34 29 31" fill="none" stroke="var(--coral)" stroke-width="2" stroke-linecap="round" />' +
      '      </g>' +
      '    </svg>' +
      '  </button>' +
      '</div>';

    document.body.appendChild(rootWidget);

    const chatWin = document.getElementById('sigChatWindow');
    const closeBtn = document.getElementById('sigChatCloseBtn');
    const avatarBtn = document.getElementById('sigAvatarBtn');
    const launcherPill = document.getElementById('sigLauncherPill');
    const messagesBox = document.getElementById('sigChatMessages');

    function toggleChat(forceOpen) {
      if (!chatWin) return;
      const willOpen =
        typeof forceOpen === 'boolean' ? forceOpen : chatWin.classList.contains('is-closed');
      chatWin.classList.toggle('is-closed', !willOpen);
      if (avatarBtn) {
        avatarBtn.setAttribute('aria-expanded', String(willOpen));
        avatarBtn.classList.remove('is-nodding');
        void avatarBtn.offsetWidth;
        avatarBtn.classList.add('is-nodding');
      }
      if (launcherPill) {
        launcherPill.textContent = willOpen ? 'Hide Guide ×' : 'Chat with Sig 💬';
      }
    }

    if (avatarBtn) avatarBtn.addEventListener('click', function () { toggleChat(); });
    if (launcherPill) launcherPill.addEventListener('click', function () { toggleChat(); });
    if (closeBtn) closeBtn.addEventListener('click', function () { toggleChat(false); });

    rootWidget.querySelectorAll('[data-bot-topic]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        const key = chip.getAttribute('data-bot-topic');
        const entry = BOT_RESPONSES[key];
        if (!entry || !messagesBox) return;

        const userDiv = document.createElement('div');
        userDiv.className = 'sig-msg sig-msg-user';
        userDiv.textContent = entry.question;
        messagesBox.appendChild(userDiv);
        messagesBox.scrollTop = messagesBox.scrollHeight;

        setTimeout(function () {
          const botDiv = document.createElement('div');
          botDiv.className = 'sig-msg sig-msg-bot';
          const linksHtml = (entry.links || [])
            .map(function (l) {
              return '<a href="' + l.url + '" class="sig-inline-link">' + l.label + '</a>';
            })
            .join('');
          botDiv.innerHTML =
            '<div>' + entry.answer + '</div>' +
            (linksHtml ? '<div class="sig-msg-actions">' + linksHtml + '</div>' : '');
          messagesBox.appendChild(botDiv);
          messagesBox.scrollTop = messagesBox.scrollHeight;
        }, 180);
      });
    });
  }

  injectInteractiveBot();

  // ---------------------------------------------------------------------------
  // 6. GLOBAL EYE-ROLLING TRACKER FOR ALL CHARACTERS ON SCREEN
  // ---------------------------------------------------------------------------
  if (!prefersReducedMotion) {
    window.addEventListener(
      'mousemove',
      function (e) {
        document.querySelectorAll('.eye-roll-pupil').forEach(function (pupilGroup) {
          const rect = pupilGroup.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) return;
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const angle = Math.atan2(dy, dx);
          const dist = Math.min(2.8, Math.hypot(dx, dy) / 70);
          const tx = (Math.cos(angle) * dist).toFixed(2);
          const ty = (Math.sin(angle) * dist).toFixed(2);
          pupilGroup.style.transform = 'translate(' + tx + 'px, ' + ty + 'px)';
        });
      },
      { passive: true }
    );
  }

  // ---------------------------------------------------------------------------
  // 7. RESTORED FLOATING HOVER PILL OVER ALL DIAGRAMS & PROJECT TILES
  // ---------------------------------------------------------------------------
  let cursorPill = document.getElementById('cursorPill');
  if (!cursorPill) {
    cursorPill = document.createElement('div');
    cursorPill.className = 'cursor-pill';
    cursorPill.id = 'cursorPill';
    cursorPill.setAttribute('aria-hidden', 'true');
    cursorPill.textContent = 'OPEN STUDY →';
    document.body.appendChild(cursorPill);
  }

  // Attach hover label to all project tiles, diagram boxes, and BRL nodes
  document.querySelectorAll('.model-node').forEach(function (node) {
    if (!node.getAttribute('data-cursor-text')) {
      node.setAttribute('data-cursor-text', 'CLICK TO INSPECT CONSTRUCT ✦');
    }
  });
  document.querySelectorAll('.signal-stage').forEach(function (stage) {
    if (!stage.getAttribute('data-cursor-text')) {
      stage.setAttribute('data-cursor-text', 'INTERACTIVE SIGNAL DECODER ✦');
    }
  });

  const hoverTargets = document.querySelectorAll('[data-cursor-text]');
  if (cursorPill && hoverTargets.length > 0 && !prefersReducedMotion) {
    window.addEventListener(
      'mousemove',
      function (e) {
        cursorPill.style.left = e.clientX + 'px';
        cursorPill.style.top = e.clientY + 'px';
      },
      { passive: true }
    );

    hoverTargets.forEach(function (target) {
      target.addEventListener('mouseenter', function () {
        cursorPill.textContent = target.getAttribute('data-cursor-text') || 'EXPLORE →';
        cursorPill.classList.add('is-visible');
      });
      target.addEventListener('mouseleave', function () {
        cursorPill.classList.remove('is-visible');
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 8. SCROLL REVEALS, MOBILE MENU & WORK FILTERS
  // ---------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', function () {
      const open = primaryNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? 'CLOSE ×' : 'MENU +';
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length > 0 && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const obs = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealItems.forEach(function (el) {
      obs.observe(el);
    });
  } else {
    revealItems.forEach(function (el) {
      el.classList.add('is-inview');
    });
  }

  const filterBtns = document.querySelectorAll('[data-filter]');
  const projectTiles = document.querySelectorAll('.project-tile[data-category]');
  if (filterBtns.length > 0 && projectTiles.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter') || 'all';
        filterBtns.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        projectTiles.forEach(function (tile) {
          const cats = (tile.getAttribute('data-category') || '').split(/\s+/);
          if (filter === 'all' || cats.includes(filter)) tile.removeAttribute('hidden');
          else tile.setAttribute('hidden', '');
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 9. BRL CONCEPTUAL DIAGRAM INTERACTIVE INSPECTOR
  // ---------------------------------------------------------------------------
  const lensBtns = document.querySelectorAll('[data-model-lens]');
  const modelElements = document.querySelectorAll('[data-pathway]');
  const selectableNodes = document.querySelectorAll('.model-node[data-node-id]');
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorDesc = document.getElementById('inspectorDesc');
  const inspectorBadge = document.getElementById('inspectorBadge');

  const LENS_DATA = {
    all: {
      title: 'Full Proposed Hybrid Parallel & Serial Mediation Model (14 Hypotheses)',
      desc: 'Proposed Term 5 BRL conceptual model (pre-data collection). Solid arrows denote direct or replicated literature support (H1b, H1c, H1d, H3, H2a–c). Dashed arrows highlight cue-dependent (H1a), untested (H2d), or exploratory residual paths.',
      badge: 'PROPOSED WIP ARCHITECTURE'
    },
    h1: {
      title: 'First-Stage Direct Hypotheses (H1a – H1d): Chatbot Anthropomorphism → 4 Mediators',
      desc: 'H1b (→ Competence, +) is the strongest first-stage relationship across a 108-study meta-analysis (Blut et al., 2021). H1a (→ Warmth, +) is mixed/cue-dependent; H1c (→ Privacy Concerns, +) captures data-tracking anxiety; H1d (→ Authenticity, +) is moderate.',
      badge: 'RQ1 · FIRST STAGE'
    },
    serial: {
      title: 'Serial Mediation Pathway (H3 & H4e): Anthropomorphism → Competence → Authenticity → Skepticism',
      desc: 'Grounded in Social Response Theory and replicated experiments (Nguyen et al., 2023): consumers must first judge the chatbot functionally competent (H3, +) before reading its human-like persona as authentic rather than performative.',
      badge: 'RQ3 & RQ4 · SERIAL CHAIN'
    },
    h2: {
      title: 'Second-Stage Effects (H2a – H2d): 4 Mediators → Situational Consumer Skepticism',
      desc: 'Perceived Warmth (H2a, −) and Competence (H2b, −) are hypothesised to reduce active doubt, while Privacy Concerns (H2c, +) increase it. Authenticity → Situational Skepticism (H2d, −, dashed) is the primary untested empirical link.',
      badge: 'RQ2 · SECOND STAGE'
    },
    exploratory: {
      title: 'Exploratory Direct Path: Chatbot Anthropomorphism → Situational Consumer Skepticism',
      desc: 'Tested without a directional hypothesis (RQ5) to evaluate whether human-like design cues still influence situational consumer skepticism once all four mediators are accounted for in the structural equation model.',
      badge: 'RQ5 · RESIDUAL DIRECT TEST'
    }
  };

  const NODE_DATA = {
    iv: {
      title: 'Independent Variable (IV): Chatbot Anthropomorphism',
      desc: 'Definition (Sec. 8): Degree to which consumers perceive the support chatbot as possessing human-like visual, identity, or conversational cues. Theoretical basis: CASA. Manipulation check (Sec. 15F): 3 items adapted from Aggarwal & McGill (2007).',
      badge: 'IV · CASA PARADIGM'
    },
    m1: {
      title: 'Mediator 1 (M1): Perceived Warmth (Parallel Pathway H4a)',
      desc: 'Definition (Sec. 8): Perception that the chatbot is friendly, sincere, caring, and motivated by benevolent intent. Theoretical basis: Stereotype Content Model (SCM). Working scale (Sec. 15G): 4 items adapted from Xu, Leung & Yan (2013). Connected via H1a (+, mixed) and H2a (−).',
      badge: 'MEDIATOR 1 · SCM'
    },
    m2: {
      title: 'Mediator 2 (M2): Perceived Competence (Parallel H4b & Serial Anchor H3/H4e)',
      desc: 'Definition (Sec. 8): Perception that the chatbot is knowledgeable, capable, efficient, and able to resolve the issue. Theoretical basis: SCM. Connected via H1b (+, strong), H2b (−), and H3 (+, strong serial predictor of Perceived Authenticity).',
      badge: 'MEDIATOR 2 · SCM & SERIAL'
    },
    m4: {
      title: 'Mediator 4 (M4): Perceived Authenticity (Parallel H4d & Serial Receiver H3/H4e)',
      desc: 'Definition (Sec. 8): Degree to which the chatbot’s human-like presentation feels genuine and natural rather than performative. Theoretical basis: Social Response Theory. Predicted directly by IV (H1d, +) and serially by Competence (H3, +); predicts Skepticism via H2d (−, to test).',
      badge: 'MEDIATOR 4 · SOCIAL RESPONSE'
    },
    m3: {
      title: 'Mediator 3 (M3): Privacy Concerns (Risk-Appraisal Parallel Pathway H4c)',
      desc: 'Definition (Sec. 8): Apprehension that the chatbot or firm may collect, store, monitor, or misuse personal or transactional data. Theoretical basis: Privacy Calculus. Connected via H1c (+) and H2c (+), creating a positive indirect effect on skepticism.',
      badge: 'MEDIATOR 3 · PRIVACY CALCULUS'
    },
    dv: {
      title: 'Dependent Variable (DV): Situational Consumer Skepticism',
      desc: 'Definition (Sec. 8): State-like, interaction-specific active doubt about the chatbot’s genuine intent to help, its capability, and the firm’s cost-cutting motives (distinct from trait cynicism or low trust). Theoretical basis: Persuasion Knowledge Model (PKM).',
      badge: 'DV · PERSUASION KNOWLEDGE'
    }
  };

  if (lensBtns.length > 0 && modelElements.length > 0) {
    lensBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const lensKey = btn.getAttribute('data-model-lens') || 'all';
        selectableNodes.forEach(function (n) { n.classList.remove('is-selected'); });
        lensBtns.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        modelElements.forEach(function (el) {
          const pathways = (el.getAttribute('data-pathway') || '').split(/\s+/);
          if (lensKey === 'all' || pathways.includes(lensKey)) {
            el.classList.remove('model-dimmed');
            el.classList.add('model-highlighted');
          } else {
            el.classList.add('model-dimmed');
            el.classList.remove('model-highlighted');
          }
        });
        const info = LENS_DATA[lensKey] || LENS_DATA.all;
        if (inspectorTitle) inspectorTitle.textContent = info.title;
        if (inspectorDesc) inspectorDesc.textContent = info.desc;
        if (inspectorBadge) inspectorBadge.textContent = info.badge;
      });
    });

    selectableNodes.forEach(function (node) {
      node.addEventListener('click', function () {
        const nodeId = node.getAttribute('data-node-id');
        const data = NODE_DATA[nodeId];
        if (!data) return;
        lensBtns.forEach(function (b) { b.classList.remove('is-active'); });
        selectableNodes.forEach(function (n) { n.classList.toggle('is-selected', n === node); });
        modelElements.forEach(function (el) {
          const pathways = (el.getAttribute('data-pathway') || '').split(/\s+/);
          if (pathways.includes(nodeId)) {
            el.classList.remove('model-dimmed');
            el.classList.add('model-highlighted');
          } else {
            el.classList.add('model-dimmed');
            el.classList.remove('model-highlighted');
          }
        });
        if (inspectorTitle) inspectorTitle.textContent = data.title;
        if (inspectorDesc) inspectorDesc.textContent = data.desc;
        if (inspectorBadge) inspectorBadge.textContent = data.badge;
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 10. DIRECT FIRST-PARTY CORS LIVE NEWS ENGINE
  // ---------------------------------------------------------------------------
  const signalsGrid = document.getElementById('signalsGrid');
  const signalsStatusText = document.getElementById('signalsStatusText');
  const signalsStatusDot = document.getElementById('signalsStatusDot');
  const refreshSignalsBtn = document.getElementById('refreshSignalsBtn');

  const SIGNAL_TOPICS = {
    brand_india: {
      label: 'Brand Strategy & Advertising',
      badge: 'BRAND & AD STRATEGY',
      algoliaQuery: 'brand strategy advertising marketing campaign',
      devtoTag: 'marketing'
    },
    consumer_retail: {
      label: 'Consumer Behaviour & Retail E-Commerce',
      badge: 'CONSUMER & RETAIL',
      algoliaQuery: 'e-commerce retail consumer brand shopping',
      devtoTag: 'business'
    },
    ai_marketing: {
      label: 'Digital Marketing, AI & Customer Experience',
      badge: 'MARTECH & AI CX',
      algoliaQuery: 'AI chatbot customer support digital marketing SEO',
      devtoTag: 'ai'
    }
  };

  function extractDomain(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch (_) {
      return 'Original Publisher';
    }
  }

  function formatDate(isoOrDate) {
    if (!isoOrDate) return 'Recent';
    const d = new Date(isoOrDate);
    if (isNaN(d.getTime())) return 'Recent';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  async function fetchDirectLiveStories(topicConfig) {
    try {
      const algoliaUrl =
        'https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=15&query=' +
        encodeURIComponent(topicConfig.algoliaQuery);
      const res = await fetch(algoliaUrl);
      if (res.ok) {
        const data = await res.json();
        const validHits = (data.hits || []).filter(function (h) {
          return h.title && h.url && h.title.length > 22;
        });
        if (validHits.length >= 4) {
          return validHits.slice(0, 6).map(function (h) {
            const domain = extractDomain(h.url);
            return {
              title: h.title,
              url: h.url,
              publisher: domain,
              date: formatDate(h.created_at),
              summary:
                'Published on ' +
                domain +
                ' · Live business & strategy dispatch tracked via global media index.'
            };
          });
        }
      }
    } catch (_) {}

    const devUrl =
      'https://dev.to/api/articles?per_page=6&tag=' + encodeURIComponent(topicConfig.devtoTag);
    const res2 = await fetch(devUrl);
    if (res2.ok) {
      const articles = await res2.json();
      if (Array.isArray(articles) && articles.length > 0) {
        return articles.slice(0, 6).map(function (a) {
          return {
            title: a.title,
            url: a.url,
            publisher: (a.user && a.user.name) || 'Editorial Dispatch',
            date: formatDate(a.published_at),
            summary: a.description || 'Read full article and strategic breakdown.'
          };
        });
      }
    }
    throw new Error('Offline');
  }

  async function loadSignalsByKey(topicKey) {
    if (!signalsGrid) return;
    const cfg = SIGNAL_TOPICS[topicKey] || SIGNAL_TOPICS.brand_india;
    if (signalsStatusText) {
      signalsStatusText.textContent = 'Fetching live stories for ' + cfg.label + '…';
    }
    try {
      const stories = await fetchDirectLiveStories(cfg);
      if (signalsStatusDot) signalsStatusDot.className = 'status-dot-live';
      if (signalsStatusText) {
        signalsStatusText.textContent =
          'Live feed connected · ' + cfg.label + ' (' + stories.length + ' verified stories)';
      }
      signalsGrid.innerHTML = stories
        .map(function (s) {
          return (
            '<article class="signal-news-card">' +
            '  <div>' +
            '    <div class="signal-news-meta">' +
            '      <span class="badge badge-cobalt">' +
            cfg.badge +
            '</span>' +
            '      <span class="mono-meta">' +
            s.publisher +
            ' · ' +
            s.date +
            '</span>' +
            '    </div>' +
            '    <h3 class="signal-news-title"><a href="' +
            s.url +
            '" target="_blank" rel="noopener noreferrer">' +
            s.title +
            '</a></h3>' +
            '    <p class="signal-news-summary">' +
            s.summary +
            '</p>' +
            '  </div>' +
            '  <div class="signal-news-footer">' +
            '    <a href="' +
            s.url +
            '" target="_blank" rel="noopener noreferrer" class="btn-minimal">Read original story ↗</a>' +
            '    <span class="mono-meta">' +
            s.publisher +
            '</span>' +
            '  </div>' +
            '</article>'
          );
        })
        .join('');
    } catch (_) {
      if (signalsStatusDot) signalsStatusDot.className = 'status-dot-offline';
      if (signalsStatusText) signalsStatusText.textContent = 'Offline mode';
    }
  }

  if (signalsGrid) {
    const allTopicBtns = document.querySelectorAll('[data-signal-topic], [data-feed-url]');
    const keys = ['brand_india', 'consumer_retail', 'ai_marketing'];
    let activeKey = 'brand_india';
    allTopicBtns.forEach(function (btn, idx) {
      const assignedKey = btn.getAttribute('data-signal-topic') || keys[idx] || 'brand_india';
      btn.addEventListener('click', function () {
        allTopicBtns.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        activeKey = assignedKey;
        loadSignalsByKey(activeKey);
      });
    });
    if (refreshSignalsBtn) {
      refreshSignalsBtn.addEventListener('click', function () {
        loadSignalsByKey(activeKey);
      });
    }
    loadSignalsByKey(activeKey);
  }
})();
