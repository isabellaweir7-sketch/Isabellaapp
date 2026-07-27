import React, { useState } from 'react';
import ForkitOnboarding from './forkit-onboarding.jsx';
import ForkitHome from './forkit-home-mockup.jsx';
import ForkitRecipeDetail from './forkit-recipe-detail.jsx';
import ForkitSavedRecipes from './forkit-saved-recipes.jsx';
import ForkitWeeklyPlan from './forkit-weekly-plan.jsx';
import ForkitPantry from './forkit-pantry.jsx';
import { OnboardingAnswers, Recipe } from './types';

const STORAGE_KEY = 'forkit_onboarding_answers';

type View = 'home' | 'saved' | 'plan' | 'pantry';

export default function App() {
  const [answers, setAnswers] = useState<OnboardingAnswers | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });
  const [view, setView] = useState<View>('home');
  const [openRecipe, setOpenRecipe] = useState<Recipe | null>(null);

  const handleOnboardingComplete = (result: OnboardingAnswers) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    setAnswers(result);
  };

  if (!answers) {
    return <ForkitOnboarding onComplete={handleOnboardingComplete} />;
  }

  if (openRecipe) {
    return <ForkitRecipeDetail recipe={openRecipe} onBack={() => setOpenRecipe(null)} />;
  }

  if (view === 'saved') {
    return <ForkitSavedRecipes onBack={() => setView('home')} onOpenRecipe={setOpenRecipe} />;
  }

  if (view === 'plan') {
    return <ForkitWeeklyPlan onBack={() => setView('home')} onOpenRecipe={setOpenRecipe} />;
  }

  if (view === 'pantry') {
    return <ForkitPantry onBack={() => setView('home')} onOpenRecipe={setOpenRecipe} />;
  }

  return (
    <ForkitHome
      onOpenRecipe={setOpenRecipe}
      onOpenSaved={() => setView('saved')}
      onOpenPlan={() => setView('plan')}
      onOpenPantry={() => setView('pantry')}
    />
  );
}
