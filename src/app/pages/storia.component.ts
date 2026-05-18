import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { ThaiOrnamentComponent } from '../illustrations/thai-ornament.component';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'sf-storia',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ThaiOrnamentComponent, TPipe],
  template: `
    <main>
      <section class="page-banner">
        <div class="page-banner-inner">
          <div>
            <div class="breadcrumb"><a routerLink="/">{{ 'Home' | t }}</a> / {{ 'La Storia' | t }}</div>
            <h1>{{ 'La ' | t }}<span class="yellow">{{ 'storia' | t }}</span></h1>
          </div>
        </div>
      </section>

      <section class="origins paper-bg">
        <div class="section-inner origins-grid">
          <aside class="origins-aside">
            <span class="t-eyebrow">{{ '★ 1974 — oggi' | t }}</span>
            <h2 class="origins-title">{{ "Cinquant'anni" | t }}<br /><span class="red">{{ 'in vetro.' | t }}</span></h2>
            <sf-thai-ornament [width]="240" />
            <img src="images/02-bangkok-street.png" alt="Bangkok 1974" style="width:100%;border:3px solid var(--ink);margin-top:1.6rem" />
          </aside>
          <div class="origins-body">
            <p>
              <span class="drop">L</span>{{ "a storia della Suea Fai è la storia di una formula che si è rifiutata di cambiare. Mentre il mondo passava al gas, all'alluminio, agli zuccheri sintetici e alle lattine slim, la nostra bottiglietta di vetro ambrato è rimasta uguale: 150ml, tappo a vite, tre fasce di colore, due tigri sul sole." | t }}
            </p>
            <p>{{ "Quando alla fine degli anni '80 un imprenditore austriaco scoprì la categoria del tonico energetico thailandese in un viaggio a Bangkok, decise di adattarla al gusto occidentale: la diluì, la gassò, le fece imitare le bibite gassate americane. Da quella riformulazione nacquero le energy drink che conosciamo. Suea Fai non ha seguito quella strada. Non poteva. La densità, il vetro, la dolcezza — sono il punto." | t }}</p>
            <p>{{ 'Nel 2026 abbiamo deciso di portare la formula originale in Italia. Stesso tappo. Stesso vetro. Stessa etichetta del 1974 — ridisegnata solo nei caratteri minori per la conformità europea. Stessa ricetta thailandese, gli stessi ingredienti, lo stesso laboratorio di Yaowarat.' | t }}</p>

            <div class="timeline">
              @for (row of timeline; track row.year) {
                <div class="timeline-row">
                  <div class="timeline-year">{{ row.year }}</div>
                  <div class="timeline-event">
                    <h5>{{ row.title | t }}</h5>
                    <p>{{ row.body | t }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <section class="manifesto">
        <sf-thai-ornament [width]="240" color="#f5c518" />
        <blockquote style="margin-top:2rem">
          {{ 'Non è una ' | t }}<span class="yellow">{{ 'bibita.' | t }}</span><br />{{ 'È uno strumento.' | t }}
        </blockquote>
        <cite>{{ '— Da una targa nel laboratorio di Yaowarat' | t }}</cite>
      </section>
    </main>
  `,
})
export class StoriaComponent {
  constructor() {
    inject(SeoService).setPageMeta({
      title: 'La storia',
      description:
        "Cinquant'anni di vetro. La storia di Suea Fai dal 1974, dai mercati di Yaowarat alle palestre Muay Thai. Una formula che si e' rifiutata di cambiare.",
      path: '/#/storia',
    });
  }

  timeline = [
    { year: '1974', title: 'La prima formula',        body: 'In un retrobottega di Yaowarat nasce la prima bottiglia.' },
    { year: '1976', title: 'Sponsor del Rajadamnern', body: 'Cartelloni in juta nel ring più importante della Thailandia.' },
    { year: '1981', title: 'Distribuzione nazionale', body: 'Una flotta di camioncini Isuzu copre i minimarket thailandesi.' },
    { year: '1989', title: 'Resistenza alle lattine', body: 'La famiglia rifiuta la conversione al formato lattina occidentale.' },
    { year: '1995', title: 'Quasi la fine',           body: 'Il mercato cambia. Le vendite crollano. Il vetro tiene duro.' },
    { year: '2008', title: 'Il ritorno del culto',    body: 'La nuova generazione thailandese riscopre il tonico in vetro.' },
    { year: '2018', title: 'Patrimonio nazionale',    body: 'La bottiglietta entra in mostra al Bangkok Museum of Design.' },
    { year: '2026', title: 'Suea Fai arriva in Italia', body: 'Importazione ufficiale europea. Magazzino a Milano.' },
  ];
}
