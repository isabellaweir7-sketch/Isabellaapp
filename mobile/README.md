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

- **Onboarding**: Welcome screen and Sign in / Sign up screens (UI only —
  Google/email sign-in currently just marks you as signed in locally; no
  backend auth yet).
- **Birthdays tab**: a horizontal "coming up" strip of upcoming birthdays plus
  a month-by-month calendar grid underneath. Tapping a friend (from the strip
  or a calendar day) opens a quick-view sheet with a countdown, key
  preferences, a reminder toggle, and shortcuts to their profile or Gift
  Genie.
- **Profiles tab**: full friend profile — sizes, favorite shops/snacks/
  drinks/flowers, jewellery preferences, allergies, a strict "do not want"
  list, wishlist items with secret gift claiming, and a whispers/mentions
  notes log.
- **Dream Board tab**: a private, price-filterable pin board for saving
  photos, TikTok ideas, links, screenshots and quotes.
- **Gift Genie tab**: suggests gifts from a friend's own saved preferences
  (shops, jewellery style, snacks, flowers, hobbies) plus an echo of what
  other friends already bought them, filtered by budget and vibe. This is a
  rules-based recommender, not a live AI call — there's no backend yet to
  hold an API key securely, so it doesn't hit a real LLM. Suggestions add
  straight to the wishlist or open a real shopping search link.
- **Badges tab**: giver level and unlocked badges (read-only for now).

Data is mock data (ported from the `../mockData.ts` web prototype) persisted
locally on-device via AsyncStorage. There is no shared backend yet, so
friends on different phones won't see each other's data until one is built.

## Design system

Colors, fonts, spacing and radii live in `src/theme/theme.ts` — cream
background, dark olive accent, Fraunces (serif, italic for emphasis) for
headings, Inter for body text.

## Next up

- Wire Gift Genie to a real AI backend (needs a server to hold the API key)
- Group gift chip-ins, in-app chat, badge-earning logic
- Real backend + auth so friend data syncs across devices
