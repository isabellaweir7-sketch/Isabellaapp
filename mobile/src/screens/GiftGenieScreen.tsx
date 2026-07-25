import React from 'react';
import { Sparkles } from 'lucide-react-native';
import { ComingSoonScreen } from './ComingSoonScreen';
import { colors } from '../theme/theme';

export function GiftGenieScreen() {
  return (
    <ComingSoonScreen
      title="Gift Genie is coming soon"
      description="AI-powered gift suggestions based on a friend's saved preferences and what others have bought for them before."
      icon={<Sparkles size={28} color={colors.badgeIcon} />}
    />
  );
}
