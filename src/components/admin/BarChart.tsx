'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface BarChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string[]
      borderColor: string[]
      borderWidth: number
    }[]
  }
  options?: {
    responsive?: boolean
    plugins?: {
      legend?: {
        position?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'chartArea'
        labels?: {
          font?: {
            size?: number
            weight?: number
          }
          color?: string
        }
      }
      title?: {
        display?: boolean
        text?: string
        font?: {
          size?: number
          weight?: number
        }
        color?: string
      }
    }
    scales?: {
      y?: {
        ticks?: {
          font?: {
            size?: number
            weight?: number
          }
          color?: string
        }
        grid?: {
          color?: string
        }
      }
      x?: {
        ticks?: {
          font?: {
            size?: number
            weight?: number
          }
          color?: string
        }
        grid?: {
          color?: string
        }
      }
    }
  }
}

export default function BarChart({ data, options }: BarChartProps) {
  return <Bar data={data} options={options} />
}
