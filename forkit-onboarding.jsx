import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  Heart,
  X,
  Utensils,
  Salad,
  Leaf,
  Wheat,
  Droplet,
  BadgeCheck,
  Star,
  ShieldAlert,
  Dumbbell,
  TrendingUp,
  Scale,
  ArrowRight,
  Flame,
  CookingPot,
  Microwave,
  Wind,
  Soup,
  Coffee,
  Zap,
  GraduationCap,
  Building2,
  Home as HomeIcon,
  Users,
  Fish,
  Nut,
  Milk,
  Egg,
  Sprout,
  Croissant,
  Shell,
  Ban,
  CheckCircle2,
} from 'lucide-react';
import {
  ONBOARDING_REASONS,
  DIETARY_RESTRICTIONS,
  EQUIPMENT_ITEMS,
  STUDENT_STATUS_OPTIONS,
  ACCOMMODATION_OPTIONS,
  ALLERGENS,
  generateSwipeDeck,
} from './mockData';

const STEP_META = [
  { title: 'Any Allergies?', subtitle: "We'll filter out recipes that aren't safe for you. You can update these anytime in your profile." },
  { title: 'What brings you to ForkIt?', subtitle: "Pick as many as apply — there's no wrong answer." },
  { title: 'Any deal-breakers?', subtitle: "We'll only suggest meals that fit." },
  { title: 'What are your goals?', subtitle: 'Tell us what to optimise for so your plan actually fits your week.' },
  { title: 'Kitchen Essentials', subtitle: "Select what you've got — we'll only suggest recipes you can actually cook." },
  { title: 'A bit about your setup', subtitle: 'This helps us tailor suggestions to where and how you live.' },
  { title: 'Would you eat this?', subtitle: 'Swipe through a few so we learn your taste.' },
];

const ALLERGEN_ICONS = {
  none: Ban,
  peanuts: Nut,
  'tree-nuts': Leaf,
  dairy: Milk,
  eggs: Egg,
  soy: Sprout,
  wheat: Croissant,
  fish: Fish,
  shellfish: Shell,
  gluten: Wheat,
};

const EQUIPMENT_ICONS = {
  hob: Flame,
  oven: CookingPot,
  microwave: Microwave,
  'air-fryer': Wind,
  'slow-cooker': Soup,
  kettle: Coffee,
  blender: Zap,
  'rice-cooker': Utensils,
};

const RESTRICTION_ICONS = {
  none: Utensils,
  vegetarian: Salad,
  vegan: Leaf,
  pescatarian: Fish,
  'gluten-free': Wheat,
  'dairy-free': Droplet,
  halal: BadgeCheck,
  kosher: Star,
  'nut-allergy': ShieldAlert,
};

const NUTRITION_GOALS = [
  { id: 'high-protein', label: 'High Protein', sublabel: '45g+ per meal', icon: Dumbbell },
  { id: 'low-carb', label: 'Low Carb', sublabel: 'Under 30g/day', icon: Wheat },
  { id: 'high-fibre', label: 'High Fibre', sublabel: 'Digestive health', icon: Leaf },
  { id: 'bulk-up', label: 'Bulk Up', sublabel: 'Growth phase', icon: TrendingUp },
];

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-full text-sm font-semibold tracking-wider border transition-colors ${
        selected
          ? 'bg-primary text-on-primary border-primary'
          : 'bg-surface-container-lowest text-on-surface border-outline-variant'
      }`}
    >
      {label}
    </button>
  );
}

function AllergyCard({ label, Icon, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col justify-between h-28 rounded-lg border p-4 text-left transition-all ${
        selected ? 'bg-primary-fixed border-primary scale-[0.98]' : 'bg-surface-container-low border-outline-variant text-on-surface'
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <Icon size={26} className="text-secondary" />
        {selected && <CheckCircle2 size={20} className="text-primary" />}
      </div>
      <span className="text-sm font-semibold tracking-wider text-primary">{label}</span>
    </button>
  );
}

function AllergiesStep({ selected, onToggle }) {
  return (
    <div className="grid grid-cols-2 gap-sm">
      {ALLERGENS.map((a) => (
        <AllergyCard
          key={a.id}
          label={a.label}
          Icon={ALLERGEN_ICONS[a.id] ?? Utensils}
          selected={selected.includes(a.id)}
          onClick={() => onToggle(a.id)}
        />
      ))}
    </div>
  );
}

function ReasonsStep({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-sm">
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

function RestrictionCard({ label, selected, Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col justify-between h-28 rounded-lg border p-4 text-left transition-all ${
        selected ? 'bg-primary text-on-primary border-primary' : 'bg-surface border-outline-variant text-on-surface'
      }`}
    >
      <Icon size={22} className={selected ? 'text-on-primary' : 'text-primary'} />
      <span className="text-sm font-semibold tracking-wider">{label}</span>
    </button>
  );
}

function RestrictionsStep({ selected, onToggle }) {
  return (
    <div className="grid grid-cols-2 gap-sm">
      {DIETARY_RESTRICTIONS.map((r) => (
        <RestrictionCard
          key={r.id}
          label={r.label}
          Icon={RESTRICTION_ICONS[r.id] ?? Utensils}
          selected={selected.includes(r.id)}
          onClick={() => onToggle(r.id)}
        />
      ))}
    </div>
  );
}

function GoalCard({ label, sublabel, Icon, selected, onClick, wide = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col p-4 text-left rounded-xl border transition-all ${wide ? 'col-span-2 flex-row items-center justify-between' : ''} ${
        selected ? 'bg-primary text-on-primary border-primary' : 'bg-surface border-outline-variant text-on-surface'
      }`}
    >
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-wider">{label}</span>
        <span className={`text-xs font-medium ${selected ? 'opacity-80' : 'text-outline'}`}>{sublabel}</span>
      </div>
      <Icon size={20} className={`${wide ? '' : 'mb-2 order-first'} ${selected ? 'text-on-primary' : 'text-secondary'}`} />
    </button>
  );
}

function MacroSlider({ label, value, onChange, colorClass }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <label className="text-sm font-semibold tracking-wider text-on-surface">{label}</label>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colorClass}`}>{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-outline-variant accent-primary"
      />
    </div>
  );
}

function NutritionGoalsStep({ selected, onToggle, macros, onMacroChange }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-sm">
        {NUTRITION_GOALS.map((goal) => (
          <GoalCard
            key={goal.id}
            label={goal.label}
            sublabel={goal.sublabel}
            Icon={goal.icon}
            selected={selected.includes(goal.id)}
            onClick={() => onToggle(goal.id)}
          />
        ))}
        <GoalCard
          label="Calorie Conscious"
          sublabel="Smart weight management"
          Icon={Scale}
          selected={selected.includes('calorie-conscious')}
          onClick={() => onToggle('calorie-conscious')}
          wide
        />
      </div>
      <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/40">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Priority Tuning</h3>
        <div className="flex flex-col gap-4">
          <MacroSlider
            label="Protein"
            value={macros.protein}
            onChange={(v) => onMacroChange('protein', v)}
            colorClass="bg-primary-fixed text-primary"
          />
          <MacroSlider
            label="Carbohydrates"
            value={macros.carbs}
            onChange={(v) => onMacroChange('carbs', v)}
            colorClass="bg-secondary-fixed text-secondary"
          />
          <MacroSlider
            label="Healthy Fats"
            value={macros.fat}
            onChange={(v) => onMacroChange('fat', v)}
            colorClass="bg-tertiary-fixed text-tertiary"
          />
        </div>
      </div>
    </div>
  );
}

function KitchenEssentialsStep({ selected, onToggle, onSelectAll }) {
  const allSelected = selected.length === EQUIPMENT_ITEMS.length;
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-sm">
        {EQUIPMENT_ITEMS.map((item) => (
          <RestrictionCard
            key={item.id}
            label={item.label}
            Icon={EQUIPMENT_ICONS[item.id] ?? Utensils}
            selected={selected.includes(item.id)}
            onClick={() => onToggle(item.id)}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onSelectAll}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold tracking-wider transition-colors ${
            allSelected ? 'bg-primary text-on-primary border-primary' : 'border-outline text-primary'
          }`}
        >
          <CheckCircle2 size={18} />
          {allSelected ? 'All Selected' : 'Select All'}
        </button>
      </div>
    </div>
  );
}

function OptionRow({ label, Icon, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all ${
        selected ? 'bg-primary text-on-primary border-primary' : 'bg-surface border-outline-variant text-on-surface'
      }`}
    >
      <Icon size={20} className={selected ? 'text-on-primary' : 'text-primary'} />
      <span className="text-sm font-semibold tracking-wider">{label}</span>
    </button>
  );
}

const STATUS_ICONS = {
  University: GraduationCap,
  College: GraduationCap,
  'Sixth Form': GraduationCap,
  'Not currently studying': Utensils,
};

const ACCOMMODATION_ICONS = {
  'Halls of residence': Building2,
  'Private rental (shared)': Users,
  'Private rental (solo)': HomeIcon,
  'Living at home': HomeIcon,
};

function StudentContextStep({ studentStatus, onStatus, school, onSchool, accommodation, onAccommodation }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Educational status</h3>
        <div className="flex flex-col gap-2">
          {STUDENT_STATUS_OPTIONS.map((status) => (
            <OptionRow
              key={status}
              label={status}
              Icon={STATUS_ICONS[status] ?? GraduationCap}
              selected={studentStatus === status}
              onClick={() => onStatus(status)}
            />
          ))}
        </div>
        {studentStatus && studentStatus !== 'Not currently studying' && (
          <input
            type="text"
            value={school}
            onChange={(e) => onSchool(e.target.value)}
            placeholder="Your school or university (optional)"
            className="mt-3 w-full rounded-lg px-3.5 py-3 bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary transition-colors outline-none text-sm font-semibold text-on-surface"
          />
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Where you live</h3>
        <div className="flex flex-col gap-2">
          {ACCOMMODATION_OPTIONS.map((option) => (
            <OptionRow
              key={option}
              label={option}
              Icon={ACCOMMODATION_ICONS[option] ?? HomeIcon}
              selected={accommodation === option}
              onClick={() => onAccommodation(option)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SwipeCard({ dish, onSwipe, isTop }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0 rounded-xl border border-outline-variant overflow-hidden flex flex-col justify-end soft-shadow"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(22,29,20,0) 40%, rgba(22,29,20,0.85) 100%), url("${dish.photo}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: dish.fallback,
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
          className="absolute top-5 left-5 px-3 py-1 rounded-lg border-2 border-tertiary-fixed text-tertiary-fixed font-display text-lg -rotate-12"
          style={{ opacity: likeOpacity }}
        >
          YUM
        </motion.div>
      )}
      {isTop && (
        <motion.div
          className="absolute top-5 right-5 px-3 py-1 rounded-lg border-2 border-white text-white font-display text-lg rotate-12"
          style={{ opacity: nopeOpacity }}
        >
          PASS
        </motion.div>
      )}
      <div className="p-5">
        <div className="flex gap-1.5 mb-2 flex-wrap">
          {dish.tags.slice(0, 3).map((t) => (
            <span key={t} className="chip-value">
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-white">{dish.title}</h3>
      </div>
    </motion.div>
  );
}

function SwipeStep({ dishes, dishIndex, onSwipe }) {
  const visible = dishes.slice(dishIndex, dishIndex + 2);
  const done = dishIndex >= dishes.length;
  const progressed = Math.min(dishIndex, dishes.length);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-[20rem] h-[26rem]">
        {done ? (
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest h-full flex flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="font-display text-xl text-primary">That's the taste test done</span>
            <span className="text-sm font-medium text-on-surface-variant">We've got a good read on you now</span>
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
            className="w-14 h-14 rounded-full border-2 border-secondary flex items-center justify-center text-secondary"
            aria-label="Pass"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            onClick={() => onSwipe('like')}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary soft-shadow"
            aria-label="Yum"
          >
            <Heart size={22} fill="currentColor" />
          </button>
        </div>
      )}
      <div className="w-full max-w-[200px]">
        <div className="flex justify-between items-end mb-1">
          <span className="text-xs font-medium text-primary">Your Palate</span>
          <span className="text-xs font-medium text-on-surface-variant">
            {progressed}/{dishes.length}
          </span>
        </div>
        <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
          <div
            className="h-full bg-tertiary-container"
            style={{ width: `${(progressed / dishes.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ForkitOnboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [allergies, setAllergies] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [nutritionGoals, setNutritionGoals] = useState([]);
  const [macros, setMacros] = useState({ protein: 40, carbs: 35, fat: 25 });
  const [equipment, setEquipment] = useState([]);
  const [studentStatus, setStudentStatus] = useState('');
  const [school, setSchool] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [dishIndex, setDishIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);

  const toggleIn = (setArr) => (id) =>
    setArr((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleMacroChange = (key, value) => setMacros((prev) => ({ ...prev, [key]: value }));
  const handleSelectAllEquipment = () =>
    setEquipment((prev) => (prev.length === EQUIPMENT_ITEMS.length ? [] : EQUIPMENT_ITEMS.map((item) => item.id)));

  const dishes = generateSwipeDeck(restrictions, allergies);

  const finish = (finalLiked, finalDisliked) => {
    onComplete({
      allergies,
      reasons,
      restrictions,
      nutritionGoals,
      macros,
      likedDishes: finalLiked,
      dislikedDishes: finalDisliked,
      equipment,
      studentStatus,
      school,
      accommodation,
    });
  };

  const handleSwipe = (direction) => {
    const dish = dishes[dishIndex];
    if (!dish) return;
    const nextLiked = direction === 'like' ? [...liked, dish.id] : liked;
    const nextDisliked = direction === 'dislike' ? [...disliked, dish.id] : disliked;
    setLiked(nextLiked);
    setDisliked(nextDisliked);
    const nextIndex = dishIndex + 1;
    setDishIndex(nextIndex);
    if (nextIndex >= dishes.length) {
      setTimeout(() => finish(nextLiked, nextDisliked), 500);
    }
  };

  const canContinue = step === 1 ? reasons.length > 0 : true;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center justify-between px-5 py-4">
        <button
          type="button"
          onClick={() => step > 0 && setStep(step - 1)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container"
          style={{ opacity: step === 0 ? 0 : 1 }}
          disabled={step === 0}
        >
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-primary">ForkIt</h1>
        <div className="w-9 h-9" />
      </header>

      <div className="px-5">
        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full bg-tertiary-container transition-all duration-700 ease-out rounded-full"
            style={{ width: `${((step + 1) / STEP_META.length) * 100}%` }}
          />
        </div>
        <p className="text-xs font-medium text-outline mt-1 text-center uppercase tracking-widest">
          Step {step + 1} of {STEP_META.length}
        </p>
      </div>

      <div className="flex-1 px-5 pt-6 pb-6 flex flex-col max-w-2xl mx-auto w-full">
        <h1 className="font-display text-[32px] leading-[40px] tracking-[-0.01em] font-bold mb-2 text-primary">
          {STEP_META[step].title}
        </h1>
        <p className="text-lg mb-6 text-on-surface-variant">{STEP_META[step].subtitle}</p>

        <div className="flex-1">
          {step === 0 && <AllergiesStep selected={allergies} onToggle={toggleIn(setAllergies)} />}
          {step === 1 && <ReasonsStep selected={reasons} onToggle={toggleIn(setReasons)} />}
          {step === 2 && <RestrictionsStep selected={restrictions} onToggle={toggleIn(setRestrictions)} />}
          {step === 3 && (
            <NutritionGoalsStep
              selected={nutritionGoals}
              onToggle={toggleIn(setNutritionGoals)}
              macros={macros}
              onMacroChange={handleMacroChange}
            />
          )}
          {step === 4 && (
            <KitchenEssentialsStep selected={equipment} onToggle={toggleIn(setEquipment)} onSelectAll={handleSelectAllEquipment} />
          )}
          {step === 5 && (
            <StudentContextStep
              studentStatus={studentStatus}
              onStatus={setStudentStatus}
              school={school}
              onSchool={setSchool}
              accommodation={accommodation}
              onAccommodation={setAccommodation}
            />
          )}
          {step === 6 && <SwipeStep dishes={dishes} dishIndex={dishIndex} onSwipe={handleSwipe} />}
        </div>
      </div>

      {step < STEP_META.length - 1 && (
        <div className="px-5 pt-2 pb-8 max-w-2xl mx-auto w-full">
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => setStep(step + 1)}
            className="w-full py-3.5 rounded-lg text-sm font-semibold tracking-wider transition-opacity bg-primary text-on-primary flex items-center justify-center gap-2"
            style={{ opacity: canContinue ? 1 : 0.4 }}
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
