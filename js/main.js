/**
 * CASA TINTA — Interactive Archive, Case Dossier & Motion Triad (M6 + M7 + TX-06)
 * Dependencies: GSAP 3.12.5, ScrollTrigger, Lenis 1.1.18
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const PROJECTS = [
    {
      id: '01',
      title: 'Cocco Botánica',
      client: 'Cocco Botánica Lda',
      category: 'PACKAGING',
      city: 'Lisbona',
      year: '2025',
      color: '#F4BE0B',
      img: 'assets/cocco-yellow.jpg',
      pos: 'center 46%',
      alt: 'Cofanetti illustrati Cocco Botánica su cromia giallo zafferano, cobalto e vermiglio',
      summary: 'Cofanetti illustrati in quattro cromie piene per pasticceria artigianale e infusi botanici a Lisbona, progettati su cartoncino non patinato con vernice selettiva opaca.'
    },
    {
      id: '02',
      title: 'Mōko Cacao',
      client: 'Mōko Obrador',
      category: 'IDENTITY',
      city: 'Barcellona',
      year: '2025',
      color: '#0C3EA8',
      img: 'assets/moko-cobalt.jpg',
      pos: 'center 50%',
      alt: 'Identità visiva e cofanetti blu cobalto e arancio Mōko Cacao',
      summary: 'Sistema di identità visiva, logotipo graffiato e collezione di cofanetti per cioccolateria bean-to-bar nel cuore di Barcellona, costruita sull’urto cromatico tra cobalto e arancio vivo.'
    },
    {
      id: '03',
      title: 'Dune Roasters',
      client: 'Dune Caffè Torino',
      category: 'IDENTITY',
      city: 'Torino',
      year: '2025',
      color: '#9E5130',
      img: 'assets/dune-coffee.jpg',
      pos: 'center 48%',
      alt: 'Pouch in carta materica blu notte, sabbia e terracotta per Dune Roasters',
      summary: 'Marchio, architettura tipografica e sacchetti in carta materica in tre varianti cromatiche terrose per una micro-torrefazione specialty torinese.'
    },
    {
      id: '04',
      title: 'Velne Parfums',
      client: 'Maison Velne',
      category: 'PACKAGING',
      city: 'Marsiglia',
      year: '2025',
      color: '#5E5B24',
      img: 'assets/velne-boxes.jpg',
      pos: 'center 42%',
      alt: 'Astucci Velne Parfums con goffratura botanica a secco e quattro essenze',
      summary: 'Astucci per profumeria botanica con goffratura profonda a secco e codifica olfattiva in quattro toni naturali — Dusk, Soil, Ember e Veil.'
    },
    {
      id: '05',
      title: 'Equipp Audio',
      client: 'Equipp Acoustics AG',
      category: 'PACKAGING',
      city: 'Zurigo',
      year: '2024',
      color: '#B67E53',
      img: 'assets/equipp-box.jpg',
      pos: 'center 50%',
      alt: 'Scatola strutturale rigida con sfumatura rame e ossidiana per Equipp Audio',
      summary: 'Packaging strutturale rigido a chiusura magnetica per convertitori acustici da studio, calibrato su stampa a gradiente rame su cartone grigio.'
    },
    {
      id: '06',
      title: 'Nova Orbit',
      client: 'Fondazione Suono Nova',
      category: 'CAMPAGNE',
      city: 'Milano',
      year: '2025',
      color: '#0F9EB0',
      img: 'assets/orbit-campaign.jpg',
      pos: 'center 28%',
      alt: 'Ritratto in luce bicromatica ciano e cremisi per campagna Nova Orbit',
      summary: 'Direzione fotografica e campagna di lancio in luce bicromatica ciano-cremisi per il programma notturno di musica elettronica e installazioni sonore.'
    },
    {
      id: '07',
      title: 'Docta Botanicals',
      client: 'Docta Apothecary',
      category: 'PACKAGING',
      city: 'Ginevra',
      year: '2024',
      color: '#E59824',
      img: 'assets/docta-tins.webp',
      pos: 'center 50%',
      alt: 'Latte metalliche serigrafate con motivi botanici ad alta saturazione Docta',
      summary: 'Serie collezionabile di latte metalliche serigrafate con tavole botaniche ad alta saturazione e cartiglio centrale in oro caldo.'
    },
    {
      id: '08',
      title: 'Onda Street',
      client: 'Onda Tessile Srl',
      category: 'CAMPAGNE',
      city: 'Torino',
      year: '2025',
      color: '#D4A51A',
      img: 'assets/street-campaign.jpg',
      pos: 'center 22%',
      alt: 'Campagna editoriale urbana Onda Street tra architetture industriali',
      summary: 'Campagna editoriale su location industriali torinesi e direzione casting per la prima capsule workwear di Onda.'
    },
    {
      id: '09',
      title: 'Solera Lineup',
      client: 'Solera Dispensa',
      category: 'PACKAGING',
      city: 'Valencia',
      year: '2024',
      color: '#D96846',
      img: 'assets/pack-lineup.jpg',
      pos: 'center 50%',
      alt: 'Gamma di sei pouch cromatici allineati con gabbia svizzera Solera',
      summary: 'Architettura di gamma a sei referenze cromatiche con gabbia tipografica unificata e lettura immediata da scaffale.'
    },
    {
      id: '10',
      title: 'Fork & Flame',
      client: 'Fork & Flame Cucina',
      category: 'IDENTITY',
      city: 'Bologna',
      year: '2025',
      color: '#1E3F33',
      img: 'assets/fork-flame.jpg',
      pos: 'center 44%',
      alt: 'Sistema coordinato takeaway, shopper e fascette Fork & Flame',
      summary: 'Sistema d’identità, shopper in carta avana, fascette termosaldate e materiali di servizio in verde bosco e terracotta.'
    },
    {
      id: '11',
      title: 'Borgo Mercato',
      client: 'Consorzio Borgo',
      category: 'PACKAGING',
      city: 'Parma',
      year: '2024',
      color: '#1B7D82',
      img: 'assets/borgo-bags.png',
      pos: 'center 45%',
      alt: 'Sacchetti regalo con manici in corda intrecciata Borgo Mercato',
      summary: 'Sacchetti regalo strutturati con manici in corda intrecciata e illustrazione architettonica continua sulle quattro facce.'
    },
    {
      id: '12',
      title: 'Alpe Coofs',
      client: 'Alpe Cooperativa',
      category: 'IDENTITY',
      city: 'Bolzano',
      year: '2024',
      color: '#E88B72',
      img: 'assets/alpe-bags.jpg',
      pos: 'center 48%',
      alt: 'Shopper e identità cromatica alpina Alpe Coofs',
      summary: 'Identità territoriale e sistema shopper a campiture nette per rete di produttori alpini di alta quota.'
    },
    {
      id: '13',
      title: 'Lipty Fruit',
      client: 'Lipty Foods SL',
      category: 'PACKAGING',
      city: 'Barcellona',
      year: '2025',
      color: '#6D2DA6',
      img: 'assets/lipty-fruit.jpg',
      pos: 'center 45%',
      alt: 'Confezioni viola, blu e giallo zafferano Lipty Fruit',
      summary: 'Packaging pop ad alto contrasto con character design modulare e codifica cromatica per gamma di frutta liofilizzata.'
    },
    {
      id: '14',
      title: 'Super Coffee',
      client: 'Super Caffeine Labs',
      category: 'CAMPAGNE',
      city: 'Madrid',
      year: '2024',
      color: '#7A3B21',
      img: 'assets/cacao-burst.jpg',
      pos: 'center 46%',
      alt: 'Still life ad alta velocità con barattolo immerso in polvere di cacao',
      summary: 'Key visual di prodotto ad alta velocità con polvere di cacao in sospensione e direzione illuminotecnica calda da studio.'
    },
    {
      id: '15',
      title: 'Rossa Outdoor',
      client: 'Rossa Ottica',
      category: 'CAMPAGNE',
      city: 'Barcellona',
      year: '2025',
      color: '#D93829',
      img: 'assets/outdoor-red.jpg',
      pos: 'center 45%',
      alt: 'Pensilina stradale vermiglio con ritratto editoriale Rossa Outdoor',
      summary: 'Campagna di affissioni e pensiline monocromatiche vermiglio per il lancio estivo della linea solare Rossa Ottica.'
    }
  ];

  const HERO_PLATES = [
    { id: '01', code: 'CK\n25.', kicker: 'PACKAGING' },
    { id: '02', code: 'MK\n25.', kicker: 'IDENTITY' },
    { id: '04', code: 'VL\n25.', kicker: 'PACKAGING' },
    { id: '15', code: 'RS\n25.', kicker: 'CAMPAGNE' }
  ];

  const header = document.getElementById('site-header');
  const heroBg = document.getElementById('hero-bg');
  const heroBgWipe = document.getElementById('hero-bg-wipe');
  const heroLeftKicker = document.getElementById('hero-left-kicker');
  const heroLeftCode = document.getElementById('hero-left-code');
  const heroCalloutIdx = document.getElementById('hero-callout-index');
  const heroCalloutTitle = document.getElementById('hero-callout-title');
  const heroCalloutCopy = document.getElementById('hero-callout-copy');
  const heroOpenDossierBtn = document.getElementById('hero-open-dossier');
  const heroPlateCounter = document.getElementById('hero-plate-counter');
  const heroNextBtn = document.getElementById('hero-next-btn');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover)').matches || window.matchMedia('(any-pointer: fine)').matches || !window.matchMedia('(pointer: coarse)').matches;

  // Header scroll state
  const updateHeaderState = () => {
    const heroEl = document.getElementById('hero');
    const threshold = heroEl ? Math.max(120, heroEl.offsetHeight - 100) : 500;
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > threshold);
    }
  };
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  // =========================================================================
  // 1. HERO NEXT PLATE SWITCHER (CLIP-PATH WIPE)
  // =========================================================================
  let heroPlateIdx = 0;
  let isHeroTransitioning = false;

  const applyHeroProject = (plateMeta) => {
    const proj = PROJECTS.find((p) => p.id === plateMeta.id) || PROJECTS[0];
    if (heroLeftKicker) heroLeftKicker.textContent = plateMeta.kicker;
    if (heroLeftCode) heroLeftCode.innerHTML = plateMeta.code.replace('\n', '<br>');
    if (heroCalloutIdx) heroCalloutIdx.textContent = `Progetto ${proj.id} / 15`;
    if (heroCalloutTitle) heroCalloutTitle.textContent = proj.title;
    if (heroCalloutCopy) heroCalloutCopy.textContent = proj.summary;
    if (heroOpenDossierBtn) heroOpenDossierBtn.dataset.projectId = proj.id;
    if (heroPlateCounter) heroPlateCounter.textContent = `TAVOLA 0${heroPlateIdx + 1} / 0${HERO_PLATES.length}`;
    return proj;
  };

  if (heroNextBtn) {
    heroNextBtn.addEventListener('click', () => {
      if (isHeroTransitioning) return;
      heroPlateIdx = (heroPlateIdx + 1) % HERO_PLATES.length;
      const plateMeta = HERO_PLATES[heroPlateIdx];
      const proj = applyHeroProject(plateMeta);

      if (!window.gsap || prefersReducedMotion || !heroBgWipe || !heroBg) {
        if (heroBg) {
          heroBg.src = proj.img;
          heroBg.alt = proj.alt;
          heroBg.style.objectPosition = proj.pos;
        }
        return;
      }

      isHeroTransitioning = true;
      heroBgWipe.src = proj.img;
      heroBgWipe.style.objectPosition = proj.pos;

      window.gsap.set(heroBgWipe, {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 100%)',
        scale: 1.06
      });

      window.gsap.to(heroBgWipe, {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 0.72,
        ease: 'power4.inOut',
        onComplete: () => {
          heroBg.src = proj.img;
          heroBg.alt = proj.alt;
          heroBg.style.objectPosition = proj.pos;
          window.gsap.set(heroBgWipe, { opacity: 0 });
          isHeroTransitioning = false;
        }
      });
    });
  }

  // =========================================================================
  // 2. NATIVE NAVIGATION & CASE STUDY DIALOGS
  // =========================================================================
  const navDialog = document.getElementById('nav-dialog');
  const navOpenBtn = document.getElementById('nav-open-btn');
  const navCloseBtn = document.getElementById('nav-close-btn');

  if (navDialog && navOpenBtn && navCloseBtn) {
    navOpenBtn.addEventListener('click', () => {
      navOpenBtn.setAttribute('aria-expanded', 'true');
      navDialog.showModal();
    });
    navCloseBtn.addEventListener('click', () => navDialog.close());
    navDialog.addEventListener('close', () => {
      navOpenBtn.setAttribute('aria-expanded', 'false');
    });
    navDialog.addEventListener('click', (e) => {
      if (e.target === navDialog) navDialog.close();
    });
    navDialog.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => navDialog.close());
    });
  }

  // Case Dossier Dialog
  const caseDialog = document.getElementById('case-dialog');
  const caseCloseBtn = document.getElementById('case-close-btn');
  const casePrevBtn = document.getElementById('case-prev-btn');
  const caseNextBtn = document.getElementById('case-next-btn');
  const caseDialogImg = document.getElementById('case-dialog-img');
  const caseDialogIndex = document.getElementById('case-dialog-index');
  const caseDialogTitle = document.getElementById('case-dialog-title');
  const caseDialogSummary = document.getElementById('case-dialog-summary');
  const caseSpecClient = document.getElementById('case-spec-client');
  const caseSpecCat = document.getElementById('case-spec-cat');
  const caseSpecCity = document.getElementById('case-spec-city');
  const caseSpecYear = document.getElementById('case-spec-year');
  const caseSpecSwatch = document.getElementById('case-spec-swatch');
  const caseSpecColor = document.getElementById('case-spec-color');
  let activeCaseIndex = 0;

  const renderCaseDialog = (idx) => {
    activeCaseIndex = (idx + PROJECTS.length) % PROJECTS.length;
    const p = PROJECTS[activeCaseIndex];
    if (caseDialogImg) {
      caseDialogImg.src = p.img;
      caseDialogImg.alt = p.alt;
      caseDialogImg.style.objectPosition = p.pos;
    }
    if (caseDialogIndex) caseDialogIndex.textContent = `PROGETTO ${p.id} / 15`;
    if (caseDialogTitle) caseDialogTitle.textContent = p.title;
    if (caseDialogSummary) caseDialogSummary.textContent = p.summary;
    if (caseSpecClient) caseSpecClient.textContent = p.client;
    if (caseSpecCat) caseSpecCat.textContent = p.category;
    if (caseSpecCity) caseSpecCity.textContent = p.city;
    if (caseSpecYear) caseSpecYear.textContent = p.year;
    if (caseSpecSwatch) caseSpecSwatch.style.backgroundColor = p.color;
    if (caseSpecColor) caseSpecColor.textContent = p.color;
  };

  // =========================================================================
  // 3. TX-06 GIANT PREVIEW + RETICLE (MANDATORY SCROLL & LEAVE HARDENING)
  // =========================================================================
  const archiveIndex = document.getElementById('archive-index');
  const previewEl = document.getElementById('archive-preview');
  const previewImg = document.getElementById('archive-preview-img');
  const previewMeta = document.getElementById('archive-preview-meta');
  const previewCat = document.getElementById('archive-preview-cat');
  const reticleEl = document.getElementById('archive-reticle');

  let previewXTo = null;
  let previewYTo = null;
  let reticleXTo = null;
  let reticleYTo = null;
  let isPreviewActive = false;
  let lastMoveScrollY = window.scrollY;
  let lastPointerX = -1;
  let lastPointerY = -1;
  let suppressPreviewUntilMove = false;

  const hidePreview = () => {
    if (!previewEl) return;
    isPreviewActive = false;
    if (window.gsap && !prefersReducedMotion) {
      window.gsap.to(previewEl, {
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.15,
        overwrite: 'auto'
      });
      if (reticleEl) {
        window.gsap.to(reticleEl, {
          autoAlpha: 0,
          duration: 0.12,
          overwrite: 'auto'
        });
      }
    } else {
      previewEl.style.opacity = '0';
      previewEl.style.visibility = 'hidden';
      if (reticleEl) {
        reticleEl.style.opacity = '0';
        reticleEl.style.visibility = 'hidden';
      }
    }
  };

  const hidePreviewOnScroll = () => {
    const currentY = window.scrollY;
    if (Math.abs(currentY - lastMoveScrollY) > 1) {
      lastMoveScrollY = currentY;
      suppressPreviewUntilMove = true;
      hidePreview();
    }
  };

  const positionPreview = (clientX, clientY) => {
    if (!previewEl) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pw = previewEl.offsetWidth || 380;
    const ph = previewEl.offsetHeight || 480;

    let targetX = clientX + 34;
    if (targetX + pw > vw - 24) {
      targetX = Math.max(24, clientX - pw - 34);
    }
    let targetY = clientY - ph * 0.45;
    targetY = Math.max(72, Math.min(vh - ph - 24, targetY));

    if (previewXTo && previewYTo) {
      previewXTo(targetX);
      previewYTo(targetY);
    } else {
      previewEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    }

    if (reticleEl) {
      if (reticleXTo && reticleYTo) {
        reticleXTo(clientX - 11);
        reticleYTo(clientY - 11);
      } else {
        reticleEl.style.transform = `translate3d(${clientX - 11}px, ${clientY - 11}px, 0)`;
      }
    }
  };

  if (archiveIndex && previewEl && isFinePointer) {
    const showRowPreview = (btn, e) => {
      if (window.innerWidth < 900 || !btn) return;
      const isFocusTrigger = e && e.type === 'focus';
      const hasPointerCoords = e && typeof e.clientX === 'number';
      const pointerMoved = hasPointerCoords &&
        (Math.abs(e.clientX - lastPointerX) > 2 || Math.abs(e.clientY - lastPointerY) > 2);
      const scrolledUnderCursor = Math.abs(window.scrollY - lastMoveScrollY) > 1;

      if (!isFocusTrigger && (suppressPreviewUntilMove || scrolledUnderCursor) && !pointerMoved) {
        suppressPreviewUntilMove = true;
        lastMoveScrollY = window.scrollY;
        hidePreview();
        return;
      }

      suppressPreviewUntilMove = false;
      lastMoveScrollY = window.scrollY;
      if (hasPointerCoords) {
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
      }

      const { img, pos, title, meta, cat } = btn.dataset;
      if (previewImg && img) {
        if (previewImg.getAttribute('src') !== img) {
          previewImg.src = img;
        }
        previewImg.alt = title || '';
        previewImg.style.objectPosition = pos || 'center 50%';
      }
      if (previewMeta) previewMeta.textContent = meta || '';
      if (previewCat) previewCat.textContent = cat || '';

      const rect = btn.getBoundingClientRect();
      const cx = hasPointerCoords && e.clientX > 0 ? e.clientX : rect.left + rect.width * 0.52;
      const cy = hasPointerCoords && e.clientY > 0 ? e.clientY : rect.top + rect.height * 0.5;
      positionPreview(cx, cy);

      isPreviewActive = true;
      if (window.gsap && !prefersReducedMotion) {
        window.gsap.to(previewEl, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.24,
          ease: 'power3.out',
          overwrite: 'auto'
        });
        if (reticleEl) {
          window.gsap.to(reticleEl, {
            autoAlpha: 1,
            duration: 0.18,
            overwrite: 'auto'
          });
        }
      } else {
        previewEl.style.opacity = '1';
        previewEl.style.visibility = 'visible';
      }
    };

    archiveIndex.addEventListener('mouseleave', hidePreview);
    window.addEventListener('scroll', hidePreviewOnScroll, { passive: true });
    window.addEventListener('blur', hidePreview);

    archiveIndex.addEventListener('mousemove', (e) => {
      const moved = Math.abs(e.clientX - lastPointerX) > 2 || Math.abs(e.clientY - lastPointerY) > 2;
      if (moved) {
        suppressPreviewUntilMove = false;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
        lastMoveScrollY = window.scrollY;
      }
      if (suppressPreviewUntilMove) return;

      const hoveredBtn = e.target && e.target.closest ? e.target.closest('.archive-row-btn') : null;
      if (hoveredBtn && !isPreviewActive) {
        showRowPreview(hoveredBtn, e);
      } else if (isPreviewActive) {
        positionPreview(e.clientX, e.clientY);
      }
    });

    archiveIndex.querySelectorAll('.archive-row-btn').forEach((btn) => {
      btn.addEventListener('mouseenter', (e) => showRowPreview(btn, e));
      btn.addEventListener('focus', (e) => showRowPreview(btn, e));
      btn.addEventListener('blur', hidePreview);
    });
  }

  // Open Dossier from any row button or Hero button
  const openProjectDossierById = (projId) => {
    hidePreview();
    const idx = PROJECTS.findIndex((p) => p.id === projId);
    renderCaseDialog(idx >= 0 ? idx : 0);
    if (caseDialog) caseDialog.showModal();
  };

  document.querySelectorAll('[data-project-id]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openProjectDossierById(trigger.dataset.projectId);
    });
  });

  if (caseDialog && caseCloseBtn && casePrevBtn && caseNextBtn) {
    caseCloseBtn.addEventListener('click', () => caseDialog.close());
    casePrevBtn.addEventListener('click', () => renderCaseDialog(activeCaseIndex - 1));
    caseNextBtn.addEventListener('click', () => renderCaseDialog(activeCaseIndex + 1));
    caseDialog.addEventListener('click', (e) => {
      if (e.target === caseDialog) caseDialog.close();
    });
  }

  // =========================================================================
  // 4. MECHANICAL 1PX FILTER BAR (TUTTI / PACKAGING / IDENTITY / CAMPAGNE)
  // =========================================================================
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  const archiveItems = Array.from(document.querySelectorAll('.archive-item'));
  const archiveStatus = document.getElementById('archive-status');

  const applyFilter = (category) => {
    hidePreview();
    let visibleCount = 0;

    archiveItems.forEach((item) => {
      const match = category === 'ALL' || item.dataset.category === category;
      item.hidden = !match;
      if (match) visibleCount += 1;
    });

    filterBtns.forEach((btn) => {
      const active = btn.dataset.filter === category;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (archiveStatus) {
      const padded = String(visibleCount).padStart(2, '0');
      archiveStatus.textContent = `MOSTRATI ${padded} / 15`;
    }

    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter || 'ALL'));
  });

  document.querySelectorAll('[data-jump-filter]').forEach((link) => {
    link.addEventListener('click', () => {
      applyFilter(link.dataset.jumpFilter || 'ALL');
    });
  });

  // =========================================================================
  // 5. GSAP + SCROLLTRIGGER + LENIS CHOREOGRAPHY TRIAD (M6 + M7 + TX-06)
  // =========================================================================
  if (!window.gsap || !window.ScrollTrigger) return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  // Initialize quickTo when GSAP is ready
  if (previewEl && isFinePointer) {
    previewXTo = gsap.quickTo(previewEl, 'x', { duration: 0.32, ease: 'power3.out' });
    previewYTo = gsap.quickTo(previewEl, 'y', { duration: 0.32, ease: 'power3.out' });
  }
  if (reticleEl && isFinePointer) {
    reticleXTo = gsap.quickTo(reticleEl, 'x', { duration: 0.14, ease: 'power3.out' });
    reticleYTo = gsap.quickTo(reticleEl, 'y', { duration: 0.14, ease: 'power3.out' });
  }

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    let lenis = null;
    if (window.Lenis) {
      lenis = new window.Lenis({
        lerp: 0.09,
        smoothWheel: true
      });
      lenis.on('scroll', () => {
        ScrollTrigger.update();
        updateHeaderState();
        hidePreviewOnScroll();
      });
      const rafTick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(rafTick);
      gsap.ticker.lagSmoothing(0);
    }

    // M6. Curtain Reveal in Hero + Counter-Drift Display
    const curtainEl = document.getElementById('hero-curtain');
    if (curtainEl && heroBg) {
      gsap.fromTo(
        curtainEl,
        { clipPath: 'inset(12% 0% 12% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.05,
          ease: 'power4.inOut',
          clearProps: 'clipPath'
        }
      );
      gsap.fromTo(
        heroBg,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.3,
          ease: 'power3.out',
          clearProps: 'transform'
        }
      );
    }

    gsap.to('.typo-left-bleed', {
      xPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.9
      }
    });
    gsap.to('.typo-right-display', {
      xPercent: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.9
      }
    });

    // Smooth internal anchor scrolling synced with Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: 0 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    return () => {
      if (lenis) lenis.destroy();
    };
  });

  // M7. Pinned Editorial Split (Desktop >= 900px only)
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    const splitWrap = document.querySelector('[data-pin-split]');
    const pinMedia = document.querySelector('[data-pin-media]');
    const chapters = gsap.utils.toArray('.manifesto-chapter');
    const plates = gsap.utils.toArray('.pin-plate');
    const pinCounter = document.getElementById('pin-counter');
    const pinLabel = document.getElementById('pin-label');
    const pinProgress = document.getElementById('pin-progress');

    const activateChapter = (idx) => {
      plates.forEach((pl, pIdx) => pl.classList.toggle('is-active', pIdx === idx));
      chapters.forEach((ch, cIdx) => ch.classList.toggle('is-active', cIdx === idx));
      if (pinCounter) pinCounter.textContent = `0${idx + 1} / 03`;
      const activeCh = chapters[idx];
      if (pinLabel && activeCh && activeCh.dataset.label) {
        pinLabel.textContent = activeCh.dataset.label;
      }
      if (pinProgress) {
        pinProgress.style.transform = `scaleX(${((idx + 1) / 3).toFixed(3)})`;
      }
    };

    if (splitWrap && pinMedia) {
      ScrollTrigger.create({
        trigger: splitWrap,
        start: 'top 92px',
        end: 'bottom bottom',
        pin: pinMedia,
        pinSpacing: false,
        invalidateOnRefresh: true
      });
    }

    chapters.forEach((chapter, idx) => {
      ScrollTrigger.create({
        trigger: chapter,
        start: 'top 52%',
        end: 'bottom 48%',
        onEnter: () => activateChapter(idx),
        onEnterBack: () => activateChapter(idx)
      });
    });
  });
});
