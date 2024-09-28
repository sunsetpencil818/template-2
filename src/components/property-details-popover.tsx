'use client'

import React, { useState } from 'react'
import { X, Share2, Download, Maximize2, Calendar, PawPrint, DollarSign, Edit, Home, Users, Percent, Images, Expand, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PropertyDetailsPopoverProps {
  property: any;
  isOpen: boolean;
  onClose: () => void;
}

export function PropertyDetailsPopover({ property, isOpen, onClose }: PropertyDetailsPopoverProps) {
  const [basement, setBasement] = useState('Finished')
  const [adu, setAdu] = useState('No')
  const [washerDryerInUnit, setWasherDryerInUnit] = useState('No')
  const [washerDryerHookups, setWasherDryerHookups] = useState('Yes')
  const [refrigeratorIncluded, setRefrigeratorIncluded] = useState('Yes')
  const [fence, setFence] = useState('Yes')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Use a placeholder image if the property doesn't have any images
  const images = property.images || [`https://via.placeholder.com/400x200?text=Property+${property.id}`]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Download className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Edit className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Property Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center">
              {property.address}{' '}
              <span className="text-base font-normal text-muted-foreground">
                {property.city}, {property.state} {property.zip}
              </span>
            </h2>
            <div className="relative group">
              <img
                src={images[currentImageIndex]}
                alt={`Property at ${property.address}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              {images.length > 1 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="icon" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90">
                      <Images className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
                    {/* Image gallery content */}
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <div className="flex items-center">
                <Maximize2 className="h-5 w-5 text-muted-foreground mr-1" />
                <span>{property.sqft} sqft</span>
              </div>
              <div className="flex items-center">
                <Home className="h-5 w-5 text-muted-foreground mr-1" />
                <span>{property.type}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-muted-foreground mr-1" />
                <span>{property.units} {property.units > 1 ? 'units' : 'unit'}</span>
              </div>
              {property.yearBuilt && (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-1" />
                  <span>{property.yearBuilt}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-card rounded-lg p-4">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Purchase Price</TableCell>
                  <TableCell>${property.price.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Strategy</TableCell>
                  <TableCell>{property.strategy}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Financing</TableCell>
                  <TableCell>{property.financing}</TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Property Manager, Tenant Info, and Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Property Manager Card */}
          <Card>
            <CardHeader>
              <CardTitle>Property Manager</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Property manager details */}
            </CardContent>
          </Card>

          {/* Tenant Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tenant Information</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Tenant details */}
            </CardContent>
          </Card>

          {/* Performance Card */}
          <Card className="lg:col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Performance chart placeholder */}
            </CardContent>
          </Card>
        </div>

        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {/* Property details table with selects */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}