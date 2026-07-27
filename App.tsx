import React, { useState } from 'react';
import ForkitOnboarding from './forkit-onboarding.jsx';
import ForkitHome from './forkit-home-mockup.jsx';
import ForkitRecipeDetail from './forkit-recipe-detail.jsx';
import { OnboardingAnswers, CupboardHero } from './types';

const STORAGE_KEY = 'forkit_onboarding_answers';

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
  const [openRecipe, setOpenRecipe] = useState<CupboardHero | null>(null);

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

  return <ForkitHome onOpenRecipe={setOpenRecipe} />;
}
