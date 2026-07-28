import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { BUDGET_TIPS } from './mockData';

export default function ForkitBudgetTips({ onBack }) {
  const [featured, ...rest] = BUDGET_TIPS;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-xl text-primary">Budget Tips</h1>
      </header>

      <div className="flex-1 px-5 pb-10 max-w-2xl mx-auto w-full flex flex-col gap-6">
        <p className="text-sm text-on-surface-variant">The Thrifty Student — real ways to spend less without eating worse.</p>

        {featured && (
          <div className="rounded-xl overflow-hidden">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundColor: featured.fallback, backgroundImage: `url("${featured.photo}")` }}
            />
            <div className="bg-surface-container-low p-4 border border-t-0 border-outline-variant/40 rounded-b-xl">
              <h2 className="font-display text-xl text-primary leading-tight mb-2 italic">{featured.title}</h2>
              <p className="text-sm text-on-surface-variant">{featured.excerpt}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {rest.map((tip) => (
            <div key={tip.id} className="flex gap-3 bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-3">
              <div
                className="w-20 h-20 rounded-lg shrink-0 bg-cover bg-center"
                style={{ backgroundColor: tip.fallback, backgroundImage: `url("${tip.photo}")` }}
              />
              <div className="min-w-0">
                <h3 className="font-display text-base text-primary leading-tight mb-1">{tip.title}</h3>
                <p className="text-xs text-on-surface-variant">{tip.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
