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
  // The onboarding "Priority Tuning" sliders (0-100 each, independent —
  // not required to sum to 100). Relative weights, not literal gram targets:
  // scoring compares them against each recipe's real calorie-share split.
  macroPriority?: { protein: number; carbs: number; fat: number };
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
  // Real YouTube video ID (the part after ?v=) embedded inline via the
  // standard YouTube embed player — not an AI-generated or stock clip.
  youtubeId: string;
  youtubeChannel: string;
}

// A recipe's own difficulty — separate from SKILL_LEVELS below, which
// tracks the student's overall progress across the whole app. 'Easy' needs
// no technique beyond basic chopping; 'Advanced' is where Skill Lab's
// technique videos actually help, so Recipe Detail surfaces them there.
export type RecipeSkillLevel = 'Easy' | 'Intermediate' | 'Advanced';

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

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Required by the Unsplash API Guidelines whenever a photo sourced through
// the API is displayed: credit to the photographer (linked to their
// Unsplash profile) and to Unsplash itself. Optional because the current
// stock photos were hand-picked before this existed and have no photographer
// record — PhotoCredit renders nothing until this is populated.
export interface PhotoCredit {
  photographerName: string;
  photographerUsername: string;
  photoPageUrl: string;
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
  macros: Macros;
  photoCredit?: PhotoCredit;
  // Equipment ids (matching EquipmentItem) actually needed to cook this,
  // inferred from its real steps — e.g. a traybake needs 'oven', a smoothie
  // needs only 'blender'. Almost everything needs 'hob' at minimum unless
  // it's oven-only, no-cook, or a single-appliance dish.
  equipment: string[];
  // Only set on oven recipes that are dry, individually-sized, crisp-finish
  // dishes (chips, wings, skewers, breaded bites) that genuinely also work
  // in an air fryer basket. Traybakes, bakes with sauce, pies, casseroles,
  // and anything cooked as one big tray of liquid/components are NOT marked
  // — those don't fit or cook the same way in a small air fryer basket.
  airFryerAdaptable?: boolean;
  // How fiddly this recipe actually is to cook, inferred from prep time and
  // step count — not the student's own skill rank (see SKILL_LEVELS).
  skillLevel: RecipeSkillLevel;
  // Technique ids (matching Technique) this recipe's steps genuinely call
  // for — e.g. a recipe that deglazes the pan links 'technique-deglaze'.
  // Recipe Detail only surfaces the technique video section for Advanced
  // recipes, so this is empty on Easy/Intermediate ones even if detected.
  relatedTechniques: string[];
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
  // Set when Leftover Mode picked this recipe specifically because it shares
  // a perishable ingredient with the day before (e.g. 'broccoli') — lets the
  // UI show a small "uses up yesterday's..." hint instead of staying silent.
  usesLeftoverFrom?: string;
}

export interface HouseholdMember {
  id: string;
  name: string;
  initials: string;
}

export interface CookingNight {
  day: string;
  memberId: string;
  takeaway?: boolean;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  price: number;
  addedBy: string;
  aisle: string;
  urgent?: boolean;
  inCart?: boolean;
}

export interface PantryStatus {
  updatedByMemberId: string;
  hoursAgo: number;
  lowItemCount: number;
}
