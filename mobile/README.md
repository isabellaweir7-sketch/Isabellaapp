# Wishly (mobile)

The iPhone app for Wishly — birthday countdowns, friend profiles with gift
preferences, secret gift claiming, and more — built with Expo + React Native.

## Run it on your iPhone

1. Install [Expo Go](https://apps.apple.com/app/expo-go/id982107779) from the App Store.
2. From this directory:
   ```bash
   npm install
   npx expo start
   ```
3. Scan the QR code shown in the terminal with your iPhone's Camera app. It
   opens directly in Expo Go — no Mac or Xcode required for this stage.

## What's built so far

- **Onboarding**: Welcome screen and real Sign in / Sign up via Supabase
  Auth (email/password). If your Supabase project has "confirm email"
  turned on (the default for a fresh project), you'll need to tap the link
  in the confirmation email before you can sign in — the app tells you
  this rather than failing silently. Google sign-in is a "coming soon" tap
  target for now (needs a separate Google Cloud OAuth setup). Falls back to
  the old local-only toggle if `.env` isn't configured, so a fresh clone
  still works out of the box.
- **Birthdays tab**: a horizontal "coming up" strip of upcoming birthdays plus
  a month-by-month calendar grid underneath. Tapping a friend (from the strip
  or a calendar day) opens a quick-view sheet with a countdown, key
  preferences, a reminder toggle, and shortcuts to their profile or Gift
  Genie.
- **Profiles tab**: full friend profile — sizes, favorite shops/snacks/
  drinks/flowers, jewellery preferences, allergies, a strict "do not want"
  list, wishlist items with secret gift claiming, and a whispers/mentions
  notes log. Manual "Add Item" flow now exists (previously only Gift Genie
  could add wishlist items), including an **Experiences & Events** category
  for concert tickets, water parks, classes, etc. with optional date/venue
  fields.
- **Dream Board tab**: a private, price-filterable pin board for saving
  photos, TikTok ideas, links, screenshots and quotes — now with an
  Experiences & Events category too.
- **Gift Genie tab**: suggests gifts from a friend's own saved preferences
  (shops, jewellery style, snacks, flowers, hobbies) plus an echo of what
  other friends already bought them, filtered by budget and vibe. Includes
  an experience-based suggestion (tickets, class passes, day passes). This
  is a rules-based recommender, not a live AI call — there's no backend yet
  to hold an API key securely, so it doesn't hit a real LLM. Suggestions
  add straight to the wishlist or open a real shopping search link.
- **Badges tab**: giver level and unlocked badges (read-only for now).
- **Group chip-ins**: an unclaimed wishlist item can be turned into a group
  chip-in (button-state based, no extra modal — matches GoWish's simple
  "reserve" pattern rather than adding real payment splitting, which felt
  like scope/risk not worth taking on). This is coordination/visibility
  only — no money changes hands in-app. Note: since chip-in state lives in
  each phone's local storage, it won't actually sync between different
  friends' devices until the shared backend exists (same limitation as
  claiming today).
- **Clipboard-paste quick add**: opening "Add Item" or "Save Pin" checks the
  clipboard for a URL and offers a one-tap paste. This is the Expo-Go-
  compatible stand-in for a true iOS share-sheet extension — a real "Share
  to Wishly" from Safari/TikTok needs a custom native build (EAS Build /
  Xcode), which would mean giving up the "just scan the QR code" workflow.
  Worth doing deliberately later, not as a drive-by addition.

Data is mock data (ported from the `../mockData.ts` web prototype) persisted
locally on-device via AsyncStorage. There is no shared backend yet, so
friends on different phones won't see each other's data until one is built —
see "Setting up the shared backend" below for where that stands.

## Setting up the shared backend (Supabase)

The app currently stores everything locally per-phone. To make friend data,
group chip-ins, and (eventually) chat actually sync between different
people's phones, it needs a shared backend. This project uses
[Supabase](https://supabase.com) (free to start, no credit card required).
I can't create this account for you, so here's the one-time setup:

1. Go to [supabase.com](https://supabase.com) and sign up free (GitHub or
   email both work).
2. Click **New Project**. Pick any name (e.g. "wishly"), set a database
   password (save it somewhere — you likely won't need it day-to-day, but
   keep it safe), and pick a region close to you. Wait ~2 minutes for it to
   provision.
3. Open **SQL Editor** (left sidebar) > **New query**, paste in the entire
   contents of [`supabase/schema.sql`](./supabase/schema.sql) from this
   repo, and click **Run**. This creates all the tables and security rules.
4. Open **Project Settings > API**. You'll see a **Project URL** and an
   **anon / public** key — copy both.
5. In this `mobile/` folder, copy `.env.example` to a new file named `.env`,
   and paste the URL and anon key into it.
6. Restart `npx expo start` so it picks up the new values.

The **anon / public** key is safe to paste into `.env` and even safe to
share with me if you want help debugging — it's designed to be shipped
inside client apps and is protected by the row-level security rules in
`schema.sql`. The **service_role** key (also visible on that same page) is
different — never put that one in `.env` or share it anywhere; it bypasses
all security rules and should only ever live on a trusted server, which
this app doesn't have (or need) yet.

Until `.env` is filled in, the app keeps working exactly as it does now —
everything just stays local-only.

## Design system

Colors, fonts, spacing and radii live in `src/theme/theme.ts` — cream
background, dark olive accent, Fraunces (serif, italic for emphasis) for
headings, Inter for body text.

## Next up

- **Backend, in stages**: schema + Supabase client are scaffolded
  (`supabase/schema.sql`, `src/lib/supabase.ts`), but not yet wired up —
  that's the next piece of work once a project exists (see setup above).
  The plan is: (1) real auth screens, (2) an invite-code flow so a friend
  group can jointly maintain one "circle" for a person, (3) rewire
  wishlist/notes/chip-ins to read and write through Supabase instead of
  local storage, (4) group chat per circle, built on the same realtime
  connection.
- Wire Gift Genie to a real AI backend (needs a server to hold the API key
  — the Supabase project can double as that server via an Edge Function)
- Badge-earning logic
- A true native share-sheet extension, once ready to move off plain Expo Go
