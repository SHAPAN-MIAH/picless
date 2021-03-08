import { CommonServiceResponse } from './CommonTypes'

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

export interface ServicePostType extends CommonServiceResponse {
  posts: PostType[]
}

export interface MediaType {
  id: number
  name: string
  pathName: string
  mediatype: string
  postId: number
  blocked: boolean
}

export interface ServiceMediaTypes extends CommonServiceResponse {
  mediaFiles: MediaType[]
}
