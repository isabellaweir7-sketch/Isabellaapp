import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { ChevronLeft, Heart, X, Check, Leaf } from 'lucide-react';
import {
  ONBOARDING_REASONS,
  DIETARY_RESTRICTIONS,
  MEAL_WANTS,
  SAMPLE_DISHES,
} from './mockData';

const STEP_META = [
  { title: 'Why are you here?', subtitle: "Pick as many as apply — there's no wrong answer." },
  { title: 'Any dietary needs?', subtitle: "We'll only suggest meals that fit." },
  { title: 'What do you want from a meal?', subtitle: 'Optional — skip if you just want variety.' },
  { title: 'Would you eat this?', subtitle: 'Swipe through a few so we learn your taste.' },
];

function StepLabel({ step }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <Leaf size={18} color="#5A7A3A" />
      <span
        className="font-mono text-xs font-bold uppercase"
        style={{ color: '#5A7A3A', letterSpacing: '0.04em' }}
      >
        Step {step + 1} of {STEP_META.length}
      </span>
    </div>
  );
}

function StepDots({ step }) {
  return (
    <div className="flex items-center gap-1.5">
      {STEP_META.map((_, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: i === step ? 24 : 8,
            backgroundColor: i <= step ? '#9ACB4B' : '#33422C',
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
        backgroundColor: selected ? '#9ACB4B' : '#FFFFFF',
        borderColor: selected ? '#9ACB4B' : '#E3DAC0',
        color: '#232B1D',
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

function GoalChip({ label, selected, gradient, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl overflow-hidden text-left transition-all"
      style={{ border: `2px solid ${selected ? '#9ACB4B' : 'transparent'}` }}
    >
      <div className="grain relative h-20 w-full" style={{ background: gradient }}>
        {selected && (
          <div
            className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#9ACB4B' }}
          >
            <Check size={14} color="#161D14" strokeWidth={3} />
          </div>
        )}
      </div>
      <div className="px-2.5 py-2" style={{ backgroundColor: selected ? '#9ACB4B' : '#FFFFFF' }}>
        <span className="text-xs font-bold" style={{ color: '#232B1D' }}>
          {label}
        </span>
      </div>
    </button>
  );
}

function MealWantsStep({ selected, onToggle }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {MEAL_WANTS.map((want) => (
        <GoalChip
          key={want.id}
          label={want.label}
          gradient={want.gradient}
          selected={selected.includes(want.id)}
          onClick={() => onToggle(want.id)}
        />
      ))}
    </div>
  );
}

const PHOTO_SCRIM = 'linear-gradient(180deg, rgba(22,29,20,0) 40%, rgba(22,29,20,0.88) 100%)';

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
        borderColor: '#E3DAC0',
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
          className="absolute top-5 left-5 px-3 py-1 rounded-lg border-2 font-display text-lg -rotate-12"
          style={{ borderColor: '#9ACB4B', color: '#9ACB4B', opacity: likeOpacity }}
        >
          YUM
        </motion.div>
      )}
      {isTop && (
        <motion.div
          className="absolute top-5 right-5 px-3 py-1 rounded-lg border-2 font-display text-lg rotate-12"
          style={{ borderColor: '#F2E9DC', color: '#F2E9DC', opacity: nopeOpacity }}
        >
          PASS
        </motion.div>
      )}
      <div className="flex gap-1.5 mb-2">
        {dish.tags.map((t) => (
          <span key={t} className="tag-pill">
            {t}
          </span>
        ))}
      </div>
      <h3 className="font-display text-2xl leading-tight" style={{ color: '#F2E9DC' }}>
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
      <div className="relative w-full max-w-xs h-[26rem]">
        {done ? (
          <div
            className="rounded-3xl border h-full flex flex-col items-center justify-center gap-2 px-6 text-center"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DAC0' }}
          >
            <span className="font-display text-xl" style={{ color: '#232B1D' }}>
              That's the taste test done
            </span>
            <span className="text-sm font-medium" style={{ color: '#93876B' }}>
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
            className="w-14 h-14 rounded-full border flex items-center justify-center"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DAC0' }}
            aria-label="Pass"
          >
            <X size={22} color="#93876B" />
          </button>
          <span className="font-mono text-xs" style={{ color: '#93876B' }}>
            {Math.min(dishIndex + 1, SAMPLE_DISHES.length)}/{SAMPLE_DISHES.length}
          </span>
          <button
            type="button"
            onClick={() => onSwipe('like')}
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#9ACB4B' }}
            aria-label="Yum"
          >
            <Heart size={22} color="#161D14" fill="#161D14" />
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F3ECDA' }}>
      {/* Dark chrome header strip */}
      <div
        className="flex items-center justify-between px-6 pt-8 pb-5"
        style={{ backgroundColor: '#161D14' }}
      >
        <button
          type="button"
          onClick={() => step > 0 && setStep(step - 1)}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          style={{ opacity: step === 0 ? 0 : 1, backgroundColor: '#212B1D' }}
          disabled={step === 0}
        >
          <ChevronLeft size={18} color="#F2E9DC" />
        </button>
        <StepDots step={step} />
        <div className="w-9 h-9" />
      </div>

      <div className="flex-1 px-6 pt-6 pb-6 flex flex-col">
        <StepLabel step={step} />
        <h1 className="font-display text-3xl leading-tight mb-2" style={{ color: '#232B1D' }}>
          {STEP_META[step].title}
        </h1>
        <p className="text-sm font-medium mb-6" style={{ color: '#93876B' }}>
          {STEP_META[step].subtitle}
        </p>

        <div className="flex-1">
          {step === 0 && <ReasonsStep selected={reasons} onToggle={toggleIn(setReasons)} />}
          {step === 1 && <RestrictionsStep selected={restrictions} onToggle={toggleIn(setRestrictions)} />}
          {step === 2 && <MealWantsStep selected={mealWants} onToggle={toggleIn(setMealWants)} />}
          {step === 3 && <SwipeStep dishIndex={dishIndex} onSwipe={handleSwipe} />}
        </div>
      </div>

      {/* Dark chrome footer strip with the CTA, mirroring the header band */}
      {step < 3 && (
        <div className="px-6 pt-4 pb-8" style={{ backgroundColor: '#161D14' }}>
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => setStep(step + 1)}
            className="w-full py-3.5 rounded-full font-display text-base transition-opacity"
            style={{
              backgroundColor: '#9ACB4B',
              color: '#161D14',
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
