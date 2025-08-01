import { router, useLocalSearchParams } from 'expo-router';
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
import { OTPInput } from '../components/OTPInput';
import { authAPI } from '../services/api';

export default function ResetPasswordScreen() {
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasOTPError, setHasOTPError] = useState(false);

  const validatePassword = () => {
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      Alert.alert(
        'Weak Password', 
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      );
      return false;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleOTPChange = (otpValue: string) => {
    setOtp(otpValue);
    setHasOTPError(false);
  };

  const handleOTPComplete = (otpValue: string) => {
    console.log('OTP completed:', otpValue);
  };

  const handleResetPassword = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the OTP');
      setHasOTPError(true);
      return;
    }

    if (otp.length !== 6) {
      Alert.alert('Error', 'OTP must be 6 digits');
      setHasOTPError(true);
      return;
    }

    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validatePassword()) return;

    setIsLoading(true);
    setHasOTPError(false);
    
    try {
      console.log('Resetting password:', { email, otp, newPassword: '[HIDDEN]' });
      
      const response = await authAPI.resetPassword(email as string, otp, newPassword);
      
      if (response.success) {
        Alert.alert(
          'Password Reset Successful!', 
          'Your password has been successfully reset. You are now logged in.',
          [{
            text: 'Continue',
            onPress: () => router.replace('/(tabs)')
          }]
        );
      }
    } catch (error) {
      console.error('Reset password error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('Invalid or expired')) {
        setHasOTPError(true);
        Alert.alert(
          'Invalid OTP', 
          'The OTP is invalid or has expired. Please request a new password reset.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Try Again', onPress: () => router.push('/forgot-password') }
          ]
        );
      } else {
        Alert.alert(
          'Reset Failed', 
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
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter the code sent to {email} and create a new password.
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.otpContainer}>
            <Text style={styles.label}>Reset Code</Text>
            <OTPInput
              length={6}
              value={otp}
              onChangeText={handleOTPChange}
              onComplete={handleOTPComplete}
              disabled={isLoading}
              hasError={hasOTPError}
              autoFocus={true}
              keyboardType="number-pad"
              containerStyle={styles.otpInputContainer}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry
              editable={!isLoading}
              autoComplete="password-new"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry
              editable={!isLoading}
              autoComplete="password-new"
            />
          </View>

          <TouchableOpacity 
            style={[
              styles.resetButton, 
              (isLoading || !otp.trim() || !newPassword.trim() || !confirmPassword.trim()) 
              && styles.resetButtonDisabled
            ]} 
            onPress={handleResetPassword}
            disabled={isLoading || !otp.trim() || !newPassword.trim() || !confirmPassword.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.resetButtonText}>RESET PASSWORD</Text>
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
    marginBottom: 40,
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
  },
  formSection: {
    flex: 1,
  },
  otpContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  otpInputContainer: {
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  resetButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  resetButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  resetButtonText: {
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