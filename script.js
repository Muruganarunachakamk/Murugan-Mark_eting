/**
 * MURUGAN ARUNACHALAM K — UPGRADED STUDIO MOTION, "SIG" COMPANION,
 * FAIL-SAFE CREATIVE SIGNAL LOADER, LIVE RSS BRAND SIGNALS & BRL MODEL ENGINE
 */

(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------------------
  // 1. THEME PERSISTENCE (WARM ARCHIVAL PAPER vs. OBSIDIAN INK)
  // ---------------------------------------------------------------------------
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const THEME_KEY = 'mak_studio_theme';

  function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    if (themeLabel) {
      themeLabel.textContent = mode === 'dark' ? 'Ink' : 'Paper';
    }
  }

  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  } catch (_) {}

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
  // 2. MOBILE NAVIGATION DRAWER
  // ---------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', function () {
      const open = primaryNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? 'CLOSE ×' : 'MENU +';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = 'MENU +';
        menuToggle.focus();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 3. CREATIVE SIGNAL LOADING EXPERIENCE (FAIL-SAFE & BACK/FORWARD SAFE)
  // ---------------------------------------------------------------------------
  const curtain = document.querySelector('.page-transition-curtain');
  let loaderTimeout = null;

  function upgradeCurtainMarkup() {
    if (!curtain || curtain.querySelector('.loader-card')) return;
    const initialText =
      (curtain.querySelector('.curtain-label') &&
        curtain.querySelector('.curtain-label').textContent) ||
      'Following the signal…';
    curtain.innerHTML =
      '<div class="loader-card">' +
      '  <div class="loader-brand-row">' +
      '    <span class="loader-monogram">M·A·K</span>' +
      '    <span class="mono-meta">SIGNAL STUDIO</span>' +
      '  </div>' +
      '  <div class="loader-wave-track" aria-hidden="true">' +
      '    <div class="loader-wave-bar"></div>' +
      '  </div>' +
      '  <span class="curtain-label">' +
      initialText +
      '</span>' +
      '</div>';
  }

  function hideCurtain() {
    if (loaderTimeout) {
      clearTimeout(loaderTimeout);
      loaderTimeout = null;
    }
    if (curtain) {
      curtain.classList.remove('is-active');
    }
  }

  upgradeCurtainMarkup();
  hideCurtain();

  // Always clear loader on history traversal or tab restore
  window.addEventListener('pageshow', hideCurtain);
  window.addEventListener('popstate', hideCurtain);
  document.addEventListener('DOMContentLoaded', hideCurtain);

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

        const labelEl = curtain.querySelector('.curtain-label');
        const rawLabel = link.getAttribute('data-transition-label') || link.textContent.trim();
        let contextualMsg = 'Following the signal…';

        if (/research|brl/i.test(href + ' ' + rawLabel)) {
          contextualMsg = 'Opening the BRL conceptual research model…';
        } else if (/work|gravity|slow|ad-media|pragati/i.test(href + ' ' + rawLabel)) {
          contextualMsg = 'Exploring selected case studies…';
        } else if (/capabilities/i.test(href)) {
          contextualMsg = 'Loading capabilities & verified credentials…';
        } else if (/about/i.test(href)) {
          contextualMsg = 'Tracing the B.Com → MBA journey…';
        } else if (/contact/i.test(href)) {
          contextualMsg = 'Opening direct communication channel…';
        }

        if (labelEl) labelEl.textContent = contextualMsg;
        e.preventDefault();
        curtain.classList.add('is-active');

        // Fail-safe so the user is never stuck on the loader
        loaderTimeout = setTimeout(hideCurtain, 900);

        setTimeout(function () {
          window.location.href = href;
        }, 170);
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 4. "SIG" — ORIGINAL ANIMATED SVG FIELD-NOTE COMPANION
  // ---------------------------------------------------------------------------
  const BUBBLE_STATE_KEY = 'mak_sig_minimized';

  function getPageContextMessage() {
    const path = (window.location.pathname || '').toLowerCase();
    if (path.includes('research.html')) {
      return 'This diagram shows Murugan’s proposed Term 5 BRL conceptual model. Click any construct node or pathway button to inspect its theoretical basis!';
    }
    if (path.includes('work.html')) {
      return 'Filter by Consumer Research, Brand Strategy, or Outreach—or click any visual cover to open the full 7-step case study.';
    }
    if (path.includes('project-gravity-shift')) {
      return 'Field Note: Segmenting by physical load duration rather than age isolated Urban Commuter Professionals as the highest-WTP launch target.';
    }
    if (path.includes('project-slow-living')) {
      return 'Field Note: Stage 03 (Consideration) was where wellness aspirations met weekday reality—so we designed around 5-minute rituals.';
    }
    if (path.includes('project-ad-media')) {
      return 'Field Note: Surveyed 100+ consumers and applied Chi-Square (χ²) and One-Way ANOVA in Excel to test media influence.';
    }
    if (path.includes('project-pragati')) {
      return 'Field Note: Outbound cold-calling for Pragati tests value propositions live in under ten seconds.';
    }
    if (path.includes('capabilities.html')) {
      return 'No invented percentage bars here—every tool and research method is paired with verified coursework or primary project evidence.';
    }
    if (path.includes('about.html')) {
      return 'Murugan pairs a B.Com in Accounting & Finance (8.1 CGPA) with MBA Marketing research at Amrita School of Business.';
    }
    if (path.includes('contact.html')) {
      return 'Ready to connect about marketing roles or research? Use one-click email copy or visit LinkedIn.';
    }
    return 'Hi, I’m Sig—your field-journal guide. Explore Murugan’s BRL research model, case studies, or live Brand & Business Signals below.';
  }

  function injectSigCompanion() {
    if (document.getElementById('sigCompanion')) return;

    const wrapper = document.createElement('aside');
    wrapper.className = 'sig-companion';
    wrapper.id = 'sigCompanion';
    wrapper.setAttribute('aria-label', 'Sig Portfolio Guide');

    let isMinimized = false;
    try {
      isMinimized = sessionStorage.getItem(BUBBLE_STATE_KEY) === '1';
    } catch (_) {}

    wrapper.innerHTML =
      '<div class="sig-bubble' +
      (isMinimized ? ' is-hidden' : '') +
      '" id="sigBubble" role="status" aria-live="polite">' +
      '  <div class="sig-bubble-header">' +
      '    <span class="sig-name">SIG · FIELD GUIDE</span>' +
      '    <button type="button" class="sig-close" id="sigCloseBtn" aria-label="Minimize guide note">×</button>' +
      '  </div>' +
      '  <p id="sigMessage">' +
      getPageContextMessage() +
      '</p>' +
      '</div>' +
      '<button type="button" class="sig-avatar-btn" id="sigAvatarBtn" aria-label="Toggle Sig field guide">' +
      '  <svg viewBox="0 0 48 48" class="sig-svg" aria-hidden="true">' +
      '    <g class="sig-float-group">' +
      '      <line x1="24" y1="4" x2="24" y2="11" stroke="var(--border-strong)" stroke-width="2" stroke-linecap="round" />' +
      '      <circle cx="24" cy="4" r="3" fill="var(--cobalt)" class="sig-antenna-dot" />' +
      '      <circle cx="24" cy="25" r="14" fill="var(--bg-page)" stroke="var(--border-strong)" stroke-width="2.2" />' +
      '      <circle cx="24" cy="25" r="9.5" fill="var(--cobalt-soft)" stroke="var(--cobalt)" stroke-width="1.5" />' +
      '      <g id="sigPupilGroup">' +
      '        <circle cx="24" cy="25" r="4.2" fill="var(--cobalt)" />' +
      '        <circle cx="25.5" cy="23.5" r="1.4" fill="#ffffff" />' +
      '      </g>' +
      '      <path d="M 18 40 L 24 45 L 30 40" fill="none" stroke="var(--coral)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />' +
      '    </g>' +
      '  </svg>' +
      '</button>';

    document.body.appendChild(wrapper);

    const bubble = document.getElementById('sigBubble');
    const closeBtn = document.getElementById('sigCloseBtn');
    const avatarBtn = document.getElementById('sigAvatarBtn');
    const pupilGroup = document.getElementById('sigPupilGroup');

    if (closeBtn && bubble) {
      closeBtn.addEventListener('click', function () {
        bubble.classList.add('is-hidden');
        try {
          sessionStorage.setItem(BUBBLE_STATE_KEY, '1');
        } catch (_) {}
      });
    }

    if (avatarBtn && bubble) {
      avatarBtn.addEventListener('click', function () {
        const nowHidden = bubble.classList.toggle('is-hidden');
        try {
          sessionStorage.setItem(BUBBLE_STATE_KEY, nowHidden ? '1' : '0');
        } catch (_) {}
      });
    }

    // Subtle eye-tracking toward pointer on desktop (low-cost transform)
    if (pupilGroup && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener(
        'mousemove',
        function (e) {
          const rect = avatarBtn.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const angle = Math.atan2(dy, dx);
          const dist = Math.min(3.2, Math.hypot(dx, dy) / 90);
          const tx = Math.cos(angle) * dist;
          const ty = Math.sin(angle) * dist;
          pupilGroup.style.transform = 'translate(' + tx.toFixed(2) + 'px, ' + ty.toFixed(2) + 'px)';
        },
        { passive: true }
      );
    }
  }

  function updateSigMessage(text) {
    const msgEl = document.getElementById('sigMessage');
    const bubble = document.getElementById('sigBubble');
    if (msgEl && text) {
      msgEl.textContent = text;
    }
    if (bubble && bubble.classList.contains('is-hidden')) {
      bubble.classList.remove('is-hidden');
    }
  }

  injectSigCompanion();

  // ---------------------------------------------------------------------------
  // 5. SCROLL-TRIGGERED REVEALS
  // ---------------------------------------------------------------------------
  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length > 0) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach(function (el) {
        el.classList.add('is-inview');
      });
    } else {
      const observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-inview');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
      );
      revealItems.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 6. CURSOR-FOLLOWING PILL FOR PROJECT TILES (DESKTOP)
  // ---------------------------------------------------------------------------
  const cursorPill = document.getElementById('cursorPill');
  const hoverTiles = document.querySelectorAll('[data-cursor-text]');

  if (cursorPill && hoverTiles.length > 0 && !prefersReducedMotion) {
    window.addEventListener(
      'mousemove',
      function (e) {
        cursorPill.style.left = e.clientX + 'px';
        cursorPill.style.top = e.clientY + 'px';
      },
      { passive: true }
    );

    hoverTiles.forEach(function (tile) {
      tile.addEventListener('mouseenter', function () {
        cursorPill.textContent = tile.getAttribute('data-cursor-text') || 'OPEN STUDY →';
        cursorPill.classList.add('is-visible');
      });
      tile.addEventListener('mouseleave', function () {
        cursorPill.classList.remove('is-visible');
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 7. WORK GALLERY CATEGORY FILTERING
  // ---------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('[data-filter]');
  const projectTiles = document.querySelectorAll('.project-tile[data-category]');

  if (filterBtns.length > 0 && projectTiles.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter') || 'all';
        filterBtns.forEach(function (b) {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });

        let visibleCount = 0;
        projectTiles.forEach(function (tile) {
          const cats = (tile.getAttribute('data-category') || '').split(/\s+/);
          if (filter === 'all' || cats.includes(filter)) {
            tile.removeAttribute('hidden');
            visibleCount++;
          } else {
            tile.setAttribute('hidden', '');
          }
        });

        updateSigMessage(
          'Showing ' +
            visibleCount +
            ' study(s) under "' +
            btn.textContent.trim() +
            '". Click any tile to inspect the full methodology.'
        );
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 8. UPGRADED BRL RESEARCH MODEL INTERACTIVE ENGINE (PATHWAYS + NODES)
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
      badge: 'IV · CASA PARADIGM',
      matchPathways: ['iv', 'h1', 'serial', 'exploratory']
    },
    m1: {
      title: 'Mediator 1 (M1): Perceived Warmth (Parallel Pathway H4a)',
      desc: 'Definition (Sec. 8): Perception that the chatbot is friendly, sincere, caring, and motivated by benevolent intent. Theoretical basis: Stereotype Content Model (SCM). Working scale (Sec. 15G): 4 items adapted from Xu, Leung & Yan (2013). Connected via H1a (+, mixed) and H2a (−).',
      badge: 'MEDIATOR 1 · SCM',
      matchPathways: ['m1']
    },
    m2: {
      title: 'Mediator 2 (M2): Perceived Competence (Parallel H4b & Serial Anchor H3/H4e)',
      desc: 'Definition (Sec. 8): Perception that the chatbot is knowledgeable, capable, efficient, and able to resolve the issue. Theoretical basis: SCM. Connected via H1b (+, strong), H2b (−), and H3 (+, strong serial predictor of Perceived Authenticity).',
      badge: 'MEDIATOR 2 · SCM & SERIAL',
      matchPathways: ['m2', 'serial']
    },
    m4: {
      title: 'Mediator 4 (M4): Perceived Authenticity (Parallel H4d & Serial Receiver H3/H4e)',
      desc: 'Definition (Sec. 8): Degree to which the chatbot’s human-like presentation feels genuine and natural rather than performative. Theoretical basis: Social Response Theory. Predicted directly by IV (H1d, +) and serially by Competence (H3, +); predicts Skepticism via H2d (−, to test).',
      badge: 'MEDIATOR 4 · SOCIAL RESPONSE',
      matchPathways: ['m4', 'serial']
    },
    m3: {
      title: 'Mediator 3 (M3): Privacy Concerns (Risk-Appraisal Parallel Pathway H4c)',
      desc: 'Definition (Sec. 8): Apprehension that the chatbot or firm may collect, store, monitor, or misuse personal or transactional data. Theoretical basis: Privacy Calculus. Connected via H1c (+) and H2c (+), creating a positive indirect effect on skepticism.',
      badge: 'MEDIATOR 3 · PRIVACY CALCULUS',
      matchPathways: ['m3']
    },
    dv: {
      title: 'Dependent Variable (DV): Situational Consumer Skepticism',
      desc: 'Definition (Sec. 8): State-like, interaction-specific active doubt about the chatbot’s genuine intent to help, its capability, and the firm’s cost-cutting motives (distinct from trait cynicism or low trust). Theoretical basis: Persuasion Knowledge Model (PKM).',
      badge: 'DV · PERSUASION KNOWLEDGE',
      matchPathways: ['dv', 'h2', 'serial', 'exploratory']
    }
  };

  function activateModelLens(lensKey) {
    selectableNodes.forEach(function (n) {
      n.classList.remove('is-selected');
    });
    lensBtns.forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-model-lens') === lensKey);
    });

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
  }

  function activateNodeInspection(nodeId, nodeEl) {
    const data = NODE_DATA[nodeId];
    if (!data) return;

    lensBtns.forEach(function (b) {
      b.classList.remove('is-active');
    });
    selectableNodes.forEach(function (n) {
      n.classList.toggle('is-selected', n === nodeEl);
    });

    modelElements.forEach(function (el) {
      const pathways = (el.getAttribute('data-pathway') || '').split(/\s+/);
      const isMatch = pathways.includes(nodeId);
      if (isMatch) {
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
    updateSigMessage(data.title + ' — ' + data.desc);
  }

  if (lensBtns.length > 0 && modelElements.length > 0) {
    lensBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const lens = btn.getAttribute('data-model-lens') || 'all';
        activateModelLens(lens);
      });
    });

    selectableNodes.forEach(function (node) {
      node.addEventListener('click', function () {
        const nodeId = node.getAttribute('data-node-id');
        activateNodeInspection(nodeId, node);
      });
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const nodeId = node.getAttribute('data-node-id');
          activateNodeInspection(nodeId, node);
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 9. "BRAND & BUSINESS SIGNALS" — LIVE KEYLESS RSS FEED INTEGRATION
  // ---------------------------------------------------------------------------
  const signalsGrid = document.getElementById('signalsGrid');
  const signalsStatusText = document.getElementById('signalsStatusText');
  const signalsStatusDot = document.getElementById('signalsStatusDot');
  const refreshSignalsBtn = document.getElementById('refreshSignalsBtn');
  const signalsCategoryBtns = document.querySelectorAll('[data-Feed-url]');

  const DEFAULT_RSS_URL =
    'https://economictimes.indiatimes.com/industry/services/advertising/rssfeeds/13357212.cms';

  function stripHtml(raw) {
    const doc = new DOMParser().parseFromString(raw || '', 'text/html');
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function formatPubDate(dateStr) {
    if (!dateStr) return 'Recent';
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return dateStr.slice(0, 16);
    return parsed.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function renderFallbackPortals(reasonMsg) {
    if (!signalsGrid) return;
    if (signalsStatusText) {
      signalsStatusText.textContent =
        reasonMsg ||
        'Live RSS proxy unreachable or offline — showing verified direct publisher portals';
    }
    if (signalsStatusDot) {
      signalsStatusDot.className = 'status-dot-offline';
    }

    const portals = [
      {
        category: 'BRAND STRATEGY · INDIA',
        publisher: 'ET BrandEquity',
        title: 'Economic Times BrandEquity — Advertising, Marketing & Consumer Insights',
        summary:
          'Direct editorial coverage of Indian brand repositioning, agency campaigns, CMO appointments, and retail consumer shifts.',
        url: 'https://brandequity.economictimes.indiatimes.com/'
      },
      {
        category: 'ADVERTISING & DIGITAL MEDIA',
        publisher: 'afaqs!',
        title: 'afaqs! — Indian Advertising, Media & Digital Marketing Dispatches',
        summary:
          'Daily reporting on brand launches, D2C consumer goods, digital media spend, and creative campaign case notes.',
        url: 'https://www.afaqs.com/'
      },
      {
        category: 'GLOBAL MARKETING & AI',
        publisher: 'Marketing Dive',
        title: 'Marketing Dive — Martech, Consumer Psychology & AI Customer Experience',
        summary:
          'Analysis of generative AI in marketing, loyalty mechanics, retail e-commerce, and brand strategy.',
        url: 'https://www.marketingdive.com/'
      },
      {
        category: 'MANAGEMENT & CONSUMER RESEARCH',
        publisher: 'Harvard Business Review',
        title: 'Harvard Business Review — Marketing & Customer Strategy Archive',
        summary:
          'Research-backed essays on customer journey design, pricing psychology, and behavioral decision science.',
        url: 'https://hbr.org/topic/subject/marketing'
      }
    ];

    signalsGrid.innerHTML = portals
      .map(function (p) {
        return (
          '<article class="signal-news-card">' +
          '  <div>' +
          '    <div class="signal-news-meta">' +
          '      <span class="badge badge-amber">' +
          p.category +
          '</span>' +
          '      <span class="mono-meta">' +
          p.publisher +
          '</span>' +
          '    </div>' +
          '    <h3 class="signal-news-title">' +
          p.title +
          '</h3>' +
          '    <p class="signal-news-summary">' +
          p.summary +
          '</p>' +
          '  </div>' +
          '  <div class="signal-news-footer">' +
          '    <span class="mono-meta">DIRECT PUBLISHER PORTAL</span>' +
          '    <a href="' +
          p.url +
          '" target="_blank" rel="noopener noreferrer" class="btn-minimal">Open Publisher ↗</a>' +
          '  </div>' +
          '</article>'
        );
      })
      .join('');
  }

  function renderLiveArticles(items, sourceLabel, categoryTag, publisherUrl) {
    if (!signalsGrid) return;
    const topItems = items.slice(0, 6);
    signalsGrid.innerHTML = topItems
      .map(function (item) {
        const cleanTitle = stripHtml(item.title || 'Untitled Dispatch');
        const cleanDesc =
          stripHtml(item.description || item.content || '').slice(0, 150) + '…';
        const pubDate = formatPubDate(item.pubDate);
        const link = item.link || publisherUrl;

        return (
          '<article class="signal-news-card">' +
          '  <div>' +
          '    <div class="signal-news-meta">' +
          '      <span class="badge badge-cobalt">' +
          categoryTag +
          '</span>' +
          '      <span class="mono-meta">' +
          sourceLabel +
          ' · ' +
          pubDate +
          '</span>' +
          '    </div>' +
          '    <h3 class="signal-news-title"><a href="' +
          link +
          '" target="_blank" rel="noopener noreferrer">' +
          cleanTitle +
          '</a></h3>' +
          '    <p class="signal-news-summary">' +
          cleanDesc +
          '</p>' +
          '  </div>' +
          '  <div class="signal-news-footer">' +
          '    <a href="' +
          link +
          '" target="_blank" rel="noopener noreferrer" class="btn-minimal">Read original story ↗</a>' +
          '    <a href="' +
          publisherUrl +
          '" target="_blank" rel="noopener noreferrer" class="mono-meta">Publisher ↗</a>' +
          '  </div>' +
          '</article>'
        );
      })
      .join('');
  }

  async function fetchLiveBrandSignals(rssUrl, sourceLabel, categoryTag, publisherUrl) {
    if (!signalsGrid) return;
    if (signalsStatusText) {
      signalsStatusText.textContent = 'Fetching live RSS dispatches from ' + sourceLabel + '…';
    }
    signalsGrid.innerHTML =
      '<div class="story-card span-12" style="text-align:center; padding:2rem;">' +
      '  <span class="mono-meta">SYNCHRONIZING LIVE RSS FEED…</span>' +
      '</div>';

    const apiEndpoint =
      'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssUrl);

    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const data = await response.json();
      if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        if (signalsStatusText) {
          signalsStatusText.textContent =
            'Live RSS feed connected · Source: ' + sourceLabel + ' (' + data.items.length + ' stories)';
        }
        if (signalsStatusDot) {
          signalsStatusDot.className = 'status-dot-live';
        }
        renderLiveArticles(data.items, sourceLabel, categoryTag, publisherUrl);
        return;
      }
      throw new Error('Empty feed');
    } catch (_) {
      renderFallbackPortals(
        'Live RSS feed temporarily unavailable (offline or CORS rate-limit) — showing verified publisher portals'
      );
    }
  }

  if (signalsGrid) {
    let activeFeed = {
      url: DEFAULT_RSS_URL,
      source: 'ET BrandEquity / Advertising',
      category: 'BRAND & AD STRATEGY',
      publisherUrl: 'https://brandequity.economictimes.indiatimes.com/'
    };

    fetchLiveBrandSignals(
      activeFeed.url,
      activeFeed.source,
      activeFeed.category,
      activeFeed.publisherUrl
    );

    if (signalsCategoryBtns.length > 0) {
      signalsCategoryBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          signalsCategoryBtns.forEach(function (b) {
            b.classList.toggle('is-active', b === btn);
          });
          activeFeed = {
            url: btn.getAttribute('data-feed-url') || DEFAULT_RSS_URL,
            source: btn.getAttribute('data-feed-source') || 'Business RSS',
            category: btn.getAttribute('data-feed-category') || 'BRAND SIGNAL',
            publisherUrl:
              btn.getAttribute('data-publisher-url') ||
              'https://brandequity.economictimes.indiatimes.com/'
          };
          fetchLiveBrandSignals(
            activeFeed.url,
            activeFeed.source,
            activeFeed.category,
            activeFeed.publisherUrl
          );
        });
      });
    }

    if (refreshSignalsBtn) {
      refreshSignalsBtn.addEventListener('click', function () {
        fetchLiveBrandSignals(
          activeFeed.url,
          activeFeed.source,
          activeFeed.category,
          activeFeed.publisherUrl
        );
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 10. COPY EMAIL HELPER
  // ---------------------------------------------------------------------------
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const email = copyBtn.getAttribute('data-email') || 'muruganarunachalamk@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          const original = copyBtn.textContent;
          copyBtn.textContent = 'COPIED TO CLIPBOARD ✓';
          updateSigMessage('Copied ' + email + ' to your clipboard!');
          setTimeout(function () {
            copyBtn.textContent = original;
          }, 2200);
        });
      }
    });
  }
})();
