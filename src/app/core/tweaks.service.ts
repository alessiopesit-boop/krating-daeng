import { Injectable, effect, signal } from '@angular/core';

export type Palette = 'red' | 'yellow' | 'black';
export type ThaiPresence = 'heavy' | 'light' | 'off';
export type HeroAnim = 'rays' | 'bulls' | 'static';

export interface Tweaks {
  palette: Palette;
  thaiPresence: ThaiPresence;
  heroAnim: HeroAnim;
}

const STORAGE_KEY = 'sf-tweaks';
const DEFAULTS: Tweaks = { palette: 'red', thaiPresence: 'heavy', heroAnim: 'rays' };

@Injectable({ providedIn: 'root' })
export class TweaksService {
  readonly tweaks = signal<Tweaks>(this.load());
  readonly panelOpen = signal(false);

  constructor() {
    effect(() => {
      const t = this.tweaks();
      document.documentElement.setAttribute('data-palette', t.palette);
      document.documentElement.setAttribute('data-thai', t.thaiPresence);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
      } catch {
        // localStorage unavailable, ignore
      }
    });
  }

  set<K extends keyof Tweaks>(key: K, value: Tweaks[K]) {
    this.tweaks.update((curr) => ({ ...curr, [key]: value }));
  }

  togglePanel() {
    this.panelOpen.update((v) => !v);
  }

  private load(): Tweaks {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch {
      // fall through to defaults
    }
    return { ...DEFAULTS };
  }
}
