'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, Home, Maximize2, Menu, Building2, User, X, PieChart, BarChart, DollarSign, Users } from 'lucide-react'
import Link from 'next/link'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { PropertyDetailsPopover } from '@/components/property-details-popover'
import QuickActions from '@/components/QuickActions'

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
  { id: 4, address: '101 Pine Rd', city: 'Springfield', state: 'IL', zip: '62702', price: 220000, sqft: 1800, type: 'Single Family', units: 1, dateAdded: '2023-07-05', strategy: 'Short Term Rental', financing: 'VA/FHA Loan', status: 'Sold', bedrooms: 4, bathrooms: 2, amenities: ['Finished Basement', 'Recreation Space'] },
  { id: 5, address: '202 Cedar Ln', city: 'Shelbyville', state: 'IL', zip: '62565', price: 280000, sqft: 1600, type: 'Townhouse', units: 1, dateAdded: '2023-03-25', strategy: 'Wholesale', financing: 'Subject To', status: 'Current', bedrooms: 3, bathrooms: 2, amenities: ['Provided Lawncare', 'Fenced Yard'] },
  { id: 6, address: '303 Birch Blvd', city: 'Capital City', state: 'IL', zip: '62701', price: 400000, sqft: 2500, type: 'Commercial', units: 4, dateAdded: '2023-06-01', strategy: 'Commercial', financing: 'Commercial Loan', status: 'Current', bedrooms: 0, bathrooms: 2, amenities: ['Paid Utilities', 'Recreation Space'] },
]

// Custom Toggle component (same as in dashboard)
const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) => (
  <div className="flex items-center space-x-2">
    <Switch
      id="toggle"
      checked={checked}
      onCheckedChange={onChange}
    />
    <label
      htmlFor="toggle"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {label}
    </label>
  </div>
)

// Custom hook to handle clicks outside of a component
function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callback])
}

export default function PropertyDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTypes, setFilterTypes] = useState<string[]>([])
  const [filterStrategies, setFilterStrategies] = useState<string[]>([])
  const [filterFinancing, setFilterFinancing] = useState<string[]>([])
  const [filterBedrooms, setFilterBedrooms] = useState<string[]>([])
  const [filterBathrooms, setFilterBathrooms] = useState<string[]>([])
  const [filterAmenities, setFilterAmenities] = useState<string[]>([])
  const [sortOption, setSortOption] = useState('Recently Added')
  const [showAll, setShowAll] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAnnual, setIsAnnual] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useOutsideClick(dropdownRef, () => setOpenDropdown(null))

  // Function to toggle dropdown
  const toggleDropdown = (dropdownName: string) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(dropdownName)
    }
  }

  const filteredAndSortedProperties = properties
    .filter(property => 
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterTypes.length === 0 || filterTypes.includes(property.type)) &&
      (filterStrategies.length === 0 || filterStrategies.includes(property.strategy)) &&
      (filterFinancing.length === 0 || filterFinancing.includes(property.financing)) &&
      (filterBedrooms.length === 0 || filterBedrooms.includes(property.bedrooms.toString())) &&
      (filterBathrooms.length === 0 || filterBathrooms.includes(property.bathrooms.toString())) &&
      (filterAmenities.length === 0 || filterAmenities.every(amenity => property.amenities.includes(amenity))) &&
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
        case 'Units: Least to Most':
          return a.units - b.units
        case 'Units: Most to Least':
          return b.units - a.units
        default:
          return 0
      }
    })

  const propertyTypeColors = {
    'Single Family': 'text-blue-800 bg-blue-100',
    'Townhouse': 'text-purple-800 bg-purple-100',
    'Multi Family': 'text-red-800 bg-red-100',
    'Apt/Condo': 'text-green-800 bg-green-100',
    'Commercial': 'text-yellow-800 bg-yellow-100',
  }

  const resetAllFilters = () => {
    setFilterTypes([])
    setFilterStrategies([])
    setFilterFinancing([])
    setFilterBedrooms([])
    setFilterBathrooms([])
    setFilterAmenities([])
    setSortOption('Recently Added')
    setShowAll(true)
  }

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property)
  }

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
            <h1 className="text-3xl font-bold">Properties</h1>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                className={`pl-10 pr-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`} 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

        <div className="px-4 py-6 sm:px-0">
          <div className="mb-1 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center" ref={dropdownRef}>
              <DropdownMenu open={openDropdown === 'type'} onOpenChange={() => toggleDropdown('type')}>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="w-[180px]">Filter by type</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Property Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['Single Family', 'Multi Family', 'Apt/Condo', 'Townhouse', 'Commercial'].map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={filterTypes.includes(type)}
                      onCheckedChange={(checked: boolean) =>
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setFilterTypes([])}>
                    Reset Filter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu open={openDropdown === 'strategy'} onOpenChange={() => toggleDropdown('strategy')}>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="w-[180px]">Filter by strategy</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Investment Strategies</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['Buy & Hold', 'Fix & Flip', 'Short Term Rental', 'Wholesale', 'BRRR', 'Commercial', 'Land'].map((strategy) => (
                    <DropdownMenuCheckboxItem
                      key={strategy}
                      checked={filterStrategies.includes(strategy)}
                      onCheckedChange={(checked: boolean) =>
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setFilterStrategies([])}>
                    Reset Filter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu open={openDropdown === 'financing'} onOpenChange={() => toggleDropdown('financing')}>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="w-[180px]">Filter by financing</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Financing Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['Seller Financed', 'Subject To', 'Conventional Loan', 'Commercial Loan', 'Hard Money', 'Private Money', 'VA/FHA Loan', 'Syndication'].map((finance) => (
                    <DropdownMenuCheckboxItem
                      key={finance}
                      checked={filterFinancing.includes(finance)}
                      onCheckedChange={(checked: boolean) =>
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setFilterFinancing([])}>
                    Reset Filter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Select onValueChange={setSortOption} value={sortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recently Added">Recently Added</SelectItem>
                  <SelectItem value="Oldest First">Oldest First</SelectItem>
                  <SelectItem value="Value: Low to High">Value: Low to High</SelectItem>
                  <SelectItem value="Value: High to Low">Value: High to Low</SelectItem>
                  <SelectItem value="Units: Least to Most">Units: Least to Most</SelectItem>
                  <SelectItem value="Units: Most to Least">Units: Most to Least</SelectItem>
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

          <div className="mt-1 flex flex-wrap gap-4 items-center">
            <DropdownMenu open={openDropdown === 'bedrooms'} onOpenChange={() => toggleDropdown('bedrooms')}>
              <DropdownMenuTrigger>
                <Button variant="outline" className="w-[180px]">Filter by bedrooms</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Number of Bedrooms</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['1', '2', '3', '4', '5+'].map((bedrooms) => (
                  <DropdownMenuCheckboxItem
                    key={bedrooms}
                    checked={filterBedrooms.includes(bedrooms)}
                    onCheckedChange={(checked: boolean) =>
                      setFilterBedrooms(
                        checked
                          ? [...filterBedrooms, bedrooms]
                          : filterBedrooms.filter((b) => b !== bedrooms)
                      )
                    }
                  >
                    {bedrooms}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setFilterBedrooms([])}>
                  Reset Filter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu open={openDropdown === 'bathrooms'} onOpenChange={() => toggleDropdown('bathrooms')}>
              <DropdownMenuTrigger>
                <Button variant="outline" className="w-[180px]">Filter by bathrooms</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Number of Bathrooms</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['1', '2', '3', '4', '5+'].map((bathrooms) => (
                  <DropdownMenuCheckboxItem
                    key={bathrooms}
                    checked={filterBathrooms.includes(bathrooms)}
                    onCheckedChange={(checked: boolean) =>
                      setFilterBathrooms(
                        checked
                          ? [...filterBathrooms, bathrooms]
                          : filterBathrooms.filter((b) => b !== bathrooms)
                      )
                    }
                  >
                    {bathrooms}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setFilterBathrooms([])}>
                  Reset Filter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu open={openDropdown === 'amenities'} onOpenChange={() => toggleDropdown('amenities')}>
              <DropdownMenuTrigger>
                <Button variant="outline" className="w-[180px]">Filter by amenities</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Amenities</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['In-Unit Washer/Dryer', 'Washer/Dryer Hookups', 'Unfinished Basement', 'Finished Basement', 'ADU/Dwelling', 'Provided Lawncare', 'Paid Utilities', 'Recreation Space', 'Fenced Yard'].map((amenity) => (
                  <DropdownMenuCheckboxItem
                    key={amenity}
                    checked={filterAmenities.includes(amenity)}
                    onCheckedChange={(checked: boolean) =>
                      setFilterAmenities(
                        checked
                          ? [...filterAmenities, amenity]
                          : filterAmenities.filter((a) => a !== amenity)
                      )
                    }
                  >
                    {amenity}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setFilterAmenities([])}>
                  Reset Filter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="link"
              className="text-gray-500 hover:text-gray-700 underline"
              onClick={resetAllFilters}
            >
              Reset All
            </Button>
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
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${propertyTypeColors[property.type as keyof typeof propertyTypeColors]}`}>
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
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{property.strategy}</span>
                    <span className="text-sm text-gray-500">{property.financing}</span>
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
          {filteredAndSortedProperties.length > 0 ? (
            <div className="mt-8 flex justify-center">
              <Button variant="link" className="text-gray-500 hover:text-gray-700 underline">
                Load More
              </Button>
            </div>
          ) : (
            <div className="mt-8 text-center text-gray-500">
              No Results Found
            </div>
          )}
        </div>
      </main>

      {/* Quick Actions Sidebar */}
      <QuickActions 
        isOpen={isQuickActionsOpen}
        onClose={toggleQuickActions}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

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