"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, User, MapPin } from "lucide-react"
import { mockAppointments, doctors, formatTime } from "../lib/appointment-data"
import type { Appointment } from "../types/appointment"

interface AppointmentCalendarProps {
  userType: "patient" | "staff"
  userId?: string
}

export function AppointmentCalendar({ userType, userId }: AppointmentCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all")

  // Filter appointments based on user type and selected filters
  const filteredAppointments = mockAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date)
    const isDateMatch = appointmentDate.toDateString() === selectedDate.toDateString()

    if (userType === "patient") {
      return appointment.patientId === userId || appointment.patientName === "John Patient"
    }

    if (selectedDoctor !== "all") {
      return appointment.doctorId === selectedDoctor && (viewMode === "day" ? isDateMatch : true)
    }

    return viewMode === "day" ? isDateMatch : true
  })

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "no-show":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: Appointment["type"]) => {
    switch (type) {
      case "consultation":
        return "bg-blue-500"
      case "follow-up":
        return "bg-green-500"
      case "emergency":
        return "bg-red-500"
      case "surgery":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const appointmentsForSelectedDate = mockAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date)
    return appointmentDate.toDateString() === selectedDate.toDateString()
  })

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Appointment Calendar</h1>

        <div className="flex items-center space-x-4">
          {/* View Mode Selector */}
          <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>

          {/* Doctor Filter (for staff) */}
          {userType === "staff" && (
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5" />
              <span>Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              modifiers={{
                hasAppointment: mockAppointments.map((apt) => new Date(apt.date)),
              }}
              modifiersStyles={{
                hasAppointment: {
                  backgroundColor: "#dbeafe",
                  color: "#1e40af",
                  fontWeight: "bold",
                },
              }}
            />

            {/* Legend */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-blue-200 rounded"></div>
                <span>Has appointments</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>
                  Appointments for{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <Badge variant="secondary">{appointmentsForSelectedDate.length} appointments</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appointmentsForSelectedDate.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No appointments scheduled for this date</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointmentsForSelectedDate
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => (
                    <Card
                      key={appointment.id}
                      className="border-l-4"
                      style={{ borderLeftColor: getTypeColor(appointment.type).replace("bg-", "#") }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                              <Badge variant="outline" className="capitalize">
                                {appointment.type}
                              </Badge>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <span className="font-semibold">{formatTime(appointment.time)}</span>
                                  <span className="text-gray-500">({appointment.duration} min)</span>
                                </div>

                                <div className="flex items-center space-x-2 mb-1">
                                  <User className="w-4 h-4 text-gray-500" />
                                  <span>
                                    {userType === "patient" ? appointment.doctorName : appointment.patientName}
                                  </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4 text-gray-500" />
                                  <span>{appointment.department}</span>
                                </div>
                              </div>

                              <div>
                                {appointment.symptoms && (
                                  <div className="mb-2">
                                    <p className="text-sm font-medium text-gray-700">Symptoms:</p>
                                    <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                                  </div>
                                )}

                                {appointment.notes && (
                                  <div>
                                    <p className="text-sm font-medium text-gray-700">Notes:</p>
                                    <p className="text-sm text-gray-600">{appointment.notes}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            {appointment.status === "scheduled" && (
                              <>
                                <Button size="sm" variant="outline">
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700 bg-transparent"
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {appointment.status === "confirmed" && userType === "staff" && (
                              <Button size="sm">Mark Complete</Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {filteredAppointments.filter((apt) => apt.status === "scheduled").length}
            </div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredAppointments.filter((apt) => apt.status === "confirmed").length}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">
              {filteredAppointments.filter((apt) => apt.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {filteredAppointments.filter((apt) => apt.status === "cancelled").length}
            </div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
