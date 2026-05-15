import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CartService } from '../core/cart.service';
import { LangService } from '../core/lang.service';
import { TPipe } from '../core/lang.pipe';
import { LogoComponent } from '../illustrations/logo.component';
import { LangToggleComponent } from './lang-toggle.component';

@Component({
  selector: 'sf-nav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LogoComponent, LangToggleComponent, TPipe],
  template: `
    <nav class="nav">
      <div class="nav-inner">
        <button
          class="nav-burger"
          aria-label="Menu"
          [attr.aria-expanded]="menuOpen()"
          (click)="toggleMenu()"
        >
          <span [class.open]="menuOpen()"></span>
          <span [class.open]="menuOpen()"></span>
          <span [class.open]="menuOpen()"></span>
        </button>
        <a routerLink="/" class="nav-brand">
          <span class="nav-mark"><sf-logo [size]="36" [showText]="false" /></span>
          <span>Suea Fai</span>
        </a>
        <ul class="nav-links">
          <li><a routerLink="/" [class.active]="route() === '/'">{{ 'Home' | t }}</a></li>
          <li><a routerLink="/shop" [class.active]="route().startsWith('/shop') || route().startsWith('/product/')">{{ 'Shop' | t }}</a></li>
          <li><a routerLink="/storia" [class.active]="route().startsWith('/storia')">{{ 'La Storia' | t }}</a></li>
          <li><a routerLink="/muay-thai" [class.active]="route().startsWith('/muay-thai')">{{ 'Muay Thai' | t }}</a></li>
          <li><a routerLink="/faq" [class.active]="route().startsWith('/faq')">{{ 'FAQ' | t }}</a></li>
        </ul>
        <div class="nav-actions">
          <sf-lang-toggle />
          <button
            class="nav-cart-btn"
            (click)="cart.open.set(true)"
            style="min-width:130px;justify-content:center"
          >
            {{ 'Carrello' | t }}
            @if (cart.count() > 0) {
              <span class="nav-cart-count">{{ cart.count() }}</span>
            }
          </button>
        </div>
      </div>
      <div class="mobile-menu" [class.open]="menuOpen()" (click)="closeMenu()">
        <ul class="mobile-menu-list" (click)="$event.stopPropagation()">
          <li><a routerLink="/" (click)="closeMenu()">{{ 'Home' | t }}</a></li>
          <li><a routerLink="/shop" (click)="closeMenu()">{{ 'Shop' | t }}</a></li>
          <li><a routerLink="/storia" (click)="closeMenu()">{{ 'La Storia' | t }}</a></li>
          <li><a routerLink="/muay-thai" (click)="closeMenu()">{{ 'Muay Thai' | t }}</a></li>
          <li><a routerLink="/faq" (click)="closeMenu()">{{ 'FAQ' | t }}</a></li>
        </ul>
      </div>
    </nav>
  `,
})
export class NavComponent {
  cart = inject(CartService);
  lang = inject(LangService);
  private router = inject(Router);

  readonly menuOpen = signal(false);
  readonly route = signal<string>(this.router.url);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.route.set(e.urlAfterRedirects);
        this.menuOpen.set(false);
      });

    effect(() => {
      document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
  closeMenu() {
    this.menuOpen.set(false);
  }
}
