import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FriendProfile } from '../types/index';
import { calculateCountdown } from '../utils/dateUtils';
import { colors, fonts, radii, spacing, shadow } from '../theme/theme';
import { Avatar } from './Avatar';

interface UpcomingBirthdayChipProps {
  friend: FriendProfile;
  onPress: () => void;
}

export function UpcomingBirthdayChip({ friend, onPress }: UpcomingBirthdayChipProps) {
  const countdown = calculateCountdown(friend.birthday);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.avatarWrap}>
        <Avatar uri={friend.avatar} name={friend.name} size={56} />
        {countdown.isToday && (
          <View style={styles.todayDot}>
            <Text style={styles.todayDotText}>🎂</Text>
          </View>
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {friend.name.split(' ')[0]}
      </Text>
      <Text style={styles.countdown}>{countdown.isToday ? 'Today!' : `${countdown.days}d`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 72,
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    ...shadow.card,
  },
  pressed: {
    opacity: 0.85,
  },
  avatarWrap: {
    position: 'relative',
  },
  todayDot: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayDotText: {
    fontSize: 10,
  },
  name: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: colors.textPrimary,
  },
  countdown: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    color: colors.accent,
  },
});
