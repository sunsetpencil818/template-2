'use client'

import React, { useState, useEffect } from 'react'
import { Search, Home, PieChart, BarChart, DollarSign, Users, Menu, X, Building2, Maximize2, Bell, User, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import QuickActions from '@/components/QuickActions'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

interface DashboardClientProps {
  properties: any[];
  summaryData: any[];
  propertyTypeData: any;
  revenueData: any;
  upcomingData: any[];
}

export default function DashboardClient({ 
  properties, 
  summaryData, 
  propertyTypeData, 
  revenueData, 
  upcomingData 
}: DashboardClientProps) {
  const [sortOption, setSortOption] = useState('Recently Added')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAnnual, setIsAnnual] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false)
  const [currentChart, setCurrentChart] = useState(0)
  const [formattedPropertyTypeData, setFormattedPropertyTypeData] = useState<any>(null)
  const [formattedRevenueData, setFormattedRevenueData] = useState<any>(null)

  useEffect(() => {
    if (propertyTypeData && propertyTypeData.labels && propertyTypeData.data) {
      setFormattedPropertyTypeData({
        labels: propertyTypeData.labels,
        datasets: [{
          data: propertyTypeData.data,
          backgroundColor: propertyTypeData.backgroundColor || [],
          borderColor: propertyTypeData.borderColor || [],
          borderWidth: 1,
        }]
      })
    }

    if (revenueData && revenueData.labels && revenueData.data) {
      setFormattedRevenueData({
        labels: revenueData.labels,
        datasets: [{
          label: 'Revenue',
          data: revenueData.data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      })
    }
  }, [propertyTypeData, revenueData])

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const },
      title: { display: true, text: 'Property Types Distribution' },
    },
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Monthly Revenue' },
    },
  }

  const chartComponents = [
    { 
      title: 'Property Types', 
      component: formattedPropertyTypeData ? (
        <div style={{ height: '300px' }}>
          <Pie data={formattedPropertyTypeData} options={pieOptions} />
        </div>
      ) : null 
    },
    { 
      title: 'Monthly Revenue', 
      component: formattedRevenueData ? (
        <div style={{ height: '300px' }}>
          <Bar data={formattedRevenueData} options={barOptions} />
        </div>
      ) : null 
    },
  ]

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleQuickActions = () => setIsQuickActionsOpen(!isQuickActionsOpen)
  const nextChart = () => setCurrentChart((prev) => (prev + 1) % chartComponents.length)
  const prevChart = () => setCurrentChart((prev) => (prev - 1 + chartComponents.length) % chartComponents.length)

  // Define an array of icons to use for summary cards
  const summaryIcons = [Home, PieChart, BarChart, DollarSign, Users];

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
            <Button variant="ghost" className="w-full justify-start mb-2">
              <PieChart className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/properties">
            <Button variant="ghost" className="w-full justify-start mb-2">
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
          {[
            { title: 'Total Units', value: '144', change: '+2 from last month', Icon: Home },
            { title: 'Portfolio Value', value: '$28.8M', change: '+15% from last year', Icon: PieChart },
            { title: 'Gross Revenue', value: '$216.0K', change: '+5% from last month', Icon: BarChart },
            { title: 'Cash Flow', value: '$86.4K', change: '+8% from last month', Icon: DollarSign },
            { title: 'Occupancy Rate', value: '95%', change: '+2% from last month', Icon: Users },
          ].map(({ title, value, change, Icon }, index) => (
            <div key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">{title}</h3>
                <Icon className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold mb-2">{value}</div>
              <p className="text-xs text-gray-500">{change}</p>
            </div>
          ))}
        </div>

        {/* Recent Properties and Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Properties */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recent Properties</h2>
            </div>
            <div className="space-y-4">
              {properties.slice(0, 3).map((property) => (
                <div key={property.id} className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg shadow`}>
                  <div>
                    <h3 className="font-semibold">{property.address}</h3>
                    <p className="text-sm text-gray-500">{property.city}, {property.state}</p>
                  </div>
                  <p className="font-semibold">${property.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/properties">
                <span className={`inline-block px-4 py-2 rounded-md ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'} transition-colors duration-200 cursor-pointer`}>
                  See All
                </span>
              </Link>
            </div>
          </div>

          {/* Stats Card */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{chartComponents[currentChart].title}</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={prevChart}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextChart}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div style={{ height: '300px' }}>
              {chartComponents[currentChart].component}
            </div>
          </div>
        </div>

        {/* Upcoming Card */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow mt-8`}>
          <h2 className="text-2xl font-bold mb-4">Upcoming</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <th className="p-2 text-left">Property Address</th>
                  <th className="p-2 text-left">Due Date</th>
                  <th className="p-2 text-left">Remaining Loan Balance</th>
                </tr>
              </thead>
              <tbody>
                {upcomingData.map((item, index) => (
                  <tr key={index} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <td className="p-2">{item.address}</td>
                    <td className="p-2">{item.dueDate}</td>
                    <td className="p-2">${item.remainingBalance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6">
            <Link href="/upcoming">
              <span className={`inline-block px-4 py-2 rounded-md ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'} transition-colors duration-200 cursor-pointer`}>
                Show More
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* Quick Actions Sidebar */}
      <QuickActions 
        isOpen={isQuickActionsOpen}
        onClose={toggleQuickActions}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </div>
  )
}