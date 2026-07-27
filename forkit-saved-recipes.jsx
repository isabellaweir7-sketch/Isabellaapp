import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { SAVED_RECIPES } from './mockData';

export default function ForkitSavedRecipes({ onBack, onOpenRecipe }) {
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
          Saved
        </h1>
      </div>

      <div className="flex-1 px-6 pt-6 flex flex-col gap-3">
        {SAVED_RECIPES.map((recipe) => (
          <button
            key={recipe.id}
            type="button"
            onClick={() => onOpenRecipe(recipe)}
            className="rounded-2xl border overflow-hidden flex items-center gap-4 p-3 text-left"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DAC0' }}
          >
            <div
              className="grain w-20 h-20 rounded-xl shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${recipe.photo}")`, backgroundColor: recipe.fallback }}
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-lg leading-tight truncate" style={{ color: '#232B1D' }}>
                {recipe.title}
              </h2>
              <div className="flex gap-1.5 mt-1.5 mb-1.5 flex-wrap">
                {recipe.tags.map((t) => (
                  <span key={t} className="receipt-tag">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-xs font-semibold" style={{ color: '#93876B' }}>
                £{recipe.pricePerServing.toFixed(2)}/serving
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
