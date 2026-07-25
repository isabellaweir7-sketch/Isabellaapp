import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'wishly_session_active';

interface SessionContextValue {
  isSignedIn: boolean;
  isReady: boolean;
  signIn: () => void;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(SESSION_KEY);
      setIsSignedIn(saved === 'true');
      setIsReady(true);
    })();
  }, []);

  const signIn = useCallback(() => {
    setIsSignedIn(true);
    AsyncStorage.setItem(SESSION_KEY, 'true');
  }, []);

  const signOut = useCallback(() => {
    setIsSignedIn(false);
    AsyncStorage.setItem(SESSION_KEY, 'false');
  }, []);

  return (
    <SessionContext.Provider value={{ isSignedIn, isReady, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
