import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FAQ_DATA, FaqItem } from './faq-data';
import { TPipe } from '../core/lang.pipe';

@Component({
  selector: 'sf-faq-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TPipe],
  template: `
    <div class="faq-list">
      @for (it of items(); track $index; let i = $index) {
        <div class="faq-item" [class.open]="open() === i" (click)="toggle(i)">
          <div class="faq-q">
            <span>{{ it.q | t }}</span>
            <span class="toggle" aria-hidden="true">+</span>
          </div>
          <div class="faq-a-wrap">
            <p class="faq-a">{{ it.a | t }}</p>
          </div>
        </div>
      }
    </div>
  `,
})
export class FaqListComponent {
  @Input() set limit(v: number | null | undefined) { this._limit.set(v ?? null); }
  private _limit = signal<number | null>(null);
  readonly open = signal<number | null>(null);

  items = (): FaqItem[] => {
    const l = this._limit();
    return l != null ? FAQ_DATA.slice(0, l) : FAQ_DATA;
  };

  toggle(i: number) {
    this.open.update((v) => (v === i ? null : i));
  }
}
