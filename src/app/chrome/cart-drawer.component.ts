import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../core/cart.service';
import { fmtPrice } from '../core/products';
import { TPipe } from '../core/lang.pipe';
import { TigerBadgeComponent } from '../illustrations/tiger-badge.component';

@Component({
  selector: 'sf-cart-drawer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TigerBadgeComponent, TPipe],
  template: `
    <div class="drawer-backdrop" [class.open]="cart.open()" (click)="cart.open.set(false)"></div>
    <aside class="drawer" [class.open]="cart.open()">
      <div class="drawer-head">
        <h3>
          {{ 'Carrello' | t }}
          @if (cart.count() > 0) {
            <span style="opacity:0.6;font-size:1rem">({{ cart.count() }})</span>
          }
        </h3>
        <button class="drawer-close" (click)="cart.open.set(false)" [attr.aria-label]="'Chiudi' | t">✕</button>
      </div>
      <div class="drawer-body">
        @if (cart.lines().length === 0) {
          <div class="cart-empty">
            <div style="display:grid;place-items:center"><sf-tiger-badge [size]="120" /></div>
            <div class="t-display">{{ 'Carrello vuoto' | t }}</div>
            <p style="font-size:0.92rem">{{ 'La tigre ha fame ma non ha ancora trovato la sua preda.' | t }}</p>
            <button class="btn btn--red" (click)="goShop()" style="margin-top:1rem">
              {{ 'Vai allo shop' | t }}
            </button>
          </div>
        } @else {
          @for (line of cart.lines(); track line.id) {
            <div class="cart-line">
              <div class="cart-line-img cart-line-link" (click)="goPdp(line.id)" style="cursor:pointer">
                <img [src]="line.product.img" alt="" style="width:100%;height:100%;object-fit:cover" />
              </div>
              <div>
                <div class="cart-line-name cart-line-link" (click)="goPdp(line.id)" style="cursor:pointer">{{ line.product.name }}</div>
                <div class="cart-line-meta">{{ line.product.format }}</div>
                <div class="cart-line-qty">
                  <button (click)="cart.update(line.id, line.qty - 1)" aria-label="meno">−</button>
                  <span>{{ line.qty }}</span>
                  <button (click)="cart.update(line.id, line.qty + 1)" aria-label="più">+</button>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.5rem">
                <div class="cart-line-price">{{ fmt(line.product.price * line.qty) }}</div>
                <button
                  class="cart-line-remove"
                  (click)="cart.remove(line.id)"
                  [attr.aria-label]="'Rimuovi' | t"
                >{{ 'Rimuovi' | t }}</button>
              </div>
            </div>
          }
        }
      </div>
      @if (cart.lines().length > 0) {
        <div class="drawer-foot">
          <div class="cart-totals">
            <div class="row"><span>{{ 'Subtotale' | t }}</span><span>{{ fmt(cart.subtotal()) }}</span></div>
            <div class="row"><span>{{ 'Spedizione' | t }}</span><span style="opacity:0.7">{{ 'al checkout' | t }}</span></div>
            <div class="row row--total"><span>{{ 'Totale' | t }}</span><span>{{ fmt(cart.subtotal()) }}</span></div>
          </div>
          <button class="btn btn--red" style="width:100%;justify-content:center" (click)="goCheckout()">
            {{ 'Checkout →' | t }}
          </button>
          <button
            class="btn btn--ghost"
            style="width:100%;justify-content:center;margin-top:0.6rem;box-shadow:none;border:2px solid var(--ink)"
            (click)="cart.open.set(false)"
          >
            {{ 'Continua shopping' | t }}
          </button>
        </div>
      }
    </aside>
  `,
})
export class CartDrawerComponent {
  cart = inject(CartService);
  private router = inject(Router);
  fmt = fmtPrice;

  goCheckout() {
    this.cart.open.set(false);
    this.router.navigateByUrl('/checkout');
  }
  goShop() {
    this.cart.open.set(false);
    this.router.navigateByUrl('/shop');
  }
  goPdp(id: string) {
    this.cart.open.set(false);
    this.router.navigateByUrl('/product/' + id);
  }
}
