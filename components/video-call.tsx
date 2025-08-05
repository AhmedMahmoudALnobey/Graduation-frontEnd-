"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Monitor,
  MessageSquare,
  Settings,
  RepeatIcon as Record,
  Users,
  Wifi,
  Volume2,
  Camera,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { VideoCallSession, ChatMessage, CallQuality } from "../types/telemedicine"

interface VideoCallProps {
  session: VideoCallSession
  currentUserId: string
  currentUserRole: "patient" | "doctor" | "nurse"
  onEndCall: () => void
  onUpdateSession: (session: VideoCallSession) => void
}

export function VideoCall({ session, currentUserId, currentUserRole, onEndCall, onUpdateSession }: VideoCallProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(session.recordingEnabled)
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [callDuration, setCallDuration] = useState(0)
  const [callQuality, setCallQuality] = useState<CallQuality>({
    connectionStatus: "excellent",
    bandwidth: 1200,
    latency: 45,
    packetLoss: 0.1,
  })

  const videoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // Simulate call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simulate getting user media
  useEffect(() => {
    if (videoRef.current && isVideoOn) {
      // In a real implementation, this would be getUserMedia()
      videoRef.current.src = "/placeholder.svg?height=300&width=400&text=Your Video"
    }
  }, [isVideoOn])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: session.participants.find((p) => p.id === currentUserId)?.name || "You",
      message: chatMessage,
      timestamp: new Date().toISOString(),
      type: "text",
    }

    const updatedSession = {
      ...session,
      chatMessages: [...session.chatMessages, newMessage],
    }

    onUpdateSession(updatedSession)
    setChatMessage("")
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // In real implementation, this would control the microphone
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    // In real implementation, this would control the camera
  }

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    // In real implementation, this would start/stop screen sharing
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    const updatedSession = {
      ...session,
      recordingEnabled: !isRecording,
    }
    onUpdateSession(updatedSession)
  }

  const getQualityColor = (status: CallQuality["connectionStatus"]) => {
    switch (status) {
      case "excellent":
        return "text-green-500"
      case "good":
        return "text-blue-500"
      case "fair":
        return "text-yellow-500"
      case "poor":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const connectedParticipants = session.participants.filter((p) => p.isConnected)
  const currentUser = session.participants.find((p) => p.id === currentUserId)
  const otherParticipants = session.participants.filter((p) => p.id !== currentUserId && p.isConnected)

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Live Consultation</span>
          </div>
          <Badge variant="secondary" className="bg-gray-700 text-gray-200">
            {formatDuration(callDuration)}
          </Badge>
          {isRecording && (
            <Badge variant="destructive" className="animate-pulse">
              <Record className="w-3 h-3 mr-1" />
              Recording
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Wifi className={`w-4 h-4 ${getQualityColor(callQuality.connectionStatus)}`} />
            <span className="capitalize">{callQuality.connectionStatus}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{connectedParticipants.length}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 relative">
          {/* Remote Video */}
          <div className="absolute inset-0 bg-gray-800">
            {otherParticipants.length > 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="relative">
                  <video
                    ref={remoteVideoRef}
                    className="w-full h-full object-cover rounded-lg"
                    autoPlay
                    playsInline
                    poster="/placeholder.svg?height=600&width=800&text=Dr. Sarah Wilson"
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span>{otherParticipants[0].name}</span>
                      {otherParticipants[0].isMuted && <MicOff className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Waiting for other participants to join...</p>
                </div>
              </div>
            )}
          </div>

          {/* Self Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
            {isVideoOn ? (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
                poster="/placeholder.svg?height=144&width=192&text=You"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white bg-gray-700">
                <div className="text-center">
                  <VideoOff className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Camera Off</p>
                </div>
              </div>
            )}
            <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
              You {isMuted && <MicOff className="w-3 h-3 inline ml-1" />}
            </div>
          </div>

          {/* Screen Sharing Indicator */}
          {isScreenSharing && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2">
              <Monitor className="w-4 h-4" />
              <span>You are sharing your screen</span>
            </div>
          )}

          {/* Call Quality Indicator */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
            <div className="flex items-center space-x-4">
              <span>Bandwidth: {callQuality.bandwidth} kbps</span>
              <span>Latency: {callQuality.latency}ms</span>
              <span>Loss: {callQuality.packetLoss}%</span>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <Card className="w-80 m-4 flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </h3>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {session.chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUserId ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        message.senderId === currentUserId ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="text-xs opacity-75 mb-1">{message.senderName}</div>
                      <div className="text-sm">{message.message}</div>
                      <div className="text-xs opacity-75 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 min-h-[40px] max-h-[100px]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage} size="sm">
                  Send
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Microphone */}
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            onClick={toggleMute}
            className="rounded-full w-12 h-12"
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>

          {/* Camera */}
          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-12 h-12"
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>

          {/* Screen Share */}
          <Button
            variant={isScreenSharing ? "default" : "secondary"}
            size="lg"
            onClick={toggleScreenShare}
            className="rounded-full w-12 h-12"
          >
            <Monitor className="w-5 h-5" />
          </Button>

          {/* Chat */}
          <Button
            variant={showChat ? "default" : "secondary"}
            size="lg"
            onClick={() => setShowChat(!showChat)}
            className="rounded-full w-12 h-12"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>

          {/* Recording (Doctor/Staff only) */}
          {currentUserRole !== "patient" && (
            <Button
              variant={isRecording ? "destructive" : "secondary"}
              size="lg"
              onClick={toggleRecording}
              className="rounded-full w-12 h-12"
            >
              <Record className="w-5 h-5" />
            </Button>
          )}

          {/* More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="lg" className="rounded-full w-12 h-12">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Volume2 className="w-4 h-4 mr-2" />
                Audio Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Camera className="w-4 h-4 mr-2" />
                Video Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="h-8 bg-gray-600" />

          {/* End Call */}
          <Button variant="destructive" size="lg" onClick={onEndCall} className="rounded-full w-12 h-12">
            <PhoneOff className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
