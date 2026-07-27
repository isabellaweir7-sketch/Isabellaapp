import React, { useState } from 'react';
import { ChevronLeft, Mail, Lock, Eye, EyeOff, LogOut } from 'lucide-react';
import { supabase } from './supabaseClient';

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
    <div
      className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 border"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DAC0' }}
    >
      <Icon size={16} color="#93876B" />
      <input
        {...props}
        className="flex-1 min-w-0 bg-transparent outline-none text-sm font-semibold"
        style={{ color: '#232B1D' }}
      />
    </div>
  );
}

function AccountView({ session, onBack, onLogOut }) {
  const email = session.user.email || '';
  const provider = session.user.app_metadata?.provider === 'google' ? 'Google' : 'email';
  const initial = email.trim()[0]?.toUpperCase() || '?';

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F3ECDA' }}>
      <div className="flex items-center gap-3 px-6 pt-8 pb-5" style={{ backgroundColor: '#161D14' }}>
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full shrink-0"
          style={{ backgroundColor: '#212B1D' }}
          aria-label="Back"
        >
          <ChevronLeft size={18} color="#F2E9DC" />
        </button>
        <h1 className="font-display text-xl" style={{ color: '#F2E9DC' }}>
          Account
        </h1>
      </div>

      <div className="flex-1 px-6 pt-8 flex flex-col items-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center font-display text-2xl mb-4"
          style={{ backgroundColor: '#9ACB4B', color: '#161D14' }}
        >
          {initial}
        </div>
        <p className="text-sm font-semibold" style={{ color: '#232B1D' }}>
          {email}
        </p>
        <p className="text-xs font-semibold mt-1" style={{ color: '#93876B' }}>
          Signed in with {provider}
        </p>

        <button
          type="button"
          onClick={onLogOut}
          className="mt-8 flex items-center gap-2 px-5 py-3 rounded-full border font-semibold text-sm"
          style={{ borderColor: '#E3DAC0', color: '#232B1D', backgroundColor: '#FFFFFF' }}
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </div>
  );
}

export default function ForkitAuth({ session, onBack, onLogOut }) {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (session) {
    return <AccountView session={session} onBack={onBack} onLogOut={onLogOut} />;
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
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (authError) setError(authError.message);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F3ECDA' }}>
      <div className="flex items-center gap-3 px-6 pt-8 pb-5" style={{ backgroundColor: '#161D14' }}>
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full shrink-0"
          style={{ backgroundColor: '#212B1D' }}
          aria-label="Back"
        >
          <ChevronLeft size={18} color="#F2E9DC" />
        </button>
        <h1 className="font-display text-xl" style={{ color: '#F2E9DC' }}>
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </h1>
      </div>

      <div className="flex-1 px-6 pt-8 flex flex-col">
        <div className="flex rounded-full p-1 mb-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E3DAC0' }}>
          {['signin', 'signup'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError('');
                setNotice('');
              }}
              className="flex-1 py-2 rounded-full text-sm font-bold transition-colors"
              style={{
                backgroundColor: mode === m ? '#9ACB4B' : 'transparent',
                color: '#232B1D',
              }}
            >
              {m === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={continueWithGoogle}
          className="flex items-center justify-center gap-2.5 rounded-full py-3 border font-semibold text-sm mb-5"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DAC0', color: '#232B1D' }}
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ backgroundColor: '#E3DAC0' }} />
          <span className="text-xs font-semibold" style={{ color: '#93876B' }}>
            or
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#E3DAC0' }} />
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
              className="absolute right-3.5 top-1/2 -translate-y-1/2"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} color="#93876B" /> : <Eye size={16} color="#93876B" />}
            </button>
          </div>

          {error && (
            <p className="text-xs font-semibold" style={{ color: '#B3452F' }}>
              {error}
            </p>
          )}
          {notice && (
            <p className="text-xs font-semibold" style={{ color: '#5A7A3A' }}>
              {notice}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-3.5 rounded-full font-display text-base mt-2 transition-opacity"
            style={{ backgroundColor: '#9ACB4B', color: '#161D14', opacity: canSubmit ? 1 : 0.4 }}
          >
            {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="text-xs font-medium text-center mt-4" style={{ color: '#93876B' }}>
          Password must be at least 6 characters.
        </p>
      </div>
    </div>
  );
}
