import React, { useState } from 'react';
import { ChevronLeft, Search, CheckCircle2, Utensils, Timer, Zap } from 'lucide-react';
import { SAVED_RECIPES, generateCupboardRecipe } from './mockData';
import { SkillLevelBadge } from './forkit-recipe-detail.jsx';

export default function ForkitPantry({ answers, freshersMode, onBack, onOpenRecipe }) {
  const [ingredientsText, setIngredientsText] = useState('');
  const [staples, setStaples] = useState(true);

  const parsedIngredients = ingredientsText
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0"
          aria-label="Back"
        >
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-primary">ForkIt</h1>
      </header>

      <div className="flex-1 px-5 pb-8 max-w-3xl mx-auto w-full">
        <section className="mt-4 mb-6">
          <h2 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold mb-2 text-primary">
            Cupboard Cooker
          </h2>
          <p className="text-lg text-on-surface-variant max-w-[36rem]">
            What's left in your cupboard? We'll turn it into a recipe you can actually cook tonight.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/40">
              <label htmlFor="cupboard-input" className="block text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                What's in your cupboard?
              </label>
              <textarea
                id="cupboard-input"
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                placeholder="e.g. Pasta, Spinach, Garlic, Eggs..."
                className="w-full bg-transparent border-2 border-outline-variant focus:border-primary focus:ring-0 p-4 text-lg transition-all outline-none rounded-lg min-h-[120px] resize-none text-on-surface placeholder:text-on-surface-variant/60"
              />
              <p className="mt-2 text-xs text-on-surface-variant">Separate ingredients with commas</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-outline-variant/30">
              <div className="flex items-center gap-2">
                <Utensils size={18} className="text-primary" />
                <span className="text-base text-on-surface">Assume store-cupboard staples</span>
                <span className="text-xs font-medium text-outline">(oil, salt, pepper, flour)</span>
              </div>
              <button
                type="button"
                onClick={() => setStaples((v) => !v)}
                className={`relative w-11 h-6 rounded-full transition-colors ${staples ? 'bg-primary' : 'bg-outline-variant'}`}
                aria-label="Toggle staples"
              >
                <span
                  className="absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white transition-transform"
                  style={{ transform: staples ? 'translateX(20px)' : 'translateX(0)' }}
                />
              </button>
            </div>

            <button
              type="button"
              disabled={parsedIngredients.length === 0}
              onClick={() =>
                onOpenRecipe(
                  generateCupboardRecipe(
                    parsedIngredients,
                    answers?.restrictions ?? [],
                    answers?.allergies ?? [],
                    answers?.firmDislikes ?? [],
                    answers?.equipment ?? [],
                    {
                      nutritionGoals: answers?.nutritionGoals ?? [],
                      likedDishes: answers?.likedDishes ?? [],
                      dislikedDishes: answers?.dislikedDishes ?? [],
                      macroPriority: answers?.macros,
                    },
                    !!freshersMode
                  )
                )
              }
              className="w-full py-3.5 rounded-xl font-semibold text-lg tracking-wider transition-opacity bg-primary-container text-on-primary-container flex items-center justify-center gap-2"
              style={{ opacity: parsedIngredients.length === 0 ? 0.4 : 1 }}
            >
              <Search size={18} />
              Find Recipes
            </button>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-surface-container-high rounded-xl p-4 h-full">
              <h3 className="font-display text-2xl font-semibold mb-2 text-primary">The Art of the Scrounge</h3>
              <p className="text-base text-on-surface-variant mb-4">
                An empty fridge doesn't mean an empty plate — we prioritise what's actually there over what a
                recipe says you need.
              </p>
              <ul className="flex flex-col gap-2 text-base text-primary">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} /> Optimised for quick 15-minute prep
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} /> Favours one-pan and one-pot ideas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} /> Zero-waste recipe logic
                </li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <div className="flex items-baseline justify-between mb-3 border-b border-outline-variant pb-2">
            <h3 className="font-display text-2xl font-semibold text-primary">Trending from the Cupboard</h3>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
            {SAVED_RECIPES.map((recipe) => (
              <button
                key={recipe.id}
                type="button"
                onClick={() => onOpenRecipe(recipe)}
                className="min-w-[240px] text-left group"
              >
                <div
                  className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2"
                  style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <span className="chip-value absolute top-3 right-3">{recipe.tags[0]}</span>
                  <span className="absolute top-3 left-3">
                    <SkillLevelBadge level={recipe.skillLevel} />
                  </span>
                </div>
                <h4 className="font-display text-lg text-primary">{recipe.title}</h4>
                <p className="text-xs font-medium text-outline flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1">
                    <Timer size={14} /> {recipe.prepMinutes ?? 15} mins
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap size={14} /> {recipe.ingredients.length} ingredients
                  </span>
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
