/**
 * MURUGAN ARUNACHALAM K — STUDIO MOTION & INTERACTION ENGINE
 * Handles:
 * 1. Theme persistence (Warm Paper vs. Obsidian Ink)
 * 2. Coordinated multi-page transitions (View Transitions API + Curtain fallback)
 * 3. Scroll-triggered IntersectionObserver reveals
 * 4. Interactive BRL Hybrid Parallel & Serial Mediation Model inspector
 * 5. Work gallery discipline filtering & cursor-following project preview pill
 * 6. Accessible mobile navigation & clipboard helpers
 */

(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------------------
  // 1. THEME PERSISTENCE
  // ---------------------------------------------------------------------------
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const STORAGE_KEY = 'mak_studio_theme';

  function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    if (themeLabel) {
      themeLabel.textContent = mode === 'dark' ? 'Ink' : 'Paper';
    }
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
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
        localStorage.setItem(STORAGE_KEY, next);
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
  // 3. COORDINATED MULTI-PAGE TRANSITION CURTAIN
  // ---------------------------------------------------------------------------
  const curtain = document.querySelector('.page-transition-curtain');
  const curtainLabel = document.querySelector('.curtain-label');

  if (curtain && !prefersReducedMotion) {
    document.querySelectorAll('a[href]').forEach(function (link) {
      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('http') ||
        link.target === '_blank'
      ) {
        return;
      }

      link.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const label = link.getAttribute('data-transition-label') || link.textContent.trim();
        if (curtainLabel && label) {
          curtainLabel.textContent = label;
        }
        e.preventDefault();
        curtain.classList.add('is-active');
        setTimeout(function () {
          window.location.href = href;
        }, 210);
      });
    });

    window.addEventListener('pageshow', function () {
      curtain.classList.remove('is-active');
    });
  }

  // ---------------------------------------------------------------------------
  // 4. SCROLL-TRIGGERED REVEALS
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
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      revealItems.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 5. CURSOR-FOLLOWING PILL FOR PROJECT TILES
  // ---------------------------------------------------------------------------
  const cursorPill = document.getElementById('cursorPill');
  const hoverTiles = document.querySelectorAll('[data-cursor-text]');

  if (cursorPill && hoverTiles.length > 0 && !prefersReducedMotion) {
    window.addEventListener('mousemove', function (e) {
      cursorPill.style.left = e.clientX + 'px';
      cursorPill.style.top = e.clientY + 'px';
    });

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
  // 6. WORK GALLERY CATEGORY FILTERING
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
  // 7. BRL RESEARCH MODEL INTERACTIVE PATHWAYS INSPECTOR
  // ---------------------------------------------------------------------------
  const lensBtns = document.querySelectorAll('[data-model-lens]');
  const modelElements = document.querySelectorAll('[data-pathway]');
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorDesc = document.getElementById('inspectorDesc');
  const inspectorBadge = document.getElementById('inspectorBadge');

  const LENS_DATA = {
    all: {
      title: 'Full Hybrid Parallel & Serial Mediation Model (14 Hypotheses)',
      desc: 'Solid arrows denote direct or replicated empirical support (H1b, H1c, H1d, H3, H2a–c). Dashed arrows highlight cue-dependent (H1a), untested (H2d), or exploratory direct paths.',
      badge: 'COMPLETE ARCHITECTURE'
    },
    h1: {
      title: 'First-Stage Direct Paths (H1a – H1d): Anthropomorphism → 4 Mediators',
      desc: 'H1b (→ Competence) is the strongest first-stage path across 108 studies. H1a (→ Warmth) is mixed/cue-dependent; H1c (→ Privacy Concerns) captures the double-edged surveillance risk; H1d (→ Authenticity) is moderate.',
      badge: 'RQ1 · FIRST STAGE'
    },
    h2: {
      title: 'Second-Stage Effects (H2a – H2d): 4 Mediators → Situational Skepticism',
      desc: 'Warmth (H2a, −) and Competence (H2b, −) reduce active doubt, while Privacy Concerns (H2c, +) heighten defensive skepticism. Authenticity → Skepticism (H2d, −, dashed) is the key empirical test.',
      badge: 'RQ2 · SECOND STAGE'
    },
    serial: {
      title: 'The Serial Mediation Chain (H3 & H4e): Competence → Authenticity → Skepticism',
      desc: 'Grounded in Social Response Theory and Nguyen et al. (2023): consumers must first judge a chatbot functionally competent (H3, Strong) before interpreting its human-like persona as authentic rather than performative.',
      badge: 'RQ3 & RQ4 · SERIAL CORE'
    },
    exploratory: {
      title: 'Exploratory Residual Direct Path: Anthropomorphism → Situational Skepticism',
      desc: 'Tests whether human-like design cues still influence situational consumer skepticism directly once Warmth, Competence, Privacy Concerns, and Authenticity are accounted for in the structural model.',
      badge: 'RQ5 · RESIDUAL TEST'
    }
  };

  if (lensBtns.length > 0 && modelElements.length > 0) {
    lensBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const lens = btn.getAttribute('data-model-lens') || 'all';
        lensBtns.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });

        modelElements.forEach(function (el) {
          const pathways = (el.getAttribute('data-pathway') || '').split(/\s+/);
          if (lens === 'all' || pathways.includes(lens)) {
            el.classList.remove('model-dimmed');
            el.classList.add('model-highlighted');
          } else {
            el.classList.add('model-dimmed');
            el.classList.remove('model-highlighted');
          }
        });

        const info = LENS_DATA[lens] || LENS_DATA.all;
        if (inspectorTitle) inspectorTitle.textContent = info.title;
        if (inspectorDesc) inspectorDesc.textContent = info.desc;
        if (inspectorBadge) inspectorBadge.textContent = info.badge;
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 8. COPY EMAIL HELPER
  // ---------------------------------------------------------------------------
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const email = copyBtn.getAttribute('data-email') || 'muruganarunachalamk@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          const original = copyBtn.textContent;
          copyBtn.textContent = 'COPIED TO CLIPBOARD ✓';
          setTimeout(function () {
            copyBtn.textContent = original;
          }, 2200);
        });
      }
    });
  }
})();