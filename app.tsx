"use client"

import { useState, useEffect } from "react"
import { AuthWrapper } from "./components/auth/auth-wrapper"
import { Header } from "./components/header"
import { WelcomePage } from "./components/welcome-page"
import { PatientDashboard } from "./components/patient-dashboard"
import { StaffDashboard } from "./components/staff-dashboard"
import { AppointmentsPage } from "./components/appointments-page"
import { TelemedicinePage } from "./components/telemedicine-page"
import { MedicalRecords } from "./components/medical-records"
import { Departments } from "./components/departments"
import { Settings } from "./components/settings"
import { authService } from "./lib/auth"
import type { User } from "./types/auth"

type CurrentPage =
  | "welcome"
  | "dashboard"
  | "appointments"
  | "telemedicine"
  | "medical-records"
  | "departments"
  | "settings"

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState<CurrentPage>("welcome")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status on app load
    const user = authService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setIsAuthenticated(true)
      setCurrentPage("dashboard")
    }
  }, [])

  const handleAuthenticated = (user: User) => {
    setCurrentUser(user)
    setIsAuthenticated(true)
    setCurrentPage("dashboard")
  }

  const handleLogout = async () => {
    await authService.logout()
    setCurrentUser(null)
    setIsAuthenticated(false)
    setCurrentPage("welcome")
  }

  const handleNavigation = (page: string) => {
    switch (page) {
      case "welcome":
        setCurrentPage("welcome")
        break
      case "dashboard":
        setCurrentPage("dashboard")
        break
      case "appointments":
        setCurrentPage("appointments")
        break
      case "telemedicine":
        setCurrentPage("telemedicine")
        break
      case "medical-records":
        setCurrentPage("medical-records")
        break
      case "departments":
        setCurrentPage("departments")
        break
      case "settings":
        setCurrentPage("settings")
        break
      case "logout":
        handleLogout()
        break
      default:
        setCurrentPage("dashboard")
    }
  }

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard")
  }

  const handlePortalSelection = (type: "patient" | "staff") => {
    // This is now handled by authentication
    setCurrentPage("dashboard")
  }

  // Show authentication if not logged in
  if (!isAuthenticated || !currentUser) {
    return <AuthWrapper onAuthenticated={handleAuthenticated} />
  }

  const renderContent = () => {
    const commonHeaderProps = {
      userType: currentUser.role === "patient" ? ("patient" as const) : ("staff" as const),
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      userRole: currentUser.role !== "patient" ? currentUser.role : undefined,
      onNavigate: handleNavigation,
    }

    switch (currentPage) {
      case "welcome":
        return <WelcomePage onSelectPortal={handlePortalSelection} />

      case "dashboard":
        return (
          <>
            <Header {...commonHeaderProps} />
            {currentUser.role === "patient" ? (
              <PatientDashboard />
            ) : (
              <StaffDashboard initialRole={currentUser.role as any} />
            )}
          </>
        )

      case "appointments":
        return (
          <>
            <Header {...commonHeaderProps} />
            <AppointmentsPage userType={currentUser.role === "patient" ? "patient" : "staff"} userId={currentUser.id} />
          </>
        )

      case "telemedicine":
        return (
          <TelemedicinePage
            userType={currentUser.role === "patient" ? "patient" : "staff"}
            userId={currentUser.id}
            onBack={handleBackToDashboard}
          />
        )

      case "medical-records":
        return (
          <>
            <Header {...commonHeaderProps} />
            <MedicalRecords
              userType={currentUser.role === "patient" ? "patient" : "staff"}
              userId={currentUser.id}
              onBack={handleBackToDashboard}
            />
          </>
        )

      case "departments":
        return (
          <>
            <Header {...commonHeaderProps} />
            <Departments
              userType={currentUser.role === "patient" ? "patient" : "staff"}
              onBack={handleBackToDashboard}
              onBookAppointment={(departmentId) => {
                console.log("Booking appointment for department:", departmentId)
                setCurrentPage("appointments")
              }}
            />
          </>
        )

      case "settings":
        return (
          <>
            <Header {...commonHeaderProps} />
            <Settings userType={currentUser.role === "patient" ? "patient" : "staff"} onBack={handleBackToDashboard} />
          </>
        )

      default:
        return (
          <>
            <Header {...commonHeaderProps} />
            {currentUser.role === "patient" ? (
              <PatientDashboard />
            ) : (
              <StaffDashboard initialRole={currentUser.role as any} />
            )}
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}

      {/* Navigation Helper (for demo purposes) */}
      {currentPage === "dashboard" && (
        <div className="fixed bottom-6 right-6 space-y-2">
          <div className="bg-white rounded-lg shadow-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {currentUser.firstName[0]}
                  {currentUser.lastName[0]}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
              </div>
            </div>
            <div className="border-t pt-2 space-y-1">
              <button
                onClick={() => setCurrentPage("appointments")}
                className="block w-full text-left px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                📅 Appointments
              </button>
              <button
                onClick={() => setCurrentPage("telemedicine")}
                className="block w-full text-left px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                🎥 Telemedicine
              </button>
              <button
                onClick={() => setCurrentPage("medical-records")}
                className="block w-full text-left px-3 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                📋 Medical Records
              </button>
              <button
                onClick={() => setCurrentPage("departments")}
                className="block w-full text-left px-3 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                🏥 Departments
              </button>
              <button
                onClick={() => setCurrentPage("settings")}
                className="block w-full text-left px-3 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ⚙️ Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back Button for non-dashboard pages */}
      {currentPage !== "dashboard" && currentPage !== "telemedicine" && currentPage !== "welcome" && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleBackToDashboard}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      )}
    </div>
  )
}
