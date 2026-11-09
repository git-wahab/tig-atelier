# Embroidered Hoodies

A Next.js 14 (App Router) + Tailwind CSS + TypeScript storefront for two embroidered hoodies:
Whispering Crane Bird and Midnight Bloom.

## Run it on your computer

You need Node.js 18.18 or newer (https://nodejs.org).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To test the production build:

```bash
npm run build
npm start
```

## Tests

```bash
npm test          # once
npm run test:watch
```

Vitest with React Testing Library, in `test/`. 148 tests covering the cart (state,
localStorage, other tabs), prices and formatting, the product and FAQ data, the
contact endpoint, and the five interactive components. No browser or dev server
needed; the suite runs in about four seconds.

| File | Covers |
| --- | --- |
| `test/lib.test.ts` | `cx`, `money`, `priceOf`, `getProduct`, and the product and FAQ data |
| `test/cart.test.tsx` | `CartProvider`: add, quantity, remove, clear, saving, other tabs |
| `test/contact-route.test.ts` | `POST /api/contact` accepts and rejects |
| `test/components.test.tsx` | `ProductBuyPanel`, `CartButton`, `CartView`, `ContactForm`, `FaqList` |

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage |
| `/collection` | Both designs, side by side |
| `/products/whispering-crane-bird` | Product page |
| `/products/midnight-bloom` | Product page |
| `/faq` | The FAQ |
| `/contact` | Contact form and details |
| `/cart` | Bag, delivery details and confirmation |
| `/api/contact` | Receives the contact form |

## Where to change things

- `lib/products.ts` holds all product copy, images, colours and captions. Add a design by adding an entry.
- `lib/config.ts` holds currency, sizes and prices. The prices are SAMPLE values. Replace them.
- `lib/faq.ts` holds the FAQ. Answers in [BRACKETS] are placeholders.
- `components/Logo.tsx` and `components/SiteFooter.tsx` hold the logo placeholder. Put your logo in `public/` and swap it in.
- `app/globals.css` holds the scroll animations. Browsers without CSS scroll-driven animation show the finished state with no motion.
- `public/images/` holds the photos and embroidery cutouts.

## Before launch

1. Replace every [BRACKETED] placeholder (price, fabric, fit, care, shipping, contact details, brand name).
2. Contact form: `app/api/contact/route.ts` only validates and logs. Connect it to email or a helpdesk.
3. Checkout: `components/CartView.tsx` does not take payment or save orders. Connect a payment provider and your order system where the TODO is.
4. The cart is stored in the browser (local storage). That is fine for a demo. For a real store, keep orders on the server.
