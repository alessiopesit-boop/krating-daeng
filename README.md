# Krating Daeng / Suea Fai

E-commerce vetrina single-page in Angular 19 per il brand fittizio **Suea Fai** (tigre di fuoco), un tonico energetico thailandese in vetro ambrato ispirato al Krating Daeng del 1974.

**Sito live**: https://alessiopesit-boop.github.io/krating-daeng/

---

## Italiano

### Cos'e'

Catalogo prodotti, scheda prodotto, carrello, checkout fittizio e pagine editoriali (storia del brand, Muay Thai, FAQ). Niente backend: tutto in-memory, persistenza locale via `localStorage`. Contenuti in italiano (default) e inglese tramite dizionario di traduzioni.

### Stack

- **Angular 19.2** con standalone components e `ChangeDetectionStrategy.OnPush`.
- **Signals** (`signal`, `effect`) per lo stato (carrello, lingua, tweaks visivi).
- **Routing** con hash (`withHashLocation()`) e lazy loading per ogni pagina.
- **SCSS globale** in `src/styles.scss`, niente CSS scoped per componente.
- **CI/CD** via GitHub Actions: deploy su GitHub Pages al rilascio di una versione, release-please gestisce versioning automatico.

### Sviluppo locale

```bash
npm install        # una volta
npm start          # dev server su http://localhost:4200
npm run build      # build di produzione in dist/
npm test           # Karma + Jasmine
```

Richiede Node 22 LTS o superiore e npm 10+.

### Contribuire

Per chi lavora al codice (anche un assistente AI), la guida operativa completa, le convenzioni di stile e il flusso di branching, PR e rilasci e' in [`CLAUDE.md`](./CLAUDE.md).

---

## English

### What it is

Single-page e-commerce for **Suea Fai** (fire tiger), a fictional Thai energy tonic in amber glass inspired by the original 1974 Krating Daeng. Product catalog, PDP, cart, mock checkout and editorial pages (brand story, Muay Thai, FAQ). No backend: everything in-memory, local persistence via `localStorage`. Content in Italian (default) and English via a translation dictionary.

### Stack

- **Angular 19.2** with standalone components and `ChangeDetectionStrategy.OnPush`.
- **Signals** (`signal`, `effect`) for state (cart, language, visual tweaks).
- **Hash routing** (`withHashLocation()`) and lazy loading per page.
- **Global SCSS** in `src/styles.scss`, no component-scoped CSS.
- **CI/CD** via GitHub Actions: deploy to GitHub Pages on release, release-please handles versioning automatically.

### Local development

```bash
npm install        # once
npm start          # dev server at http://localhost:4200
npm run build      # production build into dist/
npm test           # Karma + Jasmine
```

Node 22 LTS or newer and npm 10+ required.

### Contributing

Operational guide, code conventions, branching/PR/release flow for anyone (including AI assistants) working on the code are in [`CLAUDE.md`](./CLAUDE.md).
