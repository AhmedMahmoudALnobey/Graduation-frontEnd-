export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "patient" | "doctor" | "nurse" | "admin" | "employer"
  department?: string
  specialization?: string
  licenseNumber?: string
  avatar?: string
  isActive: boolean
  lastLogin?: string
  createdAt: string
  permissions: Permission[]
}

export interface Permission {
  id: string
  name: string
  resource: string
  action: "create" | "read" | "update" | "delete" | "all"
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role: "patient" | "doctor" | "nurse" | "admin"
  department?: string
  specialization?: string
  licenseNumber?: string
  phoneNumber: string
  dateOfBirth?: string
}

export interface ResetPasswordData {
  email: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
