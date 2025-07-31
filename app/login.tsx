import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
  
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to main app
      router.replace('/(tabs)');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.curvedContainer}>
          <Image
            source={require('../assets/images/login.png')} 
            style={styles.imageStyle}
          />
          <Text style={styles.accountText}>Already{'\n'}have an{'\n'}Account?</Text>
        </View>

        {/* Form section */}
        <View style={styles.formContainer}>
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
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </Text>
          </TouchableOpacity>

          <Link href="/register" asChild>
            <TouchableOpacity style={styles.registerLink}>
              <Text style={styles.registerLinkText}>New User? Register Now</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Bottom curved element */}
        <View style={styles.verticalLine} />
        <View style={styles.bottomCurve}>
          <View style={styles.plusIcon}>
            <Text style={styles.plusText}>+</Text>
          </View>
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
    position: 'relative',
  },
  curvedContainer: {
    position: 'relative',
    height: 280,
    marginBottom: 40,
  },
  accountText: {
    position: 'absolute',
    left: 20,
    top: 90,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    lineHeight: 30,
  },
  formContainer: {
    paddingHorizontal: 30,
    flex: 1,
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
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 40,
  },
  forgotPasswordText: {
    color: '#00BFA5',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 12,
    borderRadius: 25,
    right: -90,
    width: 150,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  imageStyle: {
    width: 350,
    height: 250,
    right: -90,
    resizeMode: 'contain',
    borderRadius: 75,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#00BFA5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomCurve: {
    position: 'absolute',
    bottom: 30,
    right: -40,
    width: 100,
    height: 100,
    backgroundColor: '#00BFA5',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  },
  plusIcon: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  verticalLine: {
    position: 'absolute',
    bottom: 0, 
    right: 0,
    width: 10,
    borderTopLeftRadius: 50,
    height: 810,
    backgroundColor: '#00BFA5',
  },
});