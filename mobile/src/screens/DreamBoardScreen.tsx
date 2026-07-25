import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bookmark, Plus } from 'lucide-react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';
import { DreamPinCard } from '../components/DreamPinCard';
import { AddPinModal } from '../components/AddPinModal';
import { useAppData } from '../context/AppDataContext';
import { PRICE_FILTERS } from '../utils/priceRanges';
import { PriceRangeTag } from '../types/index';

export function DreamBoardScreen() {
  const { dreamBoardItems, addDreamBoardItem } = useAppData();
  const [priceFilter, setPriceFilter] = useState<PriceRangeTag | 'all'>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { width } = useWindowDimensions();

  const columnGap = spacing.md;
  const horizontalPadding = spacing.lg * 2;
  const cardWidth = (width - horizontalPadding - columnGap) / 2;

  const filteredPins = useMemo(() => {
    if (priceFilter === 'all') return dreamBoardItems;
    return dreamBoardItems.filter((pin) => pin.priceRangeTag === priceFilter);
  }, [dreamBoardItems, priceFilter]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <View style={styles.headerTitleRow}>
            <Bookmark size={20} color={colors.accent} />
            <Text style={styles.title}>Dream Board</Text>
          </View>
          <Text style={styles.subtitle}>Your private scrapbook of pics, links & TikToks</Text>
        </View>
        <Pressable style={styles.saveButton} onPress={() => setIsAddOpen(true)}>
          <Plus size={16} color={colors.white} />
          <Text style={styles.saveButtonText}>Save Pin</Text>
        </Pressable>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={PRICE_FILTERS}
        keyExtractor={(item) => item.value}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => {
          const isActive = priceFilter === item.value;
          return (
            <Pressable
              onPress={() => setPriceFilter(item.value)}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
            >
              <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

      {filteredPins.length === 0 ? (
        <View style={styles.emptyState}>
          <Bookmark size={28} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>No pins match this filter</Text>
          <Text style={styles.emptySubtitle}>Try another price range, or save your first pin above!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPins}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: columnGap }}
          contentContainerStyle={styles.grid}
          ItemSeparatorComponent={() => <View style={{ height: columnGap }} />}
          renderItem={({ item }) => <DreamPinCard pin={item} width={cardWidth} />}
        />
      )}

      <AddPinModal visible={isAddOpen} onClose={() => setIsAddOpen(false)} onSave={addDreamBoardItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSecondary,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  saveButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.white,
  },
  filterRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: 8,
  },
  filterChip: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  filterChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterChipText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.textPrimary,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  grid: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  emptySubtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
