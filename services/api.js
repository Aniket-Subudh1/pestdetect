// services/api.js - CORRECTED VERSION
import AsyncStorage from '@react-native-async-storage/async-storage';

class APIService {
  constructor() {
    // FIXED: Properly define API URLs as array
    this.API_URLS = [
      'http://10.1.6.253:5000/api',     // Your actual IP from network debug
      'http://192.168.1.100:5000/api',   // Alternative IP
      'http://192.168.0.192:5000/api',   // Another alternative
      'http://localhost:5000/api'        // Fallback for emulator
    ];
    
    this.baseURL = null;
    this.token = null;
    this.isConnected = false;
  }

  // FIXED: Auto-detect working API URL
  async findWorkingAPI() {
    if (this.baseURL && this.isConnected) {
      return this.baseURL;
    }

    console.log('🔍 Testing API connections...');
    
    // FIXED: Iterate over the URLs array properly
    for (let i = 0; i < this.API_URLS.length; i++) {
      const apiUrl = this.API_URLS[i];
      try {
        console.log(`Testing: ${apiUrl}`);
        
        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Connection timeout')), 5000)
        );
        
        const fetchPromise = fetch(`${apiUrl}/health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (response.ok) {
          console.log(`✅ Connected to: ${apiUrl}`);
          this.baseURL = apiUrl;
          this.isConnected = true;
          return apiUrl;
        } else {
          console.log(`❌ Failed: ${apiUrl} - HTTP ${response.status}`);
        }
      } catch (error) {
        console.log(`❌ Failed: ${apiUrl} - ${error.message}`);
      }
    }
    
    // If no URL works, use the first one and let the error be handled later
    console.log('⚠️ No working API found, using first URL as fallback');
    this.baseURL = this.API_URLS[0];
    return this.baseURL;
  }

  async getToken() {
    if (!this.token) {
      this.token = await AsyncStorage.getItem('authToken');
    }
    return this.token;
  }

  async setToken(token) {
    this.token = token;
    await AsyncStorage.setItem('authToken', token);
  }

  async clearToken() {
    this.token = null;
    await AsyncStorage.removeItem('authToken');
  }

  async makeRequest(endpoint, options = {}) {
    // Ensure we have a working API URL
    await this.findWorkingAPI();
    
    const url = `${this.baseURL}${endpoint}`;
    const token = await this.getToken();

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (token && !options.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      console.log(`📡 Making ${config.method} request to:`, url);
      if (config.body) {
        console.log('📦 Request body:', JSON.parse(config.body));
      }

      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 30000)
      );

      const fetchPromise = fetch(url, config);
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        data = { message: textResponse };
      }

      console.log('📨 Response:', {
        status: response.status,
        success: data.success,
        message: data.message
      });

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      this.isConnected = true;
      return data;
    } catch (error) {
      console.error(`❌ API Error for ${endpoint}:`, error);
      
      // If network error, try to reconnect next time
      if (error.message.includes('Network request failed') || error.message.includes('timeout')) {
        this.isConnected = false;
      }
      
      throw error;
    }
  }

  async makeFormRequest(endpoint, formData, options = {}) {
    // Ensure we have a working API URL
    await this.findWorkingAPI();
    
    const url = `${this.baseURL}${endpoint}`;
    const token = await this.getToken();

    const config = {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData in React Native
        ...options.headers,
      },
      body: formData,
      ...options,
    };

    if (token && !options.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log(`📤 Making form request to:`, url);
      console.log('📋 FormData entries:');
      for (let [key, value] of formData.entries()) {
        if (typeof value === 'object' && value.uri) {
          console.log(`  ${key}:`, {
            name: value.name,
            type: value.type,
            uri: value.uri.substring(0, 50) + '...'
          });
        } else {
          console.log(`  ${key}:`, value);
        }
      }
      
      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Upload timeout')), 60000)
      );

      const fetchPromise = fetch(url, config);
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textData = await response.text();
        console.log('📄 Non-JSON response:', textData.substring(0, 200));
        data = { message: textData };
      }

      console.log('📨 Form Response:', {
        status: response.status,
        success: data.success,
        message: data.message
      });

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      this.isConnected = true;
      return data;
    } catch (error) {
      console.error(`❌ API Form Error for ${endpoint}:`, error);
      
      if (error.message.includes('Network request failed') || error.message.includes('timeout')) {
        this.isConnected = false;
      }
      
      throw error;
    }
  }
}

const apiService = new APIService();

// Authentication API
export const authAPI = {
  async register(userData) {
    return await apiService.makeRequest('/auth/register', {
      method: 'POST',
      body: userData,
      skipAuth: true,
    });
  },

  async verifyEmail(email, otp) {
    return await apiService.makeRequest('/auth/verify-email', {
      method: 'POST',
      body: { email, otp },
      skipAuth: true,
    });
  },

  async resendVerification(email) {
    return await apiService.makeRequest('/auth/resend-verification', {
      method: 'POST',
      body: { email },
      skipAuth: true,
    });
  },

  async login(email, password) {
    const response = await apiService.makeRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
      skipAuth: true,
    });

    if (response.success && response.token) {
      await apiService.setToken(response.token);
    }

    return response;
  },

  async forgotPassword(email) {
    return await apiService.makeRequest('/auth/forgot-password', {
      method: 'POST',
      body: { email },
      skipAuth: true,
    });
  },

  async resetPassword(email, otp, newPassword) {
    const response = await apiService.makeRequest('/auth/reset-password', {
      method: 'POST',
      body: { email, otp, newPassword },
      skipAuth: true,
    });

    if (response.success && response.token) {
      await apiService.setToken(response.token);
    }

    return response;
  },

  async getProfile() {
    return await apiService.makeRequest('/auth/me');
  },

  async updateProfile(userData) {
    return await apiService.makeRequest('/auth/profile', {
      method: 'PUT',
      body: userData,
    });
  },

  async changePassword(currentPassword, newPassword) {
    return await apiService.makeRequest('/auth/change-password', {
      method: 'PUT',
      body: { currentPassword, newPassword },
    });
  },

  async logout() {
    await apiService.clearToken();
    return { success: true };
  },

  async isAuthenticated() {
    const token = await apiService.getToken();
    if (!token) return false;

    try {
      const response = await apiService.makeRequest('/auth/me');
      return response.success;
    } catch (error) {
      await apiService.clearToken();
      return false;
    }
  },
};

// Detection API
export const detectionAPI = {
  async detectDisease(imageFile) {
    console.log('🔬 Starting disease detection...');
    console.log('📷 Image details:', {
      uri: imageFile.uri ? imageFile.uri.substring(0, 50) + '...' : 'No URI',
      type: imageFile.type,
      fileName: imageFile.fileName
    });
    
    const formData = new FormData();
    
    const fileObject = {
      uri: imageFile.uri,
      type: imageFile.type || 'image/jpeg',
      name: imageFile.fileName || `disease_${Date.now()}.jpg`,
    };

    formData.append('plantImage', fileObject);

    console.log('✅ FormData created for disease detection');
    
    try {
      const result = await apiService.makeFormRequest('/detection/disease', formData);
      console.log('🎉 Disease detection successful');
      return result;
    } catch (error) {
      console.error('💥 Disease detection failed:', error);
      throw error;
    }
  },

  async detectPest(imageFile) {
    console.log('🐛 Starting pest detection...');
    console.log('📷 Image details:', {
      uri: imageFile.uri ? imageFile.uri.substring(0, 50) + '...' : 'No URI',
      type: imageFile.type,
      fileName: imageFile.fileName
    });
    
    const formData = new FormData();
    
    const fileObject = {
      uri: imageFile.uri,
      type: imageFile.type || 'image/jpeg',
      name: imageFile.fileName || `pest_${Date.now()}.jpg`,
    };

    formData.append('plantImage', fileObject);

    console.log('✅ FormData created for pest detection');
    
    try {
      const result = await apiService.makeFormRequest('/detection/pest', formData);
      console.log('🎉 Pest detection successful');
      return result;
    } catch (error) {
      console.error('💥 Pest detection failed:', error);
      throw error;
    }
  },

  async getHistory(page = 1, limit = 10) {
    return await apiService.makeRequest(`/detection/history?page=${page}&limit=${limit}`);
  },

  async getDetection(id) {
    return await apiService.makeRequest(`/detection/${id}`);
  },

  async deleteDetection(id) {
    return await apiService.makeRequest(`/detection/${id}`, {
      method: 'DELETE',
    });
  },

  async getStats() {
    return await apiService.makeRequest('/detection/stats');
  },
};

export default apiService;