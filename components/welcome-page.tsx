"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, FileText, Activity, UserCheck, Clock, Shield } from "lucide-react"

interface WelcomePageProps {
  onSelectPortal: (type: "patient" | "staff") => void
}

export function WelcomePage({ onSelectPortal }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
          <span className="text-3xl font-bold text-gray-800">MediCare</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Welcome to MediCare</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted healthcare platform providing comprehensive medical services, cutting-edge technology, and
            compassionate patient care. Experience the future of healthcare management.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">50,000+</div>
            <div className="text-gray-600">Patients Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">200+</div>
            <div className="text-gray-600">Medical Specialists</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">15+</div>
            <div className="text-gray-600">Departments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">99.9%</div>
            <div className="text-gray-600">Uptime Guarantee</div>
          </div>
        </div>

        {/* Portal Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Patient Portal */}
          <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Patient Portal</h3>
                <p className="text-gray-600">Access your health information and manage appointments</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Online Appointments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Digital Medical Records</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Prescription Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Lab Results</span>
                </div>
              </div>

              <Button onClick={() => onSelectPortal("patient")} className="w-full bg-blue-600 hover:bg-blue-700">
                Continue as Patient
              </Button>
            </CardContent>
          </Card>

          {/* Staff Portal */}
          <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Staff Portal</h3>
                <p className="text-gray-600">Manage patients, schedules, and clinical operations</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Patient Management System</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Schedule & Shift Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Medical Records Access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Clinical Decision Support</span>
                </div>
              </div>

              <Button onClick={() => onSelectPortal("staff")} className="w-full bg-green-600 hover:bg-green-700">
                Staff Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
