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

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => router.push('/profile')}
            >
              <Text style={styles.profileText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Services */}
        <View style={styles.servicesGrid}>
          <TouchableOpacity 
            style={[styles.serviceCard, styles.pestDetectionCard]}
            onPress={() => router.push('/pest-detection')}
          >
            <View style={styles.serviceIconContainer}>
              <View style={styles.targetIcon}>
                <Text style={styles.targetText}>⊕</Text>
              </View>
            </View>
            <Text style={styles.serviceTitle}>Pest Detection</Text>
            <Text style={styles.serviceSubtitle}>Detect Fast, Protect Harvest.{'\n'}Earnings Guardian Angel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.serviceCard, styles.diseaseDetectionCard]}
            onPress={() => router.push('/disease-detection')}
          >
            <View style={styles.serviceIconContainer}>
              <View style={styles.leafIcon}>
                <Text style={styles.leafText}>🦠</Text>
              </View>
            </View>
            <Text style={styles.serviceTitle}>Disease Detection</Text>
            <Text style={styles.serviceSubtitle}>Early Detection, Healthier Crops.{'\n'}Empowering Farmers to Combat{'\n'}Plant Diseases with Precision and{'\n'}Care.</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.serviceCard, styles.pesticideCard]}
            onPress={() => router.push('/pesticide-recognition')}
          >
            <View style={styles.serviceIconContainer}>
              <View style={styles.pesticideIcon}>
                <Text style={styles.pesticideText}>🚿</Text>
              </View>
            </View>
            <Text style={styles.serviceTitle}>Pesticide Recondition</Text>
            <Text style={styles.serviceSubtitle}>Safeguard Your Crops, Ensure{'\n'}Growth, with Our Trusted,{'\n'}Eco-Friendly Pesticides. Harvest{'\n'}with Confidence!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#00BFA5',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'flex-end',
  },
  profileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  profileText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  servicesGrid: {
    padding: 20,
    gap: 20,
  },
  serviceCard: {
    borderRadius: 20,
    padding: 25,
    minHeight: 180,
  },
  pestDetectionCard: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  diseaseDetectionCard: {
    backgroundColor: '#4CAF50',
  },
  pesticideCard: {
    backgroundColor: '#2196F3',
  },
  serviceIconContainer: {
    marginBottom: 15,
  },
  targetIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#333333',
  },
  targetText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  leafIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leafText: {
    fontSize: 24,
  },
  pesticideIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pesticideText: {
    fontSize: 24,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  serviceSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
  },
});