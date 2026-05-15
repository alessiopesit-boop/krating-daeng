import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'sf-thai-ornament',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="sf-svg-host" [innerHTML]="svg()"></div>`,
  styles: [`:host { display: inline-block; } .sf-svg-host { display: inline-block; line-height: 0; }`],
})
export class ThaiOrnamentComponent {
  @Input() set width(v: number) { this._width.set(v); }
  @Input() set color(v: string) { this._color.set(v); }

  private sanitizer = inject(DomSanitizer);
  private _width = signal(200);
  private _color = signal('#1a1410');

  readonly svg = computed<SafeHtml>(() => {
    const w = this._width();
    const c = this._color();
    const raw = `
      <svg viewBox="0 0 200 40" width="${w}" style="height:auto" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 20 L 20 20 L 26 8 L 32 20 L 40 12 L 46 20 L 52 8 L 60 20 L 80 20" fill="none" stroke="${c}" stroke-width="2" />
        <path d="M 100 20 C 92 20, 88 12, 100 4 C 112 12, 108 20, 100 20 Z" fill="${c}" />
        <path d="M 200 20 L 180 20 L 174 8 L 168 20 L 160 12 L 154 20 L 148 8 L 140 20 L 120 20" fill="none" stroke="${c}" stroke-width="2" />
        <circle cx="100" cy="32" r="2" fill="${c}" />
      </svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  });
}
