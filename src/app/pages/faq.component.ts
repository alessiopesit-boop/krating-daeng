import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { FaqListComponent } from '../shared/faq-list.component';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'sf-faq',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FaqListComponent, TPipe],
  template: `
    <main>
      <section class="page-banner">
        <div class="page-banner-inner">
          <div>
            <div class="breadcrumb"><a routerLink="/">{{ 'Home' | t }}</a> / {{ 'FAQ' | t }}</div>
            <h1><span class="yellow">{{ 'Domande' | t }}</span><br />{{ 'frequenti' | t }}</h1>
          </div>
        </div>
      </section>
      <section class="faq" style="background:var(--paper)">
        <sf-faq-list />
      </section>
    </main>
  `,
})
export class FaqComponent {
  constructor() {
    inject(SeoService).setPageMeta({
      title: 'Domande frequenti',
      description:
        'Caffeina, taurina, vetro, spedizione, vuoto a rendere e programma wholesale: tutte le domande comuni su Suea Fai e sul suo tonico energetico thailandese.',
      path: '/faq',
    });
  }
}
