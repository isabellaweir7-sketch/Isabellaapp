import React, { useState } from 'react';
import { WishlistItem, PriceRangeTag } from '../types';

interface AddWishlistItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: WishlistItem) => void;
}

export const AddWishlistItemModal: React.FC<AddWishlistItemModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [store, setStore] = useState('Sephora');
  const [category, setCategory] = useState('Beauty');
  const [imageUrl, setImageUrl] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<WishlistItem['priority']>('high');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const priceNum = typeof price === 'number' ? price : 25;
    let priceRangeTag: PriceRangeTag = 'under15';
    if (priceNum >= 75) priceRangeTag = 'splurge75';
    else if (priceNum >= 35) priceRangeTag = '35to75';
    else if (priceNum >= 15) priceRangeTag = '15to35';

    const newItem: WishlistItem = {
      id: `wish-${Date.now()}`,
      title,
      price: priceNum,
      priceRangeTag,
      store,
      category,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400',
      url: url || undefined,
      notes: notes || undefined,
      claimedBy: null,
      claimedStatus: 'unclaimed',
      priority,
    };

    onAddItem(newItem);
    onClose();

    // Reset Form
    setTitle('');
    setPrice('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#4A4A40]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-[32px] max-w-md w-full p-6 sm:p-8 border border-[#EAE7E0] shadow-2xl relative animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8C8C7A] hover:text-[#5A5A40] font-bold p-1 cursor-pointer"
        >
          ✕
        </button>

        <h3 className="text-2xl font-display italic text-[#5A5A40] mb-1">
          Add Item to Wishlist 🎁
        </h3>
        <p className="text-xs text-[#8C8C7A] mb-5">
          Add a specific gift idea with price, store, and image.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Gift Title / Item Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sol De Janeiro Body Mist"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Price ($)</label>
              <input
                type="number"
                placeholder="38"
                value={price}
                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Store Name</label>
              <input
                type="text"
                placeholder="Sephora, Glossier, Lululemon"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              >
                <option value="Beauty">Beauty & Skincare</option>
                <option value="Jewelry">Jewelry & Accessories</option>
                <option value="Fashion">Fashion & Shoes</option>
                <option value="Room & Home">Room & Home</option>
                <option value="Tech">Tech & Gadgets</option>
                <option value="Snacks & Treats">Snacks & Treats</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
              >
                <option value="high">High Priority 💕</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Image URL (Optional)</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Store Link (Optional)</label>
            <input
              type="url"
              placeholder="https://sephora.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Note / Description</label>
            <input
              type="text"
              placeholder="e.g. Scent 68 is her favorite!"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A30] text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-2xs transition-all cursor-pointer mt-2"
          >
            Add to Wishlist 🎁
          </button>
        </form>
      </div>
    </div>
  );
};
