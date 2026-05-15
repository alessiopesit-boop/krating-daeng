import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../core/lang.service';

@Component({
  selector: 'sf-lang-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="lang-toggle no-i18n" role="group" aria-label="Language">
      <button
        class="lang-btn"
        [class.active]="lang.lang() === 'it'"
        (click)="lang.setLang('it')"
        [attr.aria-pressed]="lang.lang() === 'it'"
      >
        <svg width="24" height="16" viewBox="0 0 30 20" style="display:inline-block;vertical-align:middle;border:1px solid rgba(0,0,0,0.2)">
          <rect width="10" height="20" fill="#009246" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#ce2b37" />
        </svg>
        <span>IT</span>
      </button>
      <button
        class="lang-btn"
        [class.active]="lang.lang() === 'en'"
        (click)="lang.setLang('en')"
        [attr.aria-pressed]="lang.lang() === 'en'"
      >
        <svg width="24" height="16" viewBox="0 0 60 30" style="display:inline-block;vertical-align:middle;border:1px solid rgba(0,0,0,0.2)">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" stroke-width="10" />
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="5" />
        </svg>
        <span>EN</span>
      </button>
    </div>
  `,
})
export class LangToggleComponent {
  lang = inject(LangService);
}
