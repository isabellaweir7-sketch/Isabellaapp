import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Bookmark, Gift, Trophy, Bell, Plus, Cake, Heart } from 'lucide-react';
import { FriendProfile, UserGiverProgress } from '../types';
import { calculateCountdown } from '../utils/dateUtils';

interface HeaderProps {
  activeTab: 'birthdays' | 'profiles' | 'dreamboard' | 'giftgenie' | 'badges';
  setActiveTab: (tab: 'birthdays' | 'profiles' | 'dreamboard' | 'giftgenie' | 'badges') => void;
  friends: FriendProfile[];
  userProgress: UserGiverProgress;
  onOpenAddFriend: () => void;
  onSelectFriend: (friendId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  friends,
  userProgress,
  onOpenAddFriend,
  onSelectFriend,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Calculate upcoming birthdays for reminder bell
  const upcomingReminders = friends
    .map((f) => ({
      friend: f,
      countdown: calculateCountdown(f.birthday),
    }))
    .sort((a, b) => a.countdown.totalDays - b.countdown.totalDays);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EAE7E0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4E0D7] rounded-full flex items-center justify-center shadow-2xs">
              <Cake className="w-5 h-5 text-[#5A5A40]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-display italic font-bold tracking-tight text-[#5A5A40]">
                  WishList
                </span>
                <span className="text-[10px] bg-[#F2D7D7] text-[#6B4F4F] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#6B4F4F]" /> Besties
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#8C8C7A] font-semibold hidden sm:block">Natural Tones • Birthday Registry</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#EAE7E0]/60 p-1.5 rounded-full border border-[#D1CDC3]/50">
            <button
              onClick={() => setActiveTab('birthdays')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'birthdays'
                  ? 'bg-white text-[#5A5A40] shadow-2xs'
                  : 'text-[#8C8C7A] hover:text-[#5A5A40] hover:bg-white/50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>Countdowns</span>
            </button>

            <button
              onClick={() => setActiveTab('profiles')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'profiles'
                  ? 'bg-white text-[#5A5A40] shadow-2xs'
                  : 'text-[#8C8C7A] hover:text-[#5A5A40] hover:bg-white/50'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>Profiles</span>
            </button>

            <button
              onClick={() => setActiveTab('dreamboard')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'dreamboard'
                  ? 'bg-white text-[#5A5A40] shadow-2xs'
                  : 'text-[#8C8C7A] hover:text-[#5A5A40] hover:bg-white/50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>Moodboard</span>
            </button>

            <button
              onClick={() => setActiveTab('giftgenie')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'giftgenie'
                  ? 'bg-[#5A5A40] text-white shadow-2xs'
                  : 'text-[#8C8C7A] hover:text-[#5A5A40] hover:bg-white/50'
              }`}
            >
              <Gift className="w-4 h-4 text-amber-300" />
              <span>AI Gift Genie</span>
            </button>

            <button
              onClick={() => setActiveTab('badges')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'badges'
                  ? 'bg-white text-[#5A5A40] shadow-2xs'
                  : 'text-[#8C8C7A] hover:text-[#5A5A40] hover:bg-white/50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>Badges</span>
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5">
            {/* Reminders Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all border border-slate-200"
                title="Birthday Reminders"
              >
                <Bell className="w-5 h-5 text-rose-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {friends.length}
                </span>
              </button>

              {/* Reminders Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-rose-100 p-4 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-rose-500" /> Automatic Reminders
                    </h4>
                    <span className="text-[11px] text-rose-600 font-medium bg-rose-50 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                    {upcomingReminders.map(({ friend, countdown }) => (
                      <div
                        key={friend.id}
                        onClick={() => {
                          onSelectFriend(friend.id);
                          setActiveTab('profiles');
                          setShowNotifications(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 transition-colors cursor-pointer flex items-center justify-between border border-slate-100"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-8 h-8 rounded-full object-cover border border-rose-200"
                          />
                          <div>
                            <p className="text-xs font-semibold text-slate-800">{friend.name}</p>
                            <p className="text-[10px] text-slate-500">
                              {friend.relationship} • Likes {friend.preferences.favoriteSnacks[0] || 'treats'}
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-rose-600 bg-white px-2 py-1 rounded-lg border border-rose-100 shadow-2xs">
                          {countdown.isToday
                            ? 'TODAY! 🎂'
                            : countdown.days === 0
                            ? 'Tomorrow!'
                            : `In ${countdown.days}d`}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-center text-slate-400 mt-3 pt-2 border-t border-slate-100">
                    Notifications trigger 14 days, 3 days & on the birthday 🎉
                  </p>
                </div>
              )}
            </div>

            {/* Giver Level Pill */}
            <div className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/60 px-3 py-1.5 rounded-xl">
              <span className="text-xs">🏆</span>
              <div className="text-[11px]">
                <span className="font-bold text-amber-800">Lvl {userProgress.giverLevel} Giver</span>
              </div>
            </div>

            {/* Add Friend Button */}
            <button
              onClick={onOpenAddFriend}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Bestie</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('birthdays')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
              activeTab === 'birthdays' ? 'text-rose-600' : 'text-slate-500'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Countdowns</span>
          </button>
          <button
            onClick={() => setActiveTab('profiles')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
              activeTab === 'profiles' ? 'text-purple-600' : 'text-slate-500'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Profiles</span>
          </button>

          <button
            onClick={() => setActiveTab('dreamboard')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
              activeTab === 'dreamboard' ? 'text-emerald-600' : 'text-slate-500'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Moodboard</span>
          </button>

          <button
            onClick={() => setActiveTab('giftgenie')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
              activeTab === 'giftgenie' ? 'text-amber-600' : 'text-slate-500'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>AI Genie</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
              activeTab === 'badges' ? 'text-amber-600' : 'text-slate-500'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Badges</span>
          </button>
        </div>
      </div>
    </header>
  );
};
