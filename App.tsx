import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BirthdayCountdownCard } from './components/BirthdayCountdownCard';
import { BirthdayCalendarView } from './components/BirthdayCalendarView';
import { ProfileDetailsView } from './components/ProfileDetailsView';
import { DreamBoardView } from './components/DreamBoardView';
import { AiGiftSuggestionsView } from './components/AiGiftSuggestionsView';
import { GiverRewardsView } from './components/GiverRewardsView';
import { AddFriendModal } from './components/AddFriendModal';
import { AddWishlistItemModal } from './components/AddWishlistItemModal';
import { FriendProfile, DreamBoardItem, WishlistItem, UserGiverProgress } from './types';
import { INITIAL_PROFILES, INITIAL_USER_PROGRESS } from './data/mockData';
import { Search, Plus, Calendar, Users, Sparkles, Heart, Filter, Cake, Gift } from 'lucide-react';

export default function App() {
  // Load initial state with localStorage support
  const [friends, setFriends] = useState<FriendProfile[]>(() => {
    const saved = localStorage.getItem('wishlist_friends_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved friends', e);
      }
    }
    return INITIAL_PROFILES;
  });

  const [userProgress, setUserProgress] = useState<UserGiverProgress>(() => {
    const saved = localStorage.getItem('wishlist_user_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved progress', e);
      }
    }
    return INITIAL_USER_PROGRESS;
  });

  const [allDreamBoardItems, setAllDreamBoardItems] = useState<DreamBoardItem[]>(() => {
    // Combine dream board items from all friends
    const combined = friends.flatMap((f) => f.dreamBoardItems);
    return combined;
  });

  const [activeTab, setActiveTab] = useState<'birthdays' | 'profiles' | 'dreamboard' | 'giftgenie' | 'badges'>('birthdays');
  const [selectedFriendId, setSelectedFriendId] = useState<string>(friends[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isAddWishlistItemOpen, setIsAddWishlistItemOpen] = useState(false);
  const [targetFriendForWishlist, setTargetFriendForWishlist] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist_friends_data', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('wishlist_user_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const selectedFriend = friends.find((f) => f.id === selectedFriendId) || friends[0];

  // Friend Search Filter
  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.relationship.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.preferences.favoriteShops.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handlers
  const handleSelectFriend = (friendId: string) => {
    setSelectedFriendId(friendId);
  };

  const handleToggleReminder = (friendId: string) => {
    setFriends((prev) =>
      prev.map((f) => (f.id === friendId ? { ...f, reminderEnabled: !f.reminderEnabled } : f))
    );
  };

  const handleAddFriend = (newFriend: FriendProfile) => {
    setFriends((prev) => [newFriend, ...prev]);
    setSelectedFriendId(newFriend.id);
    setActiveTab('profiles');
  };

  const handleUpdateFriend = (updatedFriend: FriendProfile) => {
    setFriends((prev) => prev.map((f) => (f.id === updatedFriend.id ? updatedFriend : f)));
  };

  const handleOpenAddWishlistItem = (friendId: string) => {
    setTargetFriendForWishlist(friendId);
    setIsAddWishlistItemOpen(true);
  };

  const handleAddWishlistItem = (newItem: WishlistItem) => {
    if (!targetFriendForWishlist) return;
    setFriends((prev) =>
      prev.map((f) => {
        if (f.id === targetFriendForWishlist) {
          return {
            ...f,
            wishlistItems: [newItem, ...f.wishlistItems],
          };
        }
        return f;
      })
    );
  };

  const handleAddWishlistItemFromAi = (
    friendId: string,
    item: { title: string; price: number; store: string; category: string; notes: string }
  ) => {
    const newItem: WishlistItem = {
      id: `wish-ai-${Date.now()}`,
      title: item.title,
      price: item.price,
      priceRangeTag:
        item.price >= 75 ? 'splurge75' : item.price >= 35 ? '35to75' : item.price >= 15 ? '15to35' : 'under15',
      store: item.store,
      category: item.category,
      imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400',
      notes: item.notes,
      claimedBy: null,
      claimedStatus: 'unclaimed',
      priority: 'high',
    };

    setFriends((prev) =>
      prev.map((f) => {
        if (f.id === friendId) {
          return {
            ...f,
            wishlistItems: [newItem, ...f.wishlistItems],
          };
        }
        return f;
      })
    );
  };

  const handleAddDreamPin = (newItem: DreamBoardItem) => {
    setAllDreamBoardItems((prev) => [newItem, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#4A4A40] antialiased selection:bg-[#D4E0D7] selection:text-[#5A5A40]">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        friends={friends}
        userProgress={userProgress}
        onOpenAddFriend={() => setIsAddFriendOpen(true)}
        onSelectFriend={handleSelectFriend}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Tab 1: Countdowns & Calendar */}
        {activeTab === 'birthdays' && (
          <div className="space-y-8">
            {/* Top Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F9F3EE] p-4 rounded-[32px] border border-[#EAE7E0] shadow-2xs">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-[#8C8C7A] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search bestie, relationship or favorite store..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#E0E0D6] text-xs focus:outline-none focus:border-[#5A5A40] text-[#4A4A40]"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <span className="text-xs font-semibold text-[#8C8C7A] uppercase tracking-wider text-[10px]">
                  Showing <strong className="text-[#5A5A40]">{filteredFriends.length}</strong> Birthdays
                </span>
                <button
                  onClick={() => setIsAddFriendOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#5A5A40] hover:bg-[#4A4A30] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-2xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Bestie</span>
                </button>
              </div>
            </div>

            {/* Live Countdowns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFriends.map((friend) => (
                <BirthdayCountdownCard
                  key={friend.id}
                  friend={friend}
                  onSelectFriend={(id) => {
                    handleSelectFriend(id);
                    setActiveTab('profiles');
                  }}
                  onOpenGiftGenie={(f) => {
                    handleSelectFriend(f.id);
                    setActiveTab('giftgenie');
                  }}
                  onToggleReminder={handleToggleReminder}
                />
              ))}
            </div>

            {/* Interactive Month View Calendar */}
            <BirthdayCalendarView
              friends={friends}
              onSelectFriend={(id) => {
                handleSelectFriend(id);
                setActiveTab('profiles');
              }}
              onOpenGiftGenie={(f) => {
                handleSelectFriend(f.id);
                setActiveTab('giftgenie');
              }}
            />
          </div>
        )}

        {/* Tab 2: Friend Profiles & Preferences */}
        {activeTab === 'profiles' && (
          <div className="space-y-6">
            {/* Besties Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {friends.map((f) => {
                const isSelected = f.id === selectedFriendId;
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFriendId(f.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-2xs'
                        : 'bg-white text-[#5A5A40] border-[#E0E0D6] hover:bg-[#F9F3EE]'
                    }`}
                  >
                    <img
                      src={f.avatar}
                      alt={f.name}
                      className="w-6 h-6 rounded-full object-cover border border-white"
                    />
                    <span>{f.name}</span>
                    <span className="text-[10px] opacity-70">({f.relationship})</span>
                  </button>
                );
              })}

              <button
                onClick={() => setIsAddFriendOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#F9F3EE] text-[#5A5A40] text-xs font-bold border border-[#E0E0D6] shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>New Profile</span>
              </button>
            </div>

            {/* Detailed Friend View */}
            {selectedFriend && (
              <ProfileDetailsView
                friend={selectedFriend}
                onUpdateFriend={handleUpdateFriend}
                onOpenAddWishlistItem={handleOpenAddWishlistItem}
                onOpenGiftGenie={(f) => {
                  handleSelectFriend(f.id);
                  setActiveTab('giftgenie');
                }}
                userGiverLevel={userProgress.giverLevel}
              />
            )}
          </div>
        )}

        {/* Tab 3: Dream Board */}
        {activeTab === 'dreamboard' && (
          <DreamBoardView items={allDreamBoardItems} onAddItem={handleAddDreamPin} />
        )}

        {/* Tab 4: AI Gift Genie */}
        {activeTab === 'giftgenie' && (
          <AiGiftSuggestionsView
            friends={friends}
            initialSelectedFriend={selectedFriend}
            onAddWishlistItemFromAi={handleAddWishlistItemFromAi}
          />
        )}

        {/* Tab 5: Giver Rewards & Badges */}
        {activeTab === 'badges' && <GiverRewardsView userProgress={userProgress} />}
      </main>

      {/* Modals */}
      <AddFriendModal
        isOpen={isAddFriendOpen}
        onClose={() => setIsAddFriendOpen(false)}
        onAddFriend={handleAddFriend}
      />

      <AddWishlistItemModal
        isOpen={isAddWishlistItemOpen}
        onClose={() => setIsAddWishlistItemOpen(false)}
        onAddItem={handleAddWishlistItem}
      />

      {/* Footer */}
      <footer className="border-t border-[#EAE7E0] bg-[#FAF7F2] py-8 text-center text-xs text-[#8C8C7A] mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-serif italic text-[#5A5A40] text-sm flex items-center justify-center gap-1.5">
            <span>WishList</span> • <span>Natural Tones Aesthetic Edition</span>
          </p>
          <p className="text-[10px] uppercase tracking-widest text-[#8C8C7A]">
            Never guess a gift • Never miss a birthday • Always stay thoughtful
          </p>
        </div>
      </footer>
    </div>
  );
}
