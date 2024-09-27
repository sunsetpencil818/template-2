'use client'

import React, { useState } from 'react'
import { Search, Home, PieChart, BarChart, DollarSign, Users, Menu, Building2, Maximize2 } from 'lucide-react'
import Link from 'next/link'

// Mock data for properties (using a subset of the provided data)
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

export default function Dashboard() {
  const [sortOption, setSortOption] = useState('Recently Added')

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-300 p-4 shadow-lg flex flex-col rounded-tr-[20px] rounded-br-[20px] relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-800">Doorstop</span>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-grow">
          {['Dashboard', 'Properties', 'Reporting', 'Deal Flow', 'Calculators'].map((item, index) => (
            <button key={item} className="w-full text-left py-2 px-4 rounded hover:bg-gray-200 mb-2 flex items-center">
              {[PieChart, Home, BarChart, DollarSign, Users][index] && React.createElement([PieChart, Home, BarChart, DollarSign, Users][index], { className: "mr-2 h-4 w-4" })}
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center">
            <input className="mr-2 p-2 border rounded" placeholder="Search..." />
            <button className="p-2 rounded-full hover:bg-gray-200">
              <Search className="h-4 w-4" />
            </button>
            <div className="h-10 w-10 ml-2 bg-gray-300 rounded-full flex items-center justify-center">
              U
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { title: 'Total Units', value: '12', change: '+2 from last month', Icon: Home },
            { title: 'Portfolio Value', value: '$2.4M', change: '+15% from last year', Icon: PieChart },
            { title: 'Gross Revenue', value: '$18.0K', change: '+5% from last month', Icon: DollarSign },
            { title: 'Cash Flow', value: '$7.2K', change: '+8% from last month', Icon: BarChart },
            { title: 'Occupancy Rate', value: '95%', change: '+2% from last month', Icon: Users },
          ].map(({ title, value, change, Icon }) => (
            <div key={title} className="bg-white p-4 rounded-lg shadow">
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
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recent Properties</h2>
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="Recently Added">Recently Added</option>
              <option value="Oldest First">Oldest First</option>
              <option value="Value: Low to High">Value: Low to High</option>
              <option value="Value: High to Low">Value: High to Low</option>
            </select>
          </div>
          <div className="space-y-4">
            {properties.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow transition-all duration-300 hover:shadow-md hover:bg-gray-100">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex items-center justify-center">
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
            <button className="text-blue-600 underline">See All Properties</button>
          </div>
        </div>

        {/* Placeholder for additional dashboard components */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Performance Overview</h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Performance chart placeholder</p>
          </div>
        </div>
      </main>

      {/* Quick Actions Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-2 mb-8">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Add Property
          </button>
          <button className="w-full border border-gray-300 py-2 px-4 rounded hover:bg-gray-100">
            Generate Report
          </button>
          <button className="w-full border border-gray-300 py-2 px-4 rounded hover:bg-gray-100">
            Show Map View
          </button>
        </div>
        {/* Add more quick action components here */}
      </aside>
    </div>
  )
}