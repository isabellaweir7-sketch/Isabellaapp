import React, { useState } from 'react';
import { FriendProfile } from '../types';
import { getZodiacSign } from '../utils/dateUtils';

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFriend: (newFriend: FriendProfile) => void;
}

export const AddFriendModal: React.FC<AddFriendModalProps> = ({ isOpen, onClose, onAddFriend }) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<FriendProfile['relationship']>('Bestie');
  const [birthday, setBirthday] = useState('2008-08-20');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [favoriteShops, setFavoriteShops] = useState('Glossier, Sephora, Lululemon');
  const [favoriteSnacks, setFavoriteSnacks] = useState('Matcha Pocky, Dried Mango');
  const [clothingSize, setClothingSize] = useState('Small');
  const [shoeSize, setShoeSize] = useState('7.5 US');
  const [doNotWant, setDoNotWant] = useState('NO silver jewellery, NO scented candles');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthday) return;

    const zodiacSign = getZodiacSign(birthday);

    const newFriend: FriendProfile = {
      id: `friend-${Date.now()}`,
      name,
      avatar:
        avatarUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      relationship,
      birthday,
      zodiacSign,
      bio: bio || 'Love coffee runs & cute birthday gifts ✨',
      theme: {
        color: '#FDF2F4',
        accentColor: '#FB7185',
        pattern: 'y2k-hearts',
        unlocked: true,
      },
      preferences: {
        favoriteColors: ['Pastel Pink', 'Sage Green'],
        favoriteSnacks: favoriteSnacks.split(',').map((s) => s.trim()),
        favoriteDrinks: ['Iced Oat Latte'],
        favoriteShops: favoriteShops.split(',').map((s) => s.trim()),
        favoriteFlowers: ['Peonies'],
        clothingSize,
        shoeSize,
        jewellery: {
          metal: '14k Gold',
          style: 'Dainty huggie hoops',
        },
        allergies: [],
        doNotWant: doNotWant ? doNotWant.split(',').map((s) => s.trim()) : [],
        hobbies: ['Thriting', 'Pilates'],
      },
      notes: [],
      wishlistItems: [],
      dreamBoardItems: [],
      reminderEnabled: true,
      reminderDaysBefore: 14,
    };

    onAddFriend(newFriend);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#4A4A40]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-[32px] max-w-lg w-full p-6 sm:p-8 border border-[#EAE7E0] shadow-2xl relative animate-scale-up max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8C8C7A] hover:text-[#5A5A40] font-bold p-1 cursor-pointer"
        >
          ✕
        </button>

        <h3 className="text-2xl font-display italic text-[#5A5A40] mb-1">
          Add Bestie or Relative 💕
        </h3>
        <p className="text-xs text-[#8C8C7A] mb-5">
          Enter their birthday & gift preferences so you always know what to get!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mia Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Relationship</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              >
                <option value="Bestie">Bestie</option>
                <option value="Sister">Sister</option>
                <option value="Partner">Partner</option>
                <option value="Friend">Friend</option>
                <option value="Cousin">Cousin</option>
                <option value="Mom">Mom</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Birthday Date *</label>
              <input
                type="date"
                required
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Avatar URL (Optional)</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Short Bio / Aesthetic Vibe</label>
            <input
              type="text"
              placeholder="e.g. Matcha addict, pilates & film photos"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Fav Shops (Comma separated)</label>
              <input
                type="text"
                placeholder="Glossier, Sephora, Lululemon"
                value={favoriteShops}
                onChange={(e) => setFavoriteShops(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Fav Snacks</label>
              <input
                type="text"
                placeholder="Matcha Pocky, Dried Mango"
                value={favoriteSnacks}
                onChange={(e) => setFavoriteSnacks(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Clothing Size</label>
              <input
                type="text"
                placeholder="Top: S | Pants: 26"
                value={clothingSize}
                onChange={(e) => setClothingSize(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Shoe Size</label>
              <input
                type="text"
                placeholder="7.5 US"
                value={shoeSize}
                onChange={(e) => setShoeSize(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6B4F4F] mb-1">🚫 DO NOT WANT List (Comma separated)</label>
            <input
              type="text"
              placeholder="NO silver jewellery, NO scented candles"
              value={doNotWant}
              onChange={(e) => setDoNotWant(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[#F2D7D7] focus:outline-none focus:border-rose-400 text-xs text-[#4A4A40] bg-[#F2D7D7]/30"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A30] text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-2xs transition-all cursor-pointer mt-2"
          >
            Create Profile & Start Countdown 🎂
          </button>
        </form>
      </div>
    </div>
  );
};
