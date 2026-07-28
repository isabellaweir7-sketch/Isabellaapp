import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { BUDGET_ANALYTICS } from './mockData';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ForkitBudgetAnalytics({ onBack }) {
  const { monthSpent, monthBudget, weekAverage, categories, weeklyTrend } = BUDGET_ANALYTICS;
  const maxTrend = Math.max(...weeklyTrend);
  const categoryTotal = categories.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-xl text-primary">Budget Analytics</h1>
      </header>

      <div className="flex-1 px-5 pb-10 max-w-2xl mx-auto w-full flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/40">
            <span className="text-xs font-semibold uppercase tracking-wide text-outline">Spent this month</span>
            <h2 className="font-display text-3xl text-primary mt-1">£{monthSpent.toFixed(2)}</h2>
            <span className="text-xs text-on-surface-variant">of £{monthBudget.toFixed(2)} budget</span>
          </div>
          <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/40">
            <span className="text-xs font-semibold uppercase tracking-wide text-outline">Weekly average</span>
            <h2 className="font-display text-3xl text-primary mt-1">£{weekAverage.toFixed(2)}</h2>
            <span className="text-xs text-on-surface-variant">per week so far</span>
          </div>
        </div>

        <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4">
          <h3 className="font-display text-lg text-primary mb-4">Weekly Spend Trend</h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyTrend.map((value, i) => (
              <div key={DAYS[i]} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-primary"
                  style={{ height: `${(value / maxTrend) * 100}%` }}
                />
                <span className="text-[10px] text-outline uppercase">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4">
          <h3 className="font-display text-lg text-primary mb-4">Spending Allocation</h3>
          <div className="flex flex-col gap-3">
            {categories.map((category) => (
              <div key={category.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-on-surface">{category.label}</span>
                  <span className="font-semibold text-primary">£{category.amount.toFixed(2)}</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-tertiary-container rounded-full"
                    style={{ width: `${(category.amount / categoryTotal) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
