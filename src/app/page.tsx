'use client'

import React, { useState } from 'react'
import { Search, Home, PieChart, BarChart, DollarSign, Users, Menu, X, Building2, Maximize2, Bell, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

// Remove the Switch import and replace it with a custom toggle component

// Update the properties data to match the original dashboard
const properties = [
  { id: 1, address: '123 Main St', city: 'Springfield', state: 'IL', zip: '62701', price: 250000, sqft: 1500, type: 'Single Family', units: 1, dateAdded: '2023-05-15', strategy: 'Buy & Hold', financing: 'Conventional Loan', status: 'Current' },
  { id: 2, address: '456 Elm St', city: 'Shelbyville', state: 'IL', zip: '62565', price: 180000, sqft: 1200, type: 'Apt/Condo', units: 1, dateAdded: '2023-06-20', strategy: 'Fix & Flip', financing: 'Hard Money', status: 'Current' },
  { id: 3, address: '789 Oak Ave', city: 'Capital City', state: 'IL', zip: '62701', price: 350000, sqft: 2000, type: 'Multi Family', units: 3, dateAdded: '2023-04-10', strategy: 'BRRR', financing: 'Private Money', status: 'Current' },
]

const propertyTypeColors: { [key: string]: string } = {
  'Single Family': 'text-blue-800 bg-blue-100',
  'Apt/Condo': 'text-green-800 bg-green-100',
  'Multi Family': 'text-red-800 bg-red-100',
}

// Custom Toggle component
const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) => (
  <div className="flex items-center justify-between">
    <span>{label}</span>
    <button
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        checked ? 'bg-indigo-600' : 'bg-gray-200'
      }`}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
)

export default function Dashboard() {
  const [sortOption, setSortOption] = useState('Recently Added')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAnnual, setIsAnnual] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false)

  const summaryData = [
    { title: 'Total Units', value: isAnnual ? '144' : '12', change: '+2 from last month', Icon: Home },
    { title: 'Portfolio Value', value: isAnnual ? '$28.8M' : '$2.4M', change: '+15% from last year', Icon: PieChart },
    { title: 'Gross Revenue', value: isAnnual ? '$216.0K' : '$18.0K', change: '+5% from last month', Icon: DollarSign },
    { title: 'Cash Flow', value: isAnnual ? '$86.4K' : '$7.2K', change: '+8% from last month', Icon: BarChart },
    { title: 'Occupancy Rate', value: '95%', change: '+2% from last month', Icon: Users },
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleQuickActions = () => {
    setIsQuickActionsOpen(!isQuickActionsOpen)
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'} p-4 shadow-lg flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold">Doorstop</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-grow">
          <Link href="/">
            <Button key="Dashboard" variant="ghost" className="w-full justify-start mb-2">
              <PieChart className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/properties">
            <Button key="Properties" variant="ghost" className="w-full justify-start mb-2">
              <Home className="mr-2 h-4 w-4" />
              Properties
            </Button>
          </Link>
          {['Reporting', 'Deal Flow', 'Calculators'].map((item, index) => (
            <Button key={item} variant="ghost" className="w-full justify-start mb-2">
              {[BarChart, DollarSign, Users][index] && React.createElement([BarChart, DollarSign, Users][index], { className: "mr-2 h-4 w-4" })}
              {item}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-4" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                className={`pl-10 pr-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`} 
                placeholder="Search..." 
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 rounded-full transition-transform hover:scale-110 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={toggleQuickActions}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {summaryData.map(({ title, value, change, Icon }) => (
            <div key={title} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">{title}</h3>
                <Icon className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold mb-2">{value}</div>
              <p className="text-xs text-gray-500">{change}</p>
            </div>
          ))}
        </div>

        {/* Recent Properties */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow mb-8`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recent Properties</h2>
          </div>
          <div className="space-y-4">
            {properties.map((property) => (
              <div key={property.id} className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg shadow transition-all duration-300 hover:shadow-md ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}>
                <div className="flex items-center">
                  <div className={`w-16 h-16 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-md mr-4 flex items-center justify-center`}>
                    <Home className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{property.address}</h3>
                    <p className="text-sm text-gray-500">{property.city}, {property.state} {property.zip}</p>
                    <div className="flex items-center mt-1">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${propertyTypeColors[property.type]}`}>
                        {property.type}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">{property.strategy}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${property.price.toLocaleString()}</p>
                  <div className="flex items-center justify-end mt-1">
                    {property.units === 1 ? (
                      <>
                        <Maximize2 className="h-4 w-4 text-gray-400" />
                        <span className="ml-1 text-xs text-gray-500">{property.sqft} sqft</span>
                      </>
                    ) : (
                      <>
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="ml-1 text-xs text-gray-500">{property.units} units</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Link href="/properties">
              <Button variant="link">See All Properties</Button>
            </Link>
          </div>
        </div>

        {/* Placeholder for additional dashboard components */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
          <h2 className="text-2xl font-bold mb-4">Performance Overview</h2>
          <div className={`h-64 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
            <p className="text-gray-500">Performance chart placeholder</p>
          </div>
        </div>
      </main>

      {/* Quick Actions Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-md flex flex-col transition-transform duration-300 ease-in-out ${isQuickActionsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <Button variant="ghost" size="icon" onClick={toggleQuickActions}>
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
        <Toggle checked={isDarkMode} onChange={setIsDarkMode} label="Dark Mode" />
        <div className="mt-4">
          <Toggle checked={isAnnual} onChange={setIsAnnual} label={`${isAnnual ? 'Annual' : 'Monthly'} View`} />
        </div>
      </aside>
    </div>
  )
}