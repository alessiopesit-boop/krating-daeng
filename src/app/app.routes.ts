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
    path: '**',
    loadComponent: () => import('./pages/not-found.component').then((m) => m.NotFoundComponent),
  },
];
