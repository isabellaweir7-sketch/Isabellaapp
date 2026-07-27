import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import ForkitOnboarding from './forkit-onboarding.jsx';
import ForkitHome from './forkit-home-mockup.jsx';
import ForkitRecipeDetail from './forkit-recipe-detail.jsx';
import ForkitSavedRecipes from './forkit-saved-recipes.jsx';
import ForkitWeeklyPlan from './forkit-weekly-plan.jsx';
import ForkitPantry from './forkit-pantry.jsx';
import ForkitCommunity from './forkit-community.jsx';
import ForkitHousehold from './forkit-household.jsx';
import ForkitAuth from './forkit-auth.jsx';
import { supabase } from './supabaseClient';
import { OnboardingAnswers, Recipe } from './types';

const ONBOARDING_KEY = 'forkit_onboarding_answers';

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
  const [session, setSession] = useState<Session | null>(null);
  const [view, setView] = useState<View>('home');
  const [openRecipe, setOpenRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleOnboardingComplete = (result: OnboardingAnswers) => {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(result));
    setAnswers(result);
  };

  const handleLogOut = () => {
    supabase.auth.signOut();
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
    return <ForkitAuth session={session} onBack={() => setView('home')} onLogOut={handleLogOut} />;
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
