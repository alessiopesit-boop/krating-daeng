import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

// Routing standard a "path location" (no hash #). Su GitHub Pages, gli URL
// inesistenti come /krating-daeng/shop vengono prima serviti da 404.html
// (vedi public/404.html), che codifica il path in sessionStorage e fa
// redirect a /krating-daeng/. index.html legge sessionStorage e ripristina
// l'URL originale via history.replaceState prima del bootstrap Angular.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    ),
  ],
};
