import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';
import { colors, fonts, radii, spacing, shadow } from '../theme/theme';
import { IconBadge } from '../components/IconBadge';
import { useAppData } from '../context/AppDataContext';
import { useSession } from '../context/SessionContext';
import { isSupabaseConfigured } from '../lib/supabase';

export function BadgesScreen() {
  const { userProgress } = useAppData();
  const { signOut } = useSession();

  const handleSignOut = () => {
    Alert.alert('Sign out?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Giver Rewards</Text>
          <Text style={styles.subtitle}>
            Level {userProgress.giverLevel} · {userProgress.giftsGivenCount} gifts given
          </Text>
        </View>

        <View style={styles.badgeList}>
          {userProgress.badges.map((badge) => (
            <View key={badge.id} style={styles.badgeCard}>
              <IconBadge size={48}>
                <Text style={styles.badgeEmoji}>{badge.icon}</Text>
              </IconBadge>
              <View style={styles.badgeInfo}>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {isSupabaseConfigured && (
          <Pressable style={styles.signOutButton} onPress={handleSignOut}>
            <LogOut size={16} color={colors.danger} />
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>
        )}
      </ScrollView>
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
  badgeList: {
    gap: spacing.sm,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: spacing.md,
    ...shadow.card,
  },
  badgeEmoji: {
    fontSize: 22,
  },
  badgeInfo: {
    flex: 1,
    gap: 2,
  },
  badgeName: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  badgeDescription: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSecondary,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingVertical: 12,
    marginTop: spacing.sm,
  },
  signOutText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.danger,
  },
});
