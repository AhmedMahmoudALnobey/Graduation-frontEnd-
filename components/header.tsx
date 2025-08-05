"use client"

import { Bell, Settings, User, Phone, Wifi, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { brandConfig } from "../lib/brand"

interface HeaderProps {
  userType: "patient" | "staff"
  userName: string
  userRole?: string
  onNavigate?: (page: string) => void
}

export function Header({ userType, userName, userRole, onNavigate }: HeaderProps) {
  const displayName =
    userType === "patient"
      ? userName
      : userRole === "doctor"
        ? `Dr. ${userName.split(" ")[1] || userName}`
        : userRole === "admin"
          ? `Admin ${userName.split(" ")[0] || userName}`
          : `${userName}`

  const navigationItems = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Departments", value: "departments" },
    { label: "Appointments", value: "appointments" },
    { label: "Medical Records", value: "medical-records" },
    { label: "Telemedicine", value: "telemedicine" },
  ]

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
        <div>
          <span className="text-xl font-bold text-gray-800">{brandConfig.name}</span>
          <p className="text-xs text-gray-500 hidden sm:block">{brandConfig.tagline}</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        {navigationItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onNavigate?.(item.value)}
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <span className="text-lg font-bold text-gray-800">{brandConfig.name}</span>
                <p className="text-xs text-gray-500">{brandConfig.tagline}</p>
              </div>
            </div>
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => onNavigate?.(item.value)}
                  className="w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Emergency Contact */}
        <div className="hidden xl:flex items-center space-x-2 text-sm text-gray-600 bg-red-50 px-3 py-1 rounded-full">
          <Phone className="w-4 h-4 text-red-500" />
          <span className="text-red-700 font-medium">Emergency: (555) 911-0000</span>
        </div>

        {/* Online Status */}
        <div className="flex items-center space-x-1">
          <Wifi className="w-4 h-4 text-green-500" />
          <Badge variant="secondary" className="bg-green-100 text-green-700 hidden sm:inline-flex">
            Online
          </Badge>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole || userType}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{displayName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole || userType}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onNavigate?.("settings")}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate?.("logout")} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
