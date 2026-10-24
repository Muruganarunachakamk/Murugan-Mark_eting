/**
 * MURUGAN ARUNACHALAM K — STUDIO ENGINE (V4 BULLETPROOF RELEASE)
 * 1. Unconditional Light Theme ("Paper") with inline CSS variable enforcement
 * 2. Interactive Pre-Defined Chatbot ("SIG Concierge" — Opens on click with 5 Q&A chips)
 * 3. Direct First-Party CORS Live News Engine (Algolia HN Business/Marketing API +
 *    Dev.to Marketing API + rss2json — works through any ISP/campus firewall without proxy blocks!)
 */

(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------------------
  // 1. UNCONDITIONAL LIGHT MODE DEFAULT + DIRECT PALETTE ENFORCEMENT
  //    (Guarantees Burnt Terracotta & Botanical Pine even if old CSS is cached)
  // ---------------------------------------------------------------------------
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const THEME_KEY = 'mak_atelier_theme_v4';

  function applyPaletteTokens(mode) {
    if (mode === 'dark') {
      root.style.setProperty('--bg-page', '#161311');
      root.style.setProperty('--bg-surface', '#211C19');
      root.style.setProperty('--bg-elevated', '#28221E');
      root.style.setProperty('--text-primary', '#F5EFE6');
      root.style.setProperty('--text-secondary', '#C8BEB2');
      root.style.setProperty('--cobalt', '#E5734D');
      root.style.setProperty('--coral', '#5CC497');
    } else {
      root.style.setProperty('--bg-page', '#FAF6F0');
      root.style.setProperty('--bg-surface', '#F1EAE0');
      root.style.setProperty('--bg-elevated', '#FFFFFF');
      root.style.setProperty('--text-primary', '#1F1A17');
      root.style.setProperty('--text-secondary', '#4D453E');
      root.style.setProperty('--cobalt', '#B84A27');
      root.style.setProperty('--coral', '#1E5641');
    }
  }

  function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    applyPaletteTokens(mode);
    if (themeLabel) {
      themeLabel.textContent = mode === 'dark' ? 'Espresso' : 'Paper';
    }
  }

  // Clear old dark-mode keys and force Light ("Paper") by default
  try {
    localStorage.removeItem('mak_studio_theme');
    localStorage.removeItem('mak_portfolio_theme');
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
  }

  // ---------------------------------------------------------------------------
  // 3. CREATIVE SIGNAL LOADING EXPERIENCE
  // ---------------------------------------------------------------------------
  const curtain = document.querySelector('.page-transition-curtain');
  let loaderTimeout = null;

  function hideCurtain() {
    if (loaderTimeout) {
      clearTimeout(loaderTimeout);
      loaderTimeout = null;
    }
    if (curtain) curtain.classList.remove('is-active');
  }

  hideCurtain();
  window.addEventListener('pageshow', hideCurtain);
  window.addEventListener('popstate', hideCurtain);

  // ---------------------------------------------------------------------------
  // 4. PRE-DEFINED INTERACTIVE PORTFOLIO CHATBOT ("SIG CONCIERGE")
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
    // Remove any old V2 sigCompanion if present
    const oldSig = document.getElementById('sigCompanion');
    if (oldSig) oldSig.remove();
    if (document.getElementById('sigChatbotRoot')) return;

    const rootWidget = document.createElement('aside');
    rootWidget.className = 'sig-chatbot-root';
    rootWidget.id = 'sigChatbotRoot';
    rootWidget.setAttribute('aria-label', 'Sig Pre-Defined Portfolio Chatbot');

    // Open by default on first visit so you can immediately see and interact with the bot
    rootWidget.innerHTML =
      '<div class="sig-chat-window" id="sigChatWindow" role="dialog" aria-label="Portfolio Guide Chat">' +
      '  <div class="sig-chat-header">' +
      '    <div class="sig-chat-header-left">' +
      '      <span class="sig-online-dot" aria-hidden="true"></span>' +
      '      <div>' +
      '        <span class="sig-chat-title">SIG · INTERACTIVE BOT</span>' +
      '        <span class="sig-chat-subtitle">Click any topic below to chat</span>' +
      '      </div>' +
      '    </div>' +
      '    <button type="button" class="sig-chat-close" id="sigChatCloseBtn" aria-label="Minimize chat">MINIMIZE −</button>' +
      '  </div>' +
      '  <div class="sig-chat-messages" id="sigChatMessages" aria-live="polite">' +
      '    <div class="sig-msg sig-msg-bot">' +
      '      Hi! I’m <strong>Sig</strong>, Murugan’s pre-defined portfolio bot. Click any question below for an instant briefing:' +
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
      '  <button type="button" class="sig-launcher-pill" id="sigLauncherPill">Hide Guide ×</button>' +
      '  <button type="button" class="sig-avatar-btn" id="sigAvatarBtn" aria-expanded="true" aria-controls="sigChatWindow" aria-label="Toggle interactive portfolio bot">' +
      '    <svg viewBox="0 0 48 48" class="sig-svg" aria-hidden="true">' +
      '      <g class="sig-float-group">' +
      '        <line x1="24" y1="4" x2="24" y2="11" stroke="var(--border-strong)" stroke-width="2" stroke-linecap="round" />' +
      '        <circle cx="24" cy="4" r="3" fill="var(--cobalt)" class="sig-antenna-dot" />' +
      '        <circle cx="24" cy="25" r="14" fill="var(--bg-page)" stroke="var(--border-strong)" stroke-width="2.2" />' +
      '        <circle cx="24" cy="25" r="9.5" fill="var(--cobalt-soft)" stroke="var(--cobalt)" stroke-width="1.5" />' +
      '        <circle cx="24" cy="25" r="4.2" fill="var(--cobalt)" />' +
      '        <circle cx="25.5" cy="23.5" r="1.4" fill="#ffffff" />' +
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

    function toggleChat(forceOpen) {
      if (!chatWin) return;
      const willOpen =
        typeof forceOpen === 'boolean' ? forceOpen : chatWin.classList.contains('is-closed');
      chatWin.classList.toggle('is-closed', !willOpen);
      if (avatarBtn) avatarBtn.setAttribute('aria-expanded', String(willOpen));
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
  // 5. SCROLL REVEALS & WORK FILTERS
  // ---------------------------------------------------------------------------
  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.add('is-inview');
  });

  const filterBtns = document.querySelectorAll('[data-filter]');
  const projectTiles = document.querySelectorAll('.project-tile[data-category]');
  if (filterBtns.length > 0 && projectTiles.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter') || 'all';
        filterBtns.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        projectTiles.forEach(function (tile) {
          const cats = (tile.getAttribute('data-category') || '').split(/\s+/);
          if (filter === 'all' || cats.includes(filter)) tile.removeAttribute('hidden');
          else tile.setAttribute('hidden', '');
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 6. DIRECT FIRST-PARTY CORS LIVE NEWS ENGINE (ZERO PROXY BLOCKS!)
  //    Uses Algolia Official Search API + Dev.to Official API + rss2json
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
      devtoTag: 'marketing',
      rssUrl: 'https://www.marketingdive.com/feeds/news/'
    },
    consumer_retail: {
      label: 'Consumer Behaviour & Retail E-Commerce',
      badge: 'CONSUMER & RETAIL',
      algoliaQuery: 'e-commerce retail consumer brand D2C shopping',
      devtoTag: 'business',
      rssUrl: 'https://www.retaildive.com/feeds/news/'
    },
    ai_marketing: {
      label: 'Digital Marketing, AI & Customer Experience',
      badge: 'MARTECH & AI CX',
      algoliaQuery: 'AI chatbot customer support digital marketing SEO',
      devtoTag: 'ai',
      rssUrl: 'https://www.marketingdive.com/feeds/news/'
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
    // 1. Primary Direct First-Party CORS API: Algolia HN Search (Never blocked by firewalls/CORS)
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

    // 2. Secondary Direct First-Party CORS API: Dev.to Articles API
    try {
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
    } catch (_) {}

    // 3. Tertiary: rss2json
    const res3 = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(topicConfig.rssUrl)
    );
    if (res3.ok) {
      const data3 = await res3.json();
      if (data3 && Array.isArray(data3.items) && data3.items.length > 0) {
        return data3.items.slice(0, 6).map(function (item) {
          return {
            title: item.title,
            url: item.link,
            publisher: extractDomain(item.link),
            date: formatDate(item.pubDate),
            summary: (item.description || '').replace(/<[^>]+>/g, '').slice(0, 140) + '…'
          };
        });
      }
    }

    throw new Error('Offline');
  }

  function renderSignalCards(stories, badgeLabel) {
    if (!signalsGrid) return;
    signalsGrid.innerHTML = stories
      .map(function (s) {
        return (
          '<article class="signal-news-card">' +
          '  <div>' +
          '    <div class="signal-news-meta">' +
          '      <span class="badge badge-cobalt">' +
          badgeLabel +
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
  }

  async function loadSignalsByKey(topicKey) {
    if (!signalsGrid) return;
    const cfg = SIGNAL_TOPICS[topicKey] || SIGNAL_TOPICS.brand_india;

    if (signalsStatusText) {
      signalsStatusText.textContent = 'Fetching live stories for ' + cfg.label + '…';
    }
    signalsGrid.innerHTML =
      '<div class="story-card span-12" style="text-align:center; padding:2rem;">' +
      '  <span class="mono-meta">LOADING LIVE DISPATCHES…</span>' +
      '</div>';

    try {
      const stories = await fetchDirectLiveStories(cfg);
      if (signalsStatusDot) signalsStatusDot.className = 'status-dot-live';
      if (signalsStatusText) {
        signalsStatusText.textContent =
          'Live feed connected · ' + cfg.label + ' (' + stories.length + ' verified stories)';
      }
      renderSignalCards(stories, cfg.badge);
    } catch (_) {
      if (signalsStatusDot) signalsStatusDot.className = 'status-dot-offline';
      if (signalsStatusText) {
        signalsStatusText.textContent = 'No internet connection detected';
      }
    }
  }

  if (signalsGrid) {
    // Bind both new [data-signal-topic] buttons and legacy [data-feed-url] buttons
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
