import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, Users, Gift } from 'lucide-react-native';
import { colors, fonts, spacing } from '../../theme/theme';
import { Button } from '../../components/Button';
import { FeatureCard } from '../../components/FeatureCard';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <Text style={styles.title}>
            Stop guessing.{'\n'}
            <Text style={styles.titleItalic}>Start giving </Text>
            what they{'\n'}actually want.
          </Text>
          <Text style={styles.subtitle}>
            Share what you actually want for your birthday. See your friends' wishlists. Claim
            gifts secretly so no one buys the same thing twice.
          </Text>
        </View>

        <View style={styles.actions}>
          <Button label="Get started — it's free" onPress={() => navigation.navigate('SignUp')} />
          <Button
            label="I already have an account"
            variant="secondary"
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>

        <View style={styles.features}>
          <FeatureCard
            icon={<Sparkles size={20} color={colors.badgeIcon} />}
            title="Your wishlist, your vibe"
            description="Add items with links, prices and notes. Set a strict 'do not want' list too."
          />
          <FeatureCard
            icon={<Users size={20} color={colors.badgeIcon} />}
            title="Just your besties"
            description="Friendships are mutual — no randoms browsing your list."
          />
          <FeatureCard
            icon={<Gift size={20} color={colors.badgeIcon} />}
            title="Secret claims"
            description="When a friend claims a gift, it disappears from everyone else's view — but the birthday girl never finds out."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.xl,
  },
  heading: {
    gap: spacing.md,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 40,
    color: colors.textPrimary,
  },
  titleItalic: {
    fontFamily: fonts.displayItalic,
    color: colors.accent,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  actions: {
    gap: spacing.sm,
  },
  features: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
});
