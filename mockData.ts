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

export const MEAL_WANTS: MealWant[] = [
  {
    id: 'high-protein',
    label: '45g+ protein',
    sublabel: 'Keeps you full, builds muscle',
    gradient: 'linear-gradient(135deg, #33422C 0%, #5A7A3A 100%)',
  },
  {
    id: 'low-carb',
    label: 'Low-carb',
    sublabel: 'Lighter on the bread and rice',
    gradient: 'linear-gradient(135deg, #212B1D 0%, #33422C 100%)',
  },
  {
    id: 'under-500',
    label: 'Under 500 kcal',
    sublabel: 'Lighter meals, still satisfying',
    gradient: 'linear-gradient(150deg, #2A3A24 0%, #5A7A3A 100%)',
  },
  {
    id: 'budget-first',
    label: 'Budget over macros',
    sublabel: "Whatever's cheapest wins",
    gradient: 'linear-gradient(135deg, #33422C 0%, #212B1D 100%)',
  },
  {
    id: 'quick',
    label: 'Under 20 minutes',
    sublabel: 'In and out of the kitchen fast',
    gradient: 'linear-gradient(150deg, #212B1D 0%, #3D4F33 100%)',
  },
  {
    id: 'meal-prep',
    label: 'Meal-prep friendly',
    sublabel: 'Cook once, eat all week',
    gradient: 'linear-gradient(135deg, #2A3A24 0%, #33422C 100%)',
  },
  {
    id: 'comfort',
    label: 'Comfort food',
    sublabel: 'Warm, filling, low effort',
    gradient: 'linear-gradient(150deg, #33422C 0%, #212B1D 100%)',
  },
  {
    id: 'one-pan',
    label: 'One-pan only',
    sublabel: 'Minimal washing up',
    gradient: 'linear-gradient(135deg, #212B1D 0%, #5A7A3A 100%)',
  },
];

export const SAMPLE_DISHES: SampleDish[] = [
  {
    id: 'dish-tomato-pasta',
    name: 'One-pan tomato & garlic pasta',
    tags: ['Budget', '15 min'],
    gradient: 'linear-gradient(160deg, #33422C 0%, #5A7A3A 100%)',
  },
  {
    id: 'dish-chicken-rice',
    name: 'Peri-peri chicken & rice bowl',
    tags: ['High protein'],
    gradient: 'linear-gradient(160deg, #212B1D 0%, #3D4F33 100%)',
  },
  {
    id: 'dish-lentil-curry',
    name: 'Coconut lentil curry',
    tags: ['Vegan', 'Batch cooks'],
    gradient: 'linear-gradient(160deg, #2A3A24 0%, #5A7A3A 100%)',
  },
  {
    id: 'dish-beans-toast',
    name: 'Loaded beans on toast',
    tags: ['Under £1', '5 min'],
    gradient: 'linear-gradient(160deg, #33422C 0%, #212B1D 100%)',
  },
  {
    id: 'dish-stirfry',
    name: 'Veg & egg fried rice stir-fry',
    tags: ['Cupboard mode'],
    gradient: 'linear-gradient(160deg, #212B1D 0%, #5A7A3A 100%)',
  },
  {
    id: 'dish-tuna-pasta-bake',
    name: 'Tuna pasta bake',
    tags: ['Meal-prep friendly'],
    gradient: 'linear-gradient(160deg, #2A3A24 0%, #33422C 100%)',
  },
  {
    id: 'dish-omelette',
    name: 'Cheese & spinach omelette',
    tags: ['5 min', 'High protein'],
    gradient: 'linear-gradient(160deg, #33422C 0%, #3D4F33 100%)',
  },
  {
    id: 'dish-chilli',
    name: 'Budget beef & bean chilli',
    tags: ['Batch cooks', 'Freezes well'],
    gradient: 'linear-gradient(160deg, #212B1D 0%, #2A3A24 100%)',
  },
];

export const THIS_WEEKS_HERO_RECIPE: Recipe = {
  id: 'recipe-hero-chilli',
  title: 'Budget beef & bean chilli',
  minutes: 35,
  servings: 4,
  pricePerServing: 1.85,
  gradient: 'linear-gradient(160deg, #2A3A24 0%, #5A7A3A 100%)',
  tags: ['Batch cooks', 'Freezes well'],
};

export const SAVED_RECIPES: Recipe[] = [
  {
    id: 'recipe-tomato-pasta',
    title: 'One-pan tomato & garlic pasta',
    minutes: 15,
    servings: 2,
    pricePerServing: 0.95,
    gradient: 'linear-gradient(160deg, #33422C 0%, #5A7A3A 100%)',
    tags: ['Budget', 'Quick'],
  },
  {
    id: 'recipe-lentil-curry',
    title: 'Coconut lentil curry',
    minutes: 30,
    servings: 4,
    pricePerServing: 1.2,
    gradient: 'linear-gradient(160deg, #212B1D 0%, #3D4F33 100%)',
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
    gradient: 'linear-gradient(160deg, #33422C 0%, #212B1D 100%)',
  },
  {
    id: 'community-stirfry',
    title: 'Empty-cupboard fried rice',
    author: 'Marcus, 1st year',
    upvotes: 158,
    pricePerServing: 0.85,
    gradient: 'linear-gradient(160deg, #212B1D 0%, #5A7A3A 100%)',
  },
  {
    id: 'community-tuna-bake',
    title: 'Five-ingredient tuna pasta bake',
    author: 'Sofia, 3rd year',
    upvotes: 132,
    pricePerServing: 1.1,
    gradient: 'linear-gradient(160deg, #2A3A24 0%, #33422C 100%)',
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
