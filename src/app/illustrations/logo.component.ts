import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { tigerShape } from './tiger-shape';

@Component({
  selector: 'sf-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="sf-svg-host" [innerHTML]="svg()"></div>`,
  styles: [`:host { display: inline-block; } .sf-svg-host { display: inline-block; line-height: 0; }`],
})
export class LogoComponent {
  @Input() set size(v: number) { this._size.set(v); }
  @Input() set color(v: string) { this._color.set(v); }
  @Input() set sun(v: string) { this._sun.set(v); }
  @Input() set ink(v: string) { this._ink.set(v); }
  @Input() set showText(v: boolean) { this._showText.set(v); }

  private sanitizer = inject(DomSanitizer);
  private _size = signal(240);
  private _color = signal('#c8261c');
  private _sun = signal('#f5c518');
  private _ink = signal('#1a1410');
  private _showText = signal(true);

  readonly svg = computed<SafeHtml>(() => {
    const size = this._size();
    const color = this._color();
    const sun = this._sun();
    const ink = this._ink();
    const rays = Array.from({ length: 16 }, (_, i) => {
      const a = (i * 360) / 16;
      return `<polygon points="-6,-118 6,-118 0,-78" fill="${sun}" transform="rotate(${a})" stroke="${ink}" stroke-width="1.5" />`;
    }).join('');
    const banner = this._showText()
      ? `<g><path d="M 30 195 L 210 195 L 200 218 L 40 218 Z" fill="${ink}" />
           <text x="120" y="212" text-anchor="middle" fill="${sun}" style="font-family:'Bowlby One',Impact,sans-serif;font-size:16px;letter-spacing:0.08em;text-transform:uppercase;">SUEA FAI · 1974</text></g>`
      : '';
    const raw = `
      <svg viewBox="0 0 240 240" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(120 120)">${rays}</g>
        <circle cx="120" cy="120" r="78" fill="${sun}" stroke="${ink}" stroke-width="3" />
        <circle cx="120" cy="120" r="78" fill="none" stroke="${ink}" stroke-width="1" stroke-dasharray="2 4" opacity="0.5" />
        <g transform="translate(70 130) scale(0.95)">${tigerShape({ color, ink, flip: true })}</g>
        <g transform="translate(170 130) scale(0.95)">${tigerShape({ color, ink })}</g>
        ${banner}
      </svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  });
}
