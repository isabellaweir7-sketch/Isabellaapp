import React from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { ShoppingBag, ExternalLink, Plus, Check } from 'lucide-react-native';
import { GiftSuggestion } from '../types/index';
import { colors, fonts, radii, spacing, shadow } from '../theme/theme';

interface GiftSuggestionCardProps {
  suggestion: GiftSuggestion;
  isAdded: boolean;
  onAdd: () => void;
}

export function GiftSuggestionCard({ suggestion, isAdded, onAdd }: GiftSuggestionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.tagPill}>
          <Text style={styles.tagText} numberOfLines={1}>
            {suggestion.category} · {suggestion.store}
          </Text>
        </View>
        <Text style={styles.price}>{suggestion.price}</Text>
      </View>

      <Text style={styles.title}>{suggestion.title}</Text>

      <View style={styles.reasonBox}>
        <Text style={styles.reasonText}>"{suggestion.reason}"</Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={() => Linking.openURL(suggestion.affiliateUrl)}
          style={styles.buyButton}
        >
          <ShoppingBag size={13} color={colors.accent} />
          <Text style={styles.buyButtonText} numberOfLines={1}>
            Buy on {suggestion.store}
          </Text>
          <ExternalLink size={11} color={colors.textSecondary} />
        </Pressable>

        <Pressable
          onPress={onAdd}
          disabled={isAdded}
          style={[styles.addButton, isAdded && styles.addButtonDone]}
        >
          {isAdded ? (
            <>
              <Check size={13} color={colors.accent} />
              <Text style={styles.addButtonTextDone}>Added</Text>
            </>
          ) : (
            <>
              <Plus size={13} color={colors.white} />
              <Text style={styles.addButtonText}>Add</Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadow.card,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tagPill: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.accent,
  },
  price: {
    fontFamily: fonts.displayItalic,
    fontSize: 18,
    color: colors.accent,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  reasonBox: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 10,
  },
  reasonText: {
    fontFamily: fonts.body,
    fontStyle: 'italic',
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 17,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  buyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  buyButtonText: {
    flex: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  addButtonDone: {
    backgroundColor: colors.accentSoft,
  },
  addButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: 'uppercase',
    color: colors.white,
  },
  addButtonTextDone: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: 'uppercase',
    color: colors.accent,
  },
});
