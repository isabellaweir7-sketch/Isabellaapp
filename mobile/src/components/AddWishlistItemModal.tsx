import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X } from 'lucide-react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';
import { TextField } from './TextField';
import { Button } from './Button';
import { ClipboardPasteBanner } from './ClipboardPasteBanner';
import { useClipboardUrl } from '../utils/useClipboardUrl';
import { WishlistItem } from '../types/index';
import { WISHLIST_CATEGORIES } from '../utils/wishlistCategories';
import { priceToRangeTag } from '../utils/priceRanges';

interface AddWishlistItemModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (item: WishlistItem) => void;
}

export function AddWishlistItemModal({ visible, onClose, onSave }: AddWishlistItemModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<(typeof WISHLIST_CATEGORIES)[number]>(WISHLIST_CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [store, setStore] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventVenue, setEventVenue] = useState('');

  const { detectedUrl, checkClipboard, clearDetected } = useClipboardUrl();

  const isEvent = category === 'Experiences & Events';

  const reset = () => {
    setTitle('');
    setCategory(WISHLIST_CATEGORIES[0]);
    setPrice('');
    setStore('');
    setUrl('');
    setNotes('');
    setEventDate('');
    setEventVenue('');
    clearDetected();
  };

  const handleSave = () => {
    if (!title.trim()) return;
    const priceNum = price ? Number(price) : 0;

    onSave({
      id: `wish-${Date.now()}`,
      title: title.trim(),
      price: priceNum,
      priceRangeTag: priceToRangeTag(priceNum),
      store: store.trim() || 'Not specified',
      url: url.trim() || undefined,
      category,
      eventDate: isEvent && eventDate.trim() ? eventDate.trim() : undefined,
      eventVenue: isEvent && eventVenue.trim() ? eventVenue.trim() : undefined,
      claimedBy: null,
      claimedStatus: 'unclaimed',
      priority: 'medium',
      notes: notes.trim() || undefined,
    });

    reset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      onShow={checkClipboard}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView style={styles.sheetWrap} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.sheet}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Add to Wishlist</Text>
                <Text style={styles.subtitle}>A product, an experience — anything she'd actually want.</Text>
              </View>
              <Pressable onPress={onClose} hitSlop={10} style={styles.closeButton}>
                <X size={18} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
              <Field label="Category">
                <View style={styles.categoryWrap}>
                  {WISHLIST_CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat}
                      onPress={() => setCategory(cat)}
                      style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
                    >
                      <Text
                        style={[styles.categoryChipText, category === cat && styles.categoryChipTextActive]}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </Field>

              <Field label={isEvent ? 'Event / Activity Name *' : 'Title / Product Name *'}>
                <TextField
                  placeholder={isEvent ? 'e.g. Sabrina Carpenter Concert Tickets' : 'e.g. Sol de Janeiro Body Mist'}
                  value={title}
                  onChangeText={setTitle}
                />
              </Field>

              {isEvent && (
                <>
                  <Field label="Date (optional)">
                    <TextField placeholder="e.g. 2026-09-14" value={eventDate} onChangeText={setEventDate} />
                  </Field>
                  <Field label="Venue / Location (optional)">
                    <TextField
                      placeholder="e.g. Water park, downtown venue..."
                      value={eventVenue}
                      onChangeText={setEventVenue}
                    />
                  </Field>
                </>
              )}

              <Field label="Price ($)">
                <TextField placeholder="24" value={price} onChangeText={setPrice} keyboardType="numeric" />
              </Field>

              <Field label={isEvent ? 'Where to book' : 'Store'}>
                <TextField
                  placeholder={isEvent ? 'e.g. Ticketmaster' : 'e.g. Sephora'}
                  value={store}
                  onChangeText={setStore}
                />
              </Field>

              <Field label="Link (optional)">
                {detectedUrl && (
                  <ClipboardPasteBanner
                    url={detectedUrl}
                    onPaste={() => {
                      setUrl(detectedUrl);
                      clearDetected();
                    }}
                    onDismiss={clearDetected}
                  />
                )}
                <TextField
                  placeholder="https://..."
                  value={url}
                  onChangeText={setUrl}
                  autoCapitalize="none"
                  keyboardType="url"
                />
              </Field>

              <Field label="Notes">
                <TextField
                  placeholder="e.g. Saw this and mentioned wanting it!"
                  value={notes}
                  onChangeText={setNotes}
                />
              </Field>

              <Button label="Add to Wishlist" onPress={handleSave} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(43,42,34,0.4)',
    justifyContent: 'flex-end',
  },
  sheetWrap: {
    maxHeight: '90%',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radii.card,
    borderTopRightRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingTop: spacing.lg,
    maxHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.displayItalic,
    fontSize: 21,
    color: colors.accent,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.accent,
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  categoryChipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textPrimary,
  },
  categoryChipTextActive: {
    color: colors.white,
  },
});
