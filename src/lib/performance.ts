// Performance monitoring utilities for Emmdra Empire
// Provides lightweight performance tracking and logging

import { useEffect } from 'react'

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  metadata?: Record<string, unknown>
}

// Google Analytics gtag interface
interface GtagFunction {
  (command: string, eventName: string, parameters: Record<string, unknown>): void
}

declare global {
  interface Window {
    gtag?: GtagFunction
  }
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private isDevelopment = process.env.NODE_ENV === 'development'

  // Start performance measurement
  startTiming(name: string, metadata?: Record<string, unknown>): string {
    const id = `${name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    if (typeof window !== 'undefined' && window.performance) {
      const mark = `perf-${id}-start`
      window.performance.mark(mark)
    }

    if (this.isDevelopment) {
      console.log(`🚀 Performance: Starting ${name}`, metadata)
    }

    return id
  }

  // End performance measurement
  endTiming(id: string, metadata?: Record<string, unknown>): number {
    if (typeof window !== 'undefined' && window.performance) {
      const startMark = `perf-${id}-start`
      const endMark = `perf-${id}-end`

      try {
        window.performance.mark(endMark)
        window.performance.measure(id, startMark, endMark)

        const measure = window.performance.getEntriesByName(id)[0]
        if (measure) {
          const duration = measure.duration

          this.recordMetric({
            name: id.split('-')[0], // Get the original name
            value: duration,
            timestamp: Date.now(),
            metadata
          })

          if (this.isDevelopment) {
            console.log(`⏱️ Performance: ${id.split('-')[0]} took ${duration.toFixed(2)}ms`, metadata)
          }

          return duration
        }
      } catch (error) {
        console.warn('Performance measurement failed:', error)
      }
    }

    // Fallback timing
    const duration = Date.now() - parseInt(id.split('-')[1])
    this.recordMetric({
      name: id.split('-')[0], // Get the original name
      value: duration,
      timestamp: Date.now(),
      metadata
    })

    return duration
  }

  // Record custom metric
  recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric)

    // Keep only last 100 metrics to prevent memory leaks
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100)
    }

    // Send to analytics in production (if configured)
    if (!this.isDevelopment && typeof window !== 'undefined') {
      // Use gtag if available
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: metric.name,
          value: Math.round(metric.value),
          event_category: 'Performance'
        })
      }
    }
  }

  // Get recent metrics
  getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter(m => m.name.includes(name))
    }
    return [...this.metrics]
  }

  // Get average performance for a metric
  getAveragePerformance(name: string): number {
    const relevantMetrics = this.metrics.filter(m => m.name === name)
    if (relevantMetrics.length === 0) return 0

    const sum = relevantMetrics.reduce((acc, m) => acc + m.value, 0)
    return sum / relevantMetrics.length
  }

  // Clear all metrics
  clearMetrics() {
    this.metrics = []
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor()

// Utility functions for common performance measurements
export const measureAsync = async <T>(
  name: string,
  fn: () => Promise<T>,
  metadata?: Record<string, unknown>
): Promise<T> => {
  const id = performanceMonitor.startTiming(name, metadata)
  try {
    const result = await fn()
    performanceMonitor.endTiming(id, metadata)
    return result
  } catch (error) {
    performanceMonitor.endTiming(id, { ...metadata, error: true })
    throw error
  }
}

export const measureSync = <T>(
  name: string,
  fn: () => T,
  metadata?: Record<string, unknown>
): T => {
  const id = performanceMonitor.startTiming(name, metadata)
  try {
    const result = fn()
    performanceMonitor.endTiming(id, metadata)
    return result
  } catch (error) {
    performanceMonitor.endTiming(id, { ...metadata, error: true })
    throw error
  }
}

// React hooks for performance monitoring
export const usePerformanceLogging = (componentName: string) => {
  const mountTime = performanceMonitor.startTiming(`${componentName}-mount`)

  useEffect(() => {
    performanceMonitor.endTiming(mountTime)
    return () => {
      performanceMonitor.recordMetric({
        name: `${componentName}-unmount`,
        value: 0,
        timestamp: Date.now(),
        metadata: { timestamp: Date.now() }
      })
    }
  }, [componentName, mountTime])
}

// Common performance checkpoints
export const logPageLoad = (pageName: string) => {
  if (typeof window !== 'undefined') {
    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      performanceMonitor.recordMetric({
        name: `page-load-${pageName}`,
        value: navigation.loadEventEnd - navigation.fetchStart,
        timestamp: Date.now(),
        metadata: {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
        }
      })
    }
  }
}

export default performanceMonitor
