import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'sf-termini',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TPipe],
  template: `
    <main>
      <section class="page-banner">
        <div class="page-banner-inner">
          <div>
            <div class="breadcrumb"><a routerLink="/">{{ 'Home' | t }}</a> / {{ 'Termini' | t }}</div>
            <h1>{{ 'Termini' | t }}</h1>
          </div>
        </div>
      </section>
      <section class="static-page paper-bg">
        <div class="section-inner static-content">
          <p class="static-lead">{{ "Termini di utilizzo del sito Suea Fai. Il sito e\\' una vetrina dimostrativa: il checkout e\\' una simulazione, nessun ordine reale viene processato." | t }}</p>
          <h3>{{ 'Natura del sito' | t }}</h3>
          <p>{{ "Suea Fai (krating-daeng) e\\' un progetto open-source di vetrina, basato su un brand fittizio ispirato al tonico energetico thailandese del 1974. Tutti i contenuti, prezzi, immagini e descrizioni hanno scopo dimostrativo." | t }}</p>
          <h3>{{ 'Acquisti' | t }}</h3>
          <p>{{ "Il flusso di checkout non addebita nulla a nessuna carta o conto: e\\' una simulazione che termina con una pagina di conferma fittizia. Nessun prodotto viene effettivamente spedito." | t }}</p>
          <h3>{{ 'Proprieta\\' intellettuale' | t }}</h3>
          <p>{{ "Il codice del sito e\\' rilasciato sotto licenza open-source. I marchi e i nomi citati appartengono ai rispettivi proprietari." | t }}</p>
        </div>
      </section>
    </main>
  `,
})
export class TerminiComponent {
  constructor() {
    inject(SeoService).setPageMeta({
      title: 'Termini',
      description: "Termini di utilizzo del sito vetrina Suea Fai: progetto dimostrativo open-source, checkout simulato, nessun ordine reale processato.",
      path: '/termini',
    });
  }
}
