# 📚 BookNook — A Small Online Library
**Live site:** https://your-booknook.vercel.app  *(replace after deploy)*

## Features
- Add a book, borrow a book, return a book — simple and fast
- Swiper.js hero slider and a live "New Arrivals" section (latest 6 books from MongoDB)
- BetterAuth login with email/password and Google, with JWT-protected API
- Private routes that survive page reloads without bouncing you to login
- Stock tracking with `$inc`: "Not Available" at 0 copies, and no double borrowing
- My Books with edit modal and custom delete confirm; My Borrows with one-click return
- Toast messages everywhere, custom 404 page, per-route page titles, fully responsive

## Setup
`cp .env.example .env.local` → fill values → `npm i && npm run dev`
Google OAuth redirect URI: `{BETTER_AUTH_URL}/api/auth/callback/google`
