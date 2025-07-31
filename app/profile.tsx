// app/profile.tsx
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

export default function ProfileScreen() {
  const handleLogout = () => {
    // Add logout logic here
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.content}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>R</Text>
              </View>
              <TouchableOpacity style={styles.editIcon}>
                <Text style={styles.editIconText}>✎</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.userName}>Rakesh Kumar Ray</Text>
            
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>✉️</Text>
                <Text style={styles.contactText}>rakeshrayk@gmail.com</Text>
              </View>
              
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📞</Text>
                <Text style={styles.contactText}>+91-8895883488</Text>
              </View>
              
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>LOGOUT</Text>
          </TouchableOpacity>
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
  scrollContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#00BFA5',
    paddingVertical: 40,
    borderRadius:40,
    justifyContent:"center",
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    top:10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
  },
  profileCard: {
    top:40,
  backgroundColor: '#FFFFFF',
  borderColor: '#000000', 
  borderWidth: 4,          
  borderRadius: 20,
  padding: 30,
  alignItems: 'center',
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
},

  avatarContainer: {
    position: 'relative',
    marginBottom: -50,
    top:-80,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00BFA5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  contactInfo: {
    width: '100%',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    fontSize: 18,
    marginRight: 15,
    width: 25,
  },
  contactText: {
    fontSize: 16,
    color: '#666666',
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  optionArrow: {
    fontSize: 20,
    color: '#CCCCCC',
    fontWeight: 'bold',
  },
  logoutButton: {
    top:20,
    backgroundColor: '#00BFA5',
    paddingVertical: 15,
    borderRadius: 0,
    alignItems: 'center',
    marginBottom: 20,
    width:100,
    left:90,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  bottomIndicator: {
    alignItems: 'center',
    marginTop: 10,
  },
  loginSuccess: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
});