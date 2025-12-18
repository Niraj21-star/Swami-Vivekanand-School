/**
 * Authentication Service
 * Handles user authentication, login, logout, and session management
 * Currently uses mock data - replace with real API calls in production
 */

const USE_MOCK = true; // Set to false when connecting to real backend

// Mock user database
const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    email: 'admin@school.com',
    phone: '+1234567890',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff'
  },
  {
    id: 2,
    username: 'teacher',
    password: 'teacher123',
    role: 'teacher',
    name: 'John Smith',
    email: 'john.smith@school.com',
    phone: '+1234567891',
    subject: 'Mathematics',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=10b981&color=fff'
  },
  {
    id: 3,
    username: 'principal',
    password: 'principal123',
    role: 'principal',
    name: 'Dr. Margaret Thompson',
    email: 'principal@school.com',
    phone: '+1234567892',
    designation: 'Principal',
    avatar: 'https://ui-avatars.com/api/?name=Margaret+Thompson&background=8b5cf6&color=fff'
  },
  {
    id: 4,
    username: 'clerk',
    password: 'clerk123',
    role: 'clerk',
    name: 'Michael Brown',
    email: 'clerk@school.com',
    phone: '+1234567893',
    designation: 'Office Clerk',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=f59e0b&color=fff'
  }
];

/**
 * Login function - authenticates user
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<Object>} User object with token
 */
export const login = async (username, password) => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Don't return password to frontend
    const { password: _, ...userWithoutPassword } = user;
    
    const token = `mock_token_${user.id}_${Date.now()}`;
    
    return {
      user: userWithoutPassword,
      token
    };
  } else {
    // Real API call
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return await response.json();
  }
};

/**
 * Logout function - clears session
 * @returns {Promise<void>}
 */
export const logout = async () => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return;
  } else {
    // Real API call
    const token = localStorage.getItem('token');
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};

/**
 * Validate token and get current user
 * @param {string} token 
 * @returns {Promise<Object>} User object
 */
export const validateToken = async (token) => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Extract user ID from mock token
    const match = token.match(/mock_token_(\d+)_/);
    if (!match) {
      throw new Error('Invalid token');
    }

    const userId = parseInt(match[1]);
    const user = MOCK_USERS.find(u => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } else {
    // Real API call
    const response = await fetch('/api/auth/validate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Invalid token');
    }

    return await response.json();
  }
};

/**
 * Change password
 * @param {string} oldPassword 
 * @param {string} newPassword 
 * @returns {Promise<void>}
 */
export const changePassword = async (oldPassword, newPassword) => {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 500));
    // In mock mode, just succeed
    return { message: 'Password changed successfully' };
  } else {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ oldPassword, newPassword })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Password change failed');
    }

    return await response.json();
  }
};

/**
 * Get mock users for testing (only available in development)
 */
export const getMockUsers = () => {
  if (process.env.NODE_ENV === 'development') {
    return MOCK_USERS.map(({ password, ...user }) => user);
  }
  return [];
};
