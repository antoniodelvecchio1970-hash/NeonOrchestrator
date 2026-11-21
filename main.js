(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, '0');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  const header = $('.site-header');
  const works = $('#works');
  const track = $('#track');
  const cards = $$('.film-card', track);
  const metaEyebrow = $('#meta-eyebrow');
  const metaTitle = $('#meta-title');
  const metaLead = $('#meta-lead');
  const viewToggle = $('#view-toggle');
  const filterCells = $$('.filter-cell[data-filter]');

  let lenis = null;
  let st = null;
  let activeIdx = 0;
  let currentFilter = 'all';
  let gridMode = false;

  const visible = () => cards.filter((c) => !c.hidden);

  /* ---------- Lenis + GSAP ---------- */
  if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);
    if (!reduce && typeof Lenis !== 'undefined') {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  const scrollToY = (y) => (lenis ? lenis.scrollTo(y, { duration: 1.2 }) : window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }));
  const scrollToEl = (el) => scrollToY(el.getBoundingClientRect().top + window.scrollY);

  /* ---------- Header solid dopo hero ---------- */
  const onScrollHeader = () => header.classList.toggle('is-solid', window.scrollY > window.innerHeight * 0.6);
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Menu overlay ---------- */
  const menu = $('#menu');
  const trigger = $('.menu-trigger');
  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    trigger.setAttribute('aria-expanded', String(open));
    trigger.firstElementChild.textContent = open ? 'CHIUDI' : 'MENU';
    if (lenis) open ? lenis.stop() : lenis.start();
    if (open) header.classList.add('is-solid'); else onScrollHeader();
  };
  trigger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); trigger.focus(); } });

  $$('[data-nav]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || !id.startsWith('#')) return;
    const target = $(id);
    if (!target) return;
    e.preventDefault();
    const wasOpen = menu.classList.contains('is-open');
    if (wasOpen) setMenu(false);
    setTimeout(() => (id === '#works' ? goWorksTop() : scrollToEl(target)), wasOpen ? 380 : 0);
  }));

  const goWorksTop = () => scrollToY(works.getBoundingClientRect().top + window.scrollY - (st ? 0 : 0));

  /* ---------- Meta sincronizzata ---------- */
  const setActive = (idx) => {
    const list = visible();
    if (!list.length) return;
    activeIdx = Math.max(0, Math.min(list.length - 1, idx));
    list.forEach((c, i) => c.classList.toggle('is-active', i === activeIdx));
    const c = list[activeIdx];
    metaEyebrow.textContent = `progetti selezionati · ${pad(activeIdx + 1)} / ${pad(list.length)}`;
    metaTitle.textContent = c.dataset.title;
    metaLead.textContent = c.dataset.lead;
  };

  /* ---------- Filmstrip scrub (TX-04 / M4) ---------- */
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

  const killTrack = () => {
    if (st) { st.kill(true); st = null; }
    if (hasGSAP) gsap.set(track, { clearProps: 'transform' });
  };

  const buildTrack = () => {
    killTrack();
    works.classList.remove('is-native');
    if (gridMode) return;
    if (!hasGSAP || reduce) {
      works.classList.add('is-native');
      return;
    }
    if (distance() <= 0) { setActive(0); return; }
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: works,
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const n = visible().length;
          setActive(Math.round(self.progress * (n - 1)));
        },
      },
    });
    st = tween.scrollTrigger;
    setActive(0);
  };

  const skipWorks = $('#skip-works');
  if (skipWorks) {
    skipWorks.addEventListener('click', () => {
      const bioEl = $('#bio');
      if (bioEl) scrollToEl(bioEl);
    });
  }

  // fallback nativo: aggiorna meta con lo scroll orizzontale
  $('.film-viewport', works).addEventListener('scroll', (e) => {
    if (!works.classList.contains('is-native')) return;
    const el = e.currentTarget;
    const max = el.scrollWidth - el.clientWidth;
    setActive(Math.round((el.scrollLeft / (max || 1)) * (visible().length - 1)));
  }, { passive: true });

  /* ---------- Filtri ---------- */
  const applyFilter = (f) => {
    currentFilter = f;
    cards.forEach((c) => { c.hidden = !(f === 'all' || c.dataset.cat === f); });
    filterCells.forEach((b) => {
      const on = b.dataset.filter === f;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    buildTrack();
    setActive(0);
    if (hasGSAP) ScrollTrigger.refresh();
  };
  filterCells.forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.filter === currentFilter) return;
    applyFilter(b.dataset.filter);
  }));

  viewToggle.addEventListener('click', () => {
    gridMode = !gridMode;
    works.classList.toggle('is-grid', gridMode);
    viewToggle.setAttribute('aria-pressed', String(gridMode));
    const labelEl = $('span', viewToggle);
    if (labelEl) labelEl.textContent = gridMode ? 'vista filmstrip' : 'vista griglia';
    buildTrack();
    if (hasGSAP) ScrollTrigger.refresh();
    requestAnimationFrame(() => scrollToEl(works));
  });

  /* ---------- Scheda caso (dialog) ---------- */
  const dlg = $('#case-dialog');
  const catLabel = { brand: 'BRAND IDENTITY', packaging: 'PACKAGING', campagne: 'CAMPAGNE' };
  const openCase = (card) => {
    const img = $('img', card);
    $('#dlg-img').src = img.currentSrc || img.src;
    $('#dlg-img').alt = img.alt;
    $('#dlg-img').style.objectPosition = getComputedStyle(card).getPropertyValue('--pos') || 'center';
    $('#dlg-cat').textContent = catLabel[card.dataset.cat] || '';
    $('#dlg-title').textContent = card.dataset.title;
    $('#dlg-lead').textContent = card.dataset.lead;
    if (lenis) lenis.stop();
    dlg.showModal();
  };
  const closeCase = () => dlg.open && dlg.close();
  dlg.addEventListener('close', () => { if (lenis && !menu.classList.contains('is-open')) lenis.start(); });
  $('#dlg-close').addEventListener('click', closeCase);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) closeCase(); });
  $('#dlg-cta').addEventListener('click', (e) => {
    e.preventDefault();
    closeCase();
    setTimeout(() => scrollToEl($('#contatti')), 60);
  });
  cards.forEach((c) => {
    $('.film-tag', c).addEventListener('click', () => openCase(c));
    c.addEventListener('click', (e) => { if (!e.target.closest('.film-tag')) openCase(c); });
  });

  /* ---------- Hero M2: Expanding Frame ---------- */
  if (hasGSAP && !reduce) {
    const media = $('.hero-media');
    const heroImg = $('.hero-media img');
    const parts = ['.site-header .wordmark', '.menu-trigger', '.eyebrow', '.hero-title', '.hero-statement', '.scroll-circle', '.hero-socials'];
    gsap.set(media, { clipPath: 'inset(16% 24% 16% 24%)' });
    gsap.set(heroImg, { scale: 1.2 });
    gsap.set(parts, { autoAlpha: 0, y: 22 });
    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });
    tl.to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5 }, 0.1)
      .to(heroImg, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0.1)
      .to(parts, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 0.95);
  }

  /* ---------- M10 Magnetic Reticle ---------- */
  if (hasGSAP && finePointer && !reduce) {
    const reticle = $('#reticle');
    const label = $('span', reticle);
    const xTo = gsap.quickTo(reticle, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(reticle, 'y', { duration: 0.35, ease: 'power3.out' });
    let overCard = false;
    const show = () => { overCard = true; gsap.to(reticle, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.out', overwrite: 'auto' }); };
    const hide = () => { overCard = false; gsap.to(reticle, { autoAlpha: 0, scale: 0.4, duration: 0.2, overwrite: 'auto' }); };
    window.addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
    cards.forEach((c) => {
      c.addEventListener('mouseenter', show);
      c.addEventListener('mouseleave', hide);
    });
    window.addEventListener('scroll', () => { if (!overCard) hide(); }, { passive: true });
    dlg.addEventListener('close', hide);
    void label;
  }

  /* ---------- Bio: Text Reveal allo scroll ---------- */
  const splitWords = (el) => {
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        if (!parts.some((p) => p.trim())) return;
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement('span');
            span.className = 'reveal-word';
            span.textContent = part;
            frag.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        [...node.childNodes].forEach(walk);
      }
    };
    walk(el);
  };

  const bio = $('#bio');
  if (bio && hasGSAP && !reduce) {
    $$('[data-reveal]', bio).forEach(splitWords);
    const words = $$('.reveal-word', bio);
    const listItems = $$('.bio-list li', bio);

    if (words.length) {
      gsap.set(words, { opacity: 0.14 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.03,
        ease: 'none',
        scrollTrigger: {
          trigger: bio,
          start: 'top 82%',
          end: 'bottom 45%',
          scrub: 1.2,
        },
      });
    }
    if (listItems.length) {
      gsap.set(listItems, { opacity: 0.15, y: 12 });
      gsap.to(listItems, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.bio-body',
          start: 'top 84%',
          end: 'bottom 60%',
          scrub: 1.2,
        },
      });
    }
  }

  /* ---------- Avvio ---------- */
  const init = () => { buildTrack(); setActive(0); if (hasGSAP) ScrollTrigger.refresh(); };
  if (document.readyState === 'complete') init(); else window.addEventListener('load', init);
  document.fonts && document.fonts.ready.then(() => hasGSAP && ScrollTrigger.refresh());
})();
