import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { ChevronLeft, Heart, X, Check } from 'lucide-react';
import {
  ONBOARDING_REASONS,
  DIETARY_RESTRICTIONS,
  MEAL_WANTS,
  SAMPLE_DISHES,
} from './mockData';

const STEP_META = [
  { title: 'Why are you here?', subtitle: 'Pick as many as apply — this shapes everything we suggest.' },
  { title: 'Any dietary restrictions?', subtitle: "We'll filter these out of every plan automatically." },
  { title: 'What do you want from a meal?', subtitle: 'Pick a few. You can always change your mind later.' },
  { title: 'Would you eat this?', subtitle: "Swipe through a few dishes so we learn your actual taste." },
];

function StepDots({ step }) {
  return (
    <div className="flex items-center gap-1.5">
      {STEP_META.map((_, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: i === step ? 24 : 8,
            backgroundColor: i <= step ? '#6F8F52' : '#DEE3D2',
          }}
        />
      ))}
    </div>
  );
}

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2.5 rounded-full text-sm font-semibold border transition-colors"
      style={{
        fontFamily: 'var(--font-body)',
        backgroundColor: selected ? '#6F8F52' : '#FFFFFF',
        borderColor: selected ? '#6F8F52' : '#DEE3D2',
        color: selected ? '#FAF6EC' : '#33392C',
      }}
    >
      {label}
    </button>
  );
}

function ReasonsStep({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {ONBOARDING_REASONS.map((reason) => (
        <Chip
          key={reason.id}
          label={reason.label}
          selected={selected.includes(reason.id)}
          onClick={() => onToggle(reason.id)}
        />
      ))}
    </div>
  );
}

function RestrictionsStep({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {DIETARY_RESTRICTIONS.map((r) => (
        <Chip key={r.id} label={r.label} selected={selected.includes(r.id)} onClick={() => onToggle(r.id)} />
      ))}
    </div>
  );
}

function MealWantsStep({ selected, onToggle }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {MEAL_WANTS.map((want, i) => {
        const isSelected = selected.includes(want.id);
        const wide = i % 5 === 0;
        return (
          <button
            key={want.id}
            type="button"
            onClick={() => onToggle(want.id)}
            className={`grain relative overflow-hidden rounded-2xl text-left p-4 h-32 flex flex-col justify-end border-2 transition-transform ${
              wide ? 'col-span-2' : 'col-span-1'
            }`}
            style={{
              background: want.gradient,
              borderColor: isSelected ? '#6F8F52' : 'transparent',
            }}
          >
            {isSelected && (
              <div
                className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#6F8F52' }}
              >
                <Check size={14} color="#FAF6EC" strokeWidth={3} />
              </div>
            )}
            <span className="font-display font-bold text-base leading-tight" style={{ color: '#33392C' }}>
              {want.label}
            </span>
            <span className="text-xs font-medium mt-1" style={{ color: '#8B9481' }}>
              {want.sublabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const PHOTO_SCRIM = 'linear-gradient(180deg, rgba(38,43,31,0) 35%, rgba(30,34,24,0.85) 100%)';

function SwipeCard({ dish, onSwipe, isTop }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);

  return (
    <motion.div
      className="grain absolute inset-0 rounded-3xl border overflow-hidden flex flex-col justify-end p-5"
      style={{
        backgroundImage: `${PHOTO_SCRIM}, url("${dish.photo}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: dish.fallback,
        borderColor: '#DEE3D2',
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) onSwipe('like');
        else if (info.offset.x < -100) onSwipe('dislike');
      }}
      whileTap={{ cursor: 'grabbing' }}
    >
      {isTop && (
        <motion.div
          className="absolute top-5 left-5 px-3 py-1 rounded-lg border-2 font-display font-extrabold text-lg -rotate-12"
          style={{ borderColor: '#9ACB4B', color: '#9ACB4B', opacity: likeOpacity }}
        >
          YUM
        </motion.div>
      )}
      {isTop && (
        <motion.div
          className="absolute top-5 right-5 px-3 py-1 rounded-lg border-2 font-display font-extrabold text-lg rotate-12"
          style={{ borderColor: '#FAF6EC', color: '#FAF6EC', opacity: nopeOpacity }}
        >
          PASS
        </motion.div>
      )}
      <div className="flex gap-1.5 mb-2">
        {dish.tags.map((t) => (
          <span key={t} className="receipt-tag">
            {t}
          </span>
        ))}
      </div>
      <h3 className="font-display font-bold text-2xl leading-tight" style={{ color: '#FAF6EC' }}>
        {dish.name}
      </h3>
    </motion.div>
  );
}

function SwipeStep({ dishIndex, onSwipe }) {
  const visible = SAMPLE_DISHES.slice(dishIndex, dishIndex + 2);
  const done = dishIndex >= SAMPLE_DISHES.length;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-xs h-80">
        {done ? (
          <div
            className="grain rounded-3xl border h-full flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#DEE3D2' }}
          >
            <span className="font-display font-bold text-xl">That's the taste test done</span>
            <span className="text-sm font-medium" style={{ color: '#8B9481' }}>
              We've got a good read on you now
            </span>
          </div>
        ) : (
          <AnimatePresence>
            {visible
              .map((dish, i) => (
                <SwipeCard key={dish.id} dish={dish} isTop={i === 0} onSwipe={i === 0 ? onSwipe : () => {}} />
              ))
              .reverse()}
          </AnimatePresence>
        )}
      </div>
      {!done && (
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => onSwipe('dislike')}
            className="w-14 h-14 rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: '#DEE3D2', color: '#33392C' }}
            aria-label="Pass"
          >
            <X size={22} />
          </button>
          <span className="font-mono text-xs" style={{ color: '#8B9481' }}>
            {Math.min(dishIndex + 1, SAMPLE_DISHES.length)}/{SAMPLE_DISHES.length}
          </span>
          <button
            type="button"
            onClick={() => onSwipe('like')}
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#6F8F52', color: '#FAF6EC' }}
            aria-label="Yum"
          >
            <Heart size={22} fill="#FAF6EC" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ForkitOnboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [reasons, setReasons] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [mealWants, setMealWants] = useState([]);
  const [dishIndex, setDishIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);

  const toggleIn = (setArr) => (id) =>
    setArr((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const finish = (finalLiked, finalDisliked) => {
    onComplete({
      reasons,
      restrictions,
      mealWants,
      likedDishes: finalLiked,
      dislikedDishes: finalDisliked,
    });
  };

  const handleSwipe = (direction) => {
    const dish = SAMPLE_DISHES[dishIndex];
    if (!dish) return;
    const nextLiked = direction === 'like' ? [...liked, dish.id] : liked;
    const nextDisliked = direction === 'dislike' ? [...disliked, dish.id] : disliked;
    setLiked(nextLiked);
    setDisliked(nextDisliked);
    const nextIndex = dishIndex + 1;
    setDishIndex(nextIndex);
    if (nextIndex >= SAMPLE_DISHES.length) {
      setTimeout(() => finish(nextLiked, nextDisliked), 500);
    }
  };

  const canContinue = step === 0 ? reasons.length > 0 : true;
  const isLastInteractiveStep = step === 2;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF6EC', color: '#33392C' }}>
      <div className="flex items-center justify-between px-6 pt-8 pb-4">
        <button
          type="button"
          onClick={() => step > 0 && setStep(step - 1)}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          style={{ opacity: step === 0 ? 0 : 1, backgroundColor: '#FFFFFF' }}
          disabled={step === 0}
        >
          <ChevronLeft size={18} />
        </button>
        <StepDots step={step} />
        <div className="w-9 h-9" />
      </div>

      <div className="flex-1 px-6 pb-6 flex flex-col">
        <h1 className="font-display font-extrabold text-3xl leading-tight mb-2">{STEP_META[step].title}</h1>
        <p className="text-sm font-medium mb-6" style={{ color: '#8B9481' }}>
          {STEP_META[step].subtitle}
        </p>

        <div className="flex-1">
          {step === 0 && <ReasonsStep selected={reasons} onToggle={toggleIn(setReasons)} />}
          {step === 1 && <RestrictionsStep selected={restrictions} onToggle={toggleIn(setRestrictions)} />}
          {step === 2 && <MealWantsStep selected={mealWants} onToggle={toggleIn(setMealWants)} />}
          {step === 3 && <SwipeStep dishIndex={dishIndex} onSwipe={handleSwipe} />}
        </div>
      </div>

      {step < 3 && (
        <div className="px-6 pb-8 pt-2">
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => (isLastInteractiveStep ? setStep(3) : setStep(step + 1))}
            className="w-full py-3.5 rounded-2xl font-display font-bold text-base transition-opacity"
            style={{
              backgroundColor: '#6F8F52',
              color: '#FAF6EC',
              opacity: canContinue ? 1 : 0.4,
            }}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
