import React, { useState, useEffect } from 'react';
import { Sparkles, Gift, Bell, Heart, ArrowRight, Calendar, AlertCircle } from 'lucide-react';
import { FriendProfile } from '../types';
import { calculateCountdown, formatBirthdayFull, CountdownTime } from '../utils/dateUtils';
import { getPatternStyle } from '../utils/themeUtils';

interface BirthdayCountdownCardProps {
  friend: FriendProfile;
  onSelectFriend: (friendId: string) => void;
  onOpenGiftGenie: (friend: FriendProfile) => void;
  onToggleReminder: (friendId: string) => void;
}

export const BirthdayCountdownCard: React.FC<BirthdayCountdownCardProps> = ({
  friend,
  onSelectFriend,
  onOpenGiftGenie,
  onToggleReminder,
}) => {
  const [time, setTime] = useState<CountdownTime>(() => calculateCountdown(friend.birthday));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateCountdown(friend.birthday));
    }, 1000);
    return () => clearInterval(interval);
  }, [friend.birthday]);

  const pattern = getPatternStyle(friend.theme.pattern, friend.theme.color);

  // Unclaimed wishlist count
  const unclaimedCount = friend.wishlistItems.filter((item) => item.claimedStatus === 'unclaimed').length;
  const doNotWantCount = friend.preferences.doNotWant.length;

  return (
    <div
      style={{ background: pattern.background }}
      className={`relative rounded-[32px] p-6 border border-[#EAE7E0] shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden group`}
    >
      {/* Top Banner Row */}
      <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-14 h-14 rounded-[20px] object-cover border-2 border-white shadow-2xs"
            />
            {time.isToday && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F2D7D7] text-[#6B4F4F] text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-2xs animate-bounce">
                🎂
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-display italic text-[#5A5A40] leading-tight">{friend.name}</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 text-[#5A5A40] border border-[#E0E0D6] shadow-2xs">
                {friend.relationship}
              </span>
            </div>
            <p className="text-xs text-[#8C8C7A] flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>{formatBirthdayFull(friend.birthday)}</span>
              <span className="text-[#D1CDC3]">•</span>
              <span className="font-semibold text-[#5A5A40]">{friend.zodiacSign}</span>
            </p>
          </div>
        </div>

        {/* Reminder Toggle */}
        <button
          onClick={() => onToggleReminder(friend.id)}
          className={`p-2 rounded-xl transition-all border ${
            friend.reminderEnabled
              ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-2xs'
              : 'bg-white/80 text-[#8C8C7A] border-[#E0E0D6] hover:text-[#5A5A40]'
          }`}
          title={friend.reminderEnabled ? 'Reminders Active' : 'Enable Birthday Reminder'}
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>

      {/* Countdown Box */}
      <div className="bg-white/90 backdrop-blur-md rounded-[24px] p-4 border border-[#EAE7E0] shadow-2xs my-4 relative z-10">
        {time.isToday ? (
          <div className="text-center py-2">
            <span className="text-2xl font-display italic text-[#5A5A40] animate-pulse">
              🎉 IT'S HER BIRTHDAY TODAY! 🎂
            </span>
            <p className="text-xs text-[#8C8C7A] mt-1">Time to celebrate and shower her with love!</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs text-[#8C8C7A] mb-2 font-medium">
              <span className="flex items-center gap-1 uppercase tracking-widest text-[10px] font-bold text-[#5A5A40]">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Birthday In
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold">
                {time.totalDays <= 14 ? '⚡️ Coming up soon!' : 'Calendar Alert Set'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#EAE7E0]">
                <span className="block font-display italic text-2xl text-[#5A5A40]">{time.days}</span>
                <span className="text-[9px] font-bold uppercase text-[#8C8C7A] tracking-wider">Days</span>
              </div>
              <div className="bg-[#D4E0D7]/50 p-2 rounded-xl border border-[#D4E0D7]">
                <span className="block font-display italic text-2xl text-[#4A5A4F]">{time.hours}</span>
                <span className="text-[9px] font-bold uppercase text-[#4A5A4F] tracking-wider">Hours</span>
              </div>
              <div className="bg-[#F2D7D7]/50 p-2 rounded-xl border border-[#F2D7D7]">
                <span className="block font-display italic text-2xl text-[#6B4F4F]">{time.minutes}</span>
                <span className="text-[9px] font-bold uppercase text-[#6B4F4F] tracking-wider">Mins</span>
              </div>
              <div className="bg-[#E7DFF2]/50 p-2 rounded-xl border border-[#E7DFF2]">
                <span className="block font-display italic text-2xl text-[#5A5A40]">{time.seconds}</span>
                <span className="text-[9px] font-bold uppercase text-[#5A5A40] tracking-wider">Secs</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Preferences Snippets */}
      <div className="space-y-2 mb-4 relative z-10 text-xs text-[#4A4A40]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-bold text-[#8C8C7A] text-[10px] uppercase tracking-widest">Shops:</span>
          {friend.preferences.favoriteShops.slice(0, 3).map((shop, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-full bg-[#F5F5F0] border border-[#E0E0D6] text-[#4A4A40] font-medium text-[11px]"
            >
              {shop}
            </span>
          ))}
          {friend.preferences.favoriteSnacks.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#D4E0D7] text-[#4A5A4F] text-[11px] font-medium">
              🍿 {friend.preferences.favoriteSnacks[0]}
            </span>
          )}
        </div>

        {doNotWantCount > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] text-rose-800 bg-[#F2D7D7]/60 border border-[#F2D7D7] px-2.5 py-1 rounded-xl">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="truncate">
              <strong>AVOID:</strong> {friend.preferences.doNotWant[0]}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 relative z-10">
        <button
          onClick={() => onSelectFriend(friend.id)}
          className="flex items-center justify-center gap-1.5 bg-white hover:bg-[#FAF7F2] text-[#5A5A40] text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-full border border-[#E0E0D6] shadow-2xs transition-all cursor-pointer"
        >
          <span>Wishlist ({unclaimedCount})</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#8C8C7A]" />
        </button>

        <button
          onClick={() => onOpenGiftGenie(friend)}
          className="flex items-center justify-center gap-1.5 bg-[#5A5A40] hover:bg-[#4A4A30] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-full shadow-2xs transition-all cursor-pointer"
        >
          <Gift className="w-3.5 h-3.5 text-[#D4E0D7]" />
          <span>Surprise Ideas</span>
        </button>
      </div>
    </div>
  );
};
