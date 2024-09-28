export interface ChartData {
  // Define your chart data structure here
  // For example:
  id: number;
  title: string;
  data: number[];
}

export async function fetchChartData(): Promise<ChartData[]> {
  // Implement your data fetching logic here
  // For now, let's return some dummy data
  return [
    { id: 1, title: 'Chart 1', data: [1, 2, 3, 4, 5] },
    { id: 2, title: 'Chart 2', data: [5, 4, 3, 2, 1] },
  ];
}