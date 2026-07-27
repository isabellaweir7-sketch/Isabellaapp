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

export interface CupboardHero {
  title: string;
  subtitle: string;
  photo: string;
  fallback: string;
  pricePerServing: number;
}

export interface FeatureTile {
  id: string;
  label: string;
  photo: string;
  fallback: string;
}
