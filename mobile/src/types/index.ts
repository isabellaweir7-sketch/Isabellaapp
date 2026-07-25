export type PriceRangeTag = 'under15' | '15to35' | '35to75' | 'splurge75';

export interface WhispersNote {
  id: string;
  content: string;
  dateAdded: string;
  authorName?: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  priceRangeTag: PriceRangeTag;
  store: string;
  url?: string;
  imageUrl?: string;
  category: string;
  eventDate?: string; // YYYY-MM-DD, for concert tickets, water parks, activities, etc.
  eventVenue?: string;
  claimedBy: string | null; // e.g. "Sophia" or null
  claimedStatus: 'unclaimed' | 'claimed' | 'chipping_in';
  chipInCount?: number;
  chipInParticipants?: string[]; // names of people chipping in together
  priority: 'high' | 'medium' | 'low';
  notes?: string;
}

export interface DreamBoardItem {
  id: string;
  title: string;
  type: 'photo' | 'tiktok_idea' | 'link' | 'screenshot' | 'quote';
  mediaUrl: string;
  price?: number;
  priceRangeTag: PriceRangeTag;
  linkUrl?: string;
  notes?: string;
  boardCategory: 'Beauty & Glow' | 'Fashion & Style' | 'Room & Cozy' | 'Jewelry & Sparkle' | 'Tasty Treats' | 'Random Obsessions' | 'Experiences & Events';
}

export interface ProfileTheme {
  color: string; // Background color class or hex
  accentColor: string;
  pattern: 'solid' | 'glitter' | 'y2k-hearts' | 'pastel-waves' | 'starry-sky' | 'cherry-blossom' | 'ribbon-stripe';
  unlocked: boolean;
}

export interface FriendProfile {
  id: string;
  name: string;
  avatar: string;
  relationship: 'Bestie' | 'Sister' | 'Partner' | 'Friend' | 'Cousin' | 'Mom' | 'Other';
  birthday: string; // YYYY-MM-DD
  zodiacSign: string;
  bio: string;
  theme: ProfileTheme;
  preferences: {
    favoriteColors: string[];
    favoriteSnacks: string[];
    favoriteDrinks: string[];
    favoriteShops: string[];
    favoriteFlowers: string[];
    clothingSize: string;
    shoeSize: string;
    jewellery: {
      metal: string;
      style: string;
    };
    allergies: string[];
    doNotWant: string[];
    hobbies: string[];
  };
  notes: WhispersNote[];
  wishlistItems: WishlistItem[];
  dreamBoardItems: DreamBoardItem[];
  reminderEnabled: boolean;
  reminderDaysBefore: number; // e.g. 14, 3, 0
}

export interface GiverBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

export interface UserGiverProgress {
  giverLevel: number;
  giftsGivenCount: number;
  unlockedThemes: string[];
  badges: GiverBadge[];
}

export interface GiftSuggestion {
  title: string;
  price: string;
  store: string;
  reason: string;
  category: string;
  imageUrl: string;
  affiliateUrl: string;
  priceTag: PriceRangeTag;
}
