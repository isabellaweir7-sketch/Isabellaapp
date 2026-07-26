import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

WebBrowser.maybeCompleteAuthSession();

const LOCAL_FALLBACK_KEY = 'giftling_session_active';

interface AuthResult {
  error?: string;
  needsEmailConfirmation?: boolean;
}

interface SessionContextValue {
  isSignedIn: boolean;
  isReady: boolean;
  userId: string | null;
  signInWithPassword: (email: string, password: string) => Promise<AuthResult>;
  signUpWithPassword: (email: string, password: string, displayName: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

async function ensureProfile(user: User) {
  const displayName =
    (user.user_metadata?.display_name as string | undefined) || user.email?.split('@')[0] || 'Giftling user';

  await supabase.from('profiles').upsert(
    { id: user.id, display_name: displayName },
    { onConflict: 'id', ignoreDuplicates: true }
  );
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [localFallback, setLocalFallback] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // No backend configured yet -- fall back to the old local-only toggle
      // so the app still works out of the box.
      (async () => {
        const saved = await AsyncStorage.getItem(LOCAL_FALLBACK_KEY);
        setLocalFallback(saved === 'true');
        setIsReady(true);
      })();
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) ensureProfile(newSession.user);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signInWithPassword = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    if (!isSupabaseConfigured) {
      setLocalFallback(true);
      AsyncStorage.setItem(LOCAL_FALLBACK_KEY, 'true');
      return {};
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    if (data.user) await ensureProfile(data.user);
    return {};
  }, []);

  const signUpWithPassword = useCallback(
    async (email: string, password: string, displayName: string): Promise<AuthResult> => {
      if (!isSupabaseConfigured) {
        setLocalFallback(true);
        AsyncStorage.setItem(LOCAL_FALLBACK_KEY, 'true');
        return {};
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
      });
      if (error) return { error: error.message };

      if (!data.session) {
        // Project has "confirm email" enabled -- no active session yet.
        return { needsEmailConfirmation: true };
      }

      if (data.user) await ensureProfile(data.user);
      return {};
    },
    []
  );

  const signInWithGoogle = useCallback(async (): Promise<AuthResult> => {
    if (!isSupabaseConfigured) {
      return { error: 'Google sign-in needs the backend set up first — use email for now.' };
    }

    const redirectTo = Linking.createURL('auth/callback');

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo, skipBrowserRedirect: true },
    });
    if (error) return { error: error.message };
    if (!data.url) return { error: 'Could not start Google sign-in.' };

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
    if (result.type === 'cancel' || result.type === 'dismiss') return {};
    if (result.type !== 'success' || !result.url) {
      return { error: 'Google sign-in was interrupted — please try again.' };
    }

    const code = new URL(result.url).searchParams.get('code');
    if (!code) return { error: 'Google sign-in did not return a valid code.' };

    const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
    if (sessionError) return { error: sessionError.message };
    if (sessionData.user) await ensureProfile(sessionData.user);
    return {};
  }, []);

  const signOut = useCallback(() => {
    if (isSupabaseConfigured) {
      supabase.auth.signOut();
    } else {
      setLocalFallback(false);
      AsyncStorage.setItem(LOCAL_FALLBACK_KEY, 'false');
    }
  }, []);

  const isSignedIn = isSupabaseConfigured ? Boolean(session) : localFallback;
  const userId = isSupabaseConfigured ? session?.user.id ?? null : null;

  return (
    <SessionContext.Provider
      value={{
        isSignedIn,
        isReady,
        userId,
        signInWithPassword,
        signUpWithPassword,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
