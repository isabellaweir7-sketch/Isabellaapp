import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { colors, fonts, spacing } from '../../theme/theme';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { GoogleIcon } from '../../components/GoogleIcon';
import { useSession } from '../../context/SessionContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'SignIn'>;

export function SignInScreen({ navigation }: Props) {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Pressable style={styles.backRow} onPress={() => navigation.goBack()} hitSlop={12}>
            <ArrowLeft size={18} color={colors.textSecondary} />
            <Text style={styles.backLabel}>Back</Text>
          </Pressable>

          <View style={styles.heading}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to see your friends' wishlists.</Text>
          </View>

          <Button
            label="Continue with Google"
            variant="secondary"
            icon={<GoogleIcon />}
            onPress={signIn}
          />

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>or email</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.form}>
            <TextField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextField
              placeholder="Password (min 6 chars)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Button label="Sign in" onPress={signIn} />

          <Pressable style={styles.footerLink} onPress={() => navigation.navigate('SignUp')} hitSlop={12}>
            <Text style={styles.footerLinkText}>No account yet? Create one</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  backLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.textSecondary,
  },
  heading: {
    gap: 6,
    marginTop: spacing.sm,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.textSecondary,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerLabel: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSecondary,
  },
  form: {
    gap: spacing.sm,
  },
  footerLink: {
    alignItems: 'center',
    paddingTop: spacing.sm,
  },
  footerLinkText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.textPrimary,
    textDecorationLine: 'underline',
  },
});
