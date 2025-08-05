"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import { Video, MapPin, Clock, CheckCircle, Wifi, Monitor, Headphones, Smartphone } from "lucide-react"
import { departments, doctors, generateTimeSlots, formatTime } from "../lib/appointment-data"
import type { AppointmentFormData } from "../types/appointment"

interface TelemedicineBookingProps {
  onBook: (appointment: AppointmentFormData & { consultationType: "in-person" | "telemedicine" }) => void
  onCancel: () => void
}

export function TelemedicineBooking({ onBook, onCancel }: TelemedicineBookingProps) {
  const [consultationType, setConsultationType] = useState<"in-person" | "telemedicine">("telemedicine")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState<"consultation" | "follow-up" | "emergency">("consultation")
  const [symptoms, setSymptoms] = useState("")
  const [notes, setNotes] = useState("")
  const [hasRequiredTech, setHasRequiredTech] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const filteredDoctors = selectedDepartment ? doctors.filter((doctor) => doctor.department === selectedDepartment) : []

  const timeSlots =
    selectedDate && selectedDoctor ? generateTimeSlots(selectedDate.toISOString().split("T")[0], selectedDoctor) : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedDoctor || !selectedTime || !selectedDepartment) {
      return
    }

    const appointmentData = {
      doctorId: selectedDoctor,
      department: selectedDepartment,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      type: appointmentType,
      symptoms,
      notes,
      consultationType,
    }

    onBook(appointmentData)
  }

  const isFormValid =
    selectedDate &&
    selectedDoctor &&
    selectedTime &&
    selectedDepartment &&
    symptoms.trim() &&
    (consultationType === "in-person" || (hasRequiredTech && agreedToTerms))

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="w-5 h-5" />
            <span>Book Appointment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Consultation Type Selection */}
            <div>
              <Label className="text-base font-medium">Consultation Type</Label>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <Card
                  className={`cursor-pointer transition-colors ${
                    consultationType === "telemedicine"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setConsultationType("telemedicine")}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            consultationType === "telemedicine" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}
                        >
                          {consultationType === "telemedicine" && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Video className="w-5 h-5 text-blue-600" />
                          <h3 className="font-semibold">Telemedicine</h3>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Recommended
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Consult with your doctor from the comfort of your home via secure video call
                        </p>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3" />
                            <span>No travel required</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3" />
                            <span>Secure & private</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3" />
                            <span>Same quality care</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-colors ${
                    consultationType === "in-person"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setConsultationType("in-person")}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            consultationType === "in-person" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}
                        >
                          {consultationType === "in-person" && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-5 h-5 text-green-600" />
                          <h3 className="font-semibold">In-Person</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Visit our medical facility for face-to-face consultation
                        </p>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3" />
                            <span>Physical examination</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3" />
                            <span>Lab tests available</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3" />
                            <span>Full medical equipment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Technical Requirements (for telemedicine) */}
            {consultationType === "telemedicine" && (
              <Alert>
                <Wifi className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-3">
                    <p className="font-medium">Technical Requirements for Telemedicine:</p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Monitor className="w-4 h-4" />
                          <span>Computer, tablet, or smartphone with camera</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Wifi className="w-4 h-4" />
                          <span>Stable internet connection (minimum 1 Mbps)</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Headphones className="w-4 h-4" />
                          <span>Working microphone and speakers/headphones</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Smartphone className="w-4 h-4" />
                          <span>Updated web browser or mobile app</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Checkbox
                        id="tech-requirements"
                        checked={hasRequiredTech}
                        onCheckedChange={(checked) => setHasRequiredTech(checked as boolean)}
                      />
                      <Label htmlFor="tech-requirements" className="text-sm">
                        I confirm that I have the required technology and a quiet, private space for the consultation
                      </Label>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-4">
                {/* Department Selection */}
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
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
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor} disabled={!selectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex items-center space-x-2">
                            <div>
                              <div className="font-medium">{doctor.name}</div>
                              <div className="text-sm text-gray-500 flex items-center space-x-2">
                                <span>{doctor.specialty}</span>
                                {consultationType === "telemedicine" && (
                                  <Badge variant="outline" className="text-xs">
                                    Video Available
                                  </Badge>
                                )}
                              </div>
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
                      <SelectItem value="consultation">New Consultation</SelectItem>
                      <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                      {consultationType === "telemedicine" && (
                        <SelectItem value="emergency">Urgent Care (Video)</SelectItem>
                      )}
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

              {/* Right Column - Calendar and Time Slots */}
              <div className="space-y-4">
                {/* Date Selection */}
                <div>
                  <Label>Select Date</Label>
                  <div className="border rounded-lg p-3">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
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

            {/* Terms and Conditions (for telemedicine) */}
            {consultationType === "telemedicine" && (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Telemedicine Terms and Conditions
                  </a>{" "}
                  and understand that this video consultation is not suitable for emergency situations. For emergencies,
                  I will call 911 or visit the nearest emergency room.
                </Label>
              </div>
            )}

            {/* Appointment Summary */}
            {selectedDate && selectedDoctor && selectedTime && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center space-x-2">
                    {consultationType === "telemedicine" ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    <span>Appointment Summary</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Type:</strong>{" "}
                        <Badge variant="secondary" className="capitalize">
                          {consultationType === "telemedicine" ? "Video Consultation" : "In-Person Visit"}
                        </Badge>
                      </p>
                      <p>
                        <strong>Doctor:</strong> {doctors.find((d) => d.id === selectedDoctor)?.name}
                      </p>
                      <p>
                        <strong>Department:</strong> {selectedDepartment}
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
                {consultationType === "telemedicine" ? "Book Video Consultation" : "Book In-Person Appointment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
