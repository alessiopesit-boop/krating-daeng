import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { tigerShape } from './tiger-shape';

@Component({
  selector: 'sf-tiger-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="sf-svg-host" [innerHTML]="svg()"></div>`,
  styles: [`:host { display: inline-block; } .sf-svg-host { display: inline-block; line-height: 0; }`],
})
export class TigerBadgeComponent {
  @Input() set size(v: number) { this._size.set(v); }

  private sanitizer = inject(DomSanitizer);
  private _size = signal(120);

  readonly svg = computed<SafeHtml>(() => {
    const size = this._size();
    const raw = `
      <svg viewBox="0 0 120 120" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="56" fill="#1a1410" stroke="#f5c518" stroke-width="3" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="#f5c518" stroke-width="0.6" stroke-dasharray="2 3" />
        <g transform="translate(60 70) scale(1.1)">${tigerShape({ color: '#f5c518', ink: '#f5c518' })}</g>
      </svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  });
}
