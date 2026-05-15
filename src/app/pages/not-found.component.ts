import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sf-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <main style="min-height:60vh;display:grid;place-items:center;padding:4rem;background:var(--paper)">
      <div style="text-align:center">
        <h1 class="t-display" style="font-size:4rem">404</h1>
        <p>Pagina non trovata.</p>
        <a routerLink="/" class="btn btn--red" style="margin-top:1rem">Torna alla home</a>
      </div>
    </main>
  `,
})
export class NotFoundComponent {}
