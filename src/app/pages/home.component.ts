import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../core/cart.service';
import { TweaksService } from '../core/tweaks.service';
import { PRODUCTS } from '../core/products';
import { TPipe } from '../core/lang.pipe';
import { SunBurstComponent } from '../illustrations/sun-burst.component';
import { LogoComponent } from '../illustrations/logo.component';
import { ThaiOrnamentComponent } from '../illustrations/thai-ornament.component';
import { ProductCardComponent } from '../shared/product-card.component';
import { FaqListComponent } from '../shared/faq-list.component';
import { MuayThaiSectionComponent } from '../shared/muay-thai-section.component';

@Component({
  selector: 'sf-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SunBurstComponent,
    LogoComponent,
    ThaiOrnamentComponent,
    ProductCardComponent,
    FaqListComponent,
    MuayThaiSectionComponent,
    TPipe,
  ],
  template: `
    <main>
      <section class="hero">
        @if (tweaks.tweaks().heroAnim === 'rays') {
          <div class="hero-rays" aria-hidden="true">
            <sf-sun-burst [size]="1200" color="#f5c518" ink="#1a1410" [strokeOpacity]="0.3" />
          </div>
        }
        @if (tweaks.tweaks().heroAnim === 'bulls') {
          <div class="hero-rays" aria-hidden="true" style="display:grid;place-items:center">
            <div style="animation:charge 2.4s ease-in-out infinite;opacity:0.18">
              <sf-logo [size]="900" color="#1a1410" sun="#f5c518" ink="#1a1410" [showText]="false" />
            </div>
          </div>
        }
        <div class="hero-content">
          <div class="hero-eyebrow">
            <span class="t-mono">{{ '★ Est. Bangkok 1974' | t }}</span>
            <span class="divider-dot" style="background:var(--yellow)"></span>
            <span class="t-mono">{{ 'Pharmaceutical Formula' | t }}</span>
          </div>
          <h1>
            @if (tweaks.tweaks().thaiPresence !== 'off') {
              <span class="thai">เสือไฟ</span>
            }
            {{ 'Prima delle lattine,' | t }}<br />
            {{ "c'era " | t }}<span class="yellow">{{ 'il vetro.' | t }}</span>
          </h1>
          <p class="lead">
            {{ "Suea Fai. La tigre di fuoco. Energy tonic thailandese in vetro ambrato dal 1974 — non gassato, denso, dolce, concentrato come l'originale." | t }}
          </p>
          <div style="display:flex;gap:1rem;flex-wrap:wrap">
            <button class="btn" (click)="go('/shop')">{{ 'Acquista ora →' | t }}</button>
            <button
              class="btn btn--ghost"
              style="color:var(--cream);border-color:var(--cream);background:transparent;box-shadow:4px 4px 0 var(--ink)"
              (click)="go('/storia')"
            >
              {{ 'La nostra storia' | t }}
            </button>
          </div>
          <div class="hero-meta">
            <span><span class="dot"></span>{{ 'Caffeina 50mg' | t }}</span>
            <span><span class="dot"></span>{{ 'Taurina 1000mg' | t }}</span>
            <span><span class="dot"></span>{{ 'Vit. B-Complex' | t }}</span>
            <span><span class="dot"></span>{{ 'Zucchero di canna' | t }}</span>
          </div>
        </div>
        <div class="hero-visual">
          <img
            src="images/01-hero-bottle.png"
            alt="Bottiglia Suea Fai 1974"
            [style.animation]="tweaks.tweaks().heroAnim === 'bulls' ? 'none' : 'float 6s ease-in-out infinite'"
            style="max-height:78vh;width:auto;filter:drop-shadow(8px 12px 0 rgba(26,20,16,0.5))"
          />
        </div>
      </section>

      <div style="background:var(--ink);color:var(--yellow);overflow:hidden;border-bottom:3px solid var(--yellow)">
        <div style="display:flex;white-space:nowrap;animation:marquee 26s linear infinite;font-family:var(--font-display);text-transform:uppercase;font-size:1.6rem;padding:1rem 0;letter-spacing:0.05em">
          @for (_ of [0,1,2,3]; track $index) {
            <div style="display:flex;gap:2rem;padding-right:2rem">
              <span>{{ '★ ENERGY TONIC' | t }}</span>
              <span style="color:var(--cream)">เสือไฟ</span>
              <span>{{ '★ FORMULA 1974' | t }}</span>
              <span style="color:var(--red)">{{ 'FIRE TIGER' | t }}</span>
              <span>{{ '★ BANGKOK' | t }}</span>
              <span style="color:var(--cream)">{{ '150ML VETRO' | t }}</span>
              <span>{{ '★ NON GASSATO' | t }}</span>
              <span style="color:var(--red)">{{ 'MUAY THAI HERITAGE' | t }}</span>
            </div>
          }
        </div>
      </div>

      <section class="product-section" style="background:var(--ink)">
        <div class="section-inner product-grid">
          <div class="product-stage">
            <div class="bottle-with-callouts">
              <img src="images/04-bottle-dark.png" alt="" class="bottle-img" />
              <div class="callout cl" style="top:16%;left:50%">
                <span class="dot"></span>
                <span class="line line-left"></span>
                <span class="lbl lbl-left">{{ 'COLLO STRETTO' | t }}</span>
              </div>
              <div class="callout cr" style="top:30%;left:53%">
                <span class="dot"></span>
                <span class="line line-right"></span>
                <span class="lbl lbl-right">{{ 'VETRO AMBRATO 150ML' | t }}</span>
              </div>
              <div class="callout cl" style="top:58%;left:47%">
                <span class="dot"></span>
                <span class="line line-left"></span>
                <span class="lbl lbl-left">{{ 'ETICHETTA 1974' | t }}</span>
              </div>
              <div class="callout cr" style="top:75%;left:53%">
                <span class="dot"></span>
                <span class="line line-right"></span>
                <span class="lbl lbl-right">{{ 'FORMULA ORIGINALE' | t }}</span>
              </div>
            </div>
          </div>
          <div class="product-text">
            <span class="t-mono" style="color:var(--yellow)">{{ '★ IL PRODOTTO' | t }}</span>
            <h2>{{ 'Densa.' | t }}<br />{{ 'Dolce.' | t }}<br /><span class="yellow">{{ 'Onesta.' | t }}</span></h2>
            <p>
              {{ "La Suea Fai non è una versione esportata, alleggerita, riformulata. È il tonico farmaceutico che gli operai di Bangkok hanno bevuto per cinquant'anni, in bottiglietta di vetro da 10 baht. Più densa di una bibita energetica moderna. Più dolce. Più concentrata. Sciroposa." | t }}
            </p>
            <div class="spec-grid">
              <div class="spec"><div class="spec-label">{{ 'Volume' | t }}</div><div class="spec-value">150ML</div></div>
              <div class="spec"><div class="spec-label">{{ 'Caffeina' | t }}</div><div class="spec-value">50MG</div></div>
              <div class="spec"><div class="spec-label">{{ 'Taurina' | t }}</div><div class="spec-value">1000MG</div></div>
              <div class="spec"><div class="spec-label">{{ 'Zucchero' | t }}</div><div class="spec-value">{{ 'Canna' | t }}</div></div>
              <div class="spec"><div class="spec-label">{{ 'Gassato' | t }}</div><div class="spec-value">{{ 'No' | t }}</div></div>
              <div class="spec"><div class="spec-label">{{ 'Vetro' | t }}</div><div class="spec-value">{{ 'Ambrato' | t }}</div></div>
            </div>
            <table class="compare-table">
              <thead>
                <tr><th></th><th>{{ 'Suea Fai' | t }}</th><th>{{ 'Energy drink occidentale' | t }}</th></tr>
              </thead>
              <tbody>
                <tr><td class="t-mono" style="color:var(--cream);opacity:0.7">{{ 'Formato' | t }}</td><td class="us">{{ 'Vetro 150ml' | t }}</td><td class="them">{{ 'Lattina 250ml' | t }}</td></tr>
                <tr><td class="t-mono" style="color:var(--cream);opacity:0.7">{{ 'Densità' | t }}</td><td class="us">{{ 'Sciropposa' | t }}</td><td class="them">{{ 'Acquosa' | t }}</td></tr>
                <tr><td class="t-mono" style="color:var(--cream);opacity:0.7">{{ 'Gas' | t }}</td><td class="us">{{ 'No' | t }}</td><td class="them">{{ 'Sì' | t }}</td></tr>
                <tr><td class="t-mono" style="color:var(--cream);opacity:0.7">{{ 'Dolcezza' | t }}</td><td class="us">{{ 'Intensa' | t }}</td><td class="them">{{ 'Moderata' | t }}</td></tr>
                <tr><td class="t-mono" style="color:var(--cream);opacity:0.7">{{ 'Origine' | t }}</td><td class="us">{{ 'Bangkok 1974' | t }}</td><td class="them">{{ 'Marketing 1987' | t }}</td></tr>
              </tbody>
            </table>
            <div style="margin-top:2rem;display:flex;gap:1rem;flex-wrap:wrap">
              <button class="btn btn--red" (click)="go('/product/single')">{{ 'Scheda prodotto →' | t }}</button>
              <button class="btn" (click)="cart.add('single', 1)">{{ 'Aggiungi al carrello' | t }}</button>
            </div>
          </div>
        </div>
      </section>

      <section class="origins paper-bg">
        <div class="section-inner origins-grid">
          <aside class="origins-aside">
            <span class="t-eyebrow">{{ '★ Origini' | t }}</span>
            <h2 class="origins-title">{{ 'Bangkok,' | t }}<br /><span class="red">{{ '1974.' | t }}</span></h2>
            <sf-thai-ornament [width]="240" />
            <div style="margin-top:1.6rem">
              <img src="images/02-bangkok-street.png" alt="Bangkok 1974" style="width:100%;border:3px solid var(--ink);filter:sepia(0.15) saturate(1.05)" />
              <div class="t-mono" style="margin-top:0.6rem;color:var(--ink-soft);font-size:0.65rem">{{ '↑ Mercato di Yaowarat, una mattina come tante.' | t }}</div>
            </div>
          </aside>
          <div class="origins-body">
            <p>
              <span class="drop">N</span>{{ "egli anni Settanta Bangkok si svegliava prima dell'alba. Camionisti che scendevano dal nord con il riso, operai che entravano nelle fabbriche tessili di Pratunam, contadini che raggiungevano i mercati con le motocarrozzelle cariche di mango. La giornata cominciava in piedi, con dieci baht in tasca e dieci ore davanti." | t }}
            </p>
            <p>
              <strong>Suea Fai</strong>
              {{ ' nasce in quegli anni in un piccolo laboratorio farmaceutico di Yaowarat, ispirato al Lipovitan-D giapponese. Caffeina, taurina, vitamine del gruppo B, zucchero di canna locale — niente bolle, niente fronzoli. Una formula pensata per chi il caffè non se lo poteva permettere e doveva comunque tirare fino a sera.' | t }}
            </p>
            <p>
              {{ "Veniva imbottigliata in vetro ambrato perché il vetro si lavava, si riusava, e proteggeva la formula dalla luce. Veniva venduta a dieci baht — il prezzo di un piatto di riso — nei chioschi all'angolo, nelle palestre di Muay Thai, sui banconi dei minimarket. Non era un'idea di marketing. Era un attrezzo da lavoro." | t }}
            </p>

            <div class="timeline">
              @for (row of timeline; track row.year) {
                <div class="timeline-row">
                  <div class="timeline-year">{{ row.year }}</div>
                  <div class="timeline-event">
                    <h5>{{ row.title | t }}</h5>
                    <p>{{ row.body | t }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <sf-muay-thai-section />

      <section class="manifesto">
        <sf-thai-ornament [width]="240" color="#f5c518" />
        <blockquote style="margin-top:2rem">
          {{ 'Bevila in piedi.' | t }}<br /><span class="yellow">{{ 'Lavora.' | t }}</span><br />{{ 'Combatti.' | t }}
        </blockquote>
        <cite>{{ '— Manifesto Suea Fai · Bangkok 1974' | t }}</cite>
      </section>

      <section class="shop-section paper-bg">
        <div class="section-inner">
          <div class="shop-head">
            <div>
              <span class="t-eyebrow">{{ '★ Shop' | t }}</span>
              <h2>{{ 'La ' | t }}<span class="red">{{ 'tigre' | t }}</span><br />{{ 'a casa tua.' | t }}</h2>
            </div>
            <p style="max-width:32ch;margin:0;font-family:var(--font-italic);font-style:italic;font-size:1.2rem">
              {{ "Spedizione in tutta Italia. Consegna in 48–72 ore. Pacchi imballati come si faceva nel '74." | t }}
            </p>
          </div>
          <div class="shop-grid">
            @for (p of products; track p.id) {
              <sf-product-card [product]="p" />
            }
          </div>
          <div style="text-align:center;margin-top:3rem">
            <button class="btn btn--ink" (click)="go('/shop')">{{ 'Vai allo shop completo →' | t }}</button>
          </div>
        </div>
      </section>

      <section class="faq">
        <div class="faq-head">
          <span class="t-eyebrow">{{ '★ Domande' | t }}</span>
          <h2>{{ 'È ' | t }}<span class="red">{{ 'diversa' | t }}</span><br />{{ 'dalle bibite energetiche moderne?' | t }}</h2>
        </div>
        <sf-faq-list [limit]="4" />
        <div style="text-align:center;margin-top:2rem">
          <button class="btn btn--ink" (click)="go('/faq')">{{ 'Tutte le domande →' | t }}</button>
        </div>
      </section>
    </main>
  `,
})
export class HomeComponent {
  tweaks = inject(TweaksService);
  cart = inject(CartService);
  private router = inject(Router);

  products = PRODUCTS;
  timeline = [
    { year: '1974', title: 'La prima formula',         body: 'In un retrobottega di Yaowarat nasce la prima bottiglia: 150ml di tonico ambrato, etichettato a mano. Bangkok ha la sua tigre.' },
    { year: '1976', title: 'Sponsor del Rajadamnern',  body: 'Il primo cartellone in tela di juta appare al Rajadamnern Stadium. Da quel momento Suea Fai non lascerà più il ring.' },
    { year: '1981', title: 'Distribuzione nazionale',  body: 'Una flotta di camioncini Isuzu copre la rete dei minimarket thailandesi. Dieci baht, una bottiglia, ovunque.' },
    { year: '1995', title: 'Crisi e ritorno',          body: "L'ondata delle lattine occidentali quasi spazza via il vetro. La famiglia rifiuta di cambiare formato." },
    { year: '2026', title: 'Suea Fai arriva in Italia', body: 'Stessa formula, stessa bottiglia, stessa fame. Per la prima volta importata ufficialmente in Europa.' },
  ];

  go(p: string) { this.router.navigateByUrl(p); }
}
