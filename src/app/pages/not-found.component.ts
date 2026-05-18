import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { LogoComponent } from '../illustrations/logo.component';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'sf-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TPipe, LogoComponent],
  template: `
    <main class="paper-bg not-found">
      <div class="not-found-inner">
        <div class="not-found-logo">
          <sf-logo [size]="160" [showText]="false" />
        </div>
        <div class="t-mono not-found-eyebrow">404 · {{ 'Pagina non trovata' | t }}</div>
        <h1 class="t-display not-found-title">
          {{ 'Questa pagina' | t }}<br />
          <span class="yellow">{{ "non c'è." | t }}</span>
        </h1>
        <p class="not-found-body">
          {{ "Hai sbagliato indirizzo, oppure la stiamo ancora costruendo. La tigre nel frattempo è da un'altra parte." | t }}
        </p>
        <div class="not-found-cta">
          <a routerLink="/" class="btn btn--red">{{ 'Torna alla home' | t }}</a>
          <a routerLink="/shop" class="btn btn--ghost">{{ 'Vai allo shop' | t }}</a>
        </div>
      </div>
    </main>
  `,
})
export class NotFoundComponent {
  constructor() {
    inject(SeoService).setPageMeta({
      title: 'Pagina non trovata',
      description: "La pagina che cercavi non esiste, ma la tigre c'e' sempre.",
      noIndex: true,
    });
  }
}
