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
- **Routing**: `provideRouter` con `withHashLocation()` (URL con `#`, niente server config richiesta) e scroll restoration "top".
- **Styling**: SCSS globale in `src/styles.scss` (file unico, ~44KB). I componenti usano template inline e classi globali, niente CSS scoped per componente. Variabili tema via `data-palette` e `data-thai` su `<html>` (vedi `TweaksService`).
- **Build/test**: Angular CLI standard (`@angular-devkit/build-angular`), Karma + Jasmine per gli unit test.
- **Niente lint configurato**, niente Prettier nel repo, niente Husky. Editor config in `.editorconfig`.

## Struttura

```
src/app/
  app.component.ts        # shell: nav + router-outlet + footer + cart-drawer + tweaks-panel
  app.config.ts           # provideRouter con hash location e scroll restoration
  app.routes.ts           # tutte le route con loadComponent (lazy)
  chrome/                 # UI persistente: nav, footer, cart-drawer, tweaks-panel, lang-toggle
  core/                   # stato e dati: cart.service, lang.service, tweaks.service, products, phrases, lang.pipe
  illustrations/          # SVG inline come componenti (logo, tiger, sun-burst, ecc.)
  pages/                  # una component per route (home, shop, pdp, checkout, confirm, storia, muay-thai, faq, not-found)
  shared/                 # pezzi riusati tra pagine (product-card, faq-list, muay-thai-section, faq-data)
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

- Il **subject** e' la riga breve e tecnica, sempre nel formato `tipo(scope opzionale): cosa`. Serve a release-please per capire il tipo di cambio (bump version) e raggruppare nelle note. **Non appare letteralmente** nella GitHub Release.
- Il **body** e' una **descrizione discorsiva breve**, di solito 1-3 frasi. **E' quello che apparira' nella GitHub Release**, sotto la sezione del tipo (Novita', Correzioni, ecc.). Scrivilo dal punto di vista di chi legge la release: cosa cambia per l'utente, cosa fa la modifica, quando serve saperlo. Niente jargon di file/funzioni a meno che non sia importante.

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

Esempio di commit per una nuova feature (caso tipico, raccomandato):

```
feat(home): aggiunta sezione testimonial

Aggiunge una sezione testimonial sulla home con tre citazioni
da palestre Muay Thai. Le immagini caricano in lazy load e il
layout si adatta al mobile.
```

Cosa esce nella GitHub Release:

```
## Novita'

Aggiunge una sezione testimonial sulla home con tre citazioni
da palestre Muay Thai. Le immagini caricano in lazy load e il
layout si adatta al mobile.
```

Notare: nessun `feat(home): aggiunta sezione testimonial` visibile.

Body **consigliato sempre** per `feat:`, `fix:`, `perf:`, `refactor:`. Se proprio manca (cambio piccolissimo e ovvio), il workflow fa un fallback: usa il subject ripulito del prefisso e capitalizzato. Esempio: `fix(footer): typo nel copyright` senza body diventa nella Release "Typo nel copyright.". Funziona ma e' meno bello: meglio scrivere il body.

### Merge: squash sempre

Strategia per le PR: **Squash and merge**.

- Il **titolo della PR** = subject del commit squashato = Conventional Commit. release-please lo legge da li'.
- Il **body della PR** = body del commit squashato = descrizione discorsiva. La Release lo prende da qui.

Quindi quando apri la PR cura titolo **e** descrizione: insieme diventano il commit, da cui release-please costruisce la release. La PR e' la fonte di verita'.

### Setup repo da fare a mano (una volta sola)

Le impostazioni qui sotto non si possono applicare via workflow di GitHub Actions, perche' il `GITHUB_TOKEN` automatico **non ha permessi `administration`** sul repository. Servirebbe un PAT personale dedicato. Per semplicita' si fanno a mano dal browser, una sola volta, all'apertura del repo:

1. `Settings > General > Pull Requests` (https://github.com/alessiopesit-boop/krating-daeng/settings):
   - lascia attivo **solo** `Allow squash merging` (togli `Allow merge commits` e `Allow rebase merging`);
   - sotto la checkbox squash appare un dropdown `Default commit message`: scegli `Pull request title and description`;
   - piu' in basso: spunta `Automatically delete head branches`.
2. `Settings > Branches > Add classic branch protection rule` con branch name `main`:
   - `Require a pull request before merging` (review count = 0 va bene, sei da solo);
   - `Require linear history`;
   - lascia disattivate `Allow force pushes` e `Allow deletions`.
3. `Settings > Actions > General > Workflow permissions`:
   - `Read and write permissions`;
   - spunta `Allow GitHub Actions to create and approve pull requests` (serve a release-please per aprire la Release PR).

Una volta fatti questi 3 passaggi, il repo e' configurato in modo coerente con tutto il resto.

## Versioning

Schema [SemVer](https://semver.org): `MAJOR.MINOR.PATCH`. La fonte di verita' e' il campo `version` in `package.json` (e `.release-please-manifest.json`). Da li' il footer la legge a build-time e la mostra sul sito.

### Rilascio: lo fa release-please, non tu

Il rilascio e' completamente automatizzato dal workflow `.github/workflows/release.yml`, che usa [release-please](https://github.com/googleapis/release-please).

Cosa succede in pratica:

1. Mergi su `main` un commit `feat:` o `fix:` (qualunque commit "rilasciabile").
2. release-please apre **automaticamente** una PR speciale tipo `chore(main): release X.Y.Z` che contiene:
   - bump di `package.json` e `.release-please-manifest.json`;
   - aggiornamento di `CHANGELOG.md` con i commit dell'ultimo ciclo, raggruppati per tipo (Features, Bug Fixes, ecc.).
3. Quella PR resta aperta e si auto-aggiorna ogni volta che mergi su `main` un nuovo commit rilasciabile.
4. Quando vuoi rilasciare, **mergi la Release PR**. Solo allora release-please:
   - crea il tag git (`vX.Y.Z` con la `v`);
   - crea la GitHub Release;
   - lo step finale del workflow **riscrive il body della Release**: legge i commit del range, prende i body discorsivi (con fallback al subject ripulito se body assente), li raggruppa in sezioni (Novita', Correzioni, Performance, Refactor, Modifiche incompatibili) e sovrascrive il body iniziale generato da release-please. Risultato: una release "umana", senza subject letterali Conventional Commits.

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

Pubblicazione automatica via GitHub Actions, workflow in `.github/workflows/deploy.yml`. Ad ogni push su `main` (o lancio manuale da "Actions") il sito viene buildato e pubblicato su `https://alessiopesit-boop.github.io/krating-daeng/`.

Cose da sapere se lo modifichi:

- Il build di produzione viene fatto con `--base-href=/krating-daeng/`: lo richiede il fatto che il sito vive su un sottopath del dominio `*.github.io`. Se cambia il nome del repo, va aggiornato anche qui.
- L'output di Angular 19 con builder `application` finisce in `dist/krating-daeng/browser/`: e' la cartella caricata come artifact Pages.
- Per sicurezza il workflow copia `index.html` in `404.html` e crea `.nojekyll`: cosi' i deep link funzionano anche se qualcuno togliesse `withHashLocation()`, e Pages non prova a passare i file tramite Jekyll.
- Prima pubblicazione: in *Settings > Pages* del repo va scelto "Source: GitHub Actions" una volta sola.

## Vincoli e cose da non fare

- **Non** introdurre RxJS observable per stato applicativo: usa signal/effect. RxJS resta ammesso solo dove serve a integrare API Angular che lo richiedono.
- **Non** convertire a CSS scoped per componente senza un buon motivo: lo styling globale e' una scelta, non un'omissione.
- **Non** togliere `withHashLocation()` senza configurare un fallback lato server, altrimenti il refresh su route diverse da `/` rompe in produzione statica.
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
