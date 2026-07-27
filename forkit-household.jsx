import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { HOUSEHOLD_MEMBERS, COOKING_NIGHTS, SHOPPING_LIST } from './mockData';

function memberById(id) {
  return HOUSEHOLD_MEMBERS.find((m) => m.id === id);
}

function NightRow({ night, onOpenNight, onAssign }) {
  const member = memberById(night.memberId);
  const others = HOUSEHOLD_MEMBERS.filter((m) => m.id !== night.memberId);

  return (
    <div className="rounded-2xl border p-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DAC0' }}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase" style={{ color: '#5A7A3A', letterSpacing: '0.08em' }}>
            {night.day}
          </p>
          {!night.open ? (
            <div className="flex items-center gap-2 mt-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ backgroundColor: member.id === 'you' ? '#9ACB4B' : '#F3ECDA', color: '#232B1D' }}
              >
                {member.initials}
              </div>
              <span className="text-sm font-semibold" style={{ color: '#232B1D' }}>
                {member.name}
              </span>
            </div>
          ) : (
            <p className="text-sm font-semibold mt-1" style={{ color: '#93876B' }}>
              Up for grabs — no one's cooking yet
            </p>
          )}
        </div>
        {member.id === 'you' && !night.open && (
          <button
            type="button"
            onClick={() => onOpenNight(night.day)}
            className="text-xs font-bold shrink-0"
            style={{ color: '#5A7A3A', textDecoration: 'underline' }}
          >
            Can't cook tonight?
          </button>
        )}
      </div>
      {night.open && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {others.map((m) => (
            <button key={m.id} type="button" onClick={() => onAssign(night.day, m.id)} className="tag-pill">
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
    <div
      className="flex items-center justify-between gap-3 rounded-2xl border p-3"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DAC0' }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: '#232B1D' }}>
          {item.name}
        </p>
        <p className="text-xs font-semibold mt-0.5" style={{ color: '#93876B' }}>
          Added by {addedByMember.name}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="receipt-tag">£{item.price.toFixed(2)}</span>
        <button
          type="button"
          onClick={onToggle}
          className="px-2.5 py-1.5 rounded-full text-[11px] font-bold"
          style={{
            backgroundColor: optedOut ? '#F3ECDA' : '#9ACB4B',
            color: optedOut ? '#93876B' : '#161D14',
            border: optedOut ? '1px solid #E3DAC0' : 'none',
          }}
        >
          {optedOut ? 'Not paying' : "You're in"}
        </button>
      </div>
    </div>
  );
}

export default function ForkitHousehold({ onBack }) {
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
          Household
        </h1>
      </div>

      <div className="flex-1 px-6 pt-6 flex flex-col gap-8 pb-10">
        <div>
          <h2 className="font-display text-2xl leading-tight mb-1" style={{ color: '#232B1D' }}>
            Cooking nights
          </h2>
          <p className="text-sm font-medium mb-4" style={{ color: '#93876B' }}>
            Can't make your night? Open it up and whoever's free can take it.
          </p>
          <div className="flex flex-col gap-2.5">
            {nights.map((night) => (
              <NightRow key={night.day} night={night} onOpenNight={openNight} onAssign={assignNight} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl leading-tight mb-1" style={{ color: '#232B1D' }}>
            Shared shopping list
          </h2>
          <p className="text-sm font-medium mb-4" style={{ color: '#93876B' }}>
            Every item shows who added it — opt out of anything you're not paying toward.
          </p>
          <div className="flex flex-col gap-2.5">
            {SHOPPING_LIST.map((item) => (
              <ShoppingItemRow
                key={item.id}
                item={item}
                optedOut={optedOut.includes(item.id)}
                onToggle={() => toggleOptOut(item.id)}
              />
            ))}
          </div>
          <div
            className="flex items-center justify-between rounded-2xl p-3 mt-3"
            style={{ backgroundColor: '#212B1D' }}
          >
            <span className="text-sm font-semibold" style={{ color: '#F2E9DC' }}>
              Your share this week
            </span>
            <span className="receipt-tag">£{yourShare.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
