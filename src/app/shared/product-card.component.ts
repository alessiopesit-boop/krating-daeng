import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../core/cart.service';
import { Product, fmtPrice } from '../core/products';
import { TPipe } from '../core/lang.pipe';

@Component({
  selector: 'sf-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TPipe],
  template: `
    <div class="product-card" (click)="goPdp()">
      <div class="product-card-art" [style.background]="product.id === 'single' ? '#f1e6c8' : '#c8261c'">
        <span class="product-card-tag">{{ product.tag | t }}</span>
        <img [src]="product.img" [alt]="product.name" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div class="product-card-body">
        <div class="t-mono" style="font-size:0.65rem;color:var(--red);margin-bottom:0.3rem">{{ product.thai }}</div>
        <h3 class="product-card-name">{{ product.name | t }}</h3>
        <div class="product-card-meta">{{ product.format | t }}</div>
        <div class="product-card-foot">
          <div>
            <div class="product-card-price">{{ fmt(product.price) }}</div>
            @if (product.oldPrice) {
              <div class="t-mono" style="font-size:0.7rem;text-decoration:line-through;color:var(--ink-soft)">
                {{ fmt(product.oldPrice) }}
              </div>
            }
          </div>
          <button class="btn btn--sm btn--red" (click)="addToCart($event)">{{ '+ Carrello' | t }}</button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  private cart = inject(CartService);
  private router = inject(Router);
  fmt = fmtPrice;

  goPdp() {
    this.router.navigateByUrl('/product/' + this.product.id);
  }
  addToCart(ev: Event) {
    ev.stopPropagation();
    this.cart.add(this.product.id, 1);
  }
}
