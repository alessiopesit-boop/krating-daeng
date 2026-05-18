import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../core/lang.pipe';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'sf-ingredienti',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TPipe],
  template: `
    <main>
      <section class="page-banner">
        <div class="page-banner-inner">
          <div>
            <div class="breadcrumb"><a routerLink="/">{{ 'Home' | t }}</a> / {{ 'Ingredienti' | t }}</div>
            <h1>{{ 'Ingredienti' | t }}</h1>
          </div>
        </div>
      </section>
      <section class="static-page paper-bg">
        <div class="section-inner static-content">
          <p class="static-lead">{{ 'Formula 1974, non gassata, in vetro ambrato da 150 ml. Senza alcol, senza conservanti aggiunti, senza coloranti artificiali.' | t }}</p>
          <h3>{{ 'Composizione per bottiglia (150 ml)' | t }}</h3>
          <table class="ingredient-table">
            <tr><th>{{ 'Acqua' | t }}</th><td>{{ 'q.b.' | t }}</td></tr>
            <tr><th>{{ 'Zucchero di canna grezzo' | t }}</th><td>27 g</td></tr>
            <tr><th>{{ 'Caffeina' | t }}</th><td>50 mg</td></tr>
            <tr><th>{{ 'Taurina' | t }}</th><td>1000 mg</td></tr>
            <tr><th>{{ 'Inositolo' | t }}</th><td>50 mg</td></tr>
            <tr><th>{{ 'Vitamina B3 (niacina)' | t }}</th><td>20 mg</td></tr>
            <tr><th>{{ 'Vitamina B6' | t }}</th><td>5 mg</td></tr>
            <tr><th>{{ 'Vitamina B12' | t }}</th><td>5 µg</td></tr>
            <tr><th>{{ 'Aromi naturali' | t }}</th><td>{{ 'q.b.' | t }}</td></tr>
          </table>
          <p>{{ 'Vegano, vegetariano, senza glutine. La taurina utilizzata e\\' di sintesi farmaceutica. Sconsigliato a bambini, donne in gravidanza e a chi e\\' sensibile alla caffeina.' | t }}</p>
        </div>
      </section>
    </main>
  `,
})
export class IngredientiComponent {
  constructor() {
    inject(SeoService).setPageMeta({
      title: 'Ingredienti',
      description: "Composizione del tonico energetico Suea Fai 150 ml: zucchero di canna, caffeina 50 mg, taurina 1000 mg, vitamine del gruppo B. Vegano, senza glutine, senza alcol.",
      path: '/#/ingredienti',
    });
  }
}
