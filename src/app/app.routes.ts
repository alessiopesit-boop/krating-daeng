import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop.component').then((m) => m.ShopComponent),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/pdp.component').then((m) => m.PdpComponent),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: 'confirm/:id',
    loadComponent: () => import('./pages/confirm.component').then((m) => m.ConfirmComponent),
  },
  {
    path: 'storia',
    loadComponent: () => import('./pages/storia.component').then((m) => m.StoriaComponent),
  },
  {
    path: 'muay-thai',
    loadComponent: () => import('./pages/muay-thai.component').then((m) => m.MuayThaiPageComponent),
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq.component').then((m) => m.FaqComponent),
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti.component').then((m) => m.ContattiComponent),
  },
  {
    path: 'wholesale',
    loadComponent: () => import('./pages/wholesale.component').then((m) => m.WholesaleComponent),
  },
  {
    path: 'ingredienti',
    loadComponent: () => import('./pages/ingredienti.component').then((m) => m.IngredientiComponent),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy.component').then((m) => m.PrivacyComponent),
  },
  {
    path: 'cookie',
    loadComponent: () => import('./pages/cookie.component').then((m) => m.CookieComponent),
  },
  {
    path: 'termini',
    loadComponent: () => import('./pages/termini.component').then((m) => m.TerminiComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found.component').then((m) => m.NotFoundComponent),
  },
];
