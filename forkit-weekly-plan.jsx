import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { WEEKLY_PLAN } from './mockData';

export default function ForkitWeeklyPlan({ onBack, onOpenRecipe }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F3ECDA' }}>
      <div className="flex items-center gap-3 px-6 pt-8 pb-5" style={{ backgroundColor: '#161D14' }}>
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full shrink-0"
          style={{ backgroundColor: '#212B1D' }}
          aria-label="Back"
        >
          <ChevronLeft size={18} color="#F2E9DC" />
        </button>
        <h1 className="font-display text-xl" style={{ color: '#F2E9DC' }}>
          This week's plan
        </h1>
      </div>

      <div className="flex-1 px-6 pt-6 flex flex-col gap-3">
        {WEEKLY_PLAN.map(({ day, recipe }) => (
          <div key={day}>
            <p className="text-xs font-bold uppercase mb-1.5" style={{ color: '#5A7A3A', letterSpacing: '0.08em' }}>
              {day}
            </p>
            <button
              type="button"
              onClick={() => onOpenRecipe(recipe)}
              className="w-full rounded-2xl border overflow-hidden flex items-center gap-4 p-3 text-left"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DAC0' }}
            >
              <div
                className="grain w-16 h-16 rounded-xl shrink-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${recipe.photo}")`, backgroundColor: recipe.fallback }}
              />
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-base leading-tight truncate" style={{ color: '#232B1D' }}>
                  {recipe.title}
                </h2>
                <p className="text-xs font-semibold mt-1" style={{ color: '#93876B' }}>
                  £{recipe.pricePerServing.toFixed(2)}/serving
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
