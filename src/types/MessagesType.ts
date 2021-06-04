export interface UserStatusMessagesType {
  userId: number
  fullName: string
  userName: string
  email: string
  avatarPicture: string
  lastMessage: string
  connectionId?: string
  lastMessageDate: string
  hasUnreadMessages?: boolean
  selected?: boolean
}

export interface MessageType {
  id?: number
  user: string
  message?: string
  content?: string // TODO: UNIFY THE TYPES IN BACKEND
  registerDate: string // TODO: Should change to registerDate?
  type: TypeMessageType
  senderUserId?: string
  receivedUserId?: string
  fromUserId?: string | number
  toUserId?: string | number
  connectionId?: string | null
}

export interface SingleMessageType {
  message: MessageType
  showAvatar?: boolean
  showTime?: boolean
}

export interface SingleMessageTypeRef extends SingleMessageType {
  key: string
  ref?: any
}

export interface OnReceiveMessageType {
  registerDate?: string
  message: string
  user: string
  toUserId?: string
  fromUserId: string
}

export type TypeMessageType = 'TEXT' | 'IMAGE' | 'IMAGE_TEXT' | 'TIP' | 'VIDEO' | 'VIDEO_TEXT'
