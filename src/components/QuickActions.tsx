'use client'

import React from 'react'
import { X, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface QuickActionsProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
}

export default function QuickActions({ isOpen, onClose, isDarkMode, setIsDarkMode }: QuickActionsProps) {
  return (
    <aside className={`fixed inset-y-0 right-0 z-50 w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-md flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-2 mb-8">
        <Button className="w-full bg-black text-white hover:bg-gray-800">
          Add Property
        </Button>
        <Button variant="outline" className="w-full">Generate Report</Button>
        <Button variant="outline" className="w-full">Show Map View</Button>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Recent Notifications</h3>
        <div className="space-y-2">
          <p className="text-sm">New property added: 123 Main St</p>
          <p className="text-sm">Report generated: Q2 Performance</p>
        </div>
      </div>
      <div className="mt-auto">
        <Button variant="outline" className="w-full" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </aside>
  )
}