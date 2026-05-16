// Italian to English phrase map. Mirrors the prototype's i18n dictionary.
// Used as a flat lookup by LangService.translate(key).
export const PHRASES: Record<string, string> = {
  // Nav / cart
  Home: 'Home',
  Shop: 'Shop',
  'La Storia': 'Our Story',
  'Muay Thai': 'Muay Thai',
  FAQ: 'FAQ',
  Carrello: 'Cart',

  // Hero
  '★ Est. Bangkok 1974': '★ Est. Bangkok 1974',
  'Formula farmaceutica': 'Pharmaceutical Formula',
  'Prima delle lattine,': 'Before the cans,',
  "c'era ": 'there was ',
  'il vetro.': 'glass.',
  "Suea Fai. La tigre di fuoco. Energy tonic thailandese in vetro ambrato dal 1974 — non gassato, denso, dolce, concentrato come l'originale.":
    'Suea Fai. The fire tiger. Thai energy tonic in amber glass since 1974 — uncarbonated, thick, sweet, concentrated as the original.',
  'Acquista ora →': 'Shop now →',
  'La nostra storia': 'Our story',
  'Caffeina 50mg': 'Caffeine 50mg',
  'Taurina 1000mg': 'Taurine 1000mg',
  'Vit. B-Complex': 'Vit. B-Complex',
  'Zucchero di canna': 'Cane sugar',

  // Marquee
  '★ ENERGY TONIC': '★ ENERGY TONIC',
  '★ FORMULA 1974': '★ FORMULA 1974',
  'FIRE TIGER': 'FIRE TIGER',
  '★ BANGKOK': '★ BANGKOK',
  '150ML VETRO': '150ML GLASS',
  '★ NON GASSATO': '★ UNCARBONATED',
  'MUAY THAI HERITAGE': 'MUAY THAI HERITAGE',

  // Product section
  'TAPPO METALLICO': 'METAL CAP',
  'COLLO STRETTO': 'NARROW NECK',
  'VETRO AMBRATO 150ML': 'AMBER GLASS 150ML',
  'ETICHETTA 1974': '1974 LABEL',
  'FORMULA ORIGINALE': 'ORIGINAL FORMULA',
  '★ IL PRODOTTO': '★ THE PRODUCT',
  'Densa.': 'Thick.',
  'Dolce.': 'Sweet.',
  'Onesta.': 'Honest.',
  "La Suea Fai non è una versione esportata, alleggerita, riformulata. È il tonico farmaceutico che gli operai di Bangkok hanno bevuto per cinquant'anni, in bottiglietta di vetro da 10 baht. Più densa di una bibita energetica moderna. Più dolce. Più concentrata. Sciroposa.":
    "Suea Fai is not an exported, watered-down, reformulated version. It's the pharmaceutical tonic that Bangkok workers have been drinking for fifty years, in a 10-baht glass bottle. Denser than any modern energy drink. Sweeter. More concentrated. Syrupy.",
  Volume: 'Volume',
  Caffeina: 'Caffeine',
  Taurina: 'Taurine',
  Zucchero: 'Sugar',
  Gassato: 'Carbonated',
  Vetro: 'Glass',
  No: 'No',
  Canna: 'Cane',
  Ambrato: 'Amber',
  'Suea Fai': 'Suea Fai',
  'Energy drink occidentale': 'Western energy drink',
  Formato: 'Format',
  'Densità': 'Density',
  Gas: 'Carbonation',
  Dolcezza: 'Sweetness',
  Origine: 'Origin',
  'Vetro 150ml': 'Glass 150ml',
  'Lattina 250ml': 'Can 250ml',
  Sciropposa: 'Syrupy',
  Acquosa: 'Watery',
  'Sì': 'Yes',
  Intensa: 'Intense',
  Moderata: 'Moderate',
  'Bangkok 1974': 'Bangkok 1974',
  'Marketing 1987': 'Marketing 1987',
  'Scheda prodotto →': 'Product details →',
  'Aggiungi al carrello': 'Add to cart',

  // Origins
  '★ Origini': '★ Origins',
  'Bangkok,': 'Bangkok,',
  '1974.': '1974.',
  '↑ Mercato di Yaowarat, una mattina come tante.': '↑ Yaowarat market, just another morning.',
  "negli anni Settanta Bangkok si svegliava prima dell'alba. Camionisti che scendevano dal nord con il riso, operai che entravano nelle fabbriche tessili di Pratunam, contadini che raggiungevano i mercati con le motocarrozzelle cariche di mango. La giornata cominciava in piedi, con dieci baht in tasca e dieci ore davanti.":
    'in the seventies Bangkok woke up before dawn. Truck drivers coming down from the north with rice, workers entering the Pratunam textile factories, farmers reaching the markets on tuk-tuks loaded with mangoes. The day began standing up, with ten baht in your pocket and ten hours ahead.',
  "nasce in quegli anni in un piccolo laboratorio farmaceutico di Yaowarat, ispirato al Lipovitan-D giapponese. Caffeina, taurina, vitamine del gruppo B, zucchero di canna locale — niente bolle, niente fronzoli. Una formula pensata per chi il caffè non se lo poteva permettere e doveva comunque tirare fino a sera.":
    "was born in those years in a small pharmaceutical lab in Yaowarat, inspired by Japan's Lipovitan-D. Caffeine, taurine, B-complex vitamins, local cane sugar — no bubbles, no frills. A formula made for those who couldn't afford coffee and still had to push through till evening.",
  'Veniva imbottigliata in vetro ambrato perché il vetro si lavava, si riusava, e proteggeva la formula dalla luce. Veniva venduta a dieci baht, il prezzo di un piatto di riso, nei chioschi all\'angolo, nelle palestre di Muay Thai, sui banconi dei minimarket. Non era un\'idea di marketing. Era uno strumento di lavoro.':
    "It was bottled in amber glass because glass could be washed, reused, and shielded the formula from light. Sold for ten baht, the price of a plate of rice, at corner stalls, Muay Thai gyms, minimarket counters. It wasn't a marketing idea. It was a working tool.",
  'La prima formula': 'The first formula',
  'In un retrobottega di Yaowarat nasce la prima bottiglia: 150ml di tonico ambrato, etichettato a mano. Bangkok ha la sua tigre.':
    'In a Yaowarat back room the first bottle is born: 150ml of amber tonic, hand-labelled. Bangkok has its tiger.',
  'Sponsor del Rajadamnern': 'Rajadamnern sponsor',
  'Il primo cartellone in tela di juta appare al Rajadamnern Stadium. Da quel momento Suea Fai non lascerà più il ring.':
    'The first jute-canvas banner appears at Rajadamnern Stadium. From that moment Suea Fai never leaves the ring.',
  'Distribuzione nazionale': 'National distribution',
  'Una flotta di camioncini Isuzu copre la rete dei minimarket thailandesi. Dieci baht, una bottiglia, ovunque.':
    'A fleet of Isuzu pickups covers the Thai minimarket network. Ten baht, one bottle, everywhere.',
  'Crisi e ritorno': 'Crisis and return',
  "L'ondata delle lattine occidentali quasi spazza via il vetro. La famiglia rifiuta di cambiare formato.":
    'The Western can wave nearly wipes out glass. The family refuses to change format.',
  'Suea Fai arriva in Italia': 'Suea Fai arrives in Italy',
  'Stessa formula, stessa bottiglia, stessa fame. Per la prima volta importata ufficialmente in Europa.':
    'Same formula, same bottle, same hunger. Officially imported in Europe for the first time.',

  // Muay Thai
  '★ Muay Thai Heritage': '★ Muay Thai Heritage',
  'Sponsor del ': 'Sponsor of the ',
  ring: 'ring',
  'dal 1976.': 'since 1976.',
  'Il logo dei due tigri che si caricano è nato per i cartelloni del Rajadamnern. Il marchio segue il combattente, mai il contrario.':
    'The two charging tigers logo was born for Rajadamnern banners. The brand follows the fighter, never the other way around.',
  'Ogni palestra ha la sua bottiglia.': 'Every gym has its bottle.',
  'Da Bangkok a Chiang Mai, da Phuket a Korat, le bottigliette vuote di Suea Fai si accumulano sui banconi delle palestre come trofei silenziosi. Una a fine allenamento. Una prima del clinch. Una al risveglio prima della corsa.':
    'From Bangkok to Chiang Mai, from Phuket to Korat, empty Suea Fai bottles pile up on gym counters like silent trophies. One after training. One before the clinch. One at dawn before the run.',

  // Manifesto
  'Bevila in piedi.': 'Drink it standing.',
  'Lavora.': 'Work.',
  'Combatti.': 'Fight.',
  '— Manifesto Suea Fai · Bangkok 1974': '— Suea Fai Manifesto · Bangkok 1974',

  // Shop section
  '★ Shop': '★ Shop',
  'La ': 'The ',
  tigre: 'tiger',
  'a casa tua.': 'at your place.',
  "Spedizione in tutta Italia. Consegna in 48–72 ore. Pacchi imballati come si faceva nel '74.":
    "Shipping across Italy. Delivery in 48–72 hours. Packages packed like in '74.",
  'Vai allo shop completo →': 'Go to full shop →',

  // FAQ teaser
  '★ Domande': '★ Questions',
  'È ': 'Is it ',
  diversa: 'different',
  'dalle bibite energetiche moderne?': 'from modern energy drinks?',
  'Tutte le domande →': 'All questions →',

  // Product cards
  'Bottiglia Singola': 'Single Bottle',
  'Pack da 6': '6-Pack',
  'Pack da 12': '12-Pack',
  'Bundle Poster Vintage': 'Vintage Poster Bundle',
  '150ml — vetro ambrato': '150ml — amber glass',
  '6 × 150ml': '6 × 150ml',
  '12 × 150ml': '12 × 150ml',
  '1 bottiglia + 1 poster A2 stampato': '1 bottle + 1 printed A2 poster',
  ICONICA: 'ICONIC',
  'RISPARMIA 8%': 'SAVE 8%',
  'RISPARMIA 12%': 'SAVE 12%',
  'EDIZIONE LIMITATA': 'LIMITED EDITION',
  '+ Carrello': '+ Cart',

  // Shop page
  'Tutti i ': 'All ',
  prodotti: 'products',
  'prodotti · spedizione 48–72h': 'products · 48–72h shipping',
  Tutti: 'All',
  'Bottiglia singola': 'Single bottle',
  Multipack: 'Multipack',
  'Bundle speciali': 'Special bundles',
  'Ordina per': 'Sort by',
  'In evidenza': 'Featured',
  'Prezzo ↑': 'Price ↑',
  'Prezzo ↓': 'Price ↓',
  'Disponibilità': 'Availability',
  'Tutti i prodotti sono disponibili e spediti dal magazzino di Milano entro 24h.':
    'All products are in stock and ship from our Milan warehouse within 24h.',

  // PDP
  '★ Energy Tonic · เสือไฟ · 150ML': '★ Energy Tonic · เสือไฟ · 150ML',
  'ORIGINALE 1974': 'ORIGINAL 1974',
  FORMATO: 'FORMAT',
  'QTÀ': 'QTY',
  '1 Bottiglia': '1 Bottle',
  'Bundle Poster': 'Poster Bundle',
  'Aggiungi · ': 'Add · ',
  'Formula 1974 originale': 'Original 1974 formula',
  ' — caffeina 50mg, taurina 1000mg, vitamine B.': ' — caffeine 50mg, taurine 1000mg, B vitamins.',
  'Vetro ambrato 150ml': 'Amber glass 150ml',
  ' — riciclabile, vuoto a rendere sui pack interi.':
    ' — recyclable, deposit refund on full packs.',
  'Non gassata': 'Uncarbonated',
  ' — densa, sciroposa, dolce. Come un tonico, non come una bibita.':
    ' — thick, syrupy, sweet. Like a tonic, not a soda.',
  'Spedizione 48–72h': '48–72h shipping',
  ' in Italia. Gratis sopra i 39€.': ' in Italy. Free over €39.',
  'Importata ufficialmente': 'Officially imported',
  ' dal magazzino di Milano. Filiera tracciata.':
    ' from our Milan warehouse. Traceable supply chain.',
  '★ Note del laboratorio': '★ Lab notes',
  '"La densità è data dallo zucchero di canna non raffinato. Agita prima di bere — i sedimenti naturali della formula si depositano in fondo come nei tonici degli anni \'70."':
    '"The density comes from unrefined cane sugar. Shake before drinking — the natural sediments of the formula settle at the bottom, like in 70s tonics."',
  'La bottiglia originale. 150ml di formula 1974 in vetro farmaceutico ambrato.':
    'The original bottle. 150ml of 1974 formula in pharmaceutical amber glass.',
  'Sei bottiglie nella cassa di legno originale. Per chi sa cosa vuole.':
    'Six bottles in the original wooden crate. For those who know what they want.',
  "La cassa intera. Come la troveresti in un mercato di Bangkok nel '74.":
    "The full crate. Like you'd find it at a Bangkok market in '74.",
  'Una bottiglia con un poster Muay Thai stampato in serigrafia su carta avorio 200g, 42×60cm.':
    'A bottle with a screen-printed Muay Thai poster on 200g ivory paper, 42×60cm.',

  // Checkout
  Contatti: 'Contact',
  Email: 'Email',
  'Indirizzo di spedizione': 'Shipping address',
  Nome: 'First name',
  Cognome: 'Last name',
  Indirizzo: 'Address',
  'Via, numero civico': 'Street, number',
  'Città': 'City',
  CAP: 'ZIP',
  Provincia: 'Province',
  Telefono: 'Phone',
  Spedizione: 'Shipping',
  'Standard · 48–72h': 'Standard · 48–72h',
  'Corriere espresso, tracciamento incluso': 'Express courier, tracking included',
  'Express · 24h': 'Express · 24h',
  'Consegna il giorno lavorativo successivo': 'Next business day delivery',
  Pagamento: 'Payment',
  Carta: 'Card',
  PayPal: 'PayPal',
  Bonifico: 'Bank transfer',
  'Numero carta': 'Card number',
  Intestatario: 'Cardholder',
  Scadenza: 'Expiry',
  CVC: 'CVC',
  'Verrai reindirizzato a PayPal per completare il pagamento.':
    "You'll be redirected to PayPal to complete the payment.",
  "L'ordine verrà evaso al ricevimento del bonifico (1–2 giorni lavorativi).":
    'The order will be processed once the transfer is received (1–2 business days).',
  'Paga ': 'Pay ',
  'Il tuo ordine': 'Your order',
  Subtotale: 'Subtotal',
  Totale: 'Total',
  GRATIS: 'FREE',
  'al checkout': 'at checkout',
  'Pacco eco': 'Eco package',
  ' — cartone riciclato, paglia di riempimento, niente plastica. Vuoto a rendere sulle casse intere.':
    ' — recycled cardboard, straw filler, no plastic. Deposit refund on full crates.',
  'Carrello vuoto': 'Empty cart',
  'Non puoi fare il checkout senza prodotti. La tigre ha bisogno di qualcosa per cui correre.':
    "You can't checkout without products. The tiger needs something to run for.",
  'Vai allo shop': 'Go to shop',
  'Email non valida': 'Invalid email',
  Obbligatorio: 'Required',
  '5 cifre': '5 digits',
  'Numero non valido': 'Invalid number',
  'MM/AA': 'MM/YY',
  '3-4 cifre': '3-4 digits',

  // Stepper
  'Spedizione & Pagamento': 'Shipping & Payment',
  Conferma: 'Confirmation',

  // Confirm
  '★ ORDINE RICEVUTO': '★ ORDER RECEIVED',
  CONFERMATO: 'CONFIRMED',
  'è in viaggio.': 'is on its way.',
  'N° ': 'No. ',
  'SPEDITO A': 'SHIPPED TO',
  RIEPILOGO: 'SUMMARY',
  "Riceverai un'email di conferma con il tracking entro un'ora.":
    "You'll receive a confirmation email with tracking within an hour.",
  '— grazie. Bevila in piedi.': '— thanks. Drink it standing.',
  'Torna alla home': 'Back to home',
  'Continua a esplorare': 'Keep exploring',
  'Pagamento in corso…': 'Processing payment…',

  // Storia
  '★ 1974 — oggi': '★ 1974 — today',
  "Cinquant'anni": 'Fifty years',
  'in vetro.': 'in glass.',
  storia: 'story',

  // 404
  'Pagina non trovata': 'Page not found',
  'Questa pagina': 'This page',
  "non c'è.": "isn't here.",
  "Hai sbagliato indirizzo, oppure la stiamo ancora costruendo. La tigre nel frattempo è da un'altra parte.":
    "Wrong address, or we're still building it. The tiger has moved on in the meantime.",

  // Drawer
  Chiudi: 'Close',
  Rimuovi: 'Remove',
  'La tigre ha fame ma non ha ancora trovato la sua preda.':
    "The tiger is hungry but hasn't found its prey yet.",
  'Checkout →': 'Checkout →',
  'Continua shopping': 'Continue shopping',

  // Footer
  'Energy tonic thailandese dal 1974. Stessa formula. Stessa bottiglia. Stessa fame.':
    'Thai energy tonic since 1974. Same formula. Same bottle. Same hunger.',
  'Tutti i prodotti': 'All products',
  'Bundle poster': 'Poster bundle',
  Brand: 'Brand',
  Legal: 'Legal',
  Wholesale: 'Wholesale',
  Privacy: 'Privacy',
  Cookie: 'Cookie',
  Termini: 'Terms',
  Ingredienti: 'Ingredients',
  'Bangkok ↔ Milano': 'Bangkok ↔ Milan',
  Domande: 'Questions',

  // Tweaks
  Tweaks: 'Tweaks',
  Palette: 'Palette',
  Rosso: 'Red',
  Giallo: 'Yellow',
  Nero: 'Black',
  'Carta Thai': 'Thai paper',
  Heavy: 'Heavy',
  Light: 'Light',
  Off: 'Off',
  'Animazione hero': 'Hero animation',
  Raggi: 'Rays',
  Tigri: 'Tigers',
  Statico: 'Static',
  Lingua: 'Language',
  'Script Thai': 'Thai script',
  Presenza: 'Presence',
  Globale: 'Global',
  Hero: 'Hero',
  Sfondo: 'Background',
  Forte: 'Heavy',
  Leggera: 'Light',

  // Storia extras
  'La storia della Suea Fai è la storia di una formula che si è rifiutata di cambiare. Mentre il mondo passava al gas, all\'alluminio, agli zuccheri sintetici e alle lattine slim, la nostra bottiglietta di vetro ambrato è rimasta uguale: 150ml, tappo a vite, tre fasce di colore, due tigri sul sole.':
    'The story of Suea Fai is the story of a formula that refused to change. While the world moved to gas, aluminum, synthetic sugars and slim cans, our amber glass bottle stayed the same: 150ml, screw cap, three color bands, two tigers on a sun.',
  "Quando alla fine degli anni '80 un imprenditore austriaco scoprì la categoria del tonico energetico thailandese in un viaggio a Bangkok, decise di adattarla al gusto occidentale: la diluì, la gassò, le fece imitare le bibite gassate americane. Da quella riformulazione nacquero le energy drink che conosciamo. Suea Fai non ha seguito quella strada. Non poteva. La densità, il vetro, la dolcezza — sono il punto.":
    "When in the late 80s an Austrian entrepreneur discovered the Thai energy tonic category on a trip to Bangkok, he chose to adapt it to Western taste: diluted it, carbonated it, made it imitate American sodas. From that reformulation the energy drinks we know were born. Suea Fai did not follow that road. It couldn't. Density, glass, sweetness — that is the point.",
  'Nel 2026 abbiamo deciso di portare la formula originale in Italia. Stesso tappo. Stesso vetro. Stessa etichetta del 1974 — ridisegnata solo nei caratteri minori per la conformità europea. Stessa ricetta thailandese, gli stessi ingredienti, lo stesso laboratorio di Yaowarat.':
    'In 2026 we decided to bring the original formula to Italy. Same cap. Same glass. Same 1974 label — only the small-print characters redesigned for EU compliance. Same Thai recipe, same ingredients, same Yaowarat lab.',
  "Cartelloni in juta nel ring più importante della Thailandia.": "Jute banners at Thailand's most important ring.",
  'Resistenza alle lattine': 'Resistance to the can',
  'La famiglia rifiuta la conversione al formato lattina occidentale.':
    'The family refuses to convert to the Western can format.',
  'Quasi la fine': 'Almost the end',
  'Il mercato cambia. Le vendite crollano. Il vetro tiene duro.':
    'The market shifts. Sales collapse. Glass holds firm.',
  'Il ritorno del culto': 'The cult returns',
  'La nuova generazione thailandese riscopre il tonico in vetro.':
    'A new Thai generation rediscovers the glass tonic.',
  'Patrimonio nazionale': 'National heritage',
  'La bottiglietta entra in mostra al Bangkok Museum of Design.':
    'The bottle enters the Bangkok Museum of Design exhibit.',
  'Importazione ufficiale europea. Magazzino a Milano.':
    'Official European import. Warehouse in Milan.',
  "Non è una ": "It's not a ",
  'bibita.': 'soda.',
  'È uno strumento.': "It's a tool.",
  '— Da una targa nel laboratorio di Yaowarat': '— From a plaque in the Yaowarat lab',

  // Muay Thai page
  '★ Wai Khru Ram Muay': '★ Wai Khru Ram Muay',
  'Il ': 'The ',
  rituale: 'ritual',
  'prima del colpo.': 'before the strike.',
  'Prima di ogni incontro il combattente esegue il ': 'Before every fight the fighter performs the ',
  ': una danza cerimoniale che onora i maestri, gli antenati e la propria scuola. È in quei minuti silenziosi — non durante il combattimento — che il Muay Thai diventa Muay Thai.':
    ': a ceremonial dance that honors the masters, ancestors and one\'s own school. It is in those silent minutes — not during the fight — that Muay Thai becomes Muay Thai.',
  'Suea Fai ha sponsorizzato per primi i cartelloni del wai khru, non solo gli incontri. Perché il rispetto viene prima della vittoria.':
    'Suea Fai was the first to sponsor the wai khru banners, not just the fights. Because respect comes before victory.',
  Heritage: 'Heritage',
  'frequenti': 'frequent',

  // FAQ
  'È davvero diversa dalle bibite energetiche occidentali?':
    'Is it really different from Western energy drinks?',
  "Sì. Le energy drink che conosci sono versioni gassate, alleggerite e riformulate per il mercato occidentale lanciate alla fine degli anni '80. Suea Fai è la formula thailandese originale del 1974: in vetro, non gassata, più densa, più dolce, più concentrata. È un tonico farmaceutico, non una bibita.":
    "Yes. The energy drinks you know are carbonated, lightened, reformulated versions for the Western market launched in the late 80s. Suea Fai is the original 1974 Thai formula: glass, uncarbonated, denser, sweeter, more concentrated. A pharmaceutical tonic, not a soda.",
  'Perché in bottiglia di vetro e non in lattina?': 'Why glass bottle, not a can?',
  'Il vetro ambrato protegge la formula dalla luce e mantiene il gusto inalterato. È così che si vendeva nel 1974 nei minimarket di Bangkok e così rimane oggi: 150ml, niente plastica, niente alluminio. Le bottiglie sono riciclabili al 100% e accettiamo il vuoto a rendere su tutti gli ordini wholesale.':
    "Amber glass shields the formula from light and keeps the taste unchanged. That's how it was sold in 1974 Bangkok minimarkets, and so it stays: 150ml, no plastic, no aluminum. Bottles are 100% recyclable and we accept empties back on all wholesale orders.",
  'Quanta caffeina contiene?': 'How much caffeine does it contain?',
  '50mg per bottiglia. Meno di un espresso (≈80mg), meno di una lattina di energy drink occidentale (≈80mg). Suea Fai punta sulla taurina (1000mg) e sulle vitamine B per dare la spinta — non solo sulla caffeina.':
    '50mg per bottle. Less than an espresso (≈80mg), less than a Western energy can (≈80mg). Suea Fai relies on taurine (1000mg) and B-vitamins for the push — not on caffeine alone.',
  'Si beve fredda o a temperatura ambiente?': 'Cold or room temperature?',
  "In Thailandia si beve come capita: dal frigo del minimarket nelle giornate calde, a temperatura ambiente nelle palestre, anche tiepida sul cantiere. Non c'è una regola. La densità rimane la stessa.":
    'In Thailand you drink it however: from the minimarket fridge on hot days, room temp at the gym, even lukewarm on the construction site. No rule. The density stays the same.',
  'È adatta a vegani / vegetariani?': 'Is it suitable for vegans / vegetarians?',
  'Sì. La formula non contiene ingredienti di origine animale. La taurina utilizzata è di sintesi farmaceutica. Senza alcol, senza conservanti aggiunti, senza coloranti artificiali.':
    'Yes. The formula contains no animal ingredients. The taurine is pharmaceutical synthetic. No alcohol, no added preservatives, no artificial colors.',
  'Come funziona la spedizione in Italia?': 'How does shipping in Italy work?',
  'Spediamo in tutta Italia con corriere espresso (48–72 ore). Spedizione gratuita sopra i 39€. I pacchi sono imballati con cartone riciclato e paglia di riempimento — niente polistirolo. Le bottiglie viaggiano in alveari di cartone progettati apposta.':
    'We ship across Italy by express courier (48–72h). Free shipping over €39. Packages are wrapped in recycled cardboard with straw filler — no polystyrene. Bottles travel in purpose-built cardboard combs.',
  'Posso vendere Suea Fai nel mio bar / palestra / ristorante?':
    'Can I sell Suea Fai in my bar / gym / restaurant?',
  "Certo. Abbiamo un programma wholesale dedicato a bar, palestre Muay Thai, ristoranti thailandesi e negozi specializzati. Scrivici a wholesale@sueafai.it per il listino e i minimi d'ordine.":
    'Sure. We run a wholesale program for bars, Muay Thai gyms, Thai restaurants and specialty stores. Write to wholesale@sueafai.it for the price list and minimum orders.',
  "C'è un programma di vuoto a rendere?": 'Is there a bottle return program?',
  "Sì, sulle casse intere (12 e 24 bottiglie). Restituisci le bottigliette vuote pulite al ritiro del prossimo ordine e ti accreditiamo 0,15€ a bottiglia. Stessa logica del 1974: il vetro non si butta.":
    "Yes, on full crates (12 and 24 bottles). Return clean empties at the next order pickup and we credit €0.15 per bottle. Same logic as 1974: glass is not thrown away.",
};
