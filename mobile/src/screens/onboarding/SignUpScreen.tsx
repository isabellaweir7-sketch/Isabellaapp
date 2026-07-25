import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { colors, fonts, spacing } from '../../theme/theme';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { GoogleIcon } from '../../components/GoogleIcon';
import { useSession } from '../../context/SessionContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'SignUp'>;

export function SignUpScreen({ navigation }: Props) {
  const { signUpWithPassword } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage('Fill in your name, email and password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password needs to be at least 6 characters.');
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);
    const result = await signUpWithPassword(email.trim(), password, name.trim());
    setIsLoading(false);

    if (result.error) {
      setErrorMessage(result.error);
      return;
    }

    if (result.needsEmailConfirmation) {
      Alert.alert(
        'Check your email',
        "We've sent a confirmation link to your email — tap it, then come back and sign in.",
        [{ text: 'OK', onPress: () => navigation.navigate('SignIn') }]
      );
    }
  };

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
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>Start building your wishlist and see your friends' too.</Text>
          </View>

          <Button
            label="Continue with Google"
            variant="secondary"
            icon={<GoogleIcon />}
            onPress={() =>
              Alert.alert(
                'Coming soon',
                'Google sign-in needs a bit more setup on our end — use email for now!'
              )
            }
          />

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>or email</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.form}>
            <TextField placeholder="First name" value={name} onChangeText={setName} />
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

          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          <Button label="Create account" onPress={handleSignUp} loading={isLoading} />

          <Pressable style={styles.footerLink} onPress={() => navigation.navigate('SignIn')} hitSlop={12}>
            <Text style={styles.footerLinkText}>Already have an account? Sign in</Text>
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
  errorText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.danger,
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
