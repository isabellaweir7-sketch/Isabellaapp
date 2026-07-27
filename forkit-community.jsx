import React, { useState } from 'react';
import { ChevronLeft, ThumbsUp } from 'lucide-react';
import { COMMUNITY_RECIPES } from './mockData';

export default function ForkitCommunity({ onBack, onOpenRecipe }) {
  const [voted, setVoted] = useState([]);

  const toggleVote = (id) =>
    setVoted((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const displayUpvotes = (recipe) => recipe.upvotes + (voted.includes(recipe.id) ? 1 : 0);

  const sorted = [...COMMUNITY_RECIPES].sort((a, b) => displayUpvotes(b) - displayUpvotes(a));

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
          From other students
        </h1>
      </div>

      <div className="flex-1 px-6 pt-6 flex flex-col gap-3 pb-10">
        <p className="text-sm font-medium mb-1" style={{ color: '#93876B' }}>
          Budget recipes shared by other students. Upvote the ones worth keeping.
        </p>

        {sorted.map((recipe) => {
          const isVoted = voted.includes(recipe.id);
          return (
            <div
              key={recipe.id}
              className="rounded-2xl border overflow-hidden flex items-center gap-4 p-3"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DAC0' }}
            >
              <button
                type="button"
                onClick={() => onOpenRecipe(recipe)}
                className="flex items-center gap-4 flex-1 min-w-0 text-left"
              >
                <div
                  className="grain w-20 h-20 rounded-xl shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${recipe.photo}")`, backgroundColor: recipe.fallback }}
                />
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-lg leading-tight truncate" style={{ color: '#232B1D' }}>
                    {recipe.title}
                  </h2>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: '#93876B' }}>
                    {recipe.author}
                  </p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {recipe.tags.map((t) => (
                      <span key={t} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => toggleVote(recipe.id)}
                className="flex flex-col items-center gap-0.5 shrink-0 px-2 py-1.5 rounded-xl"
                style={{ backgroundColor: isVoted ? '#9ACB4B' : '#F3ECDA' }}
                aria-label="Upvote"
                aria-pressed={isVoted}
              >
                <ThumbsUp size={16} color={isVoted ? '#161D14' : '#5A7A3A'} fill={isVoted ? '#161D14' : 'none'} />
                <span className="font-mono text-xs font-bold" style={{ color: isVoted ? '#161D14' : '#5A7A3A' }}>
                  {displayUpvotes(recipe)}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
