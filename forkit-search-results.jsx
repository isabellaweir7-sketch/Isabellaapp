import React, { useState } from 'react';
import { ChevronLeft, Search as SearchIcon, X, Timer } from 'lucide-react';
import { RECIPE_LIBRARY, filterByRestrictionsAndAllergies, filterByFirmDislikes } from './mockData';
import { HouseholdHeaderButton } from './forkit-home-mockup.jsx';
import { SkillLevelBadge } from './forkit-recipe-detail.jsx';

const FILTERS = [
  { id: 'vegan', label: 'Vegan' },
  { id: 'under30', label: 'Under 30 mins' },
  { id: 'budget', label: 'Budget Friendly' },
  { id: 'high-protein', label: 'High Protein' },
];

function matchesFilter(recipe, filterId) {
  switch (filterId) {
    case 'vegan':
      return recipe.dietary.vegan;
    case 'under30':
      return (recipe.prepMinutes ?? 999) <= 30;
    case 'budget':
      return recipe.pricePerServing <= 1.0 || recipe.tags.includes('Budget');
    case 'high-protein':
      return recipe.tags.includes('High Protein');
    default:
      return true;
  }
}

function recipeSnippet(recipe) {
  if (recipe.subtitle) return recipe.subtitle;
  const names = recipe.ingredients.slice(0, 3).map((i) => i.name.replace(/\s*\(.*?\)/, ''));
  return `Made with ${names.join(', ')}.`;
}

function ResultCard({ recipe, variant, onOpen }) {
  if (variant === 'featured') {
    return (
      <article className="md:col-span-8 cursor-pointer" onClick={onOpen}>
        <div className="soft-shadow rounded-xl overflow-hidden bg-surface-container-lowest flex flex-col md:flex-row h-full">
          <div
            className="md:w-1/2 relative h-56 md:h-auto"
            style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute top-4 left-4 flex gap-2">
              {recipe.tags.slice(0, 2).map((t) => (
                <span key={t} className="chip-value">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-display text-2xl text-primary leading-tight">{recipe.title}</h3>
                <SkillLevelBadge level={recipe.skillLevel} />
              </div>
              <p className="text-base text-on-surface-variant mb-4">{recipeSnippet(recipe)}</p>
            </div>
            <div className="flex items-center justify-between border-t border-outline-variant pt-3">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-widest text-outline">Cost/Serve</span>
                <span className="text-sm font-semibold text-secondary">£{recipe.pricePerServing.toFixed(2)}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold uppercase tracking-widest text-outline">Prep Time</span>
                <span className="text-sm font-semibold text-primary">{recipe.prepMinutes ?? 15} mins</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'vertical') {
    return (
      <article className="md:col-span-4 cursor-pointer" onClick={onOpen}>
        <div className="soft-shadow rounded-xl overflow-hidden bg-surface-container-lowest h-full flex flex-col">
          <div
            className="relative h-56"
            style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <span className="absolute bottom-3 right-3 px-3 py-1 bg-surface/90 backdrop-blur-sm text-primary rounded-full text-xs font-semibold">
              £{recipe.pricePerServing.toFixed(2)} per serving
            </span>
            <span className="absolute top-3 left-3">
              <SkillLevelBadge level={recipe.skillLevel} />
            </span>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="font-display text-lg text-primary mb-1">{recipe.title}</h3>
            <p className="text-sm text-on-surface-variant line-clamp-2">{recipeSnippet(recipe)}</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-on-surface-variant">
              <Timer size={16} /> {recipe.prepMinutes ?? 15}m
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="md:col-span-12 cursor-pointer" onClick={onOpen}>
      <div className="soft-shadow rounded-xl overflow-hidden bg-surface-container-lowest flex flex-col md:flex-row">
        <div
          className="md:w-1/3 relative h-48 md:h-auto"
          style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="md:w-2/3 p-4 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-2 gap-3">
            <h3 className="font-display text-xl text-primary">{recipe.title}</h3>
            <span className="text-sm font-semibold text-secondary shrink-0">£{recipe.pricePerServing.toFixed(2)}/serve</span>
          </div>
          <p className="text-base text-on-surface-variant mb-3">{recipeSnippet(recipe)}</p>
          <div className="flex gap-2 flex-wrap items-center">
            <SkillLevelBadge level={recipe.skillLevel} />
            {recipe.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 bg-primary-fixed/20 text-primary rounded border border-outline-variant/30 text-[11px] font-semibold uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ForkitSearchResults({ initialQuery, answers, onBack, onOpenRecipe, onOpenHousehold }) {
  const [query, setQuery] = useState(initialQuery ?? '');
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (id) =>
    setActiveFilters((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  // Restrictions/allergies are a hard safety filter — applied before the
  // query and on-screen chips so an allergy or diet can never be searched
  // around, same as every other recipe-surfacing screen in the app.
  const safePool = filterByRestrictionsAndAllergies(RECIPE_LIBRARY, answers?.restrictions ?? [], answers?.allergies ?? []);
  const dislikeFilteredPool = filterByFirmDislikes(safePool, answers?.firmDislikes ?? []);

  const q = query.trim().toLowerCase();
  const results = dislikeFilteredPool.filter((recipe) => {
    const matchesQuery =
      q.length === 0 ||
      recipe.title.toLowerCase().includes(q) ||
      recipe.tags.some((t) => t.toLowerCase().includes(q)) ||
      recipe.ingredients.some((i) => i.name.toLowerCase().includes(q));
    const matchesFilters = activeFilters.every((f) => matchesFilter(recipe, f));
    return matchesQuery && matchesFilters;
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface pb-16">
      <header className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0"
            aria-label="Back"
          >
            <ChevronLeft size={18} className="text-primary" />
          </button>
          <h1 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-primary">ForkIt</h1>
        </div>
        {onOpenHousehold && <HouseholdHeaderButton onClick={onOpenHousehold} />}
      </header>

      <div className="flex-1 px-5 pb-8 max-w-3xl mx-auto w-full">
        <div className="relative mb-4">
          <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes, ingredients, or people..."
            className="w-full pl-12 pr-4 py-4 bg-surface-container-low rounded-xl text-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/60"
            autoFocus
          />
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mb-6">
          {FILTERS.map((f) => {
            const active = activeFilters.includes(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold tracking-wider whitespace-nowrap transition-all active:scale-95 shrink-0 ${
                  active
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant border border-outline-variant'
                }`}
              >
                {f.label}
                {active && <X size={16} />}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-baseline mb-4">
          <h2 className="font-display text-2xl font-semibold text-primary">Matching Recipes</h2>
          <span className="text-xs font-medium text-outline">
            {results.length} result{results.length === 1 ? '' : 's'} found
          </span>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-on-surface-variant">
              No recipes match {query ? `"${query}"` : 'these filters'} yet — try clearing a filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {results.map((recipe, i) => {
              const variant = i % 3 === 0 ? 'featured' : i % 3 === 1 ? 'vertical' : 'horizontal';
              return <ResultCard key={recipe.id} recipe={recipe} variant={variant} onOpen={() => onOpenRecipe(recipe)} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
