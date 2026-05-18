# CLAUDE.md

Istruzioni per Claude Code (e qualunque altro assistente AI compatibile) che lavora su questo repo. Questo file viene caricato automaticamente all'inizio di ogni sessione dalla root del progetto, quindi vale come "memoria di progetto" condivisa.

## Regola d'oro: tieni aggiornati CLAUDE.md e README.md

**Ogni volta che modifichi il codice in modo non banale, aggiorna anche questo file (CLAUDE.md)** se la modifica:

- introduce o rimuove una dipendenza, uno script npm, una route, una pagina, un servizio core o un componente di chrome;
- cambia una convenzione (naming, struttura cartelle, prefisso selettori, pattern signal/effect, persistenza in `localStorage`, ecc.);
- cambia il flusso utente principale (home, shop, PDP, checkout, conferma);
- aggiunge una nuova lingua, palette o "tweak" runtime;
- modifica il comportamento di build/dev/test;
- introduce un vincolo non ovvio (workaround, bug noto, limite di un'API).

**Aggiorna anche `README.md`** quando una modifica e' significativa per chi legge il repo da fuori (chiunque apra il sorgente su GitHub): nuova feature visibile, cambio di comandi (npm scripts), cambio di stack o di flusso di sviluppo, nuovo URL del sito, requisiti di setup. Il README e' la facciata pubblica del progetto, deve restare sintetico ma aggiornato.

Se la modifica e' una piccola correzione (typo, refactor locale, rinomina di una variabile privata, fix CSS puntuale), **non** serve aggiornare ne' CLAUDE.md ne' README. In dubbio: aggiorna CLAUDE.md (interno) e valuta se anche README (esterno).

Aggiornare significa: modificare la sezione gia' esistente che descrive l'area toccata. Non aggiungere log di modifiche o changelog qui, il `git log` e' l'unica fonte di verita' per la cronologia.

## Cos'e' il progetto

E-commerce single-page per il brand "Krating Daeng" (krating-daeng / กระทิงแดง, "toro rosso"). Sito vetrina + carrello + checkout fittizio. Tre lingue di contenuto (it default, en via dizionario, frammenti thai decorativi). Tono estetico: muay-thai / Bangkok anni '70.

Niente backend: tutto in-memory, persistenza via `localStorage` per carrello, lingua e tweaks visivi.

## Stack

- **Angular 19.2**, standalone components, `ChangeDetectionStrategy.OnPush` ovunque.
- **Signals** (`signal`, `effect`) per stato reattivo. Niente NgRx, niente RxJS oltre a quello che serve al router.
- **Routing**: `provideRouter` con path location standard (no `#` nelle URL) e scroll restoration "top". Su GitHub Pages il refresh su una route deep funziona via `public/404.html`: quando Pages non trova il path sul filesystem serve il 404, che codifica l'URL richiesto in `sessionStorage` e fa redirect a `/krating-daeng/`. Lo script in `src/index.html` ripristina il path originale via `history.replaceState` prima del bootstrap Angular.
- **Styling**: SCSS globale in `src/styles.scss` (file unico, ~44KB). I componenti usano template inline e classi globali, niente CSS scoped per componente. Variabili tema via `data-palette` e `data-thai` su `<html>` (vedi `TweaksService`).
- **Build/test**: Angular CLI standard (`@angular-devkit/build-angular`), Karma + Jasmine per gli unit test.
- **Niente lint configurato**, niente Prettier nel repo, niente Husky. Editor config in `.editorconfig`.

## Struttura

```
src/app/
  app.component.ts        # shell: nav + router-outlet + footer + cart-drawer
  app.config.ts           # provideRouter con hash location e scroll restoration
  app.routes.ts           # tutte le route con loadComponent (lazy)
  chrome/                 # UI persistente: nav, footer, cart-drawer, lang-toggle
  core/                   # stato e dati: cart/lang/tweaks service, products, phrases, lang.pipe, build-info
  illustrations/          # SVG inline come componenti (logo, tiger, sun-burst, ecc.)
  pages/                  # una component per route (home, shop, pdp, checkout, confirm, storia, muay-thai, faq, not-found)
  shared/                 # pezzi riusati tra pagine (product-card, faq-list, muay-thai-section, faq-data)
scripts/                  # script Node usati come npm hook (postinstall, prestart, prebuild)
```

### Convenzioni

- **Selettori**: prefisso `sf-` (es. `sf-nav`, `sf-product-card`). Mantienilo.
- **Template inline** nei componenti, niente file `.html` separati. Stesso per gli stili (vedi sopra: stili globali).
- **Standalone components** sempre. Niente NgModule.
- **Lazy loading** di ogni pagina via `loadComponent: () => import(...)`. Quando aggiungi una pagina, segui lo stesso pattern in `app.routes.ts`.
- **Stato globale**: signal dentro un service `@Injectable({ providedIn: 'root' })`. Effetto in costruttore per side-effect (DOM, localStorage). Vedi `TweaksService` e `LangService` come modello.
- **Persistenza `localStorage`**: sempre dentro `try/catch` (ambienti senza storage). Chiavi con prefisso `sf-` (`sf-tweaks`, `sf-lang`, e per il carrello vedi `CartService`).
- **i18n**: contenuto sorgente in italiano nei template. Per testi tradotti usare la pipe `lang` (vedi `core/lang.pipe.ts`) che cerca in `PHRASES` (`core/phrases.ts`); se manca la voce inglese si torna all'italiano. Quando aggiungi testo nuovo destinato all'utente, aggiungi la coppia in `PHRASES`.
- **Prodotti**: catalogo statico in `core/products.ts`. Le immagini stanno in `public/images/` (la cartella `public/` viene servita come root statica da Angular CLI 19+: un file `public/images/x.png` e' raggiungibile come `images/x.png`). Non usare il vecchio percorso `assets/images/...`, non sarebbe servito.

### Servizi core (cosa fanno)

- `CartService` (`core/cart.service.ts`): righe carrello con quantita', persistenza locale, totale derivato via signal.
- `LangService` (`core/lang.service.ts`): switch `it`/`en`, dizionario `PHRASES`, metodo `t(itText)` con fallback all'originale e preservazione di whitespace ai bordi.
- `TweaksService` (`core/tweaks.service.ts`): pannello di tweaks runtime per palette (`red`/`yellow`/`black`), presenza ornamenti thai (`heavy`/`light`/`off`), animazione hero (`rays`/`bulls`/`static`). Scrive `data-palette` e `data-thai` su `<html>`; gli stili globali reagiscono a quegli attributi.
- `SeoService` (`core/seo.service.ts`): wrapper di `Title` + `Meta` di Angular. Ogni componente pagina nel costruttore chiama `setPageMeta({ title, description, path, ogImage?, noIndex?, asIs? })` per settare title del documento, meta description, OpenGraph e Twitter card. In `BUILD_CONTEXT === 'dev'` il title viene prefissato con `[dev] `. Per pagine non indicizzabili (checkout, conferma, 404) passare `noIndex: true`. PDP aggiorna i meta via `effect()` quando cambia il prodotto.

### Build info (dev vs release)

`core/build-info.ts` espone `APP_VERSION`, `BUILD_CONTEXT` (`'dev'` o `'release'`) e `BUILD_SHA` (hash short del commit, solo in dev). Il footer e il `document.title` lo usano per distinguere visivamente le build di sviluppo da quelle pubblicate:

- In **dev** (default, `npm start`): footer mostra `v1.0.1 · dev · abc1234`, document title prefissato con `[dev] ...`.
- In **release** (build di produzione, CI): footer mostra solo `v1.0.1`, niente prefisso al title, comportamento utente invariato.

Il meccanismo:

- `src/app/core/build-info.ts` (committato): consumato dal codice, importa `BUILD_SHA` dal file local-only.
- `src/app/core/build-info.prod.ts` (committato): sostituisce `build-info.ts` in configuration `production` via `fileReplacements` di `angular.json`. Non importa `build-sha.local.ts`, ha `BUILD_CONTEXT = 'release'` e `BUILD_SHA = ''`.
- `src/app/core/build-sha.local.ts` (gitignored): contiene solo `export const BUILD_SHA = '<sha>'`. Autogenerato da `scripts/write-build-sha.mjs` ad ogni `npm install`/`start`/`build` (npm scripts `postinstall`/`prestart`/`prebuild`). Se git non e' disponibile, fallback a `'unknown'`.
- `scripts/write-build-sha.mjs`: legge `git rev-parse --short HEAD` e scrive il file.

Se modifichi questa logica: ricordati che il file `build-info.prod.ts` deve esistere e avere la stessa shape esportata, altrimenti il build di produzione fallisce.

## Comandi

```bash
npm start          # ng serve, dev server su http://localhost:4200
npm run build      # build di produzione in dist/
npm run watch      # build dev con --watch
npm test           # Karma + Jasmine (non sono presenti spec custom, solo quelli generati)
```

Non e' configurato `ng e2e`, non c'e' un comando di lint.

## Branching e Pull Request

Flow stile GitHub Flow: niente push diretti su `main`, tutto passa da una PR.

### Branch

Crea sempre un branch dal `main` aggiornato. Prefissi convenzionali (servono solo a te per orientarti, non c'e' validazione automatica):

- `feat/<slug>`: feature nuova rivolta all'utente.
- `fix/<slug>`: bugfix.
- `chore/<slug>`: lavori interni (build, CI, dipendenze, riordino).
- `docs/<slug>`: modifiche solo a documentazione (incluso CLAUDE.md).
- `refactor/<slug>`: refactor a comportamento invariato.

Esempi: `feat/testimonial-section`, `fix/pdp-price-recalc`, `chore/bump-angular-19.3`.

### Commit: Conventional Commits + body discorsivo

Tutti i commit (e i titoli delle PR) seguono [Conventional Commits](https://www.conventionalcommits.org/).

- Il **subject** e' la riga breve e tecnica, sempre nel formato `tipo(scope opzionale): cosa`. Serve a release-please per capire il tipo di cambio (bump version) e per generare il **bullet** dell'indice nella GitHub Release (subject ripulito del prefisso e capitalizzato).
- Il **body** e' una **descrizione user-facing breve, 1-2 frasi**, dal punto di vista di chi visita il sito (non dello sviluppatore). Niente nomi di file, regole CSS, signal/effect, regex e altro jargon tecnico a meno che non sia il punto. Compare nella sezione "Dettagli" della GitHub Release sotto il titoletto omonimo.

Anti-esempi di body troppo tecnici:

- ❌ `Sostituito flex-wrap: nowrap con flex-wrap: wrap nelle media query a 640px su .filter-block.` (chi visita non sa cosa sia flex-wrap)
- ✅ `Su mobile i filtri ora vanno a capo invece di scrollare fuori schermo a destra.`

- ❌ `Aggiunto SeoService che usa Title e Meta service di Angular, chiamato nei constructor delle pagine con setPageMeta({ title, description, path }).` (e' un how-to per il dev)
- ✅ `Ogni pagina ora ha titolo, descrizione e tag Open Graph dedicati. La condivisione su social mostra un'anteprima coerente con quella pagina.`

**Niente hard-wrap a 72 caratteri** nel body. La vecchia convenzione "git da terminale" spezza le righe a 72 chars, ma GitHub Flavored Markdown rende ogni newline singolo come `<br>` nelle Release: le frasi appaiono spezzate a metà. Scrivi **una frase per riga lunga** (anche 200 chars, non importa), e separa i paragrafi con una **riga vuota**. Lo step Python nel workflow `release.yml` ha comunque un `unwrap_paragraphs()` che ricongiunge i wrap, ma e' un cerotto: meglio non spezzarle alla fonte.

Tipi e mapping:

| Tipo | Bump | Appare nella Release? | Etichetta |
|---|---|---|---|
| `feat:` | MINOR | si | Novita' |
| `fix:` | PATCH | si | Correzioni |
| `perf:` | PATCH | si | Performance |
| `refactor:` | PATCH | si | Refactor |
| `chore:` | nessuno | no | (storia git) |
| `docs:` | nessuno | no | (storia git) |
| `test:` | nessuno | no | (storia git) |
| `ci:`, `build:`, `style:` | nessuno | no | (storia git) |
| `feat!:` o `BREAKING CHANGE:` nel body | MAJOR | si, in cima | Modifiche incompatibili |

Esempio di commit per una nuova feature (caso tipico, raccomandato). Subject tecnico, body user-facing breve, niente wrap a 72 chars:

```
feat(home): aggiunta sezione testimonial

Tre citazioni da palestre Muay Thai sulla home, con anteprime e foto. Mostrate anche in thailandese sotto la versione italiana per i visitatori da Bangkok.
```

Cosa esce nella GitHub Release con l'attuale formato (indice in cima, dettagli sotto):

```
## In sintesi

**Novita'**
- Aggiunta sezione testimonial

---

## Dettagli

### Aggiunta sezione testimonial

Tre citazioni da palestre Muay Thai sulla home, con anteprime e foto. Mostrate anche in thailandese sotto la versione italiana per i visitatori da Bangkok.
```

Notare: nessun `feat(home): ...` letterale visibile. Il bullet in cima viene dal subject ripulito + capitalizzato; il blocco dettaglio in fondo prende il body discorsivo.

Body **consigliato sempre** per `feat:`, `fix:`, `perf:`, `refactor:`. Se proprio manca (cambio piccolissimo e ovvio), il workflow fa un fallback: usa il subject ripulito del prefisso e capitalizzato. Esempio: `fix(footer): typo nel copyright` senza body diventa nella Release "Typo nel copyright.". Funziona ma e' meno bello: meglio scrivere il body.

### Merge: squash sempre

Strategia per le PR: **Squash and merge**.

- Il **titolo della PR** = subject del commit squashato = Conventional Commit. release-please lo legge da li'.
- Il **body della PR** = body del commit squashato = descrizione discorsiva. La Release lo prende da qui.

Quindi quando apri la PR cura titolo **e** descrizione: insieme diventano il commit, da cui release-please costruisce la release. La PR e' la fonte di verita'.

### Setup repo: gia' applicato via API

Le impostazioni del repo (merge strategy, commit message di default, auto-delete branch, branch protection su `main`, workflow permissions) **sono gia' state applicate** via API con un PAT fine-grained dell'account `alessiopesit-boop`. Stato corrente:

- Merge: solo squash merging. `Allow merge commits` e `Allow rebase merging` disattivati.
- Default commit message dello squash: `PR_TITLE` + `PR_BODY`. Il commit su `main` eredita titolo e descrizione della PR.
- `Automatically delete head branches`: attivo (i branch sono auto-cancellati dopo il merge).
- Branch protection su `main`: PR obbligatoria (0 review richiesti), `Require linear history` attivo, `Allow force pushes` e `Allow deletions` disattivati.
- Workflow permissions: `Read and write` con `Allow GitHub Actions to create and approve pull requests` attivo (serve a release-please per aprire la Release PR).

Se per qualunque ragione queste impostazioni venissero modificate a mano, si possono riapplicare via `gh api` (richiede PAT con `Administration: write` sul repo); il payload e' visibile nei commit dei chore che le hanno introdotte.

## Versioning

Schema [SemVer](https://semver.org): `MAJOR.MINOR.PATCH`. La fonte di verita' e' il campo `version` in `package.json` (e `.release-please-manifest.json`). Da li' il footer la legge a build-time e la mostra sul sito.

### Rilascio: lo fa release-please, non tu

Il rilascio e' completamente automatizzato dal workflow `.github/workflows/release.yml`, che usa [release-please](https://github.com/googleapis/release-please). Punto importante da tenere a mente: **la Release PR non la apri tu**, te la trovi gia' aperta dal bot. E **il numero di versione non lo scegli tu**, lo calcola il bot in base ai tipi dei commit accumulati dopo l'ultimo tag (`fix:` => PATCH, `feat:` => MINOR, `BREAKING CHANGE` => MAJOR).

Cosa succede in pratica:

1. Mergi su `main` un commit `feat:` o `fix:` (qualunque commit "rilasciabile" secondo Conventional Commits).
2. Il workflow `release.yml` parte ad ogni push su `main`. release-please apre **automaticamente** una PR speciale tipo `chore(main): release X.Y.Z` che contiene:
   - bump di `package.json` e `.release-please-manifest.json`;
   - aggiornamento di `CHANGELOG.md` con i commit dell'ultimo ciclo, raggruppati per tipo (Features, Bug Fixes, ecc.).
3. Quella Release PR **resta aperta** e **si auto-aggiorna** ogni volta che mergi su `main` un nuovo commit. Se il commit e' rilasciabile, viene incluso nelle note e (se serve) cambia il bump (es. da PATCH a MINOR). Se e' `chore:` / `docs:` / `ci:` / `test:` viene mergiato comunque su `main`, fara' parte del tag finale, ma non comparira' nelle release notes ne' influenzera' il numero di versione.
4. **La tua unica decisione** e' quando rilasciare: quando ti sembra ci sia abbastanza materiale, mergi la Release PR. Solo allora release-please:
   - crea il tag git (`vX.Y.Z` con la `v`);
   - crea la GitHub Release;
   - lo step finale del workflow **riscrive il body della Release** in due sezioni: **In sintesi** in cima (bullet con il subject ripulito per ogni voce, raggruppati per tipo: Novita', Correzioni, Performance, Refactor, Modifiche incompatibili) e **Dettagli** sotto (titoletti `###` con il body discorsivo, solo per le voci che hanno un body). Risultato: chi legge a colpo d'occhio vede l'indice; chi scrolla trova le descrizioni umane.

Cosa NON apparira' mai nella Release PR perche' release-please li ignora dal bumping:

- `chore:`, `docs:`, `ci:`, `build:`, `style:`, `test:`, `refactor:` (eccezione: `refactor` appare comunque nelle note come "Refactor", ma non bumpa MAJOR).
- I commit di release-please stesso (`chore(main): release X.Y.Z`).

Quindi se mergi solo `chore:` / `docs:` la Release PR **non viene aperta**. Serve almeno un commit `fix:` / `feat:` / `perf:` da quando e' uscito l'ultimo tag.

Cose che **non** devi fare a mano (rispetto a prima):

- Bump di `package.json`: no, lo fa release-please.
- Tag git: no, lo fa release-please.
- Modifiche a `CHANGELOG.md`: no, lo riscrive release-please. Eccezione: se vuoi correggere un refuso o aggiungere una nota a posteriori, puoi farlo in una PR separata di tipo `docs:`.

Modi di forzare la prossima versione (raramente serve):

- Commenta nella Release PR con `Release-As: 1.5.0` (o `release-as: 1.5.0`) per forzare un numero di versione preciso.
- `feat!:` o `BREAKING CHANGE:` in body di un commit forza un bump MAJOR.

### Convenzioni tag

- Prefisso `v` (`v1.0.0`, non `1.0.0`).
- Suffisso (`v1.1.0-beta.1`) farebbe prerelease, ma con release-please base non si usa: per prerelease serve config dedicato (non attivo qui).

## Deploy: GitHub Pages

Pubblicazione su `https://alessiopesit-boop.github.io/krating-daeng/` via GitHub Actions, workflow `.github/workflows/deploy.yml`.

**Trigger: solo Release pubblicata** (`on: release: types: [published]`). Cioe': quando mergi la Release PR di release-please nasce un tag + una GitHub Release; quel `release: published` fa partire il deploy. **I merge su `main` da soli non vanno live**: questa e' una scelta deliberata, cosi' il sito in produzione coincide sempre con un tag e la versione mostrata nel footer non e' mai "falsa" (= sempre allineata al `package.json` di quel tag).

Conseguenze pratiche:

- Tra una release e l'altra, `main` accumula PR mergiate ma il sito live resta alla versione precedente. Per vedere l'ultimo `main` non rilasciato, build locale (`npm start` o `npm run build`).
- Se proprio serve mostrare a qualcuno un'anteprima di `main` non ancora rilasciato (demo, screenshot), si lancia a mano `Actions > Deploy to GitHub Pages > Run workflow` (trigger `workflow_dispatch`). Va considerato un'eccezione, non la norma.
- Per rilasciare in fretta dopo aver mergiato qualche PR, basta mergiare anche la Release PR che release-please tiene aperta: il deploy parte subito dopo.

Cose da sapere se lo modifichi:

- Il build di produzione viene fatto con `--base-href=/krating-daeng/`: lo richiede il fatto che il sito vive su un sottopath del dominio `*.github.io`. Se cambia il nome del repo, va aggiornato anche qui.
- L'output di Angular 19 con builder `application` finisce in `dist/krating-daeng/browser/`: e' la cartella caricata come artifact Pages.
- `public/404.html` e' il fallback SPA "rafgraph-style": GitHub Pages lo serve per qualunque path inesistente, lui salva `location.pathname + search + hash` in `sessionStorage.sf-redirect` e redireziona a `/krating-daeng/`. `src/index.html` legge quel valore prima del bootstrap Angular e ripristina l'URL via `history.replaceState`. Cosi' i deep link `/krating-daeng/shop` funzionano anche al refresh diretto. Viene copiato automaticamente nel `dist/` come asset.
- `.nojekyll` viene creato dal workflow per impedire a Pages di processare i file via Jekyll.
- Prima pubblicazione: in *Settings > Pages* del repo va scelto "Source: GitHub Actions" una volta sola.

## Vincoli e cose da non fare

- **Non** introdurre RxJS observable per stato applicativo: usa signal/effect. RxJS resta ammesso solo dove serve a integrare API Angular che lo richiedono.
- **Non** convertire a CSS scoped per componente senza un buon motivo: lo styling globale e' una scelta, non un'omissione.
- **Non** rimuovere lo script SPA-fallback in `src/index.html` ne' lo script di `public/404.html` senza aver configurato un'alternativa al routing path-location: rompe il refresh diretto su route diverse da `/`.
- **Non** committare `dist/`, `node_modules/`, `.angular/cache` (gia' in `.gitignore`).

## Quando aggiungi una pagina nuova

1. Crea `src/app/pages/<nome>.component.ts` come standalone component (template inline, OnPush, selettore `sf-<nome>-page` o simile).
2. Aggiungi la route in `app.routes.ts` con `loadComponent`.
3. Se serve un link nel menu, aggiorna `chrome/nav.component.ts`.
4. Se ci sono stringhe nuove rivolte all'utente, aggiungi la traduzione `en` in `core/phrases.ts`.
5. **Aggiorna questo file** se la pagina introduce un nuovo concetto (categoria di pagina, dipendenza, pattern).

## Note operative per l'assistente

- Quando ti viene chiesto di "fare X" rispondi in italiano (il proprietario lavora in italiano).
- Niente em-dash (`—`) e niente freccia (`→`) nei file di questo repo, ne' nei messaggi: usa virgole, due punti, parentesi, o parole ("a", "verso", "diventa").
- Prima di marcare un task come finito, lancia `npm run build` (o almeno `npm start` e controlla console) per essere sicuro che compili.
