import React from 'react';
import { Modal, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { X, ArrowRight, Gift, AlertCircle, Bell, BellOff } from 'lucide-react-native';
import { FriendProfile } from '../types/index';
import { calculateCountdown, formatBirthdayFull } from '../utils/dateUtils';
import { colors, fonts, radii, spacing } from '../theme/theme';

interface FriendQuickViewSheetProps {
  friend: FriendProfile | null;
  onClose: () => void;
  onViewProfile: (friendId: string) => void;
  onOpenGiftGenie: (friendId: string) => void;
  onToggleReminder: (friendId: string) => void;
}

export function FriendQuickViewSheet({
  friend,
  onClose,
  onViewProfile,
  onOpenGiftGenie,
  onToggleReminder,
}: FriendQuickViewSheetProps) {
  if (!friend) return null;
  const countdown = calculateCountdown(friend.birthday);

  return (
    <Modal visible={Boolean(friend)} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Pressable onPress={onClose} hitSlop={10} style={styles.closeButton}>
            <X size={18} color={colors.textSecondary} />
          </Pressable>

          <View style={styles.headerRow}>
            <Image source={{ uri: friend.avatar }} style={styles.avatar} />
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{friend.name}</Text>
              <Text style={styles.meta}>
                {friend.relationship} · {formatBirthdayFull(friend.birthday)} ({friend.zodiacSign})
              </Text>
              <View style={styles.countdownRow}>
                <View style={styles.countdownPill}>
                  <Text style={styles.countdownText}>
                    {countdown.isToday ? "🎂 It's today!" : `🎂 Birthday in ${countdown.days} days!`}
                  </Text>
                </View>
                <Pressable onPress={() => onToggleReminder(friend.id)} hitSlop={8} style={styles.reminderButton}>
                  {friend.reminderEnabled ? (
                    <Bell size={16} color={colors.accent} />
                  ) : (
                    <BellOff size={16} color={colors.textMuted} />
                  )}
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLine}>
              <Text style={styles.infoLabel}>Fav Shops: </Text>
              {friend.preferences.favoriteShops.join(', ')}
            </Text>
            <Text style={styles.infoLine}>
              <Text style={styles.infoLabel}>Fav Snacks: </Text>
              {friend.preferences.favoriteSnacks.join(', ')}
            </Text>
            {friend.preferences.doNotWant.length > 0 && (
              <View style={styles.warningRow}>
                <AlertCircle size={13} color={colors.danger} />
                <Text style={styles.warningText}>{friend.preferences.doNotWant[0]}</Text>
              </View>
            )}
          </View>

          <View style={styles.actionsRow}>
            <Pressable
              style={styles.secondaryAction}
              onPress={() => {
                onClose();
                onViewProfile(friend.id);
              }}
            >
              <Text style={styles.secondaryActionText}>View Wishlist</Text>
              <ArrowRight size={15} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.primaryAction}
              onPress={() => {
                onClose();
                onOpenGiftGenie(friend.id);
              }}
            >
              <Gift size={15} color={colors.white} />
              <Text style={styles.primaryActionText}>Gift Ideas</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(43,42,34,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.background,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingRight: spacing.xl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.white,
  },
  headerInfo: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontFamily: fonts.displayItalic,
    fontSize: 22,
    color: colors.accent,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSecondary,
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  countdownPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentSoft,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  reminderButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  infoBox: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    padding: spacing.md,
    gap: 6,
  },
  infoLine: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  infoLabel: {
    fontFamily: fonts.bodyBold,
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 2,
  },
  warningText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.danger,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingVertical: 12,
  },
  secondaryActionText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.textPrimary,
  },
  primaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingVertical: 12,
  },
  primaryActionText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.white,
  },
});
