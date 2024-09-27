"use client";

import React, { useState } from 'react'
import { Search, Home, PieChart, BarChart, DollarSign, Users, Menu, Building2, Maximize2 } from 'lucide-react'
import Link from 'next/link'

// Placeholder components (replace these with your actual UI library components)
const Input = ({ className, placeholder }: { className?: string, placeholder?: string }) => <input className={className} placeholder={placeholder} />;
const Button = ({ children, variant, size, className }: { children: React.ReactNode, variant?: string, size?: string, className?: string }) => <button className={className}>{children}</button>;
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>;
const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>;
const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => <h3 className={className}>{children}</h3>;
const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>;
const CardFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>;
const Avatar = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>;
const AvatarImage = ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} />;
const AvatarFallback = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const Select = ({ children, value, onValueChange }: { children: React.ReactNode, value: string, onValueChange: (value: string) => void }) => (
  <select value={value} onChange={(e) => onValueChange(e.target.value)}>{children}</select>
);
const SelectTrigger = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>;
const SelectValue = ({ placeholder }: { placeholder: string }) => <span>{placeholder}</span>;
const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectItem = ({ children, value }: { children: React.ReactNode, value: string }) => <option value={value}>{children}</option>;

// Mock data for properties (using a subset of the provided data)
const properties = [
  { id: 1, address: '123 Main St', city: 'Springfield', state: 'IL', zip: '62701', price: 250000, sqft: 1500, type: 'Single Family', units: 1, dateAdded: '2023-05-15', strategy: 'Buy & Hold', financing: 'Conventional Loan', status: 'Current' },
  { id: 2, address: '456 Elm St', city: 'Shelbyville', state: 'IL', zip: '62565', price: 180000, sqft: 1200, type: 'Apt/Condo', units: 1, dateAdded: '2023-06-20', strategy: 'Fix & Flip', financing: 'Hard Money', status: 'Current' },
  { id: 3, address: '789 Oak Ave', city: 'Capital City', state: 'IL', zip: '62701', price: 350000, sqft: 2000, type: 'Multi Family', units: 3, dateAdded: '2023-04-10', strategy: 'BRRR', financing: 'Private Money', status: 'Current' },
]

export default function Dashboard() {
  const [sortOption, setSortOption] = useState('Recently Added')

  const propertyTypeColors: { [key: string]: string } = {
    'Single Family': 'text-blue-800 bg-blue-100',
    'Apt/Condo': 'text-green-800 bg-green-100',
    'Multi Family': 'text-red-800 bg-red-100',
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-300 p-4 shadow-lg flex flex-col rounded-tr-[20px] rounded-br-[20px] relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-800">Doorstop</span>
          </div>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-grow">
          <Button variant="ghost" className="w-full justify-start mb-2">
            <PieChart className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Home className="mr-2 h-4 w-4" />
            Properties
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <BarChart className="mr-2 h-4 w-4" />
            Reporting
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <DollarSign className="mr-2 h-4 w-4" />
            Deal Flow
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Users className="mr-2 h-4 w-4" />
            Calculators
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center">
            <Input className="mr-2" placeholder="Search..." />
            <Button size="icon" variant="ghost" className="rounded-full transition-colors hover:bg-gray-200">
              <Search className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10 ml-2 transition-transform hover:scale-110">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="aspect-square">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Units</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-2 flex flex-col justify-between h-[calc(100%-56px)]">
              <div className="text-4xl font-bold mb-auto mt-auto">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card className="aspect-square">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-2 flex flex-col justify-between h-[calc(100%-56px)]">
              <div className="text-4xl font-bold mb-auto mt-auto">$2.4M</div>
              <p className="text-xs text-muted-foreground">+15% from last year</p>
            </CardContent>
          </Card>
          <Card className="aspect-square">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gross Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-2 flex flex-col justify-between h-[calc(100%-56px)]">
              <div className="text-4xl font-bold mb-auto mt-auto">$18.0K</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card className="aspect-square">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-2 flex flex-col justify-between h-[calc(100%-56px)]">
              <div className="text-4xl font-bold mb-auto mt-auto">$7.2K</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card className="aspect-square">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-2 flex flex-col justify-between h-[calc(100%-56px)]">
              <div className="text-4xl font-bold mb-auto mt-auto">95%</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Properties */}
        <Card className="mb-8">
          <CardHeader className="py-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Recent Properties</CardTitle>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectItem value="Recently Added">Recently Added</SelectItem>
                <SelectItem value="Oldest First">Oldest First</SelectItem>
                <SelectItem value="Value: Low to High">Value: Low to High</SelectItem>
                <SelectItem value="Value: High to Low">Value: High to Low</SelectItem>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
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
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${propertyTypeColors[property.type] || ''}`}>
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
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost" size="sm" className="underline">See All Properties</Button>
          </CardFooter>
        </Card>

        {/* Placeholder for additional dashboard components */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add a chart or graph component here */}
            <div className="h-64 bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Performance chart placeholder</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Quick Actions Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-2 mb-8">
          <Button className="w-full">
            Add Property
          </Button>
          <Button variant="outline" className="w-full">Generate Report</Button>
          <Button variant="outline" className="w-full">Show Map View</Button>
        </div>
        {/* Add more quick action components here */}
      </aside>
    </div>
  )
}