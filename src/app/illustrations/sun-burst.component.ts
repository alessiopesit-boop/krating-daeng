import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'sf-sun-burst',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="sf-svg-host" [innerHTML]="svg()"></div>`,
  styles: [`:host { display: block; } .sf-svg-host { display: block; line-height: 0; }`],
})
export class SunBurstComponent {
  @Input() set size(v: number) { this._size.set(v); }
  @Input() set color(v: string) { this._color.set(v); }
  @Input() set ink(v: string) { this._ink.set(v); }
  @Input() set strokeOpacity(v: number) { this._strokeOp.set(v); }

  private sanitizer = inject(DomSanitizer);
  private _size = signal(600);
  private _color = signal('#f5c518');
  private _ink = signal('#1a1410');
  private _strokeOp = signal(1);

  readonly svg = computed<SafeHtml>(() => {
    const size = this._size();
    const color = this._color();
    const ink = this._ink();
    const so = this._strokeOp();
    const rays = Array.from({ length: 24 }, (_, i) => {
      const a = (i * 360) / 24;
      return `<polygon points="-12,-280 12,-280 0,-110" fill="${color}" opacity="${i % 2 === 0 ? 1 : 0.85}" transform="rotate(${a})" stroke="${ink}" stroke-width="1.5" stroke-opacity="${so}" />`;
    }).join('');
    const raw = `
      <svg viewBox="0 0 600 600" width="${size}" height="${size}" style="display:block" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(300 300)">${rays}
          <circle r="100" fill="${color}" stroke="${ink}" stroke-width="3" />
          <circle r="100" fill="none" stroke="${ink}" stroke-width="1" stroke-dasharray="3 5" opacity="0.4" />
        </g>
      </svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  });
}
