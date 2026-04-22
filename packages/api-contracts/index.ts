// Shared interface for User data
export interface UserResponse {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created: string;
}

// Shared interface for API error responses
export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

// Shared interface for creating a new user
export interface CreateUserDto {
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

// Shared interface for success responses
export interface ActionResponse {
  success: boolean;
  message: string;
  id?: string;
}

// Shared interface for authentication request
export interface LoginDto {
  email: string;
  password: string;
}

// Shared interface for success auth responses
export interface AuthResponse {
  access_token: string;
  user: {
    email: string;
    role: string;
  };
}