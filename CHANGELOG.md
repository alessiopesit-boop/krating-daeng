# Changelog

Tutti i cambiamenti significativi a questo progetto sono documentati in questo file.

Il formato segue [Keep a Changelog](https://keepachangelog.com/it-IT/1.1.0/) e questo progetto adotta [Semantic Versioning](https://semver.org/lang/it/).

## [1.0.2](https://github.com/alessiopesit-boop/krating-daeng/compare/v1.0.1...v1.0.2) (2026-05-18)


### Bug Fixes

* **home:** layout mobile della homepage ([#10](https://github.com/alessiopesit-boop/krating-daeng/issues/10)) ([02e884b](https://github.com/alessiopesit-boop/krating-daeng/commit/02e884b33b34e4a41cbc2d5e373f19307d729693))
* **release:** release notes con titoletti e propagazione deploy ([#8](https://github.com/alessiopesit-boop/krating-daeng/issues/8)) ([e9bc434](https://github.com/alessiopesit-boop/krating-daeng/commit/e9bc434fb8c4c561414e64d9ef5b6e5adbe29e04))
* **shop:** layout mobile della pagina shop ([#11](https://github.com/alessiopesit-boop/krating-daeng/issues/11)) ([8b80706](https://github.com/alessiopesit-boop/krating-daeng/commit/8b807060c149ce46f4d7543ad271be74ddd03919))

## [1.0.1](https://github.com/alessiopesit-boop/krating-daeng/compare/v1.0.0...v1.0.1) (2026-05-16)


### Bug Fixes

* 404 redirect bug e nuova pagina brand-coerente ([#4](https://github.com/alessiopesit-boop/krating-daeng/issues/4)) ([68746cb](https://github.com/alessiopesit-boop/krating-daeng/commit/68746cb505fd9288e0fc35ca35cc9b932c609978))
* favicon e titolo del documento ([#1](https://github.com/alessiopesit-boop/krating-daeng/issues/1)) ([6720c4b](https://github.com/alessiopesit-boop/krating-daeng/commit/6720c4b7d5026795b920f744dafd5f5ab990b920))
* **i18n:** completa traduzioni e copy italiano ([#3](https://github.com/alessiopesit-boop/krating-daeng/issues/3)) ([2aaa099](https://github.com/alessiopesit-boop/krating-daeng/commit/2aaa099ae70d777b715b313ba249202d91ff80ab))
* rimuovi pannello tweaks runtime dal sito ([#2](https://github.com/alessiopesit-boop/krating-daeng/issues/2)) ([3ed9bd8](https://github.com/alessiopesit-boop/krating-daeng/commit/3ed9bd8997c2d4cae318549be499afa12a21f9c3))

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
