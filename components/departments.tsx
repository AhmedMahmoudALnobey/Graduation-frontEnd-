"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Brain,
  Bone,
  Baby,
  Stethoscope,
  Eye,
  Activity,
  Users,
  Clock,
  MapPin,
  Phone,
  Search,
  Calendar,
} from "lucide-react"

interface Department {
  id: string
  name: string
  description: string
  icon: any
  color: string
  services: string[]
  doctors: DepartmentDoctor[]
  location: string
  phone: string
  hours: string
  emergencyAvailable: boolean
  waitTime: string
}

interface DepartmentDoctor {
  id: string
  name: string
  specialty: string
  experience: string
  availability: "available" | "busy" | "offline"
  rating: number
}

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Cardiology",
    description:
      "Comprehensive heart and cardiovascular care with state-of-the-art diagnostic and treatment facilities.",
    icon: Heart,
    color: "text-red-500",
    services: ["ECG", "Echocardiography", "Cardiac Catheterization", "Pacemaker Implantation", "Heart Surgery"],
    doctors: [
      {
        id: "d1",
        name: "Dr. Sarah Wilson",
        specialty: "Interventional Cardiologist",
        experience: "15 years",
        availability: "available",
        rating: 4.9,
      },
      {
        id: "d2",
        name: "Dr. Michael Roberts",
        specialty: "Cardiac Surgeon",
        experience: "20 years",
        availability: "busy",
        rating: 4.8,
      },
    ],
    location: "Building A, Floor 3",
    phone: "(555) 123-4567",
    hours: "24/7 Emergency, 8 AM - 6 PM Regular",
    emergencyAvailable: true,
    waitTime: "15-30 min",
  },
  {
    id: "2",
    name: "Neurology",
    description: "Advanced neurological care for brain, spine, and nervous system disorders.",
    icon: Brain,
    color: "text-purple-500",
    services: ["MRI", "CT Scan", "EEG", "Neuropsychological Testing", "Deep Brain Stimulation"],
    doctors: [
      {
        id: "d3",
        name: "Dr. Michael Chen",
        specialty: "Neurologist",
        experience: "12 years",
        availability: "available",
        rating: 4.7,
      },
      {
        id: "d4",
        name: "Dr. Lisa Park",
        specialty: "Neurosurgeon",
        experience: "18 years",
        availability: "offline",
        rating: 4.9,
      },
    ],
    location: "Building B, Floor 2",
    phone: "(555) 234-5678",
    hours: "8 AM - 8 PM",
    emergencyAvailable: true,
    waitTime: "20-45 min",
  },
  {
    id: "3",
    name: "Orthopedics",
    description: "Expert care for bones, joints, muscles, and sports-related injuries.",
    icon: Bone,
    color: "text-blue-500",
    services: ["X-Ray", "Joint Replacement", "Arthroscopy", "Sports Medicine", "Fracture Care"],
    doctors: [
      {
        id: "d5",
        name: "Dr. Emily Rodriguez",
        specialty: "Orthopedic Surgeon",
        experience: "14 years",
        availability: "available",
        rating: 4.8,
      },
      {
        id: "d6",
        name: "Dr. David Kim",
        specialty: "Sports Medicine",
        experience: "10 years",
        availability: "busy",
        rating: 4.6,
      },
    ],
    location: "Building A, Floor 1",
    phone: "(555) 345-6789",
    hours: "7 AM - 9 PM",
    emergencyAvailable: false,
    waitTime: "10-25 min",
  },
  {
    id: "4",
    name: "Pediatrics",
    description: "Specialized healthcare for infants, children, and adolescents.",
    icon: Baby,
    color: "text-green-500",
    services: [
      "Well-Child Visits",
      "Immunizations",
      "Growth Monitoring",
      "Developmental Screening",
      "Pediatric Surgery",
    ],
    doctors: [
      {
        id: "d7",
        name: "Dr. James Thompson",
        specialty: "Pediatrician",
        experience: "16 years",
        availability: "available",
        rating: 4.9,
      },
      {
        id: "d8",
        name: "Dr. Maria Garcia",
        specialty: "Pediatric Surgeon",
        experience: "13 years",
        availability: "available",
        rating: 4.7,
      },
    ],
    location: "Building C, Floor 1",
    phone: "(555) 456-7890",
    hours: "8 AM - 6 PM",
    emergencyAvailable: true,
    waitTime: "5-15 min",
  },
  {
    id: "5",
    name: "General Medicine",
    description: "Primary care and general health services for adults.",
    icon: Stethoscope,
    color: "text-indigo-500",
    services: ["Annual Checkups", "Preventive Care", "Chronic Disease Management", "Health Screenings", "Vaccinations"],
    doctors: [
      {
        id: "d9",
        name: "Dr. Robert Kumar",
        specialty: "General Practitioner",
        experience: "11 years",
        availability: "available",
        rating: 4.6,
      },
      {
        id: "d10",
        name: "Dr. Jennifer Lee",
        specialty: "Internal Medicine",
        experience: "9 years",
        availability: "busy",
        rating: 4.8,
      },
    ],
    location: "Building A, Floor 2",
    phone: "(555) 567-8901",
    hours: "7 AM - 7 PM",
    emergencyAvailable: false,
    waitTime: "15-30 min",
  },
  {
    id: "6",
    name: "Dermatology",
    description: "Comprehensive skin, hair, and nail care with cosmetic and medical treatments.",
    icon: Eye,
    color: "text-pink-500",
    services: [
      "Skin Cancer Screening",
      "Acne Treatment",
      "Cosmetic Procedures",
      "Dermatologic Surgery",
      "Laser Therapy",
    ],
    doctors: [
      {
        id: "d11",
        name: "Dr. Lisa Anderson",
        specialty: "Dermatologist",
        experience: "8 years",
        availability: "available",
        rating: 4.7,
      },
    ],
    location: "Building B, Floor 1",
    phone: "(555) 678-9012",
    hours: "9 AM - 5 PM",
    emergencyAvailable: false,
    waitTime: "30-60 min",
  },
]

interface DepartmentsProps {
  userType: "patient" | "staff"
  onBack: () => void
  onBookAppointment?: (departmentId: string) => void
}

export function Departments({ userType, onBack, onBookAppointment }: DepartmentsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)

  const filteredDepartments = mockDepartments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getAvailabilityColor = (availability: DepartmentDoctor["availability"]) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (selectedDepartment) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => setSelectedDepartment(null)}>
              ← Back to Departments
            </Button>
            {userType === "patient" && (
              <Button onClick={() => onBookAppointment?.(selectedDepartment.id)}>
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Department Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <selectedDepartment.icon className={`w-8 h-8 ${selectedDepartment.color}`} />
                    <div>
                      <h1 className="text-2xl">{selectedDepartment.name}</h1>
                      {selectedDepartment.emergencyAvailable && (
                        <Badge variant="destructive" className="mt-1">
                          24/7 Emergency
                        </Badge>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{selectedDepartment.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedDepartment.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Our Doctors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedDepartment.doctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{doctor.name}</h3>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            <p className="text-xs text-gray-500">{doctor.experience} experience</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getAvailabilityColor(doctor.availability)}>{doctor.availability}</Badge>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-600">★ {doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact & Info Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-gray-600">{selectedDepartment.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-gray-600">{selectedDepartment.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-sm text-gray-600">{selectedDepartment.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Wait Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{selectedDepartment.waitTime}</div>
                    <p className="text-sm text-gray-600">Average wait time</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userType === "patient" && (
                    <>
                      <Button className="w-full" onClick={() => onBookAppointment?.(selectedDepartment.id)}>
                        Book Appointment
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Virtual Consultation
                      </Button>
                    </>
                  )}
                  <Button variant="outline" className="w-full bg-transparent">
                    View Department Map
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Emergency Procedures
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
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
            <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
            <p className="text-gray-600">Explore our specialized medical departments and services</p>
          </div>
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search departments, services, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Departments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <Card
              key={department.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedDepartment(department)}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <department.icon className={`w-6 h-6 ${department.color}`} />
                  <span>{department.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{department.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Available Doctors:</span>
                    <span className="font-medium">{department.doctors.length}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Wait Time:</span>
                    <span className="font-medium">{department.waitTime}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Emergency:</span>
                    {department.emergencyAvailable ? (
                      <Badge variant="destructive" className="text-xs">
                        24/7
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        Regular Hours
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Services:</span>
                    <span className="text-sm font-medium">{department.services.length} available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Departments Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{mockDepartments.length}</div>
              <div className="text-sm text-gray-600">Total Departments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockDepartments.reduce((acc, dept) => acc + dept.doctors.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Doctors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {mockDepartments.filter((dept) => dept.emergencyAvailable).length}
              </div>
              <div className="text-sm text-gray-600">24/7 Emergency</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {mockDepartments.reduce((acc, dept) => acc + dept.services.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Services</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
