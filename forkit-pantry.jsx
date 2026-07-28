import React, { useState } from 'react';
import { ChevronLeft, Sparkles, CheckCircle2, Utensils, Timer, Zap } from 'lucide-react';
import { PANTRY_INGREDIENTS, CUPBOARD_HERO, SAVED_RECIPES } from './mockData';

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
        selected ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface border border-outline-variant'
      }`}
    >
      {label}
    </button>
  );
}

export default function ForkitPantry({ onBack, onOpenRecipe }) {
  const [selected, setSelected] = useState([]);
  const [staples, setStaples] = useState(true);

  const toggle = (item) =>
    setSelected((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));

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
        <h1 className="font-display text-xl text-primary">ForkIt</h1>
      </header>

      <div className="flex-1 px-5 pb-8 max-w-3xl mx-auto w-full">
        <section className="mt-4 mb-6">
          <h2 className="font-display text-3xl leading-tight mb-2 text-primary">Cupboard Cooker</h2>
          <p className="text-base text-on-surface-variant max-w-xl">
            What's left in your cupboard? We'll turn it into a recipe you can actually cook tonight.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/40">
              <span className="block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                What's in your kitchen?
              </span>
              <div className="flex flex-wrap gap-2">
                {PANTRY_INGREDIENTS.map((item) => (
                  <Chip key={item} label={item} selected={selected.includes(item)} onClick={() => toggle(item)} />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-outline-variant/30">
              <div className="flex items-center gap-2">
                <Utensils size={18} className="text-primary" />
                <span className="text-sm text-on-surface">Assume store-cupboard staples</span>
                <span className="text-xs text-outline">(oil, salt, pepper, flour)</span>
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
              disabled={selected.length === 0}
              onClick={() => onOpenRecipe(CUPBOARD_HERO)}
              className="w-full py-3.5 rounded-xl font-semibold text-base transition-opacity bg-primary-container text-on-primary-container flex items-center justify-center gap-2"
              style={{ opacity: selected.length === 0 ? 0.4 : 1 }}
            >
              <Sparkles size={18} />
              Generate a recipe
            </button>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-surface-container-high rounded-xl p-4 h-full">
              <h3 className="font-display text-lg mb-2 text-primary">The Art of the Scrounge</h3>
              <p className="text-sm text-on-surface-variant mb-4">
                An empty fridge doesn't mean an empty plate — we prioritise what's actually there over what a
                recipe says you need.
              </p>
              <ul className="flex flex-col gap-2 text-sm text-primary">
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
            <h3 className="font-display text-lg text-primary">Trending from the Cupboard</h3>
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
                </div>
                <h4 className="font-display text-base text-primary">{recipe.title}</h4>
                <p className="text-xs text-outline flex items-center gap-2 mt-1">
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
