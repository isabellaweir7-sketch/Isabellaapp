import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Cake, Users, Heart, Sparkles, Award } from 'lucide-react-native';
import { BirthdaysScreen } from '../screens/BirthdaysScreen';
import { ProfilesScreen } from '../screens/ProfilesScreen';
import { DreamBoardScreen } from '../screens/DreamBoardScreen';
import { GiftGenieScreen } from '../screens/GiftGenieScreen';
import { BadgesScreen } from '../screens/BadgesScreen';
import { colors } from '../theme/theme';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

function tabIcon(Icon: typeof Cake) {
  return ({ focused, color }: { focused: boolean; color: string }) => (
    <Icon color={color} size={24} strokeWidth={focused ? 2.4 : 1.8} />
  );
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 64,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen name="Birthdays" component={BirthdaysScreen} options={{ tabBarIcon: tabIcon(Cake) }} />
      <Tab.Screen name="Profiles" component={ProfilesScreen} options={{ tabBarIcon: tabIcon(Users) }} />
      <Tab.Screen name="DreamBoard" component={DreamBoardScreen} options={{ tabBarIcon: tabIcon(Heart) }} />
      <Tab.Screen name="GiftGenie" component={GiftGenieScreen} options={{ tabBarIcon: tabIcon(Sparkles) }} />
      <Tab.Screen name="Badges" component={BadgesScreen} options={{ tabBarIcon: tabIcon(Award) }} />
    </Tab.Navigator>
  );
}
