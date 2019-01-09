export interface User {
  email: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}
