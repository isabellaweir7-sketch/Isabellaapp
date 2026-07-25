import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';
import { BirthdayCountdownCard } from '../components/BirthdayCountdownCard';
import { useAppData } from '../context/AppDataContext';
import { calculateCountdown } from '../utils/dateUtils';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Birthdays'>;

export function BirthdaysScreen({ navigation }: Props) {
  const { friends, toggleReminder } = useAppData();
  const [query, setQuery] = useState('');

  const sortedFriends = useMemo(() => {
    const filtered = friends.filter((f) => {
      const q = query.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.relationship.toLowerCase().includes(q) ||
        f.preferences.favoriteShops.some((s) => s.toLowerCase().includes(q))
      );
    });
    return filtered
      .slice()
      .sort((a, b) => calculateCountdown(a.birthday).totalDays - calculateCountdown(b.birthday).totalDays);
  }, [friends, query]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Birthdays</Text>
        <Text style={styles.subtitle}>
          {sortedFriends.length} {sortedFriends.length === 1 ? 'bestie' : 'besties'} on your radar
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

      <FlatList
        data={sortedFriends}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <BirthdayCountdownCard
            friend={item}
            onPress={() => navigation.navigate('Profiles', { friendId: item.id })}
            onToggleReminder={() => toggleReminder(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
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
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
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
  list: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});
