"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { ResetPasswordForm } from "./reset-password-form"
import { authService } from "../../lib/auth"
import type { User } from "../../types/auth"

interface AuthWrapperProps {
  onAuthenticated: (user: User) => void
}

type AuthView = "login" | "register" | "reset"

export function AuthWrapper({ onAuthenticated }: AuthWrapperProps) {
  const [currentView, setCurrentView] = useState<AuthView>("login")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const user = authService.getCurrentUser()
    if (user) {
      onAuthenticated(user)
    } else {
      setIsLoading(false)
    }
  }, [onAuthenticated])

  const handleAuthSuccess = (user: User) => {
    onAuthenticated(user)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">MediCore</h2>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  switch (currentView) {
    case "login":
      return (
        <LoginForm
          onSuccess={handleAuthSuccess}
          onSwitchToRegister={() => setCurrentView("register")}
          onSwitchToReset={() => setCurrentView("reset")}
        />
      )
    case "register":
      return <RegisterForm onSuccess={handleAuthSuccess} onSwitchToLogin={() => setCurrentView("login")} />
    case "reset":
      return <ResetPasswordForm onSwitchToLogin={() => setCurrentView("login")} />
    default:
      return null
  }
}
