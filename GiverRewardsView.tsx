import React from 'react';
import { Trophy, Sparkles, Heart, Gift, Lock, CheckCircle2, Award } from 'lucide-react';
import { UserGiverProgress } from '../types';
import { PROFILE_PATTERNS } from '../utils/themeUtils';

interface GiverRewardsViewProps {
  userProgress: UserGiverProgress;
}

export const GiverRewardsView: React.FC<GiverRewardsViewProps> = ({ userProgress }) => {
  return (
    <div className="space-y-6">
      {/* Level Hero Header */}
      <div className="bg-[#5A5A40] text-white rounded-[32px] p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#D4E0D7] border border-white/20">
              <Trophy className="w-3.5 h-3.5 text-[#D4E0D7]" /> Bestie Generosity Level
            </div>
            <h2 className="text-3xl sm:text-4xl font-display italic leading-tight">
              Level {userProgress.giverLevel} Gift Hero 🎉
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/90">
              You've logged and claimed {userProgress.giftsGivenCount} gifts for your friends!
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-md text-[#5A5A40] p-4 rounded-2xl border border-white shadow-2xs text-center min-w-[140px]">
            <span className="block font-bold text-2xl font-display italic text-[#5A5A40]">
              {userProgress.badges.length} / 6
            </span>
            <span className="text-[10px] font-bold text-[#8C8C7A] uppercase tracking-widest">
              Badges Unlocked
            </span>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex justify-between text-xs font-bold text-[#FAF7F2] mb-1.5 uppercase tracking-wider text-[10px]">
            <span>Level 3 Giver</span>
            <span>75% to Level 4 (Unlock Pattern)</span>
          </div>
          <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div className="bg-[#D4E0D7] h-full rounded-full transition-all duration-1000 w-3/4 shadow-2xs" />
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-[#F9F3EE] rounded-[32px] p-6 sm:p-8 border border-[#EAE7E0] shadow-2xs">
        <h3 className="text-2xl font-display italic text-[#5A5A40] flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-[#5A5A40]" />
          <span>Your Bestie Badges</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userProgress.badges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 rounded-2xl bg-white border border-[#EAE7E0] flex items-start gap-3.5 shadow-2xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center text-2xl shadow-2xs shrink-0 border border-[#E0E0D6]">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#5A5A40]">{badge.name}</h4>
                <p className="text-xs text-[#8C8C7A] mt-0.5">{badge.description}</p>
                <span className="inline-block mt-2 text-[9px] font-bold uppercase tracking-wider text-[#4A5A4F] bg-[#D4E0D7]/60 px-2.5 py-0.5 rounded-full border border-[#D4E0D7]">
                  Unlocked {badge.unlockedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlockable Background Patterns */}
      <div className="bg-[#F9F3EE] rounded-[32px] p-6 sm:p-8 border border-[#EAE7E0] shadow-2xs">
        <h3 className="text-2xl font-display italic text-[#5A5A40] flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-[#5A5A40]" />
          <span>Unlockable Profile Themes & Patterns</span>
        </h3>
        <p className="text-xs text-[#8C8C7A] mb-6">
          Level up your Giver status to unlock distinct profile background styles!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROFILE_PATTERNS.map((p) => {
            const isUnlocked = userProgress.giverLevel >= p.levelRequired;

            return (
              <div
                key={p.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  isUnlocked
                    ? 'bg-white border-[#EAE7E0] text-[#5A5A40]'
                    : 'bg-[#EAE7E0]/50 border-[#E0E0D6] text-[#8C8C7A] opacity-70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#5A5A40]">{p.name}</h4>
                    <p className="text-xs text-[#8C8C7A]">
                      {isUnlocked ? 'Available in Customizer' : `Requires Level ${p.levelRequired}`}
                    </p>
                  </div>
                </div>

                {isUnlocked ? (
                  <CheckCircle2 className="w-5 h-5 text-[#4A5A4F] shrink-0" />
                ) : (
                  <Lock className="w-5 h-5 text-[#8C8C7A] shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
