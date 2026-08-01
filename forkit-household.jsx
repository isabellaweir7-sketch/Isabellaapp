import React, { useState } from 'react';
import {
  ChevronLeft,
  Wallet,
  UtensilsCrossed,
  User,
  ShoppingCart,
  Share2,
  ShoppingBag,
  Plus,
  Check,
  Package,
  Sparkles,
} from 'lucide-react';
import { HOUSEHOLD_MEMBERS, COOKING_NIGHTS, SHOPPING_LIST, PANTRY_STATUS, generateCupboardRecipe } from './mockData';

function memberById(id) {
  return HOUSEHOLD_MEMBERS.find((m) => m.id === id);
}

function NightCard({ night, onOpenNight, onAssign }) {
  const member = memberById(night.memberId);
  const others = HOUSEHOLD_MEMBERS.filter((m) => m.id !== night.memberId);

  if (night.takeaway) {
    return (
      <div className="flex-1 min-w-[140px] bg-surface-container-low rounded-lg p-3 border border-outline-variant/30">
        <span className="block text-xs font-medium text-outline mb-2">{night.day.slice(0, 3)}</span>
        <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center mb-2">
          <ShoppingBag size={16} className="text-on-tertiary-fixed" />
        </div>
        <p className="text-sm font-semibold tracking-wider text-primary">Takeaway</p>
        <p className="text-xs font-medium text-on-surface-variant">Group choice</p>
      </div>
    );
  }

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

function ShoppingItemRow({ item, optedOut, onToggle, onToggleInCart }) {
  const addedByMember = memberById(item.addedBy);
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30 p-3">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggleInCart}
          className={`w-6 h-6 mt-0.5 rounded-md border shrink-0 flex items-center justify-center transition-colors ${
            item.inCart ? 'bg-primary border-primary' : 'border-outline-variant'
          }`}
          aria-label={item.inCart ? 'Mark as not in cart' : 'Mark as in cart'}
        >
          {item.inCart && <Check size={14} className="text-on-primary" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className={`text-base font-medium text-primary ${item.inCart ? 'line-through opacity-60' : ''}`}>{item.name}</p>
            {item.urgent && (
              <span className="px-1.5 py-0.5 rounded bg-tertiary-fixed/60 text-on-tertiary-fixed-variant text-[10px] font-bold uppercase tracking-wider shrink-0">
                Urgent
              </span>
            )}
            {item.inCart && (
              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-outline text-[10px] font-bold uppercase tracking-wider shrink-0">
                In cart
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-on-surface-variant mt-0.5">
            Added by <span className="font-semibold text-primary">{addedByMember.name}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 pl-9">
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

export default function ForkitHousehold({ onBack, onOpenShopping, onOpenRecipe }) {
  const [nights, setNights] = useState(() => COOKING_NIGHTS.map((n) => ({ ...n, open: false })));
  const [optedOut, setOptedOut] = useState([]);
  const [items, setItems] = useState(SHOPPING_LIST);
  const [newItem, setNewItem] = useState('');
  const [settled, setSettled] = useState(false);
  const [pantryStatus, setPantryStatus] = useState(PANTRY_STATUS);
  const [editingPantry, setEditingPantry] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);

  const handleInvite = async () => {
    const link = window.location.origin + import.meta.env.BASE_URL;
    const shareData = {
      title: 'ForkIt',
      text: 'Join our household on ForkIt so we can plan meals and split the shopping together!',
      url: link,
    };
    // Opens the real OS share sheet (WhatsApp, Messages, etc.) on phones.
    // Falls back to a clipboard copy on desktop browsers that don't support it.
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err?.name === 'AbortError') return; // they cancelled the share sheet — nothing more to do
        // any other failure — fall through to the clipboard copy below
      }
    }
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // Clipboard API unavailable/blocked — nothing more we can do here.
    }
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2000);
  };

  const handleConfirmPantryUpdate = () => {
    setPantryStatus((prev) => ({ ...prev, updatedByMemberId: 'you', hoursAgo: 0 }));
    setEditingPantry(false);
  };

  const adjustLowItemCount = (delta) =>
    setPantryStatus((prev) => ({ ...prev, lowItemCount: Math.max(0, prev.lowItemCount + delta) }));

  const openNight = (day) => setNights((prev) => prev.map((n) => (n.day === day ? { ...n, open: true } : n)));
  const assignNight = (day, memberId) =>
    setNights((prev) => prev.map((n) => (n.day === day ? { day, memberId, open: false } : n)));
  const toggleOptOut = (id) =>
    setOptedOut((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const toggleInCart = (id) =>
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, inCart: !item.inCart } : item)));
  const addItem = (e) => {
    e.preventDefault();
    const name = newItem.trim();
    if (!name) return;
    setItems((prev) => [
      ...prev,
      { id: `item-custom-${Date.now()}`, name, price: 0, addedBy: 'you', aisle: 'Household' },
    ]);
    setNewItem('');
  };

  const yourShare = items.filter((item) => !optedOut.includes(item.id)).reduce(
    (sum, item) => sum + item.price / HOUSEHOLD_MEMBERS.length,
    0,
  );

  const memberTotals = HOUSEHOLD_MEMBERS.map((m) => ({
    member: m,
    total: items.filter((item) => item.addedBy === m.id).reduce((sum, item) => sum + item.price, 0),
  })).sort((a, b) => b.total - a.total);
  const totalAdded = memberTotals.reduce((sum, m) => sum + m.total, 0);

  const pantryUpdatedBy = memberById(pantryStatus.updatedByMemberId);
  const suggestion = generateCupboardRecipe(items.map((i) => i.name), [], []);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-2xl font-semibold text-primary">ForkIt</h1>
      </header>

      <div className="flex-1 px-5 pb-10 max-w-3xl mx-auto w-full flex flex-col gap-6">
        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="block text-sm font-semibold uppercase tracking-widest text-primary mb-1">
              Your shared household
            </span>
            <h2 className="font-display text-4xl font-semibold text-primary mb-2">Household Hub</h2>
            <p className="text-lg text-outline max-w-[32rem]">
              Manage your shared kitchen — who's cooking, and who's paying for what.
            </p>
          </div>
          <button
            type="button"
            onClick={handleInvite}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold tracking-wider text-sm bg-primary text-on-primary shrink-0 w-fit"
          >
            {inviteCopied ? <Check size={16} /> : <Share2 size={16} />}
            {inviteCopied ? 'Link copied!' : 'Invite Roommates'}
          </button>
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
            <button
              type="button"
              onClick={() => setSettled(true)}
              className="mt-4 w-full py-2.5 rounded-lg font-semibold tracking-wider text-sm bg-surface text-primary"
            >
              {settled ? 'Balances settled ✓' : 'Settle Balances'}
            </button>
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
            {items.map((item) => (
              <ShoppingItemRow
                key={item.id}
                item={item}
                optedOut={optedOut.includes(item.id)}
                onToggle={() => toggleOptOut(item.id)}
                onToggleInCart={() => toggleInCart(item.id)}
              />
            ))}
          </div>
          <form onSubmit={addItem} className="flex items-center gap-2 mt-3">
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add an item…"
              className="flex-1 min-w-0 bg-surface-container-lowest border border-outline-variant rounded-lg px-3.5 py-2.5 text-sm font-medium text-on-surface outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              disabled={!newItem.trim()}
              className="w-10 h-10 shrink-0 rounded-lg bg-primary text-on-primary flex items-center justify-center"
              style={{ opacity: newItem.trim() ? 1 : 0.4 }}
              aria-label="Add item"
            >
              <Plus size={18} />
            </button>
          </form>
          <div className="flex items-center justify-between rounded-lg p-3 mt-3 bg-primary">
            <span className="text-sm font-semibold tracking-wider text-on-primary">Your share this week</span>
            <span className="chip-value">£{yourShare.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-secondary-container rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center shrink-0">
              <Package size={18} className="text-on-secondary-container" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-on-secondary-container mb-1">Pantry Check</h4>
              <p className="text-sm text-on-secondary-container mb-1">
                Last update {pantryStatus.hoursAgo === 0 ? 'just now' : `${pantryStatus.hoursAgo} hours ago`} by{' '}
                {pantryUpdatedBy.name}. {pantryStatus.lowItemCount} items running low.
              </p>
              {editingPantry ? (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-on-secondary-container">Items running low:</span>
                  <button
                    type="button"
                    onClick={() => adjustLowItemCount(-1)}
                    className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center text-on-secondary-container"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold text-on-secondary-container w-4 text-center">
                    {pantryStatus.lowItemCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => adjustLowItemCount(1)}
                    className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center text-on-secondary-container"
                    aria-label="Increase"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmPantryUpdate}
                    className="ml-1 text-sm font-semibold underline text-on-secondary-container"
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingPantry(true)}
                  className="text-sm font-semibold underline text-on-secondary-container"
                >
                  Update status
                </button>
              )}
            </div>
          </div>

          {suggestion && (
            <button
              type="button"
              onClick={() => onOpenRecipe && onOpenRecipe(suggestion)}
              className="bg-tertiary-fixed rounded-xl p-4 flex items-start gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-on-tertiary-fixed" />
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-on-tertiary-fixed mb-1">Smart Suggestion</h4>
                <p className="text-sm text-on-tertiary-fixed mb-1">
                  Based on your shared list, you can make {suggestion.title} tonight.
                </p>
                <span className="text-sm font-semibold underline text-on-tertiary-fixed">View Recipe</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
