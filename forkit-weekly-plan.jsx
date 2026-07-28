import React from 'react';
import { ChevronLeft, Zap, Wallet } from 'lucide-react';
import { WEEKLY_PLAN, WEEKLY_BUDGET } from './mockData';

function EmptyPlan({ onBack }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-xl text-primary">Grocery List</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
        <h2 className="font-display text-2xl text-primary">A week of effortless eating starts here</h2>
        <p className="text-sm text-on-surface-variant max-w-sm">
          Generate a plan and we'll pick a recipe for every day, budget included.
        </p>
        <button type="button" className="bg-primary text-on-primary font-semibold px-6 py-3 rounded-xl">
          Generate First Plan
        </button>
      </main>
    </div>
  );
}

export default function ForkitWeeklyPlan({ onBack, onOpenRecipe }) {
  if (WEEKLY_PLAN.length === 0) return <EmptyPlan onBack={onBack} />;

  const remaining = WEEKLY_BUDGET.target - WEEKLY_BUDGET.spent;
  const pct = Math.min(100, Math.round((WEEKLY_BUDGET.spent / WEEKLY_BUDGET.target) * 100));

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-xl text-primary">This Week's Plan</h1>
      </header>

      <div className="flex-1 px-5 pb-8 max-w-2xl mx-auto w-full flex flex-col gap-6">
        <div className="flex overflow-x-auto no-scrollbar gap-2 py-1">
          {WEEKLY_PLAN.map(({ day }, i) => (
            <div
              key={day}
              className={`flex flex-col items-center justify-center min-w-[52px] py-3 rounded-xl ${
                i === 0 ? 'bg-primary text-on-primary' : 'bg-surface-container border border-outline-variant/40 text-on-surface-variant'
              }`}
            >
              <span className="text-[10px] uppercase">{day.slice(0, 3)}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {WEEKLY_PLAN.map(({ day, recipe }) => (
            <div key={day}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1.5 text-outline">{day}</p>
              <button
                type="button"
                onClick={() => onOpenRecipe(recipe)}
                className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-lowest overflow-hidden flex items-center gap-4 p-3 text-left shadow-sm"
              >
                <div
                  className="w-20 h-20 rounded-lg shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${recipe.photo}")`, backgroundColor: recipe.fallback }}
                />
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-base leading-tight truncate text-primary">{recipe.title}</h2>
                  <div className="flex items-center gap-1 mt-1 text-xs text-on-surface-variant">
                    <Zap size={12} className="text-tertiary" />
                    <span>{recipe.prepMinutes ?? 15} mins</span>
                  </div>
                  <span className="chip-value mt-1.5 inline-flex">£{recipe.pricePerServing.toFixed(2)} / serving</span>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-primary text-on-primary p-5 rounded-2xl soft-shadow relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">Weekly Budget Tracker</h3>
                <p className="font-display text-2xl">
                  £{remaining.toFixed(2)} <span className="text-sm font-body opacity-60">remaining</span>
                </p>
              </div>
              <div className="bg-primary-container p-2 rounded-xl">
                <Wallet size={20} className="text-on-primary-container" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Spending Progress</span>
                <span>
                  Spent: £{WEEKLY_BUDGET.spent.toFixed(2)} / £{WEEKLY_BUDGET.target.toFixed(2)}
                </span>
              </div>
              <div className="h-2 w-full bg-primary-container rounded-full overflow-hidden">
                <div className="h-full bg-tertiary-fixed-dim" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
