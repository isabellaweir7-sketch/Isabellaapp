import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';

export function TextField(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.textMuted}
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.input,
    paddingVertical: 16,
    paddingHorizontal: spacing.lg,
    fontSize: 15,
    fontFamily: fonts.body,
    color: colors.textPrimary,
    width: '100%',
  },
});
