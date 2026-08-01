import React, { useState } from 'react';
import { ChevronLeft, PlayCircle, Lock, CheckCircle2, Lightbulb, X } from 'lucide-react';
import { TECHNIQUES, SKILL_LEVELS, PRO_TIPS, getSkillProgress } from './mockData';

// Real YouTube embed — plays inline in the app rather than redirecting out
// to youtube.com. Shared between Skill Lab's modal and Recipe Detail's
// inline technique section.
export function TechniqueVideoEmbed({ technique }) {
  return (
    <div className="aspect-video rounded-lg overflow-hidden bg-black">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${technique.youtubeId}?rel=0`}
        title={technique.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function TechniqueVideoModal({ technique, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5" onClick={onClose}>
      <div className="bg-surface rounded-xl overflow-hidden w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <TechniqueVideoEmbed technique={technique} />
        <div className="p-4 flex items-start justify-between gap-3">
          <div>
            <h4 className="text-base font-semibold text-primary">{technique.name}</h4>
            <p className="text-xs font-medium text-on-surface-variant">{technique.youtubeChannel}</p>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Close">
            <X size={16} className="text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TechniqueCard({ technique, onSelect }) {
  return (
    <button type="button" className="text-left group" onClick={() => onSelect(technique)}>
      <div
        className="relative aspect-video rounded-lg overflow-hidden mb-2"
        style={{ backgroundColor: technique.fallback, backgroundImage: `url("${technique.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <PlayCircle size={36} className="text-white" />
        </div>
        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-medium px-1.5 py-0.5 rounded">
          {technique.durationLabel}
        </span>
      </div>
      <h4 className="text-base font-semibold text-primary">{technique.name}</h4>
    </button>
  );
}

// Thresholds for each locked tier, matching SKILL_LEVELS' own requirement
// text — Kitchen Master's technique target is dynamic (every technique the
// library actually uses), not a fixed number.
function tierTarget(levelId, achievableTechniques) {
  if (levelId === 'sous-chef') return { recipes: 5, techniques: 3 };
  if (levelId === 'kitchen-master') return { recipes: 20, techniques: achievableTechniques };
  return null;
}

function SkillPath({ progress }) {
  const { cookedCount, techniquesUsed, achievableTechniques, levelIndex } = progress;
  return (
    <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/40">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Skill Path</h3>
      <div className="flex flex-col gap-3">
        {SKILL_LEVELS.map((level, i) => {
          const achieved = i < levelIndex;
          const current = i === levelIndex;
          const nextUp = i === levelIndex + 1;
          const target = nextUp ? tierTarget(level.id, achievableTechniques) : null;
          return (
            <div key={level.id} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  current ? 'bg-primary text-on-primary' : achieved ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-container-highest text-outline'
                }`}
              >
                {achieved ? <CheckCircle2 size={18} /> : current ? <span className="font-display text-sm font-bold">{i + 1}</span> : <Lock size={16} />}
              </div>
              <div className="min-w-0">
                <p className={`text-base font-semibold ${current || achieved ? 'text-primary' : 'text-outline'}`}>{level.name}</p>
                <p className="text-xs font-medium text-on-surface-variant">{level.requirement}</p>
                {target && (
                  <p className="text-xs font-semibold text-primary mt-0.5">
                    {Math.min(cookedCount, target.recipes)}/{target.recipes} recipes cooked ·{' '}
                    {Math.min(techniquesUsed, target.techniques)}/{target.techniques} techniques used
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ForkitSkillLab({ onBack }) {
  const [tab, setTab] = useState('techniques');
  const [activeTechnique, setActiveTechnique] = useState(null);
  const [progress] = useState(() => getSkillProgress());

  return (
    <div className="min-h-screen flex flex-col bg-surface pb-28">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-2xl font-semibold text-primary">Kitchen Academy</h1>
      </header>

      <div className="flex-1 px-5 pb-10 max-w-2xl mx-auto w-full flex flex-col gap-6">
        <p className="text-lg text-on-surface-variant">Move beyond following recipes — master the techniques behind them.</p>

        <SkillPath progress={progress} />

        <div className="flex items-center gap-2">
          {['techniques', 'tips'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider transition-colors ${
                tab === t ? 'bg-primary text-on-primary' : 'border border-outline-variant text-on-surface'
              }`}
            >
              {t === 'techniques' ? 'Technique Library' : 'Pro-Tip Feed'}
            </button>
          ))}
        </div>

        {tab === 'techniques' ? (
          <div className="grid grid-cols-2 gap-4">
            {TECHNIQUES.map((technique) => (
              <TechniqueCard key={technique.id} technique={technique} onSelect={setActiveTechnique} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {PRO_TIPS.map((tip) => (
              <div key={tip.id} className="flex gap-3 bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4">
                <Lightbulb size={20} className="text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-primary mb-1">{tip.title}</h4>
                  <p className="text-sm text-on-surface-variant">{tip.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {activeTechnique && <TechniqueVideoModal technique={activeTechnique} onClose={() => setActiveTechnique(null)} />}
    </div>
  );
}
