import React, { useState } from 'react';
import { ArrowLeft, Bookmark, Minus, Plus, Clock, ShoppingBasket, Banknote, Circle, CheckCircle2, Lightbulb, Refrigerator, Users, User, Flame } from 'lucide-react';

const BATCH_PRO_KEY = 'forkit_batch_pro_unlocked';

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

const PLURAL_UNITS = ['can', 'clove', 'handful', 'slice'];

function formatUnit(unit, qtyPerServing, servings) {
  if (!unit) return '';
  const raw = qtyPerServing * servings;
  return raw > 1 && PLURAL_UNITS.includes(unit) ? `${unit}s` : unit;
}

function ServingStepper({ servings, onChange }) {
  return (
    <div className="bg-surface-container rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Adjust Yield</h3>
        <span className="text-primary font-bold text-sm">
          {servings} {servings === 1 ? 'serving' : 'servings'}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, servings - 1))}
          className="w-9 h-9 rounded-lg bg-surface-container-lowest border border-outline-variant flex items-center justify-center"
          aria-label="Fewer servings"
        >
          <Minus size={16} className="text-primary" />
        </button>
        <span className="flex-1 text-center font-display text-2xl text-primary">{servings}</span>
        <button
          type="button"
          onClick={() => onChange(servings + 1)}
          className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center"
          aria-label="More servings"
        >
          <Plus size={16} className="text-on-primary" />
        </button>
      </div>
    </div>
  );
}

function BatchCookRow({ servings, onSetServings }) {
  const handlePick = (value) => {
    onSetServings(value);
    try {
      localStorage.setItem(BATCH_PRO_KEY, 'true');
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
  };

  return (
    <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/40">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Batch Cook This</h3>
      <p className="text-sm text-on-surface-variant mb-3">Cook once, eat for three days.</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handlePick(3)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold tracking-wider transition-colors ${
            servings === 3 ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest border border-outline-variant text-on-surface'
          }`}
        >
          <User size={16} /> 3 Portions Solo
        </button>
        <button
          type="button"
          onClick={() => handlePick(6)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold tracking-wider transition-colors ${
            servings === 6 ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest border border-outline-variant text-on-surface'
          }`}
        >
          <Users size={16} /> 6 Portions Shared
        </button>
      </div>
    </div>
  );
}

function NutritionCard({ macros }) {
  if (!macros) return null;
  const stats = [
    { label: 'Calories', value: macros.calories, unit: 'kcal' },
    { label: 'Protein', value: macros.protein, unit: 'g' },
    { label: 'Carbs', value: macros.carbs, unit: 'g' },
    { label: 'Fat', value: macros.fat, unit: 'g' },
  ];
  return (
    <div className="bg-surface-container rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Flame size={16} className="text-tertiary" />
        <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Nutrition (per serving)</h3>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center bg-surface-container-lowest rounded-lg py-2.5">
            <span className="font-display text-xl text-primary leading-tight">
              {s.value}
              <span className="text-xs font-body text-on-surface-variant">{s.unit}</span>
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mt-0.5">
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-on-surface-variant/60 mt-2 leading-snug">
        Calculated from the ingredients listed above — sides mentioned only in the method (e.g. "serve with rice") aren't included.
      </p>
    </div>
  );
}

export default function ForkitRecipeDetail({ recipe, onBack }) {
  const [servings, setServings] = useState(recipe.baseServings);
  const [checked, setChecked] = useState([]);
  const total = recipe.pricePerServing * servings;

  const toggleChecked = (name) =>
    setChecked((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="fixed top-0 z-50 w-full flex items-center justify-between px-5 py-4 bg-surface/80 backdrop-blur-md">
        <button type="button" onClick={onBack} className="text-primary" aria-label="Back">
          <ArrowLeft size={22} />
        </button>
        <h1 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-primary truncate max-w-[60%]">
          {recipe.title}
        </h1>
        <Bookmark size={22} className="text-primary" />
      </header>

      <div className="flex-1 overflow-y-auto pb-10 max-w-2xl mx-auto w-full">
        <div
          className="relative w-full aspect-[3/4]"
          style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-surface to-transparent" />
        </div>

        <div className="px-5 -mt-10 relative z-10 flex flex-col gap-6">
          <section>
            <h2 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold mb-2 text-primary">
              {recipe.title}
            </h2>
            {recipe.ingredients.length <= 5 && (
              <span className="chip-value mb-2 inline-flex">Fresher Friendly</span>
            )}
            <div className="flex items-center gap-4 text-sm font-semibold tracking-wider text-on-surface-variant">
              <span className="flex items-center gap-1">
                <Clock size={16} /> {recipe.prepMinutes ?? 15} mins
              </span>
              <span className="flex items-center gap-1">
                <ShoppingBasket size={16} /> {recipe.ingredients.length} items
              </span>
              <span className="flex items-center gap-1 text-tertiary">
                <Banknote size={16} /> £{recipe.pricePerServing.toFixed(2)}/pp
              </span>
            </div>
          </section>

          <ServingStepper servings={servings} onChange={setServings} />

          <NutritionCard macros={recipe.macros} />

          <BatchCookRow servings={servings} onSetServings={setServings} />

          <div className="flex items-center justify-between">
            <span className="chip-value">£{total.toFixed(2)} total</span>
            <span className="text-xs font-medium text-on-surface-variant">
              £{recipe.pricePerServing.toFixed(2)}/serving
            </span>
          </div>

          <section>
            <h3 className="font-display text-2xl font-semibold mb-3 text-primary">Ingredients</h3>
            <ul className="flex flex-col gap-1">
              {recipe.ingredients.map((ing) => {
                const isChecked = checked.includes(ing.name);
                return (
                  <li
                    key={ing.name}
                    onClick={() => toggleChecked(ing.name)}
                    className="flex items-center justify-between py-2 border-b border-outline-variant/30 cursor-pointer"
                  >
                    <span className={`text-lg text-on-surface ${isChecked ? 'line-through opacity-50' : ''}`}>
                      {formatQty(ing.qtyPerServing, servings)} {formatUnit(ing.unit, ing.qtyPerServing, servings)} {ing.name}
                    </span>
                    {isChecked ? (
                      <CheckCircle2 size={18} className="text-primary" />
                    ) : (
                      <Circle size={18} className="text-outline-variant" />
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h3 className="font-display text-2xl font-semibold mb-3 text-primary italic">Method</h3>
            <div className="flex flex-col gap-4">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-primary-fixed-dim">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base text-on-surface-variant leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-secondary-container rounded-xl p-4 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb size={18} className="text-on-secondary-container" />
              <h4 className="text-sm font-semibold uppercase tracking-widest text-on-secondary-container">Pro-tip for student kitchens</h4>
            </div>
            <p className="text-base text-on-secondary-container italic">
              {recipe.subtitle || 'Swap in whatever you already have — this recipe is built to flex around your cupboard.'}
            </p>
          </section>

          {recipe.preservationTip && (
            <section className="bg-primary-container text-on-primary rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Refrigerator size={18} />
                <h4 className="text-sm font-semibold uppercase tracking-widest">Preservation Protocol</h4>
              </div>
              <p className="text-base opacity-90">{recipe.preservationTip}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
