export type UserRole = 'executive' | 'commercial' | 'engineering'

export interface DashboardMetricCard {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: string
}
