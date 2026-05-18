import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'sf-contatti',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TPipe],
  template: `
    <main>
      <section class="page-banner">
        <div class="page-banner-inner">
          <div>
            <div class="breadcrumb"><a routerLink="/">{{ 'Home' | t }}</a> / {{ 'Contatti' | t }}</div>
            <h1>{{ 'Contatti' | t }}</h1>
          </div>
        </div>
      </section>
      <section class="static-page paper-bg">
        <div class="section-inner static-content">
          <p class="static-lead">{{ "Per qualsiasi domanda su prodotti, ordini, formati o collaborazioni: scrivici. Rispondiamo entro un giorno lavorativo." | t }}</p>
          <dl class="contact-list">
            <dt>{{ 'Email generale' | t }}</dt><dd><a href="mailto:ciao@sueafai.it">ciao&#64;sueafai.it</a></dd>
            <dt>{{ 'Ordini e spedizioni' | t }}</dt><dd><a href="mailto:ordini@sueafai.it">ordini&#64;sueafai.it</a></dd>
            <dt>{{ 'Programma wholesale' | t }}</dt><dd><a href="mailto:wholesale@sueafai.it">wholesale&#64;sueafai.it</a> &middot; <a routerLink="/wholesale">{{ 'scheda dedicata' | t }}</a></dd>
            <dt>{{ 'Magazzino' | t }}</dt><dd>Via dei Camionisti 17, 20142 Milano</dd>
          </dl>
        </div>
      </section>
    </main>
  `,
})
export class ContattiComponent {
  constructor() {
    inject(SeoService).setPageMeta({
      title: 'Contatti',
      description: "Email, indirizzo del magazzino di Milano, contatto wholesale: come raggiungerci per ordini, formati e collaborazioni Suea Fai.",
      path: '/#/contatti',
    });
  }
}
