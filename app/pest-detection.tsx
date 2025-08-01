import BottomNavigation from '@/components/BottomNavigation';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { detectionAPI } from '../services/api';

interface DetectedPest {
  _id: string;
  result: {
    detectedClass: string;
    confidence: number;
    description: string;
    treatment: string;
    pesticide: {
      name: string;
      dosage: string;
      type: string;
    };
  };
  createdAt: string;
}

export default function PestDetectionScreen() {
  const [detectedPest, setDetectedPest] = useState<DetectedPest | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  // Request camera and gallery permissions
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Camera and photo library permissions are required to detect pests.',
        [{ text: 'OK' }]
      );
    }
  };

  // Handle camera capture
  const handleCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is required to take photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await detectPest(result.assets[0]);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to open camera. Please try again.');
    }
  };

  // Handle gallery selection
  const handleGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Photo library permission is required to select images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await detectPest(result.assets[0]);
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Failed to open gallery. Please try again.');
    }
  };

  // Detect pest using API
  const detectPest = async (imageAsset: any) => {
    try {
      setIsLoading(true);
      
      const imageFile = {
        uri: imageAsset.uri,
        type: imageAsset.mimeType || 'image/jpeg',
        fileName: imageAsset.fileName || `pest_${Date.now()}.jpg`,
      };

      console.log('Detecting pest with image:', imageFile);

      const response = await detectionAPI.detectPest(imageFile);
      
      if (response.success) {
        setDetectedPest(response.data.detection);
        console.log('Pest detection successful:', response.data.detection);
      } else {
        throw new Error(response.message || 'Detection failed');
      }
    } catch (error) {
      console.error('Detection error:', error);
      
      let errorMessage = 'Failed to detect pest. Please try again.';
      
      if (error instanceof Error && error.message.includes('authorized')) {
        errorMessage = 'Please login to use pest detection.';
        Alert.alert('Authentication Required', errorMessage, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => router.push('/login') }
        ]);
        return;
      } else if (error instanceof Error && error.message.includes('model not found')) {
        errorMessage = 'Pest detection model is not available. Please try again later.';
      } else if (error instanceof Error && (error.message.includes('network') || error.message.includes('fetch'))) {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      Alert.alert('Detection Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset detection
  const resetDetection = () => {
    setDetectedPest(null);
  };

  // Navigate to pest info
  const showPestInfo = () => {
    if (detectedPest) {
      Alert.alert(
        'Pest Information',
        `Pest: ${detectedPest.result.detectedClass}\n\nDescription: ${detectedPest.result.description}\n\nTreatment: ${detectedPest.result.treatment}`,
        [{ text: 'OK' }]
      );
    }
  };

  // Share detection result
  const shareResult = () => {
    if (detectedPest) {
      Alert.alert(
        'Share Result',
        'Feature coming soon! You will be able to share your detection results with agricultural experts.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={isLoading}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plant Pest Detection</Text>
      </View>

      <View style={styles.content}>
        {isLoading ? (
          // Loading state
          <View style={styles.loadingState}>
            <ActivityIndicator size="large" color="#00BFA5" />
            <Text style={styles.loadingText}>Analyzing plant image...</Text>
            <Text style={styles.loadingSubtext}>Our AI is searching for pests in your image</Text>
            <View style={styles.loadingIndicator}>
              <Text style={styles.loadingStep}>🔍 Scanning for pests...</Text>
              <Text style={styles.loadingStep}>🧠 Running AI analysis...</Text>
              <Text style={styles.loadingStep}>💊 Preparing treatment plan...</Text>
            </View>
          </View>
        ) : !detectedPest ? (
          // Initial state
          <View style={styles.initialState}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../assets/images/pestt.png")}
                style={styles.leafIcon}
              />
            </View>
            
            <Text style={styles.scanText}>Scan For Pest</Text>
            <Text style={styles.instructionText}>
              Take a clear photo of the pest or affected plant area for AI-powered pest identification
            </Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={handleCamera}
              >
                <Image
                  source={require("../assets/images/cam.png")}
                  style={styles.iconImage}
                />
                <Text style={styles.buttonText}>Camera</Text>
              </TouchableOpacity>
             
              <TouchableOpacity 
                style={styles.galleryButton}
                onPress={handleGallery}
              >
                <Image
                  source={require("../assets/images/gal.png")}
                  style={styles.iconImage}
                />
                <Text style={styles.buttonText}>Gallery</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tipContainer}>
              <Text style={styles.tipTitle}>🐛 Tips for better pest detection:</Text>
              <Text style={styles.tipText}>• Focus on the pest or damage</Text>
              <Text style={styles.tipText}>• Use macro mode if available</Text>
              <Text style={styles.tipText}>• Ensure pest is clearly visible</Text>
              <Text style={styles.tipText}>• Include surrounding damage</Text>
            </View>
          </View>
        ) : (
          // Detection result state
          <View style={styles.resultState}>
            <View style={styles.resultHeader}>
              <Text style={styles.detectionTitle}>🎯 Pest Identified</Text>
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceLabel}>Accuracy:</Text>
                <Text style={styles.confidenceText}>
                  {(detectedPest.result.confidence * 100).toFixed(1)}%
                </Text>
              </View>
            </View>
            
            <View style={styles.pestCard}>
              <Text style={styles.pestName}>{detectedPest.result.detectedClass}</Text>
              <Text style={styles.pestStatus}>DETECTED</Text>
            </View>
            
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>About this pest:</Text>
              <Text style={styles.pestDescription}>{detectedPest.result.description}</Text>
            </View>
            
            <View style={styles.treatmentContainer}>
              <Text style={styles.treatmentLabel}>🛡️ Recommended Treatment:</Text>
              <Text style={styles.treatmentText}>{detectedPest.result.treatment}</Text>
            </View>
            
            {detectedPest.result.pesticide && (
              <View style={styles.productContainer}>
                <View style={styles.productBox}>
                  <Text style={styles.productName}>{detectedPest.result.pesticide.name}</Text>
                  <Text style={styles.productType}>{detectedPest.result.pesticide.type}</Text>
                  <Text style={styles.productDosage}>Dosage: {detectedPest.result.pesticide.dosage}</Text>
                </View>
              </View>
            )}
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.retryButton} onPress={resetDetection}>
                <Text style={styles.retryButtonText}>Scan Again</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.infoButton} onPress={showPestInfo}>
                <Text style={styles.infoButtonText}>More Info</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.shareButton} onPress={shareResult}>
                <Text style={styles.shareButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cameraButton}
                onPress={handleCamera}
              >
                <Image
                  source={require("../assets/images/cam.png")}
                  style={styles.iconImage}
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.galleryButton}
                onPress={handleGallery}
              >
                <Image
                  source={require("../assets/images/gal.png")}
                  style={styles.iconImage}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.moreInfoButton} onPress={showPestInfo}>
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
    paddingVertical: 20,
    paddingTop: 35,
    borderRadius: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 35,
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
    paddingBottom: 100,
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333333',
    marginTop: 20,
    fontWeight: '500',
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 30,
    alignItems: 'center',
  },
  loadingStep: {
    fontSize: 14,
    color: '#00BFA5',
    marginVertical: 5,
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
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  scanText: {
    fontSize: 24,
    color: '#333333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  cameraButton: {
    alignItems: 'center',
    padding: 15,
  },
  galleryButton: {
    alignItems: 'center',
    padding: 15,
  },
  iconImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  tipContainer: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    borderRadius: 15,
    alignSelf: 'stretch',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666666',
    marginVertical: 2,
  },
  resultState: {
    flex: 1,
    paddingTop: 20,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  detectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 10,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 5,
  },
  confidenceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  pestCard: {
    backgroundColor: '#FF5722',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  pestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  pestStatus: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  descriptionContainer: {
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  pestDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  treatmentContainer: {
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  treatmentLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  treatmentText: {
    fontSize: 14,
    color: '#C62828',
    lineHeight: 20,
    fontWeight: '500',
  },
  productContainer: {
    marginBottom: 20,
  },
  productBox: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  productType: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  productDosage: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  retryButton: {
    flex: 1,
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  moreInfoButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  moreInfoText: {
    color: '#FFFFFF',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
});