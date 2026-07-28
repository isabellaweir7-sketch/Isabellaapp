import {
  OnboardingReason,
  DietaryRestriction,
  SampleDish,
  Recipe,
  FeatureTile,
  DayPlan,
  HouseholdMember,
  CookingNight,
  ShoppingListItem,
  TodayMeal,
  NotificationItem,
  BudgetTip,
  ShoppingAisle,
  EquipmentItem,
  Technique,
  SkillLevel,
  ProTip,
} from './types';

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  { id: 'hob', label: 'Hob / Stovetop' },
  { id: 'oven', label: 'Oven' },
  { id: 'microwave', label: 'Microwave' },
  { id: 'air-fryer', label: 'Air Fryer' },
  { id: 'slow-cooker', label: 'Slow Cooker' },
  { id: 'kettle', label: 'Kettle' },
  { id: 'blender', label: 'Blender' },
  { id: 'rice-cooker', label: 'Rice Cooker' },
];

export const STUDENT_STATUS_OPTIONS = ['University', 'College', 'Sixth Form', 'Not currently studying'];

export const ACCOMMODATION_OPTIONS = ['Halls of residence', 'Private rental (shared)', 'Private rental (solo)', 'Living at home'];

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
  prepMinutes: 20,
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
  preservationTip:
    'Keeps in the fridge for up to 3 days in an airtight container. Reheat gently on the hob with a splash of water, or microwave in 60-second bursts, stirring in between.',
};

export const SAVED_RECIPES: Recipe[] = [
  {
    id: 'recipe-tomato-pasta',
    title: 'One-pan tomato & garlic pasta',
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    fallback: '#354A1F',
    pricePerServing: 0.95,
    prepMinutes: 15,
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
    prepMinutes: 25,
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
    preservationTip:
      'Freezes well for up to 3 months — portion into containers once cooled. Fridge: up to 4 days. Reheat from frozen in the microwave, or overnight in the fridge first then reheat until piping hot throughout.',
  },
  {
    id: 'recipe-sausage-traybake',
    title: 'Sheet-pan sausage traybake',
    photo: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&q=80&w=800',
    fallback: '#5C4A28',
    pricePerServing: 1.6,
    prepMinutes: 40,
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
    preservationTip:
      'Keeps in the fridge for up to 3 days. Reheat in the oven at 180°C for 10–12 minutes to keep the sausages from going rubbery — microwaving works in a pinch but softens the crisp edges.',
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
    prepMinutes: 5,
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
    prepMinutes: 15,
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
    prepMinutes: 30,
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

export const HOUSEHOLD_MEMBERS: HouseholdMember[] = [
  { id: 'you', name: 'You', initials: 'IW' },
  { id: 'dan', name: 'Dan', initials: 'D' },
  { id: 'freya', name: 'Freya', initials: 'F' },
  { id: 'alex', name: 'Alex', initials: 'A' },
];

export const COOKING_NIGHTS: CookingNight[] = [
  { day: 'Monday', memberId: 'you' },
  { day: 'Tuesday', memberId: 'dan' },
  { day: 'Wednesday', memberId: 'freya' },
  { day: 'Thursday', memberId: 'alex' },
  { day: 'Friday', memberId: 'you' },
  { day: 'Saturday', memberId: 'dan' },
  { day: 'Sunday', memberId: 'freya' },
];

export const SHOPPING_LIST: ShoppingListItem[] = [
  { id: 'item-milk', name: 'Milk (2L)', price: 1.3, addedBy: 'freya', aisle: 'Dairy & Chilled' },
  { id: 'item-bread', name: 'Bread', price: 1.1, addedBy: 'dan', aisle: 'Grains & Pantry' },
  { id: 'item-pasta', name: 'Pasta (2kg)', price: 2.4, addedBy: 'you', aisle: 'Grains & Pantry' },
  { id: 'item-washingup', name: 'Washing-up liquid', price: 1.5, addedBy: 'alex', aisle: 'Household' },
  { id: 'item-loo-roll', name: 'Loo roll (9-pack)', price: 4.2, addedBy: 'freya', aisle: 'Household' },
  { id: 'item-bin-bags', name: 'Bin bags', price: 2.0, addedBy: 'you', aisle: 'Household' },
  { id: 'item-spinach', name: 'Spinach', price: 0.9, addedBy: 'dan', aisle: 'Produce' },
  { id: 'item-onions', name: 'Onions (net)', price: 0.7, addedBy: 'you', aisle: 'Produce' },
];

// The same shared list, grouped by aisle for the full-screen Shopping Mode view.
export const SHOPPING_AISLES: ShoppingAisle[] = ['Produce', 'Dairy & Chilled', 'Grains & Pantry', 'Household'].map(
  (name) => ({
    name,
    items: SHOPPING_LIST.filter((item) => item.aisle === name),
  })
);

export const WEEKLY_BUDGET = {
  spent: 7,
  target: 30,
};

// Three meals the plan has already picked out for today, shown on Home.
export const TODAY_MEALS: TodayMeal[] = [
  { slot: 'Breakfast', recipe: { ...SAVED_RECIPES[0], prepMinutes: 10 } },
  { slot: 'Lunch', recipe: { ...SAVED_RECIPES[1], prepMinutes: 20 } },
  { slot: 'Dinner', recipe: CUPBOARD_HERO },
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-cook-swap',
    group: 'Household',
    title: "Dan can't cook tonight",
    detail: "He's marked Thursday as up for grabs — tap to claim it.",
    time: '20m ago',
  },
  {
    id: 'notif-shopping-add',
    group: 'Household',
    title: 'Freya added 2 items',
    detail: 'Milk and loo roll are now on the shared shopping list.',
    time: '2h ago',
  },
  {
    id: 'notif-budget-warning',
    group: 'Budget',
    title: "You're close to your weekly budget",
    detail: "£23 of your £30 is spent, with 2 days left in the week.",
    time: 'Yesterday',
  },
  {
    id: 'notif-community-upvote',
    group: 'Community',
    title: 'Your recipe got 10 more upvotes',
    detail: '"Loaded beans on toast, three ways" is climbing the feed.',
    time: '2 days ago',
  },
];

export const BUDGET_TIPS: BudgetTip[] = [
  {
    id: 'tip-regrow-onions',
    title: 'How to regrow spring onions on your windowsill, indefinitely',
    excerpt: 'Keep the root end in a jar of water and you never have to buy them again.',
    photo: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    fallback: '#4E5A34',
  },
  {
    id: 'tip-bulk-grains',
    title: 'Where to buy bulk grains near campus',
    excerpt: 'Rice, oats, and lentils cost half as much from the bulk bins as the branded bags.',
    photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    fallback: '#5C4A28',
  },
  {
    id: 'tip-oat-milk',
    title: 'Make your own oat milk for 15p a litre',
    excerpt: 'Blend oats and water, strain, and it works in tea, cereal, or baking.',
    photo: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&q=80&w=800',
    fallback: '#274038',
  },
];

export const BUDGET_ANALYTICS = {
  monthSpent: 82.5,
  monthBudget: 120,
  monthSavings: 37.5,
  weekAverage: 20.6,
  topSavingTip: 'Batch cooking your dinners twice this week saved you an estimated £9.40 versus buying each meal separately.',
  categories: [
    { label: 'Bulk Buys', amount: 34.0 },
    { label: 'Social Cooking', amount: 22.5 },
    { label: 'Essentials', amount: 26.0 },
  ],
  weeklyTrend: [12, 18, 9, 22, 14, 20, 7],
};

// Technique Library: short how-to clips. Real video is a future content step —
// these render as placeholder thumbnail cards, never fake or AI-generated video.
export const TECHNIQUES: Technique[] = [
  {
    id: 'technique-dice',
    name: 'The Perfect Dice',
    durationLabel: '1:20',
    photo: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=800',
    fallback: '#4E5A34',
  },
  {
    id: 'technique-deglaze',
    name: 'Deglazing 101',
    durationLabel: '0:55',
    photo: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800',
    fallback: '#5C4A28',
  },
  {
    id: 'technique-acidity',
    name: 'Balancing Acidity',
    durationLabel: '1:05',
    photo: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    fallback: '#274038',
  },
  {
    id: 'technique-knife-care',
    name: 'Keeping a Knife Sharp',
    durationLabel: '1:40',
    photo: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&q=80&w=800',
    fallback: '#354A1F',
  },
];

export const SKILL_LEVELS: SkillLevel[] = [
  { id: 'novice', name: 'Novice', requirement: 'Complete onboarding' },
  { id: 'sous-chef', name: 'Sous Chef', requirement: 'Cook 5 recipes using at least 3 techniques' },
  { id: 'kitchen-master', name: 'Kitchen Master', requirement: 'Cook 20 recipes across every technique' },
];

export const PRO_TIPS: ProTip[] = [
  {
    id: 'pro-tip-rest-meat',
    title: 'Always rest meat before cutting',
    excerpt: 'Resting for 5 minutes lets the juices redistribute instead of spilling out onto the board.',
  },
  {
    id: 'pro-tip-salt-pasta-water',
    title: 'Salt your pasta water properly',
    excerpt: 'It should taste like the sea — this is your only chance to season the pasta itself.',
  },
  {
    id: 'pro-tip-mise-en-place',
    title: 'Prep everything before the heat goes on',
    excerpt: 'Mise en place turns a stressful cook into a calm one, especially in a shared kitchen.',
  },
];
