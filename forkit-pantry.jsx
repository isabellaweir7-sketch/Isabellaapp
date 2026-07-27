import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { PANTRY_INGREDIENTS, CUPBOARD_HERO } from './mockData';

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2.5 rounded-full text-sm font-semibold border transition-colors"
      style={{
        backgroundColor: selected ? '#9ACB4B' : '#FFFFFF',
        borderColor: selected ? '#9ACB4B' : '#E3DAC0',
        color: '#232B1D',
      }}
    >
      {label}
    </button>
  );
}

export default function ForkitPantry({ onBack, onOpenRecipe }) {
  const [selected, setSelected] = useState([]);

  const toggle = (item) =>
    setSelected((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));

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
          Pantry
        </h1>
      </div>

      <div className="flex-1 px-6 pt-6 flex flex-col">
        <h2 className="font-display text-2xl leading-tight mb-2" style={{ color: '#232B1D' }}>
          What's in your cupboard?
        </h2>
        <p className="text-sm font-medium mb-6" style={{ color: '#93876B' }}>
          Tell us what you've already got and we'll build a recipe around it.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {PANTRY_INGREDIENTS.map((item) => (
            <Chip key={item} label={item} selected={selected.includes(item)} onClick={() => toggle(item)} />
          ))}
        </div>
      </div>

      <div className="px-6 pt-4 pb-8" style={{ backgroundColor: '#161D14' }}>
        <button
          type="button"
          disabled={selected.length === 0}
          onClick={() => onOpenRecipe(CUPBOARD_HERO)}
          className="w-full py-3.5 rounded-full font-display text-base transition-opacity"
          style={{
            backgroundColor: '#9ACB4B',
            color: '#161D14',
            opacity: selected.length === 0 ? 0.4 : 1,
          }}
        >
          Generate a recipe
        </button>
      </div>
    </div>
  );
}
