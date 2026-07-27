import React, { useState } from 'react';
import ForkitOnboarding from './forkit-onboarding.jsx';
import ForkitHome from './forkit-home-mockup.jsx';
import ForkitRecipeDetail from './forkit-recipe-detail.jsx';
import ForkitSavedRecipes from './forkit-saved-recipes.jsx';
import ForkitWeeklyPlan from './forkit-weekly-plan.jsx';
import ForkitPantry from './forkit-pantry.jsx';
import ForkitCommunity from './forkit-community.jsx';
import ForkitHousehold from './forkit-household.jsx';
import ForkitAuth from './forkit-auth.jsx';
import { OnboardingAnswers, Recipe, Session } from './types';

const ONBOARDING_KEY = 'forkit_onboarding_answers';
const SESSION_KEY = 'forkit_session';

type View = 'home' | 'saved' | 'plan' | 'pantry' | 'community' | 'household' | 'auth';

function readJSON<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function App() {
  const [answers, setAnswers] = useState<OnboardingAnswers | null>(() => readJSON(ONBOARDING_KEY));
  const [session, setSession] = useState<Session | null>(() => readJSON(SESSION_KEY));
  const [view, setView] = useState<View>('home');
  const [openRecipe, setOpenRecipe] = useState<Recipe | null>(null);

  const handleOnboardingComplete = (result: OnboardingAnswers) => {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(result));
    setAnswers(result);
  };

  const handleSignedIn = (result: Session) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(result));
    setSession(result);
  };

  const handleLogOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
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

  if (view === 'community') {
    return <ForkitCommunity onBack={() => setView('home')} onOpenRecipe={setOpenRecipe} />;
  }

  if (view === 'household') {
    return <ForkitHousehold onBack={() => setView('home')} />;
  }

  if (view === 'auth') {
    return (
      <ForkitAuth
        session={session}
        onBack={() => setView('home')}
        onSignedIn={handleSignedIn}
        onLogOut={handleLogOut}
      />
    );
  }

  return (
    <ForkitHome
      onOpenRecipe={setOpenRecipe}
      onOpenSaved={() => setView('saved')}
      onOpenPlan={() => setView('plan')}
      onOpenPantry={() => setView('pantry')}
      onOpenCommunity={() => setView('community')}
      onOpenHousehold={() => setView('household')}
      onOpenAuth={() => setView('auth')}
      session={session}
    />
  );
}
