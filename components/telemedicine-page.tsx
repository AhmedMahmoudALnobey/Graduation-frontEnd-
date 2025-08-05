"use client"

import { useState } from "react"
import { TelemedicineBooking } from "./telemedicine-booking"
import { VirtualWaitingRoom } from "./virtual-waiting-room"
import { VideoCall } from "./video-call"
import type { Appointment } from "../types/appointment"
import type { VideoCallSession } from "../types/telemedicine"

interface TelemedicinePageProps {
  userType: "patient" | "staff"
  userId: string
  onBack: () => void
}

type ViewState = "booking" | "waiting" | "call" | "ended"

export function TelemedicinePage({ userType, userId, onBack }: TelemedicinePageProps) {
  const [currentView, setCurrentView] = useState<ViewState>("booking")
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null)
  const [callSession, setCallSession] = useState<VideoCallSession | null>(null)

  const handleBookAppointment = (appointmentData: any) => {
    // Create mock appointment
    const appointment: Appointment = {
      id: Date.now().toString(),
      patientId: userId,
      patientName: "John Patient",
      doctorId: appointmentData.doctorId,
      doctorName: "Dr. Sarah Wilson",
      department: appointmentData.department,
      date: appointmentData.date,
      time: appointmentData.time,
      duration: 30,
      type: appointmentData.type,
      status: "scheduled",
      symptoms: appointmentData.symptoms,
      notes: appointmentData.notes,
      createdAt: new Date().toISOString(),
    }

    setCurrentAppointment(appointment)

    if (appointmentData.consultationType === "telemedicine") {
      setCurrentView("waiting")
    } else {
      // For in-person appointments, just show success and go back
      alert("In-person appointment booked successfully!")
      onBack()
    }
  }

  const handleJoinCall = () => {
    if (!currentAppointment) return

    // Create mock video call session
    const session: VideoCallSession = {
      id: `call-${Date.now()}`,
      appointmentId: currentAppointment.id,
      roomId: `room-${currentAppointment.id}`,
      status: "active",
      participants: [
        {
          id: userId,
          name: "John Patient",
          role: "patient",
          isConnected: true,
          isMuted: false,
          isVideoOn: true,
          joinedAt: new Date().toISOString(),
        },
        {
          id: currentAppointment.doctorId,
          name: currentAppointment.doctorName,
          role: "doctor",
          isConnected: true,
          isMuted: false,
          isVideoOn: true,
          joinedAt: new Date().toISOString(),
        },
      ],
      startTime: new Date().toISOString(),
      recordingEnabled: false,
      chatMessages: [
        {
          id: "1",
          senderId: "system",
          senderName: "System",
          message: "Welcome to your video consultation. The doctor will be with you shortly.",
          timestamp: new Date().toISOString(),
          type: "system",
        },
      ],
      screenSharingActive: false,
    }

    setCallSession(session)
    setCurrentView("call")
  }

  const handleEndCall = () => {
    setCurrentView("ended")
    // In a real app, you'd save call summary, notes, etc.
    setTimeout(() => {
      onBack()
    }, 3000)
  }

  const handleLeaveWaitingRoom = () => {
    setCurrentView("booking")
    setCurrentAppointment(null)
  }

  const handleUpdateSession = (updatedSession: VideoCallSession) => {
    setCallSession(updatedSession)
  }

  switch (currentView) {
    case "booking":
      return <TelemedicineBooking onBook={handleBookAppointment} onCancel={onBack} />

    case "waiting":
      return currentAppointment ? (
        <VirtualWaitingRoom
          appointment={currentAppointment}
          onJoinCall={handleJoinCall}
          onLeaveWaitingRoom={handleLeaveWaitingRoom}
        />
      ) : null

    case "call":
      return callSession ? (
        <VideoCall
          session={callSession}
          currentUserId={userId}
          currentUserRole={userType === "patient" ? "patient" : "doctor"}
          onEndCall={handleEndCall}
          onUpdateSession={handleUpdateSession}
        />
      ) : null

    case "ended":
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Consultation Completed</h2>
            <p className="text-gray-600 mb-4">Thank you for using our telemedicine service.</p>
            <p className="text-sm text-gray-500">You will be redirected shortly...</p>
          </div>
        </div>
      )

    default:
      return null
  }
}
