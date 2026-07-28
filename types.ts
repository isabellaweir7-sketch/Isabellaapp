export interface OnboardingReason {
  id: string;
  label: string;
}

export interface DietaryRestriction {
  id: string;
  label: string;
}

export interface DietaryFlags {
  vegan: boolean;
  vegetarian: boolean;
  pescatarian: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  halal: boolean;
  kosher: boolean;
  nutFree: boolean;
}

// The signals gathered during onboarding that shape recommendations beyond
// hard dietary/allergy filtering: which nutrition goals were picked, and
// which recipes were liked/disliked in the taste-swipe step.
export interface TasteProfile {
  nutritionGoals: string[];
  likedDishes: string[];
  dislikedDishes: string[];
}

export interface OnboardingAnswers {
  allergies: string[];
  reasons: string[];
  restrictions: string[];
  nutritionGoals: string[];
  macros: { protein: number; carbs: number; fat: number };
  likedDishes: string[];
  dislikedDishes: string[];
  equipment: string[];
  studentStatus: string;
  school: string;
  accommodation: string;
}

export interface EquipmentItem {
  id: string;
  label: string;
}

export interface Technique {
  id: string;
  name: string;
  durationLabel: string;
  photo: string;
  fallback: string;
}

export interface SkillLevel {
  id: string;
  name: string;
  requirement: string;
}

export interface ProTip {
  id: string;
  title: string;
  excerpt: string;
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
  preservationTip?: string;
  dietary: DietaryFlags;
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
