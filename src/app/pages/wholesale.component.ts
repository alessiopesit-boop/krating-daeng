import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'sf-wholesale',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TPipe],
  template: `
    <main>
      <section class="page-banner">
        <div class="page-banner-inner">
          <div>
            <div class="breadcrumb"><a routerLink="/">{{ 'Home' | t }}</a> / {{ 'Wholesale' | t }}</div>
            <h1>{{ 'Wholesale' | t }}</h1>
          </div>
        </div>
      </section>
      <section class="static-page paper-bg">
        <div class="section-inner static-content">
          <p class="static-lead">{{ 'Programma wholesale dedicato a bar, palestre Muay Thai, ristoranti thailandesi, negozi di gastronomia asiatica e specialty store.' | t }}</p>
          <h3>{{ 'Cosa offriamo' | t }}</h3>
          <ul>
            <li>{{ 'Casse intere da 12 e 24 bottiglie, etichetta originale 1974.' | t }}</li>
            <li>{{ 'Programma di vuoto a rendere: 0,15 € a bottiglia restituita pulita.' | t }}</li>
            <li>{{ 'Listino dedicato in base ai volumi mensili.' | t }}</li>
            <li>{{ 'Spedizione da Milano in 48-72h sul territorio italiano.' | t }}</li>
          </ul>
          <h3>{{ 'Come iniziare' | t }}</h3>
          <p>{{ 'Scrivici a' | t }} <a href="mailto:wholesale@sueafai.it">wholesale&#64;sueafai.it</a> {{ "con partita IVA, indirizzo di consegna e una stima dei volumi mensili. Rispondiamo con listino e minimi d'ordine entro un giorno lavorativo." | t }}</p>
        </div>
      </section>
    </main>
  `,
})
export class WholesaleComponent {
  constructor() {
    inject(SeoService).setPageMeta({
      title: 'Wholesale',
      description: "Programma wholesale Suea Fai per bar, palestre Muay Thai, ristoranti thai e specialty store. Casse intere, vuoto a rendere, spedizione 48-72h dal magazzino di Milano.",
      path: '/wholesale',
    });
  }
}
