import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { MuayThaiSectionComponent } from '../shared/muay-thai-section.component';
import { FighterComponent } from '../illustrations/fighter.component';

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
            <div class="breadcrumb"><a routerLink="/">Home</a> / {{ 'Muay Thai' | t }}</div>
            <h1><span class="yellow">{{ 'Muay Thai' | t }}</span><br />{{ 'Heritage' | t }}</h1>
          </div>
        </div>
      </section>

      <sf-muay-thai-section />

      <section class="origins paper-bg">
        <div class="section-inner" style="display:grid;grid-template-columns:1fr 1fr;gap:4rem">
          <div>
            <span class="t-eyebrow">{{ '★ Wai Khru Ram Muay' | t }}</span>
            <h2 class="origins-title">{{ 'Il ' | t }}<span class="red">{{ 'rituale' | t }}</span><br />{{ 'prima del colpo.' | t }}</h2>
            <p style="font-size:1.05rem;line-height:1.6;margin-top:1.4rem">
              {{ 'Prima di ogni incontro il combattente esegue il ' | t }}<em>wai khru ram muay</em>{{ ': una danza cerimoniale che onora i maestri, gli antenati e la propria scuola. È in quei minuti silenziosi — non durante il combattimento — che il Muay Thai diventa Muay Thai.' | t }}
            </p>
            <p style="font-size:1.05rem;line-height:1.6">{{ 'Suea Fai ha sponsorizzato per primi i cartelloni del wai khru, non solo gli incontri. Perché il rispetto viene prima della vittoria.' | t }}</p>
          </div>
          <div style="display:grid;place-items:center;background:var(--ink);padding:3rem;border:4px solid var(--ink)">
            <sf-fighter pose="wai" color="#c8261c" ink="#f5c518" trunks="#f5c518" />
          </div>
        </div>
      </section>
    </main>
  `,
})
export class MuayThaiPageComponent {}
