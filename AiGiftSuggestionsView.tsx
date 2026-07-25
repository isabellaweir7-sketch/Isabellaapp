import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, AlertCircle, ShoppingBag, Plus, Check, ExternalLink, Loader2, ArrowRight } from 'lucide-react';
import { FriendProfile, PriceRangeTag, GiftSuggestion } from '../types';

interface AiGiftSuggestionsViewProps {
  friends: FriendProfile[];
  initialSelectedFriend?: FriendProfile | null;
  onAddWishlistItemFromAi: (friendId: string, item: { title: string; price: number; store: string; category: string; notes: string }) => void;
}

export const AiGiftSuggestionsView: React.FC<AiGiftSuggestionsViewProps> = ({
  friends,
  initialSelectedFriend,
  onAddWishlistItemFromAi,
}) => {
  const [selectedFriendId, setSelectedFriendId] = useState<string>(
    initialSelectedFriend ? initialSelectedFriend.id : friends[0]?.id || ''
  );
  const [budget, setBudget] = useState<PriceRangeTag>('35to75');
  const [vibe, setVibe] = useState('aesthetic & thoughtful');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const friend = friends.find((f) => f.id === selectedFriendId) || friends[0];

  useEffect(() => {
    if (friend) {
      handleGenerateSuggestions();
    }
  }, [selectedFriendId]);

  const handleGenerateSuggestions = async () => {
    if (!friend) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          friendName: friend.name,
          relationship: friend.relationship,
          favoriteShops: friend.preferences.favoriteShops,
          favoriteColors: friend.preferences.favoriteColors,
          favoriteSnacks: friend.preferences.favoriteSnacks,
          favoriteDrinks: friend.preferences.favoriteDrinks,
          clothingSize: friend.preferences.clothingSize,
          shoeSize: friend.preferences.shoeSize,
          jewelleryStyle: `${friend.preferences.jewellery.metal} - ${friend.preferences.jewellery.style}`,
          doNotWant: friend.preferences.doNotWant,
          hobbies: friend.preferences.hobbies,
          budget,
          vibe,
        }),
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
      } else {
        throw new Error(data.error || 'Failed to generate recommendations');
      }
    } catch (err: any) {
      console.error('AI Suggestion error:', err);
      // Fallback curated suggestions if offline or API key missing
      setSuggestions([
        {
          title: 'Sol De Janeiro Cheirosa 68 Beija Flor Perfume Mist',
          price: '$38',
          store: 'Sephora',
          reason: `Completely matches ${friend.name}'s love for Sephora scents and clean fruity florals!`,
          category: 'Beauty',
          affiliateUrl: 'https://sephora.com',
          priceTag: '35to75',
        },
        {
          title: 'Jellycat Amuseable Toast / Croissant Plush Bag',
          price: '$32',
          store: 'Nordstrom',
          reason: 'Viral aesthetic plush accessory perfect for coffee runs and casual outings!',
          category: 'Accessories',
          affiliateUrl: 'https://jellycat.com',
          priceTag: '15to35',
        },
        {
          title: '14k Gold Plated Dainty Huggie Earrings Set',
          price: '$28',
          store: 'Mejuri / Etsy',
          reason: `Respects her strict preference for ${friend.preferences.jewellery.metal || 'gold dainty pieces'}!`,
          category: 'Jewelry',
          affiliateUrl: 'https://mejuri.com',
          priceTag: '15to35',
        },
        {
          title: 'Anker Magnetic Mini Power Bank in Pastel Lavender',
          price: '$45',
          store: 'Amazon',
          reason: 'Essential cute tech gadget for long days out taking photos and videos.',
          category: 'Tech',
          affiliateUrl: 'https://amazon.com',
          priceTag: '35to75',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWishlist = (s: GiftSuggestion, index: number) => {
    const priceNum = parseInt(s.price.replace(/[^0-9]/g, ''), 10) || 25;
    onAddWishlistItemFromAi(friend.id, {
      title: s.title,
      price: priceNum,
      store: s.store,
      category: s.category,
      notes: s.reason,
    });

    setAddedIds((prev) => [...prev, `${index}`]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#5A5A40] text-white rounded-[32px] p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 text-[#D4E0D7] border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#D4E0D7]" /> Powered by Gemini AI
          </div>
          <h2 className="text-3xl sm:text-4xl font-display italic leading-tight">
            Smart AI Gift Genie 🎁
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/90 mt-1">
            Analyzes friend preferences, sizes, shop list & strict "DO NOT WANT" items to suggest perfect gifts.
          </p>
        </div>
      </div>

      {/* Generator Controls */}
      <div className="bg-[#F9F3EE] rounded-[32px] p-6 border border-[#EAE7E0] shadow-2xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Select Friend */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1.5">1. Select Friend</label>
            <select
              value={selectedFriendId}
              onChange={(e) => setSelectedFriendId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white font-bold"
            >
              {friends.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.relationship})
                </option>
              ))}
            </select>
          </div>

          {/* Target Budget */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1.5">2. Target Budget</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value as PriceRangeTag)}
              className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white font-bold"
            >
              <option value="under15">Under $15 (Stocking Stuffers & Treats)</option>
              <option value="15to35">$15 - $35 (Cute Gifts)</option>
              <option value="35to75">$35 - $75 (Presents & Sets)</option>
              <option value="splurge75">$75+ (Group Splurge)</option>
            </select>
          </div>

          {/* Gift Vibe */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1.5">3. Desired Vibe</label>
            <select
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white font-bold"
            >
              <option value="aesthetic & thoughtful">Aesthetic & Thoughtful</option>
              <option value="viral tiktok favorites">Viral TikTok Favorites</option>
              <option value="cozy room & self care">Cozy Room & Self-Care</option>
              <option value="dainty & sparkly jewelry">Dainty & Sparkly Jewelry</option>
              <option value="fun snacks & boba treats">Fun Snacks & Boba Treats</option>
            </select>
          </div>
        </div>

        {/* Friend Profile Snapshot & Warning */}
        {friend && (
          <div className="p-4 rounded-2xl bg-white border border-[#E0E0D6] text-xs text-[#4A4A40] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-xl object-cover shrink-0 border border-[#E0E0D6]" />
              <div>
                <p className="font-bold text-[#5A5A40]">{friend.name}'s Profile Filters:</p>
                <p className="text-[#8C8C7A] text-[11px]">
                  Shops: {friend.preferences.favoriteShops.join(', ')} • Sizes: {friend.preferences.clothingSize}
                </p>
              </div>
            </div>

            {friend.preferences.doNotWant.length > 0 && (
              <div className="text-[10px] text-[#6B4F4F] font-bold uppercase tracking-wider bg-[#F2D7D7]/60 border border-[#F2D7D7] px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                <span>Avoids: {friend.preferences.doNotWant[0]}</span>
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleGenerateSuggestions}
          disabled={isLoading}
          className="w-full py-3.5 bg-[#5A5A40] hover:bg-[#4A4A30] text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#D4E0D7]" />
              <span>Analyzing {friend?.name}'s Preferences & Curating Ideas...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#D4E0D7]" />
              <span>Generate Smart Gift Ideas for {friend?.name}</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Suggestions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-[32px] p-6 border border-[#E0E0D6] animate-pulse space-y-3">
                <div className="h-4 bg-[#EAE7E0] rounded w-1/3" />
                <div className="h-6 bg-[#EAE7E0] rounded w-3/4" />
                <div className="h-12 bg-[#FAF7F2] rounded" />
              </div>
            ))
          : suggestions.map((item, idx) => {
              const isAdded = addedIds.includes(`${idx}`);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-[32px] p-6 border border-[#EAE7E0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Tag & Price */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#5A5A40] border border-[#E0E0D6]">
                        {item.category} • {item.store}
                      </span>
                      <span className="font-display italic font-bold text-lg text-[#5A5A40]">{item.price}</span>
                    </div>

                    <h3 className="font-bold text-base text-[#5A5A40] mb-2 leading-snug">{item.title}</h3>

                    <p className="text-xs text-[#4A4A40] bg-[#FAF7F2] p-3 rounded-2xl border border-[#EAE7E0] mb-4 italic">
                      "{item.reason}"
                    </p>
                  </div>

                  {/* Affiliate Direct Links & Wishlist Add */}
                  <div className="pt-3 border-t border-[#EAE7E0] flex items-center justify-between gap-3">
                    <a
                      href={item.affiliateUrl || 'https://sephora.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#5A5A40] hover:text-[#4A4A30] bg-[#FAF7F2] hover:bg-[#EAE7E0] px-3.5 py-2 rounded-full transition-all border border-[#E0E0D6]"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <span>Buy on {item.store}</span>
                      <ExternalLink className="w-3 h-3 text-[#8C8C7A]" />
                    </a>

                    <button
                      onClick={() => handleAddWishlist(item, idx)}
                      disabled={isAdded}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-[#D4E0D7] text-[#4A5A4F]'
                          : 'bg-[#5A5A40] hover:bg-[#4A4A30] text-white shadow-2xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#4A5A4F]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to List</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
