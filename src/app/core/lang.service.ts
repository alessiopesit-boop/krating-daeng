import { Injectable, effect, signal } from '@angular/core';
import { PHRASES } from './phrases';

export type Lang = 'it' | 'en';
const STORAGE_KEY = 'sf-lang';

@Injectable({ providedIn: 'root' })
export class LangService {
  readonly lang = signal<Lang>(this.load());

  constructor() {
    effect(() => {
      const l = this.lang();
      try {
        localStorage.setItem(STORAGE_KEY, l);
      } catch {
        // localStorage unavailable, ignore
      }
      document.documentElement.lang = l;
    });
  }

  setLang(l: Lang) {
    this.lang.set(l);
  }

  // Translate an Italian phrase to the current language. Italian = identity.
  // English looks up PHRASES and falls back to the original string.
  t(it: string): string {
    if (this.lang() === 'it') return it;
    const trimmed = it.trim();
    const en = PHRASES[trimmed];
    if (en == null) return it;
    const leading = it.match(/^\s*/)?.[0] ?? '';
    const trailing = it.match(/\s*$/)?.[0] ?? '';
    return leading + en + trailing;
  }

  private load(): Lang {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === 'en' ? 'en' : 'it';
    } catch {
      return 'it';
    }
  }
}
