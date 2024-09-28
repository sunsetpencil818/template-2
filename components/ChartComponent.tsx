import { ChartData } from '../lib/api' // Updated import path

interface ChartComponentProps {
  data: ChartData;
}

export function ChartComponent({ data }: ChartComponentProps) {
  // Implement your chart rendering logic here
  return (
    <div>
      <h3>{data.title}</h3>
      <pre>{JSON.stringify(data.data, null, 2)}</pre>
    </div>
  );
}