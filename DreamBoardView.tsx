import React, { useState } from 'react';
import { Bookmark, Sparkles, Plus, ExternalLink, Filter, DollarSign, Tag, Heart } from 'lucide-react';
import { DreamBoardItem, PriceRangeTag } from '../types';

interface DreamBoardViewProps {
  items: DreamBoardItem[];
  onAddItem: (newItem: DreamBoardItem) => void;
}

export const DreamBoardView: React.FC<DreamBoardViewProps> = ({ items, onAddItem }) => {
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<PriceRangeTag | 'all'>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Pin State
  const [newTitle, setNewTitle] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newPrice, setNewPrice] = useState<number | ''>('');
  const [newCategory, setNewCategory] = useState<DreamBoardItem['boardCategory']>('Beauty & Glow');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Filter items
  const filteredItems = items.filter((item) => {
    if (selectedPriceFilter !== 'all' && item.priceRangeTag !== selectedPriceFilter) return false;
    if (selectedCategoryFilter !== 'all' && item.boardCategory !== selectedCategoryFilter) return false;
    return true;
  });

  const handleAddPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newMediaUrl) return;

    const priceNum = typeof newPrice === 'number' ? newPrice : 0;
    let priceRangeTag: PriceRangeTag = 'under15';
    if (priceNum >= 75) priceRangeTag = 'splurge75';
    else if (priceNum >= 35) priceRangeTag = '35to75';
    else if (priceNum >= 15) priceRangeTag = '15to35';

    const newItem: DreamBoardItem = {
      id: `db-${Date.now()}`,
      title: newTitle,
      type: 'photo',
      mediaUrl: newMediaUrl,
      price: priceNum,
      priceRangeTag,
      boardCategory: newCategory,
      linkUrl: newLinkUrl || undefined,
      notes: newNotes || undefined,
    };

    onAddItem(newItem);
    setShowAddModal(false);

    // Reset Form
    setNewTitle('');
    setNewMediaUrl('');
    setNewPrice('');
    setNewNotes('');
    setNewLinkUrl('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-[#F9F3EE] rounded-[32px] p-6 border border-[#EAE7E0] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display italic text-[#5A5A40] flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-[#5A5A40]" />
            <span>The Moodboard (Dream Pins)</span>
          </h2>
          <p className="text-xs text-[#8C8C7A] mt-0.5 uppercase tracking-widest text-[10px]">
            Organized gift inspo, screenshots & web finds filtered by budget
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A30] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-2xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Save Pin</span>
        </button>
      </div>

      {/* Filter Chips Bar */}
      <div className="bg-white rounded-full p-2.5 border border-[#E0E0D6] shadow-2xs space-y-3">
        {/* Price Tier Filters */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs px-2">
          <span className="font-bold text-[#8C8C7A] text-[10px] uppercase tracking-widest shrink-0 mr-1">Price Range:</span>
          <button
            onClick={() => setSelectedPriceFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedPriceFilter === 'all'
                ? 'bg-[#5A5A40] text-white shadow-2xs'
                : 'bg-[#FAF7F2] text-[#8C8C7A] hover:bg-[#EAE7E0]'
            }`}
          >
            All Prices
          </button>
          <button
            onClick={() => setSelectedPriceFilter('under15')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedPriceFilter === 'under15'
                ? 'bg-[#4A5A4F] text-white shadow-2xs'
                : 'bg-[#D4E0D7]/50 text-[#4A5A4F] hover:bg-[#D4E0D7]'
            }`}
          >
            Under $15
          </button>
          <button
            onClick={() => setSelectedPriceFilter('15to35')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedPriceFilter === '15to35'
                ? 'bg-[#5A5A40] text-white shadow-2xs'
                : 'bg-[#E7DFF2]/50 text-[#5A5A40] hover:bg-[#E7DFF2]'
            }`}
          >
            $15 - $35
          </button>
          <button
            onClick={() => setSelectedPriceFilter('35to75')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedPriceFilter === '35to75'
                ? 'bg-[#6B4F4F] text-white shadow-2xs'
                : 'bg-[#F2D7D7]/50 text-[#6B4F4F] hover:bg-[#F2D7D7]'
            }`}
          >
            $35 - $75
          </button>
          <button
            onClick={() => setSelectedPriceFilter('splurge75')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedPriceFilter === 'splurge75'
                ? 'bg-[#5A5A40] text-white shadow-2xs'
                : 'bg-[#FAF7F2] text-[#5A5A40] hover:bg-[#EAE7E0]'
            }`}
          >
            $75+ Splurge
          </button>
        </div>
      </div>

      {/* Pins Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-[32px] border border-dashed border-[#E0E0D6]">
            <Bookmark className="w-8 h-8 text-[#8C8C7A] mx-auto mb-2" />
            <p className="text-sm font-bold text-[#5A5A40]">No pins match this filter</p>
            <p className="text-xs text-[#8C8C7A] mt-1">Try switching filters or add a new pin above!</p>
          </div>
        ) : (
          filteredItems.map((pin) => (
            <div
              key={pin.id}
              className="bg-white rounded-[32px] overflow-hidden border border-[#EAE7E0] shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Media Image Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={pin.mediaUrl}
                    alt={pin.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#5A5A40] shadow-2xs border border-white">
                    {pin.boardCategory}
                  </div>

                  {pin.price && (
                    <div className="absolute bottom-3 right-3 bg-[#5A5A40]/90 backdrop-blur-md text-white px-3 py-1 rounded-full font-display italic text-sm shadow-2xs">
                      ${pin.price}
                    </div>
                  )}
                </div>

                {/* Body Details */}
                <div className="p-5">
                  <h3 className="font-bold text-sm text-[#5A5A40] leading-snug">{pin.title}</h3>
                  {pin.notes && <p className="text-xs text-[#8C8C7A] mt-1 italic">"{pin.notes}"</p>}
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="px-5 pb-5 pt-2 border-t border-[#EAE7E0] flex items-center justify-between text-xs">
                <span className="font-bold text-[#4A5A4F] text-[10px] uppercase tracking-wider bg-[#D4E0D7] px-3 py-0.5 rounded-full">
                  {pin.priceRangeTag === 'under15'
                    ? 'Under $15'
                    : pin.priceRangeTag === '15to35'
                    ? '$15-$35'
                    : pin.priceRangeTag === '35to75'
                    ? '$35-$75'
                    : '$75+'}
                </span>

                {pin.linkUrl && (
                  <a
                    href={pin.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#8C8C7A] hover:text-[#5A5A40] font-semibold text-xs uppercase tracking-wider text-[10px]"
                  >
                    <span>Web Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Save Pin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#4A4A40]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] rounded-[32px] max-w-md w-full p-6 border border-[#EAE7E0] shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#8C8C7A] hover:text-[#5A5A40] font-bold p-1 cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-2xl font-display italic text-[#5A5A40] mb-1">
              Save New Dream Pin 📌
            </h3>
            <p className="text-xs text-[#8C8C7A] mb-5">
              Save trends, screenshots, or photos with prices to your board.
            </p>

            <form onSubmit={handleAddPin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Title / Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TikTok Viral Bow Hair Clips"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Price ($)</label>
                  <input
                    type="number"
                    placeholder="24"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3.5 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
                  >
                    <option value="Beauty & Glow">Beauty & Glow</option>
                    <option value="Fashion & Style">Fashion & Style</option>
                    <option value="Room & Cozy">Room & Cozy</option>
                    <option value="Jewelry & Sparkle">Jewelry & Sparkle</option>
                    <option value="Tasty Treats">Tasty Treats</option>
                    <option value="Random Obsessions">Random Obsessions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Store Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Saw this on TikTok, so cute!"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-full border border-[#E0E0D6] focus:outline-none focus:border-[#5A5A40] text-xs text-[#4A4A40] bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A30] text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-2xs transition-all cursor-pointer mt-2"
              >
                Save Pin 📌
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
