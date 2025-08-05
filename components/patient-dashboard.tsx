"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Heart, Pill, FileText, MessageSquare, CheckCircle, Bell } from "lucide-react"

export function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
              <p className="text-blue-100">{"Here's your health overview for today, August 01, 2025, 07:00 PM EEST"}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span>All systems healthy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>3 new notifications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Jan 20</div>
              <p className="text-xs text-muted-foreground">Dr. Sarah Wilson</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
              <Pill className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 active</div>
              <p className="text-xs text-muted-foreground">2 due soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
              <FileText className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Dec 15</div>
              <p className="text-xs text-muted-foreground">General Checkup</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">Excellent</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-6 h-6" />
                <span>Book Appointment</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-green-600 hover:bg-green-700">
                <FileText className="w-6 h-6" />
                <span>View Records</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-purple-600 hover:bg-purple-700">
                <Pill className="w-6 h-6" />
                <span>Prescriptions</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-orange-600 hover:bg-orange-700">
                <MessageSquare className="w-6 h-6" />
                <span>Messages</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
