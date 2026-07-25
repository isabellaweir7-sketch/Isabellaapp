import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Linking } from 'react-native';
import { ExternalLink, Image as ImageIcon, Music2, Link2, Camera, Quote } from 'lucide-react-native';
import { DreamBoardItem } from '../types/index';
import { colors, fonts, radii, shadow } from '../theme/theme';
import { priceRangeLabel } from '../utils/priceRanges';

interface DreamPinCardProps {
  pin: DreamBoardItem;
  width: number;
}

const TYPE_ICON: Record<DreamBoardItem['type'], React.ComponentType<{ size?: number; color?: string }>> = {
  photo: ImageIcon,
  tiktok_idea: Music2,
  link: Link2,
  screenshot: Camera,
  quote: Quote,
};

export function DreamPinCard({ pin, width }: DreamPinCardProps) {
  const TypeIcon = TYPE_ICON[pin.type];

  return (
    <View style={[styles.card, { width }]}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: pin.mediaUrl }} style={styles.image} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{pin.boardCategory}</Text>
        </View>
        <View style={styles.typeBadge}>
          <TypeIcon size={12} color={colors.accent} />
        </View>
        {pin.price ? (
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>${pin.price}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {pin.title}
        </Text>
        {pin.notes ? (
          <Text style={styles.notes} numberOfLines={2}>
            "{pin.notes}"
          </Text>
        ) : null}
      </View>

      <View style={styles.footer}>
        <View style={styles.rangePill}>
          <Text style={styles.rangeText}>{priceRangeLabel(pin.priceRangeTag)}</Text>
        </View>
        {pin.linkUrl ? (
          <Pressable onPress={() => Linking.openURL(pin.linkUrl!)} hitSlop={8} style={styles.linkRow}>
            <Text style={styles.linkText}>Link</Text>
            <ExternalLink size={12} color={colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadow.card,
  },
  imageWrap: {
    aspectRatio: 4 / 3,
    backgroundColor: colors.background,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryText: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.accent,
  },
  typeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(69,75,51,0.9)',
    borderRadius: radii.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  priceText: {
    fontFamily: fonts.displayItalic,
    fontSize: 13,
    color: colors.white,
  },
  body: {
    padding: 10,
    gap: 4,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 16,
  },
  notes: {
    fontFamily: fonts.body,
    fontStyle: 'italic',
    fontSize: 10,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  rangePill: {
    backgroundColor: colors.accentSoft,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  rangeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    color: colors.textSecondary,
  },
});
