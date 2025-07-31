import BottomNavigation from '@/components/BottomNavigation';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
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
  const [fontsLoaded] = useFonts({
    GreatVibes: require('../../assets/fonts/GreatVibes-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={require('../../assets/images/tree.png')} 
              style={styles.imageStyle}
            />
            <Text style={styles.cursiveText}>Culture That Unites Us Together</Text>
            <Text style={styles.subText}>Agriculture</Text>
          </View>
        </View>

        {/* Main Services */}
        <View style={styles.servicesContainer}>
          <View style={styles.servicesGrid}>

            {/* Pest Detection Card */}
           <LinearGradient
  colors={['#000000', '#4CAF50']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={[styles.serviceCard, styles.gradientCard]}
>
  <TouchableOpacity
    style={styles.cardRow}
    onPress={() => router.push('/pest-detection')}
  >
    <Image
      source={require('../../assets/images/pot.png')}
      style={styles.cardImage}
    />
    <Text style={styles.serviceTitle}>Plant Disease{'\n'}    Detection</Text>
  </TouchableOpacity>
</LinearGradient>


            {/* Disease Detection Card */}
           <LinearGradient
  colors={['#000000', '#4CAF50']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={[styles.serviceCard, styles.gradientCard]}
>
  <TouchableOpacity
    style={styles.cardRow}
    onPress={() => router.push('/disease-detection')}
  >
    <Image
      source={require('../../assets/images/pestt.png')}
      style={styles.cardImage}
    />
    <Text style={styles.serviceTitle}>    Pest{'\n'}Detection</Text>
  </TouchableOpacity>
</LinearGradient>


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
    paddingBottom:-20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#00BFA5',
    paddingTop:35,
    borderRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  subText: {
    color: '#201f1fff',
    fontSize: 29,
    opacity: 0.9,
    bottom:10,
    fontWeight: '500',
  },
  cursiveText: {
    fontFamily: 'GreatVibes',
    fontSize: 24,
    width: 600,
    letterSpacing:2.5,
    fontWeight:'400',
    color: '#000000',
    marginTop: 0,
    textAlign: 'center',
  },
  servicesContainer: {
    padding: 20,
    left: 30,
    width:400,
    height:150,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  servicesGrid: {
    gap: 15,
    marginBottom: 30,
  },
  serviceCard: {
    borderRadius: 20,
    padding: 20,
    minHeight: 80,
  },
  gradientCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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
  serviceTitle: {
    fontSize: 28,
    justifyContent:"center",
    left:20,
    alignItems:'flex-end',
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  serviceSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#DDDDDD',
  },
  imageStyle: {
    width: 80,
    height: 80,
    right: 0,
    paddingHorizontal: 0,
    resizeMode: 'contain',
    borderRadius: 75,
  },
  cardRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
},

cardImage: {
  width: 80,
  height: 80,
  borderRadius: 10,
  resizeMode: 'contain',
},

});
