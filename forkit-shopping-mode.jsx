import React, { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { SHOPPING_AISLES } from './mockData';

export default function ForkitShoppingMode({ onBack }) {
  const [checked, setChecked] = useState([]);

  const toggle = (id) => setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const allItems = SHOPPING_AISLES.flatMap((a) => a.items);
  const total = allItems.reduce((sum, item) => sum + item.price, 0);
  const remaining = allItems.filter((item) => !checked.includes(item.id)).reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
            <ChevronLeft size={18} className="text-primary" />
          </button>
          <h1 className="font-display text-xl text-primary">Grocery List</h1>
        </div>
      </header>

      <div className="flex-1 px-5 pb-28 max-w-2xl mx-auto w-full flex flex-col gap-6">
        <div className="bg-primary-container text-on-primary p-4 rounded-xl flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg leading-tight">Weekly Essentials</h2>
            <span className="text-xs opacity-80">{allItems.length} items across {SHOPPING_AISLES.length} aisles</span>
          </div>
          <span className="font-display text-2xl">£{total.toFixed(2)}</span>
        </div>

        {SHOPPING_AISLES.filter((aisle) => aisle.items.length > 0).map((aisle) => (
          <section key={aisle.name}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{aisle.name}</h3>
            <div className="flex flex-col gap-2">
              {aisle.items.map((item) => {
                const isChecked = checked.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggle(item.id)}
                    className={`flex items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors ${
                      isChecked ? 'bg-surface-container border-outline-variant/30 opacity-60' : 'bg-surface-container-lowest border-outline-variant/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-primary border-primary' : 'border-outline-variant'
                        }`}
                      >
                        {isChecked && <Check size={13} className="text-on-primary" />}
                      </span>
                      <span className={`text-sm font-semibold text-on-surface ${isChecked ? 'line-through' : ''}`}>
                        {item.name}
                      </span>
                    </div>
                    <span className="chip-value">£{item.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-5 py-4 bg-surface border-t border-outline-variant flex items-center justify-between">
        <span className="text-sm font-semibold text-on-surface-variant">Still to buy</span>
        <span className="font-display text-xl text-primary">£{remaining.toFixed(2)}</span>
      </div>
    </div>
  );
}
