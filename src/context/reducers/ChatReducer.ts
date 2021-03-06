import { MessageType, UserStatusMessagesType } from 'types/MessagesType'
import { isConstructorDeclaration } from 'typescript'
import { PostType } from '../../types/PostType.d'

export type StatusType = 'ONLINE' | 'OFFLINE'
export interface ChatState {
  loadingUsers: boolean
  loadingMessages: boolean
  users: UserStatusMessagesType[]
  currentChat: MessageType[]
}

export interface ChatAction {
  type: string
  payload?: any
}

export const initialState: ChatState = {
  loadingUsers: false,
  loadingMessages: false,
  users: [],
  currentChat: [],
}

export const ACTIONS = {
  LOADING_USERS: 'loading_users',
  LOADING_MESSAGES: 'loading_messages',
  SET_USERS: 'set_users',
  SET_SINGLE_USER: 'set_single_user',
  SELECT_USER: 'select_user',
  CHANGE_USER_STATUS: 'change_user_status',
  SET_CURRENT_CHAT: 'set_current_chat',
  SET_LAST_MESSAGE_AND_SET_UNREAD: 'set_last_message_and_set_unread',
  INSERT_MESSAGE_TO_CURRENT_CHAT: 'insert_message_to_current_chat',
  CLEAR: 'clear',
}

const ACTIONS_REDUCERS = {
  [ACTIONS.LOADING_USERS]: (state: ChatState) => ({
    ...state,
    loadingUsers: true,
  }),
  [ACTIONS.LOADING_MESSAGES]: (state: ChatState) => ({
    ...state,
    loadingMessages: true,
  }),
  [ACTIONS.SET_USERS]: (state: ChatState, action: ChatAction) => ({
    ...state,
    loadingUsers: false,
    users: action.payload as UserStatusMessagesType[],
  }),
  [ACTIONS.SET_SINGLE_USER]: (state: ChatState, action: ChatAction) => {
    const userList = [...state.users]
    const user = action.payload as UserStatusMessagesType

    userList.push({...user, connectionId: 'ONLINE', hasUnreadMessages: true})

    return {
      ...state,
      users: userList
    }
  },
  [ACTIONS.SELECT_USER]: (state: ChatState, action: ChatAction) => {
    const users = state.users.map((u) => {
      if(u.userId === action.payload as number){
        return {...u, selected: true}
      }
      return {...u, selected: false}
    })

    return {
      ...state,
      loadingUsers: false,
      users,
      currentChat: []
    }
    console.log(state)
  },
  [ACTIONS.CHANGE_USER_STATUS]: (state: ChatState, action: ChatAction) => {
    const {userId, status} = (action.payload as {userId: number, status: StatusType})

    const users = state.users.map((u) => {
      if(u.userId === userId){
        return {...u, connectionId: status.toLowerCase(), hasUnreadMessages: false}
      }
      return {...u}
    })

    return {
      ...state,
      loadingUsers: false,
      users,
    }
  },
  [ACTIONS.SET_CURRENT_CHAT]: (state: ChatState, action: ChatAction) => ({
    ...state,
    loadingMessages: false,
    currentChat: action.payload as MessageType[],
  }),
  
  [ACTIONS.SET_LAST_MESSAGE_AND_SET_UNREAD]: (state: ChatState, action: ChatAction) => {
    const {userId, message, dateMessage} = (action.payload as {userId: number, message: string, dateMessage: string})

    const users = state.users.map((u) => {
      if(u.userId === userId){
        return {...u, hasUnreadMessages: true, lastMessage: message, lastMessageDate: dateMessage }
      }
      return {...u}
    })

    return {
      ...state,
      loadingUsers: false,
      users,
    }
  },
  [ACTIONS.INSERT_MESSAGE_TO_CURRENT_CHAT]: (state: ChatState, action: ChatAction) => {
    const updatedChat = [...state.currentChat]
    updatedChat.push(action.payload as MessageType)

    return {
      ...state,
      currentChat: updatedChat
    }
  },

  [ACTIONS.CLEAR]: (state: ChatState) => ({
    ...state,
  }),
}

const reducer = (state: ChatState, action: ChatAction) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}

export default reducer
