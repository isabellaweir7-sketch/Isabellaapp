import React, { useState } from 'react';
import { Home as HomeIcon, ShoppingBasket, ChefHat, Users, Bell, User, ChevronRight, Timer, Banknote, Sparkles } from 'lucide-react';
import { CUPBOARD_HERO, TODAY_MEALS, COMMUNITY_RECIPES, WEEKLY_BUDGET, SHOPPING_LIST } from './mockData';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'pantry', label: 'Pantry', icon: ShoppingBasket },
  { id: 'recipes', label: 'Recipes', icon: ChefHat },
  { id: 'community', label: 'Community', icon: Users },
];

function Header({ onOpenAuth, onOpenNotifications, session }) {
  return (
    <header className="bg-surface sticky top-0 z-40 w-full">
      <div className="flex items-center justify-between px-5 py-4 max-w-3xl mx-auto">
        <button
          type="button"
          onClick={onOpenAuth}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-surface-container-high border border-outline-variant text-primary font-display overflow-hidden"
          aria-label="Account"
        >
          {session ? session.user.email.trim()[0]?.toUpperCase() : <User size={18} />}
        </button>
        <h1 className="font-display text-2xl text-primary">ForkIt</h1>
        <button type="button" onClick={onOpenNotifications} className="text-primary hover:opacity-70 transition-opacity" aria-label="Notifications">
          <Bell size={22} />
        </button>
      </div>
    </header>
  );
}

function TodayPlan({ onOpenPlan, onOpenRecipe }) {
  return (
    <section>
      <div className="flex items-end justify-between mb-3">
        <h2 className="font-display text-xl text-primary">Today's Plan</h2>
        <button type="button" onClick={onOpenPlan} className="text-xs font-semibold text-secondary">
          View Week
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TODAY_MEALS.map(({ slot, recipe }) => (
          <button
            key={slot}
            type="button"
            onClick={() => onOpenRecipe(recipe)}
            className="text-left group"
          >
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-xl mb-2"
              style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <span className="chip-value absolute top-3 left-3">{slot}</span>
            </div>
            <h3 className="font-display text-base text-on-background leading-tight">{recipe.title}</h3>
            <div className="flex items-center gap-3 mt-1 text-xs font-medium text-on-surface-variant">
              <span className="flex items-center gap-1">
                <Timer size={14} /> {recipe.prepMinutes ?? 15}m
              </span>
              <span className="flex items-center gap-1">
                <Banknote size={14} /> £{recipe.pricePerServing.toFixed(2)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function CupboardBudgetRow({ onOpenPantry, onOpenBudget }) {
  const remaining = WEEKLY_BUDGET.target - WEEKLY_BUDGET.spent;
  const pct = Math.min(100, Math.round((WEEKLY_BUDGET.spent / WEEKLY_BUDGET.target) * 100));

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
      <div className="bg-primary-container text-on-primary p-6 rounded-xl flex flex-col justify-between soft-shadow min-h-[260px]">
        <div>
          <span className="block mb-2 text-xs font-semibold uppercase tracking-widest text-on-primary-container">
            From your cupboard
          </span>
          <h2 className="font-display text-2xl mb-2 leading-tight">Cupboard Cooker</h2>
          <p className="text-sm opacity-90 max-w-sm">
            Tell us what's left in your kitchen and we'll turn it into a recipe. No waste, just taste.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenPantry}
          className="chip-value mt-6 w-fit press-effect flex items-center gap-1"
        >
          <Sparkles size={14} /> Cook with what you have
        </button>
      </div>

      <button
        type="button"
        onClick={onOpenBudget}
        className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between border border-outline-variant text-left"
      >
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-display text-lg text-primary">This Week's Budget</h2>
            <span className="font-display text-lg text-primary">
              £{remaining.toFixed(0)} <small className="text-xs font-body opacity-60">left</small>
            </span>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full rounded-full overflow-hidden bg-primary">
              <div className="h-full rounded-full bg-tertiary-fixed" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wide text-outline">
              <span>Spent: £{WEEKLY_BUDGET.spent.toFixed(2)}</span>
              <span>Budget: £{WEEKLY_BUDGET.target.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="mt-6 tonal-layer p-3 rounded-lg">
          <p className="text-sm italic leading-relaxed text-on-surface-variant">
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
      <div className="flex items-end justify-between mb-3">
        <h2 className="font-display text-xl text-primary">Trending on Campus</h2>
        <button type="button" onClick={onOpenCommunity} className="text-outline" aria-label="See all">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
        {trending.map((recipe) => (
          <button
            key={recipe.id}
            type="button"
            onClick={() => onOpenRecipe(recipe)}
            className="flex-shrink-0 w-56 text-left"
          >
            <div
              className="relative h-40 overflow-hidden rounded-lg mb-2"
              style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <h4 className="font-semibold text-sm text-primary truncate">{recipe.title}</h4>
            <p className="text-xs text-outline">@{recipe.author?.split(',')[0].toLowerCase()} • {recipe.upvotes} saves</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function HouseholdCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 flex items-center justify-between text-left"
    >
      <div className="min-w-0">
        <p className="font-display text-lg leading-tight text-primary">Household</p>
        <p className="text-xs font-semibold mt-1 text-on-surface-variant">
          Dan's cooking tonight · {SHOPPING_LIST.length} items on the shared list
        </p>
      </div>
      <ChevronRight size={18} className="text-secondary" />
    </button>
  );
}

function BottomNav({ active, onChange, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 bg-surface border-t border-outline-variant">
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
            className={`flex items-center justify-center rounded-full transition-colors ${
              isActive ? 'bg-primary text-on-primary w-12 h-12' : 'text-primary-container opacity-40 w-12 h-12'
            }`}
            aria-label={label}
          >
            <Icon size={20} />
          </button>
        );
      })}
    </nav>
  );
}

export default function ForkitHome({
  onOpenRecipe,
  onOpenSaved,
  onOpenPlan,
  onOpenPantry,
  onOpenCommunity,
  onOpenHousehold,
  onOpenAuth,
  onOpenNotifications,
  onOpenBudget,
  session,
}) {
  const [activeTab, setActiveTab] = useState('home');

  const handleNavTap = (id) => {
    if (id === 'pantry') onOpenPantry();
    if (id === 'recipes') onOpenSaved();
    if (id === 'community') onOpenCommunity();
  };

  return (
    <div className="min-h-screen pb-28 bg-surface">
      <Header onOpenAuth={onOpenAuth} onOpenNotifications={onOpenNotifications} session={session} />
      <div className="px-5 pt-6 max-w-3xl mx-auto flex flex-col gap-8">
        <TodayPlan onOpenPlan={onOpenPlan} onOpenRecipe={onOpenRecipe} />
        <CupboardBudgetRow onOpenPantry={onOpenPantry} onOpenBudget={onOpenBudget} />
        <Trending onOpenCommunity={onOpenCommunity} onOpenRecipe={onOpenRecipe} />
        <HouseholdCard onClick={onOpenHousehold} />
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} onNavigate={handleNavTap} />
    </div>
  );
}
