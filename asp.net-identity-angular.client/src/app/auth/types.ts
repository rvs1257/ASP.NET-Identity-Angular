export interface RegisterRequest {
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
export interface ManageInfoResponse {
  email: string;
  isEmailConfirmed: Boolean;
}
