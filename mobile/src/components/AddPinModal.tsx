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
import { X, Image as ImageIcon, Music2, Link2, Camera, Quote } from 'lucide-react-native';
import { colors, fonts, radii, spacing } from '../theme/theme';
import { TextField } from './TextField';
import { Button } from './Button';
import { DreamBoardItem } from '../types/index';
import { BOARD_CATEGORIES, priceToRangeTag } from '../utils/priceRanges';

interface AddPinModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (item: DreamBoardItem) => void;
}

const TYPE_OPTIONS: { value: DreamBoardItem['type']; label: string; icon: React.ComponentType<{ size?: number; color?: string }> }[] = [
  { value: 'photo', label: 'Photo', icon: ImageIcon },
  { value: 'tiktok_idea', label: 'TikTok idea', icon: Music2 },
  { value: 'link', label: 'Link', icon: Link2 },
  { value: 'screenshot', label: 'Screenshot', icon: Camera },
  { value: 'quote', label: 'Quote', icon: Quote },
];

export function AddPinModal({ visible, onClose, onSave }: AddPinModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<DreamBoardItem['type']>('photo');
  const [mediaUrl, setMediaUrl] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<(typeof BOARD_CATEGORIES)[number]>(BOARD_CATEGORIES[0]);
  const [linkUrl, setLinkUrl] = useState('');
  const [notes, setNotes] = useState('');

  const reset = () => {
    setTitle('');
    setType('photo');
    setMediaUrl('');
    setPrice('');
    setCategory(BOARD_CATEGORIES[0]);
    setLinkUrl('');
    setNotes('');
  };

  const handleSave = () => {
    if (!title.trim() || !mediaUrl.trim()) return;
    const priceNum = price ? Number(price) : 0;

    onSave({
      id: `db-${Date.now()}`,
      title: title.trim(),
      type,
      mediaUrl: mediaUrl.trim(),
      price: priceNum,
      priceRangeTag: priceToRangeTag(priceNum),
      boardCategory: category,
      linkUrl: linkUrl.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    reset();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.sheetWrap}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.sheet}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Save New Dream Pin 📌</Text>
                <Text style={styles.subtitle}>Save trends, screenshots or finds with a price.</Text>
              </View>
              <Pressable onPress={onClose} hitSlop={10} style={styles.closeButton}>
                <X size={18} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
              <Field label="What kind of pin is this?">
                <View style={styles.typeWrap}>
                  {TYPE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isActive = type === opt.value;
                    return (
                      <Pressable
                        key={opt.value}
                        onPress={() => setType(opt.value)}
                        style={[styles.typeChip, isActive && styles.typeChipActive]}
                      >
                        <Icon size={13} color={isActive ? colors.white : colors.textPrimary} />
                        <Text style={[styles.typeChipText, isActive && styles.typeChipTextActive]}>
                          {opt.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </Field>

              <Field label="Title / Product Name *">
                <TextField
                  placeholder="e.g. TikTok Viral Bow Hair Clips"
                  value={title}
                  onChangeText={setTitle}
                />
              </Field>

              <Field label="Image URL *">
                <TextField
                  placeholder="https://..."
                  value={mediaUrl}
                  onChangeText={setMediaUrl}
                  autoCapitalize="none"
                  keyboardType="url"
                />
              </Field>

              <Field label="Price ($)">
                <TextField
                  placeholder="24"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                />
              </Field>

              <Field label="Category">
                <View style={styles.categoryWrap}>
                  {BOARD_CATEGORIES.map((cat) => (
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

              <Field label="Store Link (optional)">
                <TextField
                  placeholder="https://..."
                  value={linkUrl}
                  onChangeText={setLinkUrl}
                  autoCapitalize="none"
                  keyboardType="url"
                />
              </Field>

              <Field label="Notes">
                <TextField
                  placeholder="e.g. Saw this on TikTok, so cute!"
                  value={notes}
                  onChangeText={setNotes}
                />
              </Field>

              <Button label="Save Pin 📌" onPress={handleSave} />
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
  typeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  typeChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  typeChipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textPrimary,
  },
  typeChipTextActive: {
    color: colors.white,
  },
});
