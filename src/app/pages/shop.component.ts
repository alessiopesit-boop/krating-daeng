import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS } from '../core/products';
import { ProductCardComponent } from '../shared/product-card.component';
import { TigerBadgeComponent } from '../illustrations/tiger-badge.component';
import { TPipe } from '../core/lang.pipe';

type Filter = 'all' | 'single' | 'multi' | 'bundle';
type Sort = 'featured' | 'price-asc' | 'price-desc';

@Component({
  selector: 'sf-shop',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ProductCardComponent, TigerBadgeComponent, TPipe],
  template: `
    <main>
      <section class="page-banner">
        <div class="page-banner-inner">
          <div>
            <div class="breadcrumb"><a routerLink="/">{{ 'Home' | t }}</a> / {{ 'Shop' | t }}</div>
            <h1>{{ 'Tutti i ' | t }}<span class="yellow">{{ 'prodotti' | t }}</span></h1>
          </div>
          <div class="t-mono" style="color:var(--yellow)">
            {{ sorted().length }} {{ 'prodotti · spedizione 48–72h' | t }}
          </div>
        </div>
      </section>

      <section class="shop-section">
        <div class="section-inner shop-page-layout">
          <aside>
            <div class="filter-block">
              <h5>{{ 'Formato' | t }}</h5>
              @for (opt of filterOpts; track opt.value) {
                <label class="filter-opt" [class.active]="filter() === opt.value">
                  <input type="radio" name="f" [checked]="filter() === opt.value" (change)="filter.set(opt.value)" />
                  {{ opt.label | t }}
                </label>
              }
            </div>
            <div class="filter-block">
              <h5>{{ 'Ordina per' | t }}</h5>
              @for (opt of sortOpts; track opt.value) {
                <label class="filter-opt" [class.active]="sort() === opt.value">
                  <input type="radio" name="s" [checked]="sort() === opt.value" (change)="sort.set(opt.value)" />
                  {{ opt.label | t }}
                </label>
              }
            </div>
            <div class="filter-block">
              <h5>{{ 'Disponibilità' | t }}</h5>
              <div class="t-mono" style="font-size:0.78rem;color:var(--ink-soft);line-height:1.6">
                {{ 'Tutti i prodotti sono disponibili e spediti dal magazzino di Milano entro 24h.' | t }}
              </div>
            </div>
            <div style="margin-top:2rem">
              <sf-tiger-badge [size]="140" />
            </div>
          </aside>
          <div class="shop-grid shop-grid--with-sidebar">
            @for (p of sorted(); track p.id) {
              <sf-product-card [product]="p" />
            }
          </div>
        </div>
      </section>
    </main>
  `,
})
export class ShopComponent {
  readonly filter = signal<Filter>('all');
  readonly sort = signal<Sort>('featured');

  filterOpts: Array<{ value: Filter; label: string }> = [
    { value: 'all',    label: 'Tutti' },
    { value: 'single', label: 'Bottiglia singola' },
    { value: 'multi',  label: 'Multipack' },
    { value: 'bundle', label: 'Bundle speciali' },
  ];
  sortOpts: Array<{ value: Sort; label: string }> = [
    { value: 'featured',   label: 'In evidenza' },
    { value: 'price-asc',  label: 'Prezzo ↑' },
    { value: 'price-desc', label: 'Prezzo ↓' },
  ];

  readonly sorted = computed(() => {
    const f = this.filter();
    let list = PRODUCTS.filter((p) => {
      if (f === 'all') return true;
      if (f === 'single') return p.id === 'single';
      if (f === 'multi') return p.id === 'pack6' || p.id === 'pack12';
      if (f === 'bundle') return p.id.startsWith('bundle');
      return true;
    });
    const s = this.sort();
    if (s === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (s === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  });
}
