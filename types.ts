export interface OnboardingReason {
  id: string;
  label: string;
}

export interface DietaryRestriction {
  id: string;
  label: string;
}

export interface SampleDish {
  id: string;
  name: string;
  tags: string[];
  photo: string;
  fallback: string;
}

export interface OnboardingAnswers {
  reasons: string[];
  restrictions: string[];
  nutritionGoals: string[];
  macros: { protein: number; carbs: number; fat: number };
  likedDishes: string[];
  dislikedDishes: string[];
}

export interface Ingredient {
  name: string;
  qtyPerServing: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle?: string;
  photo: string;
  fallback: string;
  pricePerServing: number;
  prepMinutes?: number;
  tags: string[];
  baseServings: number;
  ingredients: Ingredient[];
  steps: string[];
  author?: string;
  upvotes?: number;
}

export interface TodayMeal {
  slot: string;
  recipe: Recipe;
}

export interface NotificationItem {
  id: string;
  group: string;
  title: string;
  detail: string;
  time: string;
}

export interface BudgetTip {
  id: string;
  title: string;
  excerpt: string;
  photo: string;
  fallback: string;
}

export interface ShoppingAisle {
  name: string;
  items: ShoppingListItem[];
}

export interface FeatureTile {
  id: string;
  label: string;
  photo: string;
  fallback: string;
}

export interface DayPlan {
  day: string;
  recipe: Recipe;
}

export interface HouseholdMember {
  id: string;
  name: string;
  initials: string;
}

export interface CookingNight {
  day: string;
  memberId: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  price: number;
  addedBy: string;
  aisle: string;
}
