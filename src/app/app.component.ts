import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TweaksService } from './core/tweaks.service';
import { NavComponent } from './chrome/nav.component';
import { FooterComponent } from './chrome/footer.component';
import { CartDrawerComponent } from './chrome/cart-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NavComponent, FooterComponent, CartDrawerComponent],
  template: `
    <sf-nav />
    <router-outlet />
    <sf-footer />
    <sf-cart-drawer />
  `,
})
export class AppComponent {
  // TweaksService viene istanziato per il side-effect: installa i data-palette
  // e data-thai su <html> con i valori di default. Senza, il tema globale non
  // applicherebbe le palette del brand. Il prefisso "[dev]" al document.title
  // e' gestito centralmente dal SeoService, che ogni pagina chiama per
  // settare title + meta description + open graph.
  private readonly tweaks = inject(TweaksService);
}
