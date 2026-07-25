import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FriendProfile, UserGiverProgress, WishlistItem, DreamBoardItem } from '../types/index';
import { INITIAL_PROFILES, INITIAL_USER_PROGRESS } from '../data/mockData';

const FRIENDS_KEY = 'wishly_friends_data';
const PROGRESS_KEY = 'wishly_user_progress';

interface AppDataContextValue {
  friends: FriendProfile[];
  userProgress: UserGiverProgress;
  isLoaded: boolean;
  addFriend: (friend: FriendProfile) => void;
  updateFriend: (friend: FriendProfile) => void;
  toggleReminder: (friendId: string) => void;
  addWishlistItem: (friendId: string, item: WishlistItem) => void;
  addDreamBoardItem: (friendId: string, item: DreamBoardItem) => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [friends, setFriends] = useState<FriendProfile[]>(INITIAL_PROFILES);
  const [userProgress, setUserProgress] = useState<UserGiverProgress>(INITIAL_USER_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [savedFriends, savedProgress] = await Promise.all([
          AsyncStorage.getItem(FRIENDS_KEY),
          AsyncStorage.getItem(PROGRESS_KEY),
        ]);
        if (savedFriends) setFriends(JSON.parse(savedFriends));
        if (savedProgress) setUserProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to load saved app data', e);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (isLoaded) AsyncStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
  }, [friends, isLoaded]);

  useEffect(() => {
    if (isLoaded) AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(userProgress));
  }, [userProgress, isLoaded]);

  const addFriend = useCallback((friend: FriendProfile) => {
    setFriends((prev) => [friend, ...prev]);
  }, []);

  const updateFriend = useCallback((updated: FriendProfile) => {
    setFriends((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  }, []);

  const toggleReminder = useCallback((friendId: string) => {
    setFriends((prev) =>
      prev.map((f) => (f.id === friendId ? { ...f, reminderEnabled: !f.reminderEnabled } : f))
    );
  }, []);

  const addWishlistItem = useCallback((friendId: string, item: WishlistItem) => {
    setFriends((prev) =>
      prev.map((f) => (f.id === friendId ? { ...f, wishlistItems: [item, ...f.wishlistItems] } : f))
    );
  }, []);

  const addDreamBoardItem = useCallback((friendId: string, item: DreamBoardItem) => {
    setFriends((prev) =>
      prev.map((f) => (f.id === friendId ? { ...f, dreamBoardItems: [item, ...f.dreamBoardItems] } : f))
    );
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        friends,
        userProgress,
        isLoaded,
        addFriend,
        updateFriend,
        toggleReminder,
        addWishlistItem,
        addDreamBoardItem,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
