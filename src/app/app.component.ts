import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TweaksService } from './core/tweaks.service';
import { NavComponent } from './chrome/nav.component';
import { FooterComponent } from './chrome/footer.component';
import { CartDrawerComponent } from './chrome/cart-drawer.component';
import { BUILD_CONTEXT } from './core/build-info';

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
  // applicherebbe le palette del brand.
  private readonly tweaks = inject(TweaksService);

  constructor() {
    // In build di sviluppo, anteponi "[dev]" al titolo del documento cosi'
    // dal tab del browser si distingue subito una versione non rilasciata.
    // In production (release) BUILD_CONTEXT vale 'release' e non si tocca.
    if (BUILD_CONTEXT === 'dev') {
      const title = inject(Title);
      title.setTitle(`[dev] ${title.getTitle()}`);
    }
  }
}
