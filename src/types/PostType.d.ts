export interface CommonPostType {
  content: string
  featuredPost: boolean
  tags?: TagType[]
  schedule?: ScheduleType
  images?: SourceType[]
  videos?: SourceType[]
  startDate?: Date | string
  endDate?: Date | string
}
export interface PostType extends CommonPostType {
  registerDate: string
  users: UserType // TODO: CHANGE NAME TO USER
}

export interface SourceType {
  name: string
  pathName: string
}

export interface TagType {
  id?: number
  tagName: string
}

export type ResourceType = 'IMAGE' | 'VIDEO'
