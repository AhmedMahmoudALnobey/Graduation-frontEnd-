"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  User,
  Activity,
  Pill,
  TestTube,
  Heart,
  Eye,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"

interface MedicalRecord {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  type: "consultation" | "lab-result" | "prescription" | "diagnosis" | "surgery" | "imaging"
  title: string
  description: string
  attachments?: string[]
  status: "active" | "archived"
  priority: "low" | "medium" | "high" | "critical"
}

interface MedicalRecordsProps {
  userType: "patient" | "staff"
  userId: string
  onBack: () => void
}

const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    patientId: "p1",
    patientName: "John Patient",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    date: "2025-01-15",
    type: "consultation",
    title: "Cardiology Consultation",
    description:
      "Patient presented with chest pain and shortness of breath. ECG shows normal sinus rhythm. Recommended stress test and follow-up in 2 weeks.",
    status: "active",
    priority: "medium",
    attachments: ["ecg-report.pdf", "chest-xray.jpg"],
  },
  {
    id: "2",
    patientId: "p1",
    patientName: "John Patient",
    doctorId: "d2",
    doctorName: "Dr. Michael Chen",
    date: "2025-01-10",
    type: "lab-result",
    title: "Blood Work Results",
    description:
      "Complete blood count and lipid panel. Cholesterol levels slightly elevated. Recommend dietary changes and recheck in 3 months.",
    status: "active",
    priority: "low",
    attachments: ["blood-work.pdf"],
  },
  {
    id: "3",
    patientId: "p1",
    patientName: "John Patient",
    doctorId: "d1",
    doctorName: "Dr. Sarah Wilson",
    date: "2025-01-08",
    type: "prescription",
    title: "Medication Prescription",
    description:
      "Prescribed Lisinopril 10mg daily for blood pressure management. Patient counseled on side effects and monitoring.",
    status: "active",
    priority: "medium",
  },
]

export function MedicalRecords({ userType, userId, onBack }: MedicalRecordsProps) {
  const [records, setRecords] = useState<MedicalRecord[]>(mockRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)
  const [showAddRecord, setShowAddRecord] = useState(false)

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || record.type === filterType
    return matchesSearch && matchesFilter
  })

  const getTypeIcon = (type: MedicalRecord["type"]) => {
    switch (type) {
      case "consultation":
        return <User className="w-4 h-4" />
      case "lab-result":
        return <TestTube className="w-4 h-4" />
      case "prescription":
        return <Pill className="w-4 h-4" />
      case "diagnosis":
        return <Activity className="w-4 h-4" />
      case "surgery":
        return <Heart className="w-4 h-4" />
      case "imaging":
        return <Eye className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: MedicalRecord["type"]) => {
    switch (type) {
      case "consultation":
        return "bg-blue-100 text-blue-800"
      case "lab-result":
        return "bg-green-100 text-green-800"
      case "prescription":
        return "bg-purple-100 text-purple-800"
      case "diagnosis":
        return "bg-orange-100 text-orange-800"
      case "surgery":
        return "bg-red-100 text-red-800"
      case "imaging":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: MedicalRecord["priority"]) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  if (selectedRecord) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => setSelectedRecord(null)}>
              ← Back to Records
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              {userType === "staff" && (
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    {getTypeIcon(selectedRecord.type)}
                    <span>{selectedRecord.title}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={getTypeColor(selectedRecord.type)}>{selectedRecord.type.replace("-", " ")}</Badge>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(selectedRecord.priority)}`}></div>
                      <span className="text-sm text-gray-600 capitalize">{selectedRecord.priority} Priority</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Patient Information</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedRecord.patientName}
                    </p>
                    <p>
                      <strong>Patient ID:</strong> {selectedRecord.patientId}
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(selectedRecord.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Healthcare Provider</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Doctor:</strong> {selectedRecord.doctorName}
                    </p>
                    <p>
                      <strong>Doctor ID:</strong> {selectedRecord.doctorId}
                    </p>
                    <p>
                      <strong>Status:</strong> <Badge variant="secondary">{selectedRecord.status}</Badge>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Medical Notes</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">{selectedRecord.description}</p>
                </div>
              </div>

              {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Attachments</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedRecord.attachments.map((attachment, index) => (
                      <Card key={index} className="p-3 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span className="text-sm truncate">{attachment}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
            <p className="text-gray-600">
              {userType === "patient"
                ? "View and manage your medical history and documents"
                : "Access and manage patient medical records"}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onBack}>
              ← Back
            </Button>
            {userType === "staff" && (
              <Button onClick={() => setShowAddRecord(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search records by title, description, or doctor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="consultation">Consultations</SelectItem>
                  <SelectItem value="lab-result">Lab Results</SelectItem>
                  <SelectItem value="prescription">Prescriptions</SelectItem>
                  <SelectItem value="diagnosis">Diagnoses</SelectItem>
                  <SelectItem value="surgery">Surgeries</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Records List */}
        <div className="space-y-4">
          {filteredRecords.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Records Found</h3>
                <p className="text-gray-600">
                  {searchTerm || filterType !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "No medical records available"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card
                key={record.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedRecord(record)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getTypeIcon(record.type)}
                        <h3 className="font-semibold text-lg">{record.title}</h3>
                        <Badge className={getTypeColor(record.type)}>{record.type.replace("-", " ")}</Badge>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(record.priority)}`}></div>
                          <span className="text-xs text-gray-500 capitalize">{record.priority}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">{record.description}</p>

                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{record.doctorName}</span>
                        </div>
                        {record.attachments && record.attachments.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>
                              {record.attachments.length} attachment{record.attachments.length > 1 ? "s" : ""}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      {userType === "staff" && (
                        <>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {records.filter((r) => r.type === "consultation").length}
              </div>
              <div className="text-sm text-gray-600">Consultations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {records.filter((r) => r.type === "lab-result").length}
              </div>
              <div className="text-sm text-gray-600">Lab Results</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {records.filter((r) => r.type === "prescription").length}
              </div>
              <div className="text-sm text-gray-600">Prescriptions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {records.filter((r) => r.priority === "high" || r.priority === "critical").length}
              </div>
              <div className="text-sm text-gray-600">High Priority</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
