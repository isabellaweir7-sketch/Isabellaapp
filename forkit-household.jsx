import React, { useState } from 'react';
import { ChevronLeft, Wallet, UtensilsCrossed, User, ShoppingCart } from 'lucide-react';
import { HOUSEHOLD_MEMBERS, COOKING_NIGHTS, SHOPPING_LIST } from './mockData';

function memberById(id) {
  return HOUSEHOLD_MEMBERS.find((m) => m.id === id);
}

function NightCard({ night, onOpenNight, onAssign }) {
  const member = memberById(night.memberId);
  const others = HOUSEHOLD_MEMBERS.filter((m) => m.id !== night.memberId);

  return (
    <div className="flex-1 min-w-[140px] bg-surface-container-low rounded-lg p-3 border border-outline-variant/30">
      <span className="block text-xs font-medium text-outline mb-2">{night.day.slice(0, 3)}</span>
      {!night.open ? (
        <>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
              member.id === 'you' ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-primary'
            }`}
          >
            {member.initials}
          </div>
          <p className="text-sm font-semibold tracking-wider text-primary">{member.name}</p>
        </>
      ) : (
        <>
          <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center mb-2">
            <UtensilsCrossed size={16} className="text-on-tertiary-fixed" />
          </div>
          <p className="text-xs font-medium text-on-surface-variant">Up for grabs</p>
        </>
      )}
      {member.id === 'you' && !night.open && (
        <button type="button" onClick={() => onOpenNight(night.day)} className="text-sm font-semibold tracking-wider text-secondary underline mt-2 block">
          Can't cook tonight?
        </button>
      )}
      {night.open && (
        <div className="flex flex-col gap-1 mt-2">
          {others.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onAssign(night.day, m.id)}
              className="chip-value text-left"
            >
              {m.name} takes it
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ShoppingItemRow({ item, optedOut, onToggle }) {
  const addedByMember = memberById(item.addedBy);
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 p-3">
      <div className="flex-1 min-w-0">
        <p className="text-base font-medium truncate text-primary">{item.name}</p>
        <p className="text-xs font-medium text-on-surface-variant mt-0.5">
          Added by <span className="font-semibold text-primary">{addedByMember.name}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="chip-value">£{item.price.toFixed(2)}</span>
        <button
          type="button"
          onClick={onToggle}
          className={`px-2.5 py-1.5 rounded-full text-xs font-semibold ${
            optedOut ? 'bg-surface-container border border-outline-variant text-on-surface-variant' : 'bg-primary text-on-primary'
          }`}
        >
          {optedOut ? 'Not paying' : "You're in"}
        </button>
      </div>
    </div>
  );
}

export default function ForkitHousehold({ onBack, onOpenShopping }) {
  const [nights, setNights] = useState(() => COOKING_NIGHTS.map((n) => ({ ...n, open: false })));
  const [optedOut, setOptedOut] = useState([]);

  const openNight = (day) => setNights((prev) => prev.map((n) => (n.day === day ? { ...n, open: true } : n)));
  const assignNight = (day, memberId) =>
    setNights((prev) => prev.map((n) => (n.day === day ? { day, memberId, open: false } : n)));
  const toggleOptOut = (id) =>
    setOptedOut((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const yourShare = SHOPPING_LIST.filter((item) => !optedOut.includes(item.id)).reduce(
    (sum, item) => sum + item.price / HOUSEHOLD_MEMBERS.length,
    0,
  );

  const memberTotals = HOUSEHOLD_MEMBERS.map((m) => ({
    member: m,
    total: SHOPPING_LIST.filter((item) => item.addedBy === m.id).reduce((sum, item) => sum + item.price, 0),
  })).sort((a, b) => b.total - a.total);
  const totalAdded = memberTotals.reduce((sum, m) => sum + m.total, 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-2xl font-semibold text-primary">ForkIt</h1>
      </header>

      <div className="flex-1 px-5 pb-10 max-w-3xl mx-auto w-full flex flex-col gap-6">
        <section>
          <span className="block text-sm font-semibold uppercase tracking-widest text-primary mb-1">
            Your shared household
          </span>
          <h2 className="font-display text-4xl font-semibold text-primary mb-2">Household Hub</h2>
          <p className="text-lg text-outline max-w-[32rem]">
            Manage your shared kitchen — who's cooking, and who's paying for what.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4">
            <h3 className="font-display text-2xl font-semibold text-primary mb-3">Dinner Rota</h3>
            <div className="flex flex-col md:flex-row gap-2 overflow-x-auto pb-1">
              {nights.map((night) => (
                <NightCard key={night.day} night={night} onOpenNight={openNight} onAssign={assignNight} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-primary text-on-primary rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-display text-2xl font-semibold">Household Kitty</h3>
                <Wallet size={20} className="opacity-60" />
              </div>
              <p className="text-xs font-medium uppercase tracking-widest text-primary-fixed mb-1">Added to shared list</p>
              <h4 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-tertiary-fixed mb-4">
                £{totalAdded.toFixed(2)}
              </h4>
              <div className="flex flex-col gap-1.5">
                {memberTotals.map(({ member, total }) => (
                  <div key={member.id} className="flex justify-between items-center text-sm opacity-90">
                    <span className="flex items-center gap-1.5">
                      <User size={12} /> {member.name}
                    </span>
                    <span className="font-semibold">£{total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-2xl font-semibold text-primary">Shared Shopping List</h3>
            {onOpenShopping && (
              <button type="button" onClick={onOpenShopping} className="flex items-center gap-1.5 text-sm font-semibold tracking-wider text-secondary">
                <ShoppingCart size={14} /> Shopping mode
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {SHOPPING_LIST.map((item) => (
              <ShoppingItemRow key={item.id} item={item} optedOut={optedOut.includes(item.id)} onToggle={() => toggleOptOut(item.id)} />
            ))}
          </div>
          <div className="flex items-center justify-between rounded-lg p-3 mt-3 bg-primary">
            <span className="text-sm font-semibold tracking-wider text-on-primary">Your share this week</span>
            <span className="chip-value">£{yourShare.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
