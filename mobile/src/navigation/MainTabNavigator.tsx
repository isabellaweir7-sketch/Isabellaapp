import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Cake, Users, Heart, Sparkles, Award } from 'lucide-react-native';
import { BirthdaysScreen } from '../screens/BirthdaysScreen';
import { ProfilesScreen } from '../screens/ProfilesScreen';
import { DreamBoardScreen } from '../screens/DreamBoardScreen';
import { GiftGenieScreen } from '../screens/GiftGenieScreen';
import { BadgesScreen } from '../screens/BadgesScreen';
import { colors, fonts } from '../theme/theme';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.bodyMedium,
          fontSize: 10,
        },
      }}
    >
      <Tab.Screen
        name="Birthdays"
        component={BirthdaysScreen}
        options={{ tabBarIcon: ({ color, size }) => <Cake color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Profiles"
        component={ProfilesScreen}
        options={{ tabBarIcon: ({ color, size }) => <Users color={color} size={size} /> }}
      />
      <Tab.Screen
        name="DreamBoard"
        component={DreamBoardScreen}
        options={{ title: 'Dream Board', tabBarIcon: ({ color, size }) => <Heart color={color} size={size} /> }}
      />
      <Tab.Screen
        name="GiftGenie"
        component={GiftGenieScreen}
        options={{ title: 'Gift Genie', tabBarIcon: ({ color, size }) => <Sparkles color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Badges"
        component={BadgesScreen}
        options={{ tabBarIcon: ({ color, size }) => <Award color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
