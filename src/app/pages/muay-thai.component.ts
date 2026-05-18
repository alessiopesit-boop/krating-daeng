import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { MuayThaiSectionComponent } from '../shared/muay-thai-section.component';
import { FighterComponent } from '../illustrations/fighter.component';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'sf-muay-thai-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MuayThaiSectionComponent, FighterComponent, TPipe],
  template: `
    <main>
      <section class="page-banner">
        <div class="page-banner-inner">
          <div>
            <div class="breadcrumb"><a routerLink="/">{{ 'Home' | t }}</a> / {{ 'Muay Thai' | t }}</div>
            <h1><span class="yellow">{{ 'Muay Thai' | t }}</span><br />{{ 'Heritage' | t }}</h1>
          </div>
        </div>
      </section>

      <sf-muay-thai-section />

      <section class="origins paper-bg">
        <div class="section-inner ritual-feature">
          <div>
            <span class="t-eyebrow">{{ '★ Wai Khru Ram Muay' | t }}</span>
            <h2 class="origins-title">{{ 'Il ' | t }}<span class="red">{{ 'rituale' | t }}</span><br />{{ 'prima del colpo.' | t }}</h2>
            <p class="ritual-body">
              {{ 'Prima di ogni incontro il combattente esegue il ' | t }}<em>wai khru ram muay</em>{{ ': una danza cerimoniale che onora i maestri, gli antenati e la propria scuola. È in quei minuti silenziosi — non durante il combattimento — che il Muay Thai diventa Muay Thai.' | t }}
            </p>
            <p class="ritual-body">{{ 'Suea Fai ha sponsorizzato per primi i cartelloni del wai khru, non solo gli incontri. Perché il rispetto viene prima della vittoria.' | t }}</p>
          </div>
          <div class="ritual-art">
            <sf-fighter pose="wai" color="#c8261c" ink="#f5c518" trunks="#f5c518" />
          </div>
        </div>
      </section>
    </main>
  `,
})
export class MuayThaiPageComponent {
  constructor() {
    inject(SeoService).setPageMeta({
      title: 'Muay Thai Heritage',
      description:
        'Sponsor del ring dal 1976. Cartelloni in juta al Rajadamnern e al Lumpinee, il wai khru ram muay e il rapporto fra Suea Fai e le palestre Muay Thai.',
      path: '/#/muay-thai',
    });
  }
}
