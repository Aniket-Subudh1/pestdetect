import BottomNavigation from '@/components/BottomNavigation';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { authAPI } from '../services/api';

interface User {
  name: string;
  email: string;
  mobile?: string;
  createdAt: string;
}

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await authAPI.getProfile();
      
      if (response.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      
      // If unauthorized, redirect to login
      if (error instanceof Error && (error.message.includes('authorized') || error.message.includes('token'))) {
        Alert.alert(
          'Session Expired',
          'Please login again to continue.',
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
      } else {
        Alert.alert('Error', 'Failed to load profile. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load profile when screen focuses
  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: confirmLogout }
      ]
    );
  };

  const confirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authAPI.logout();
      
      Alert.alert(
        'Logged Out',
        'You have been successfully logged out.',
        [{ text: 'OK', onPress: () => router.replace('/login') }]
      );
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local token and redirect
      router.replace('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleEditProfile = () => {
    router.push({
      pathname: '/edit-profile',
      params: { 
        name: user?.name || '',
        email: user?.email || '',
        mobile: user?.mobile || ''
      }
    });
  };

  const handleChangePassword = () => {
    router.push('/change-password');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00BFA5" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
        <BottomNavigation />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load profile</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchUserProfile}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
        <BottomNavigation />
      </SafeAreaView>
    );
  }

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
                <Text style={styles.avatarText}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.editIcon}
                onPress={handleEditProfile}
              >
                <Text style={styles.editIconText}>✎</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.userName}>{user.name || 'User Name'}</Text>
            
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>✉️</Text>
                <Text style={styles.contactText}>{user.email || 'email@example.com'}</Text>
              </View>
              
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📞</Text>
                <Text style={styles.contactText}>{user.mobile || 'Not provided'}</Text>
              </View>

              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📅</Text>
                <Text style={styles.contactText}>
                  Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </View>
            </View>
          </View>

          {/* Profile Options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={handleEditProfile}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.optionIcon}>👤</Text>
                <Text style={styles.optionText}>Edit Profile</Text>
              </View>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionItem}
              onPress={handleChangePassword}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.optionIcon}>🔒</Text>
                <Text style={styles.optionText}>Change Password</Text>
              </View>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionItem}
              onPress={() => router.push('/detection/history')}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.optionIcon}>📊</Text>
                <Text style={styles.optionText}>Detection History</Text>
              </View>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity 
            style={[styles.logoutButton, isLoggingOut && styles.logoutButtonDisabled]}
            onPress={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.logoutButtonText}>LOGOUT</Text>
            )}
          </TouchableOpacity>

          {/* App Info */}
          <View style={styles.bottomIndicator}>
            <Text style={styles.loginSuccess}>✓ Logged in successfully</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#00BFA5',
    paddingVertical: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    top: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
  },
  profileCard: {
    top: 40,
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
    top: -80,
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
    flex: 1,
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 60,
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
    backgroundColor: '#00BFA5',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    width: 100,
    alignSelf: 'center',
  },
  logoutButtonDisabled: {
    backgroundColor: '#CCCCCC',
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