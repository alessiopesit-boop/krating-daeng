import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'sf-privacy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TPipe],
  template: `
    <main>
      <section class="page-banner">
        <div class="page-banner-inner">
          <div>
            <div class="breadcrumb"><a routerLink="/">{{ 'Home' | t }}</a> / {{ 'Privacy' | t }}</div>
            <h1>{{ 'Privacy' | t }}</h1>
          </div>
        </div>
      </section>
      <section class="static-page paper-bg">
        <div class="section-inner static-content">
          <p class="static-lead">{{ 'Suea Fai e\\' un progetto vetrina di natura dimostrativa. Questa pagina descrive in modo conciso che cosa il sito raccoglie e come.' | t }}</p>
          <h3>{{ 'Cosa raccogliamo' | t }}</h3>
          <p>{{ 'Il sito non ha backend ne\\' database: ogni interazione (carrello, lingua, preferenze) viene salvata esclusivamente nel localStorage del tuo browser e non lascia mai il tuo dispositivo. Nessun analytics di terze parti e\\' installato.' | t }}</p>
          <h3>{{ 'Dati di checkout' | t }}</h3>
          <p>{{ "Il flusso di checkout e\\' una simulazione: i dati inseriti non vengono inviati a nessun server, non vengono salvati ne\\' usati per profilazione. Restano solo nella sessione del browser fino al refresh." | t }}</p>
          <h3>{{ 'Contatti' | t }}</h3>
          <p>{{ "Se ci scrivi a un nostro indirizzo email, conserviamo i messaggi per gestire la conversazione e per nessun altro scopo. Puoi chiedere la cancellazione in qualsiasi momento scrivendoci a" | t }} <a href="mailto:privacy@sueafai.it">privacy&#64;sueafai.it</a>.</p>
        </div>
      </section>
    </main>
  `,
})
export class PrivacyComponent {
  constructor() {
    inject(SeoService).setPageMeta({
      title: 'Privacy',
      description: "Informativa privacy di Suea Fai: nessun backend, nessun analytics di terze parti, dati di checkout e carrello solo nel browser tramite localStorage.",
      path: '/#/privacy',
    });
  }
}
