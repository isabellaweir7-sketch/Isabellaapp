import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ClipboardPaste, X } from 'lucide-react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';

interface ClipboardPasteBannerProps {
  url: string;
  onPaste: () => void;
  onDismiss: () => void;
}

export function ClipboardPasteBanner({ url, onPaste, onDismiss }: ClipboardPasteBannerProps) {
  return (
    <View style={styles.banner}>
      <ClipboardPaste size={15} color={colors.accent} />
      <View style={styles.textWrap}>
        <Text style={styles.label}>Link found on your clipboard</Text>
        <Text style={styles.url} numberOfLines={1}>
          {url}
        </Text>
      </View>
      <Pressable onPress={onPaste} style={styles.pasteButton} hitSlop={6}>
        <Text style={styles.pasteButtonText}>Paste</Text>
      </Pressable>
      <Pressable onPress={onDismiss} hitSlop={8}>
        <X size={15} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.accentSoft,
    borderRadius: radii.sm,
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
  },
  textWrap: {
    flex: 1,
    gap: 1,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    color: colors.accent,
  },
  url: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textPrimary,
  },
  pasteButton: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pasteButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: colors.white,
  },
});
