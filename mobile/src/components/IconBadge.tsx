import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/theme';

interface IconBadgeProps {
  children: React.ReactNode;
  size?: number;
}

export function IconBadge({ children, size = 44 }: IconBadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.badgeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
