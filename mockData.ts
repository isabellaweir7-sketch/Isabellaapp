import {
  OnboardingReason,
  DietaryRestriction,
  MealWant,
  SampleDish,
  CupboardHero,
  FeatureTile,
} from './types';

export const ONBOARDING_REASONS: OnboardingReason[] = [
  { id: 'keep-healthy', label: 'Keeping healthy' },
  { id: 'afford-meals', label: "Can't afford meals" },
  { id: 'roommate-planning', label: 'Struggling to plan with roommates' },
  { id: 'bored-repeats', label: 'Bored of eating the same thing' },
  { id: 'waste-less', label: 'Want to waste less food' },
  { id: 'learn-to-cook', label: 'Learning to cook from scratch' },
  { id: 'save-time', label: 'Saving time' },
  { id: 'building-muscle', label: 'Building muscle / gym goals' },
  { id: 'food-allergy', label: 'Managing a food allergy' },
  { id: 'cooking-alone-first-time', label: 'Cooking for the first time alone' },
  { id: 'eating-before-nights-out', label: 'Eating better before nights out' },
  { id: 'shared-shopping', label: 'Splitting costs with housemates' },
  { id: 'more-variety', label: 'Want more variety' },
  { id: 'reduce-takeaway', label: 'Reducing takeaway spend' },
  { id: 'just-browsing', label: 'Just here to browse' },
];

export const DIETARY_RESTRICTIONS: DietaryRestriction[] = [
  { id: 'none', label: 'No restrictions' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-free' },
  { id: 'dairy-free', label: 'Dairy-free' },
  { id: 'halal', label: 'Halal' },
  { id: 'kosher', label: 'Kosher' },
  { id: 'nut-allergy', label: 'Nut allergy' },
];

// Earthy forest-green family tones for the meal-want image blocks — a small
// palette of gradients (not one flat colour) so the grid doesn't feel repetitive.
const TONES = {
  a: 'linear-gradient(160deg, #6B8E3D 0%, #354A1F 100%)',
  b: 'linear-gradient(160deg, #A6844A 0%, #5C4A28 100%)',
  c: 'linear-gradient(160deg, #8A9A5B 0%, #4E5A34 100%)',
  d: 'linear-gradient(160deg, #4A7A6B 0%, #274038 100%)',
};

export const MEAL_WANTS: MealWant[] = [
  { id: 'high-protein', label: '45g+ protein', gradient: TONES.a },
  { id: 'low-carb', label: 'Low-carb', gradient: TONES.b },
  { id: 'under-500', label: 'Under 500 kcal', gradient: TONES.c },
  { id: 'high-fibre', label: 'High fibre', gradient: TONES.d },
  { id: 'balanced', label: 'Balanced / no target', gradient: TONES.a },
  { id: 'budget-first', label: 'Budget over macros', gradient: TONES.b },
];

// Stock food photography (Unsplash) with a forest-green-family fallback
// colour drawn behind it in case a photo fails to load.
export const SAMPLE_DISHES: SampleDish[] = [
  {
    id: 'dish-chickpea-curry',
    name: 'One-pan chickpea curry',
    tags: ['Vegan', 'Budget'],
    photo: 'https://images.unsplash.com/photo-1455853828816-0c301a0a5bb8?auto=format&fit=crop&q=80&w=800',
    fallback: '#4E5A34',
  },
  {
    id: 'dish-peanut-noodles',
    name: 'Peanut noodles',
    tags: ['15 min'],
    photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    fallback: '#5C4A28',
  },
  {
    id: 'dish-sausage-traybake',
    name: 'Sheet-pan sausage traybake',
    tags: ['One-pan', 'Batch cooks'],
    photo: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&q=80&w=800',
    fallback: '#274038',
  },
  {
    id: 'dish-tomato-pasta',
    name: 'One-pan tomato & garlic pasta',
    tags: ['Budget', '15 min'],
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    fallback: '#354A1F',
  },
  {
    id: 'dish-beans-toast',
    name: 'Loaded beans on toast',
    tags: ['Under £1', '5 min'],
    photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    fallback: '#5C4A28',
  },
  {
    id: 'dish-stirfry',
    name: 'Veg & egg fried rice stir-fry',
    tags: ['Cupboard mode'],
    photo: 'https://images.unsplash.com/photo-1585238341267-fb9ded340f36?auto=format&fit=crop&q=80&w=800',
    fallback: '#4E5A34',
  },
  {
    id: 'dish-chilli',
    name: 'Budget beef & bean chilli',
    tags: ['Batch cooks', 'Freezes well'],
    photo: 'https://images.unsplash.com/photo-1455853828816-0c301a0a5bb8?auto=format&fit=crop&q=80&w=800',
    fallback: '#274038',
  },
];

// Hero: a cupboard-mode result, the app's real differentiator.
export const CUPBOARD_HERO: CupboardHero = {
  id: 'recipe-tomato-chickpea-stew',
  title: 'Tomato & chickpea stew',
  subtitle: 'Uses 6 things you already have',
  photo: 'https://images.unsplash.com/photo-1455853828816-0c301a0a5bb8?auto=format&fit=crop&q=80&w=1200',
  fallback: '#354A1F',
  pricePerServing: 1.4,
  tags: ['Vegan', 'Cupboard mode', 'Batch cooks'],
  baseServings: 2,
  ingredients: [
    { name: 'Chickpeas (canned)', qtyPerServing: 0.5, unit: 'can' },
    { name: 'Chopped tomatoes (canned)', qtyPerServing: 0.5, unit: 'can' },
    { name: 'Onion', qtyPerServing: 0.5, unit: '' },
    { name: 'Garlic', qtyPerServing: 1, unit: 'clove' },
    { name: 'Ground cumin', qtyPerServing: 0.5, unit: 'tsp' },
    { name: 'Smoked paprika', qtyPerServing: 0.5, unit: 'tsp' },
    { name: 'Kale or spinach', qtyPerServing: 0.5, unit: 'handful' },
    { name: 'Oil', qtyPerServing: 0.5, unit: 'tbsp' },
  ],
  steps: [
    'Dice the onion and slice the garlic. Fry in oil over medium heat for 3–4 minutes until soft.',
    'Stir in the cumin and smoked paprika and cook for 30 seconds until fragrant.',
    'Add the chopped tomatoes and chickpeas (with their liquid). Simmer for 12–15 minutes, stirring occasionally.',
    'Stir in the kale or spinach and cook for 2 more minutes until wilted.',
    'Season with salt and pepper to taste and serve.',
  ],
};

export const HOME_TILES: FeatureTile[] = [
  {
    id: 'plan',
    label: "This week's plan",
    photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    fallback: '#5C4A28',
  },
  {
    id: 'pantry',
    label: 'Pantry',
    photo: 'https://images.unsplash.com/photo-1584473457409-ae5c91d40c3e?auto=format&fit=crop&q=80&w=600',
    fallback: '#4E5A34',
  },
  {
    id: 'saved',
    label: 'Saved',
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    fallback: '#354A1F',
  },
  {
    id: 'community',
    label: 'From other students',
    photo: 'https://images.unsplash.com/photo-1585238341267-fb9ded340f36?auto=format&fit=crop&q=80&w=600',
    fallback: '#274038',
  },
];

export const WEEKLY_BUDGET = {
  spent: 7,
  target: 30,
};
