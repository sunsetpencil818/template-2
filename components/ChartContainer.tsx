'use client'

import { useState } from 'react'
import { FullscreenChartModal } from '../app/components/FullscreenChartModal'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ChartComponent {
  title: string;
  component: React.ReactNode;
}

interface ChartContainerProps {
  charts: ChartComponent[];
}

export function ChartContainer({ charts }: ChartContainerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedChartIndex, setSelectedChartIndex] = useState(0)
  const [currentChart, setCurrentChart] = useState(0)

  const handleChartClick = (index: number) => {
    setSelectedChartIndex(index)
    setIsModalOpen(true)
  }

  const nextChart = () => {
    setCurrentChart((prev) => (prev + 1) % charts.length)
  }

  const prevChart = () => {
    setCurrentChart((prev) => (prev - 1 + charts.length) % charts.length)
  }

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow group cursor-pointer" onClick={() => handleChartClick(currentChart)}>
        <h2 className="text-2xl font-bold mb-4">Stats</h2>
        <div className="relative h-80 py-4">
          <h3 className="text-xl font-semibold text-center mb-4">{charts[currentChart].title}</h3>
          <div className="h-64 px-14">
            {charts[currentChart].component}
          </div>
          <Button
            variant="ghost"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => { e.stopPropagation(); prevChart(); }}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => { e.stopPropagation(); nextChart(); }}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          {charts.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentChart ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <FullscreenChartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        charts={charts}
        initialChartIndex={selectedChartIndex}
      />
    </div>
  )
}