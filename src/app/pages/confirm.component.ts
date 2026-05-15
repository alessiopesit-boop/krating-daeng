import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { fmtPrice } from '../core/products';
import { ResolvedLine } from '../core/cart.service';
import { TPipe } from '../core/lang.pipe';
import { ThaiOrnamentComponent } from '../illustrations/thai-ornament.component';

interface StoredOrder {
  id: string;
  items: ResolvedLine[];
  subtotal: number;
  shipping: number;
  total: number;
  email: string;
  name: string;
  address: string;
}

@Component({
  selector: 'sf-confirm',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThaiOrnamentComponent, TPipe],
  template: `
    <main class="confirm-page">
      <div class="confirm-card">
        <div class="stamp-big">{{ 'CONFERMATO' | t }}<br /><br />★ ★ ★</div>
        <sf-thai-ornament [width]="220" />
        <div class="t-mono" style="margin-top:1.2rem;color:var(--red);letter-spacing:0.22em">{{ '★ ORDINE RICEVUTO' | t }}</div>
        <h1>{{ 'La ' | t }}<span class="red">{{ 'tigre' | t }}</span><br />{{ 'è in viaggio.' | t }}</h1>
        <div class="order-id">{{ 'N° ' | t }}{{ orderId() }}</div>

        @if (order()) {
          <div style="text-align:left;border-top:2px solid var(--ink);padding-top:1.4rem;margin-top:1rem">
            <div class="t-mono" style="font-size:0.7rem;letter-spacing:0.18em;margin-bottom:0.6rem">{{ 'SPEDITO A' | t }}</div>
            <div style="font-family:var(--font-display);text-transform:uppercase;font-size:1.1rem">{{ order()!.name }}</div>
            <div style="font-size:0.92rem;color:var(--ink-soft)">{{ order()!.address }}</div>
            <div class="t-mono" style="font-size:0.8rem;margin-top:0.8rem">{{ order()!.email }}</div>

            <div style="margin-top:1.4rem">
              <div class="t-mono" style="font-size:0.7rem;letter-spacing:0.18em;margin-bottom:0.6rem">{{ 'RIEPILOGO' | t }}</div>
              @for (l of order()!.items; track l.id) {
                <div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px dashed var(--paper-edge)">
                  <span>{{ l.qty }} × {{ l.product.name | t }}</span>
                  <span style="font-family:var(--font-display)">{{ fmt(l.product.price * l.qty) }}</span>
                </div>
              }
              <div style="display:flex;justify-content:space-between;margin-top:0.8rem;font-family:var(--font-display);font-size:1.4rem;text-transform:uppercase">
                <span>{{ 'Totale' | t }}</span><span>{{ fmt(order()!.total) }}</span>
              </div>
            </div>
          </div>
        }

        <p style="margin-top:2rem;line-height:1.6;font-size:0.95rem">
          {{ "Riceverai un'email di conferma con il tracking entro un'ora." | t }}<br />
          <em>Khob khun krap</em> {{ '— grazie. Bevila in piedi.' | t }}
        </p>
        <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem;flex-wrap:wrap">
          <button class="btn" (click)="go('/')">{{ 'Torna alla home' | t }}</button>
          <button class="btn btn--red" (click)="go('/shop')">{{ 'Continua a esplorare' | t }}</button>
        </div>
      </div>
    </main>
  `,
})
export class ConfirmComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  fmt = fmtPrice;

  private paramId = toSignal(this.route.paramMap, { requireSync: true });
  readonly orderId = computed(() => this.paramId().get('id') ?? this.order()?.id ?? 'SF-XXXXXX');

  readonly order = computed<StoredOrder | null>(() => {
    try {
      const raw = sessionStorage.getItem('sf-last-order');
      return raw ? (JSON.parse(raw) as StoredOrder) : null;
    } catch {
      return null;
    }
  });

  go(path: string) { this.router.navigateByUrl(path); }
}
