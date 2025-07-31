// app/disease-detection.tsx
import BottomNavigation from '@/components/BottomNavigation';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface DetectedDisease {
  name: string;
  description: string;
  treatment: string;
  image: string;
}

export default function DiseaseDetectionScreen() {
  const [detectedDisease, setDetectedDisease] = useState<DetectedDisease | null>(null);

  const mockDetection = () => {
    setDetectedDisease({
      name: 'SMALL BROWN PLANT HOPPER',
      description: 'DETECTED',
      treatment: 'PLEASE USE BUPROFEZIN OF 250-300 G/HA',
      image: '🌱'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plant Disease Detection</Text>
      </View>

      <View style={styles.content}>
        {!detectedDisease ? (
          // Initial state
          <View style={styles.initialState}>
            <View style={styles.iconContainer}>
              <View style={styles.leafIcon}>
                <Text style={styles.leafEmoji}>🌿</Text>
              </View>
            </View>
            
            <Text style={styles.scanText}>Scan For Disease</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cameraButton}
                onPress={mockDetection}
              >
                <Text style={styles.cameraIcon}>📷</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.galleryButton}>
                <Text style={styles.galleryIcon}>🖼️</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Detection result state
          <View style={styles.resultState}>
            <View style={styles.resultImageContainer}>
              <Text style={styles.resultImage}>{detectedDisease.image}</Text>
            </View>
            
            <Text style={styles.diseaseName}>{detectedDisease.name}</Text>
            <Text style={styles.diseaseStatus}>{detectedDisease.description}</Text>
            
            <View style={styles.treatmentContainer}>
              <Text style={styles.treatmentText}>{detectedDisease.treatment}</Text>
            </View>
            
            <View style={styles.productContainer}>
              <View style={styles.productBox}>
                <Text style={styles.productName}>Applaud</Text>
                <Text style={styles.productSubname}>Systemic Insecticide</Text>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cameraButton}>
                <Text style={styles.cameraIcon}>📷</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.galleryButton}>
                <Text style={styles.galleryIcon}>🖼️</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.moreInfoButton}>
              <Text style={styles.moreInfoText}>CLICK ON PEST NAME TO KNOW MORE ABOUT PEST</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 100, // Extra padding for bottom navigation
  },
  initialState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  leafIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leafEmoji: {
    fontSize: 40,
  },
  scanText: {
    fontSize: 18,
    color: '#00BFA5',
    marginBottom: 40,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00BFA5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 24,
  },
  galleryIcon: {
    fontSize: 24,
  },
  resultState: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  resultImageContainer: {
    width: 120,
    height: 80,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultImage: {
    fontSize: 40,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  diseaseStatus: {
    fontSize: 16,
    color: '#00BFA5',
    marginBottom: 20,
    fontWeight: '500',
  },
  treatmentContainer: {
    backgroundColor: '#00BFA5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  treatmentText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  productContainer: {
    marginBottom: 30,
  },
  productBox: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  productSubname: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  moreInfoButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  moreInfoText: {
    color: '#FFFFFF',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
});