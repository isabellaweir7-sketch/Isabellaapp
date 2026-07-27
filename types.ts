export interface OnboardingReason {
  id: string;
  label: string;
}

export interface DietaryRestriction {
  id: string;
  label: string;
}

export interface MealWant {
  id: string;
  label: string;
  sublabel: string;
  gradient: string;
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
  mealWants: string[];
  likedDishes: string[];
  dislikedDishes: string[];
}

export interface Recipe {
  id: string;
  title: string;
  minutes: number;
  servings: number;
  pricePerServing: number;
  photo: string;
  fallback: string;
  tags: string[];
}

export interface HouseholdMember {
  id: string;
  name: string;
  initials: string;
  cookingNight: string | null;
}

export interface CommunityRecipe {
  id: string;
  title: string;
  author: string;
  upvotes: number;
  pricePerServing: number;
  photo: string;
  fallback: string;
}
