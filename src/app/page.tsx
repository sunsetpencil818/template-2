import { Suspense } from 'react'
import DashboardClient from './DashboardClient'
import { getProperties, getSummaryData, getPropertyTypeData, getRevenueData, getUpcomingData } from '../lib/data'

export default async function DashboardPage() {
  const properties = await getProperties()
  const summaryData = await getSummaryData()
  const propertyTypeData = await getPropertyTypeData()
  const revenueData = await getRevenueData()
  const upcomingData = await getUpcomingData()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardClient
        properties={properties}
        summaryData={summaryData}
        propertyTypeData={propertyTypeData}
        revenueData={revenueData}
        upcomingData={upcomingData}
      />
    </Suspense>
  )
}