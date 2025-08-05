import type { User, LoginCredentials, RegisterData } from "../types/auth"

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    email: "john.patient@email.com",
    firstName: "John",
    lastName: "Patient",
    role: "patient",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    permissions: [
      { id: "1", name: "View Own Records", resource: "medical-records", action: "read" },
      { id: "2", name: "Book Appointments", resource: "appointments", action: "create" },
    ],
  },
  {
    id: "2",
    email: "dr.wilson@medicore.com",
    firstName: "Sarah",
    lastName: "Wilson",
    role: "doctor",
    department: "Cardiology",
    specialization: "Interventional Cardiologist",
    licenseNumber: "MD123456",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    permissions: [
      { id: "3", name: "Manage Patients", resource: "patients", action: "all" },
      { id: "4", name: "Manage Appointments", resource: "appointments", action: "all" },
      { id: "5", name: "Access Medical Records", resource: "medical-records", action: "all" },
    ],
  },
  {
    id: "3",
    email: "nurse.jane@medicore.com",
    firstName: "Jane",
    lastName: "Smith",
    role: "nurse",
    department: "Emergency",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    permissions: [
      { id: "6", name: "View Patients", resource: "patients", action: "read" },
      { id: "7", name: "Update Patient Records", resource: "medical-records", action: "update" },
    ],
  },
  {
    id: "4",
    email: "admin@medicore.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    permissions: [{ id: "8", name: "System Admin", resource: "*", action: "all" }],
  },
]

class AuthService {
  private static instance: AuthService
  private currentUser: User | null = null

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === credentials.email)

    if (!user) {
      throw new Error("Invalid email or password")
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated. Please contact administrator.")
    }

    // In real app, verify password hash
    // For demo, accept any password

    this.currentUser = {
      ...user,
      lastLogin: new Date().toISOString(),
    }

    // Generate mock JWT token
    const token = btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 24 * 60 * 60 * 1000 }))

    if (credentials.rememberMe) {
      localStorage.setItem("medicore_token", token)
      localStorage.setItem("medicore_user", JSON.stringify(this.currentUser))
    } else {
      sessionStorage.setItem("medicore_token", token)
      sessionStorage.setItem("medicore_user", JSON.stringify(this.currentUser))
    }

    return { user: this.currentUser, token }
  }

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if email already exists
    if (mockUsers.find((u) => u.email === data.email)) {
      throw new Error("Email already registered")
    }

    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match")
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      department: data.department,
      specialization: data.specialization,
      licenseNumber: data.licenseNumber,
      isActive: true,
      createdAt: new Date().toISOString(),
      permissions: this.getDefaultPermissions(data.role),
    }

    mockUsers.push(newUser)
    this.currentUser = newUser

    const token = btoa(JSON.stringify({ userId: newUser.id, exp: Date.now() + 24 * 60 * 60 * 1000 }))

    sessionStorage.setItem("medicore_token", token)
    sessionStorage.setItem("medicore_user", JSON.stringify(newUser))

    return { user: newUser, token }
  }

  async logout(): Promise<void> {
    this.currentUser = null
    localStorage.removeItem("medicore_token")
    localStorage.removeItem("medicore_user")
    sessionStorage.removeItem("medicore_token")
    sessionStorage.removeItem("medicore_user")
  }

  async resetPassword(email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === email)
    if (!user) {
      throw new Error("Email not found")
    }

    // In real app, send reset email
    console.log(`Password reset email sent to ${email}`)
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser

    // Try to restore from storage
    const token = localStorage.getItem("medicore_token") || sessionStorage.getItem("medicore_token")
    const userStr = localStorage.getItem("medicore_user") || sessionStorage.getItem("medicore_user")

    if (token && userStr) {
      try {
        const tokenData = JSON.parse(atob(token))
        if (tokenData.exp > Date.now()) {
          this.currentUser = JSON.parse(userStr)
          return this.currentUser
        }
      } catch (e) {
        // Invalid token, clear storage
        this.logout()
      }
    }

    return null
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  hasPermission(resource: string, action: string): boolean {
    const user = this.getCurrentUser()
    if (!user) return false

    return user.permissions.some(
      (p) => (p.resource === "*" || p.resource === resource) && (p.action === "all" || p.action === action),
    )
  }

  private getDefaultPermissions(role: string) {
    switch (role) {
      case "patient":
        return [
          { id: "1", name: "View Own Records", resource: "medical-records", action: "read" as const },
          { id: "2", name: "Book Appointments", resource: "appointments", action: "create" as const },
        ]
      case "doctor":
        return [
          { id: "3", name: "Manage Patients", resource: "patients", action: "all" as const },
          { id: "4", name: "Manage Appointments", resource: "appointments", action: "all" as const },
          { id: "5", name: "Access Medical Records", resource: "medical-records", action: "all" as const },
        ]
      case "nurse":
        return [
          { id: "6", name: "View Patients", resource: "patients", action: "read" as const },
          { id: "7", name: "Update Patient Records", resource: "medical-records", action: "update" as const },
        ]
      case "admin":
        return [{ id: "8", name: "System Admin", resource: "*", action: "all" as const }]
      default:
        return []
    }
  }
}

export const authService = AuthService.getInstance()
