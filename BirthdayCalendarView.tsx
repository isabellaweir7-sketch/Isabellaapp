import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Bell, Cake, Sparkles, Gift, Heart, ArrowRight } from 'lucide-react';
import { FriendProfile } from '../types';
import { calculateCountdown, formatBirthdayFull, getNextBirthdayDate } from '../utils/dateUtils';

interface BirthdayCalendarViewProps {
  friends: FriendProfile[];
  onSelectFriend: (friendId: string) => void;
  onOpenGiftGenie: (friend: FriendProfile) => void;
}

export const BirthdayCalendarView: React.FC<BirthdayCalendarViewProps> = ({
  friends,
  onSelectFriend,
  onOpenGiftGenie,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFriendModal, setSelectedFriendModal] = useState<FriendProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // First day of month & days count
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Find friends with birthdays in this month
  const friendsInMonth = friends.filter((friend) => {
    const bdayParts = friend.birthday.split('-');
    const friendMonth = parseInt(bdayParts[1], 10) - 1;
    return friendMonth === month;
  });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleTestReminder = (friendName: string) => {
    setToastMessage(`🔔 Reminder Triggered! ${friendName}'s birthday is coming up in 14 days! WishList sent you an alert.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="bg-[#F9F3EE] rounded-[32px] p-6 border border-[#EAE7E0] shadow-2xs relative">
      {/* Toast Alert Simulation */}
      {toastMessage && (
        <div className="mb-4 p-3 bg-[#5A5A40] text-white rounded-full shadow-md text-xs font-semibold flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/80 hover:text-white font-bold ml-2 text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#EAE7E0]">
        <div>
          <h2 className="text-3xl font-display italic text-[#5A5A40] flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-[#5A5A40]" />
            <span>Birthday Calendar</span>
          </h2>
          <p className="text-xs text-[#8C8C7A] mt-0.5 uppercase tracking-widest text-[10px]">
            Automatic reminders trigger 14 days, 3 days & on the day 🎉
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#E0E0D6]">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#5A5A40] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-display italic text-base text-[#5A5A40] px-3 py-1">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#5A5A40] transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-2 my-4 text-center text-[10px] font-bold text-[#8C8C7A] uppercase tracking-widest">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Month Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells before month starts */}
        {Array.from({ length: firstDay }).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-24 sm:h-28 bg-[#FAF7F2]/40 rounded-2xl border border-transparent" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const today = new Date();
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === dayNum;

          // Check if any friend has birthday on this day
          const birthdayFriends = friends.filter((friend) => {
            const bdayParts = friend.birthday.split('-');
            const friendMonth = parseInt(bdayParts[1], 10) - 1;
            const friendDay = parseInt(bdayParts[2], 10);
            return friendMonth === month && friendDay === dayNum;
          });

          return (
            <div
              key={`day-${dayNum}`}
              className={`h-24 sm:h-28 p-2 rounded-2xl border transition-all flex flex-col justify-between relative group ${
                isToday
                  ? 'bg-[#D4E0D7]/60 border-[#D4E0D7] shadow-2xs'
                  : birthdayFriends.length > 0
                  ? 'bg-[#F2D7D7]/40 border-[#F2D7D7] hover:border-[#5A5A40]'
                  : 'bg-white border-[#EAE7E0] hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold ${
                    isToday
                      ? 'w-6 h-6 rounded-full bg-[#5A5A40] text-white flex items-center justify-center font-display shadow-2xs'
                      : 'text-[#5A5A40]'
                  }`}
                >
                  {dayNum}
                </span>

                {birthdayFriends.length > 0 && (
                  <span className="text-xs animate-bounce" title="Birthday!">
                    🎂
                  </span>
                )}
              </div>

              {/* Birthday Chips */}
              <div className="space-y-1 my-1 overflow-y-auto max-h-16">
                {birthdayFriends.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFriendModal(f)}
                    className="w-full flex items-center gap-1.5 p-1 rounded-lg bg-white shadow-2xs border border-[#E0E0D6] hover:border-[#5A5A40] transition-all text-left cursor-pointer group/chip"
                  >
                    <img
                      src={f.avatar}
                      alt={f.name}
                      className="w-5 h-5 rounded-full object-cover shrink-0 border border-[#D4E0D7]"
                    />
                    <span className="text-[10px] font-bold text-[#5A5A40] truncate leading-tight">
                      {f.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {birthdayFriends.length > 0 && (
                <div className="text-[9px] text-[#5A5A40] font-bold uppercase tracking-wider text-center mt-auto">
                  {birthdayFriends.length === 1 ? 'Birthday!' : `${birthdayFriends.length} Bdays`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Month Summary Bar */}
      <div className="mt-6 pt-4 border-t border-[#EAE7E0] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#5A5A40]" />
          <span className="text-xs font-medium text-[#4A4A40]">
            <strong>{friendsInMonth.length}</strong> birthdays in {monthNames[month]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTestReminder(friends[0]?.name || 'Chloe')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#FAF7F2] text-[#5A5A40] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border border-[#E0E0D6]"
          >
            <Bell className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>Test Reminder Notification</span>
          </button>
        </div>
      </div>

      {/* Friend Quick Popover Modal */}
      {selectedFriendModal && (
        <div className="fixed inset-0 z-50 bg-[#4A4A40]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] rounded-[32px] max-w-md w-full p-6 border border-[#EAE7E0] shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setSelectedFriendModal(null)}
              className="absolute top-4 right-4 text-[#8C8C7A] hover:text-[#5A5A40] font-bold p-1 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedFriendModal.avatar}
                alt={selectedFriendModal.name}
                className="w-16 h-16 rounded-[20px] object-cover border-2 border-white shadow-2xs"
              />
              <div>
                <h3 className="text-2xl font-display italic text-[#5A5A40]">
                  {selectedFriendModal.name}
                </h3>
                <p className="text-xs text-[#8C8C7A]">
                  {selectedFriendModal.relationship} • {formatBirthdayFull(selectedFriendModal.birthday)} ({selectedFriendModal.zodiacSign})
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] bg-[#D4E0D7] px-2.5 py-0.5 rounded-full">
                  🎂 Birthday in {calculateCountdown(selectedFriendModal.birthday).days} days!
                </span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#E0E0D6] text-xs text-[#4A4A40] space-y-1.5 mb-5">
              <p>
                <strong>Fav Shops:</strong> {selectedFriendModal.preferences.favoriteShops.join(', ')}
              </p>
              <p>
                <strong>Fav Snacks:</strong> {selectedFriendModal.preferences.favoriteSnacks.join(', ')}
              </p>
              {selectedFriendModal.preferences.doNotWant.length > 0 && (
                <p className="text-rose-800 font-semibold">
                  <strong>🚫 DO NOT WANT:</strong> {selectedFriendModal.preferences.doNotWant[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  const f = selectedFriendModal;
                  setSelectedFriendModal(null);
                  onSelectFriend(f.id);
                }}
                className="flex items-center justify-center gap-2 py-2.5 bg-white border border-[#E0E0D6] text-[#5A5A40] font-bold uppercase tracking-wider text-xs rounded-full shadow-2xs hover:bg-[#FAF7F2] cursor-pointer"
              >
                <span>View Wishlist</span>
                <ArrowRight className="w-4 h-4 text-[#8C8C7A]" />
              </button>

              <button
                onClick={() => {
                  const f = selectedFriendModal;
                  setSelectedFriendModal(null);
                  onOpenGiftGenie(f);
                }}
                className="flex items-center justify-center gap-2 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A30] text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-2xs cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#D4E0D7]" />
                <span>Gift Ideas</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
