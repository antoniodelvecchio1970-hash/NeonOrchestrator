/**
 * LEMMA Studio — Level 4 Motion & Interaction (Triad TX-03 + M1 + M10)
 * Strictly preserves :root tokens and DOM hierarchy.
 */

const CASES = [
  {
    id: '01',
    client: 'Kalt Objects',
    subtitle: 'Materia e Luce',
    meta: '01 · BASILEA · 2024 · ARREDO & LUCE',
    desc: 'Per la manifattura svizzera di corpi illuminanti Kalt Objects abbiamo ridefinito l’architettura di marca intorno al silenzio della materia: ottone brunito, vetro colato e legno carbonizzato. Il catalogo cartaceo e la direzione fotografica lavorano esclusivamente su un’unica fonte luminosa radente.',
    deliverables: [
      'Brand architecture e sistema di nomenclatura prodotto',
      'Direzione artistica still-life in camera oscura',
      'Monografia tecnica stampata a due toni Pantone',
      'Showroom index digitale con schede fotometriche'
    ],
    img: 'assets/images/case-01-kalt.jpg',
    alt: 'Oggetti scultorei e ceramiche opache illuminati da luce radente'
  },
  {
    id: '02',
    client: 'Fondazione Chiaroscuro',
    subtitle: 'Architetture del Vuoto',
    meta: '02 · TORINO · 2025 · MUSEO & MOSTRA',
    desc: 'Istituzione dedicata all’arte concettuale e alla scultura brutalista in un’ex fonderia torinese. Il sistema visivo nasce dalle proporzioni del calcestruzzo a vista: una gabbia tipografica serrata unita a un carattere serif inciso per titoli di sala, manifesti urbani e guide di mostra.',
    deliverables: [
      'Identità istituzionale e manuale grafico museale',
      'Segnaletica architettonica in acciaio brunito',
      'Sistema di collana per i quaderni delle mostre temporanee',
      'Piattaforma digitale per calendario, archivio e biglietteria'
    ],
    img: 'assets/images/case-02-chiaroscuro.jpg',
    alt: 'Volumi monumentali a sbalzo in calcestruzzo sotto cielo coperto'
  },
  {
    id: '03',
    client: 'Edizioni Calce',
    subtitle: 'Collana Monografica',
    meta: '03 · MILANO · 2025 · SISTEMI EDITORIALI',
    desc: 'Edizioni Calce pubblica saggi di teoria architettonica e monografie di studi europei. Abbiamo progettato una griglia svizzera a dodici colonne applicabile su tre formati librari, con dorsetti numerati e copertine in tela grezza impressa a secco.',
    deliverables: [
      'Sistema editoriale multiformato per 18 titoli inaugurali',
      'Progettazione caratteri e gerarchia apparati critici',
      'Packaging di spedizione in cartone riciclato non sbiancato',
      'Archivio online indicizzato per architetto, luogo e anno'
    ],
    img: 'assets/images/case-03-calce.jpg',
    alt: 'Sale espositive in cemento a vista con illuminazione zenitale'
  },
  {
    id: '04',
    client: 'Atelier Nove',
    subtitle: 'Silenzio Tessile AW25',
    meta: '04 · MILANO / PARIGI · 2024 · MODA & ART DIRECTION',
    desc: 'Per la presentazione Autunno/Inverno 2025 di Atelier Nove tra Milano e Parigi, abbiamo costruito una narrazione visiva spogliata di ornamento: figure isolate dentro architetture monumentali in cemento, raccolte in un lookbook cucito a filo refe.',
    deliverables: [
      'Art direction campagna fotografica AW25',
      'Lookbook editoriale tiratura limitata (600 copie)',
      'Etichette tessute, sigilli e scatole rigide da boutique',
      'Esperienza digitale stagionale e archivio look'
    ],
    img: 'assets/images/case-04-atelier-nove.jpg',
    alt: 'Figura in abiti sartoriali su scalinata monumentale in cemento'
  },
  {
    id: '05',
    client: 'Vetro & Silice',
    subtitle: 'Edizioni Numerate',
    meta: '05 · MURANO / ZURIGO · 2024 · PACKAGING CULTURALE',
    desc: 'Collezione di vasi e oggetti funzionali soffiati a bocca su disegno d’autore. Il progetto unisce custodia protettiva a doppio strato minerale e tracciatura tipografica progressiva per certificare ogni singolo pezzo tra fornace muranese e gallerie svizzere.',
    deliverables: [
      'Design strutturale packaging culturale in cellulosa minerale',
      'Sistema di certificazione e marcatura laser numerata',
      'Schede tecniche bilingue italiano / tedesco',
      'Vetrina digitale per edizioni da collezione'
    ],
    img: 'assets/images/case-05-vetro-silice.jpg',
    alt: 'Contenitore scultoreo scuro in luce direzionale su fondo ossidiana'
  },
  {
    id: '06',
    client: 'Biennale del Suono',
    subtitle: 'Partitura Urbana',
    meta: '06 · LUGANO · 2023 · RASSEGNA CULTURALE',
    desc: 'Rassegna biennale dedicata all’acustica architettonica e alla musica elettroacustica contemporanea. Una partitura di filetti e proporzioni matematiche traduce in stampa outdoor, programmi tascabili e interfaccia web la scansione temporale dei concerti.',
    deliverables: [
      'Sistema visivo e manifesti 70×100 cm in serigrafia bicolore',
      'Programma di sala tascabile con mappa acustica dei luoghi',
      'Motion direction essenziale per schermi di foyer',
      'Programma digitale interattivo con filtri per sede e orario'
    ],
    img: 'assets/images/case-06-biennale.jpg',
    alt: 'Facciata contemporanea scura tagliata da un fascio di luce diagonale'
  }
];

/* ==========================================================================
   Modern Top-Layer Dialog Helpers (modern-web-guidance)
   ========================================================================== */

let supportsDisplayTransition;
let lenisInstance = null;

function canTransitionDisplay() {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
    return false;
  }
  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = 'none';
  supportsDisplayTransition = getComputedStyle(probe).display === 'block';
  probe.remove();
  return supportsDisplayTransition;
}

function supportsTopLayerExit() {
  return Boolean(window.CSS?.supports?.('overlay', 'auto') && canTransitionDisplay());
}

async function closeTopLayer(dialog) {
  if (!dialog || !dialog.open) return;
  if (!supportsTopLayerExit()) {
    dialog.setAttribute('data-closing', '');
    const animations = dialog.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((resolve) => setTimeout(resolve, 420))
      ]);
    }
    if (!dialog.hasAttribute('data-closing')) return;
    dialog.removeAttribute('data-closing');
  }
  dialog.close();
}

function setupDialogLightDismiss(dialog) {
  if (!dialog) return;

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeTopLayer(dialog);
  });

  dialog.addEventListener('close', () => {
    lenisInstance?.start();
    if (dialog.id === 'menuDialog') {
      const btn = document.getElementById('openMenuBtn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });

  if (!('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const inside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!inside) {
        closeTopLayer(dialog);
      }
    });
  }
}

/* ==========================================================================
   DOM Initialization & Interactive Flows
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const menuDialog = document.getElementById('menuDialog');
  const caseDialog = document.getElementById('caseDialog');
  const openMenuBtn = document.getElementById('openMenuBtn');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  let activeCaseIndex = 0;

  setupDialogLightDismiss(menuDialog);
  setupDialogLightDismiss(caseDialog);

  function renderCaseModal(idx) {
    activeCaseIndex = (idx + CASES.length) % CASES.length;
    const item = CASES[activeCaseIndex];
    document.getElementById('caseDialogKicker').textContent = item.meta;
    document.getElementById('caseDialogTitle').textContent = item.client;
    document.getElementById('caseDialogSubtitle').textContent = item.subtitle;
    document.getElementById('caseDialogDesc').textContent = item.desc;

    const listEl = document.getElementById('caseDialogList');
    listEl.innerHTML = '';
    item.deliverables.forEach((line) => {
      const li = document.createElement('li');
      li.textContent = line;
      listEl.appendChild(li);
    });

    const imgEl = document.getElementById('caseDialogImg');
    imgEl.src = item.img;
    imgEl.alt = item.alt;
  }

  function openCaseById(caseId) {
    const idx = CASES.findIndex((c) => c.id === caseId);
    renderCaseModal(idx >= 0 ? idx : 0);
    lenisInstance?.stop();
    caseDialog.showModal();
  }

  document.querySelectorAll('[data-open-case]').forEach((btn) => {
    btn.addEventListener('click', () => openCaseById(btn.dataset.openCase));
  });

  document.getElementById('casePrevBtn')?.addEventListener('click', () => renderCaseModal(activeCaseIndex - 1));
  document.getElementById('caseNextBtn')?.addEventListener('click', () => renderCaseModal(activeCaseIndex + 1));

  openMenuBtn?.addEventListener('click', () => {
    openMenuBtn.setAttribute('aria-expanded', 'true');
    lenisInstance?.stop();
    menuDialog.showModal();
  });

  document.querySelectorAll('[data-close-dialog]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.closeDialog);
      closeTopLayer(target);
    });
  });

  function scrollToAnchor(targetSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    let dest = target;
    if (target.classList.contains('curtain-panel') && typeof ScrollTrigger !== 'undefined') {
      const st = ScrollTrigger.getAll().find((t) => t.trigger === target && t.pin);
      if (st) {
        dest = st.start;
      } else if (target.parentElement?.classList.contains('pin-spacer')) {
        dest = target.parentElement.getBoundingClientRect().top + window.scrollY;
      }
    }
    if (lenisInstance) {
      lenisInstance.scrollTo(dest, { duration: 1.05 });
    } else if (typeof dest === 'number') {
      window.scrollTo({ top: dest, behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  document.querySelectorAll('[data-menu-link]').forEach((link) => {
    link.addEventListener('click', async (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      await closeTopLayer(menuDialog);
      scrollToAnchor(href);
    });
  });

  document.querySelectorAll('.rail-dot, .scroll-cue, .corner-brand, .footer-links a').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        event.preventDefault();
        scrollToAnchor(href);
      }
    });
  });

  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    const name = document.getElementById('senderName').value.trim();
    formStatus.textContent = `Richiesta registrata per ${name}. Risposta dallo studio di Milano entro 24 ore lavorative.`;
    contactForm.reset();
  });

  /* ========================================================================
     Level 4 Motion — Approved Triad Only (TX-03 + M1 + M10)
     ======================================================================== */

  if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  // Header scroll separation (lightweight state toggle)
  ScrollTrigger.create({
    start: 'top -72',
    onEnter: () => document.getElementById('siteHeader')?.classList.add('is-scrolled'),
    onLeaveBack: () => document.getElementById('siteHeader')?.classList.remove('is-scrolled')
  });

  // Active Rail State across all sections (works cleanly regardless of reduced motion)
  const railLabel = document.getElementById('railActiveLabel');
  const railDots = Array.from(document.querySelectorAll('.rail-dot'));
  const stageProgress = document.getElementById('stageProgress');
  const stageCounter = document.getElementById('stageCounter');
  const stageFill = document.getElementById('stageFill');

  function setActiveRail(sectionId, labelText, stageNum) {
    if (railLabel && labelText) railLabel.textContent = labelText;
    railDots.forEach((dot) => {
      dot.classList.toggle('is-active', dot.dataset.railTarget === sectionId);
    });
    if (stageCounter && stageFill && stageProgress) {
      const num = stageNum !== null && stageNum !== undefined ? Number(stageNum) : 0;
      if (num >= 1) {
        stageProgress.classList.add('is-visible');
        stageCounter.textContent = `${stageNum} / 06`;
        gsap.to(stageFill, { scaleX: num / 6, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
      } else {
        stageProgress.classList.remove('is-visible');
      }
    }
  }

  document.querySelectorAll('section[data-chapter], article[data-chapter]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 52%',
      end: 'bottom 52%',
      onEnter: () => setActiveRail(sec.id, sec.dataset.chapter, sec.dataset.stageNum),
      onEnterBack: () => setActiveRail(sec.id, sec.dataset.chapter, sec.dataset.stageNum)
    });
  });

  // Reduced-motion-safe Choreography
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (typeof window.Lenis !== 'undefined') {
      lenisInstance = new Lenis({ lerp: 0.09, smoothWheel: true });
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // A. TX-03 Outline-to-Solid Hero Entrance & Chapter Headings
    const heroFills = document.querySelectorAll('.hero-display .tx03-fill');
    if (heroFills.length) {
      gsap.fromTo(
        heroFills,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.15 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.15,
          stagger: 0.14,
          ease: 'expo.out',
          clearProps: 'clipPath'
        }
      );
    }

    gsap.utils.toArray('.tx03-num').forEach((numEl) => {
      gsap.from(numEl, {
        opacity: 0.2,
        y: 12,
        duration: 0.75,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: numEl, start: 'top 86%', once: true }
      });
    });

    // Global rail progress bar (scaleY)
    const railFill = document.getElementById('railProgressFill');
    if (railFill) {
      gsap.fromTo(
        railFill,
        { scaleY: 0.06 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.4 }
        }
      );
    }

    // C. M10 Magnetic Reticle Cursor (Desktop fine pointer only)
    const reticle = document.getElementById('reticleCursor');
    const reticleText = document.getElementById('reticleText');
    let onMove = null;
    let onLeave = null;

    if (reticle && window.matchMedia('(pointer: fine) and (hover: hover)').matches) {
      const xTo = gsap.quickTo(reticle, 'x', { duration: 0.28, ease: 'power3.out' });
      const yTo = gsap.quickTo(reticle, 'y', { duration: 0.28, ease: 'power3.out' });

      onMove = (e) => {
        reticle.classList.add('is-active');
        xTo(e.clientX - 7);
        yTo(e.clientY - 7);
        const target = e.target.closest('[data-cursor]');
        if (target && reticleText) {
          reticleText.textContent = target.dataset.cursor;
          reticle.classList.add('is-engaged');
        } else {
          reticle.classList.remove('is-engaged');
        }
      };

      onLeave = () => reticle.classList.remove('is-active', 'is-engaged');

      window.addEventListener('mousemove', onMove, { passive: true });
      document.addEventListener('mouseleave', onLeave);
    }

    return () => {
      if (onMove) window.removeEventListener('mousemove', onMove);
      if (onLeave) document.removeEventListener('mouseleave', onLeave);
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    };
  });

  // B. M1 Full-Screen Curtain Reveal (Desktop >= 960px & no-preference only)
  mm.add('(min-width: 960px) and (prefers-reduced-motion: no-preference)', () => {
    const panels = gsap.utils.toArray('.curtain-panel');
    const triggers = [];

    panels.forEach((panel, index) => {
      if (index === panels.length - 1) return;
      const veil = panel.querySelector('.panel-dim-veil');
      const inner = panel.querySelector('.panel-inner');

      const st = ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        onUpdate: (self) => {
          if (veil) gsap.set(veil, { opacity: self.progress * 0.48 });
          if (inner) gsap.set(inner, { scale: 1 - self.progress * 0.035 });
        }
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      panels.forEach((panel) => {
        const veil = panel.querySelector('.panel-dim-veil');
        const inner = panel.querySelector('.panel-inner');
        if (veil) gsap.set(veil, { clearProps: 'opacity' });
        if (inner) gsap.set(inner, { clearProps: 'scale' });
      });
    };
  });
});
