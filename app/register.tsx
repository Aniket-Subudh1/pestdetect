import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header section */}
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
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
              placeholder=""
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder=""
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              value={mobile}
              onChangeText={setMobile}
              placeholder=""
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder=""
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>REGISTER</Text>
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
  peopleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 60,
    width: 120,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  peopleEmoji: {
    fontSize: 40,
  },
  formContainer: {
    flex: 1,
    width:350,
    right:-20,
    justifyContent:'center',
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
    width:180,
    right:-50,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 200,
    height: 200,
    right :0,
    top: -60,
    resizeMode: 'contain',
    borderRadius: 75,
  },
  verticalLine: {
  position: 'absolute',
  bottom: -10, 
  left: -80,
  width: 100,
  borderRadius:50,
  height: 100,
  backgroundColor: '#FFFFFF',
},
});