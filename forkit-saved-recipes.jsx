import React from 'react';
import { ChevronLeft, Heart, BookOpen } from 'lucide-react';
import { SAVED_RECIPES } from './mockData';

function EmptySaved({ onBack }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-2xl font-semibold text-primary">My Recipes</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
        <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center">
          <BookOpen size={36} className="text-primary" />
        </div>
        <h2 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-primary">
          Your digital cookbook is empty
        </h2>
        <p className="text-lg text-on-surface-variant max-w-[24rem]">
          Save recipes you love so they're easy to find again when it's time to cook.
        </p>
        <button type="button" onClick={onBack} className="bg-primary text-on-primary font-semibold px-6 py-3 rounded-xl">
          Browse Recipes
        </button>
      </main>
    </div>
  );
}

export default function ForkitSavedRecipes({ onBack, onOpenRecipe }) {
  if (SAVED_RECIPES.length === 0) return <EmptySaved onBack={onBack} />;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-2xl font-semibold text-primary">My Recipes</h1>
      </header>

      <div className="flex-1 px-5 pb-8 max-w-2xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-4">
          {SAVED_RECIPES.map((recipe) => (
            <button key={recipe.id} type="button" onClick={() => onOpenRecipe(recipe)} className="text-left group">
              <div
                className="relative aspect-square rounded-lg overflow-hidden mb-2"
                style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full">
                  <Heart size={16} className="text-primary" fill="currentColor" />
                </span>
              </div>
              <h4 className="font-display text-base text-primary leading-tight">{recipe.title}</h4>
              <p className="text-xs font-medium text-on-surface-variant">
                {recipe.prepMinutes ?? 15} mins · £{recipe.pricePerServing.toFixed(2)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
