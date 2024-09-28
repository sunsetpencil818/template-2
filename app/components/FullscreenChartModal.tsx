'use client'

import { useState, useEffect } from 'react'
import { CustomDialog, CustomDialogContent } from "../../components/ui/custom-dialog"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ChartComponent {
  title: string;
  component: React.ReactNode;
}

interface FullscreenChartModalProps {
  isOpen: boolean
  onClose: () => void
  charts: ChartComponent[]
  initialChartIndex: number
}

export function FullscreenChartModal({ isOpen, onClose, charts, initialChartIndex }: FullscreenChartModalProps) {
  const [currentChartIndex, setCurrentChartIndex] = useState(initialChartIndex)

  useEffect(() => {
    setCurrentChartIndex(initialChartIndex)
  }, [initialChartIndex])

  const handlePrevious = () => {
    setCurrentChartIndex((prev) => (prev - 1 + charts.length) % charts.length)
  }

  const handleNext = () => {
    setCurrentChartIndex((prev) => (prev + 1) % charts.length)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious()
      } else if (event.key === 'ArrowRight') {
        handleNext()
      } else if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <CustomDialog open={isOpen} onOpenChange={onClose}>
      <CustomDialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full flex items-center justify-center p-0">
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold mb-6">{charts[currentChartIndex].title}</h2>
          <div className="w-[calc(100%-4rem)] h-[calc(100%-8rem)] flex items-center justify-center">
            <div className="w-full h-full">
              {charts[currentChartIndex].component}
            </div>
          </div>
          <Button
            variant="ghost"
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </CustomDialogContent>
    </CustomDialog>
  )
}