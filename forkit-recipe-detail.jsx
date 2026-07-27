import React, { useState } from 'react';
import { ChevronLeft, Minus, Plus } from 'lucide-react';

const PHOTO_SCRIM = 'linear-gradient(180deg, rgba(22,29,20,0) 40%, rgba(22,29,20,0.85) 100%)';

const FRACTIONS = { 0.25: '¼', 0.5: '½', 0.75: '¾' };

function formatQty(qtyPerServing, servings) {
  const raw = qtyPerServing * servings;
  const rounded = Math.round(raw * 4) / 4;
  const whole = Math.floor(rounded);
  const frac = Math.round((rounded - whole) * 100) / 100;
  const fracLabel = FRACTIONS[frac] || '';
  if (whole === 0 && fracLabel) return fracLabel;
  if (!fracLabel) return String(whole || rounded);
  return `${whole}${fracLabel}`;
}

const PLURAL_UNITS = ['can', 'clove', 'handful'];

function formatUnit(unit, qtyPerServing, servings) {
  if (!unit) return '';
  const raw = qtyPerServing * servings;
  return raw > 1 && PLURAL_UNITS.includes(unit) ? `${unit}s` : unit;
}

function ServingStepper({ servings, onChange }) {
  return (
    <div className="flex items-center gap-4 rounded-full px-2 py-1.5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E3DAC0' }}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, servings - 1))}
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: '#F3ECDA' }}
        aria-label="Fewer servings"
      >
        <Minus size={14} color="#232B1D" />
      </button>
      <span className="font-mono text-sm font-bold min-w-[3rem] text-center" style={{ color: '#232B1D' }}>
        {servings} {servings === 1 ? 'serving' : 'servings'}
      </span>
      <button
        type="button"
        onClick={() => onChange(servings + 1)}
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: '#9ACB4B' }}
        aria-label="More servings"
      >
        <Plus size={14} color="#161D14" />
      </button>
    </div>
  );
}

export default function ForkitRecipeDetail({ recipe, onBack }) {
  const [servings, setServings] = useState(recipe.baseServings);
  const total = recipe.pricePerServing * servings;

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
        <h1 className="font-display text-base truncate" style={{ color: '#F2E9DC' }}>
          {recipe.title}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-10">
        <div
          className="grain relative h-96 w-full"
          style={{
            backgroundImage: `${PHOTO_SCRIM}, url("${recipe.photo}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: recipe.fallback,
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex gap-1.5 mb-2">
              {recipe.tags.map((t) => (
                <span key={t} className="tag-pill">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="font-display text-3xl leading-tight" style={{ color: '#F2E9DC' }}>
              {recipe.title}
            </h2>
          </div>
        </div>

        <div className="px-6 pt-5 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <ServingStepper servings={servings} onChange={setServings} />
            <div className="text-right">
              <span className="receipt-tag">£{total.toFixed(2)} total</span>
              <p className="text-[11px] font-semibold mt-1" style={{ color: '#93876B' }}>
                £{recipe.pricePerServing.toFixed(2)}/serving
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg mb-3" style={{ color: '#232B1D' }}>
              Ingredients
            </h3>
            <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DAC0' }}>
              {recipe.ingredients.map((ing, i) => (
                <div
                  key={ing.name}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderTop: i === 0 ? 'none' : '1px solid #E3DAC0' }}
                >
                  <span className="text-sm font-semibold" style={{ color: '#232B1D' }}>
                    {ing.name}
                  </span>
                  <span className="font-mono text-xs font-bold" style={{ color: '#5A7A3A' }}>
                    {formatQty(ing.qtyPerServing, servings)} {formatUnit(ing.unit, ing.qtyPerServing, servings)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg mb-3" style={{ color: '#232B1D' }}>
              Steps
            </h3>
            <div className="flex flex-col gap-3">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <span
                    className="font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#9ACB4B', color: '#161D14' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: '#232B1D' }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
