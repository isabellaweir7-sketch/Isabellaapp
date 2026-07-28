import React from 'react';
import { ChevronLeft, Users, Wallet, Utensils } from 'lucide-react';
import { NOTIFICATIONS } from './mockData';

const GROUP_ICON = {
  Household: Users,
  Budget: Wallet,
  Community: Utensils,
};

export default function ForkitNotifications({ onBack }) {
  const groups = [...new Set(NOTIFICATIONS.map((n) => n.group))];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-xl text-primary">Notifications</h1>
      </header>

      <div className="flex-1 px-5 pb-10 max-w-2xl mx-auto w-full flex flex-col gap-6">
        {groups.map((group) => {
          const Icon = GROUP_ICON[group] ?? Users;
          return (
            <section key={group}>
              <div className="flex items-center gap-2 mb-3">
                <Icon size={16} className="text-secondary" />
                <h2 className="font-display text-lg text-primary">{group}</h2>
              </div>
              <div className="flex flex-col gap-2">
                {NOTIFICATIONS.filter((n) => n.group === group).map((n) => (
                  <div key={n.id} className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-primary">{n.title}</p>
                        <p className="text-xs text-on-surface-variant mt-0.5">{n.detail}</p>
                      </div>
                      <span className="text-[11px] text-outline shrink-0">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
