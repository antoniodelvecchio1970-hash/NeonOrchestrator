# DESIGN.md — METRICA Studio (Neon3 · Proposta 03 "Notte Petrolio & Oro Spento")

Brief: sito di uno studio di comunicazione, grafica e design (Torino, identità fittizia). Testi in italiano. Obiettivo: far scegliere lo studio ai lead attraverso una selezione lavori chiara e filtrabile.

## Token
- Colori: `--bg-dark #080B0D` · `--bg-alt #10181B` · `--bg-light #ECEEEB` · `--ink-light #F2F0EB` · `--ink-dark #0D1214` · `--ink-muted #525B5E` · accento `--accent #C99D6B` (`--accent-soft #E3C49D` per micro-label su foto).
- Font (2 famiglie): `Instrument Serif` (display, mai corsivo) + `DM Sans` (UI, `tabular-nums`).
- Scala: H1 `clamp(3rem, 7.4vw, 7.25rem)` lh .94; H2 ambiti `clamp(28px, 3.6vw, 56px)`; micro-label 10px uppercase tracking .16–.28em.
- Margini: `--pad: clamp(20px, 5vw, 80px)`. Spigoli vivi (`border-radius: 0`) ovunque, unica eccezione il cerchio di scroll e il reticolo cursore.

## Struttura (WF_02)
Hero scuro 100svh → camera chiara Opere Selezionate (filmstrip pinned) → 02 · Ambiti Operativi (3 colonne su petrolio, zero filetti) → footer con CTA filettata.

## Motion (triade)
- A · M2 Expanding Frame sull'hero (clip-path `inset(16% 24%)` → `inset(0)` + scale 1.2 → 1).
- B · TX-04/M4 Filmstrip orizzontale scrubbed (`pin`, `scrub: 1`, Lenis `lerp .09`); meta e contatore sincronizzati.
- C · M10 Magnetic Reticle `APRI CASO` (solo `pointer: fine`), barra filtri meccanica 1px.
- `prefers-reduced-motion`: niente Lenis/pin/clip, filmstrip a scroll nativo.

## Anti-slop
Nessuna lista a filetti nel corpo pagina (filetti solo nel menu overlay e nella barra filtri/footer-cols tabellari di contatto), nessun contatore autocelebrativo, nessuna card arrotondata, immagini solo da `./assets/` (percorsi relativi riutilizzati, zero copie).
