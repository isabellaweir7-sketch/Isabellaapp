import React, { useState } from 'react';
import { ChevronLeft, Mail, Lock, Eye, EyeOff, LogOut, Heart, GraduationCap, ChevronRight, Award, Camera, Settings } from 'lucide-react';
import { supabase } from './supabaseClient';
import { getSavedRecipes, DIETARY_RESTRICTIONS, ALLERGENS } from './mockData';
import { HouseholdHeaderButton } from './forkit-home-mockup.jsx';

const BATCH_PRO_KEY = 'forkit_batch_pro_unlocked';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.9-2.26c-.81.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.9v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.03l3.05-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .9 4.97l3.05 2.33C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}

function TextField({ icon: Icon, ...props }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg px-3.5 py-3 bg-surface-container-lowest border-b-2 border-outline-variant focus-within:border-primary transition-colors">
      <Icon size={16} className="text-outline" />
      <input {...props} className="flex-1 min-w-0 bg-transparent outline-none text-sm font-semibold text-on-surface" />
    </div>
  );
}

function AccountView({ session, answers, freshersMode, onOpenFreshers, onBack, onLogOut, onOpenHousehold, onEditPreferences }) {
  const email = session.user.email || '';
  const provider = session.user.app_metadata?.provider === 'google' ? 'Google' : 'email';
  const initial = email.trim()[0]?.toUpperCase() || '?';
  const [photoUrl, setPhotoUrl] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const savedRecipes = getSavedRecipes();
  const restrictionLabels = (answers?.restrictions || [])
    .map((id) => DIETARY_RESTRICTIONS.find((r) => r.id === id)?.label)
    .filter(Boolean);
  const allergyLabels = (answers?.allergies || [])
    .map((id) => ALLERGENS.find((a) => a.id === id)?.label)
    .filter(Boolean);
  const batchProUnlocked = (() => {
    try {
      return localStorage.getItem(BATCH_PRO_KEY) === 'true';
    } catch {
      return false;
    }
  })();

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
            <ChevronLeft size={18} className="text-primary" />
          </button>
          <h1 className="font-display text-2xl font-semibold text-primary">Profile</h1>
        </div>
        {onOpenHousehold && <HouseholdHeaderButton onClick={onOpenHousehold} />}
      </header>

      <div className="flex-1 px-5 pb-10 max-w-2xl mx-auto w-full flex flex-col gap-6">
        <section className="flex flex-col items-center text-center gap-2 mt-2">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center font-display text-3xl soft-shadow overflow-hidden bg-cover bg-center"
              style={photoUrl ? { backgroundImage: `url("${photoUrl}")` } : undefined}
            >
              {!photoUrl && initial}
            </div>
            <label
              htmlFor="profile-photo-input"
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center border-2 border-surface cursor-pointer"
              aria-label="Change profile photo"
            >
              <Camera size={13} />
            </label>
            <input id="profile-photo-input" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </div>
          <p className="text-base font-semibold text-primary">{email}</p>
          <p className="text-xs font-medium text-on-surface-variant">Signed in with {provider}</p>
        </section>

        {savedRecipes.length > 0 && (
          <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4">
            <div className="flex justify-between items-end mb-3">
              <h3 className="font-display text-2xl font-semibold text-primary">Saved Recipes</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {savedRecipes.slice(0, 3).map((recipe) => (
                <div key={recipe.id}>
                  <div
                    className="relative aspect-square rounded-lg overflow-hidden mb-1"
                    style={{ backgroundColor: recipe.fallback, backgroundImage: `url("${recipe.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <span className="absolute top-1.5 right-1.5 bg-white/90 p-1 rounded-full">
                      <Heart size={12} className="text-primary" fill="currentColor" />
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary truncate">{recipe.title}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {restrictionLabels.length > 0 && (
          <section className="bg-primary text-on-primary rounded-xl p-4">
            <h3 className="font-display text-2xl font-semibold mb-3">Dietary</h3>
            <div className="flex flex-wrap gap-2">
              {restrictionLabels.map((label) => (
                <span key={label} className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wider">
                  {label}
                </span>
              ))}
            </div>
          </section>
        )}

        {allergyLabels.length > 0 && (
          <section className="bg-secondary-container rounded-xl p-4">
            <h3 className="font-display text-2xl font-semibold mb-3 text-on-secondary-container">Allergies</h3>
            <div className="flex flex-wrap gap-2">
              {allergyLabels.map((label) => (
                <span
                  key={label}
                  className="bg-white/40 border border-white/40 px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wider text-on-secondary-container"
                >
                  {label}
                </span>
              ))}
            </div>
          </section>
        )}

        {batchProUnlocked && (
          <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4">
            <h3 className="font-display text-2xl font-semibold text-primary mb-3">Achievements</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
                <Award size={20} className="text-on-tertiary-fixed" />
              </div>
              <div>
                <p className="text-base font-semibold text-primary">Batch Pro</p>
                <p className="text-sm text-on-surface-variant">Cooked a recipe in batch portions</p>
              </div>
            </div>
          </section>
        )}

        <button
          type="button"
          onClick={onOpenFreshers}
          className="flex items-center justify-between gap-3 bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
              <GraduationCap size={18} className="text-on-primary-fixed" />
            </div>
            <div>
              <p className="text-base font-semibold text-primary">Freshers Mode</p>
              <p className="text-sm text-on-surface-variant">{freshersMode ? 'On' : 'Off'} — simplified recipes for beginners</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-outline shrink-0" />
        </button>

        <button
          type="button"
          onClick={onEditPreferences}
          className="flex items-center justify-between gap-3 bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
              <Settings size={18} className="text-on-secondary-container" />
            </div>
            <div>
              <p className="text-base font-semibold text-primary">Edit Allergies, Diet & Kitchen Setup</p>
              <p className="text-sm text-on-surface-variant">Retake the setup questions to update your answers</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-outline shrink-0" />
        </button>

        <button
          type="button"
          onClick={onLogOut}
          className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest font-semibold tracking-wider text-sm text-on-surface"
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </div>
  );
}

export default function ForkitAuth({ session, answers, freshersMode, onOpenFreshers, onBack, onLogOut, onOpenHousehold, onEditPreferences }) {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (session) {
    return (
      <AccountView
        session={session}
        answers={answers}
        freshersMode={freshersMode}
        onOpenFreshers={onOpenFreshers}
        onBack={onBack}
        onLogOut={onLogOut}
        onOpenHousehold={onOpenHousehold}
        onEditPreferences={onEditPreferences}
      />
    );
  }

  const canSubmit = email.trim().length > 3 && password.length >= 6 && !submitting;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError('');
    setNotice('');
    setSubmitting(true);

    const { data, error: authError } =
      mode === 'signin'
        ? await supabase.auth.signInWithPassword({ email: email.trim(), password })
        : await supabase.auth.signUp({ email: email.trim(), password });

    setSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    if (mode === 'signup' && !data.session) {
      setNotice('Check your email to confirm your account.');
      return;
    }
    onBack();
  };

  const continueWithGoogle = async () => {
    setError('');
    // window.location.origin never includes a path, so on the deployed
    // GitHub Pages project site (served from /Isabellaapp/, not the bare
    // domain) that alone redirects back to a URL with no Pages content —
    // import.meta.env.BASE_URL adds back whatever base Vite actually built
    // this under (/Isabellaapp/ in production, / in dev).
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + import.meta.env.BASE_URL },
    });
    if (authError) setError(authError.message);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container shrink-0" aria-label="Back">
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <h1 className="font-display text-2xl font-semibold text-primary">{mode === 'signin' ? 'Sign in' : 'Create account'}</h1>
      </header>

      <div className="flex-1 px-5 pt-4 pb-10 max-w-[28rem] mx-auto w-full flex flex-col">
        <div className="flex rounded-full p-1 mb-6 bg-surface-container-lowest border border-outline-variant">
          {['signin', 'signup'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError('');
                setNotice('');
              }}
              className={`flex-1 py-2 rounded-full text-sm font-semibold tracking-wider transition-colors ${
                mode === m ? 'bg-primary text-on-primary' : 'text-primary'
              }`}
            >
              {m === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={continueWithGoogle}
          className="flex items-center justify-center gap-2.5 rounded-lg py-3 border border-outline-variant bg-surface-container-lowest font-semibold tracking-wider text-sm text-on-surface mb-5"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-outline-variant" />
          <span className="text-xs font-medium text-outline">or</span>
          <div className="flex-1 h-px bg-outline-variant" />
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <TextField
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <div className="relative">
            <TextField
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p className="text-xs font-medium text-error">{error}</p>}
          {notice && <p className="text-xs font-medium text-primary">{notice}</p>}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-3.5 rounded-lg font-semibold tracking-wider text-sm mt-2 transition-opacity bg-primary text-on-primary"
            style={{ opacity: canSubmit ? 1 : 0.4 }}
          >
            {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="text-xs font-medium text-center mt-4 text-on-surface-variant">
          Password must be at least 6 characters.
        </p>
      </div>
    </div>
  );
}
