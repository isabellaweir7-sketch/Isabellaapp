import {
  OnboardingReason,
  DietaryRestriction,
  MealWant,
  SampleDish,
  Recipe,
  HouseholdMember,
  CommunityRecipe,
} from './types';

export const ONBOARDING_REASONS: OnboardingReason[] = [
  { id: 'afford-meals', label: "Can't afford meals" },
  { id: 'keep-healthy', label: 'Keeping healthy' },
  { id: 'roommate-planning', label: 'Struggling to plan with roommates' },
  { id: 'bored-repeats', label: 'Bored of eating the same thing' },
  { id: 'building-muscle', label: 'Building muscle' },
  { id: 'cooking-alone-first-time', label: 'Cooking alone for the first time' },
  { id: 'save-time', label: 'Saving time on planning' },
  { id: 'learn-to-cook', label: 'Learning to cook from scratch' },
  { id: 'exam-season', label: 'Prepping for exam season' },
  { id: 'reduce-waste', label: 'Reducing food waste' },
  { id: 'eat-more-veg', label: 'Eating more vegetables' },
  { id: 'bulking', label: 'Trying to gain weight / bulk' },
  { id: 'losing-weight', label: 'Trying to lose weight' },
  { id: 'shared-shopping', label: 'Splitting shopping with housemates' },
  { id: 'just-inspiration', label: 'Just want some inspiration' },
];

export const DIETARY_RESTRICTIONS: DietaryRestriction[] = [
  { id: 'none', label: 'No restrictions' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'pescatarian', label: 'Pescatarian' },
  { id: 'gluten-free', label: 'Gluten-free' },
  { id: 'dairy-free', label: 'Dairy-free' },
  { id: 'nut-allergy', label: 'Nut allergy' },
  { id: 'halal', label: 'Halal' },
  { id: 'kosher', label: 'Kosher' },
  { id: 'low-fodmap', label: 'Low FODMAP' },
];

// Abstract preference cards (not tied to a specific dish), so these stay as
// soft sage-toned gradients rather than photos.
export const MEAL_WANTS: MealWant[] = [
  {
    id: 'high-protein',
    label: '45g+ protein',
    sublabel: 'Keeps you full, builds muscle',
    gradient: 'linear-gradient(135deg, #EFEBDB 0%, #D8E2C6 100%)',
  },
  {
    id: 'low-carb',
    label: 'Low-carb',
    sublabel: 'Lighter on the bread and rice',
    gradient: 'linear-gradient(135deg, #F3EFE0 0%, #E3E9D4 100%)',
  },
  {
    id: 'under-500',
    label: 'Under 500 kcal',
    sublabel: 'Lighter meals, still satisfying',
    gradient: 'linear-gradient(150deg, #EEEADA 0%, #CFDCBC 100%)',
  },
  {
    id: 'budget-first',
    label: 'Budget over macros',
    sublabel: "Whatever's cheapest wins",
    gradient: 'linear-gradient(135deg, #F0ECDD 0%, #DDE4CE 100%)',
  },
  {
    id: 'quick',
    label: 'Under 20 minutes',
    sublabel: 'In and out of the kitchen fast',
    gradient: 'linear-gradient(150deg, #F2EEDF 0%, #E6EBD8 100%)',
  },
  {
    id: 'meal-prep',
    label: 'Meal-prep friendly',
    sublabel: 'Cook once, eat all week',
    gradient: 'linear-gradient(135deg, #EEE9D9 0%, #D3DFC3 100%)',
  },
  {
    id: 'comfort',
    label: 'Comfort food',
    sublabel: 'Warm, filling, low effort',
    gradient: 'linear-gradient(150deg, #F1EDDE 0%, #E0E6D2 100%)',
  },
  {
    id: 'one-pan',
    label: 'One-pan only',
    sublabel: 'Minimal washing up',
    gradient: 'linear-gradient(135deg, #EFEBDB 0%, #CBDAB8 100%)',
  },
];

// Stock food photography (Unsplash) for anything representing an actual dish,
// with a pale sage fallback colour if a photo fails to load.
export const SAMPLE_DISHES: SampleDish[] = [
  {
    id: 'dish-tomato-pasta',
    name: 'One-pan tomato & garlic pasta',
    tags: ['Budget', '15 min'],
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    fallback: '#D8E2C6',
  },
  {
    id: 'dish-chicken-rice',
    name: 'Peri-peri chicken & rice bowl',
    tags: ['High protein'],
    photo: 'https://images.unsplash.com/photo-1585238341267-fb9ded340f36?auto=format&fit=crop&q=80&w=800',
    fallback: '#E3E9D4',
  },
  {
    id: 'dish-lentil-curry',
    name: 'Coconut lentil curry',
    tags: ['Vegan', 'Batch cooks'],
    photo: 'https://images.unsplash.com/photo-1455853828816-0c301a0a5bb8?auto=format&fit=crop&q=80&w=800',
    fallback: '#CFDCBC',
  },
  {
    id: 'dish-beans-toast',
    name: 'Loaded beans on toast',
    tags: ['Under £1', '5 min'],
    photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    fallback: '#DDE4CE',
  },
  {
    id: 'dish-stirfry',
    name: 'Veg & egg fried rice stir-fry',
    tags: ['Cupboard mode'],
    photo: 'https://images.unsplash.com/photo-1585238341267-fb9ded340f36?auto=format&fit=crop&q=80&w=800',
    fallback: '#E6EBD8',
  },
  {
    id: 'dish-tuna-pasta-bake',
    name: 'Tuna pasta bake',
    tags: ['Meal-prep friendly'],
    photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    fallback: '#D3DFC3',
  },
  {
    id: 'dish-omelette',
    name: 'Cheese & spinach omelette',
    tags: ['5 min', 'High protein'],
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    fallback: '#E0E6D2',
  },
  {
    id: 'dish-chilli',
    name: 'Budget beef & bean chilli',
    tags: ['Batch cooks', 'Freezes well'],
    photo: 'https://images.unsplash.com/photo-1455853828816-0c301a0a5bb8?auto=format&fit=crop&q=80&w=800',
    fallback: '#CBDAB8',
  },
];

export const THIS_WEEKS_HERO_RECIPE: Recipe = {
  id: 'recipe-hero-chilli',
  title: 'Budget beef & bean chilli',
  minutes: 35,
  servings: 4,
  pricePerServing: 1.85,
  photo: 'https://images.unsplash.com/photo-1455853828816-0c301a0a5bb8?auto=format&fit=crop&q=80&w=1200',
  fallback: '#CFDCBC',
  tags: ['Batch cooks', 'Freezes well'],
};

export const SAVED_RECIPES: Recipe[] = [
  {
    id: 'recipe-tomato-pasta',
    title: 'One-pan tomato & garlic pasta',
    minutes: 15,
    servings: 2,
    pricePerServing: 0.95,
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200',
    fallback: '#D8E2C6',
    tags: ['Budget', 'Quick'],
  },
  {
    id: 'recipe-lentil-curry',
    title: 'Coconut lentil curry',
    minutes: 30,
    servings: 4,
    pricePerServing: 1.2,
    photo: 'https://images.unsplash.com/photo-1455853828816-0c301a0a5bb8?auto=format&fit=crop&q=80&w=200',
    fallback: '#CFDCBC',
    tags: ['Vegan'],
  },
];

export const COMMUNITY_RECIPES: CommunityRecipe[] = [
  {
    id: 'community-beans-toast',
    title: 'Loaded beans on toast, three ways',
    author: 'Priya, 2nd year',
    upvotes: 214,
    pricePerServing: 0.6,
    photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    fallback: '#DDE4CE',
  },
  {
    id: 'community-stirfry',
    title: 'Empty-cupboard fried rice',
    author: 'Marcus, 1st year',
    upvotes: 158,
    pricePerServing: 0.85,
    photo: 'https://images.unsplash.com/photo-1585238341267-fb9ded340f36?auto=format&fit=crop&q=80&w=400',
    fallback: '#E3E9D4',
  },
  {
    id: 'community-tuna-bake',
    title: 'Five-ingredient tuna pasta bake',
    author: 'Sofia, 3rd year',
    upvotes: 132,
    pricePerServing: 1.1,
    photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    fallback: '#D3DFC3',
  },
];

export const HOUSEHOLD_MEMBERS: HouseholdMember[] = [
  { id: 'you', name: 'You', initials: 'IW', cookingNight: 'Tonight' },
  { id: 'housemate-1', name: 'Dan', initials: 'D', cookingNight: 'Tomorrow' },
  { id: 'housemate-2', name: 'Freya', initials: 'F', cookingNight: 'Thursday' },
  { id: 'housemate-3', name: 'Alex', initials: 'A', cookingNight: null },
];

export const WEEKLY_BUDGET = {
  spent: 18.4,
  target: 30,
};
