import { MessageType, UserStatusMessagesType } from 'types/MessagesType'
import { isConstructorDeclaration } from 'typescript'
import { PostType } from '../../types/PostType.d'

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
  SELECT_USER: 'select_user',
  CHANGE_USER_STATUS: 'change_user_status',
  SET_CURRENT_CHAT: 'set_current_chat',
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
  },
  [ACTIONS.CHANGE_USER_STATUS]: (state: ChatState, action: ChatAction) => ({
    ...state,
  }),
  [ACTIONS.SET_CURRENT_CHAT]: (state: ChatState, action: ChatAction) => ({
    ...state,
    loadingMessages: false,
    currentChat: action.payload as MessageType[],
  }),
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
