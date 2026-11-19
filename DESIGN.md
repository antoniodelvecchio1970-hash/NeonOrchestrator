# DESIGN.md — LEMMA Studio (Proposta 02 · Dark Chiaroscuro Chapters)

> Specifica esecutiva di Livello 1–2 derivata dalla Blueprint 02 (`dark_layered` · Reference: `trend_38` *Beyond the Horizon*) e subordinata alle regole di `Taste_Library/webdesign_brain/`.

---

## 1. Visual Theme & Atmosphere
- **Archetipo:** *Beyond the Horizon — Dark Stacked Chapters* (`01_LAYOUT_AND_BLUEPRINT.md` §A.8).
- **Atmosfera:** Monolitica, museale, chiaroscurale, editoriale. Superfici ossidiana profonde (`#0A0B0D`) in cui la fotografia architettonica e materica emerge da *negative fill* laterali e verticali come tavole retroilluminate in una camera oscura, senza cornice né bordi arrotondati.
- **Tono di Voce:** Asciutto, autorevole, contemporaneo (italiano editoriale per musei, editori, aziende di design e moda tra Milano e Zurigo).

---

## 2. Color Palette & Roles

Tutte le regole CSS fanno riferimento esclusivamente alle variabili `:root` (zero esadecimali hardcodati nei selettori).

```css
:root {
  --bg: #0A0B0D;
  --bg-rgb: 10, 11, 13;

  --surface: #121317;
  --surface-rgb: 18, 19, 23;
  --surface-elevated: #181A20;

  --ink: #F4F1EC;
  --ink-rgb: 244, 241, 236;
  --ink-secondary: rgba(var(--ink-rgb), 0.74);
  --ink-muted: rgba(var(--ink-rgb), 0.52);

  --hairline: rgba(var(--ink-rgb), 0.14);
  --hairline-strong: rgba(var(--ink-rgb), 0.36);

  --accent: #C9A27A;
  --accent-rgb: 201, 162, 122;
}
```

- **Contrast Budget (WCAG AA+):** `#F4F1EC` su `#0A0B0D` (`~17.6:1`), `rgba(244,241,236,0.74)` su `#0A0B0D` (`~11.2:1`), `#C9A27A` su `#0A0B0D` (`~7.9:1`), `rgba(244,241,236,0.52)` su `#0A0B0D` (`~5.9:1`, sopra `4.5:1` AA).

---

## 3. Typography Rules
- **Font Pairing (Massimo 2 Famiglie):**
  - Display & Titoli: `'Cormorant Garamond', Georgia, serif` (pesi `400`, `500`)
  - Body, Navigazione & Metadati: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` (pesi `300`, `400`, `500`, con `font-variant-numeric: tabular-nums`)
- **Google Fonts URL:**
  `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Inter:wght@300;400;500&display=swap`
- **Scala Gerarchica (`clamp()`):**
  - **Hero H1 (`Oltre il Segno Visibile`):** `clamp(3.35rem, 6.2vw, 5.75rem)` · `line-height: 0.95` · `letter-spacing: -0.015em`
  - **Chapter / Section H2:** `clamp(2.35rem, 3.8vw, 3.65rem)` · `line-height: 0.98` · `letter-spacing: -0.01em`
  - **Editorial Body (`max-width: 52ch`):** `clamp(0.9375rem, 1.05vw, 1.03125rem)` · `line-height: 1.68` · peso `300`
  - **Micro-Metadati / Indici:** `10px–11px` uppercase · `letter-spacing: 0.20em–0.28em` · `tabular-nums`
- **Divieti:** Zero font script/calligrafici, zero terzo font monospace, zero `text-shadow`, zero corsivo lezioso forzato nei titoli.

---

## 4. Component Stylings (Print-First · `border-radius: 0`)
- **Corner Brand & Header (`site-header`):** Fixed top edge con monogramma geometrico `22×18` + `LEMMA STUDIO` a sinistra e trigger `MENU ——` a destra (`min-height: 44px`). Su scroll acquisisce separazione sottile (`backdrop-filter: blur(10px)` + `border-bottom: 1px solid var(--hairline)`).
- **Vertical Chapter Rail (`.chapter-rail`):** Rail sinistra fissa su desktop (`>= 960px`) con etichetta sezione attiva (`PROLOGO`, `01`..`06`, `STUDIO`, `ARCHIVIO`, `CONTATTI`), dot di navigazione accessibili (`>= 28px` hit target) e hairline verticale animata via `scaleY`.
- **Curtain Chapter Panel (`.curtain-panel`):** Viewport `100svh`, fotografia `70%` destra con *negative fill* graduale verso `--bg` a sinistra, colonna narrativa sinistra (`max-width: 440px`) con numerale rame (`tabular-nums`), filetto `28px × 1px`, titolo serif, testo e pulsante `ESPLORA IL CASO ——` (`default`, `:hover` allunga il filetto `44px → 64px` e vira il testo a `--accent`, `:focus-visible` outline `1px solid var(--accent)`, `:active` lieve traslazione).
- **Specification Table & Archive Ledger:** Liste e tabelle a filetti orizzontali `1px solid var(--hairline)`, zero background di riempimento card, zero ombre.
- **Print-First Contact Form:** Campi a bordo inferiore `1px solid var(--hairline-strong)`, focus `border-color: var(--accent)`, `<select>` stilizzato coerentemente, pulsante rettangolare `border-radius: 0` `1px solid var(--ink)` con stati `default / hover / active / focus-visible / disabled`.
- **Native Top-Layer `<dialog>` (`menuDialog` e `caseDialog`):** `closedby="any"` + fallback JS click-outside per Safari, `overscroll-behavior: contain` su `dialog:modal` e `dialog::backdrop`, ingresso/uscita discreti via `@starting-style` + `transition-behavior: allow-discrete` + fallback `data-closing`, pulsante esplicito `CHIUDI ×` (`>= 44×44px`).

---

## 5. Layout Principles
- **Griglia:** 12 colonne desktop (`gap: clamp(16px, 2vw, 32px)`, margine orizzontale `clamp(24px, 5vw, 72px)`).
- **Colonna del Silenzio:** Mantenuta esplicitamente nelle sezioni `#studio` (colonna 5 vuota) e `#contatti` (colonna 6 vuota) per preservare almeno `35%` di respiro negativo.
- **Fotografia Full-Bleed:** Nessuna immagine racchiusa in cornici/card arrotondate; tutte le foto toccano il bordo o sfumano senza cuciture nel fondo `#0A0B0D`.

---

## 6. Depth & Elevation
- Profondità costruita esclusivamente tramite piani di luminanza chiaroscurale (`--bg` `#0A0B0D` vs `--surface` `#121317`), gradient scrim continui e sovrapposizione *curtain* dei pannelli (`z-index: 1..7` per i capitoli, `z-index: 10` per le sezioni editoriali inferiori, `z-index: 40` per header/rail).
- **Zero `box-shadow`**, zero blur decorativi sulle sezioni scrollabili.

---

## 7. Animation & Interaction (Triade `A + B + C` Approvata)
- **Dipendenze CDN (`defer`):** `gsap@3.12.5` + `ScrollTrigger@3.12.5` + `lenis@1.1.18`, avvolti in `gsap.matchMedia()`.
- **Triade Esclusiva (`.recent_motion.json`):**
  1. **A — Hero Entrance:** `TX-03 Outline-to-Solid / Chiaroscuro Fade` (sulla hero `<h1>` al caricamento e su numerali/titoli dei capitoli in ingresso viewport).
  2. **B — Primary Scroll Mechanic:** `M1 Full-Screen Curtain Reveal (100vh Stacked Chapters)` su desktop `>= 960px` (`pin: true, pinSpacing: false`), pilotando esclusivamente `opacity` di `.panel-dim-veil` e `scale` di `.panel-inner` (solo proprietà GPU-composited; mai `filter: brightness()`).
  3. **C — Micro-Interaction:** `M10 Magnetic Reticle Cursor + Vertical Chapter Progress` (`gsap.quickTo` attivo solo con `(pointer: fine) and (hover: hover)`, nascosto su dispositivi touch e input).
- **Accessibilità:** Sotto `(prefers-reduced-motion: reduce)` ogni pannello è statico e pienamente leggibile a `opacity: 1` con transizioni discrete ridotte a `0.1s`.

---

## 8. Do's and Don'ts
- **DO:** Usare esclusivamente variabili CSS da `:root` in tutto `style.css`.
- **DO:** Attribuire `fetchpriority="high"` (senza `loading="lazy"`) alla sola immagine LCP dell'Hero; `loading="lazy"` (senza `fetchpriority="low"`) alle foto below-the-fold; `fetchpriority="low"` all'immagine del dialog nascosto.
- **DO:** Nominare proprietà esplicite nelle `transition` CSS (mai `transition: all`).
- **DO:** Rispettare `STRICT BRIEF ISOLATION` con dati 100% fittizi di **LEMMA Studio** (Milano · Zurigo).
- **DON'T:** Inserire Bento Grid, card SaaS, `border-radius > 0` su pannelli/bottoni o pill/badge arrotondati.
- **DON'T:** Aggiungere contatori numerici autocelebrativi (`120+`), loghi partner, icone decorative o timeline da slide deck.
- **DON'T:** Usare `TX-01`, `Keyhole M5/M3` o `TX-06` (vietati dalla rotazione `.recent_motion.json`).
- **DON'T:** Applicare `overflow: hidden` o `position: fixed` su `html`/`body` all'apertura dei `<dialog>`.

---

## 9. Responsive Behavior
- **Desktop (`>= 960px`):** Curtain reveal `100svh` pinnato, rail verticale sinistra visibile, reticolo magnetico attivo su pointer fine, griglia 12 colonne in `#studio` e `#contatti`.
- **Tablet & Mobile (`< 960px` / `<= 600px`):** Scorrimento verticale fluido senza `pin` per prevenire blocchi su touch/8GB RAM; immagini full-bleed con gradiente verticale inferiore continuo per contrasto AA; rail e reticolo nascosti; menu accessibile tramite `MENU ——` con target `>= 44×44px`; zero overflow orizzontale (`scrollWidth <= innerWidth`).
