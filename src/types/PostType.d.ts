export interface PostType {
  content: string
  featuredPost: boolean
  tags?: string[]
  schedule?: ScheduleType
  resources: ResourcesType
}

export interface ResourcesType {
  images?: SourceType[]
  videos?: SourceType[]
}

export interface SourceType {
  name: string
  pathName: string
}

export interface ScheduleType {
  startDate?: Date | string
  endDate?: Date | string
}

export type ResourceType = 'IMAGE' | 'VIDEO'
