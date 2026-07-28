import React from 'react';
import { ChevronLeft, ListFilter, PlayCircle, Sparkles } from 'lucide-react';

const BENEFITS = [
  {
    Icon: ListFilter,
    title: '"5 Ingredients Max" filter',
    detail: 'Every recipe you see is capped at 5 ingredients, so cooking never feels overwhelming.',
  },
  {
    Icon: PlayCircle,
    title: 'Guided video clips',
    detail: 'Short walkthroughs for each step, for when a written method alone isn\'t quite enough yet.',
  },
  {
    Icon: Sparkles,
    title: 'Simplified instructions',
    detail: 'Steps are broken down further, with fewer assumptions about what you already know.',
  },
];

export default function ForkitFreshersMode({ enabled, onBack, onToggle }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-2xl font-semibold text-primary">Freshers Mode</h1>
      </header>

      <div className="flex-1 px-5 pb-10 max-w-2xl mx-auto w-full flex flex-col gap-6">
        <section>
          <h2 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-primary mb-2">
            Never cooked before? Start here.
          </h2>
          <p className="text-lg text-on-surface-variant">
            Freshers Mode simplifies everything in ForkIt for your first term cooking solo.
          </p>
        </section>

        <div className="flex flex-col gap-3">
          {BENEFITS.map(({ Icon, title, detail }) => (
            <div key={title} className="flex gap-3 bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                <Icon size={18} className="text-on-primary-fixed" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-primary mb-1">{title}</h3>
                <p className="text-sm text-on-surface-variant">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onToggle(!enabled)}
          className={`w-full py-3.5 rounded-lg text-sm font-semibold tracking-wider transition-colors ${
            enabled ? 'bg-surface-container-lowest border border-outline-variant text-on-surface' : 'bg-primary text-on-primary'
          }`}
        >
          {enabled ? 'Turn off Freshers Mode' : 'Turn on Freshers Mode'}
        </button>
        <p className="text-xs font-medium text-center text-on-surface-variant">
          You can switch this off any time from your profile.
        </p>
      </div>
    </div>
  );
}
