import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Linking } from 'react-native';
import { ExternalLink, CheckCircle2 } from 'lucide-react-native';
import { WishlistItem } from '../types/index';
import { colors, fonts, radii, spacing } from '../theme/theme';

const ME = 'You';

interface WishlistItemCardProps {
  item: WishlistItem;
  onToggleClaim: () => void;
}

export function WishlistItemCard({ item, onToggleClaim }: WishlistItemCardProps) {
  const isClaimedByMe = item.claimedBy === ME;
  const isClaimedByOther = Boolean(item.claimedBy) && item.claimedBy !== ME;

  return (
    <View
      style={[
        styles.card,
        isClaimedByMe && styles.claimedByMe,
        isClaimedByOther && styles.claimedByOther,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <View style={styles.body}>
        {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.image} /> : null}
        <View style={styles.info}>
          <Text style={styles.itemTitle} numberOfLines={3}>
            {item.title}
          </Text>
          <Text style={styles.store}>{item.store}</Text>
          {item.notes ? <Text style={styles.notes}>"{item.notes}"</Text> : null}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.status}>
          {isClaimedByMe
            ? 'Claimed by you!'
            : isClaimedByOther
            ? `Reserved by ${item.claimedBy}`
            : item.claimedStatus === 'chipping_in'
            ? `Chipping in (${item.chipInCount || 2} friends)`
            : 'Unclaimed'}
        </Text>

        <View style={styles.footerActions}>
          {item.url ? (
            <Pressable onPress={() => Linking.openURL(item.url!)} hitSlop={8} style={styles.linkButton}>
              <ExternalLink size={16} color={colors.textSecondary} />
            </Pressable>
          ) : null}

          <Pressable
            onPress={onToggleClaim}
            disabled={isClaimedByOther}
            style={[
              styles.claimButton,
              isClaimedByMe && styles.claimButtonMine,
              isClaimedByOther && styles.claimButtonDisabled,
            ]}
          >
            {isClaimedByMe && <CheckCircle2 size={14} color={colors.white} />}
            <Text
              style={[
                styles.claimButtonText,
                isClaimedByOther && styles.claimButtonTextDisabled,
              ]}
            >
              {isClaimedByMe ? 'Release' : isClaimedByOther ? 'Reserved' : 'Claim gift'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    padding: spacing.md,
    gap: spacing.sm,
  },
  claimedByMe: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentSoft,
  },
  claimedByOther: {
    opacity: 0.6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryPill: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  categoryText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.textSecondary,
  },
  price: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    color: colors.accent,
  },
  body: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  store: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textSecondary,
  },
  notes: {
    fontFamily: fonts.body,
    fontStyle: 'italic',
    fontSize: 11,
    color: colors.textPrimary,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  status: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.textSecondary,
    flexShrink: 1,
  },
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkButton: {
    padding: 4,
  },
  claimButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  claimButtonMine: {
    backgroundColor: colors.accentDark,
  },
  claimButtonDisabled: {
    backgroundColor: colors.border,
  },
  claimButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.white,
  },
  claimButtonTextDisabled: {
    color: colors.textSecondary,
  },
});
