import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TweaksService } from './core/tweaks.service';
import { NavComponent } from './chrome/nav.component';
import { FooterComponent } from './chrome/footer.component';
import { CartDrawerComponent } from './chrome/cart-drawer.component';
import { TweaksPanelComponent } from './chrome/tweaks-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NavComponent, FooterComponent, CartDrawerComponent, TweaksPanelComponent],
  template: `
    <sf-nav />
    <router-outlet />
    <sf-footer />
    <sf-cart-drawer />
    <sf-tweaks-panel />
  `,
})
export class AppComponent {
  // Eagerly instantiate so its constructor effect installs the data-* attributes
  // on <html> on first paint (palette, thai). No template references needed.
  private readonly tweaks = inject(TweaksService);
}
