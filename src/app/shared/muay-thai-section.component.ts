import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FighterComponent, FighterPose } from '../illustrations/fighter.component';
import { TPipe } from '../core/lang.pipe';

interface Fight {
  thai: string;
  red: string;
  yellow: string;
  date: string;
  venue: string;
  pose: FighterPose;
  bg: string;
  color: string;
  ink: string;
  trunks: string;
}

@Component({
  selector: 'sf-muay-thai-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FighterComponent, TPipe],
  template: `
    <section class="muay paper-bg">
      <div class="section-inner">
        <div class="muay-head">
          <div>
            <span class="t-eyebrow">{{ '★ Muay Thai Heritage' | t }}</span>
            <h2>{{ 'Sponsor del ' | t }}<span class="red">{{ 'ring' | t }}</span><br />{{ 'dal 1976.' | t }}</h2>
          </div>
          <div class="lead">
            {{ 'Il logo dei due tigri che si caricano è nato per i cartelloni del Rajadamnern. Il marchio segue il combattente, mai il contrario.' | t }}
          </div>
        </div>

        <div class="poster-wall">
          @for (f of fights; track $index) {
            <div class="poster">
              <div class="poster-header">{{ f.thai }}</div>
              <div class="poster-art" [style.background]="f.bg">
                <sf-fighter [pose]="f.pose" [color]="f.color" [ink]="f.ink" [trunks]="f.trunks" />
              </div>
              <div class="poster-foot">
                <div class="poster-vs">{{ f.red }} <span style="color:var(--red)">vs</span> {{ f.yellow }}</div>
                <div class="poster-date">{{ f.date }} · {{ f.venue }}</div>
              </div>
            </div>
          }
        </div>

        <div class="gym-feature">
          <img src="images/05-muay-thai-gym.png" alt="Palestra Muay Thai" class="gym-feature-img" />
          <div>
            <h3 class="t-display gym-feature-title">{{ 'Ogni palestra ha la sua bottiglia.' | t }}</h3>
            <p class="gym-feature-body">
              {{ 'Da Bangkok a Chiang Mai, da Phuket a Korat, le bottigliette vuote di Suea Fai si accumulano sui banconi delle palestre come trofei silenziosi. Una a fine allenamento. Una prima del clinch. Una al risveglio prima della corsa.' | t }}
            </p>
            <div class="badge-row" style="margin-top:1.4rem">
              <span class="badge" style="background:var(--ink);color:var(--yellow)">RAJADAMNERN ✦ 1976</span>
              <span class="badge" style="background:var(--ink);color:var(--yellow)">LUMPINEE ✦ 1979</span>
              <span class="badge" style="background:var(--ink);color:var(--yellow)">WORLD CUP ✦ 1983</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class MuayThaiSectionComponent {
  fights: Fight[] = [
    { thai: 'เสือไฟ', red: 'SOMCHAI', yellow: 'ARJAN',  date: '21 ม.ค. 2517', venue: 'RAJADAMNERN', pose: 'kick',  bg: '#1a1410', color: '#c8261c', ink: '#f5c518', trunks: '#f5c518' },
    { thai: 'เสือไฟ', red: 'BUAKAW',  yellow: 'PHET',   date: '08 ก.พ. 2519', venue: 'LUMPINEE',    pose: 'guard', bg: '#c8261c', color: '#f5c518', ink: '#1a1410', trunks: '#1a1410' },
    { thai: 'เสือไฟ', red: 'SAMART',  yellow: 'DIESEL', date: '14 ส.ค. 2521', venue: 'RAJADAMNERN', pose: 'wai',   bg: '#1a1410', color: '#c8261c', ink: '#f5c518', trunks: '#f5c518' },
    { thai: 'เสือไฟ', red: 'ROB',     yellow: 'FAH',    date: '03 พ.ย. 2523', venue: 'LUMPINEE',    pose: 'kick',  bg: '#c8261c', color: '#f5c518', ink: '#1a1410', trunks: '#1a1410' },
  ];
}
