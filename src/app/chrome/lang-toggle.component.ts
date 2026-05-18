import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { LangService, Lang } from '../core/lang.service';

interface LangOpt {
  code: Lang;
  short: string;
  label: string;
}

@Component({
  selector: 'sf-lang-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="lang-dd no-i18n" [class.open]="open()">
      <button
        type="button"
        class="lang-dd-trigger"
        (click)="toggle($event)"
        [attr.aria-haspopup]="'listbox'"
        [attr.aria-expanded]="open()"
        [attr.aria-label]="'Lingua' "
      >
        @switch (current().code) {
          @case ('it') {
            <svg width="22" height="14" viewBox="0 0 30 20" class="lang-dd-flag" aria-hidden="true">
              <rect width="10" height="20" fill="#009246" />
              <rect x="10" width="10" height="20" fill="#fff" />
              <rect x="20" width="10" height="20" fill="#ce2b37" />
            </svg>
          }
          @case ('en') {
            <svg width="22" height="14" viewBox="0 0 60 30" class="lang-dd-flag" aria-hidden="true">
              <rect width="60" height="30" fill="#012169" />
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
              <path d="M30,0 V30 M0,15 H60" stroke="#fff" stroke-width="10" />
              <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="5" />
            </svg>
          }
        }
        <span class="lang-dd-short">{{ current().short }}</span>
        <span class="lang-dd-caret" aria-hidden="true">▾</span>
      </button>
      @if (open()) {
        <ul class="lang-dd-menu" role="listbox">
          @for (opt of options; track opt.code) {
            <li
              class="lang-dd-item"
              role="option"
              [class.active]="opt.code === current().code"
              [attr.aria-selected]="opt.code === current().code"
              (click)="select(opt.code)"
            >
              @switch (opt.code) {
                @case ('it') {
                  <svg width="22" height="14" viewBox="0 0 30 20" class="lang-dd-flag" aria-hidden="true">
                    <rect width="10" height="20" fill="#009246" />
                    <rect x="10" width="10" height="20" fill="#fff" />
                    <rect x="20" width="10" height="20" fill="#ce2b37" />
                  </svg>
                }
                @case ('en') {
                  <svg width="22" height="14" viewBox="0 0 60 30" class="lang-dd-flag" aria-hidden="true">
                    <rect width="60" height="30" fill="#012169" />
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
                    <path d="M30,0 V30 M0,15 H60" stroke="#fff" stroke-width="10" />
                    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="5" />
                  </svg>
                }
              }
              <span class="lang-dd-label">{{ opt.label }}</span>
              <span class="lang-dd-tick" aria-hidden="true">{{ opt.code === current().code ? '★' : '' }}</span>
            </li>
          }
        </ul>
      }
    </div>
  `,
})
export class LangToggleComponent {
  lang = inject(LangService);
  private host = inject(ElementRef<HTMLElement>);

  readonly open = signal(false);
  readonly options: LangOpt[] = [
    { code: 'it', short: 'ITA', label: 'Italiano' },
    { code: 'en', short: 'ENG', label: 'English' },
  ];

  current = () => this.options.find((o) => o.code === this.lang.lang()) ?? this.options[0];

  toggle(ev: Event) {
    ev.stopPropagation();
    this.open.update((v) => !v);
  }
  select(code: Lang) {
    this.lang.setLang(code);
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent) {
    if (!this.open()) return;
    const target = ev.target as Node | null;
    if (target && !this.host.nativeElement.contains(target)) {
      this.open.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.open()) this.open.set(false);
  }
}
