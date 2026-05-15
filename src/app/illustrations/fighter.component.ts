import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type FighterPose = 'kick' | 'guard' | 'wai';

@Component({
  selector: 'sf-fighter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="sf-svg-host" [innerHTML]="svg()"></div>`,
  styles: [`:host { display: block; width: 100%; } .sf-svg-host { display: block; line-height: 0; width: 100%; } svg { width: 100%; height: auto; }`],
})
export class FighterComponent {
  @Input() set pose(v: FighterPose) { this._pose.set(v); }
  @Input() set color(v: string) { this._color.set(v); }
  @Input() set ink(v: string) { this._ink.set(v); }
  @Input() set trunks(v: string) { this._trunks.set(v); }

  private sanitizer = inject(DomSanitizer);
  private _pose = signal<FighterPose>('kick');
  private _color = signal('#c8261c');
  private _ink = signal('#1a1410');
  private _trunks = signal('#f5c518');

  readonly svg = computed<SafeHtml>(() => {
    const pose = this._pose();
    const c = this._color();
    const ink = this._ink();
    const tr = this._trunks();
    const raw = pose === 'kick' ? this.kick(c, ink, tr) : pose === 'guard' ? this.guard(c, ink, tr) : this.wai(c, ink, tr);
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  });

  private kick(c: string, ink: string, tr: string): string {
    return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <circle cx="78" cy="44" r="18" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 60 38 L 96 38 L 92 30 L 64 30 Z" fill="${tr}" stroke="${ink}" stroke-width="1.5" />
      <line x1="78" y1="30" x2="78" y2="22" stroke="${ink}" stroke-width="2" />
      <circle cx="78" cy="22" r="3" fill="${tr}" stroke="${ink}" stroke-width="1" />
      <path d="M 78 60 L 88 110 L 102 130 L 96 158 L 88 156 L 82 130 L 70 108 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 70 108 L 102 110 L 106 132 L 100 134 L 94 124 L 90 134 L 84 122 L 78 132 L 70 130 Z" fill="${tr}" stroke="${ink}" stroke-width="2" />
      <path d="M 88 156 L 90 200 L 86 220 L 96 220 L 100 200 L 96 156 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 100 130 L 150 110 L 178 88 L 174 80 L 156 96 L 142 100 L 110 122 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 70 108 L 50 90 L 44 70 L 56 68 L 60 80 L 76 96 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 88 110 L 96 84 L 110 76 L 116 84 L 104 92 L 102 110 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <circle cx="50" cy="80" r="10" fill="${ink}" stroke="${ink}" stroke-width="1" />
      <circle cx="112" cy="82" r="10" fill="${ink}" stroke="${ink}" stroke-width="1" />
      <path d="M 76 70 L 80 80" stroke="${ink}" stroke-width="1.5" />
      <path d="M 84 76 L 86 88" stroke="${ink}" stroke-width="1.5" />
      <rect x="68" y="42" width="20" height="3" fill="${ink}" />
    </svg>`;
  }

  private guard(c: string, ink: string, tr: string): string {
    return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="44" r="18" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 82 38 L 118 38 L 114 30 L 86 30 Z" fill="${tr}" stroke="${ink}" stroke-width="1.5" />
      <line x1="100" y1="30" x2="100" y2="22" stroke="${ink}" stroke-width="2" />
      <circle cx="100" cy="22" r="3" fill="${tr}" stroke="${ink}" stroke-width="1" />
      <rect x="90" y="42" width="20" height="3" fill="${ink}" />
      <path d="M 100 60 L 120 110 L 122 160 L 78 160 L 80 110 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 78 158 L 122 158 L 124 184 L 116 188 L 110 174 L 100 188 L 90 174 L 84 188 L 76 184 Z" fill="${tr}" stroke="${ink}" stroke-width="2" />
      <path d="M 80 110 L 60 80 L 64 60 L 76 64 L 78 84 L 90 110 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 120 110 L 140 80 L 136 60 L 124 64 L 122 84 L 110 110 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <circle cx="62" cy="62" r="11" fill="${ink}" />
      <circle cx="138" cy="62" r="11" fill="${ink}" />
      <path d="M 82 188 L 78 230 L 90 230 L 96 188 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 118 188 L 122 230 L 110 230 L 104 188 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 92 76 L 96 90" stroke="${ink}" stroke-width="1.5" />
      <path d="M 104 76 L 100 90" stroke="${ink}" stroke-width="1.5" />
      <path d="M 96 100 L 104 116" stroke="${ink}" stroke-width="1.5" />
    </svg>`;
  }

  private wai(c: string, ink: string, tr: string): string {
    return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="80" r="18" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 82 74 L 118 74 L 114 66 L 86 66 Z" fill="${tr}" stroke="${ink}" stroke-width="1.5" />
      <line x1="100" y1="66" x2="100" y2="58" stroke="${ink}" stroke-width="2" />
      <circle cx="100" cy="58" r="3" fill="${tr}" stroke="${ink}" stroke-width="1" />
      <rect x="90" y="78" width="20" height="3" fill="${ink}" />
      <path d="M 92 90 L 96 70 L 104 70 L 108 90 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 100 96 L 130 130 L 130 170 L 70 170 L 70 130 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 100 96 L 120 110 L 130 130 L 108 132 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 100 96 L 80 110 L 70 130 L 92 132 Z" fill="${c}" stroke="${ink}" stroke-width="2" />
      <path d="M 70 168 L 60 200 L 80 218 L 110 218 L 130 200 L 130 168 Z" fill="${tr}" stroke="${ink}" stroke-width="2" />
      <path d="M 90 110 L 96 130" stroke="${ink}" stroke-width="1.5" />
      <path d="M 110 110 L 104 130" stroke="${ink}" stroke-width="1.5" />
    </svg>`;
  }
}
