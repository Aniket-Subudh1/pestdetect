import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
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

export default function VerifyEmailScreen() {
  const { email, name } = useLocalSearchParams();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerifyEmail = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      Alert.alert('Error', 'OTP must be 6 digits');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await authAPI.verifyEmail(email, otp);
      
      if (response.success) {
        Alert.alert(
          'Email Verified!', 
          'Your email has been successfully verified. You can now login.',
          [{
            text: 'Login Now',
            onPress: () => router.replace('/login')
          }]
        );
      }
    } catch (error) {
      console.error('Email verification error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('Invalid or expired')) {
        Alert.alert(
          'Invalid OTP', 
          'The OTP is invalid or has expired. Please request a new one.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Resend OTP', onPress: handleResendOTP }
          ]
        );
      } else {
        Alert.alert(
          'Verification Failed', 
          errorMessage || 'Something went wrong. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    
    try {
      const response = await authAPI.resendVerification(email);
      
      if (response.success) {
        Alert.alert('OTP Sent', 'A new OTP has been sent to your email.');
        setCountdown(60); // 60 second countdown
        setOtp('');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert(
        'Resend Failed', 
        errorMessage || 'Failed to resend OTP. Please try again.'
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={isLoading || isResending}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We&apos;ve sent a 6-digit code to{'\n'}
            <Text style={styles.emailText}>{email}</Text>
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              style={styles.otpInput}
              value={otp}
              onChangeText={setOtp}
              placeholder="000000"
              keyboardType="number-pad"
              maxLength={6}
              editable={!isLoading && !isResending}
              textAlign="center"
            />
          </View>

          <TouchableOpacity 
            style={[styles.verifyButton, (isLoading || !otp.trim()) && styles.verifyButtonDisabled]} 
            onPress={handleVerifyEmail}
            disabled={isLoading || !otp.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.verifyButtonText}>VERIFY EMAIL</Text>
            )}
          </TouchableOpacity>

          <View style={styles.resendSection}>
            <Text style={styles.resendText}>Didn&apos;t receive the code?</Text>
            <TouchableOpacity 
              style={styles.resendButton}
              onPress={handleResendOTP}
              disabled={countdown > 0 || isResending}
            >
              {isResending ? (
                <ActivityIndicator color="#00BFA5" size="small" />
              ) : (
                <Text style={[
                  styles.resendButtonText, 
                  countdown > 0 && styles.resendButtonTextDisabled
                ]}>
                  {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => router.push('/login')}
            disabled={isLoading || isResending}
          >
            <Text style={styles.loginLinkText}>Already verified? Login</Text>
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
  },
  emailText: {
    color: '#00BFA5',
    fontWeight: 'bold',
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
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  otpInput: {
    borderWidth: 2,
    borderColor: '#00BFA5',
    borderRadius: 15,
    paddingVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    letterSpacing: 8,
  },
  verifyButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  verifyButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resendText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  resendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  resendButtonText: {
    color: '#00BFA5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButtonTextDisabled: {
    color: '#CCCCCC',
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