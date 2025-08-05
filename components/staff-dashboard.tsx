"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Users,
  FileText,
  CheckCircle,
  Bell,
  Clock,
  Activity,
  Stethoscope,
  DollarSign,
  UserCheck,
  Pill,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

type StaffRole = "doctor" | "nurse" | "employer"

interface StaffDashboardProps {
  initialRole?: StaffRole
}

export function StaffDashboard({ initialRole = "doctor" }: StaffDashboardProps) {
  const [role, setRole] = useState<StaffRole>(initialRole)

  const getRoleConfig = (role: StaffRole) => {
    switch (role) {
      case "doctor":
        return {
          welcome: "Welcome back, Dr. Emily! 👩‍⚕️",
          cards: [
            {
              title: "Next Shift",
              value: "Aug 02",
              subtitle: "9:00 AM - 5:00 PM",
              icon: Clock,
              color: "text-blue-500",
            },
            {
              title: "Active Patients",
              value: "10 under care",
              subtitle: "3 new admissions",
              icon: Users,
              color: "text-green-500",
            },
            {
              title: "Last Update",
              value: "Jul 31",
              subtitle: "Patient Records Updated",
              icon: FileText,
              color: "text-purple-500",
            },
            {
              title: "Task Completion",
              value: "85%",
              subtitle: "On Track",
              icon: CheckCircle,
              color: "text-orange-500",
            },
          ],
          actions: [
            { label: "Manage Patients", icon: Users, color: "bg-blue-600 hover:bg-blue-700" },
            { label: "Schedule Shifts", icon: Calendar, color: "bg-green-600 hover:bg-green-700" },
            { label: "View Records", icon: FileText, color: "bg-purple-600 hover:bg-purple-700" },
            { label: "Clinical Support", icon: Activity, color: "bg-orange-600 hover:bg-orange-700" },
          ],
        }
      case "nurse":
        return {
          welcome: "Welcome back, Nurse Jane! 🩺",
          cards: [
            {
              title: "Next Shift",
              value: "Aug 02",
              subtitle: "7:00 AM - 3:00 PM",
              icon: Clock,
              color: "text-blue-500",
            },
            {
              title: "Patient Load",
              value: "8 assigned",
              subtitle: "2 new",
              icon: Users,
              color: "text-green-500",
            },
            {
              title: "Last Medication Admin",
              value: "Jul 31",
              subtitle: "6:00 PM",
              icon: Pill,
              color: "text-purple-500",
            },
            {
              title: "Duty Status",
              value: "90%",
              subtitle: "On Duty",
              icon: Stethoscope,
              color: "text-pink-500",
            },
          ],
          actions: [
            { label: "Monitor Patients", icon: Activity, color: "bg-blue-600 hover:bg-blue-700" },
            { label: "Update Records", icon: FileText, color: "bg-green-600 hover:bg-green-700" },
            { label: "Administer Meds", icon: Pill, color: "bg-purple-600 hover:bg-purple-700" },
            { label: "Report Issues", icon: AlertTriangle, color: "bg-red-600 hover:bg-red-700" },
          ],
        }
      case "employer":
        return {
          welcome: "Welcome back, Mr. Smith! 💼",
          cards: [
            {
              title: "Next Review",
              value: "Aug 05",
              subtitle: "Staff Evaluation",
              icon: Calendar,
              color: "text-blue-500",
            },
            {
              title: "Active Staff",
              value: "50 on duty",
              subtitle: "5 on leave",
              icon: UserCheck,
              color: "text-green-500",
            },
            {
              title: "Last Payroll",
              value: "Jul 31",
              subtitle: "Processed",
              icon: DollarSign,
              color: "text-purple-500",
            },
            {
              title: "Budget Status",
              value: "95%",
              subtitle: "On Track",
              icon: TrendingUp,
              color: "text-orange-500",
            },
          ],
          actions: [
            { label: "Review Staff", icon: UserCheck, color: "bg-blue-600 hover:bg-blue-700" },
            { label: "Manage Schedules", icon: Calendar, color: "bg-green-600 hover:bg-green-700" },
            { label: "Process Payroll", icon: DollarSign, color: "bg-purple-600 hover:bg-purple-700" },
            { label: "Budget Oversight", icon: TrendingUp, color: "bg-orange-600 hover:bg-orange-700" },
          ],
        }
    }
  }

  const config = getRoleConfig(role)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Role Selector */}
        <div className="mb-6">
          <Select value={role} onValueChange={(value: StaffRole) => setRole(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="doctor">Doctor</SelectItem>
              <SelectItem value="nurse">Nurse</SelectItem>
              <SelectItem value="employer">Employer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{config.welcome}</h1>
              <p className="text-green-100">{"Here's your overview for today, August 01, 2025, 07:00 PM EEST"}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span>All systems operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>5 new tasks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {config.cards.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {config.actions.map((action, index) => (
                <Button
                  key={index}
                  className={`h-20 flex flex-col items-center justify-center space-y-2 ${action.color}`}
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
