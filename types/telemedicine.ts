export interface VideoCallSession {
  id: string
  appointmentId: string
  roomId: string
  status: "waiting" | "connecting" | "active" | "ended" | "failed"
  participants: Participant[]
  startTime?: string
  endTime?: string
  duration?: number
  recordingEnabled: boolean
  recordingUrl?: string
  chatMessages: ChatMessage[]
  screenSharingActive: boolean
  screenSharingBy?: string
}

export interface Participant {
  id: string
  name: string
  role: "patient" | "doctor" | "nurse"
  isConnected: boolean
  isMuted: boolean
  isVideoOn: boolean
  joinedAt?: string
  leftAt?: string
}

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  message: string
  timestamp: string
  type: "text" | "system" | "file"
}

export interface TelemedSettings {
  cameraEnabled: boolean
  microphoneEnabled: boolean
  speakerVolume: number
  selectedCamera?: string
  selectedMicrophone?: string
  selectedSpeaker?: string
  backgroundBlur: boolean
  virtualBackground?: string
}

export interface CallQuality {
  connectionStatus: "excellent" | "good" | "fair" | "poor"
  bandwidth: number
  latency: number
  packetLoss: number
}
