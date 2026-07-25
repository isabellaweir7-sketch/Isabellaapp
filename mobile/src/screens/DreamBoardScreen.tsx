import React from 'react';
import { Heart } from 'lucide-react-native';
import { ComingSoonScreen } from './ComingSoonScreen';
import { colors } from '../theme/theme';

export function DreamBoardScreen() {
  return (
    <ComingSoonScreen
      title="Your Dream Board is coming soon"
      description="A private Pinterest-style board to save photos, TikTok ideas, links and screenshots — organized by price range."
      icon={<Heart size={28} color={colors.badgeIcon} />}
    />
  );
}
