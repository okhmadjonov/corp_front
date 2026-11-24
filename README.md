# corp_front

Corp katalogining sayti: tayyor kiyimlar va patternlar ro'yxati, filtr/qidiruv,
batafsil sahifa (login kerak), sevimlilar, ro'yxatdan o'tish.

API: [corp_backend](https://github.com/okhmadjonov/corp_backend) — avval u ishlab turishi kerak.

## Ishga tushirish

```bash
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:8000
npm run dev               # http://localhost:5173
```

> Saytni **`http://localhost:5173`** orqali oching (127.0.0.1 emas) va `VITE_API_URL` ham
> `localhost` bo'lsin. Sessiya httpOnly cookie'da, brauzer uni faqat bir xil host'ga yuboradi.

**Auth**: access token faqat xotirada (`src/api/session.ts`), refresh token — backend qo'ygan
httpOnly cookie'da. Sahifa yangilanganda `AuthProvider` cookie orqali sessiyani tiklaydi.

## Buyruqlar

| Buyruq | Vazifasi |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Tip tekshiruvi + production build |
| `npm run lint` | ESLint |

## Stack
Vite · React · TypeScript · React Router · React Query · axios · SCSS Modules (UI kutubxonasi yo'q).
`@` = `src`. Filtrlar URL'da saqlanadi (`?gender=1&season=2&tag=yozgi&page=2`).
