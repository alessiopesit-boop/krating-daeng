import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TweaksService, HeroAnim, Palette, ThaiPresence } from '../core/tweaks.service';
import { LangService } from '../core/lang.service';
import { TPipe } from '../core/lang.pipe';

@Component({
  selector: 'sf-tweaks-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TPipe],
  template: `
    @if (!tweaks.panelOpen()) {
      <button class="twk-toggle-btn" (click)="tweaks.togglePanel()">★ {{ 'Tweaks' | t }}</button>
    } @else {
      <div class="twk-panel">
        <div class="twk-hd">
          <b>{{ 'Tweaks' | t }}</b>
          <button class="twk-x" [attr.aria-label]="'Chiudi' | t" (click)="tweaks.togglePanel()">✕</button>
        </div>
        <div class="twk-body">
          <div class="twk-sect">{{ 'Palette' | t }}</div>
          <div class="twk-row">
            <div class="twk-lbl">{{ 'Globale' | t }}</div>
            <div class="twk-seg">
              @for (o of paletteOpts; track o.value) {
                <button [class.active]="tweaks.tweaks().palette === o.value" (click)="setPalette(o.value)">{{ o.label | t }}</button>
              }
            </div>
          </div>

          <div class="twk-sect">{{ 'Script Thai' | t }}</div>
          <div class="twk-row">
            <div class="twk-lbl">{{ 'Presenza' | t }}</div>
            <div class="twk-seg">
              @for (o of thaiOpts; track o.value) {
                <button [class.active]="tweaks.tweaks().thaiPresence === o.value" (click)="setThai(o.value)">{{ o.label | t }}</button>
              }
            </div>
          </div>

          <div class="twk-sect">{{ 'Hero' | t }}</div>
          <div class="twk-row">
            <div class="twk-lbl">{{ 'Sfondo' | t }}</div>
            <div class="twk-seg">
              @for (o of heroOpts; track o.value) {
                <button [class.active]="tweaks.tweaks().heroAnim === o.value" (click)="setHero(o.value)">{{ o.label | t }}</button>
              }
            </div>
          </div>

          <div class="twk-sect">{{ 'Lingua' | t }}</div>
          <div class="twk-row">
            <div class="twk-seg">
              <button [class.active]="lang.lang() === 'it'" (click)="lang.setLang('it')">IT</button>
              <button [class.active]="lang.lang() === 'en'" (click)="lang.setLang('en')">EN</button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class TweaksPanelComponent {
  tweaks = inject(TweaksService);
  lang = inject(LangService);

  readonly paletteOpts: Array<{ value: Palette; label: string }> = [
    { value: 'red', label: 'Rosso' },
    { value: 'yellow', label: 'Giallo' },
    { value: 'black', label: 'Nero' },
  ];
  readonly thaiOpts: Array<{ value: ThaiPresence; label: string }> = [
    { value: 'heavy', label: 'Forte' },
    { value: 'light', label: 'Leggera' },
    { value: 'off', label: 'Off' },
  ];
  readonly heroOpts: Array<{ value: HeroAnim; label: string }> = [
    { value: 'rays', label: 'Raggi' },
    { value: 'bulls', label: 'Tigri' },
    { value: 'static', label: 'Statico' },
  ];

  setPalette(v: Palette) { this.tweaks.set('palette', v); }
  setThai(v: ThaiPresence) { this.tweaks.set('thaiPresence', v); }
  setHero(v: HeroAnim) { this.tweaks.set('heroAnim', v); }
}
