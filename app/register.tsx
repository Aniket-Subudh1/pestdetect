import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { authAPI } from '../services/api';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    if (!name.trim() || !email.trim() || !mobile.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    if (name.trim().length < 2) {
      Alert.alert('Error', 'Name must be at least 2 characters long');
      return false;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (mobile.length < 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    // Check password strength
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      Alert.alert(
        'Weak Password', 
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      );
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    
    try {
      const userData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        mobile: mobile.trim(),
        password: password
      };

      console.log('Registering user:', { ...userData, password: '[HIDDEN]' });
      
      const response = await authAPI.register(userData);
      
      if (response.success) {
        if (response.data.needsVerification) {
          // Email verification is required
          Alert.alert(
            'Registration Successful!', 
            'Please check your email for the verification code.',
            [{
              text: 'Verify Now',
              onPress: () => router.push({
                pathname: '/verify-email',
                params: { 
                  email: userData.email,
                  name: userData.name 
                }
              })
            }]
          );
        } else {
          // User is automatically logged in (no email verification needed)
          Alert.alert(
            'Registration Successful!', 
            'Welcome to PestDetect! You have been automatically logged in.',
            [{
              text: 'Continue',
              onPress: () => router.replace('/(tabs)')
            }]
          );
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      if (errorMessage.includes('already exists')) {
        Alert.alert(
          'Registration Failed', 
          'An account with this email already exists. Please try logging in instead.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Login', onPress: () => router.push('/login') }
          ]
        );
      } else if (errorMessage.includes('Validation')) {
        Alert.alert('Validation Error', 'Please check your input and try again.');
      } else {
        Alert.alert(
          'Registration Failed', 
          errorMessage || 'Something went wrong. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header section */}
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
            disabled={isLoading}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.titleSection}>
            <Text style={styles.welcomeText}>Here&apos;s{'\n'}your first{'\n'}step with{'\n'}us!</Text>
            <Image
              source={require('../assets/images/register.png')} 
              style={styles.imageStyle}
            />
          </View>
        </View>

        {/* Form section */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              autoComplete="name"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              value={mobile}
              onChangeText={setMobile}
              placeholder="Enter your mobile number"
              keyboardType="phone-pad"
              autoComplete="tel"
              maxLength={10}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password (min 6 characters)"
              secureTextEntry
              autoComplete="password-new"
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity 
            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]} 
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.registerButtonText}>REGISTER</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => router.push('/login')}
            disabled={isLoading}
          >
            <Text style={styles.loginLinkText}>Already have an account? Login</Text>
          </TouchableOpacity>
          
          <View style={styles.verticalLine} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BFA5',
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: 280,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 24,
    right: -10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 25,
  },
  formContainer: {
    flex: 1,
    width: 350,
    right: -20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  registerButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 12,
    borderRadius: 25,
    width: 180,
    right: -50,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  registerButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 10,
  },
  loginLinkText: {
    color: '#00BFA5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 200,
    height: 200,
    right: 0,
    top: -60,
    resizeMode: 'contain',
    borderRadius: 75,
  },
  verticalLine: {
    position: 'absolute',
    bottom: -10, 
    left: -80,
    width: 100,
    borderRadius: 50,
    height: 100,
    backgroundColor: '#FFFFFF',
  },
});