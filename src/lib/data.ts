export async function getProperties() {
  // Fetch properties from your data source
  return [
    { id: 1, address: '123 Main St', city: 'Springfield', state: 'IL', price: 250000 },
    { id: 2, address: '456 Elm St', city: 'Shelbyville', state: 'IL', price: 180000 },
    { id: 3, address: '789 Oak Ave', city: 'Capital City', state: 'IL', price: 350000 },
  ]
}

export async function getSummaryData() {
  // Fetch summary data from your data source
  return [
    { title: 'Total Properties', value: '3', change: '+1 from last month' },
    { title: 'Total Value', value: '$780,000', change: '+15% from last year' },
    { title: 'Average Price', value: '$260,000', change: '+5% from last month' },
  ]
}

export async function getPropertyTypeData() {
  // Fetch property type data from your data source
  return {
    labels: ['Single Family', 'Multi Family', 'Apartment', 'Townhouse'],
    data: [40, 30, 20, 10],
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
    ],
  }
}

export async function getRevenueData() {
  // Fetch revenue data from your data source
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [12000, 19000, 3000, 5000, 2000, 3000],
  }
}

export async function getUpcomingData() {
  // Fetch upcoming data from your data source
  return [
    { address: '123 Main St', dueDate: '2023-07-15', remainingBalance: 180000 },
    { address: '456 Elm St', dueDate: '2023-07-20', remainingBalance: 150000 },
    { address: '789 Oak Ave', dueDate: '2023-07-25', remainingBalance: 220000 },
  ]
}