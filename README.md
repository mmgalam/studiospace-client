# StudioSpace

**Live site:** https://studiospace-client-pi.vercel.app
**Server repo:** https://github.com/mmgalam/studiospace-server

StudioSpace is a peer-to-peer marketplace where creators discover, filter and reserve photo studios, sound stages, podcast lounges, music suites and art workshops by the hour, while hosts list and manage their own spaces.

## Features

- Hero slider, top-rated featured studios and category browsing on the home page
- Explore page with category filter, search by name, sort by rating or price, and friendly empty states
- Studio details with gallery carousel, amenities, host info and an in-page booking modal
- Full studio CRUD for hosts: add (with ImgBB image upload), update, and delete with a confirmation modal
- Booking system with Pending, Confirmed, Completed and Cancelled statuses, plus host confirm/complete actions
- Double-booking prevention: overlapping times against confirmed bookings are rejected with a clear message
- Secure auth: BetterAuth (email/password and Google) with JWT stored in HTTPOnly cookies; mutations return 401 when unauthorized
- Light and dark theme toggle, skeleton loaders, custom 404 page and toast notifications throughout
- Fully responsive layout for mobile, tablet and desktop
- Downloadable PDF invoice for confirmed bookings

## Tech Stack

- **Client:** Next.js (App Router), TypeScript, Tailwind CSS, Swiper, Sonner, next-themes, react-icons
- **Auth:** BetterAuth with MongoDB adapter, JWT (HTTPOnly cookie)
- **Server:** Express.js, MongoDB (Atlas)

## Local Setup

1. Clone both repositories and run `npm install` in each.
2. Create `.env.local` in the client:

   MONGODB_URI=<your connection string ending with /studiospace>
   BETTER_AUTH_SECRET=<random string>
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=<id>
   GOOGLE_CLIENT_SECRET=<secret>
   NEXT_PUBLIC_IMGBB_KEY=<key>
   NEXT_PUBLIC_API_URL=http://localhost:5000
   API_URL=http://localhost:5000

3. Create `.env` in the server:

   PORT=5000
   MONGODB_URI=<same connection string>
   CLIENT_URL=http://localhost:3000
   JWT_SECRET=<random string>

4. In the server folder run `npm run seed` once, then `npm run dev`.
5. In the client folder run `npm run dev` and open http://localhost:3000.

## Examiner Test Credentials

| Role       | Email                  | Password  |
| ---------- | ---------------------- | --------- |
| Demo Host  | host@studiospace.test  | Host1234  |
| Demo Guest | guest@studiospace.test | Guest1234 |

Google login is also available on the login page.
