import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { LogoComponent } from '../illustrations/logo.component';
import { APP_VERSION, BUILD_CONTEXT, BUILD_SHA } from '../core/build-info';

@Component({
  selector: 'sf-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LogoComponent, TPipe],
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div>
          <div style="display:flex;gap:0.7rem;align-items:center;margin-bottom:1rem">
            <sf-logo [size]="48" [showText]="false" />
            <div>
              <div style="font-family:var(--font-thai);font-size:1.4rem;color:var(--yellow)">เสือไฟ</div>
              <div style="font-family:var(--font-display);font-size:1.6rem;text-transform:uppercase">Suea Fai</div>
            </div>
          </div>
          <p style="max-width:32ch;line-height:1.5;font-size:0.92rem;opacity:0.85;margin:0">
            {{ 'Energy tonic thailandese dal 1974. Stessa formula. Stessa bottiglia. Stessa fame.' | t }}
          </p>
          <div style="margin-top:1.4rem;display:flex;gap:0.5rem">
            <span class="badge">★ 1974</span>
            <span class="badge">BANGKOK</span>
            <span class="badge">150ML</span>
          </div>
        </div>
        <div>
          <h4>{{ 'Shop' | t }}</h4>
          <ul>
            <li><a routerLink="/shop">{{ 'Tutti i prodotti' | t }}</a></li>
            <li><a routerLink="/product/single">{{ 'Bottiglia singola' | t }}</a></li>
            <li><a routerLink="/product/pack6">{{ 'Pack da 6' | t }}</a></li>
            <li><a routerLink="/product/pack12">{{ 'Pack da 12' | t }}</a></li>
            <li><a routerLink="/product/bundle-poster">{{ 'Bundle poster' | t }}</a></li>
          </ul>
        </div>
        <div>
          <h4>{{ 'Brand' | t }}</h4>
          <ul>
            <li><a routerLink="/storia">{{ 'La Storia' | t }}</a></li>
            <li><a routerLink="/muay-thai">{{ 'Muay Thai' | t }}</a></li>
            <li><a routerLink="/faq">{{ 'Domande' | t }}</a></li>
            <li><a href="#">{{ 'Contatti' | t }}</a></li>
            <li><a href="#">{{ 'Wholesale' | t }}</a></li>
          </ul>
        </div>
        <div>
          <h4>{{ 'Legal' | t }}</h4>
          <ul>
            <li><a href="#">{{ 'Privacy' | t }}</a></li>
            <li><a href="#">{{ 'Cookie' | t }}</a></li>
            <li><a href="#">{{ 'Termini' | t }}</a></li>
            <li><a href="#">{{ 'Ingredienti' | t }}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-base">
        <span>© 1974—2026 Suea Fai · T.C. Pharmaceutical (fictional)</span>
        <span>กระทิงไฟ · {{ 'Bangkok ↔ Milano' | t }} · {{ versionLabel }}</span>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly versionLabel =
    BUILD_CONTEXT === 'dev'
      ? `v${APP_VERSION} · dev${BUILD_SHA ? ' · ' + BUILD_SHA : ''}`
      : `v${APP_VERSION}`;
}
