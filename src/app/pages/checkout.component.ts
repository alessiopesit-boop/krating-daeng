import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
} from '@angular/core';
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

type FormKey = keyof CheckoutForm;
type ErrorKey = FormKey;

const EMPTY_FORM: CheckoutForm = {
  email: '', firstName: '', lastName: '', address: '',
  city: '', zip: '', province: '', phone: '',
  cardNumber: '', cardName: '', cardExp: '', cardCvc: '',
};

const ALL_KEYS: FormKey[] = Object.keys(EMPTY_FORM) as FormKey[];

// Regex riusate piu' volte (lettere unicode, niente cifre/punteggiatura strana).
const NAME_RE = /^[\p{L}][\p{L}\s'-]*$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CAP_RE = /^\d{5}$/;
const PROV_RE = /^[A-Za-z]{2}$/;
const EXP_RE = /^\d{2}\/\d{2}$/;
const CVC_RE = /^\d{3,4}$/;

function luhn(s: string): boolean {
  let sum = 0;
  let alt = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let n = +s[i];
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

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
          <div class="checkout-form-col">
            <div class="checkout-stepper" aria-label="Stato ordine">
              <div class="checkout-step done"><span class="num">1</span><span class="lbl">{{ 'Carrello' | t }}</span></div>
              <div class="checkout-step active"><span class="num">2</span><span class="lbl">{{ 'Spedizione & Pagamento' | t }}</span></div>
              <div class="checkout-step"><span class="num">3</span><span class="lbl">{{ 'Conferma' | t }}</span></div>
            </div>

            <div class="checkout-card">
              <h3>{{ 'Contatti' | t }}</h3>
              <div class="field-grid">
                <div class="field full">
                  <label>{{ 'Email' | t }}</label>
                  <input
                    type="email"
                    inputmode="email"
                    autocomplete="email"
                    maxlength="120"
                    [class.invalid]="showErr('email')"
                    [value]="form().email"
                    (input)="upd('email', $event)"
                    (blur)="touch('email')"
                    placeholder="tu@esempio.it"
                  />
                  @if (showErr('email')) { <span class="err">{{ errors().email! | t }}</span> }
                </div>
              </div>
            </div>

            <div class="checkout-card">
              <h3>{{ 'Indirizzo di spedizione' | t }}</h3>
              <div class="field-grid">
                <div class="field">
                  <label>{{ 'Nome' | t }}</label>
                  <input
                    type="text"
                    autocomplete="given-name"
                    maxlength="60"
                    [class.invalid]="showErr('firstName')"
                    [value]="form().firstName"
                    (input)="upd('firstName', $event)"
                    (blur)="touch('firstName')"
                  />
                  @if (showErr('firstName')) { <span class="err">{{ errors().firstName! | t }}</span> }
                </div>
                <div class="field">
                  <label>{{ 'Cognome' | t }}</label>
                  <input
                    type="text"
                    autocomplete="family-name"
                    maxlength="60"
                    [class.invalid]="showErr('lastName')"
                    [value]="form().lastName"
                    (input)="upd('lastName', $event)"
                    (blur)="touch('lastName')"
                  />
                  @if (showErr('lastName')) { <span class="err">{{ errors().lastName! | t }}</span> }
                </div>
                <div class="field full">
                  <label>{{ 'Indirizzo' | t }}</label>
                  <input
                    type="text"
                    autocomplete="street-address"
                    maxlength="120"
                    [class.invalid]="showErr('address')"
                    [value]="form().address"
                    (input)="upd('address', $event)"
                    (blur)="touch('address')"
                    placeholder="Via, numero civico"
                  />
                  @if (showErr('address')) { <span class="err">{{ errors().address! | t }}</span> }
                </div>
                <div class="field">
                  <label>{{ 'Città' | t }}</label>
                  <input
                    type="text"
                    autocomplete="address-level2"
                    maxlength="60"
                    [class.invalid]="showErr('city')"
                    [value]="form().city"
                    (input)="upd('city', $event)"
                    (blur)="touch('city')"
                  />
                  @if (showErr('city')) { <span class="err">{{ errors().city! | t }}</span> }
                </div>
                <div class="field">
                  <label>{{ 'CAP' | t }}</label>
                  <input
                    type="text"
                    inputmode="numeric"
                    autocomplete="postal-code"
                    maxlength="5"
                    [class.invalid]="showErr('zip')"
                    [value]="form().zip"
                    (input)="upd('zip', $event)"
                    (blur)="touch('zip')"
                    placeholder="20121"
                  />
                  @if (showErr('zip')) { <span class="err">{{ errors().zip! | t }}</span> }
                </div>
                <div class="field">
                  <label>{{ 'Provincia' | t }}</label>
                  <input
                    type="text"
                    autocomplete="address-level1"
                    maxlength="2"
                    style="text-transform:uppercase"
                    [class.invalid]="showErr('province')"
                    [value]="form().province"
                    (input)="upd('province', $event)"
                    (blur)="touch('province')"
                    placeholder="MI"
                  />
                  @if (showErr('province')) { <span class="err">{{ errors().province! | t }}</span> }
                </div>
                <div class="field">
                  <label>{{ 'Telefono' | t }}</label>
                  <input
                    type="tel"
                    inputmode="tel"
                    autocomplete="tel"
                    maxlength="24"
                    [class.invalid]="showErr('phone')"
                    [value]="form().phone"
                    (input)="upd('phone', $event)"
                    (blur)="touch('phone')"
                    placeholder="+39 ..."
                  />
                  @if (showErr('phone')) { <span class="err">{{ errors().phone! | t }}</span> }
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
                    <input
                      type="text"
                      inputmode="numeric"
                      autocomplete="cc-number"
                      maxlength="23"
                      [class.invalid]="showErr('cardNumber')"
                      [value]="form().cardNumber"
                      (input)="upd('cardNumber', $event)"
                      (blur)="touch('cardNumber')"
                      placeholder="•••• •••• •••• ••••"
                    />
                    @if (showErr('cardNumber')) { <span class="err">{{ errors().cardNumber! | t }}</span> }
                  </div>
                  <div class="field full">
                    <label>{{ 'Intestatario' | t }}</label>
                    <input
                      type="text"
                      autocomplete="cc-name"
                      maxlength="80"
                      [class.invalid]="showErr('cardName')"
                      [value]="form().cardName"
                      (input)="upd('cardName', $event)"
                      (blur)="touch('cardName')"
                    />
                    @if (showErr('cardName')) { <span class="err">{{ errors().cardName! | t }}</span> }
                  </div>
                  <div class="field">
                    <label>{{ 'Scadenza' | t }}</label>
                    <input
                      type="text"
                      inputmode="numeric"
                      autocomplete="cc-exp"
                      maxlength="5"
                      [class.invalid]="showErr('cardExp')"
                      [value]="form().cardExp"
                      (input)="upd('cardExp', $event)"
                      (keydown)="onExpKeydown($event)"
                      (blur)="touch('cardExp')"
                      [attr.placeholder]="'MM/AA' | t"
                    />
                    @if (showErr('cardExp')) { <span class="err">{{ errors().cardExp! | t }}</span> }
                  </div>
                  <div class="field">
                    <label>{{ 'CVC' | t }}</label>
                    <input
                      type="text"
                      inputmode="numeric"
                      autocomplete="cc-csc"
                      maxlength="4"
                      [class.invalid]="showErr('cardCvc')"
                      [value]="form().cardCvc"
                      (input)="upd('cardCvc', $event)"
                      (blur)="touch('cardCvc')"
                      placeholder="123"
                    />
                    @if (showErr('cardCvc')) { <span class="err">{{ errors().cardCvc! | t }}</span> }
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

          </div>

          <aside class="checkout-summary">
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

          <div class="checkout-pay">
            <button class="btn btn--red checkout-pay-btn" (click)="submit()" [disabled]="submitting()">
              @if (submitting()) {
                {{ 'Pagamento in corso…' | t }}
              } @else {
                {{ 'Paga ' | t }}{{ fmt(total()) }} →
              }
            </button>
          </div>
        </div>
      </main>
    }
  `,
})
export class CheckoutComponent {
  cart = inject(CartService);
  private router = inject(Router);
  private host = inject(ElementRef<HTMLElement>);
  fmt = fmtPrice;

  constructor() {
    inject(SeoService).setPageMeta({
      title: 'Checkout',
      description: 'Completa il tuo ordine Suea Fai.',
      path: '/checkout',
      noIndex: true,
    });
  }

  readonly shipping = signal<Shipping>('standard');
  readonly payment = signal<Payment>('card');
  readonly form = signal<CheckoutForm>({ ...EMPTY_FORM });
  /* Set di campi gia' "toccati" (blur o submit fallito). Gli errori sono
     calcolati in tempo reale ma vengono mostrati solo per i campi toccati,
     cosi' l'utente non vede messaggi rossi mentre sta ancora compilando per
     la prima volta. La chiave "cardExp" raccoglie MM+AA in un solo
     messaggio sotto il gruppo. */
  readonly touched = signal<ReadonlySet<ErrorKey>>(new Set());
  readonly submitting = signal(false);

  readonly errors = computed(() => this.computeErrors(this.form(), this.payment()));

  readonly shippingPrice = computed(() => {
    if (this.shipping() === 'express') return 9.9;
    return this.cart.subtotal() >= 39 ? 0 : 4.9;
  });
  readonly total = computed(() => this.cart.subtotal() + this.shippingPrice());

  go(path: string) { this.router.navigateByUrl(path); }

  upd(key: FormKey, ev: Event) {
    const input = ev.target as HTMLInputElement;
    const raw = input.value;
    const caretPos = input.selectionStart ?? raw.length;
    const isDelete = (ev as InputEvent).inputType?.startsWith('delete') ?? false;

    const { value, caret } = this.formatField(key, raw, caretPos, isDelete);

    this.form.update((f) => ({ ...f, [key]: value }));

    // Se il formatter ha modificato il raw (es. aggiunto uno spazio nel
    // numero carta, filtrato un carattere non valido), sincronizziamo
    // subito il DOM e il caret: il binding `[value]` di Angular farebbe
    // la stessa cosa al prossimo CD ma perderebbe la posizione del
    // cursore, e l'utente vedrebbe un salto.
    if (value !== raw) {
      input.value = value;
      try { input.setSelectionRange(caret, caret); } catch { /* alcuni input type non supportano */ }
    }

  }

  /* Scadenza carta: backspace quando il caret e' subito dopo lo "/" cancella
     "/" + la cifra prima in un solo gesto. Esempio: da "88/" l'utente preme
     backspace e arriva a "8" (non a "88"). Cosi' "88/99" si svuota in
     3 backspace simmetrici alla digitazione "8" "8" "/" automatico "9" "9". */
  onExpKeydown(ev: KeyboardEvent) {
    if (ev.key !== 'Backspace') return;
    const input = ev.target as HTMLInputElement;
    const value = input.value;
    const caret = input.selectionStart ?? 0;
    const sel = input.selectionEnd ?? caret;
    if (sel !== caret) return; // c'e' una selezione, lascia fare al browser
    if (caret < 2) return;
    if (value[caret - 1] !== '/') return;
    ev.preventDefault();
    const next = value.slice(0, caret - 2) + value.slice(caret);
    input.value = next;
    input.setSelectionRange(caret - 2, caret - 2);
    // Aggiorno il signal con il nuovo valore (passa anche dal formatter).
    this.form.update((f) => ({ ...f, cardExp: next }));
  }

  /* Formatter per campo. Ritorna il nuovo valore + posizione caret.
     - cardNumber: solo cifre, raggruppate ogni 4 con uno spazio
     - cardExp: solo cifre, lo "/" viene inserito automaticamente dopo
       le prime 2 cifre. Il backspace dello "/" (gestito in onExpKeydown)
       cancella anche la cifra prima, per simmetria con la digitazione.
     - zip / cardCvc: solo cifre, max len
     - province: solo lettere, uppercase, max 2
     - firstName / lastName / city / cardName: blocca cifre, lascia lettere /
       spazi / apostrofi / trattini
     - phone: solo +, cifre, spazi, parentesi, trattini, slash
  */
  private formatField(
    key: FormKey,
    raw: string,
    caret: number,
    isDelete: boolean,
  ): { value: string; caret: number } {
    switch (key) {
      case 'cardNumber': {
        const digitsBeforeCaret = raw.slice(0, caret).replace(/\D/g, '').length;
        const digits = raw.replace(/\D/g, '').slice(0, 19);
        const value = digits.match(/.{1,4}/g)?.join(' ') ?? '';
        return { value, caret: this.caretAfterDigits(value, digitsBeforeCaret) };
      }
      case 'cardExp': {
        const digitsBeforeCaret = raw.slice(0, caret).replace(/\D/g, '').length;
        const digits = raw.replace(/\D/g, '').slice(0, 4);
        let value: string;
        if (digits.length >= 3) {
          value = `${digits.slice(0, 2)}/${digits.slice(2)}`;
        } else if (digits.length === 2) {
          // Lo "/" appare appena finiti i 2 caratteri di MM mentre l'utente
          // sta digitando, e quando si cancella dall'anno verso il mese
          // (ad es. da "12/3" diventa "12/" tornando a YY vuoto). Sparisce
          // solo quando l'utente cancella esplicitamente lo "/" (gestito
          // in onExpKeydown che rimuove anche la cifra prima).
          value = !isDelete || raw.endsWith('/') ? `${digits}/` : digits;
        } else {
          value = digits;
        }
        return { value, caret: this.caretAfterDigits(value, digitsBeforeCaret) };
      }
      case 'zip': {
        const value = raw.replace(/\D/g, '').slice(0, 5);
        return { value, caret: this.caretAfter(raw, caret, /\d/, value.length) };
      }
      case 'cardCvc': {
        const value = raw.replace(/\D/g, '').slice(0, 4);
        return { value, caret: this.caretAfter(raw, caret, /\d/, value.length) };
      }
      case 'province': {
        const value = raw.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 2);
        return { value, caret: this.caretAfter(raw, caret, /[A-Za-z]/, value.length) };
      }
      case 'firstName':
      case 'lastName':
      case 'city':
      case 'cardName': {
        // Lascia lettere unicode, spazi, apostrofi, trattini.
        const value = raw.replace(/[^\p{L}\s'-]/gu, '');
        return { value, caret: this.caretAfter(raw, caret, /[\p{L}\s'-]/u, value.length) };
      }
      case 'phone': {
        const value = raw.replace(/[^0-9+\s()/\-]/g, '');
        return { value, caret: this.caretAfter(raw, caret, /[0-9+\s()/\-]/, value.length) };
      }
      default:
        return { value: raw, caret };
    }
  }

  /* Conta nel raw quanti caratteri che matchano la regex sono presenti prima
     della posizione caret. Quella e' la posizione caret nel valore filtrato. */
  private caretAfter(raw: string, caret: number, allowed: RegExp, maxLen: number): number {
    let count = 0;
    for (let i = 0; i < caret && i < raw.length; i++) {
      if (allowed.test(raw[i])) count++;
    }
    return Math.min(count, maxLen);
  }

  /* Per campi con separatori inseriti automaticamente: dato il numero di
     cifre prima del caret nel raw, restituisce la posizione caret nel
     valore formattato che lascia esattamente quel numero di cifre alla
     sua sinistra. */
  private caretAfterDigits(formatted: string, digitsBeforeCaret: number): number {
    if (digitsBeforeCaret <= 0) return 0;
    let count = 0;
    for (let pos = 0; pos < formatted.length; pos++) {
      if (/\d/.test(formatted[pos])) {
        count++;
        if (count === digitsBeforeCaret) return pos + 1;
      }
    }
    return formatted.length;
  }

  touch(key: ErrorKey) {
    if (this.touched().has(key)) return;
    const next = new Set(this.touched());
    next.add(key);
    this.touched.set(next);
  }

  showErr(key: ErrorKey): boolean {
    return this.touched().has(key) && !!this.errors()[key];
  }

  private computeErrors(f: CheckoutForm, payment: Payment): Partial<Record<ErrorKey, string>> {
    const e: Partial<Record<ErrorKey, string>> = {};

    // Email: obbligatoria + formato.
    const email = f.email.trim();
    if (!email) e.email = 'Obbligatorio';
    else if (!EMAIL_RE.test(email)) e.email = 'Email non valida';

    // Nome / Cognome: obbligatori, almeno 2 char, solo lettere/spazi/apostrofi/trattini.
    const fn = f.firstName.trim();
    if (!fn) e.firstName = 'Obbligatorio';
    else if (fn.length < 2) e.firstName = 'Almeno 2 caratteri';
    else if (!NAME_RE.test(fn)) e.firstName = 'Solo lettere, spazi, apostrofi o trattini';

    const ln = f.lastName.trim();
    if (!ln) e.lastName = 'Obbligatorio';
    else if (ln.length < 2) e.lastName = 'Almeno 2 caratteri';
    else if (!NAME_RE.test(ln)) e.lastName = 'Solo lettere, spazi, apostrofi o trattini';

    // Indirizzo: obbligatorio, almeno 5 char.
    const addr = f.address.trim();
    if (!addr) e.address = 'Obbligatorio';
    else if (addr.length < 5) e.address = 'Almeno 5 caratteri';

    // Citta: obbligatoria, almeno 2 char, solo lettere/spazi/apostrofi/trattini.
    const city = f.city.trim();
    if (!city) e.city = 'Obbligatorio';
    else if (city.length < 2) e.city = 'Almeno 2 caratteri';
    else if (!NAME_RE.test(city)) e.city = 'Solo lettere, spazi, apostrofi o trattini';

    // CAP: 5 cifre esatte.
    const zip = f.zip.trim();
    if (!zip) e.zip = 'Obbligatorio';
    else if (!CAP_RE.test(zip)) e.zip = 'CAP: 5 cifre';

    // Provincia: 2 lettere (es. MI).
    const prov = f.province.trim();
    if (!prov) e.province = 'Obbligatorio';
    else if (!PROV_RE.test(prov)) e.province = 'Sigla provincia: 2 lettere (es. MI)';

    // Telefono: opzionale, ma se compilato deve avere almeno 8 cifre.
    if (f.phone.trim()) {
      const digits = f.phone.replace(/\D/g, '');
      if (digits.length < 8) e.phone = 'Telefono: almeno 8 cifre';
    }

    if (payment === 'card') {
      // Numero carta: 13-19 cifre + Luhn check.
      const cardDigits = f.cardNumber.replace(/\s/g, '');
      if (!cardDigits) e.cardNumber = 'Obbligatorio';
      else if (!/^\d{13,19}$/.test(cardDigits) || !luhn(cardDigits)) {
        e.cardNumber = 'Numero carta non valido';
      }

      // Intestatario: almeno 3 char, solo lettere/spazi.
      const cn = f.cardName.trim();
      if (!cn) e.cardName = 'Obbligatorio';
      else if (cn.length < 3) e.cardName = 'Almeno 3 caratteri';
      else if (!NAME_RE.test(cn)) e.cardName = 'Solo lettere, spazi, apostrofi o trattini';

      // Scadenza: MM/AA, mese 01-12, non scaduta (mese corrente compreso).
      const exp = f.cardExp.trim();
      if (!exp) e.cardExp = 'Obbligatorio';
      else if (!EXP_RE.test(exp)) e.cardExp = 'Formato MM/AA';
      else {
        const [mmStr, yyStr] = exp.split('/');
        const mm = +mmStr;
        const yy = +yyStr;
        if (mm < 1 || mm > 12) e.cardExp = 'Mese non valido';
        else {
          const now = new Date();
          const curYY = now.getFullYear() % 100;
          const curMM = now.getMonth() + 1;
          if (yy < curYY || (yy === curYY && mm < curMM)) e.cardExp = 'Carta scaduta';
        }
      }

      // CVC: 3 o 4 cifre.
      const cvc = f.cardCvc.trim();
      if (!cvc) e.cardCvc = 'Obbligatorio';
      else if (!CVC_RE.test(cvc)) e.cardCvc = 'CVC: 3 o 4 cifre';
    }

    return e;
  }

  submit() {
    if (this.submitting()) return;
    // Al submit marchiamo tutti come touched cosi' eventuali errori si rendono
    // visibili anche per i campi non ancora toccati dall'utente.
    this.touched.set(new Set(ALL_KEYS));
    if (Object.keys(this.errors()).length > 0) {
      this.focusFirstError();
      return;
    }
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
        email: f.email.trim(),
        name: `${f.firstName.trim()} ${f.lastName.trim()}`,
        address: `${f.address.trim()}, ${f.zip.trim()} ${f.city.trim()} (${f.province.trim().toUpperCase()})`,
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

  private focusFirstError() {
    // Microtask cosi' Angular ha gia' applicato `.invalid` ai campi via CD.
    queueMicrotask(() => {
      const el = this.host.nativeElement.querySelector('input.invalid') as HTMLInputElement | null;
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus({ preventScroll: true });
    });
  }
}
