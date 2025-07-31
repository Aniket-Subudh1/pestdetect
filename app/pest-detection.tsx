import BottomNavigation from '@/components/BottomNavigation';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type DetectedPest = {
  name: string;
  description: string;
  treatment: string;
  image: any;
};

export default function PestDetectionScreen() {
  const [detectedPest, setDetectedPest] = useState<DetectedPest | null>(null);

  const mockDetection = () => {
    setDetectedPest({
      name: 'RICE LEAF ROLLER',
      description: 'DETECTED',
      treatment: 'PLEASE USE CHLORANTRANILIPROLE OF 150-300 ML/HA',
      image: require('../assets/images/pot.png'),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Plant Pest Detection</Text>
      </View>

      <View style={styles.content}>
        {!detectedPest ? (
          <View style={styles.initialState}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../assets/images/pestt.png")}
                style={styles.leafIcon}
              />
            </View>

            <Text style={styles.scanText}>Scan For Pest</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={mockDetection}
              >
                <Image
                  source={require("../assets/images/cam.png")}
                  style={styles.iconImage}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.galleryButton}>
                <Image
                  source={require("../assets/images/gal.png")}
                  style={styles.iconImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.resultState}>
            <View style={styles.resultImageContainer}>
              <Image
                source={detectedPest.image}
                style={styles.resultDetectedImage}
              />
            </View>

            <Text style={styles.pestName}>{detectedPest.name}</Text>
            <Text style={styles.pestStatus}>{detectedPest.description}</Text>

            <View style={styles.treatmentContainer}>
              <Text style={styles.treatmentText}>{detectedPest.treatment}</Text>
            </View>

            <View style={styles.productContainer}>
              <View style={styles.productBox}>
                <Text style={styles.productName}>Rajac</Text>
                <Text style={styles.productSubname}>Systemic Insecticide</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cameraButton}>
                <Image
                  source={require("../assets/images/cam.png")}
                  style={styles.iconImage}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.galleryButton}>
                <Image
                  source={require("../assets/images/gal.png")}
                  style={styles.iconImage}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.moreInfoButton}>
              <Text style={styles.moreInfoText}>
                CLICK ON PEST NAME TO KNOW MORE ABOUT PEST
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    backgroundColor: '#00BFA5',
    paddingVertical: 30,
    paddingTop: 35,
    borderRadius: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 18,
    backgroundColor:"#00BFA5",
    color: '#FFFFFF',
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
    gap:10,
    right:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButton: {
    width: 60,
    height: 60,
    left:10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
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
    overflow: 'hidden',
  },
  resultDetectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  pestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  pestStatus: {
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
