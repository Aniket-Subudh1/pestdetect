import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import PagerView from 'react-native-pager-view';

const { width } = Dimensions.get('window');

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  image: any;
  backgroundColor: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: 'Pest Detection',
    subtitle: 'Detect Fast, Protect Harvest.\nFarmings Guardian Angel',
    image: require('../assets/images/insect.png'), 
    backgroundColor: '#FFFFFF',
  },
  {
    id: 2,
    title: 'Disease Detection',
    subtitle: 'Early Detection, Healthier Crops.\nEmpowering Farmers to Combat\nPlant Diseases with Precision and\nCare.',
    image: require('../assets/images/pest.png'),
    backgroundColor: '#4CAF50',
  },
  {
    id: 3,
    title: 'Pesticide Recondition',
    subtitle: 'Safeguard Your Crops, Ensure\nGrowth, with Our Trusted,\nEco-Friendly Pesticides. Harvest\nwith Confidence!',
    image: require('../assets/images/gun.png'), 
    backgroundColor: '#2196F3',
  },
];

export default function OnboardingSlides() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handleFinishOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/login');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      router.replace('/login');
    }
  };

  const handleNext = () => {
    if (currentPage < slides.length - 1) {
      pagerRef.current?.setPage(currentPage + 1);
    } else {
      handleFinishOnboarding();
    }
  };

  const handleSkip = () => {
    handleFinishOnboarding();
  };

  const renderSlide = (slide: SlideData) => {
    return (
      <View key={slide.id} style={[styles.slide]}>
        <Image source={slide.image} style={styles.image} resizeMode="contain" />
        <Text style={[styles.title, { color: '#00BFA5' }]}>{slide.title}</Text>
        <Text style={[styles.subtitle, { color: '#00BFA5' }]}>{slide.subtitle}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {slides.map(renderSlide)}
      </PagerView>

      <View style={styles.separator} />

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentPage ? styles.activeDot : styles.inactiveDot
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentPage === slides.length - 1 ? 'GOT IT' : 'NEXT'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pager: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  footer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00BFA5',
  },
  nextText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00BFA5',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#00BFA5',
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  },
});
