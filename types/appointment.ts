export interface Doctor {
  id: string
  name: string
  specialty: string
  department: string
  avatar?: string
}

export interface Department {
  id: string
  name: string
  description: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  department: string
  date: string
  time: string
  duration: number // in minutes
  type: "consultation" | "follow-up" | "emergency" | "surgery"
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show"
  notes?: string
  symptoms?: string
  createdAt: string
}

export interface AppointmentFormData {
  doctorId: string
  department: string
  date: string
  time: string
  type: "consultation" | "follow-up" | "emergency"
  symptoms: string
  notes?: string
}
