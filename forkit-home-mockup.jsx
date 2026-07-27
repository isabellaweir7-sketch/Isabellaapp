import React, { useState } from 'react';
import {
  Home as HomeIcon,
  CalendarDays,
  Package,
  Users,
  ChefHat,
  ArrowUpRight,
  ThumbsUp,
  Wallet,
} from 'lucide-react';
import {
  THIS_WEEKS_HERO_RECIPE,
  SAVED_RECIPES,
  COMMUNITY_RECIPES,
  HOUSEHOLD_MEMBERS,
  WEEKLY_BUDGET,
} from './mockData';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'plan', label: 'Plan', icon: CalendarDays },
  { id: 'cupboard', label: 'Cupboard', icon: Package },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'household', label: 'Household', icon: ChefHat },
];

function ProfileBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-8 pb-5">
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-sm border-2"
          style={{ backgroundColor: '#212B1D', borderColor: '#5A7A3A', color: '#9ACB4B' }}
        >
          IW
        </div>
        <div>
          <p className="font-display font-extrabold text-lg leading-none">Hey, Isabella</p>
          <p className="text-xs font-semibold mt-1" style={{ color: '#8FA087' }}>
            Thursday · Week 3
          </p>
        </div>
      </div>
      <div className="receipt-tag">
        £{WEEKLY_BUDGET.spent.toFixed(2)}
        <span style={{ color: '#8FA087' }}>/£{WEEKLY_BUDGET.target.toFixed(2)}</span>
      </div>
    </div>
  );
}

function HeroCard() {
  const recipe = THIS_WEEKS_HERO_RECIPE;
  return (
    <div
      className="grain relative overflow-hidden rounded-3xl p-5 flex flex-col justify-end h-52 border"
      style={{ background: recipe.gradient, borderColor: '#33422C' }}
    >
      <span
        className="absolute top-4 left-4 text-xs font-bold font-mono uppercase tracking-wide px-2.5 py-1 rounded-full"
        style={{ backgroundColor: 'rgba(22,29,20,0.55)', color: '#F2E9DC' }}
      >
        This week's plan
      </span>
      <div className="flex gap-1.5 mb-2">
        {recipe.tags.map((t) => (
          <span key={t} className="receipt-tag">
            {t}
          </span>
        ))}
      </div>
      <h2 className="font-display font-extrabold text-2xl leading-tight mb-2 max-w-[80%]" style={{ color: '#F2E9DC' }}>
        {recipe.title}
      </h2>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs" style={{ color: '#F2E9DC' }}>
          {recipe.minutes} min · serves {recipe.servings}
        </span>
        <span className="receipt-tag">£{recipe.pricePerServing.toFixed(2)}/serving</span>
      </div>
    </div>
  );
}

function CupboardCard() {
  return (
    <div
      className="grain relative overflow-hidden rounded-2xl p-4 h-40 flex flex-col justify-between border"
      style={{ background: 'linear-gradient(150deg, #212B1D 0%, #3D4F33 100%)', borderColor: '#33422C' }}
    >
      <Package size={20} color="#9ACB4B" />
      <div>
        <p className="font-display font-bold text-base leading-tight">What's in your cupboard?</p>
        <p className="text-xs font-medium mt-1" style={{ color: '#8FA087' }}>
          Generate from what you already have
        </p>
      </div>
    </div>
  );
}

function SavedRecipesCard() {
  return (
    <div className="rounded-2xl p-4 h-40 border flex flex-col gap-2" style={{ backgroundColor: '#212B1D', borderColor: '#33422C' }}>
      <p className="font-display font-bold text-sm">Saved recipes</p>
      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        {SAVED_RECIPES.map((r) => (
          <div key={r.id} className="flex items-center gap-2">
            <div className="grain w-8 h-8 rounded-lg shrink-0" style={{ background: r.gradient }} />
            <p className="text-xs font-semibold truncate flex-1">{r.title}</p>
            <span className="font-mono text-[10px]" style={{ color: '#9ACB4B' }}>
              £{r.pricePerServing.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunityCard() {
  return (
    <div className="rounded-2xl p-4 border" style={{ backgroundColor: '#212B1D', borderColor: '#33422C' }}>
      <div className="flex items-center justify-between mb-3">
        <p className="font-display font-bold text-sm">Community picks this week</p>
        <ArrowUpRight size={16} color="#8FA087" />
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {COMMUNITY_RECIPES.map((r) => (
          <div key={r.id} className="grain relative rounded-xl w-32 h-28 shrink-0 p-3 flex flex-col justify-end" style={{ background: r.gradient }}>
            <p className="font-display font-bold text-xs leading-tight mb-1" style={{ color: '#F2E9DC' }}>
              {r.title}
            </p>
            <div className="flex items-center gap-1">
              <ThumbsUp size={10} color="#9ACB4B" />
              <span className="font-mono text-[10px]" style={{ color: '#9ACB4B' }}>
                {r.upvotes}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] font-medium mt-2" style={{ color: '#8FA087' }}>
        {COMMUNITY_RECIPES[0].author} and others · student-submitted
      </p>
    </div>
  );
}

function HouseholdCard() {
  return (
    <div className="rounded-2xl p-4 border flex flex-col gap-3" style={{ backgroundColor: '#212B1D', borderColor: '#33422C' }}>
      <div className="flex items-center justify-between">
        <p className="font-display font-bold text-sm">Cooking tonight</p>
        <Users size={16} color="#8FA087" />
      </div>
      <div className="flex -space-x-2">
        {HOUSEHOLD_MEMBERS.map((m) => (
          <div
            key={m.id}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2"
            style={{
              backgroundColor: m.cookingNight === 'Tonight' ? '#9ACB4B' : '#161D14',
              borderColor: '#212B1D',
              color: m.cookingNight === 'Tonight' ? '#161D14' : '#F2E9DC',
            }}
            title={m.name}
          >
            {m.initials}
          </div>
        ))}
      </div>
      <p className="text-xs font-semibold" style={{ color: '#8FA087' }}>
        Freya's on shopping-list duty this week
      </p>
    </div>
  );
}

function BudgetCard() {
  const pct = Math.min(100, (WEEKLY_BUDGET.spent / WEEKLY_BUDGET.target) * 100);
  return (
    <div className="rounded-2xl p-4 border flex flex-col gap-3" style={{ backgroundColor: '#212B1D', borderColor: '#33422C' }}>
      <div className="flex items-center justify-between">
        <p className="font-display font-bold text-sm">Weekly budget</p>
        <Wallet size={16} color="#8FA087" />
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#161D14' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: '#9ACB4B' }} />
      </div>
      <div className="flex items-baseline justify-between font-mono">
        <span className="text-lg font-bold" style={{ color: '#F2E9DC' }}>
          £{WEEKLY_BUDGET.spent.toFixed(2)}
        </span>
        <span className="text-xs" style={{ color: '#8FA087' }}>
          of £{WEEKLY_BUDGET.target.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function BottomNav({ active, onChange }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-2 py-3 border-t"
      style={{ backgroundColor: '#161D14', borderColor: '#33422C' }}
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className="flex flex-col items-center gap-1 px-2"
          >
            <Icon size={20} color={isActive ? '#9ACB4B' : '#8FA087'} />
            <span
              className="text-[10px] font-semibold"
              style={{ color: isActive ? '#9ACB4B' : '#8FA087' }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function ForkitHome() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#161D14', color: '#F2E9DC' }}>
      <ProfileBar />
      <div className="px-5 flex flex-col gap-3">
        <HeroCard />
        <div className="grid grid-cols-2 gap-3">
          <CupboardCard />
          <SavedRecipesCard />
        </div>
        <CommunityCard />
        <div className="grid grid-cols-2 gap-3">
          <HouseholdCard />
          <BudgetCard />
        </div>
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
