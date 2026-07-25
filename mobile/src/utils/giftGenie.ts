import { FriendProfile, GiftSuggestion, PriceRangeTag } from '../types/index';

export const BUDGET_OPTIONS: { label: string; value: PriceRangeTag }[] = [
  { label: 'Under $15', value: 'under15' },
  { label: '$15 - $35', value: '15to35' },
  { label: '$35 - $75', value: '35to75' },
  { label: '$75+ Splurge', value: 'splurge75' },
];

export const VIBE_OPTIONS = [
  'Aesthetic & thoughtful',
  'Viral TikTok favorites',
  'Cozy room & self-care',
  'Dainty & sparkly jewelry',
  'Fun snacks & boba treats',
] as const;

type Vibe = (typeof VIBE_OPTIONS)[number];

type Generator = (friend: FriendProfile, tier: PriceRangeTag) => GiftSuggestion | null;

function pick<T>(arr: T[], fallback: T): T {
  return arr.length > 0 ? arr[0] : fallback;
}

const beautyPick: Generator = (friend, tier) => {
  const store = pick(friend.preferences.favoriteShops, 'Sephora');
  const byTier: Record<PriceRangeTag, { title: string; price: string }> = {
    under15: { title: 'Mini rollerball perfume duo', price: '$12' },
    '15to35': { title: 'Full-size body mist she keeps repurchasing', price: '$28' },
    '35to75': { title: 'Beauty gift set bundle', price: '$52' },
    splurge75: { title: 'Full skincare + fragrance gift box', price: '$85' },
  };
  const { title, price } = byTier[tier];
  return {
    title,
    price,
    store,
    reason: `Matches her go-to spot, ${store}, and the scents she already reaches for.`,
    category: 'Beauty',
    imageUrl: '',
    affiliateUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(`${title} ${store}`)}`,
    priceTag: tier,
  };
};

const jewelryPick: Generator = (friend, tier) => {
  const avoidsJewelry = friend.preferences.doNotWant.some((d) =>
    /jewel/i.test(d)
  );
  if (avoidsJewelry) return null;

  const { metal, style } = friend.preferences.jewellery;
  const store = /jewel|mejuri|etsy/i.test(friend.preferences.favoriteShops.join(' ')) ? pick(friend.preferences.favoriteShops, 'Mejuri') : 'Mejuri / Etsy';
  const byTier: Record<PriceRangeTag, { title: string; price: string }> = {
    under15: { title: `Dainty ${metal} stacking ring`, price: '$14' },
    '15to35': { title: `${style} in ${metal}`, price: '$28' },
    '35to75': { title: `${style} gift set in ${metal}`, price: '$58' },
    splurge75: { title: `Statement ${metal} jewelry set`, price: '$95' },
  };
  const { title, price } = byTier[tier];
  return {
    title,
    price,
    store,
    reason: `Sticks to exactly what she wears — ${metal}, ${style.toLowerCase()}.`,
    category: 'Jewelry',
    imageUrl: '',
    affiliateUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(`${title} ${store}`)}`,
    priceTag: tier,
  };
};

const snackPick: Generator = (friend, tier) => {
  const snack = pick(friend.preferences.favoriteSnacks, 'her favorite snacks');
  const drink = pick(friend.preferences.favoriteDrinks, 'her go-to drink order');
  const byTier: Record<PriceRangeTag, { title: string; price: string }> = {
    under15: { title: `${snack} + drink gift card combo`, price: '$10' },
    '15to35': { title: `Curated snack box featuring ${snack}`, price: '$22' },
    '35to75': { title: `Deluxe treat box with ${snack} + café gift card`, price: '$45' },
    splurge75: { title: `Ultimate snack & drink hamper`, price: '$70' },
  };
  const { title, price } = byTier[tier];
  return {
    title,
    price,
    store: 'Trader Joe\'s / local favorites',
    reason: `Built around what she already orders every time — ${drink.toLowerCase()}.`,
    category: 'Snacks & Treats',
    imageUrl: '',
    affiliateUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(title)}`,
    priceTag: tier,
  };
};

const fashionPick: Generator = (friend, tier) => {
  const store = pick(friend.preferences.favoriteShops, 'her favorite store');
  const byTier: Record<PriceRangeTag, { title: string; price: string }> = {
    under15: { title: `${store} gift card`, price: '$15' },
    '15to35': { title: `Accessory from ${store}`, price: '$30' },
    '35to75': { title: `Wardrobe staple from ${store} (size ${friend.preferences.clothingSize.split('|')[0].trim()})`, price: '$55' },
    splurge75: { title: `Splurge piece from ${store}`, price: '$95' },
  };
  const { title, price } = byTier[tier];
  return {
    title,
    price,
    store,
    reason: `${store} is one of her most-shopped stores — safe bet, right size on file.`,
    category: 'Fashion',
    imageUrl: '',
    affiliateUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(`${store} gift`)}`,
    priceTag: tier,
  };
};

const flowerPick: Generator = (friend, tier) => {
  if (friend.preferences.favoriteFlowers.length === 0) return null;
  const flower = pick(friend.preferences.favoriteFlowers, 'her favorite flowers');
  const byTier: Record<PriceRangeTag, { title: string; price: string }> = {
    under15: { title: `Small ${flower} bunch`, price: '$12' },
    '15to35': { title: `${flower} bouquet`, price: '$28' },
    '35to75': { title: `${flower} bouquet + vase`, price: '$48' },
    splurge75: { title: `Oversized ${flower} arrangement`, price: '$80' },
  };
  const { title, price } = byTier[tier];
  return {
    title,
    price,
    store: 'Local florist',
    reason: `${flower} are her stated favorite — always a thoughtful touch.`,
    category: 'Flowers',
    imageUrl: '',
    affiliateUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(`${flower} bouquet delivery`)}`,
    priceTag: tier,
  };
};

const hobbyPick: Generator = (friend, tier) => {
  if (friend.preferences.hobbies.length === 0) return null;
  const hobby = pick(friend.preferences.hobbies, 'her hobbies');
  const byTier: Record<PriceRangeTag, { title: string; price: string }> = {
    under15: { title: `Small accessory for ${hobby.toLowerCase()}`, price: '$14' },
    '15to35': { title: `Starter kit for ${hobby.toLowerCase()}`, price: '$26' },
    '35to75': { title: `Upgraded gear for ${hobby.toLowerCase()}`, price: '$50' },
    splurge75: { title: `Premium set for ${hobby.toLowerCase()}`, price: '$88' },
  };
  const { title, price } = byTier[tier];
  return {
    title,
    price,
    store: 'Amazon / specialty shop',
    reason: `She's into ${hobby.toLowerCase()} — this feeds the hobby, not just her closet.`,
    category: 'Hobbies & Fun',
    imageUrl: '',
    affiliateUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(title)}`,
    priceTag: tier,
  };
};

const experiencePick: Generator = (friend, tier) => {
  const hobby = friend.preferences.hobbies[0];
  const activity = hobby ? `a ${hobby.toLowerCase()} experience` : 'a fun day out';
  const byTier: Record<PriceRangeTag, { title: string; price: string }> = {
    under15: { title: hobby ? `Drop-in class pass for ${hobby.toLowerCase()}` : 'Mini golf or arcade pass', price: '$15' },
    '15to35': { title: 'Water park or trampoline park day pass', price: '$30' },
    '35to75': { title: 'Concert, show, or event tickets', price: '$65' },
    splurge75: { title: 'Concert tickets + VIP add-on, or a weekend activity pass', price: '$120' },
  };
  const { title, price } = byTier[tier];
  return {
    title,
    price,
    store: 'Ticketmaster / local venue',
    reason: `An experience over another thing — ${activity} she'll actually remember.`,
    category: 'Experiences & Events',
    imageUrl: '',
    affiliateUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(title)}`,
    priceTag: tier,
  };
};

const roomPick: Generator = (friend, tier) => {
  const color = pick(friend.preferences.favoriteColors, 'her favorite color');
  const byTier: Record<PriceRangeTag, { title: string; price: string }> = {
    under15: { title: `${color} candle`, price: '$13' },
    '15to35': { title: `${color} throw blanket`, price: '$32' },
    '35to75': { title: `${color} room decor bundle`, price: '$60' },
    splurge75: { title: `${color}-themed room refresh set`, price: '$90' },
  };
  const { title, price } = byTier[tier];
  return {
    title,
    price,
    store: 'Target / Amazon',
    reason: `${color} shows up across her favorites — cozy and on-theme.`,
    category: 'Room & Home',
    imageUrl: '',
    affiliateUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(title)}`,
    priceTag: tier,
  };
};

const pastGiftEcho: Generator = (friend, tier) => {
  const claimed = friend.wishlistItems.filter((item) => item.claimedStatus === 'claimed');
  if (claimed.length === 0) return null;
  const example = claimed[0];
  const byTier: Record<PriceRangeTag, { title: string; price: string }> = {
    under15: { title: `Mini version of "${example.title}"`, price: '$14' },
    '15to35': { title: `Something similar to "${example.title}"`, price: '$30' },
    '35to75': { title: `Upgraded pick like "${example.title}"`, price: '$55' },
    splurge75: { title: `Splurge version of "${example.title}"`, price: '$90' },
  };
  const { title, price } = byTier[tier];
  return {
    title,
    price,
    store: example.store,
    reason: `Someone already got her "${example.title}" and it was a hit — here's something in the same lane.`,
    category: example.category,
    imageUrl: '',
    affiliateUrl: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(`${title} ${example.store}`)}`,
    priceTag: tier,
  };
};

const VIBE_PRIORITY: Record<Vibe, Generator[]> = {
  'Aesthetic & thoughtful': [pastGiftEcho, jewelryPick, beautyPick, flowerPick, roomPick, experiencePick, hobbyPick, fashionPick, snackPick],
  'Viral TikTok favorites': [fashionPick, experiencePick, beautyPick, hobbyPick, pastGiftEcho, snackPick, jewelryPick, roomPick, flowerPick],
  'Cozy room & self-care': [roomPick, snackPick, beautyPick, pastGiftEcho, hobbyPick, experiencePick, flowerPick, jewelryPick, fashionPick],
  'Dainty & sparkly jewelry': [jewelryPick, beautyPick, pastGiftEcho, flowerPick, roomPick, experiencePick, hobbyPick, fashionPick, snackPick],
  'Fun snacks & boba treats': [snackPick, pastGiftEcho, experiencePick, beautyPick, hobbyPick, roomPick, fashionPick, jewelryPick, flowerPick],
};

export function generateGiftSuggestions(
  friend: FriendProfile,
  budget: PriceRangeTag,
  vibe: string,
  seed = 0
): GiftSuggestion[] {
  const generators = VIBE_PRIORITY[vibe as Vibe] || VIBE_PRIORITY['Aesthetic & thoughtful'];
  const rotated = [...generators.slice(seed % generators.length), ...generators.slice(0, seed % generators.length)];

  const results: GiftSuggestion[] = [];
  for (const gen of rotated) {
    const suggestion = gen(friend, budget);
    if (suggestion) results.push(suggestion);
    if (results.length >= 4) break;
  }
  return results;
}
