import { Injectable, computed, effect, signal } from '@angular/core';
import { PRODUCTS, Product } from './products';

export interface CartLine {
  id: string;
  qty: number;
}

export interface ResolvedLine extends CartLine {
  product: Product;
}

const STORAGE_KEY = 'sf-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartLine[]>(this.load());
  readonly open = signal(false);

  readonly items = this._items.asReadonly();
  readonly lines = computed<ResolvedLine[]>(() =>
    this._items()
      .map((l) => ({ ...l, product: PRODUCTS.find((p) => p.id === l.id)! }))
      .filter((l) => l.product),
  );
  readonly subtotal = computed(() =>
    this.lines().reduce((s, l) => s + l.product.price * l.qty, 0),
  );
  readonly count = computed(() => this.lines().reduce((s, l) => s + l.qty, 0));

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items()));
      } catch {
        // localStorage unavailable, ignore
      }
    });
  }

  add(productId: string, qty = 1) {
    const curr = this._items();
    const i = curr.findIndex((l) => l.id === productId);
    if (i >= 0) {
      const next = [...curr];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      this._items.set(next);
    } else {
      this._items.set([...curr, { id: productId, qty }]);
    }
    this.open.set(true);
  }

  update(id: string, qty: number) {
    this._items.set(
      this._items().map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l)),
    );
  }

  remove(id: string) {
    this._items.set(this._items().filter((l) => l.id !== id));
  }

  clear() {
    this._items.set([]);
  }

  private load(): CartLine[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }
}
