# Changelog

Tutti i cambiamenti significativi a questo progetto sono documentati in questo file.

Il formato segue [Keep a Changelog](https://keepachangelog.com/it-IT/1.1.0/) e questo progetto adotta [Semantic Versioning](https://semver.org/lang/it/).

## [Unreleased]

## [1.0.0] - 2026-05-15

### Aggiunto

- Prima versione pubblica dell'e-commerce vetrina **Krating Daeng / Suea Fai** in Angular 19.
- Pagine: home, shop, PDP (`product/:id`), checkout, conferma ordine, storia, muay-thai, faq, not-found.
- Stato applicativo via signal e effect (`CartService`, `LangService`, `TweaksService`); persistenza in `localStorage` con chiavi `sf-*`.
- Routing con `withHashLocation()` e lazy loading per pagina.
- Pannello "tweaks" runtime per palette (`red` / `yellow` / `black`), presenza ornamenti thai (`heavy` / `light` / `off`) e animazione hero.
- Localizzazione minimale italiano / inglese via dizionario in `core/phrases.ts` e pipe `lang`.
- Catalogo prodotti statico in `core/products.ts` (bottiglia singola, pack 6, pack 12, bundle poster).
- Deploy automatico su GitHub Pages tramite GitHub Actions (`.github/workflows/deploy.yml`), pubblicato su https://alessiopesit-boop.github.io/krating-daeng/.
- Versione del build mostrata nel footer (letta da `package.json` a build-time).
- `CLAUDE.md` con convenzioni di progetto.

[Unreleased]: https://github.com/alessiopesit-boop/krating-daeng/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/alessiopesit-boop/krating-daeng/releases/tag/v1.0.0
