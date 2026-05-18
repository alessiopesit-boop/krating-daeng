import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'sf-cookie',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TPipe],
  template: `
    <main>
      <section class="page-banner">
        <div class="page-banner-inner">
          <div>
            <div class="breadcrumb"><a routerLink="/">{{ 'Home' | t }}</a> / {{ 'Cookie' | t }}</div>
            <h1>{{ 'Cookie' | t }}</h1>
          </div>
        </div>
      </section>
      <section class="static-page paper-bg">
        <div class="section-inner static-content">
          <p class="static-lead">{{ 'Questo sito non usa cookie di tracciamento ne\\' di profilazione, e non installa cookie di terze parti.' | t }}</p>
          <h3>{{ "Cosa salviamo nel browser" | t }}</h3>
          <p>{{ "Usiamo solo localStorage, non cookie HTTP. Le chiavi che il sito scrive nel tuo browser sono:" | t }}</p>
          <ul>
            <li><code>sf-cart</code>: contenuto del carrello e quantita\\'.</li>
            <li><code>sf-lang</code>: lingua scelta (it o en).</li>
            <li><code>sf-tweaks</code>: preferenze visive (palette, ornamenti thai, animazione hero) se mai sono state modificate.</li>
          </ul>
          <p>{{ 'Puoi cancellare tutto in qualsiasi momento svuotando localStorage del sito dalle impostazioni del browser. Nessuna preferenza viene replicata su server esterni.' | t }}</p>
        </div>
      </section>
    </main>
  `,
})
export class CookieComponent {
  constructor() {
    inject(SeoService).setPageMeta({
      title: 'Cookie',
      description: "Cookie policy di Suea Fai: nessun cookie di tracciamento o terze parti, solo localStorage per carrello, lingua e preferenze visive (chiavi sf-*).",
      path: '/#/cookie',
    });
  }
}
