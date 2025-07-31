import OnboardingSlides from '@/components/OnboardingSlides';
import React from 'react';
import { View } from 'react-native';

export default function OnboardingScreen() {
  return (
    <View style={{ flex: 1 }}>
      <OnboardingSlides />
    </View>
  );
}