export interface Product {
  id: string;
  name: string;
  nameEn: string;
  thai: string;
  format: string;
  price: number;
  oldPrice?: number;
  img: string;
  tag: string;
  desc: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'single',
    name: 'Bottiglia Singola',
    nameEn: 'Single Bottle',
    thai: 'ขวดเดี่ยว',
    format: '150ml — vetro ambrato',
    price: 4.5,
    img: 'images/01-hero-bottle.png',
    tag: 'ICONICA',
    desc: 'La bottiglia originale. 150ml di formula 1974 in vetro farmaceutico ambrato.',
  },
  {
    id: 'pack6',
    name: 'Pack da 6',
    nameEn: '6-Pack',
    thai: 'แพค 6',
    format: '6 × 150ml',
    price: 24.9,
    oldPrice: 27.0,
    img: 'images/06-crate.png',
    tag: 'RISPARMIA 8%',
    desc: 'Sei bottiglie nella cassa di legno originale. Per chi sa cosa vuole.',
  },
  {
    id: 'pack12',
    name: 'Pack da 12',
    nameEn: '12-Pack',
    thai: 'แพค 12',
    format: '12 × 150ml',
    price: 47.5,
    oldPrice: 54.0,
    img: 'images/06-crate.png',
    tag: 'RISPARMIA 12%',
    desc: 'La cassa intera. Come la troveresti in un mercato di Bangkok nel \'74.',
  },
  {
    id: 'bundle-poster',
    name: 'Bundle Poster Vintage',
    nameEn: 'Poster Bundle',
    thai: 'เซ็ตโปสเตอร์',
    format: '1 bottiglia + 1 poster A2 stampato',
    price: 18.0,
    img: 'images/03-poster-muay-thai.png',
    tag: 'EDIZIONE LIMITATA',
    desc: 'Una bottiglia con un poster Muay Thai stampato in serigrafia su carta avorio 200g, 42×60cm.',
  },
];

export const fmtPrice = (n: number) => `€ ${n.toFixed(2).replace('.', ',')}`;
