# Migration notes

The original site was a single HTML page plus a large `script.js`.

## What moved where

| Old implementation | New implementation |
|---|---|
| HTML sections | React components under `client/src/components` |
| `products` JS array | MongoDB Product model + `server/src/data/products.js` seed |
| `renderProducts()` | `ProductGrid` + `ProductCard` |
| Product detail DOM modal | `/products/:id` React page |
| `galleryStates` | `useGallery` hook |
| Scroll/reveal code | `useReveal`, `ScrollProgress`, `BackToTop` |
| Counter IntersectionObserver | `useCounter` |
| Mobile menu DOM code | React state in `Navbar` |
| Quote demo submit | `ContactSection` -> `POST /api/enquiries` -> MongoDB |
| Tailwind CDN config | local Tailwind/PostCSS config |
| Font Awesome icons | `lucide-react` |

## Why product details became a route

The old site generated a large hidden detail element for every product. In React, a dedicated `/products/:id` page keeps the DOM smaller and makes each machine directly addressable.

If you specifically want the old popup behavior instead, `ProductGallery` and the product detail UI can be reused inside a modal without changing the API.

## MongoDB

The product catalog is now database-backed. The seed file contains the 9 products from the original script. Run:

```bash
npm run seed
```

The enquiry form is also database-backed.

## Images

Remote product/industry images from the original site remain as URLs. The six customer logo filenames from the old HTML are expected under `client/public/images/`.
