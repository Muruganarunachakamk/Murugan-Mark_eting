/**
 * MURUGAN ARUNACHALAM K — STUDIO ENGINE (V3 UPGRADE)
 * 1. Unconditional Light-First Theme ("Paper") with fresh storage key
 * 2. Interactive Pre-Defined Portfolio Bot ("SIG Concierge" — No AI/API)
 * 3. Multi-Proxy Live RSS Engine (Google News RSS + 3-Tier Failover)
 * 4. BRL Conceptual Diagram Interactive Node & Pathway Inspector
 */

(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------------------
  // 1. LIGHT-FIRST THEME ENGINE (DEFAULT = LIGHT "PAPER" MODE)
  // ---------------------------------------------------------------------------
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  // New storage key clears out any previously cached 'dark' setting
  const THEME_KEY = 'mak_atelier_light_default_v3';

  function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    if (themeLabel) {
      themeLabel.textContent = mode === 'dark' ? 'Espresso' : 'Paper';
    }
  }

  try {
    const saved = localStorage.getItem(THEME_KEY);
    // Default strictly to 'light' unless user explicitly toggled 'dark'
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
  // 3. CREATIVE SIGNAL LOADING EXPERIENCE
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
      '    <span class="mono-meta">STUDIO ATELIER</span>' +
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
        loaderTimeout = setTimeout(hideCurtain, 900);

        setTimeout(function () {
          window.location.href = href;
        }, 165);
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 4. PRE-DEFINED INTERACTIVE PORTFOLIO BOT ("SIG CONCIERGE" — NO AI/API)
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
        { label: 'Gravity Shift →', url: 'project-gravity-shift.html' },
        { label: 'Slow Living →', url: 'project-slow-living.html' }
      ]
    },
    skills_tools: {
      question: 'Skills & Certifications',
      answer:
        'Certified in IBM/Coursera Generative AI for Digital Marketing (4 courses incl. GEO), HubSpot Digital Marketing, Microsoft Office Specialist (MOS) Excel Associate 2019, and NPTEL Consumer Psychology. Skilled in survey design, ANOVA/Chi-Square, and Power BI.',
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

  function getWelcomeBotMessage() {
    const path = (window.location.pathname || '').toLowerCase();
    if (path.includes('research.html')) {
      return 'Welcome to the BRL Research Lab! Click any oval node on the diagram to inspect its construct definition, or pick a question below.';
    }
    if (path.includes('work.html')) {
      return 'Here are Murugan’s 5 verified studies. Use the filter pills above or ask me about any project below!';
    }
    return 'Hi! I’m Sig, Murugan’s pre-defined portfolio guide. Select any topic chip below to explore his research, case studies, or credentials:';
  }

  function injectInteractiveBot() {
    if (document.getElementById('sigChatbotRoot')) return;

    const rootWidget = document.createElement('aside');
    rootWidget.className = 'sig-chatbot-root';
    rootWidget.id = 'sigChatbotRoot';
    rootWidget.setAttribute('aria-label', 'Sig Pre-Defined Portfolio Chatbot');

    rootWidget.innerHTML =
      '<div class="sig-chat-window is-closed" id="sigChatWindow" role="dialog" aria-label="Portfolio Guide Chat">' +
      '  <div class="sig-chat-header">' +
      '    <div class="sig-chat-header-left">' +
      '      <span class="sig-online-dot" aria-hidden="true"></span>' +
      '      <div>' +
      '        <span class="sig-chat-title">SIG · PORTFOLIO GUIDE</span>' +
      '        <span class="sig-chat-subtitle">Pre-defined interactive assistant</span>' +
      '      </div>' +
      '    </div>' +
      '    <button type="button" class="sig-chat-close" id="sigChatCloseBtn" aria-label="Close chat window">CLOSE ×</button>' +
      '  </div>' +
      '  <div class="sig-chat-messages" id="sigChatMessages" aria-live="polite">' +
      '    <div class="sig-msg sig-msg-bot" id="sigInitialMsg">' +
      getWelcomeBotMessage() +
      '    </div>' +
      '  </div>' +
      '  <div class="sig-chat-chips-area">' +
      '    <span class="sig-chips-label">Select a question:</span>' +
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
      '  <button type="button" class="sig-launcher-pill" id="sigLauncherPill">Ask Sig Guide 💬</button>' +
      '  <button type="button" class="sig-avatar-btn" id="sigAvatarBtn" aria-expanded="false" aria-controls="sigChatWindow" aria-label="Open interactive portfolio guide">' +
      '    <svg viewBox="0 0 48 48" class="sig-svg" aria-hidden="true">' +
      '      <g class="sig-float-group">' +
      '        <line x1="24" y1="4" x2="24" y2="11" stroke="var(--border-strong)" stroke-width="2" stroke-linecap="round" />' +
      '        <circle cx="24" cy="4" r="3" fill="var(--cobalt)" class="sig-antenna-dot" />' +
      '        <circle cx="24" cy="25" r="14" fill="var(--bg-page)" stroke="var(--border-strong)" stroke-width="2.2" />' +
      '        <circle cx="24" cy="25" r="9.5" fill="var(--cobalt-soft)" stroke="var(--cobalt)" stroke-width="1.5" />' +
      '        <g id="sigPupilGroup">' +
      '          <circle cx="24" cy="25" r="4.2" fill="var(--cobalt)" />' +
      '          <circle cx="25.5" cy="23.5" r="1.4" fill="#ffffff" />' +
      '        </g>' +
      '        <path d="M 18 40 L 24 45 L 30 40" fill="none" stroke="var(--coral)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />' +
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
    const pupilGroup = document.getElementById('sigPupilGroup');

    function toggleChatWindow(forceOpen) {
      if (!chatWin) return;
      const willOpen =
        typeof forceOpen === 'boolean' ? forceOpen : chatWin.classList.contains('is-closed');
      chatWin.classList.toggle('is-closed', !willOpen);
      if (avatarBtn) avatarBtn.setAttribute('aria-expanded', String(willOpen));
      if (launcherPill) {
        launcherPill.textContent = willOpen ? 'Hide Guide ×' : 'Ask Sig Guide 💬';
      }
    }

    if (avatarBtn) {
      avatarBtn.addEventListener('click', function () {
        toggleChatWindow();
      });
    }
    if (launcherPill) {
      launcherPill.addEventListener('click', function () {
        toggleChatWindow();
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        toggleChatWindow(false);
      });
    }

    rootWidget.querySelectorAll('[data-bot-topic]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        const key = chip.getAttribute('data-bot-topic');
        const entry = BOT_RESPONSES[key];
        if (!entry || !messagesBox) return;

        // 1. Append user bubble
        const userDiv = document.createElement('div');
        userDiv.className = 'sig-msg sig-msg-user';
        userDiv.textContent = entry.question;
        messagesBox.appendChild(userDiv);
        messagesBox.scrollTop = messagesBox.scrollHeight;

        // 2. Append bot reply after short natural pause
        setTimeout(function () {
          const botDiv = document.createElement('div');
          botDiv.className = 'sig-msg sig-msg-bot';
          let linksHtml = '';
          if (entry.links && entry.links.length > 0) {
            linksHtml =
              '<div class="sig-msg-actions">' +
              entry.links
                .map(function (l) {
                  return '<a href="' + l.url + '" class="sig-inline-link">' + l.label + '</a>';
                })
                .join('') +
              '</div>';
          }
          botDiv.innerHTML = '<div>' + entry.answer + '</div>' + linksHtml;
          messagesBox.appendChild(botDiv);
          messagesBox.scrollTop = messagesBox.scrollHeight;
        }, 220);
      });
    });

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
          pupilGroup.style.transform =
            'translate(' +
            (Math.cos(angle) * dist).toFixed(2) +
            'px, ' +
            (Math.sin(angle) * dist).toFixed(2) +
            'px)';
        },
        { passive: true }
      );
    }
  }

  function pushBotNotification(text) {
    const messagesBox = document.getElementById('sigChatMessages');
    if (!messagesBox || !text) return;
    const botDiv = document.createElement('div');
    botDiv.className = 'sig-msg sig-msg-bot';
    botDiv.textContent = text;
    messagesBox.appendChild(botDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  injectInteractiveBot();

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
  // 6. CURSOR-FOLLOWING PILL FOR PROJECT TILES
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

        projectTiles.forEach(function (tile) {
          const cats = (tile.getAttribute('data-category') || '').split(/\s+/);
          if (filter === 'all' || cats.includes(filter)) {
            tile.removeAttribute('hidden');
          } else {
            tile.setAttribute('hidden', '');
          }
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 8. BRL RESEARCH MODEL INTERACTIVE ENGINE
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
    pushBotNotification(data.title + ': ' + data.desc);
  }

  if (lensBtns.length > 0 && modelElements.length > 0) {
    lensBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateModelLens(btn.getAttribute('data-model-lens') || 'all');
      });
    });

    selectableNodes.forEach(function (node) {
      node.addEventListener('click', function () {
        activateNodeInspection(node.getAttribute('data-node-id'), node);
      });
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateNodeInspection(node.getAttribute('data-node-id'), node);
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 9. FIXED 3-TIER MULTI-PROXY LIVE RSS FEED ENGINE
  //    Uses proxy-friendly Google News RSS feeds + 3 automatic failover proxies
  // ---------------------------------------------------------------------------
  const signalsGrid = document.getElementById('signalsGrid');
  const signalsStatusText = document.getElementById('signalsStatusText');
  const signalsStatusDot = document.getElementById('signalsStatusDot');
  const refreshSignalsBtn = document.getElementById('refreshSignalsBtn');
  const signalsCategoryBtns = document.querySelectorAll('[data-feed-url]');

  // High-reliability Google News RSS queries that never block cloud proxies
  const FEED_PRESETS = [
    {
      url: 'https://news.google.com/rss/search?q=brand+strategy+OR+advertising+marketing+India&hl=en-IN&gl=IN&ceid=IN:en',
      source: 'Brand & Advertising (India)',
      category: 'BRAND & AD STRATEGY',
      publisherUrl: 'https://brandequity.economictimes.indiatimes.com/'
    },
    {
      url: 'https://news.google.com/rss/search?q=FMCG+OR+retail+consumer+brands+India&hl=en-IN&gl=IN&ceid=IN:en',
      source: 'Consumer & Retail Markets',
      category: 'CONSUMER & RETAIL',
      publisherUrl: 'https://www.afaqs.com/'
    },
    {
      url: 'https://news.google.com/rss/search?q=digital+marketing+AI+consumer+psychology&hl=en-US&gl=US&ceid=US:en',
      source: 'Global Marketing & AI',
      category: 'GLOBAL MARTECH & AI',
      publisherUrl: 'https://www.marketingdive.com/'
    }
  ];

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

  function parseXmlRssItems(xmlString) {
    const xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');
    const itemNodes = Array.from(xmlDoc.querySelectorAll('item'));
    return itemNodes.map(function (node) {
      const title = (node.querySelector('title') && node.querySelector('title').textContent) || '';
      const link = (node.querySelector('link') && node.querySelector('link').textContent) || '';
      const pubDate =
        (node.querySelector('pubDate') && node.querySelector('pubDate').textContent) || '';
      const sourceEl = node.querySelector('source');
      const sourceName = (sourceEl && sourceEl.textContent) || '';
      const desc =
        (node.querySelector('description') && node.querySelector('description').textContent) || '';
      return {
        title: title,
        link: link,
        pubDate: pubDate,
        author: sourceName,
        description: desc
      };
    });
  }

  async function fetchRssWithFailover(rssUrl) {
    // Tier 1: rss2json API
    try {
      const res1 = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssUrl)
      );
      if (res1.ok) {
        const data1 = await res1.json();
        if (data1 && data1.status === 'ok' && Array.isArray(data1.items) && data1.items.length > 0) {
          return data1.items;
        }
      }
    } catch (_) {}

    // Tier 2: AllOrigins JSON wrapper + native XML DOMParser
    try {
      const res2 = await fetch(
        'https://api.allorigins.win/get?url=' + encodeURIComponent(rssUrl)
      );
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2 && data2.contents) {
          const items2 = parseXmlRssItems(data2.contents);
          if (items2.length > 0) return items2;
        }
      }
    } catch (_) {}

    // Tier 3: CodeTabs raw XML proxy + native XML DOMParser
    const res3 = await fetch(
      'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(rssUrl)
    );
    if (res3.ok) {
      const xmlText = await res3.text();
      const items3 = parseXmlRssItems(xmlText);
      if (items3.length > 0) return items3;
    }

    throw new Error('All RSS proxies unreachable');
  }

  function renderLiveArticles(items, sourceLabel, categoryTag, publisherUrl) {
    if (!signalsGrid) return;
    const topItems = items.slice(0, 6);
    signalsGrid.innerHTML = topItems
      .map(function (item) {
        let cleanTitle = stripHtml(item.title || 'Untitled Dispatch');
        let publisherName = item.author || sourceLabel;

        // Extract trailing " - Publisher" from Google News titles cleanly
        const dashIdx = cleanTitle.lastIndexOf(' - ');
        if (dashIdx > 20) {
          publisherName = cleanTitle.slice(dashIdx + 3).trim();
          cleanTitle = cleanTitle.slice(0, dashIdx).trim();
        }

        let cleanDesc = stripHtml(item.description || item.content || '');
        if (!cleanDesc || cleanDesc === cleanTitle || cleanDesc.length < 25) {
          cleanDesc =
            'Live market dispatch via ' +
            publisherName +
            '. Click below to read the full coverage from the original publisher.';
        } else if (cleanDesc.length > 155) {
          cleanDesc = cleanDesc.slice(0, 155) + '…';
        }

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
          publisherName +
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
          '" target="_blank" rel="noopener noreferrer" class="mono-meta">Portal ↗</a>' +
          '  </div>' +
          '</article>'
        );
      })
      .join('');
  }

  function renderFallbackPortals() {
    if (!signalsGrid) return;
    if (signalsStatusText) {
      signalsStatusText.textContent =
        'Offline mode — showing verified direct publisher portals';
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

  async function loadFeedPreset(preset) {
    if (!signalsGrid) return;
    if (signalsStatusText) {
      signalsStatusText.textContent = 'Synchronizing live stories for ' + preset.source + '…';
    }
    signalsGrid.innerHTML =
      '<div class="story-card span-12" style="text-align:center; padding:2rem;">' +
      '  <span class="mono-meta">FETCHING LIVE DISPATCHES…</span>' +
      '</div>';

    try {
      const items = await fetchRssWithFailover(preset.url);
      if (signalsStatusText) {
        signalsStatusText.textContent =
          'Live feed active · ' + preset.source + ' (Showing latest 6 dispatches)';
      }
      if (signalsStatusDot) {
        signalsStatusDot.className = 'status-dot-live';
      }
      renderLiveArticles(items, preset.source, preset.category, preset.publisherUrl);
    } catch (_) {
      renderFallbackPortals();
    }
  }

  if (signalsGrid) {
    // Automatically upgrade the 3 category buttons on index.html to use the reliable Google News RSS presets
    signalsCategoryBtns.forEach(function (btn, idx) {
      if (FEED_PRESETS[idx]) {
        btn.setAttribute('data-feed-url', FEED_PRESETS[idx].url);
        btn.setAttribute('data-feed-source', FEED_PRESETS[idx].source);
        btn.setAttribute('data-feed-category', FEED_PRESETS[idx].category);
        btn.setAttribute('data-publisher-url', FEED_PRESETS[idx].publisherUrl);
      }
    });

    let currentPreset = FEED_PRESETS[0];
    loadFeedPreset(currentPreset);

    signalsCategoryBtns.forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        signalsCategoryBtns.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        currentPreset = FEED_PRESETS[idx] || {
          url: btn.getAttribute('data-feed-url'),
          source: btn.getAttribute('data-feed-source'),
          category: btn.getAttribute('data-feed-category'),
          publisherUrl: btn.getAttribute('data-publisher-url')
        };
        loadFeedPreset(currentPreset);
      });
    });

    if (refreshSignalsBtn) {
      refreshSignalsBtn.addEventListener('click', function () {
        loadFeedPreset(currentPreset);
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
          pushBotNotification('Copied ' + email + ' to your clipboard!');
          setTimeout(function () {
            copyBtn.textContent = original;
          }, 2200);
        });
      }
    });
  }
})();
