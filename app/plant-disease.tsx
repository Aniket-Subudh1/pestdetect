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

const commonDiseases = [
  {
    id: 1,
    name: 'Rice Leaf Blight',
    symptoms: 'Brown spots on leaves, yellowing margins',
    cause: 'Bacterial infection',
    treatment: 'Copper-based fungicides, improved drainage',
    prevention: 'Crop rotation, resistant varieties',
    severity: 'High',
    color: '#F44336',
    icon: '🌾',
  },
  {
    id: 2,
    name: 'Tomato Late Blight',
    symptoms: 'Dark water-soaked spots, white fuzzy growth',
    cause: 'Fungal pathogen (Phytophthora)',
    treatment: 'Metalaxyl, Mancozeb application',
    prevention: 'Good air circulation, avoid overhead watering',
    severity: 'High',
    color: '#F44336',
    icon: '🍅',
  },
  {
    id: 3,
    name: 'Wheat Rust',
    symptoms: 'Orange-red pustules on leaves and stems',
    cause: 'Fungal infection',
    treatment: 'Fungicide sprays, resistant varieties',
    prevention: 'Early planting, field sanitation',
    severity: 'Medium',
    color: '#FF9800',
    icon: '🌾',
  },
  {
    id: 4,
    name: 'Cotton Leaf Curl',
    symptoms: 'Curled leaves, yellowing, stunted growth',
    cause: 'Viral infection (whitefly transmitted)',
    treatment: 'Control whitefly vectors, remove infected plants',
    prevention: 'Resistant varieties, vector control',
    severity: 'Medium',
    color: '#FF9800',
    icon: '🌿',
  },
];

export default function PlantDiseaseScreen() {
  const renderDiseaseCard = (disease: typeof commonDiseases[0]) => (
    <View key={disease.id} style={[styles.diseaseCard, { borderLeftColor: disease.color }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.diseaseIcon}>{disease.icon}</Text>
        <View style={styles.diseaseInfo}>
          <Text style={styles.diseaseName}>{disease.name}</Text>
          <View style={[styles.severityBadge, { backgroundColor: disease.color }]}>
            <Text style={styles.severityText}>{disease.severity} Risk</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Symptoms:</Text>
          <Text style={styles.detailText}>{disease.symptoms}</Text>
        </View>
        
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Cause:</Text>
          <Text style={styles.detailText}>{disease.cause}</Text>
        </View>
        
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Treatment:</Text>
          <Text style={styles.detailText}>{disease.treatment}</Text>
        </View>
        
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Prevention:</Text>
          <Text style={styles.detailText}>{disease.prevention}</Text>
        </View>
      </View>
    </View>
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
        <Text style={styles.headerTitle}>Plant Disease Guide</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Plant Disease Detection</Text>
          <Text style={styles.sectionSubtitle}>
            Early detection and proper treatment of plant diseases
          </Text>
          
          {/* Quick Detection Section */}
          <View style={styles.detectionSection}>
            <Text style={styles.detectionTitle}>Quick Disease Detection</Text>
            <TouchableOpacity 
              style={styles.detectionButton}
              onPress={() => router.push('/disease-detection')}
            >
              <Text style={styles.detectionIcon}>📱</Text>
              <Text style={styles.detectionText}>Scan Plant for Disease</Text>
            </TouchableOpacity>
          </View>

          {/* Common Diseases */}
          <View style={styles.diseasesSection}>
            <Text style={styles.diseasesTitle}>Common Plant Diseases</Text>
            <View style={styles.diseasesList}>
              {commonDiseases.map(renderDiseaseCard)}
            </View>
          </View>

          {/* Prevention Tips */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>General Prevention Tips</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Text style={styles.tipIcon}>🌱</Text>
                <Text style={styles.tipText}>Use disease-resistant crop varieties</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipIcon}>💧</Text>
                <Text style={styles.tipText}>Avoid overhead watering to reduce humidity</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipIcon}>🔄</Text>
                <Text style={styles.tipText}>Practice crop rotation to break disease cycles</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipIcon}>🧹</Text>
                <Text style={styles.tipText}>Maintain field sanitation and hygiene</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipIcon}>👁️</Text>
                <Text style={styles.tipText}>Regular monitoring and early detection</Text>
              </View>
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
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  detectionSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  detectionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detectionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  detectionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  diseasesSection: {
    marginBottom: 20,
  },
  diseasesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  diseasesList: {
    gap: 15,
  },
  diseaseCard: {
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
    marginBottom: 15,
  },
  diseaseIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  diseaseInfo: {
    flex: 1,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  severityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    gap: 10,
  },
  detailSection: {
    marginBottom: 8,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  tipsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
  },
  tipText: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
    lineHeight: 20,
  },
});