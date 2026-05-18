import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../core/cart.service';
import { fmtPrice } from '../core/products';
import { TPipe } from '../core/lang.pipe';
import { TigerBadgeComponent } from '../illustrations/tiger-badge.component';
import { SeoService } from '../core/seo.service';

type Shipping = 'standard' | 'express';
type Payment = 'card' | 'paypal' | 'bank';

interface CheckoutForm {
  email: string; firstName: string; lastName: string; address: string;
  city: string; zip: string; province: string; phone: string;
  cardNumber: string; cardName: string; cardExp: string; cardCvc: string;
}

const EMPTY_FORM: CheckoutForm = {
  email: '', firstName: '', lastName: '', address: '',
  city: '', zip: '', province: '', phone: '',
  cardNumber: '', cardName: '', cardExp: '', cardCvc: '',
};

@Component({
  selector: 'sf-checkout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TigerBadgeComponent, TPipe],
  template: `
    @if (cart.lines().length === 0) {
      <main class="checkout-page">
        <div style="max-width:600px;margin:0 auto;text-align:center;padding:4rem 0">
          <sf-tiger-badge [size]="140" />
          <h1 class="t-display" style="font-size:2.6rem;margin:1rem 0">{{ 'Carrello vuoto' | t }}</h1>
          <p style="margin-bottom:2rem">{{ 'Non puoi fare il checkout senza prodotti. La tigre ha bisogno di qualcosa per cui correre.' | t }}</p>
          <button class="btn btn--red" (click)="go('/shop')">{{ 'Vai allo shop' | t }}</button>
        </div>
      </main>
    } @else {
      <main class="checkout-page">
        <div class="checkout-grid">
          <div>
            <div class="checkout-stepper">
              <div class="checkout-step done"><span class="num">1</span>{{ 'Carrello' | t }}</div>
              <div class="checkout-step active"><span class="num">2</span>{{ 'Spedizione & Pagamento' | t }}</div>
              <div class="checkout-step"><span class="num">3</span>{{ 'Conferma' | t }}</div>
            </div>

            <div class="checkout-card">
              <h3>{{ 'Contatti' | t }}</h3>
              <div class="field-grid">
                <div class="field full">
                  <label>{{ 'Email' | t }}</label>
                  <input [class.invalid]="errors().email" [value]="form().email" (input)="upd('email', $event)" placeholder="tu@esempio.it" />
                  @if (errors().email) { <span class="err">{{ errors().email! | t }}</span> }
                </div>
              </div>
            </div>

            <div class="checkout-card">
              <h3>{{ 'Indirizzo di spedizione' | t }}</h3>
              <div class="field-grid">
                <div class="field">
                  <label>{{ 'Nome' | t }}</label>
                  <input [class.invalid]="errors().firstName" [value]="form().firstName" (input)="upd('firstName', $event)" />
                  @if (errors().firstName) { <span class="err">{{ errors().firstName! | t }}</span> }
                </div>
                <div class="field">
                  <label>{{ 'Cognome' | t }}</label>
                  <input [class.invalid]="errors().lastName" [value]="form().lastName" (input)="upd('lastName', $event)" />
                  @if (errors().lastName) { <span class="err">{{ errors().lastName! | t }}</span> }
                </div>
                <div class="field full">
                  <label>{{ 'Indirizzo' | t }}</label>
                  <input [class.invalid]="errors().address" [value]="form().address" (input)="upd('address', $event)" placeholder="Via, numero civico" />
                  @if (errors().address) { <span class="err">{{ errors().address! | t }}</span> }
                </div>
                <div class="field">
                  <label>{{ 'Città' | t }}</label>
                  <input [class.invalid]="errors().city" [value]="form().city" (input)="upd('city', $event)" />
                  @if (errors().city) { <span class="err">{{ errors().city! | t }}</span> }
                </div>
                <div class="field">
                  <label>{{ 'CAP' | t }}</label>
                  <input [class.invalid]="errors().zip" [value]="form().zip" (input)="upd('zip', $event)" placeholder="20121" />
                  @if (errors().zip) { <span class="err">{{ errors().zip! | t }}</span> }
                </div>
                <div class="field">
                  <label>{{ 'Provincia' | t }}</label>
                  <input [class.invalid]="errors().province" [value]="form().province" (input)="upd('province', $event)" placeholder="MI" />
                  @if (errors().province) { <span class="err">{{ errors().province! | t }}</span> }
                </div>
                <div class="field">
                  <label>{{ 'Telefono' | t }}</label>
                  <input [value]="form().phone" (input)="upd('phone', $event)" placeholder="+39 ..." />
                </div>
              </div>
            </div>

            <div class="checkout-card">
              <h3>{{ 'Spedizione' | t }}</h3>
              <label class="shipping-opt" [class.active]="shipping() === 'standard'" (click)="shipping.set('standard')">
                <input type="radio" [checked]="shipping() === 'standard'" readonly />
                <div>
                  <div class="name">{{ 'Standard · 48–72h' | t }}</div>
                  <div class="desc">{{ 'Corriere espresso, tracciamento incluso' | t }}</div>
                </div>
                <div class="price">{{ cart.subtotal() >= 39 ? ('GRATIS' | t) : fmt(4.9) }}</div>
              </label>
              <label class="shipping-opt" [class.active]="shipping() === 'express'" (click)="shipping.set('express')">
                <input type="radio" [checked]="shipping() === 'express'" readonly />
                <div>
                  <div class="name">{{ 'Express · 24h' | t }}</div>
                  <div class="desc">{{ 'Consegna il giorno lavorativo successivo' | t }}</div>
                </div>
                <div class="price">{{ fmt(9.9) }}</div>
              </label>
            </div>

            <div class="checkout-card">
              <h3>{{ 'Pagamento' | t }}</h3>
              <div class="payment-tabs">
                <div class="payment-tab" [class.active]="payment() === 'card'" (click)="payment.set('card')">{{ 'Carta' | t }}</div>
                <div class="payment-tab" [class.active]="payment() === 'paypal'" (click)="payment.set('paypal')">{{ 'PayPal' | t }}</div>
                <div class="payment-tab" [class.active]="payment() === 'bank'" (click)="payment.set('bank')">{{ 'Bonifico' | t }}</div>
              </div>
              @if (payment() === 'card') {
                <div class="field-grid">
                  <div class="field full">
                    <label>{{ 'Numero carta' | t }}</label>
                    <input [class.invalid]="errors().cardNumber" [value]="form().cardNumber" (input)="upd('cardNumber', $event)" placeholder="•••• •••• •••• ••••" />
                    @if (errors().cardNumber) { <span class="err">{{ errors().cardNumber! | t }}</span> }
                  </div>
                  <div class="field full">
                    <label>{{ 'Intestatario' | t }}</label>
                    <input [class.invalid]="errors().cardName" [value]="form().cardName" (input)="upd('cardName', $event)" />
                    @if (errors().cardName) { <span class="err">{{ errors().cardName! | t }}</span> }
                  </div>
                  <div class="field">
                    <label>{{ 'Scadenza' | t }}</label>
                    <input [class.invalid]="errors().cardExp" [value]="form().cardExp" (input)="upd('cardExp', $event)" placeholder="MM/AA" />
                    @if (errors().cardExp) { <span class="err">{{ errors().cardExp! | t }}</span> }
                  </div>
                  <div class="field">
                    <label>{{ 'CVC' | t }}</label>
                    <input [class.invalid]="errors().cardCvc" [value]="form().cardCvc" (input)="upd('cardCvc', $event)" placeholder="123" />
                    @if (errors().cardCvc) { <span class="err">{{ errors().cardCvc! | t }}</span> }
                  </div>
                </div>
              }
              @if (payment() === 'paypal') {
                <div style="padding:1.2rem;background:var(--paper);border:2px solid var(--ink)">{{ 'Verrai reindirizzato a PayPal per completare il pagamento.' | t }}</div>
              }
              @if (payment() === 'bank') {
                <div style="padding:1.2rem;background:var(--paper);border:2px solid var(--ink)">
                  <div class="t-mono" style="font-size:0.78rem">IBAN: IT60 X054 2811 1010 0000 0123 456</div>
                  <div class="t-mono" style="font-size:0.78rem;margin-top:0.4rem">BIC/SWIFT: BPMOIT22XXX</div>
                  <p style="margin-top:0.6rem;font-size:0.88rem">{{ "L'ordine verrà evaso al ricevimento del bonifico (1–2 giorni lavorativi)." | t }}</p>
                </div>
              }
            </div>

            <button class="btn btn--red" style="width:100%;justify-content:center;padding:1.1rem" (click)="submit()" [disabled]="submitting()">
              @if (submitting()) {
                {{ 'Pagamento in corso…' | t }}
              } @else {
                {{ 'Paga ' | t }}{{ fmt(total()) }} →
              }
            </button>
          </div>

          <aside>
            <div class="summary-card">
              <h3>{{ 'Il tuo ordine' | t }}</h3>
              @for (l of cart.lines(); track l.id) {
                <div class="summary-line">
                  <div class="summary-line-img">
                    <img [src]="l.product.img" alt="" style="width:100%;height:100%;object-fit:cover" />
                  </div>
                  <div>
                    <div style="font-family:var(--font-display);text-transform:uppercase;font-size:0.92rem">{{ l.product.name | t }}</div>
                    <div class="t-mono" style="font-size:0.65rem;color:var(--ink-soft)">{{ 'QTÀ' | t }} {{ l.qty }} · {{ l.product.format | t }}</div>
                  </div>
                  <div style="font-family:var(--font-display);font-size:0.95rem">{{ fmt(l.product.price * l.qty) }}</div>
                </div>
              }
              <div class="cart-totals" style="margin-top:1rem">
                <div class="row"><span>{{ 'Subtotale' | t }}</span><span>{{ fmt(cart.subtotal()) }}</span></div>
                <div class="row"><span>{{ 'Spedizione' | t }}</span><span>{{ shippingPrice() === 0 ? ('GRATIS' | t) : fmt(shippingPrice()) }}</span></div>
                <div class="row row--total"><span>{{ 'Totale' | t }}</span><span>{{ fmt(total()) }}</span></div>
              </div>
              <div style="margin-top:1rem;padding:0.8rem;background:var(--paper);border:1.5px dashed var(--ink);font-size:0.78rem;line-height:1.5">
                <strong>{{ 'Pacco eco' | t }}</strong>{{ ' — cartone riciclato, paglia di riempimento, niente plastica. Vuoto a rendere sulle casse intere.' | t }}
              </div>
            </div>
          </aside>
        </div>
      </main>
    }
  `,
})
export class CheckoutComponent {
  cart = inject(CartService);
  private router = inject(Router);
  fmt = fmtPrice;

  constructor() {
    inject(SeoService).setPageMeta({
      title: 'Checkout',
      description: 'Completa il tuo ordine Suea Fai.',
      path: '/#/checkout',
      noIndex: true,
    });
  }

  readonly shipping = signal<Shipping>('standard');
  readonly payment = signal<Payment>('card');
  readonly form = signal<CheckoutForm>({ ...EMPTY_FORM });
  readonly errors = signal<Partial<Record<keyof CheckoutForm, string>>>({});
  readonly submitting = signal(false);

  readonly shippingPrice = computed(() => {
    if (this.shipping() === 'express') return 9.9;
    return this.cart.subtotal() >= 39 ? 0 : 4.9;
  });
  readonly total = computed(() => this.cart.subtotal() + this.shippingPrice());

  go(path: string) { this.router.navigateByUrl(path); }

  upd(key: keyof CheckoutForm, ev: Event) {
    const v = (ev.target as HTMLInputElement).value;
    this.form.update((f) => ({ ...f, [key]: v }));
  }

  private validate(): boolean {
    const f = this.form();
    const e: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!f.email.includes('@')) e.email = 'Email non valida';
    if (!f.firstName) e.firstName = 'Obbligatorio';
    if (!f.lastName) e.lastName = 'Obbligatorio';
    if (!f.address) e.address = 'Obbligatorio';
    if (!f.city) e.city = 'Obbligatorio';
    if (!/^\d{5}$/.test(f.zip)) e.zip = '5 cifre';
    if (!f.province) e.province = 'Obbligatorio';
    if (this.payment() === 'card') {
      if (!/^\d{12,19}$/.test(f.cardNumber.replace(/\s/g, ''))) e.cardNumber = 'Numero non valido';
      if (!f.cardName) e.cardName = 'Obbligatorio';
      if (!/^\d{2}\/\d{2}$/.test(f.cardExp)) e.cardExp = 'MM/AA';
      if (!/^\d{3,4}$/.test(f.cardCvc)) e.cardCvc = '3-4 cifre';
    }
    this.errors.set(e);
    return Object.keys(e).length === 0;
  }

  submit() {
    if (this.submitting()) return;
    if (!this.validate()) return;
    this.submitting.set(true);
    // Simulated payment processing delay so the loading state is visible.
    setTimeout(() => {
      const orderId = 'SF-' + Math.random().toString(36).slice(2, 8).toUpperCase();
      const f = this.form();
      const payload = {
        id: orderId,
        items: this.cart.lines(),
        subtotal: this.cart.subtotal(),
        shipping: this.shippingPrice(),
        total: this.total(),
        email: f.email,
        name: `${f.firstName} ${f.lastName}`,
        address: `${f.address}, ${f.zip} ${f.city} (${f.province})`,
      };
      try {
        sessionStorage.setItem('sf-last-order', JSON.stringify(payload));
      } catch {
        // sessionStorage unavailable, the confirmation page just falls back to the order id
      }
      this.cart.clear();
      this.submitting.set(false);
      this.router.navigateByUrl(`/confirm/${orderId}`);
    }, 1400);
  }
}
