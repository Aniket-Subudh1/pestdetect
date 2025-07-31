// app/pesticide-recognition.tsx
import BottomNavigation from '@/components/BottomNavigation';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const pesticideGuide = [
  {
    id: 1,
    name: 'Chlorantraniliprole',
    type: 'Insecticide',
    dosage: '150-300 ML/HA',
    targetPests: 'Rice Leaf Roller, Stem Borer',
    safetyLevel: 'Low Risk',
    color: '#4CAF50',
    icon: '🌾',
  },
  {
    id: 2,
    name: 'Buprofezin',
    type: 'Insecticide',
    dosage: '250-300 G/HA',
    targetPests: 'Brown Plant Hopper, White Fly',
    safetyLevel: 'Medium Risk',
    color: '#FF9800',
    icon: '🦗',
  },
  {
    id: 3,
    name: 'Mancozeb',
    type: 'Fungicide',
    dosage: '2-3 G/L',
    targetPests: 'Leaf Blight, Blast Disease',
    safetyLevel: 'Medium Risk',
    color: '#2196F3',
    icon: '🍄',
  },
  {
    id: 4,
    name: 'Imidacloprid',
    type: 'Insecticide',
    dosage: '200-250 ML/HA',
    targetPests: 'Aphids, Thrips, Whitefly',
    safetyLevel: 'High Risk',
    color: '#F44336',
    icon: '🐛',
  },
];

export default function PesticideRecognitionScreen() {
  const [selectedPesticide, setSelectedPesticide] = useState<number | null>(null);

  const renderPesticideCard = (pesticide: typeof pesticideGuide[0]) => (
    <TouchableOpacity 
      key={pesticide.id} 
      style={[styles.pesticideCard, { borderLeftColor: pesticide.color }]}
      onPress={() => setSelectedPesticide(pesticide.id)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.pesticideIcon}>{pesticide.icon}</Text>
        <View style={styles.pesticideInfo}>
          <Text style={styles.pesticideName}>{pesticide.name}</Text>
          <Text style={styles.pesticideType}>{pesticide.type}</Text>
        </View>
        <View style={[styles.safetyBadge, { backgroundColor: pesticide.color }]}>
          <Text style={styles.safetyText}>{pesticide.safetyLevel}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Dosage:</Text>
          <Text style={styles.detailValue}>{pesticide.dosage}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Target Pests:</Text>
          <Text style={styles.detailValue}>{pesticide.targetPests}</Text>
        </View>
      </View>
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
        <Text style={styles.headerTitle}>Pesticide Guide</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Pesticide Recognition</Text>
          <Text style={styles.sectionSubtitle}>
            Safeguard Your Crops, Ensure Growth, with Our Trusted, Eco-Friendly Pesticides. 
            Harvest with Confidence!
          </Text>
          
          {/* Quick Scan Section */}
          <View style={styles.scanSection}>
            <Text style={styles.scanTitle}>Quick Pesticide Scan</Text>
            <View style={styles.scanButtons}>
              <TouchableOpacity style={styles.scanButton}>
                <Text style={styles.scanIcon}>📷</Text>
                <Text style={styles.scanText}>Scan Label</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scanButton}>
                <Text style={styles.scanIcon}>🔍</Text>
                <Text style={styles.scanText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Pesticide Guide */}
          <View style={styles.guideSection}>
            <Text style={styles.guideTitle}>Pesticide Guide</Text>
            <View style={styles.pesticideList}>
              {pesticideGuide.map(renderPesticideCard)}
            </View>
          </View>

          {/* Safety Tips */}
          <View style={styles.safetySection}>
            <Text style={styles.safetyTitle}>Safety Guidelines</Text>
            <View style={styles.safetyTips}>
              <Text style={styles.safetyTip}>• Always wear protective equipment</Text>
              <Text style={styles.safetyTip}>• Follow recommended dosage strictly</Text>
              <Text style={styles.safetyTip}>• Store pesticides in a safe, dry place</Text>
              <Text style={styles.safetyTip}>• Keep away from children and animals</Text>
              <Text style={styles.safetyTip}>• Dispose of containers properly</Text>
            </View>
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
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  scanSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center',
  },
  scanButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scanButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#00BFA5',
    borderRadius: 10,
    width: '40%',
  },
  scanIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  scanText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  guideSection: {
    marginBottom: 20,
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  pesticideList: {
    gap: 15,
  },
  pesticideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pesticideIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  pesticideInfo: {
    flex: 1,
  },
  pesticideName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  pesticideType: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  safetyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  safetyText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  safetySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  safetyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  safetyTips: {
    gap: 8,
  },
  safetyTip: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});