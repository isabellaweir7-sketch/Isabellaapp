import React, { useState } from 'react';
import { Home as HomeIcon, ChefHat, BookOpen, Users, Bell, User, Timer, Banknote, ArrowRight, GraduationCap, Search, Building2 } from 'lucide-react';
import { COMMUNITY_RECIPES, WEEKLY_BUDGET, generateTodayMeals } from './mockData';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'pantry', label: 'Pantry', icon: ChefHat },
  { id: 'recipes', label: 'Recipes', icon: BookOpen },
  { id: 'skilllab', label: 'Academy', icon: GraduationCap },
  { id: 'community', label: 'Community', icon: Users },
];

export function HouseholdHeaderButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors shrink-0"
      aria-label="Household"
    >
      <Building2 size={18} />
    </button>
  );
}

function Header({ onOpenAuth, onOpenNotifications, onOpenHousehold, session }) {
  return (
    <header className="bg-surface sticky top-0 z-40 w-full">
      <div className="relative flex items-center justify-between px-gutter py-sm w-full max-w-[1200px] mx-auto">
        <div className="flex items-center gap-xs">
          <button
            type="button"
            onClick={onOpenAuth}
            className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant flex items-center justify-center text-sm font-semibold font-display text-primary"
            aria-label="Account"
          >
            {session ? session.user.email.trim()[0]?.toUpperCase() : <User size={20} />}
          </button>
          <HouseholdHeaderButton onClick={onOpenHousehold} />
        </div>
        <h1 className="absolute left-1/2 -translate-x-1/2 font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-primary">
          ForkIt
        </h1>
        <button type="button" onClick={onOpenNotifications} className="text-primary" aria-label="Notifications">
          <Bell size={24} />
        </button>
      </div>
    </header>
  );
}

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="px-gutter pb-md bg-surface border-b border-outline-variant">
      <div className="max-w-[1200px] mx-auto relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-60" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes, ingredients, or people..."
          className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pl-12 pr-4 text-base text-on-surface-variant outline-none focus:border-primary transition-colors"
        />
      </div>
    </form>
  );
}

function TodayPlan({ meals, onOpenPlan, onOpenRecipe }) {
  return (
    <section>
      <div className="flex items-end justify-between mb-md">
        <h2 className="font-display text-2xl font-semibold text-primary">Today's Plan</h2>
        <button type="button" onClick={onOpenPlan} className="text-sm font-semibold tracking-wider text-secondary cursor-pointer">
          View Week
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        {meals.map(({ slot, recipe }) => (
          <div key={slot} className="group cursor-pointer" onClick={() => onOpenRecipe(recipe)}>
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-xl mb-xs"
              style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute top-4 left-4 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                {slot}
              </div>
            </div>
            <div className="space-y-base">
              <h3 className="font-display text-lg text-on-background leading-tight">{recipe.title}</h3>
              <div className="flex items-center gap-md text-base text-on-surface-variant opacity-80">
                <span className="flex items-center gap-1">
                  <Timer size={18} /> {recipe.prepMinutes ?? 15}m
                </span>
                <span className="flex items-center gap-1">
                  <Banknote size={18} /> £{recipe.pricePerServing.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BudgetRow({ onOpenBudget }) {
  const remaining = WEEKLY_BUDGET.target - WEEKLY_BUDGET.spent;
  const pct = Math.min(100, Math.round((WEEKLY_BUDGET.spent / WEEKLY_BUDGET.target) * 100));

  return (
    <section>
      <button
        type="button"
        onClick={onOpenBudget}
        className="w-full bg-surface-container-low p-lg rounded-xl flex flex-col justify-between border border-outline-variant text-left"
      >
        <div>
          <div className="flex justify-between items-center mb-md">
            <h2 className="font-display text-2xl font-semibold text-primary">This Week's Budget</h2>
            <span className="font-display text-2xl font-semibold text-primary">
              £{remaining.toFixed(0)} <small className="text-xs opacity-60 font-body">left</small>
            </span>
          </div>
          <div className="space-y-sm">
            <div className="h-2 w-full rounded-full overflow-hidden bg-primary">
              <div className="h-full rounded-full bg-tertiary-fixed" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex justify-between text-xs font-semibold tracking-wider text-outline uppercase">
              <span>Spent: £{WEEKLY_BUDGET.spent.toFixed(2)}</span>
              <span>Budget: £{WEEKLY_BUDGET.target.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="mt-xl tonal-layer p-md rounded-lg">
          <p className="text-base text-on-surface-variant italic leading-relaxed">
            You're under your average spend this week. Nice work.
          </p>
        </div>
      </button>
    </section>
  );
}

function Trending({ onOpenCommunity, onOpenRecipe }) {
  const trending = [...COMMUNITY_RECIPES].sort((a, b) => (b.upvotes ?? 0) - (a.upvotes ?? 0));
  return (
    <section>
      <div className="flex items-end justify-between mb-md">
        <h2 className="font-display text-2xl font-semibold text-primary">Trending on Campus</h2>
        <button type="button" onClick={onOpenCommunity} className="text-outline cursor-pointer" aria-label="See all">
          <ArrowRight size={22} />
        </button>
      </div>
      <div className="flex gap-md overflow-x-auto no-scrollbar pb-sm -mx-gutter px-gutter">
        {trending.map((recipe) => (
          <div key={recipe.id} className="flex-shrink-0 w-64 group cursor-pointer" onClick={() => onOpenRecipe(recipe)}>
            <div
              className="relative h-48 overflow-hidden rounded-lg mb-xs"
              style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <h4 className="text-base font-semibold tracking-wider text-primary truncate">{recipe.title}</h4>
            <p className="text-xs font-medium text-outline">
              @{recipe.author?.split(',')[0].toLowerCase()} • {recipe.upvotes} saves
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BottomNav({ active, onChange, onNavigate }) {
  return (
    <nav className="fixed bottom-0 w-full z-50 bg-surface flex justify-between items-center px-lg py-md border-t border-outline-variant">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => {
              onChange(id);
              onNavigate(id);
            }}
            className={`flex flex-col items-center justify-center transition-transform active:scale-90 duration-200 ${
              isActive
                ? 'bg-primary text-on-primary rounded-full w-12 h-12'
                : 'text-primary-container opacity-40 hover:bg-primary-container hover:text-on-primary-container transition-colors p-2 rounded-full'
            }`}
            aria-label={label}
          >
            <Icon size={22} />
          </button>
        );
      })}
    </nav>
  );
}

export default function ForkitHome({
  answers,
  onOpenRecipe,
  onOpenSaved,
  onOpenPlan,
  onOpenPantry,
  onOpenCommunity,
  onOpenHousehold,
  onOpenAuth,
  onOpenNotifications,
  onOpenBudget,
  onOpenSkillLab,
  onOpenSearch,
  session,
}) {
  const [activeTab, setActiveTab] = useState('home');
  const todayMeals = generateTodayMeals(answers?.restrictions ?? [], answers?.allergies ?? [], answers?.equipment ?? [], {
    nutritionGoals: answers?.nutritionGoals ?? [],
    likedDishes: answers?.likedDishes ?? [],
    dislikedDishes: answers?.dislikedDishes ?? [],
    macroPriority: answers?.macros,
  });

  const handleNavTap = (id) => {
    if (id === 'pantry') onOpenPantry();
    if (id === 'recipes') onOpenSaved();
    if (id === 'community') onOpenCommunity();
    if (id === 'skilllab') onOpenSkillLab();
  };

  return (
    <div className="bg-surface min-h-screen pb-32">
      <Header onOpenAuth={onOpenAuth} onOpenNotifications={onOpenNotifications} onOpenHousehold={onOpenHousehold} session={session} />
      <SearchBar onSearch={onOpenSearch} />
      <main className="max-w-[1200px] mx-auto px-gutter py-md space-y-xl">
        <TodayPlan meals={todayMeals} onOpenPlan={onOpenPlan} onOpenRecipe={onOpenRecipe} />
        <BudgetRow onOpenBudget={onOpenBudget} />
        <Trending onOpenCommunity={onOpenCommunity} onOpenRecipe={onOpenRecipe} />
      </main>
      <BottomNav active={activeTab} onChange={setActiveTab} onNavigate={handleNavTap} />
    </div>
  );
}
