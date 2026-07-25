import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, AlertCircle } from 'lucide-react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';
import { Avatar } from '../components/Avatar';
import { GiftSuggestionCard } from '../components/GiftSuggestionCard';
import { useAppData } from '../context/AppDataContext';
import { generateGiftSuggestions, BUDGET_OPTIONS, VIBE_OPTIONS } from '../utils/giftGenie';
import { GiftSuggestion, PriceRangeTag, WishlistItem } from '../types/index';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'GiftGenie'>;

export function GiftGenieScreen({ route }: Props) {
  const { friends, addWishlistItem } = useAppData();
  const [selectedId, setSelectedId] = useState<string>(route.params?.friendId || friends[0]?.id);
  const [budget, setBudget] = useState<PriceRangeTag>('35to75');
  const [vibe, setVibe] = useState<string>(VIBE_OPTIONS[0]);
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [addedIndexes, setAddedIndexes] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    if (route.params?.friendId) setSelectedId(route.params.friendId);
  }, [route.params?.friendId]);

  const friend = friends.find((f) => f.id === selectedId) || friends[0];

  const runGenerate = () => {
    if (!friend) return;
    setIsLoading(true);
    setAddedIndexes([]);
    const nextSeed = seed + 1;
    setSeed(nextSeed);
    setTimeout(() => {
      setSuggestions(generateGiftSuggestions(friend, budget, vibe, nextSeed));
      setIsLoading(false);
    }, 450);
  };

  useEffect(() => {
    runGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const handleAdd = (suggestion: GiftSuggestion, index: number) => {
    if (!friend) return;
    const priceNum = parseInt(suggestion.price.replace(/[^0-9]/g, ''), 10) || 0;
    const item: WishlistItem = {
      id: `wish-ai-${Date.now()}`,
      title: suggestion.title,
      price: priceNum,
      priceRangeTag: suggestion.priceTag,
      store: suggestion.store,
      category: suggestion.category,
      notes: suggestion.reason,
      claimedBy: null,
      claimedStatus: 'unclaimed',
      priority: 'high',
    };
    addWishlistItem(friend.id, item);
    setAddedIndexes((prev) => [...prev, index]);
  };

  if (!friend) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.emptyText}>Add a bestie first to get gift ideas.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <View style={styles.bannerBadge}>
            <Sparkles size={12} color={colors.accentSoft} />
            <Text style={styles.bannerBadgeText}>Smart Gift Genie</Text>
          </View>
          <Text style={styles.bannerTitle}>Gift Genie 🎁</Text>
          <Text style={styles.bannerSubtitle}>
            Suggestions built from {friend.name.split(' ')[0]}'s saved preferences, past gifts friends have
            given her, and the budget & vibe you pick below.
          </Text>
        </View>

        <View style={styles.controlsCard}>
          <ControlGroup label="1. Select friend">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              {friends.map((f) => {
                const isActive = f.id === friend.id;
                return (
                  <Pressable
                    key={f.id}
                    onPress={() => setSelectedId(f.id)}
                    style={[styles.friendChip, isActive && styles.chipActive]}
                  >
                    <Avatar uri={f.avatar} name={f.name} size={20} />
                    <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                      {f.name.split(' ')[0]}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </ControlGroup>

          <ControlGroup label="2. Target budget">
            <View style={styles.chipWrap}>
              {BUDGET_OPTIONS.map((opt) => {
                const isActive = budget === opt.value;
                return (
                  <Pressable
                    key={opt.value}
                    onPress={() => setBudget(opt.value)}
                    style={[styles.chip, isActive && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{opt.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </ControlGroup>

          <ControlGroup label="3. Desired vibe">
            <View style={styles.chipWrap}>
              {VIBE_OPTIONS.map((opt) => {
                const isActive = vibe === opt;
                return (
                  <Pressable
                    key={opt}
                    onPress={() => setVibe(opt)}
                    style={[styles.chip, isActive && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{opt}</Text>
                  </Pressable>
                );
              })}
            </View>
          </ControlGroup>

          <View style={styles.snapshot}>
            <Avatar uri={friend.avatar} name={friend.name} size={40} />
            <View style={styles.snapshotText}>
              <Text style={styles.snapshotName}>{friend.name}'s profile filters</Text>
              <Text style={styles.snapshotMeta} numberOfLines={2}>
                Shops: {friend.preferences.favoriteShops.join(', ')}
              </Text>
            </View>
          </View>

          {friend.preferences.doNotWant.length > 0 && (
            <View style={styles.avoidPill}>
              <AlertCircle size={13} color={colors.danger} />
              <Text style={styles.avoidText} numberOfLines={1}>
                Avoids: {friend.preferences.doNotWant[0]}
              </Text>
            </View>
          )}

          <Pressable style={styles.generateButton} onPress={runGenerate} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <>
                <Sparkles size={16} color={colors.white} />
                <Text style={styles.generateButtonText}>
                  Generate ideas for {friend.name.split(' ')[0]}
                </Text>
              </>
            )}
          </Pressable>
        </View>

        <View style={styles.suggestions}>
          {isLoading
            ? Array.from({ length: 2 }).map((_, idx) => <View key={idx} style={styles.skeletonCard} />)
            : suggestions.map((s, idx) => (
                <GiftSuggestionCard
                  key={`${s.title}-${idx}`}
                  suggestion={s}
                  isAdded={addedIndexes.includes(idx)}
                  onAdd={() => handleAdd(s, idx)}
                />
              ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.controlGroup}>
      <Text style={styles.controlLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyText: {
    fontFamily: fonts.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  banner: {
    backgroundColor: colors.accent,
    borderRadius: radii.card,
    padding: spacing.lg,
    gap: 6,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 4,
  },
  bannerBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.accentSoft,
  },
  bannerTitle: {
    fontFamily: fonts.displayItalic,
    fontSize: 26,
    color: colors.white,
  },
  bannerSubtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
  },
  controlsCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: spacing.md,
    gap: spacing.md,
  },
  controlGroup: {
    gap: 8,
  },
  controlLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.accent,
  },
  chipRow: {
    gap: 8,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  friendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chip: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  chipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textPrimary,
  },
  chipTextActive: {
    color: colors.white,
  },
  snapshot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    padding: spacing.sm,
  },
  snapshotText: {
    flex: 1,
    gap: 2,
  },
  snapshotName: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.textPrimary,
  },
  snapshotMeta: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textSecondary,
  },
  avoidPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(182,92,74,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(182,92,74,0.25)',
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  avoidText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.danger,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingVertical: 14,
  },
  generateButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.white,
  },
  suggestions: {
    gap: spacing.md,
  },
  skeletonCard: {
    height: 140,
    borderRadius: radii.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
