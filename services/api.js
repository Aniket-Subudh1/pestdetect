// services/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Update this with your actual server IP
const API_BASE_URL = 'http://192.168.0.192:5000/api'; 

class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
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
      console.log(`Making ${config.method} request to:`, url);
      if (config.body) {
        console.log('Request body:', JSON.parse(config.body));
      }

      const response = await fetch(url, config);
      
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        data = { message: textResponse };
      }

      console.log('Response:', data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Form data request for file uploads
  async makeFormRequest(endpoint, formData, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = await this.getToken();

    const config = {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData, let the browser set it
        ...options.headers,
      },
      body: formData,
      ...options,
    };

    if (token && !options.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log(`Making form request to:`, url);
      const response = await fetch(url, config);
      
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Form Error for ${endpoint}:`, error);
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
    return await apiService.makeRequest('/auth/reset-password', {
      method: 'POST',
      body: { email, otp, newPassword },
      skipAuth: true,
    });
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
    const formData = new FormData();
    formData.append('plantImage', {
      uri: imageFile.uri,
      type: imageFile.type,
      name: imageFile.fileName || 'disease_image.jpg',
    });

    return await apiService.makeFormRequest('/detection/disease', formData);
  },

  async detectPest(imageFile) {
    const formData = new FormData();
    formData.append('plantImage', {
      uri: imageFile.uri,
      type: imageFile.type,
      name: imageFile.fileName || 'pest_image.jpg',
    });

    return await apiService.makeFormRequest('/detection/pest', formData);
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