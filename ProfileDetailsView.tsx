import React, { useState } from 'react';
import {
  Sparkles,
  Gift,
  Heart,
  Palette,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Plus,
  Lock,
  Copy,
  Check,
  Tag,
  ExternalLink,
  MessageSquare,
  Cake,
  Shirt,
  Calendar,
  Users,
} from 'lucide-react';
import { FriendProfile, WishlistItem, WhispersNote } from '../types';
import { getPatternStyle, PASTEL_THEMES, PROFILE_PATTERNS } from '../utils/themeUtils';
import { formatBirthdayFull, getZodiacSign } from '../utils/dateUtils';

interface ProfileDetailsViewProps {
  friend: FriendProfile;
  onUpdateFriend: (updatedFriend: FriendProfile) => void;
  onOpenAddWishlistItem: (friendId: string) => void;
  onOpenGiftGenie: (friend: FriendProfile) => void;
  userGiverLevel: number;
}

export const ProfileDetailsView: React.FC<ProfileDetailsViewProps> = ({
  friend,
  onUpdateFriend,
  onOpenAddWishlistItem,
  onOpenGiftGenie,
  userGiverLevel,
}) => {
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [copiedSize, setCopiedSize] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');

  const pattern = getPatternStyle(friend.theme.pattern, friend.theme.color);

  // Claim or Unclaim Item
  const handleToggleClaim = (itemId: string) => {
    const updatedWishlist = friend.wishlistItems.map((item) => {
      if (item.id === itemId) {
        const isClaimedByMe = item.claimedBy === 'Sophia';
        return {
          ...item,
          claimedBy: isClaimedByMe ? null : 'Sophia',
          claimedStatus: isClaimedByMe ? ('unclaimed' as const) : ('claimed' as const),
        };
      }
      return item;
    });

    onUpdateFriend({
      ...friend,
      wishlistItems: updatedWishlist,
    });
  };

  // Add Whisper Note
  const handleAddWhisperNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;

    const newNote: WhispersNote = {
      id: `note-${Date.now()}`,
      content: newNoteContent.trim(),
      dateAdded: 'Just now',
      authorName: 'Sophia',
    };

    onUpdateFriend({
      ...friend,
      notes: [newNote, ...friend.notes],
    });

    setNewNoteContent('');
  };

  // Copy Clothing & Shoe Size
  const handleCopySizes = () => {
    const text = `Size Info for ${friend.name}: ${friend.preferences.clothingSize} | Shoe: ${friend.preferences.shoeSize}`;
    navigator.clipboard.writeText(text);
    setCopiedSize(true);
    setTimeout(() => setCopiedSize(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Profile Header Hero Card */}
      <div
        style={{ background: pattern.background }}
        className="rounded-[32px] p-6 sm:p-8 border border-[#EAE7E0] shadow-2xs relative overflow-hidden transition-all"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-[24px] object-cover border-4 border-white shadow-2xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-display italic text-[#5A5A40] leading-none">
                  {friend.name}
                </h1>
                <span className="px-3 py-1 rounded-full bg-white/90 text-[#5A5A40] text-[10px] font-bold uppercase tracking-wider border border-[#E0E0D6] shadow-2xs">
                  {friend.relationship}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#8C8C7A] mt-1.5 flex items-center gap-2">
                <Cake className="w-4 h-4 text-[#5A5A40]" />
                <span className="font-bold text-[#5A5A40]">{formatBirthdayFull(friend.birthday)}</span>
                <span>•</span>
                <span className="font-semibold">{friend.zodiacSign}</span>
              </p>

              <p className="text-xs text-[#5A5A40] italic mt-2 bg-white/70 px-3 py-1 rounded-full inline-block border border-white/80">
                "{friend.bio}"
              </p>
            </div>
          </div>

          {/* Customize Theme Button & AI Genie CTA */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setShowThemeModal(true)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#FAF7F2] text-[#5A5A40] text-xs font-bold uppercase tracking-wider rounded-full border border-[#E0E0D6] shadow-2xs transition-all cursor-pointer flex-1 sm:flex-initial"
            >
              <Palette className="w-4 h-4 text-[#5A5A40]" />
              <span>Profile Vibe</span>
            </button>

            <button
              onClick={() => onOpenGiftGenie(friend)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A30] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-2xs transition-all cursor-pointer flex-1 sm:flex-initial"
            >
              <Gift className="w-4 h-4 text-[#D4E0D7]" />
              <span>Surprise Ideas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Grid ("The Bestie Blueprint") */}
      <div className="bg-[#F9F3EE] rounded-[32px] p-6 sm:p-8 border border-[#EAE7E0] shadow-2xs">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EAE7E0]">
          <div>
            <h2 className="text-2xl font-display italic text-[#5A5A40] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#5A5A40]" />
              <span>The Bestie Blueprint & Sizes</span>
            </h2>
            <p className="text-xs text-[#8C8C7A] mt-0.5 uppercase tracking-widest text-[10px]">
              Everything you need to know before buying a gift
            </p>
          </div>

          <button
            onClick={handleCopySizes}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#FAF7F2] text-[#5A5A40] text-xs font-bold uppercase tracking-wider transition-all border border-[#E0E0D6] cursor-pointer"
          >
            {copiedSize ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#8C8C7A]" />}
            <span>{copiedSize ? 'Sizes Copied!' : 'Copy Sizes'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sizes Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE7E0]">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#5A5A40] flex items-center gap-1.5 mb-2">
              <Shirt className="w-4 h-4 text-[#5A5A40]" /> Clothing & Shoe Size
            </h3>
            <div className="text-xs text-[#4A4A40] space-y-1">
              <p><strong>Clothes:</strong> {friend.preferences.clothingSize}</p>
              <p><strong>Shoes:</strong> {friend.preferences.shoeSize}</p>
            </div>
          </div>

          {/* Favorite Shops */}
          <div className="p-4 rounded-2xl bg-[#D4E0D7]/40 border border-[#D4E0D7]">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#4A5A4F] flex items-center gap-1.5 mb-2">
              <ShoppingBag className="w-4 h-4 text-[#4A5A4F]" /> Favorite Shops & Brands
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {friend.preferences.favoriteShops.map((shop, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-full bg-white text-[#4A5A4F] text-xs font-semibold border border-[#D4E0D7]">
                  {shop}
                </span>
              ))}
            </div>
          </div>

          {/* Favorite Snacks & Drinks */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE7E0]">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#5A5A40] flex items-center gap-1.5 mb-2">
              🍿 Snacks & Drinks
            </h3>
            <div className="text-xs text-[#4A4A40] space-y-1">
              <p><strong>Snacks:</strong> {friend.preferences.favoriteSnacks.join(', ')}</p>
              <p><strong>Drinks:</strong> {friend.preferences.favoriteDrinks.join(', ')}</p>
            </div>
          </div>

          {/* Jewellery Preferences */}
          <div className="p-4 rounded-2xl bg-[#E7DFF2]/40 border border-[#E7DFF2]">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#5A5A40] flex items-center gap-1.5 mb-2">
              ✨ Jewellery Preferences
            </h3>
            <div className="text-xs text-[#4A4A40] space-y-1">
              <p><strong>Metal:</strong> {friend.preferences.jewellery.metal}</p>
              <p><strong>Style:</strong> {friend.preferences.jewellery.style}</p>
            </div>
          </div>

          {/* Favorite Colors & Flowers */}
          <div className="p-4 rounded-2xl bg-[#F2D7D7]/40 border border-[#F2D7D7]">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6B4F4F] flex items-center gap-1.5 mb-2">
              🌸 Colors & Flowers
            </h3>
            <div className="text-xs text-[#4A4A40] space-y-1">
              <p><strong>Colors:</strong> {friend.preferences.favoriteColors.join(', ')}</p>
              <p><strong>Flowers:</strong> {friend.preferences.favoriteFlowers.join(', ')}</p>
            </div>
          </div>

          {/* Allergies & Sensitivities */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE7E0]">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#8C8C7A] flex items-center gap-1.5 mb-2">
              🩺 Allergies / Sensitivities
            </h3>
            <div className="text-xs text-[#4A4A40]">
              {friend.preferences.allergies.length > 0 ? (
                <ul className="list-disc list-inside space-y-0.5">
                  {friend.preferences.allergies.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#8C8C7A]">None logged</p>
              )}
            </div>
          </div>
        </div>

        {/* STRICT "DO NOT WANT" WARNING BOX */}
        {friend.preferences.doNotWant.length > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-[#F2D7D7]/60 border border-[#F2D7D7]">
            <h3 className="text-[10px] font-bold text-[#6B4F4F] uppercase tracking-widest flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-rose-700" />
              <span>STRICT "DO NOT WANT" LIST (Avoid these!)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6B4F4F] font-medium">
              {friend.preferences.doNotWant.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/90 p-2 rounded-xl border border-[#F2D7D7]">
                  <span className="text-rose-600 font-bold">🚫</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Wishlist Items & Claiming Section */}
      <div className="bg-[#F9F3EE] rounded-[32px] p-6 sm:p-8 border border-[#EAE7E0] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE7E0]">
          <div>
            <h2 className="text-2xl font-display italic text-[#5A5A40] flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#5A5A40]" />
              <span>Wishlist & Gift Claiming</span>
            </h2>
            <p className="text-xs text-[#8C8C7A] mt-0.5 flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#5A5A40]" />
              <span className="text-[#5A5A40] font-bold">Surprise Safe:</span> Claimed status is invisible to {friend.name}!
            </p>
          </div>

          <button
            onClick={() => onOpenAddWishlistItem(friend.id)}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A30] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {friend.wishlistItems.map((item) => {
            const isClaimedByMe = item.claimedBy === 'Sophia';
            const isClaimedByOther = item.claimedBy && item.claimedBy !== 'Sophia';

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isClaimedByMe
                    ? 'bg-[#D4E0D7]/60 border-[#D4E0D7] shadow-2xs'
                    : isClaimedByOther
                    ? 'bg-white/60 border-[#E0E0D6] opacity-70'
                    : 'bg-white border-[#EAE7E0] hover:border-[#5A5A40] shadow-2xs'
                }`}
              >
                <div>
                  {/* Top Category & Price */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#8C8C7A] border border-[#E0E0D6]">
                      {item.category}
                    </span>
                    <span className="text-base font-display italic font-bold text-[#5A5A40]">
                      ${item.price}
                    </span>
                  </div>

                  {/* Image & Info */}
                  <div className="flex items-start gap-3.5 mb-3">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover border border-[#E0E0D6] shrink-0"
                      />
                    )}
                    <div>
                      <h4 className="font-bold text-sm text-[#5A5A40] leading-snug">{item.title}</h4>
                      <p className="text-xs text-[#8C8C7A] flex items-center gap-1 mt-0.5">
                        <Tag className="w-3 h-3 text-[#8C8C7A]" />
                        <span>{item.store}</span>
                      </p>
                      {item.notes && (
                        <p className="text-[11px] text-[#4A4A40] italic mt-1">"{item.notes}"</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Claiming Controls */}
                <div className="pt-3 border-t border-[#EAE7E0] flex items-center justify-between gap-2 mt-2">
                  <div className="text-xs">
                    {isClaimedByMe ? (
                      <span className="text-[#4A5A4F] font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-[#4A5A4F]" /> Claimed by You!
                      </span>
                    ) : isClaimedByOther ? (
                      <span className="text-[#8C8C7A] font-medium text-[11px]">
                        Reserved by {item.claimedBy}
                      </span>
                    ) : item.claimedStatus === 'chipping_in' ? (
                      <span className="text-[#5A5A40] font-semibold text-[10px] uppercase tracking-wider bg-[#E7DFF2]/60 px-2 py-0.5 rounded-full border border-[#E7DFF2]">
                        Chipping in ({item.chipInCount || 2} friends)
                      </span>
                    ) : (
                      <span className="text-[#8C8C7A] font-medium text-[11px] uppercase tracking-wider">Unclaimed</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-[#8C8C7A] hover:text-[#5A5A40] rounded-lg hover:bg-white transition-all"
                        title="Open Store Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      onClick={() => handleToggleClaim(item.id)}
                      disabled={Boolean(isClaimedByOther)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isClaimedByMe
                          ? 'bg-[#4A5A4F] text-white'
                          : isClaimedByOther
                          ? 'bg-[#EAE7E0] text-[#8C8C7A] cursor-not-allowed'
                          : 'bg-[#5A5A40] hover:bg-[#4A4A30] text-white shadow-2xs'
                      }`}
                    >
                      {isClaimedByMe ? 'Release' : isClaimedByOther ? 'Reserved' : 'Claim Gift 🎁'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "Whispers & Mentions" Notes Section */}
      <div className="bg-[#F9F3EE] rounded-[32px] p-6 sm:p-8 border border-[#EAE7E0] shadow-2xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EAE7E0]">
          <div>
            <h2 className="text-2xl font-display italic text-[#5A5A40] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#5A5A40]" />
              <span>Whispers & Mentions Log</span>
            </h2>
            <p className="text-xs text-[#8C8C7A] mt-0.5">
              Log casual hints she mentioned in conversation (e.g. "Loved the lip balm in Sephora")
            </p>
          </div>
        </div>

        {/* Add Whisper Note Form */}
        <form onSubmit={handleAddWhisperNote} className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder={`Log something ${friend.name} mentioned in passing...`}
            className="flex-1 px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A30] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-2xs transition-all cursor-pointer"
          >
            Add Mention
          </button>
        </form>

        {/* Mention Notes List */}
        <div className="space-y-3">
          {friend.notes.length === 0 ? (
            <p className="text-xs text-[#8C8C7A] italic text-center py-4">No whispers logged yet. Add one above!</p>
          ) : (
            friend.notes.map((note) => (
              <div key={note.id} className="p-3.5 rounded-2xl bg-white border border-[#E0E0D6] text-xs text-[#4A4A40] flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="font-medium text-[#4A4A40]">"{note.content}"</p>
                  <p className="text-[10px] text-[#8C8C7A] uppercase tracking-wider font-bold">
                    Logged by {note.authorName || 'Sophia'} • {note.dateAdded}
                  </p>
                </div>
                <span className="text-xs">💭</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Theme Customization Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 z-50 bg-[#4A4A40]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] rounded-[32px] max-w-lg w-full p-6 border border-[#EAE7E0] shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setShowThemeModal(false)}
              className="absolute top-4 right-4 text-[#8C8C7A] hover:text-[#5A5A40] font-bold p-1 cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-2xl font-display italic text-[#5A5A40] mb-1">
              Customize {friend.name}'s Profile Vibe 🎨
            </h3>
            <p className="text-xs text-[#8C8C7A] mb-5">
              Choose a distinct natural tones background color and unlockable patterns.
            </p>

            {/* Pastel Color Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#5A5A40] uppercase tracking-wider mb-2">1. Background Color Accent</label>
              <div className="grid grid-cols-3 gap-2">
                {PASTEL_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onUpdateFriend({
                        ...friend,
                        theme: {
                          ...friend.theme,
                          color: theme.color,
                          accentColor: theme.accentColor,
                        },
                      });
                    }}
                    style={{ background: theme.color }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      friend.theme.color === theme.color
                        ? 'border-[#5A5A40] shadow-xs ring-2 ring-[#5A5A40]'
                        : 'border-[#E0E0D6] hover:border-[#8C8C7A]'
                    }`}
                  >
                    <span className="block text-xs font-bold text-[#5A5A40]">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pattern Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#5A5A40] uppercase tracking-wider mb-2">2. Background Pattern Style</label>
              <div className="grid grid-cols-2 gap-2">
                {PROFILE_PATTERNS.map((p) => {
                  const isLocked = p.levelRequired > userGiverLevel;

                  return (
                    <button
                      key={p.id}
                      disabled={isLocked}
                      onClick={() => {
                        onUpdateFriend({
                          ...friend,
                          theme: {
                            ...friend.theme,
                            pattern: p.id as any,
                          },
                        });
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        friend.theme.pattern === p.id
                          ? 'bg-white border-[#5A5A40] text-[#5A5A40]'
                          : isLocked
                          ? 'bg-[#EAE7E0] border-[#E0E0D6] text-[#8C8C7A] cursor-not-allowed opacity-60'
                          : 'bg-white border-[#E0E0D6] hover:border-[#8C8C7A] text-[#4A4A40]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{p.icon}</span>
                        <span className="text-xs font-bold">{p.name}</span>
                      </div>
                      {isLocked && (
                        <span className="text-[10px] text-[#5A5A40] bg-[#D4E0D7] px-1.5 py-0.5 rounded font-bold">
                          Lvl {p.levelRequired}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setShowThemeModal(false)}
              className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A30] text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-2xs transition-all cursor-pointer"
            >
              Done Customizing 💕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
