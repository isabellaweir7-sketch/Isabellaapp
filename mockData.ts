import {
  OnboardingReason,
  DietaryRestriction,
  MealWant,
  SampleDish,
  Recipe,
  FeatureTile,
  DayPlan,
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
export const CUPBOARD_HERO: Recipe = {
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

export const SAVED_RECIPES: Recipe[] = [
  {
    id: 'recipe-tomato-pasta',
    title: 'One-pan tomato & garlic pasta',
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    fallback: '#354A1F',
    pricePerServing: 0.95,
    tags: ['Budget', 'Quick'],
    baseServings: 2,
    ingredients: [
      { name: 'Spaghetti', qtyPerServing: 100, unit: 'g' },
      { name: 'Chopped tomatoes (canned)', qtyPerServing: 0.5, unit: 'can' },
      { name: 'Garlic', qtyPerServing: 1, unit: 'clove' },
      { name: 'Olive oil', qtyPerServing: 0.5, unit: 'tbsp' },
      { name: 'Dried chilli flakes', qtyPerServing: 0.25, unit: 'tsp' },
      { name: 'Parmesan (optional)', qtyPerServing: 1, unit: 'tbsp' },
    ],
    steps: [
      'Cook the spaghetti in salted boiling water until al dente.',
      'Meanwhile, fry the sliced garlic and chilli flakes in olive oil for 1 minute until fragrant.',
      'Add the chopped tomatoes and simmer for 8–10 minutes.',
      'Drain the pasta, toss through the sauce, and top with parmesan if using.',
    ],
  },
  {
    id: 'recipe-lentil-curry',
    title: 'Coconut lentil curry',
    photo: 'https://images.unsplash.com/photo-1455853828816-0c301a0a5bb8?auto=format&fit=crop&q=80&w=800',
    fallback: '#274038',
    pricePerServing: 1.2,
    tags: ['Vegan', 'Batch cooks'],
    baseServings: 4,
    ingredients: [
      { name: 'Red lentils', qtyPerServing: 50, unit: 'g' },
      { name: 'Coconut milk (canned)', qtyPerServing: 0.25, unit: 'can' },
      { name: 'Onion', qtyPerServing: 0.25, unit: '' },
      { name: 'Garlic', qtyPerServing: 1, unit: 'clove' },
      { name: 'Curry powder', qtyPerServing: 1, unit: 'tsp' },
      { name: 'Vegetable stock', qtyPerServing: 100, unit: 'ml' },
    ],
    steps: [
      'Fry the diced onion and garlic until soft, then stir in the curry powder for 30 seconds.',
      'Add the lentils, stock, and coconut milk. Bring to a simmer.',
      'Cook for 20–25 minutes, stirring occasionally, until the lentils are tender and the curry has thickened.',
      'Season to taste and serve with rice or flatbread.',
    ],
  },
  {
    id: 'recipe-sausage-traybake',
    title: 'Sheet-pan sausage traybake',
    photo: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&q=80&w=800',
    fallback: '#5C4A28',
    pricePerServing: 1.6,
    tags: ['One-pan', 'Batch cooks'],
    baseServings: 4,
    ingredients: [
      { name: 'Sausages', qtyPerServing: 2, unit: '' },
      { name: 'Potatoes', qtyPerServing: 1, unit: '' },
      { name: 'Red onion', qtyPerServing: 0.25, unit: '' },
      { name: 'Mixed peppers', qtyPerServing: 0.5, unit: '' },
      { name: 'Olive oil', qtyPerServing: 0.5, unit: 'tbsp' },
      { name: 'Mixed herbs', qtyPerServing: 0.5, unit: 'tsp' },
    ],
    steps: [
      'Preheat the oven to 200°C (fan).',
      'Chop the potatoes, onion, and peppers into chunks and toss with oil and herbs on a large tray.',
      'Nestle the sausages among the vegetables and roast for 35–40 minutes, turning once, until everything is golden.',
    ],
  },
];

// Student-submitted recipes. Light moderation happens off-screen; upvoting
// is the in-app quality signal that surfaces the best ones first.
export const COMMUNITY_RECIPES: Recipe[] = [
  {
    id: 'community-beans-toast',
    title: 'Loaded beans on toast, three ways',
    author: 'Priya, 2nd year',
    photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    fallback: '#5C4A28',
    pricePerServing: 0.6,
    tags: ['Under £1', '5 min'],
    baseServings: 1,
    upvotes: 214,
    ingredients: [
      { name: 'Baked beans (canned)', qtyPerServing: 0.5, unit: 'can' },
      { name: 'Bread', qtyPerServing: 2, unit: 'slice' },
      { name: 'Cheese', qtyPerServing: 20, unit: 'g' },
      { name: 'Chilli flakes (optional)', qtyPerServing: 0.25, unit: 'tsp' },
    ],
    steps: [
      'Toast the bread.',
      'Heat the beans in a pan or microwave until bubbling.',
      'Spoon over the toast, top with cheese, and grill for 2 minutes until melted.',
      'Finish with chilli flakes if you like a bit of heat.',
    ],
  },
  {
    id: 'community-stirfry',
    title: 'Empty-cupboard fried rice',
    author: 'Marcus, 1st year',
    photo: 'https://images.unsplash.com/photo-1585238341267-fb9ded340f36?auto=format&fit=crop&q=80&w=800',
    fallback: '#4E5A34',
    pricePerServing: 0.85,
    tags: ['Cupboard mode', '15 min'],
    baseServings: 2,
    upvotes: 158,
    ingredients: [
      { name: 'Cooked rice (leftover)', qtyPerServing: 150, unit: 'g' },
      { name: 'Egg', qtyPerServing: 1, unit: '' },
      { name: 'Frozen veg', qtyPerServing: 50, unit: 'g' },
      { name: 'Soy sauce', qtyPerServing: 1, unit: 'tbsp' },
      { name: 'Oil', qtyPerServing: 0.5, unit: 'tbsp' },
    ],
    steps: [
      'Heat the oil in a pan or wok until hot.',
      'Add the frozen veg and stir-fry for 2–3 minutes.',
      'Push to one side, crack in the egg, and scramble until just set.',
      'Add the rice and soy sauce, and stir-fry for 2–3 minutes until heated through.',
    ],
  },
  {
    id: 'community-tuna-bake',
    title: 'Five-ingredient tuna pasta bake',
    author: 'Sofia, 3rd year',
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    fallback: '#354A1F',
    pricePerServing: 1.1,
    tags: ['Batch cooks', 'Freezes well'],
    baseServings: 4,
    upvotes: 132,
    ingredients: [
      { name: 'Pasta', qtyPerServing: 75, unit: 'g' },
      { name: 'Tuna (canned)', qtyPerServing: 0.5, unit: 'can' },
      { name: 'Sweetcorn (canned)', qtyPerServing: 0.25, unit: 'can' },
      { name: 'Condensed soup or cheese sauce', qtyPerServing: 0.25, unit: 'can' },
      { name: 'Cheese', qtyPerServing: 15, unit: 'g' },
    ],
    steps: [
      'Preheat the oven to 190°C (fan) and cook the pasta until al dente.',
      'Mix the drained pasta with tuna, sweetcorn, and soup or cheese sauce.',
      'Transfer to a baking dish, top with cheese, and bake for 15–20 minutes until golden.',
    ],
  },
];

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

export const WEEKLY_PLAN: DayPlan[] = [
  { day: 'Monday', recipe: CUPBOARD_HERO },
  { day: 'Tuesday', recipe: SAVED_RECIPES[0] },
  { day: 'Wednesday', recipe: SAVED_RECIPES[1] },
  { day: 'Thursday', recipe: SAVED_RECIPES[2] },
  { day: 'Friday', recipe: CUPBOARD_HERO },
  { day: 'Saturday', recipe: SAVED_RECIPES[0] },
  { day: 'Sunday', recipe: SAVED_RECIPES[1] },
];

export const PANTRY_INGREDIENTS: string[] = [
  'Pasta',
  'Rice',
  'Tinned tomatoes',
  'Chickpeas',
  'Lentils',
  'Onions',
  'Garlic',
  'Eggs',
  'Cheese',
  'Bread',
  'Frozen veg',
  'Stock cubes',
  'Oats',
  'Peanut butter',
  'Tuna',
];

export const WEEKLY_BUDGET = {
  spent: 7,
  target: 30,
};
