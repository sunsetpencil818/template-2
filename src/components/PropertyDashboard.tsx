'use client'

import React, { useState } from 'react'
import { Search, Home, Maximize2, Menu, Building2, User } from 'lucide-react'
import Link from 'next/link'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { PropertyDetailsPopover } from '@/components/property-details-popover'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

// Mock data for properties
const properties = [
  { id: 1, address: '123 Main St', city: 'Springfield', state: 'IL', zip: '62701', price: 250000, sqft: 1500, type: 'Single Family', units: 1, dateAdded: '2023-05-15', strategy: 'Buy & Hold', financing: 'Conventional Loan', status: 'Current', bedrooms: 3, bathrooms: 2, amenities: ['Unfinished Basement', 'Fenced Yard'] },
  { id: 2, address: '456 Elm St', city: 'Shelbyville', state: 'IL', zip: '62565', price: 180000, sqft: 1200, type: 'Apt/Condo', units: 1, dateAdded: '2023-06-20', strategy: 'Fix & Flip', financing: 'Hard Money', status: 'Current', bedrooms: 2, bathrooms: 1, amenities: ['In-Unit Washer/Dryer', 'Paid Utilities'] },
  { id: 3, address: '789 Oak Ave', city: 'Capital City', state: 'IL', zip: '62701', price: 350000, sqft: 2000, type: 'Multi Family', units: 3, dateAdded: '2023-04-10', strategy: 'BRRR', financing: 'Private Money', status: 'Current', bedrooms: 5, bathrooms: 3, amenities: ['Washer/Dryer Hookups', 'ADU/Dwelling'] },
]

const propertyTypeColors: { [key: string]: string } = {
  'Single Family': 'text-blue-800 bg-blue-100',
  'Apt/Condo': 'text-green-800 bg-green-100',
  'Multi Family': 'text-red-800 bg-red-100',
}

const PropertyDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTypes, setFilterTypes] = useState<string[]>([])
  const [filterStrategies, setFilterStrategies] = useState<string[]>([])
  const [filterFinancing, setFilterFinancing] = useState<string[]>([])
  const [sortOption, setSortOption] = useState('Recently Added')
  const [showAll, setShowAll] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null)

  const filteredAndSortedProperties = properties
    .filter(property => 
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterTypes.length === 0 || filterTypes.includes(property.type)) &&
      (filterStrategies.length === 0 || filterStrategies.includes(property.strategy)) &&
      (filterFinancing.length === 0 || filterFinancing.includes(property.financing)) &&
      (showAll || property.status === 'Current')
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'Recently Added':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        case 'Oldest First':
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        case 'Value: Low to High':
          return a.price - b.price
        case 'Value: High to Low':
          return b.price - a.price
        default:
          return 0
      }
    })

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Home className="h-8 w-8 text-blue-500" />
              </Link>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                <Link href="/properties" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Properties</Link>
              </div>
            </div>
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search properties..."
                className="mr-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button size="icon" variant="ghost">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-4 flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Filter by type</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {['Single Family', 'Multi Family', 'Apt/Condo'].map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={filterTypes.includes(type)}
                      onCheckedChange={(checked) =>
                        setFilterTypes(
                          checked
                            ? [...filterTypes, type]
                            : filterTypes.filter((t) => t !== type)
                        )
                      }
                    >
                      {type}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Filter by strategy</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {['Buy & Hold', 'Fix & Flip', 'BRRR'].map((strategy) => (
                    <DropdownMenuCheckboxItem
                      key={strategy}
                      checked={filterStrategies.includes(strategy)}
                      onCheckedChange={(checked) =>
                        setFilterStrategies(
                          checked
                            ? [...filterStrategies, strategy]
                            : filterStrategies.filter((s) => s !== strategy)
                        )
                      }
                    >
                      {strategy}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Filter by financing</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {['Conventional Loan', 'Hard Money', 'Private Money'].map((finance) => (
                    <DropdownMenuCheckboxItem
                      key={finance}
                      checked={filterFinancing.includes(finance)}
                      onCheckedChange={(checked) =>
                        setFilterFinancing(
                          checked
                            ? [...filterFinancing, finance]
                            : filterFinancing.filter((f) => f !== finance)
                        )
                      }
                    >
                      {finance}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recently Added">Recently Added</SelectItem>
                  <SelectItem value="Oldest First">Oldest First</SelectItem>
                  <SelectItem value="Value: Low to High">Value: Low to High</SelectItem>
                  <SelectItem value="Value: High to Low">Value: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${!showAll ? 'font-medium' : ''}`}>Current</span>
              <Switch
                checked={showAll}
                onCheckedChange={setShowAll}
              />
              <span className={`text-sm ${showAll ? 'font-medium' : ''}`}>All</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedProperties.map((property) => (
              <Card 
                key={property.id} 
                className="bg-white shadow rounded-lg overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
                onClick={() => handlePropertyClick(property)}
              >
                <img
                  src={`https://via.placeholder.com/400x200?text=Property+${property.id}`}
                  alt={`Property at ${property.address}`}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-medium text-gray-900">{property.address}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${propertyTypeColors[property.type]}`}>
                      {property.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{property.city}, {property.state} {property.zip}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">${property.price.toLocaleString()}</span>
                    <div className="flex items-center">
                      {property.units === 1 ? (
                        <>
                          <Maximize2 className="h-5 w-5 text-gray-400" />
                          <span className="ml-1 text-sm text-gray-500">{property.sqft} sqft</span>
                        </>
                      ) : (
                        <>
                          <Building2 className="h-5 w-5 text-gray-400" />
                          <span className="ml-1 text-sm text-gray-500">{property.units} units</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 px-4 py-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePropertyClick(property)
                    }}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {selectedProperty && (
        <PropertyDetailsPopover
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  )
}

export default PropertyDashboard