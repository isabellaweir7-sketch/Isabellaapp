import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Bell, BellOff } from 'lucide-react-native';
import { FriendProfile } from '../types/index';
import { calculateCountdown, formatBirthdayFull } from '../utils/dateUtils';
import { colors, fonts, radii, spacing, shadow } from '../theme/theme';
import { Avatar } from './Avatar';

interface BirthdayCountdownCardProps {
  friend: FriendProfile;
  onPress: () => void;
  onToggleReminder: () => void;
}

export function BirthdayCountdownCard({ friend, onPress, onToggleReminder }: BirthdayCountdownCardProps) {
  const countdown = calculateCountdown(friend.birthday);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.row}>
        <Avatar uri={friend.avatar} name={friend.name} size={52} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {friend.name}
          </Text>
          <Text style={styles.meta}>
            {friend.relationship} · {formatBirthdayFull(friend.birthday)}
          </Text>
        </View>
        <Pressable onPress={onToggleReminder} hitSlop={10} style={styles.bellButton}>
          {friend.reminderEnabled ? (
            <Bell size={18} color={colors.accent} />
          ) : (
            <BellOff size={18} color={colors.textMuted} />
          )}
        </Pressable>
      </View>

      <View style={styles.countdownRow}>
        {countdown.isToday ? (
          <Text style={styles.todayLabel}>🎂 It's today!</Text>
        ) : (
          <>
            <Text style={styles.countdownNumber}>{countdown.days}</Text>
            <Text style={styles.countdownLabel}>{countdown.days === 1 ? 'day to go' : 'days to go'}</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
    ...shadow.card,
  },
  pressed: {
    opacity: 0.9,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSecondary,
  },
  bellButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.badgeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  countdownNumber: {
    fontFamily: fonts.displayBold,
    fontSize: 30,
    color: colors.accent,
  },
  countdownLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.textSecondary,
  },
  todayLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.accent,
  },
});
