import { PriceRangeTag } from '../types/index';

export function priceRangeLabel(tag: PriceRangeTag): string {
  switch (tag) {
    case 'under15':
      return 'Under $15';
    case '15to35':
      return '$15-$35';
    case '35to75':
      return '$35-$75';
    case 'splurge75':
      return '$75+';
  }
}

export function priceToRangeTag(price: number): PriceRangeTag {
  if (price >= 75) return 'splurge75';
  if (price >= 35) return '35to75';
  if (price >= 15) return '15to35';
  return 'under15';
}

export const PRICE_FILTERS: { label: string; value: PriceRangeTag | 'all' }[] = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $15', value: 'under15' },
  { label: '$15 - $35', value: '15to35' },
  { label: '$35 - $75', value: '35to75' },
  { label: '$75+ Splurge', value: 'splurge75' },
];

export const BOARD_CATEGORIES = [
  'Beauty & Glow',
  'Fashion & Style',
  'Room & Cozy',
  'Jewelry & Sparkle',
  'Tasty Treats',
  'Experiences & Events',
  'Random Obsessions',
] as const;
