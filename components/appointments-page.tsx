"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, List } from "lucide-react"
import { AppointmentBooking } from "./appointment-booking"
import { AppointmentCalendar } from "./appointment-calendar"
import type { AppointmentFormData } from "../types/appointment"

interface AppointmentsPageProps {
  userType: "patient" | "staff"
  userId?: string
}

export function AppointmentsPage({ userType, userId }: AppointmentsPageProps) {
  const [showBooking, setShowBooking] = useState(false)
  const [activeTab, setActiveTab] = useState("calendar")

  const handleBookAppointment = (appointmentData: AppointmentFormData) => {
    // In a real app, this would make an API call
    console.log("Booking appointment:", appointmentData)

    // Show success message (you could use a toast here)
    alert("Appointment booked successfully!")

    // Close booking form
    setShowBooking(false)
  }

  if (showBooking) {
    return <AppointmentBooking onBook={handleBookAppointment} onCancel={() => setShowBooking(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600">
              {userType === "patient"
                ? "Manage your medical appointments and schedule new ones"
                : "View and manage patient appointments"}
            </p>
          </div>

          {userType === "patient" && (
            <Button onClick={() => setShowBooking(true)} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Book Appointment</span>
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Calendar View</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <List className="w-4 h-4" />
              <span>List View</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <AppointmentCalendar userType={userType} userId={userId} />
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <div className="text-center py-12">
              <List className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">List View Coming Soon</h3>
              <p className="text-gray-600">The list view for appointments is currently under development.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
