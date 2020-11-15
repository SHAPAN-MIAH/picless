export interface UserStatusMessagesType {
  userId: number
  fullName: string
  userName: string
  email: string
  avatarPicture: string
  lastMessage: string
  connectionId?: string
  lastMessageDate: string
}

export interface MessageType {
  id?: number
  user: string
  message?: string
  content?: string // TODO: UNIFY THE TYPES IN BACKEND
  registerDate: string // TODO: Should change to registerDate?
  type: TypeMessageType
  senderUserId?: number
  receivedUserId?: number
  fromUserId?: number
  toUserId?: number
  connectionId?: string
}

export type TypeMessageType = 'TEXT' | 'IMAGE' | 'IMAGE_TEXT' | 'TIP' | 'VIDEO' | 'VIDEO_TEXT'
