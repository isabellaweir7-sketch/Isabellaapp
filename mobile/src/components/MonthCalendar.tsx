import React, { useMemo, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, LayoutChangeEvent } from 'react-native';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react-native';
import { FriendProfile } from '../types/index';
import { colors, fonts, radii, spacing } from '../theme/theme';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function parseBirthday(birthday: string) {
  const [, m, d] = birthday.split('-').map((n) => parseInt(n, 10));
  return { month: m - 1, day: d };
}

interface MonthCalendarProps {
  friends: FriendProfile[];
  onSelectFriend: (friend: FriendProfile) => void;
}

export function MonthCalendar({ friends, onSelectFriend }: MonthCalendarProps) {
  const [cursor, setCursor] = useState(() => new Date());
  const [gridWidth, setGridWidth] = useState(0);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const friendsByDay = useMemo(() => {
    const map = new Map<number, FriendProfile[]>();
    friends.forEach((friend) => {
      const { month: fMonth, day } = parseBirthday(friend.birthday);
      if (fMonth !== month) return;
      const existing = map.get(day) || [];
      existing.push(friend);
      map.set(day, existing);
    });
    return map;
  }, [friends, month]);

  const friendsInMonthCount = useMemo(
    () => friends.filter((f) => parseBirthday(f.birthday).month === month).length,
    [friends, month]
  );

  const today = new Date();
  const cellSize = gridWidth ? gridWidth / 7 : 0;

  const onGridLayout = (e: LayoutChangeEvent) => {
    setGridWidth(e.nativeEvent.layout.width);
  };

  const cells: React.ReactNode[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(<View key={`empty-${i}`} style={{ width: cellSize, height: cellSize }} />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
    const birthdayFriends = friendsByDay.get(day) || [];
    const hasBirthday = birthdayFriends.length > 0;
    const visibleFriends = birthdayFriends.slice(0, 2);
    const extraCount = birthdayFriends.length - visibleFriends.length;

    cells.push(
      <View
        key={`day-${day}`}
        style={[
          styles.dayCell,
          { width: cellSize, height: cellSize },
          isToday && styles.dayCellToday,
          hasBirthday && !isToday && styles.dayCellBirthday,
        ]}
      >
        <Text style={[styles.dayNumber, isToday && styles.dayNumberToday]}>{day}</Text>

        {hasBirthday && (
          <View style={styles.avatarRow}>
            {visibleFriends.map((f) => (
              <Pressable key={f.id} onPress={() => onSelectFriend(f)} hitSlop={2}>
                <Image source={{ uri: f.avatar }} style={styles.avatarDot} />
              </Pressable>
            ))}
            {extraCount > 0 && (
              <View style={styles.extraDot}>
                <Text style={styles.extraDotText}>+{extraCount}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <CalendarIcon size={18} color={colors.accent} />
          <Text style={styles.headerTitle}>Birthday Calendar</Text>
        </View>

        <View style={styles.monthNav}>
          <Pressable onPress={() => setCursor(new Date(year, month - 1, 1))} hitSlop={8} style={styles.navButton}>
            <ChevronLeft size={16} color={colors.accent} />
          </Pressable>
          <Text style={styles.monthLabel}>
            {MONTH_NAMES[month]} {year}
          </Text>
          <Pressable onPress={() => setCursor(new Date(year, month + 1, 1))} hitSlop={8} style={styles.navButton}>
            <ChevronRight size={16} color={colors.accent} />
          </Pressable>
        </View>
      </View>

      <View style={styles.weekRow}>
        {DAY_LABELS.map((label) => (
          <Text key={label} style={[styles.weekLabel, { width: cellSize || undefined, flex: cellSize ? 0 : 1 }]}>
            {label}
          </Text>
        ))}
      </View>

      <View style={styles.grid} onLayout={onGridLayout}>
        {cells}
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryDot} />
        <Text style={styles.summaryText}>
          <Text style={styles.summaryStrong}>{friendsInMonthCount}</Text> birthdays in {MONTH_NAMES[month]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontFamily: fonts.displayItalic,
    fontSize: 18,
    color: colors.accent,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  navButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthLabel: {
    fontFamily: fonts.displayItalic,
    fontSize: 13,
    color: colors.accent,
    paddingHorizontal: 6,
  },
  weekRow: {
    flexDirection: 'row',
  },
  weekLabel: {
    textAlign: 'center',
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.textMuted,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    alignItems: 'center',
    paddingTop: 4,
    gap: 2,
    borderRadius: 10,
  },
  dayCellToday: {
    backgroundColor: colors.accentSoft,
  },
  dayCellBirthday: {
    backgroundColor: 'rgba(182,92,74,0.08)',
  },
  dayNumber: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: colors.textPrimary,
  },
  dayNumberToday: {
    color: colors.accent,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 2,
  },
  avatarDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.surfaceRaised,
  },
  extraDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraDotText: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    color: colors.white,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  summaryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  summaryText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSecondary,
  },
  summaryStrong: {
    fontFamily: fonts.bodyBold,
    color: colors.textPrimary,
  },
});
