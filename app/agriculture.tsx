import BottomNavigation from '@/components/BottomNavigation';
import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const agricultureTips = [
  {
    id: 1,
    title: 'Soil Health Management',
    description: 'Regular soil testing and organic matter addition improves crop yield.',
    icon: '🌱',
  },
  {
    id: 2,
    title: 'Water Conservation',
    description: 'Drip irrigation and mulching help conserve water resources.',
    icon: '💧',
  },
  {
    id: 3,
    title: 'Crop Rotation',
    description: 'Rotating crops prevents soil depletion and reduces pest buildup.',
    icon: '🔄',
  },
  {
    id: 4,
    title: 'Integrated Pest Management',
    description: 'Combine biological, cultural, and chemical methods for pest control.',
    icon: '🐛',
  },
  {
    id: 5,
    title: 'Weather Monitoring',
    description: 'Track weather patterns to optimize planting and harvesting times.',
    icon: '⛅',
  },
];

export default function AgricultureScreen() {
  const renderTip = (tip: typeof agricultureTips[0]) => (
    <TouchableOpacity key={tip.id} style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <Text style={styles.tipIcon}>{tip.icon}</Text>
        <Text style={styles.tipTitle}>{tip.title}</Text>
      </View>
      <Text style={styles.tipDescription}>{tip.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agriculture Tips</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Culture That Unites Us Together</Text>
          <Text style={styles.sectionSubtitle}>Best practices for modern farming</Text>
          
          <View style={styles.tipsContainer}>
            {agricultureTips.map(renderTip)}
          </View>
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#00BFA5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backArrow: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Extra padding for bottom navigation
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  tipsContainer: {
    gap: 15,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  tipDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});