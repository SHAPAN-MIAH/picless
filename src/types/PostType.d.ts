import { CommonServiceResponse } from './CommonTypes.d'

export enum IMAGE_ORIENTATION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  square = 'square',
}

export type PrivacityType = 'PUBLIC' | 'PRIVATE'

export interface CommonPostType {
  id: number
  content: string
  featuredPost: boolean
  tags?: TagType[]
  schedule?: ScheduleType
  images?: SourceType[]
  videos?: SourceType[]
  startDate?: Date | string
  endDate?: Date | string
  privacity?: PrivacityType
  postType?: string
  amount?: number
}

export type ReactionCodeType = 'LIKE'

export interface PostReactionType {
  id?: number
  lastUser?: string
  quantity?: number
  reactionCode?: ReactionCodeType
}
export interface PostType extends CommonPostType {
  registerDate: string
  users: UserType // TODO: CHANGE NAME TO USER
  postReactions: PostReactionType[]
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
  iLikeIt?: boolean
  resized?: string
  registerDate?: string
  thumbnail?: string
  accessUrl?: string
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

export interface ServiceReactionPostType extends CommonServiceResponse {
  reactionId: number
}
