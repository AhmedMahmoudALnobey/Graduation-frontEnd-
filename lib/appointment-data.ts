import type { Doctor, Department, Appointment, TimeSlot } from "../types/appointment"

export const departments: Department[] = [
  { id: "1", name: "Cardiology", description: "Heart and cardiovascular care" },
  { id: "2", name: "Neurology", description: "Brain and nervous system" },
  { id: "3", name: "Orthopedics", description: "Bone and joint care" },
  { id: "4", name: "Pediatrics", description: "Children healthcare" },
  { id: "5", name: "Dermatology", description: "Skin and hair care" },
  { id: "6", name: "General Medicine", description: "General healthcare" },
]

export const doctors: Doctor[] = [
  { id: "1", name: "Dr. Sarah Wilson", specialty: "Cardiologist", department: "Cardiology" },
  { id: "2", name: "Dr. Michael Chen", specialty: "Neurologist", department: "Neurology" },
  { id: "3", name: "Dr. Emily Rodriguez", specialty: "Orthopedic Surgeon", department: "Orthopedics" },
  { id: "4", name: "Dr. James Thompson", specialty: "Pediatrician", department: "Pediatrics" },
  { id: "5", name: "Dr. Lisa Anderson", specialty: "Dermatologist", department: "Dermatology" },
  { id: "6", name: "Dr. Robert Kumar", specialty: "General Practitioner", department: "General Medicine" },
]

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "p1",
    patientName: "John Patient",
    doctorId: "1",
    doctorName: "Dr. Sarah Wilson",
    department: "Cardiology",
    date: "2025-01-20",
    time: "09:00",
    duration: 30,
    type: "consultation",
    status: "scheduled",
    symptoms: "Chest pain and shortness of breath",
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    patientId: "p1",
    patientName: "John Patient",
    doctorId: "3",
    doctorName: "Dr. Emily Rodriguez",
    department: "Orthopedics",
    date: "2025-01-25",
    time: "14:30",
    duration: 45,
    type: "follow-up",
    status: "confirmed",
    symptoms: "Knee pain follow-up",
    createdAt: "2025-01-10T14:00:00Z",
  },
  {
    id: "3",
    patientId: "p2",
    patientName: "Jane Smith",
    doctorId: "1",
    doctorName: "Dr. Sarah Wilson",
    department: "Cardiology",
    date: "2025-01-22",
    time: "11:00",
    duration: 30,
    type: "consultation",
    status: "scheduled",
    symptoms: "Regular checkup",
    createdAt: "2025-01-18T09:00:00Z",
  },
]

export const generateTimeSlots = (date: string, doctorId: string): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const startHour = 9
  const endHour = 17
  const slotDuration = 30 // minutes

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      const isBooked = mockAppointments.some(
        (apt) => apt.doctorId === doctorId && apt.date === date && apt.time === time,
      )
      slots.push({
        time,
        available: !isBooked,
      })
    }
  }

  return slots
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}
