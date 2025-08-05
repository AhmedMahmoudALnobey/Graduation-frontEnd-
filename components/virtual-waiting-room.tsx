"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Settings,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Wifi,
  Volume2,
} from "lucide-react"
import type { Appointment } from "../types/appointment"
import type { TelemedSettings } from "../types/telemedicine"

interface VirtualWaitingRoomProps {
  appointment: Appointment
  onJoinCall: () => void
  onLeaveWaitingRoom: () => void
}

export function VirtualWaitingRoom({ appointment, onJoinCall, onLeaveWaitingRoom }: VirtualWaitingRoomProps) {
  const [settings, setSettings] = useState<TelemedSettings>({
    cameraEnabled: true,
    microphoneEnabled: true,
    speakerVolume: 75,
    backgroundBlur: false,
  })
  const [systemCheck, setSystemCheck] = useState({
    camera: "checking",
    microphone: "checking",
    speakers: "checking",
    internet: "checking",
  })
  const [waitTime, setWaitTime] = useState(0)
  const [doctorStatus, setDoctorStatus] = useState<"offline" | "busy" | "ready">("busy")

  // Simulate system checks
  useEffect(() => {
    const checkSystems = async () => {
      // Simulate checking each system
      setTimeout(() => setSystemCheck((prev) => ({ ...prev, camera: "success" })), 1000)
      setTimeout(() => setSystemCheck((prev) => ({ ...prev, microphone: "success" })), 1500)
      setTimeout(() => setSystemCheck((prev) => ({ ...prev, speakers: "success" })), 2000)
      setTimeout(() => setSystemCheck((prev) => ({ ...prev, internet: "success" })), 2500)
    }

    checkSystems()
  }, [])

  // Simulate wait time
  useEffect(() => {
    const timer = setInterval(() => {
      setWaitTime((prev) => prev + 1)
    }, 1000)

    // Simulate doctor becoming ready after 30 seconds
    setTimeout(() => {
      setDoctorStatus("ready")
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  const formatWaitTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getSystemIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    }
  }

  const allSystemsReady = Object.values(systemCheck).every((status) => status === "success")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Waiting Room</h1>
          <p className="text-gray-600">Please wait while we prepare your consultation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Preview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Video Preview</span>
                <div className="flex items-center space-x-2">
                  <Badge variant={doctorStatus === "ready" ? "default" : "secondary"}>
                    {doctorStatus === "ready" ? "Doctor Ready" : "Doctor Busy"}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video mb-4">
                {settings.cameraEnabled ? (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Camera Preview</p>
                      <p className="text-sm opacity-75">Your video will appear here</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white bg-gray-800">
                    <div className="text-center">
                      <VideoOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Camera Disabled</p>
                    </div>
                  </div>
                )}

                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <Button
                    variant={settings.cameraEnabled ? "secondary" : "destructive"}
                    size="sm"
                    onClick={() => setSettings((prev) => ({ ...prev, cameraEnabled: !prev.cameraEnabled }))}
                    className="rounded-full"
                  >
                    {settings.cameraEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant={settings.microphoneEnabled ? "secondary" : "destructive"}
                    size="sm"
                    onClick={() => setSettings((prev) => ({ ...prev, microphoneEnabled: !prev.microphoneEnabled }))}
                    className="rounded-full"
                  >
                    {settings.microphoneEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                  <Button variant="secondary" size="sm" className="rounded-full">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* System Status */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  {getSystemIcon(systemCheck.camera)}
                  <span className="text-sm">Camera</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getSystemIcon(systemCheck.microphone)}
                  <span className="text-sm">Microphone</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getSystemIcon(systemCheck.speakers)}
                  <span className="text-sm">Speakers</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getSystemIcon(systemCheck.internet)}
                  <span className="text-sm">Internet</span>
                </div>
              </div>

              {!allSystemsReady && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    We're checking your system compatibility. Please wait while we verify your camera, microphone, and
                    internet connection.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Appointment Info & Controls */}
          <div className="space-y-6">
            {/* Appointment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Appointment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="font-medium">{appointment.doctorName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium">{appointment.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Appointment Type</p>
                  <Badge variant="outline" className="capitalize">
                    {appointment.type}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Scheduled Time</p>
                  <p className="font-medium">
                    {new Date(appointment.date).toLocaleDateString()} at{" "}
                    {new Date(`${appointment.date}T${appointment.time}`).toLocaleTimeString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Wait Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Wait Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{formatWaitTime(waitTime)}</div>
                  <p className="text-sm text-gray-600 mb-4">Estimated wait time: 2-5 minutes</p>
                  <Progress value={Math.min((waitTime / 300) * 100, 100)} className="w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Connection Quality */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wifi className="w-5 h-5" />
                  <span>Connection Quality</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Internet Speed</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Excellent
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Video Quality</span>
                    <span className="text-sm text-gray-600">HD Ready</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audio Quality</span>
                    <span className="text-sm text-gray-600">Clear</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audio Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5" />
                  <span>Audio Test</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full mb-3 bg-transparent">
                  Test Speakers
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Test Microphone
                </Button>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onJoinCall}
                disabled={!allSystemsReady || doctorStatus !== "ready"}
                className="w-full"
                size="lg"
              >
                {doctorStatus === "ready" ? "Join Consultation" : "Waiting for Doctor..."}
              </Button>
              <Button onClick={onLeaveWaitingRoom} variant="outline" className="w-full bg-transparent">
                Leave Waiting Room
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
