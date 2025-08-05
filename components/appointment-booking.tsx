"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, User, Stethoscope, FileText } from "lucide-react"
import { departments, doctors, generateTimeSlots, formatTime } from "../lib/appointment-data"
import type { AppointmentFormData, TimeSlot } from "../types/appointment"

interface AppointmentBookingProps {
  onBook: (appointment: AppointmentFormData) => void
  onCancel: () => void
}

export function AppointmentBooking({ onBook, onCancel }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState<"consultation" | "follow-up" | "emergency">("consultation")
  const [symptoms, setSymptoms] = useState("")
  const [notes, setNotes] = useState("")
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])

  const filteredDoctors = selectedDepartment ? doctors.filter((doctor) => doctor.department === selectedDepartment) : []

  const handleDepartmentChange = (departmentName: string) => {
    setSelectedDepartment(departmentName)
    setSelectedDoctor("")
    setSelectedTime("")
    setTimeSlots([])
  }

  const handleDoctorChange = (doctorId: string) => {
    setSelectedDoctor(doctorId)
    setSelectedTime("")
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0]
      setTimeSlots(generateTimeSlots(dateStr, doctorId))
    }
  }

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime("")
    if (date && selectedDoctor) {
      const dateStr = date.toISOString().split("T")[0]
      setTimeSlots(generateTimeSlots(dateStr, selectedDoctor))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedDoctor || !selectedTime || !selectedDepartment) {
      return
    }

    const appointmentData: AppointmentFormData = {
      doctorId: selectedDoctor,
      department: selectedDepartment,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      type: appointmentType,
      symptoms,
      notes,
    }

    onBook(appointmentData)
  }

  const isFormValid = selectedDate && selectedDoctor && selectedTime && selectedDepartment && symptoms.trim()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5" />
            <span>Book New Appointment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Department Selection */}
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.name}>
                          <div>
                            <div className="font-medium">{dept.name}</div>
                            <div className="text-sm text-gray-500">{dept.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Doctor Selection */}
                <div>
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select value={selectedDoctor} onValueChange={handleDoctorChange} disabled={!selectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <div>
                              <div className="font-medium">{doctor.name}</div>
                              <div className="text-sm text-gray-500">{doctor.specialty}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Appointment Type */}
                <div>
                  <Label htmlFor="type">Appointment Type</Label>
                  <Select value={appointmentType} onValueChange={(value: any) => setAppointmentType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">
                        <div className="flex items-center space-x-2">
                          <Stethoscope className="w-4 h-4" />
                          <span>Consultation</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="follow-up">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>Follow-up</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="emergency">
                        <div className="flex items-center space-x-2">
                          <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                          <span>Emergency</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Symptoms */}
                <div>
                  <Label htmlFor="symptoms">Symptoms / Reason for Visit *</Label>
                  <Textarea
                    id="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Please describe your symptoms or reason for the appointment..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional information you'd like to share..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Date Selection */}
                <div>
                  <Label>Select Date</Label>
                  <div className="border rounded-lg p-3">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateChange}
                      disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                      className="rounded-md"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                {timeSlots.length > 0 && (
                  <div>
                    <Label>Available Time Slots</Label>
                    <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border rounded-lg">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          type="button"
                          variant={selectedTime === slot.time ? "default" : "outline"}
                          size="sm"
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className="text-xs"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTime(slot.time)}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Appointment Summary */}
            {selectedDate && selectedDoctor && selectedTime && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Appointment Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Doctor:</strong> {doctors.find((d) => d.id === selectedDoctor)?.name}
                      </p>
                      <p>
                        <strong>Department:</strong> {selectedDepartment}
                      </p>
                      <p>
                        <strong>Type:</strong> <Badge variant="secondary">{appointmentType}</Badge>
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Date:</strong> {selectedDate.toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Time:</strong> {formatTime(selectedTime)}
                      </p>
                      <p>
                        <strong>Duration:</strong> 30 minutes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isFormValid}>
                Book Appointment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
