import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';
import { UpcomingBirthdayChip } from '../components/UpcomingBirthdayChip';
import { MonthCalendar } from '../components/MonthCalendar';
import { FriendQuickViewSheet } from '../components/FriendQuickViewSheet';
import { useAppData } from '../context/AppDataContext';
import { calculateCountdown } from '../utils/dateUtils';
import { FriendProfile } from '../types/index';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Birthdays'>;

export function BirthdaysScreen({ navigation }: Props) {
  const { friends, toggleReminder } = useAppData();
  const [query, setQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<FriendProfile | null>(null);

  const filteredFriends = useMemo(() => {
    const q = query.toLowerCase();
    return friends.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.relationship.toLowerCase().includes(q) ||
        f.preferences.favoriteShops.some((s) => s.toLowerCase().includes(q))
    );
  }, [friends, query]);

  const upcomingFriends = useMemo(
    () =>
      filteredFriends
        .slice()
        .sort((a, b) => calculateCountdown(a.birthday).totalDays - calculateCountdown(b.birthday).totalDays),
    [filteredFriends]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Birthdays</Text>
          <Text style={styles.subtitle}>
            {upcomingFriends.length} {upcomingFriends.length === 1 ? 'bestie' : 'besties'} on your radar
          </Text>
        </View>

        <View style={styles.searchWrap}>
          <Search size={16} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            placeholder="Search bestie, relationship or shop..."
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.upcomingSection}>
          <Text style={styles.sectionLabel}>Coming up</Text>
          {upcomingFriends.length === 0 ? (
            <Text style={styles.emptyText}>No besties match that search.</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.upcomingRow}
            >
              {upcomingFriends.map((friend) => (
                <UpcomingBirthdayChip
                  key={friend.id}
                  friend={friend}
                  onPress={() => setSelectedFriend(friend)}
                />
              ))}
            </ScrollView>
          )}
        </View>

        <MonthCalendar friends={filteredFriends} onSelectFriend={setSelectedFriend} />
      </ScrollView>

      <FriendQuickViewSheet
        friend={selectedFriend}
        onClose={() => setSelectedFriend(null)}
        onToggleReminder={toggleReminder}
        onViewProfile={(friendId) => navigation.navigate('Profiles', { friendId })}
        onOpenGiftGenie={(friendId) => navigation.navigate('GiftGenie', { friendId })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    gap: 2,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSecondary,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.input,
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textPrimary,
  },
  upcomingSection: {
    gap: spacing.sm,
  },
  sectionLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: colors.textSecondary,
  },
  upcomingRow: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  emptyText: {
    fontFamily: fonts.body,
    fontStyle: 'italic',
    fontSize: 12,
    color: colors.textSecondary,
  },
});
