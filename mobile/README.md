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
- **Birthdays tab**: live countdown cards for each friend, searchable, with
  reminder toggles.
- **Profiles tab**: full friend profile — sizes, favorite shops/snacks/
  drinks/flowers, jewellery preferences, allergies, a strict "do not want"
  list, wishlist items with secret gift claiming, and a whispers/mentions
  notes log.
- **Dream Board / Gift Genie / Badges tabs**: placeholder screens — not yet
  built.

Data is mock data (ported from the `../mockData.ts` web prototype) persisted
locally on-device via AsyncStorage. There is no shared backend yet, so
friends on different phones won't see each other's data until one is built.

## Design system

Colors, fonts, spacing and radii live in `src/theme/theme.ts` — cream
background, dark olive accent, Fraunces (serif, italic for emphasis) for
headings, Inter for body text.

## Next up

- Birthday calendar (month grid) view
- Dream Board (photo/link/screenshot board organized by price range)
- Gift Genie AI suggestions + affiliate links
- Group gift chip-ins, chat, giver badges
- Real backend + auth so friend data syncs across devices
