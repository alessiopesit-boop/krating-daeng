import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../core/cart.service';
import { PRODUCTS, fmtPrice } from '../core/products';
import { TPipe } from '../core/lang.pipe';

interface FormatOpt { id: string; name: string; price: number; }

@Component({
  selector: 'sf-pdp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TPipe],
  template: `
    <main>
      <section class="page-banner" style="padding-bottom:2rem">
        <div class="page-banner-inner">
          <div class="breadcrumb">
            <a routerLink="/">Home</a> / <a routerLink="/shop">Shop</a> / {{ product().name | t }}
          </div>
        </div>
      </section>
      <section class="pdp">
        <div class="pdp-grid">
          <div>
            <div class="pdp-art">
              <img [src]="thumbs[activeThumb()]" [alt]="product().name" style="width:100%;height:100%;object-fit:cover" />
              <div style="position:absolute;top:1rem;right:1rem">
                <span class="stamp" style="background:var(--yellow);border-color:var(--ink);color:var(--ink)">{{ 'ORIGINALE 1974' | t }}</span>
              </div>
            </div>
            <div class="pdp-thumbs">
              @for (t of thumbs; track $index; let i = $index) {
                <div class="pdp-thumb" [class.active]="activeThumb() === i" (click)="activeThumb.set(i)">
                  <img [src]="t" alt="" style="width:100%;height:100%;object-fit:cover" />
                </div>
              }
            </div>
          </div>
          <div>
            <div class="pdp-meta">{{ '★ Energy Tonic · เสือไฟ · 150ML' | t }}</div>
            <h1>
              <span class="thai">{{ product().thai }}</span>
              {{ product().name | t }}
            </h1>
            <p class="pdp-tagline">{{ product().desc | t }}</p>

            <div class="pdp-price">
              {{ fmt(selectedFormat().price) }}
              @if (product().oldPrice && activeFormat() === product().id) {
                <span class="pdp-price-old">{{ fmt(product().oldPrice!) }}</span>
              }
            </div>

            <div class="t-mono" style="font-size:0.7rem;margin-top:1.4rem;letter-spacing:0.18em">{{ 'FORMATO' | t }}</div>
            <div class="pdp-format">
              @for (f of formats; track f.id) {
                <div class="pdp-format-opt" [class.active]="activeFormat() === f.id" (click)="activeFormat.set(f.id)">
                  <span class="name">{{ f.name | t }}</span>
                  <span class="price">{{ fmt(f.price) }}</span>
                </div>
              }
            </div>

            <div class="pdp-qty">
              <div class="t-mono" style="font-size:0.7rem;letter-spacing:0.18em;margin-right:0.4rem">{{ 'QTÀ' | t }}</div>
              <div class="qty-stepper">
                <button (click)="dec()">−</button>
                <input [value]="qty()" (input)="setQty($event)" />
                <button (click)="inc()">+</button>
              </div>
              <button class="btn btn--red pdp-add" (click)="addToCart()">
                {{ 'Aggiungi · ' | t }}{{ fmt(selectedFormat().price * qty()) }}
              </button>
            </div>

            <div class="pdp-features">
              <div class="pdp-feature"><span class="glyph">✦</span><span><strong>{{ 'Formula 1974 originale' | t }}</strong>{{ ' — caffeina 50mg, taurina 1000mg, vitamine B.' | t }}</span></div>
              <div class="pdp-feature"><span class="glyph">✦</span><span><strong>{{ 'Vetro ambrato 150ml' | t }}</strong>{{ ' — riciclabile, vuoto a rendere sui pack interi.' | t }}</span></div>
              <div class="pdp-feature"><span class="glyph">✦</span><span><strong>{{ 'Non gassata' | t }}</strong>{{ ' — densa, sciroposa, dolce. Come un tonico, non come una bibita.' | t }}</span></div>
              <div class="pdp-feature"><span class="glyph">✦</span><span><strong>{{ 'Spedizione 48–72h' | t }}</strong>{{ ' in Italia. Gratis sopra i 39€.' | t }}</span></div>
              <div class="pdp-feature"><span class="glyph">✦</span><span><strong>{{ 'Importata ufficialmente' | t }}</strong>{{ ' dal magazzino di Milano. Filiera tracciata.' | t }}</span></div>
            </div>

            <div style="margin-top:2rem;padding:1.2rem;background:var(--cream);border:2px dashed var(--ink)">
              <div class="t-eyebrow" style="margin-bottom:0.4rem">{{ '★ Note del laboratorio' | t }}</div>
              <p style="margin:0;font-size:0.92rem;line-height:1.5">
                <em>{{ '"La densità è data dallo zucchero di canna non raffinato. Agita prima di bere — i sedimenti naturali della formula si depositano in fondo come nei tonici degli anni \\'70."' | t }}</em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
})
export class PdpComponent {
  private route = inject(ActivatedRoute);
  private cart = inject(CartService);
  fmt = fmtPrice;

  private paramId = toSignal(this.route.paramMap, { requireSync: true });

  readonly product = computed(() => {
    const id = this.paramId().get('id');
    return PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
  });

  readonly qty = signal(1);
  readonly activeThumb = signal(0);
  readonly activeFormat = signal<string>('single');

  formats: FormatOpt[] = [
    { id: 'single',         name: '1 Bottiglia',   price: 4.5 },
    { id: 'pack6',          name: 'Pack da 6',     price: 24.9 },
    { id: 'pack12',         name: 'Pack da 12',    price: 47.5 },
    { id: 'bundle-poster',  name: 'Bundle Poster', price: 18.0 },
  ];

  thumbs = [
    'images/01-hero-bottle.png',
    'images/04-bottle-dark.png',
    'images/06-crate.png',
    'images/03-poster-muay-thai.png',
  ];

  readonly selectedFormat = computed(() => this.formats.find((f) => f.id === this.activeFormat()) ?? this.formats[0]);

  constructor() {
    // Sync the format selector with the URL-driven product so navigating from /shop
    // lands on the matching format chip instead of defaulting to "single".
    queueMicrotask(() => this.activeFormat.set(this.product().id));
  }

  dec() { this.qty.update((v) => Math.max(1, v - 1)); }
  inc() { this.qty.update((v) => v + 1); }
  setQty(ev: Event) {
    const v = parseInt((ev.target as HTMLInputElement).value, 10);
    this.qty.set(Math.max(1, isNaN(v) ? 1 : v));
  }
  addToCart() {
    this.cart.add(this.activeFormat(), this.qty());
  }
}
