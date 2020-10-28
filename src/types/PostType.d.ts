export interface PostType {
  content: string
  featuredPost: boolean
  hashTags?: string[]
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
  startDate: Date
  endDate: Date
}

export type ResourceType = 'IMAGE' | 'VIDEO'
