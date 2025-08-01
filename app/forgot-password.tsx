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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await authAPI.forgotPassword(email.toLowerCase().trim());
      
      if (response.success) {
        Alert.alert(
          'Reset Code Sent!', 
          'We\'ve sent a password reset code to your email. Please check your inbox.',
          [{
            text: 'Continue',
            onPress: () => router.push({
              pathname: '/reset-password',
              params: { email: email.toLowerCase().trim() }
            })
          }]
        );
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      if (errorMessage.includes('No account found')) {
        Alert.alert(
          'Account Not Found', 
          'No account found with this email address. Please check your email or register for a new account.',
          [
            { text: 'Try Again', style: 'cancel' },
            { text: 'Register', onPress: () => router.push('/register') }
          ]
        );
      } else {
        Alert.alert(
          'Error', 
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={isLoading}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Don&apos;t worry! Enter your email address and we&apos;ll send you a code to reset your password.
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
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

          <TouchableOpacity 
            style={[styles.sendButton, (isLoading || !email.trim()) && styles.sendButtonDisabled]} 
            onPress={handleForgotPassword}
            disabled={isLoading || !email.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.sendButtonText}>SEND RESET CODE</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => router.push('/login')}
            disabled={isLoading}
          >
            <Text style={styles.loginLinkText}>Remember your password? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 30,
  },
  backArrow: {
    fontSize: 24,
    color: '#333333',
    fontWeight: 'bold',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  formSection: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#00BFA5',
    paddingVertical: 15,
    fontSize: 16,
    color: '#333333',
  },
  sendButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#00BFA5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});