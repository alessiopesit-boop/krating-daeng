import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BUILD_CONTEXT } from './build-info';

const SITE_NAME = 'Suea Fai';
const SITE_URL = 'https://alessiopesit-boop.github.io/krating-daeng';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/01-hero-bottle.png`;

export interface PageSeo {
  /** Titolo della pagina (senza brand). Es. "Shop". Per la home passa direttamente l'intero title. */
  title: string;
  /** Descrizione 150-160 caratteri per SERP e og:description. */
  description: string;
  /** Path relativo della pagina (es. "/#/shop"). Default '/' (home). */
  path?: string;
  /** URL assoluto dell'immagine og. Default: bottiglia hero. */
  ogImage?: string;
  /** Se true, aggiunge robots=noindex (per checkout, conferma, 404). */
  noIndex?: boolean;
  /** Se true, NON aggiunge il suffisso "· Suea Fai" (usalo per la home). */
  asIs?: boolean;
}

/**
 * Servizio per la SEO on-page. Centralizza title + meta description + Open
 * Graph tag. Ogni pagina lo chiama nel costruttore (o quando i dati sono
 * disponibili, es. PDP) tramite setPageMeta().
 *
 * In build di sviluppo (BUILD_CONTEXT === 'dev') il titolo viene prefissato
 * con "[dev] " cosi' si distingue dal tab del browser una versione locale
 * da quella pubblicata.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleSrv = inject(Title);
  private readonly metaSrv = inject(Meta);

  setPageMeta(seo: PageSeo): void {
    const baseTitle = seo.asIs ? seo.title : `${seo.title} · ${SITE_NAME}`;
    const finalTitle = BUILD_CONTEXT === 'dev' ? `[dev] ${baseTitle}` : baseTitle;
    this.titleSrv.setTitle(finalTitle);

    const url = seo.path ? `${SITE_URL}/${seo.path.replace(/^\//, '')}` : SITE_URL + '/';
    const ogImage = seo.ogImage ?? DEFAULT_OG_IMAGE;

    this.set({ name: 'description', content: seo.description });
    this.set({ property: 'og:type', content: 'website' });
    this.set({ property: 'og:site_name', content: SITE_NAME });
    this.set({ property: 'og:title', content: baseTitle });
    this.set({ property: 'og:description', content: seo.description });
    this.set({ property: 'og:url', content: url });
    this.set({ property: 'og:image', content: ogImage });
    this.set({ name: 'twitter:card', content: 'summary_large_image' });
    this.set({ name: 'twitter:title', content: baseTitle });
    this.set({ name: 'twitter:description', content: seo.description });
    this.set({ name: 'twitter:image', content: ogImage });

    this.set({
      name: 'robots',
      content: seo.noIndex ? 'noindex, nofollow' : 'index, follow',
    });
  }

  /** Aggiorna o crea il meta tag con la stessa name/property. */
  private set(def: { name?: string; property?: string; content: string }): void {
    const selector = def.name
      ? `name='${def.name}'`
      : `property='${def.property}'`;
    this.metaSrv.updateTag({ ...def }, selector);
  }
}
