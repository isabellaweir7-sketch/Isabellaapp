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
import ForkitBudgetAnalytics from './forkit-budget-analytics.jsx';
import ForkitShoppingMode from './forkit-shopping-mode.jsx';
import ForkitNotifications from './forkit-notifications.jsx';
import ForkitBudgetTips from './forkit-budget-tips.jsx';
import ForkitSkillLab from './forkit-skill-lab.jsx';
import ForkitFreshersMode from './forkit-freshers-mode.jsx';
import ForkitSearchResults from './forkit-search-results.jsx';
import { supabase } from './supabaseClient';
import { OnboardingAnswers, Recipe } from './types';

const ONBOARDING_KEY = 'forkit_onboarding_answers';
const FRESHERS_KEY = 'forkit_freshers_mode';

type View =
  | 'home'
  | 'saved'
  | 'plan'
  | 'pantry'
  | 'community'
  | 'household'
  | 'auth'
  | 'budget'
  | 'shopping'
  | 'notifications'
  | 'tips'
  | 'skilllab'
  | 'freshers'
  | 'search';

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
  const [freshersMode, setFreshersMode] = useState<boolean>(() => localStorage.getItem(FRESHERS_KEY) === 'true');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, openRecipe]);

  const handleOnboardingComplete = (result: OnboardingAnswers) => {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(result));
    setAnswers(result);
  };

  const handleLogOut = () => {
    supabase.auth.signOut();
  };

  const handleToggleFreshers = (value: boolean) => {
    localStorage.setItem(FRESHERS_KEY, String(value));
    setFreshersMode(value);
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
    return (
      <ForkitWeeklyPlan
        answers={answers}
        onBack={() => setView('home')}
        onOpenRecipe={setOpenRecipe}
        onOpenHousehold={() => setView('household')}
      />
    );
  }

  if (view === 'pantry') {
    return <ForkitPantry answers={answers} onBack={() => setView('home')} onOpenRecipe={setOpenRecipe} />;
  }

  if (view === 'community') {
    return (
      <ForkitCommunity
        onBack={() => setView('home')}
        onOpenRecipe={setOpenRecipe}
        onOpenTips={() => setView('tips')}
      />
    );
  }

  if (view === 'household') {
    return (
      <ForkitHousehold
        onBack={() => setView('home')}
        onOpenShopping={() => setView('shopping')}
        onOpenRecipe={setOpenRecipe}
      />
    );
  }

  if (view === 'auth') {
    return (
      <ForkitAuth
        session={session}
        answers={answers}
        freshersMode={freshersMode}
        onOpenFreshers={() => setView('freshers')}
        onBack={() => setView('home')}
        onLogOut={handleLogOut}
        onOpenHousehold={() => setView('household')}
      />
    );
  }

  if (view === 'budget') {
    return <ForkitBudgetAnalytics onBack={() => setView('home')} />;
  }

  if (view === 'shopping') {
    return <ForkitShoppingMode onBack={() => setView('household')} />;
  }

  if (view === 'notifications') {
    return <ForkitNotifications onBack={() => setView('home')} />;
  }

  if (view === 'tips') {
    return <ForkitBudgetTips onBack={() => setView('community')} />;
  }

  if (view === 'skilllab') {
    return <ForkitSkillLab onBack={() => setView('home')} />;
  }

  if (view === 'freshers') {
    return (
      <ForkitFreshersMode
        enabled={freshersMode}
        onToggle={handleToggleFreshers}
        onBack={() => setView('auth')}
      />
    );
  }

  if (view === 'search') {
    return (
      <ForkitSearchResults
        initialQuery={searchQuery}
        onBack={() => setView('home')}
        onOpenRecipe={setOpenRecipe}
        onOpenHousehold={() => setView('household')}
      />
    );
  }

  return (
    <ForkitHome
      answers={answers}
      onOpenRecipe={setOpenRecipe}
      onOpenSaved={() => setView('saved')}
      onOpenPlan={() => setView('plan')}
      onOpenPantry={() => setView('pantry')}
      onOpenCommunity={() => setView('community')}
      onOpenHousehold={() => setView('household')}
      onOpenAuth={() => setView('auth')}
      onOpenNotifications={() => setView('notifications')}
      onOpenBudget={() => setView('budget')}
      onOpenSkillLab={() => setView('skilllab')}
      onOpenSearch={(query: string) => {
        setSearchQuery(query);
        setView('search');
      }}
      session={session}
    />
  );
}
