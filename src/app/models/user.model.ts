export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  username: string;
  email: string;
}