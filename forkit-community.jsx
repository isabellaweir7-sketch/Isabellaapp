import React, { useState } from 'react';
import { ChevronLeft, Search, ThumbsUp, Lightbulb } from 'lucide-react';
import { COMMUNITY_RECIPES } from './mockData';

const CATEGORIES = ['All Recipes', 'Budget Hacks', 'Dorm Friendly', 'Bulk Prep', '15 Min Meals', 'Vegan'];

const CATEGORY_MATCH = {
  'Budget Hacks': ['budget', 'under £1'],
  'Dorm Friendly': ['dorm'],
  'Bulk Prep': ['batch cooks', 'freezes well'],
  '15 Min Meals': ['15 min', '5 min'],
  Vegan: ['vegan'],
};

export default function ForkitCommunity({ onBack, onOpenRecipe, onOpenTips }) {
  const [voted, setVoted] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Recipes');

  const toggleVote = (id, e) => {
    e.stopPropagation();
    setVoted((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const displayUpvotes = (recipe) => recipe.upvotes + (voted.includes(recipe.id) ? 1 : 0);

  const matchesCategory = (recipe) => {
    if (category === 'All Recipes') return true;
    const needles = CATEGORY_MATCH[category] ?? [];
    return recipe.tags.some((tag) => needles.some((needle) => tag.toLowerCase().includes(needle)));
  };

  const sorted = [...COMMUNITY_RECIPES]
    .filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
    .filter(matchesCategory)
    .sort((a, b) => displayUpvotes(b) - displayUpvotes(a));

  const [featured, ...rest] = sorted;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-2xl font-semibold text-primary">From Other Students</h1>
      </header>

      <div className="flex-1 px-5 pb-10 max-w-3xl mx-auto w-full flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-base text-on-surface-variant">
            Budget recipes shared by other students. Upvotes do the moderating — the best ones rise to the top.
          </p>
          {onOpenTips && (
            <button type="button" onClick={onOpenTips} className="flex items-center gap-1.5 text-sm font-semibold tracking-wider text-secondary shrink-0">
              <Lightbulb size={14} /> Budget tips
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 border-b border-outline-variant py-2">
          <Search size={18} className="text-outline" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes or authors..."
            className="bg-transparent outline-none w-full text-lg text-on-surface placeholder:text-outline"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setCategory(label)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider transition-colors ${
                category === label ? 'bg-primary text-on-primary' : 'border border-outline-variant text-on-surface hover:bg-surface-container'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {featured && (
          <button type="button" onClick={() => onOpenRecipe(featured)} className="relative rounded-xl overflow-hidden h-72 text-left group">
            <div
              className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundColor: featured.fallback, backgroundImage: `url("${featured.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end">
              <div>
                <span className="chip-value mb-2 inline-block">{featured.tags[0]}</span>
                <h2 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-white mb-1">
                  {featured.title}
                </h2>
                <p className="text-white/90 text-base">
                  {featured.author} · {featured.prepMinutes ?? 15} mins · £{featured.pricePerServing.toFixed(2)}/serving
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => toggleVote(featured.id, e)}
                className={`w-12 h-12 rounded-full backdrop-blur-md flex flex-col items-center justify-center shrink-0 ${
                  voted.includes(featured.id) ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-white/20 text-white'
                }`}
                aria-label="Upvote"
              >
                <ThumbsUp size={16} fill={voted.includes(featured.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((recipe) => {
            const isVoted = voted.includes(recipe.id);
            return (
              <button
                key={recipe.id}
                type="button"
                onClick={() => onOpenRecipe(recipe)}
                className="bg-surface-container-low rounded-xl p-2 soft-shadow text-left transition-transform hover:-translate-y-1"
              >
                <div
                  className="relative h-40 rounded-lg overflow-hidden mb-2"
                  style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <button
                    type="button"
                    onClick={(e) => toggleVote(recipe.id, e)}
                    className={`absolute top-2 right-2 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center ${
                      isVoted ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-white/85 text-primary'
                    }`}
                    aria-label="Upvote"
                  >
                    <ThumbsUp size={15} fill={isVoted ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="px-1 pb-1">
                  <h3 className="font-display text-lg text-primary mb-1 truncate">{recipe.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-on-surface-variant">{recipe.author}</span>
                    <span className="text-xs font-semibold text-secondary">{displayUpvotes(recipe)} upvotes</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
