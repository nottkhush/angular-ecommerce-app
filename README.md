# AuraShop

Angular storefront with a custom Express + JWT backend. Built on top of [adsrikanth11/angular-ecommerce-app](https://github.com/adsrikanth11/angular-ecommerce-app), which gave me the UI and base structure. Everything listed under "What I built" is my own work on top of it.

## Stack
- Frontend: Angular 21, TypeScript, RxJS, Angular Router (lazy-loaded feature modules)
- Backend: Node.js, Express, JSON Web Tokens, bcrypt

## What I built
- **Auth guard** on `/checkout` with a `returnUrl` redirect back after login
- **JWT HTTP interceptor** that attaches the token only to my own API and handles 401s
- **Real auth flow**: `AuthService`, register and login against the API, header login/logout state
- **RxJS product search**: `debounceTime`, `distinctUntilChanged`, `switchMap` (cancels stale requests), `combineLatest`, `shareReplay`, and the `async` pipe
- **Performance**: `OnPush` change detection and `trackBy` on product views
- **Express API** (`server/`) with protected routes and server-side search and category filtering
- **Lighthouse pass**: SEO and accessibility fixes (meta description, robots.txt, labels, heading order, color contrast)

## API
| Method | Endpoint | Auth |
| --- | --- | --- |
| POST | `/api/auth/register` | no |
| POST | `/api/auth/login` | no |
| GET | `/api/me` | JWT |
| GET | `/api/products?search=&category=&limit=` | no |
| GET | `/api/products/:id` | no |
| GET | `/api/categories` | no |

## Run locally
Requires Node 20.19+ or 22.12+.

```bash
# 1. API (port 3000)
cd server
npm install
node index.js

# 2. Frontend (new terminal, repo root)
npm install
npm start
```
Open http://localhost:4200

Optional env vars for the API: `JWT_SECRET`, `PORT`, `CLIENT_ORIGIN` (comma-separated allowed origins).

## Lighthouse
Desktop preset, local production build, `/products` page. Full report in [`docs/lighthouse-report.html`](docs/lighthouse-report.html).

| Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- |
| 84 | 96 | 100 | 100 |

The remaining performance hit is layout shift (CLS): the footer jumps down when the product grid loads. Skeleton loaders that reserve the grid's height would fix it.

## Known limitations
- Users are stored in memory and reset when the server restarts
- Products are seeded from FakeStoreAPI at server start
- No tests beyond the generated specs
- Not deployed, runs locally only

## Next steps
- Persist users and products (SQLite or MongoDB)
- Skeleton loaders to remove the layout shift
- Flutter companion app against the same API
