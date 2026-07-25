export type OnboardingStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type MainTabParamList = {
  Birthdays: undefined;
  Profiles: { friendId?: string } | undefined;
  DreamBoard: undefined;
  GiftGenie: { friendId?: string } | undefined;
  Badges: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};
