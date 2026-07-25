import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Linking } from 'react-native';
import { ExternalLink, CheckCircle2, CalendarDays, Users } from 'lucide-react-native';
import { WishlistItem } from '../types/index';
import { colors, fonts, radii, spacing } from '../theme/theme';

const ME = 'You';

interface WishlistItemCardProps {
  item: WishlistItem;
  onToggleClaim: () => void;
  onToggleChipIn: () => void;
}

export function WishlistItemCard({ item, onToggleClaim, onToggleChipIn }: WishlistItemCardProps) {
  const isClaimedByMe = item.claimedBy === ME;
  const isClaimedByOther = Boolean(item.claimedBy) && item.claimedBy !== ME;
  const isChippingIn = item.claimedStatus === 'chipping_in';
  const isInChipIn = Boolean(item.chipInParticipants?.includes(ME));
  const chipInDisplayCount = item.chipInParticipants?.length ?? item.chipInCount ?? 1;

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
          {item.eventDate ? (
            <View style={styles.eventRow}>
              <CalendarDays size={11} color={colors.accent} />
              <Text style={styles.eventText} numberOfLines={1}>
                {item.eventDate}
                {item.eventVenue ? ` · ${item.eventVenue}` : ''}
              </Text>
            </View>
          ) : null}
          {item.notes ? <Text style={styles.notes}>"{item.notes}"</Text> : null}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.statusRow}>
          <Text style={styles.status}>
            {isClaimedByMe
              ? 'Claimed by you!'
              : isClaimedByOther
              ? `Reserved by ${item.claimedBy}`
              : isChippingIn
              ? `Chipping in (${chipInDisplayCount} ${chipInDisplayCount === 1 ? 'friend' : 'friends'})`
              : 'Unclaimed'}
          </Text>
          {item.url ? (
            <Pressable onPress={() => Linking.openURL(item.url!)} hitSlop={8} style={styles.linkButton}>
              <ExternalLink size={16} color={colors.textSecondary} />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.actionsRow}>
          {!item.claimedBy && !isChippingIn && (
            <Pressable onPress={onToggleChipIn} style={styles.chipInSecondaryButton}>
              <Users size={13} color={colors.accent} />
              <Text style={styles.chipInSecondaryButtonText}>Chip in</Text>
            </Pressable>
          )}

          {isChippingIn ? (
            <Pressable
              onPress={onToggleChipIn}
              style={[styles.claimButton, isInChipIn && styles.claimButtonMine, { flex: 1 }]}
            >
              {isInChipIn && <CheckCircle2 size={14} color={colors.white} />}
              <Text style={styles.claimButtonText}>
                {isInChipIn ? "You're in — Leave" : `Join chip-in`}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={onToggleClaim}
              disabled={isClaimedByOther}
              style={[
                styles.claimButton,
                isClaimedByMe && styles.claimButtonMine,
                isClaimedByOther && styles.claimButtonDisabled,
                { flex: 1 },
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
          )}
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
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  eventText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    color: colors.accent,
    flexShrink: 1,
  },
  notes: {
    fontFamily: fonts.body,
    fontStyle: 'italic',
    fontSize: 11,
    color: colors.textPrimary,
    marginTop: 2,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  status: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.textSecondary,
    flexShrink: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkButton: {
    padding: 4,
  },
  chipInSecondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  chipInSecondaryButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  claimButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
