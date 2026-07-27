import React, { useState } from 'react';
import { Home as HomeIcon, ShoppingBasket, ChefHat, Users, Flame, User } from 'lucide-react';
import { CUPBOARD_HERO, HOME_TILES, WEEKLY_BUDGET } from './mockData';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'pantry', label: 'Pantry', icon: ShoppingBasket },
  { id: 'recipes', label: 'Recipes', icon: ChefHat },
  { id: 'community', label: 'Community', icon: Users },
];

// Photo tile with a dark-to-transparent scrim so the label stays legible over
// real stock photography, and a solid forest-green fallback if a photo 404s.
function PhotoTile({ photo, fallback, label, className = '', onClick }) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`grain relative overflow-hidden rounded-2xl text-left ${className}`}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(22,29,20,0) 45%, rgba(22,29,20,0.75) 100%), url("${photo}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: fallback,
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <span className="font-display text-sm tracking-wide" style={{ color: '#F2E9DC' }}>
          {label}
        </span>
      </div>
    </Tag>
  );
}

function Header() {
  const remaining = WEEKLY_BUDGET.target - WEEKLY_BUDGET.spent;
  return (
    <div className="flex items-center justify-between px-6 pt-8 pb-5" style={{ backgroundColor: '#161D14' }}>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#212B1D', border: '1px solid #33422C' }}
        >
          <User size={18} color="#9ACB4B" />
        </div>
        <div>
          <p className="text-[11px] leading-none font-semibold" style={{ color: '#8FA087' }}>
            Welcome back
          </p>
          <h1 className="font-display text-2xl leading-tight" style={{ color: '#F2E9DC' }}>
            Hey, Isabella
          </h1>
        </div>
      </div>
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
        style={{ backgroundColor: '#212B1D', color: '#9ACB4B' }}
      >
        <Flame size={14} />
        <span className="font-mono text-xs font-semibold">£{remaining.toFixed(0)} left</span>
      </div>
    </div>
  );
}

function HeroSection({ onOpenRecipe }) {
  return (
    <div>
      <p
        className="text-xs uppercase font-bold mb-2"
        style={{ color: '#5A7A3A', letterSpacing: '0.08em' }}
      >
        From your cupboard
      </p>
      <PhotoTile
        photo={CUPBOARD_HERO.photo}
        fallback={CUPBOARD_HERO.fallback}
        label={CUPBOARD_HERO.title}
        className="h-80 w-full"
        onClick={() => onOpenRecipe(CUPBOARD_HERO)}
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-semibold" style={{ color: '#232B1D' }}>
          {CUPBOARD_HERO.subtitle}
        </span>
        <span className="receipt-tag">
          £{CUPBOARD_HERO.pricePerServing.toFixed(2)}
          <span style={{ opacity: 0.6 }}>/serving</span>
        </span>
      </div>
    </div>
  );
}

function BottomNav({ active, onChange, onNavigate }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-2 py-3 border-t"
      style={{ backgroundColor: '#161D14', borderColor: '#33422C' }}
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => {
              onChange(id);
              onNavigate(id);
            }}
            className="flex flex-col items-center gap-1 px-2"
          >
            <Icon size={20} color={isActive ? '#9ACB4B' : '#8FA087'} />
            <span className="text-[10px] font-semibold" style={{ color: isActive ? '#9ACB4B' : '#8FA087' }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function ForkitHome({ onOpenRecipe, onOpenSaved, onOpenPlan, onOpenPantry }) {
  const [activeTab, setActiveTab] = useState('home');
  const [plan, pantry, saved, community] = HOME_TILES;

  const handleNavTap = (id) => {
    if (id === 'pantry') onOpenPantry();
    if (id === 'recipes') onOpenSaved();
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#F3ECDA' }}>
      <Header />
      <div className="px-6 pt-6 flex flex-col gap-4">
        <HeroSection onOpenRecipe={onOpenRecipe} />

        <div className="grid grid-cols-3 gap-3">
          <PhotoTile {...plan} className="col-span-2 h-44" onClick={onOpenPlan} />
          <PhotoTile {...pantry} className="col-span-1 h-44" onClick={onOpenPantry} />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <PhotoTile {...saved} className="col-span-1 h-40" onClick={onOpenSaved} />
          <PhotoTile {...community} className="col-span-2 h-40" />
        </div>

        <p className="text-xs text-center font-semibold pt-1" style={{ color: '#93876B' }}>
          3 new budget recipes shared today
        </p>
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} onNavigate={handleNavTap} />
    </div>
  );
}
