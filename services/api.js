import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE_URL = 'http://192.168.133.105:5000/api'


class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
  }

  // Set authentication token
  async setToken(token) {
    this.token = token;
    if (token) {
      await AsyncStorage.setItem('userToken', token);
    } else {
      await AsyncStorage.removeItem('userToken');
    }
  }

  // Get authentication token
  async getToken() {
    if (!this.token) {
      this.token = await AsyncStorage.getItem('userToken');
    }
    return this.token;
  }

  // Check if user is logged in
  async isLoggedIn() {
    const token = await this.getToken();
    return !!token;
  }

  // Make HTTP request
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = await this.getToken();

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    // Handle FormData (for file uploads)
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    } else if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      console.log(`API Request: ${config.method} ${url}`);
      const response = await fetch(url, config);
      const data = await response.json();

      console.log(`API Response: ${response.status}`, data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  // POST request
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: data,
    });
  }

  // PUT request
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: data,
    });
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  // Upload file
  async uploadFile(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('plantImage', {
      uri: file.uri,
      type: file.type || 'image/jpeg',
      name: file.fileName || `plant_image_${Date.now()}.jpg`,
    });

    // Add additional data
    Object.keys(additionalData).forEach(key => {
      if (typeof additionalData[key] === 'object') {
        formData.append(key, JSON.stringify(additionalData[key]));
      } else {
        formData.append(key, additionalData[key]);
      }
    });

    return this.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

// Create API instance
const apiService = new ApiService();

// Auth API methods
export const authAPI = {
  // Register user
  register: async (userData) => {
    return apiService.post('/auth/register', userData);
  },

  // Verify email with OTP
  verifyEmail: async (email, otp) => {
    return apiService.post('/auth/verify-email', { email, otp });
  },

  // Resend verification email
  resendVerification: async (email) => {
    return apiService.post('/auth/resend-verification', { email });
  },

  // Login user
  login: async (email, password) => {
    const response = await apiService.post('/auth/login', { email, password });
    if (response.success && response.token) {
      await apiService.setToken(response.token);
    }
    return response;
  },

  // Forgot password
  forgotPassword: async (email) => {
    return apiService.post('/auth/forgot-password', { email });
  },

  // Reset password with OTP
  resetPassword: async (email, otp, newPassword) => {
    return apiService.post('/auth/reset-password', { email, otp, newPassword });
  },

  // Get user profile
  getProfile: async () => {
    return apiService.get('/auth/me');
  },

  // Update profile
  updateProfile: async (userData) => {
    return apiService.put('/auth/profile', userData);
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    return apiService.put('/auth/change-password', { currentPassword, newPassword });
  },

  // Logout
  logout: async () => {
    await apiService.setToken(null);
  },

  // Check authentication status
  isAuthenticated: async () => {
    return apiService.isLoggedIn();
  },
};

// Detection API methods
export const detectionAPI = {
  // Detect plant disease
  detectDisease: async (imageFile, location = null) => {
    const additionalData = {};
    if (location) {
      additionalData.location = location;
    }
    return apiService.uploadFile('/detection/disease', imageFile, additionalData);
  },

  // Detect plant pest
  detectPest: async (imageFile, location = null) => {
    const additionalData = {};
    if (location) {
      additionalData.location = location;
    }
    return apiService.uploadFile('/detection/pest', imageFile, additionalData);
  },

  // Get detection history
  getHistory: async (page = 1, limit = 10) => {
    return apiService.get(`/detection/history?page=${page}&limit=${limit}`);
  },

  // Get single detection
  getDetection: async (detectionId) => {
    return apiService.get(`/detection/${detectionId}`);
  },

  // Delete detection
  deleteDetection: async (detectionId) => {
    return apiService.delete(`/detection/${detectionId}`);
  },

  // Get detection statistics
  getStats: async () => {
    return apiService.get('/detection/stats');
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    return apiService.get('/health');
  },
};

export default apiService;