import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cake, Gift, Sparkles, AlertCircle, MessageSquare, Plus } from 'lucide-react-native';
import { colors, fonts, radii, spacing, shadow } from '../theme/theme';
import { Avatar } from '../components/Avatar';
import { PreferenceCard, PreferenceLine, PreferenceChips } from '../components/PreferenceCard';
import { WishlistItemCard } from '../components/WishlistItemCard';
import { useAppData } from '../context/AppDataContext';
import { formatBirthdayFull, getZodiacSign } from '../utils/dateUtils';
import { WhispersNote } from '../types/index';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';

const ME = 'You';

type Props = BottomTabScreenProps<MainTabParamList, 'Profiles'>;

export function ProfilesScreen({ route }: Props) {
  const { friends, updateFriend } = useAppData();
  const [selectedId, setSelectedId] = useState<string>(route.params?.friendId || friends[0]?.id);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (route.params?.friendId) setSelectedId(route.params.friendId);
  }, [route.params?.friendId]);

  const friend = friends.find((f) => f.id === selectedId) || friends[0];

  if (!friend) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.emptyText}>Add your first bestie to get started.</Text>
      </SafeAreaView>
    );
  }

  const handleToggleClaim = (itemId: string) => {
    const updatedWishlist = friend.wishlistItems.map((item) => {
      if (item.id === itemId) {
        const isMine = item.claimedBy === ME;
        return {
          ...item,
          claimedBy: isMine ? null : ME,
          claimedStatus: isMine ? ('unclaimed' as const) : ('claimed' as const),
        };
      }
      return item;
    });
    updateFriend({ ...friend, wishlistItems: updatedWishlist });
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    const newNote: WhispersNote = {
      id: `note-${Date.now()}`,
      content: noteText.trim(),
      dateAdded: 'Just now',
      authorName: ME,
    };
    updateFriend({ ...friend, notes: [newNote, ...friend.notes] });
    setNoteText('');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.selectorWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.selectorRow}>
          {friends.map((f) => {
            const isSelected = f.id === friend.id;
            return (
              <Pressable
                key={f.id}
                onPress={() => setSelectedId(f.id)}
                style={[styles.selectorChip, isSelected && styles.selectorChipActive]}
              >
                <Avatar uri={f.avatar} name={f.name} size={24} />
                <Text style={[styles.selectorLabel, isSelected && styles.selectorLabelActive]} numberOfLines={1}>
                  {f.name.split(' ')[0]}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: friend.theme.color }]}>
          <Image source={{ uri: friend.avatar }} style={styles.heroAvatar} />
          <View style={styles.heroInfo}>
            <View style={styles.heroNameRow}>
              <Text style={styles.heroName}>{friend.name}</Text>
              <View style={styles.relationshipPill}>
                <Text style={styles.relationshipText}>{friend.relationship}</Text>
              </View>
            </View>
            <View style={styles.heroMetaRow}>
              <Cake size={14} color={colors.accent} />
              <Text style={styles.heroMeta}>{formatBirthdayFull(friend.birthday)}</Text>
              <Text style={styles.heroMeta}>· {friend.zodiacSign || getZodiacSign(friend.birthday)}</Text>
            </View>
            <View style={styles.bioPill}>
              <Text style={styles.bioText}>"{friend.bio}"</Text>
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sparkles size={18} color={colors.accent} />
            <Text style={styles.sectionTitle}>The Bestie Blueprint</Text>
          </View>
          <Text style={styles.sectionSubtitle}>Everything you need to know before buying a gift</Text>

          <View style={styles.preferencesGrid}>
            <PreferenceCard emoji="👕" title="Clothing & Shoe Size">
              <PreferenceLine label="Clothes" value={friend.preferences.clothingSize} />
              <PreferenceLine label="Shoes" value={friend.preferences.shoeSize} />
            </PreferenceCard>

            <PreferenceCard emoji="🛍️" title="Favorite Shops" tint={colors.accentSoft}>
              <PreferenceChips items={friend.preferences.favoriteShops} />
            </PreferenceCard>

            <PreferenceCard emoji="🍿" title="Snacks & Drinks">
              <PreferenceLine label="Snacks" value={friend.preferences.favoriteSnacks.join(', ')} />
              <PreferenceLine label="Drinks" value={friend.preferences.favoriteDrinks.join(', ')} />
            </PreferenceCard>

            <PreferenceCard emoji="✨" title="Jewellery">
              <PreferenceLine label="Metal" value={friend.preferences.jewellery.metal} />
              <PreferenceLine label="Style" value={friend.preferences.jewellery.style} />
            </PreferenceCard>

            <PreferenceCard emoji="🌸" title="Colors & Flowers">
              <PreferenceLine label="Colors" value={friend.preferences.favoriteColors.join(', ')} />
              <PreferenceLine label="Flowers" value={friend.preferences.favoriteFlowers.join(', ')} />
            </PreferenceCard>

            <PreferenceCard emoji="🩺" title="Allergies">
              {friend.preferences.allergies.length > 0 ? (
                <PreferenceChips items={friend.preferences.allergies} />
              ) : (
                <Text style={styles.mutedText}>None logged</Text>
              )}
            </PreferenceCard>
          </View>

          {friend.preferences.doNotWant.length > 0 && (
            <View style={styles.doNotWantBox}>
              <View style={styles.doNotWantHeader}>
                <AlertCircle size={16} color={colors.danger} />
                <Text style={styles.doNotWantTitle}>STRICT "DO NOT WANT" LIST</Text>
              </View>
              {friend.preferences.doNotWant.map((item, idx) => (
                <View key={idx} style={styles.doNotWantRow}>
                  <Text style={styles.doNotWantEmoji}>🚫</Text>
                  <Text style={styles.doNotWantText}>{item}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Wishlist */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <View style={styles.sectionHeader}>
                <Gift size={18} color={colors.accent} />
                <Text style={styles.sectionTitle}>Wishlist & Claiming</Text>
              </View>
              <Text style={styles.sectionSubtitle}>
                Surprise safe — claimed status is invisible to {friend.name.split(' ')[0]}
              </Text>
            </View>
          </View>

          <View style={styles.wishlistGrid}>
            {friend.wishlistItems.map((item) => (
              <WishlistItemCard key={item.id} item={item} onToggleClaim={() => handleToggleClaim(item.id)} />
            ))}
          </View>
        </View>

        {/* Whispers & Notes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageSquare size={18} color={colors.accent} />
            <Text style={styles.sectionTitle}>Whispers & Mentions</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Log casual hints she mentioned in passing (e.g. "loved that lip balm in Sephora")
          </Text>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.noteInputRow}>
              <TextInput
                value={noteText}
                onChangeText={setNoteText}
                placeholder={`Log something ${friend.name.split(' ')[0]} mentioned...`}
                placeholderTextColor={colors.textMuted}
                style={styles.noteInput}
              />
              <Pressable onPress={handleAddNote} style={styles.noteButton}>
                <Plus size={16} color={colors.white} />
              </Pressable>
            </View>
          </KeyboardAvoidingView>

          <View style={styles.notesList}>
            {friend.notes.length === 0 ? (
              <Text style={styles.emptyNotesText}>No whispers logged yet. Add one above!</Text>
            ) : (
              friend.notes.map((note) => (
                <View key={note.id} style={styles.noteCard}>
                  <Text style={styles.noteContent}>"{note.content}"</Text>
                  <Text style={styles.noteMeta}>
                    Logged by {note.authorName || ME} · {note.dateAdded}
                  </Text>
                </View>
              ))
            )}
          </View>
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
  emptyText: {
    fontFamily: fonts.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  selectorWrap: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectorRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: 8,
  },
  selectorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  selectorChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  selectorLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.textPrimary,
  },
  selectorLabelActive: {
    color: colors.white,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  hero: {
    flexDirection: 'row',
    gap: spacing.md,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...shadow.card,
  },
  heroAvatar: {
    width: 76,
    height: 76,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: colors.white,
  },
  heroInfo: {
    flex: 1,
    gap: 6,
  },
  heroNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  heroName: {
    fontFamily: fonts.displayItalic,
    fontSize: 24,
    color: colors.accent,
  },
  relationshipPill: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  relationshipText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.accent,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroMeta: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textSecondary,
  },
  bioPill: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  bioText: {
    fontFamily: fonts.body,
    fontStyle: 'italic',
    fontSize: 11,
    color: colors.accent,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontFamily: fonts.displayItalic,
    fontSize: 19,
    color: colors.accent,
  },
  sectionSubtitle: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  preferencesGrid: {
    gap: spacing.sm,
  },
  mutedText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSecondary,
  },
  doNotWantBox: {
    backgroundColor: 'rgba(182,92,74,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(182,92,74,0.25)',
    borderRadius: radii.sm,
    padding: spacing.md,
    gap: 8,
  },
  doNotWantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  doNotWantTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 0.4,
    color: colors.danger,
  },
  doNotWantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceRaised,
    borderRadius: 12,
    padding: 8,
  },
  doNotWantEmoji: {
    fontSize: 13,
  },
  doNotWantText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.danger,
  },
  wishlistGrid: {
    gap: spacing.sm,
  },
  noteInputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  noteInput: {
    flex: 1,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textPrimary,
  },
  noteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesList: {
    gap: 8,
  },
  emptyNotesText: {
    fontFamily: fonts.body,
    fontStyle: 'italic',
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
  noteCard: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    gap: 4,
  },
  noteContent: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textPrimary,
  },
  noteMeta: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.textSecondary,
  },
});
