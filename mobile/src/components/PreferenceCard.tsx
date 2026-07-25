import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';

interface PreferenceCardProps {
  emoji: string;
  title: string;
  children: React.ReactNode;
  tint?: string;
}

export function PreferenceCard({ emoji, title, children, tint }: PreferenceCardProps) {
  return (
    <View style={[styles.card, tint ? { backgroundColor: tint } : undefined]}>
      <Text style={styles.title}>
        {emoji} {title}
      </Text>
      {children}
    </View>
  );
}

export function PreferenceLine({ label, value }: { label: string; value: string }) {
  return (
    <Text style={styles.line}>
      <Text style={styles.lineLabel}>{label}: </Text>
      {value}
    </Text>
  );
}

export function PreferenceChips({ items }: { items: string[] }) {
  return (
    <View style={styles.chipsWrap}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.chip}>
          <Text style={styles.chipText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    padding: spacing.md,
    gap: 6,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: colors.accent,
    marginBottom: 2,
  },
  line: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 19,
  },
  lineLabel: {
    fontFamily: fonts.bodyBold,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textPrimary,
  },
});
