'use client'

import { useState } from 'react'
import { FullscreenChartModal } from './FullscreenChartModal'
import { useQuery } from '@tanstack/react-query'
import { ChartData, fetchChartData } from '../../lib/api'
import { ChartComponent } from '../../components/ChartComponent'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function ChartContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedChartIndex, setSelectedChartIndex] = useState(0)

  const { data: chartData, isLoading, error } = useQuery<ChartData[]>({
    queryKey: ['chartData'],
    queryFn: fetchChartData
  })

  const handleChartClick = (index: number) => {
    setSelectedChartIndex(index)
    setIsModalOpen(true)
  }

  if (isLoading) return <div>Loading charts...</div>
  if (error) return <div>Error loading charts</div>

  const chartComponents = chartData?.map((data, index) => ({
    title: data.title,
    component: (
      <div key={index} onClick={() => handleChartClick(index)} className="cursor-pointer border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <ChartComponent data={data} />
      </div>
    )
  }))

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chartComponents?.map(chart => chart.component)}
      </div>
      {chartComponents && chartComponents.length > 0 && (
        <FullscreenChartModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          charts={chartComponents}
          initialChartIndex={selectedChartIndex}
        />
      )}
      <div className="mt-4 flex justify-center">
        <Link href="/all-charts" passHref>
          <Button asChild>
            <a>View All Charts</a>
          </Button>
        </Link>
      </div>
    </div>
  )
}