export type ProjectStatus = 'Completed' | 'Active' | 'On Going' | 'Planned' | 'Cancelled'

export interface ProjectItem {
  id: string
  title: string
  client: string
  description: string
  industry: string
  technologies: string[]
  status: ProjectStatus
  image: string
  updatedAt: string
}

export type ViewMode = 'grid' | 'table'

export interface PortfolioFilterState {
  search: string
  industry: string
  technology: string
  year: string
  status: string
}
