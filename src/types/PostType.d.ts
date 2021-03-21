import { CommonServiceResponse } from './CommonTypes.d'

export enum IMAGE_ORIENTATION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  square = 'square',
}

export interface CommonPostType {
  content: string
  featuredPost: boolean
  tags?: TagType[]
  schedule?: ScheduleType
  images?: SourceType[]
  videos?: SourceType[]
  startDate?: Date | string
  endDate?: Date | string
  postType?: string
}
export interface PostType extends CommonPostType {
  registerDate: string
  users: UserType // TODO: CHANGE NAME TO USER
}

export interface SourceType {
  id?: number
  name: string
  pathName: string
  width?: number
  height?: number
  orientation?: IMAGE_ORIENTATION
  original?: string
  pathName?: string
  postId?: number
  resized?: string
  thumbnail?: string
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
  mediaFiles: SourceType[]
}

export interface ServiceSinglePostType extends CommonServiceResponse {
  post: PostType
}
