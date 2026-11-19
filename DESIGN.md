# DESIGN.md — CASA TINTA (Direzione 03 · Monumental Chroma & Split Typography)

## 1. Identità, Posizionamento & Isolation
- **Studio:** **CASA TINTA** — Studio indipendente di brand identity, packaging design e campagne visive.
- **Sedi operative:** **Barcellona** (Carrer de Pujades 118, Poblenou) & **Torino** (Via Madama Cristina 42, San Salvario).
- **Fondazione:** 2018 — **Marta Soler** (Direzione Artistica & Packaging) & **Matteo Rinaldi** (Sistemi Visivi & Campagne).
- **Contatto:** `hola@casatinta.eu`
- **Vincolo Isolation:** Brand 100% fittizio e autonomo; zero riferimenti a persone o sedi estranee al brief.

---

## 2. Sistema Cromatico (Photo-First Extraction)

Tutti i colori derivano direttamente dai pigmenti reali delle 15 fotografie in `assets/`:

| Token CSS | Valore | Ruolo | Contrasto / Nota |
| :--- | :--- | :--- | :--- |
| `--paper` | `#F7F3EC` | Superficie carta calda primaria | Sfondo Manifesto & Archivio |
| `--paper-alt` | `#EFE9DF` | Superficie secondaria | Frame immagini & hover tabellare |
| `--ink` | `#161412` | Inchiostro primario & Footer monumentale | Contrasto > 15:1 su `--paper` |
| `--ink-muted` | `#5C564F` | Metadati & label editoriali | WCAG AA ≥ 6.5:1 su `--paper` |
| `--hero-bg` | `#1B1218` | Base stage scuro Hero full-bleed | Fusione fotografica |
| `--line` | `rgba(22, 20, 18, 0.14)` | Filetti editoriali `1px` | Griglia Print-First |
| `--line-strong` | `rgba(22, 20, 18, 0.28)` | Filetti strutturali barra filtri | Gabbia meccanica `1px` |
| `--line-light` | `rgba(247, 243, 236, 0.18)` | Filetti su fondo `#161412` | Footer & overlay |
| `--saffron` | `#F4BE0B` | Accento primario Hero (cornice & `/` & underline CTA) | Estratto da `cocco-yellow.jpg` |
| `--vermilion` | `#D93829` | Accento operativo Archivio, progress & focus | Estratto da `outdoor-red.jpg` |
| `--cobalt` | `#0C3EA8` | Pigmento secondario di sistema | Estratto da `moko-cobalt.jpg` |
| `--coral` | `#F05D3B` | Pigmento caldo complementare | Estratto da `pack-lineup.jpg` |

---

## 3. Tipografia & Scala (`clamp()`, Max 2 Famiglie)

- **Display Editorial (Serif ad alto contrasto):** `'Bodoni Moda', Georgia, serif` (`opsz 6..96`, pesi `400 / 500 / 600`).
- **UI & Body Copy (Sans svizzero):** `'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif` (pesi `400 / 500 / 700`).
- **Numerazione tabellare:** `font-variant-numeric: tabular-nums` applicata allo stesso `DM Sans` / `Bodoni Moda` su tutti gli indici (`01 / 15`), anni e filtri.
- **Scala & Tensione ≥ 10:1:**
  - Hero Display `<h1>`: `clamp(4.1rem, 9.8vw, 9.4rem)`, `line-height: 0.85`, `letter-spacing: -0.025em`.
  - Statement `<h2>`: `clamp(2rem, 3.8vw, 3.6rem)`, `line-height: 1.06`.
  - Body Copy: `clamp(0.95rem, 1.05vw, 1.0625rem)` (`15–17px`), misura rigorosa `48ch–62ch`, `line-height: 1.72`.
  - Micro-label: `10px–11px`, uppercase, `letter-spacing: 0.20em–0.28em`, peso `500–700`.

---

## 4. Architettura Strutturale (Zero 4-Card Strip)

1. **Header Fisso (`site-header`):** Marchio `CASA TINTA / BCN · TORINO` con cornice rettangolare gialla (`15×22px`, `2.5px solid #F4BE0B`), navigazione essenziale (`Manifesto`, `Archivio`, `Contatti`) e trigger circolare (`···`) verso `<dialog id="nav-dialog">`. Transizione netta a carta calda traslucida una volta superata la Hero.
2. **Hero Dir 03 (`100svh`, NO 4-Card Strip):** Fotografia full-bleed (`cocco-yellow.jpg`), scrim radiale/lineare a 4 livelli, watermark sinistro tagliato (`CK 25.`), titolo monumentale `CASA / TINTA.` con `/` zafferano, selettore circolare `NEXT` (4 plate Hero con transizione `clip-path` wipe) e callout in basso del progetto attivo con CTA `ESPLORA`.
3. **Manifesto Asimmetrico & Pinned Editorial Split (`#manifesto`):** Intestazione a 12 colonne con *Colonna del Silenzio* (`col 1–4` solo micro-label, `col 5–12` statement + copy) seguita da split `5 : 1 : 6` dove la tavola `4:5` a sinistra resta pinnata durante lo scorrimento dei 3 capitoli (`01 Materia & Pigmento`, `02 Sistema & Segno`, `03 Presenza Urbana`).
4. **Archivio Lavori Interattivo (`#archivio`, 15 Progetti):** Intestazione asimmetrica + barra filtri meccanica a filetti `1px` senza spazi orfani (`TUTTI (15)`, `PACKAGING (07)`, `IDENTITY (04)`, `CAMPAGNE (04)` + cella stato `MOSTRATI`) + indice tipografico full-width a 15 righe con anteprima gigante al cursore (`TX-06`) incorniciata da reticle e dossier completo in `<dialog id="case-dialog">` nativo.
5. **Footer Monumentale (`#contatti`):** Cambio netto a fondo `#161412`, contatti essenziali per Barcellona e Torino (`hola@casatinta.eu`) e wordmark `CASA / TINTA.` a piena larghezza `100vw`.

---

## 5. Triade Motion `A + B + C` (Inedita vs `.recent_motion.json`)

- **A · Hero Entrance (`M6 Curtain Reveal in Hero`):** Apertura a sipario `clip-path: inset(100% 0% 0% 0%) → inset(0% 0% 0% 0%)` con decompressione scala immagine `1.08 → 1.0` e counter-drift orizzontale tra `CK 25.` e `CASA / TINTA.`.
- **B · Primary Scroll Mechanic (`M7 Pinned Editorial Split`):** Colonna media `4:5` pinnata via `ScrollTrigger` (`min-width: 900px`) che cambia tavola fotografica e barra progresso `1px` al passaggio tra i 3 capitoli del Manifesto.
- **C · Micro-Interaction / Archive UI (`TX-06 Reticle & Giant Image-Pop Archive`):** Preview fotografica gigante ancorata al cursore con `gsap.quickTo` e corner reticle `1px`, abbinata a barra filtri meccanica `1px` e spegnimento istantaneo (`autoAlpha: 0`) su `mouseleave` e `scroll` (Lenis + window).

---

## 6. Mappa dei 15 Artefatti Locali (`assets/`)

| # | Progetto | Disciplina | Sede | Anno | Pigmento | Asset (`assets/`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `01` | **Cocco Botánica** | `PACKAGING` | Lisbona | `2025` | `#F4BE0B` | `assets/cocco-yellow.jpg` |
| `02` | **Mōko Cacao** | `IDENTITY` | Barcellona | `2025` | `#0C3EA8` | `assets/moko-cobalt.jpg` |
| `03` | **Dune Roasters** | `IDENTITY` | Torino | `2025` | `#9E5130` | `assets/dune-coffee.jpg` |
| `04` | **Velne Parfums** | `PACKAGING` | Marsiglia | `2025` | `#5E5B24` | `assets/velne-boxes.jpg` |
| `05` | **Equipp Audio** | `PACKAGING` | Zurigo | `2024` | `#B67E53` | `assets/equipp-box.jpg` |
| `06` | **Nova Orbit** | `CAMPAGNE` | Milano | `2025` | `#0F9EB0` | `assets/orbit-campaign.jpg` |
| `07` | **Docta Botanicals** | `PACKAGING` | Ginevra | `2024` | `#E59824` | `assets/docta-tins.webp` |
| `08` | **Onda Street** | `CAMPAGNE` | Torino | `2025` | `#D4A51A` | `assets/street-campaign.jpg` |
| `09` | **Solera Lineup** | `PACKAGING` | Valencia | `2024` | `#D96846` | `assets/pack-lineup.jpg` |
| `10` | **Fork & Flame** | `IDENTITY` | Bologna | `2025` | `#1E3F33` | `assets/fork-flame.jpg` |
| `11` | **Borgo Mercato** | `PACKAGING` | Parma | `2024` | `#1B7D82` | `assets/borgo-bags.png` |
| `12` | **Alpe Coofs** | `IDENTITY` | Bolzano | `2024` | `#E88B72` | `assets/alpe-bags.jpg` |
| `13` | **Lipty Fruit** | `PACKAGING` | Barcellona | `2025` | `#6D2DA6` | `assets/lipty-fruit.jpg` |
| `14` | **Super Coffee** | `CAMPAGNE` | Madrid | `2024` | `#7A3B21` | `assets/cacao-burst.jpg` |
| `15` | **Rossa Outdoor** | `CAMPAGNE` | Barcellona | `2025` | `#D93829` | `assets/outdoor-red.jpg` |
