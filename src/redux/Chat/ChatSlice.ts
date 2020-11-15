import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageType, UserStatusMessagesType } from '../../types/MessagesType.d'

interface ChatState {
  userList: UserStatusMessagesType[]
  userSelected: number | null
  currentChat: MessageType[]
  loading: boolean
  message: string
  error: string
}

const initialState: ChatState = {
  userList: [],
  userSelected: null,
  currentChat: [],
  loading: false,
  message: '',
  error: '',
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    actionWaiting: (state) => {
      return {
        ...state,
        loading: true,
        message: '',
        error: '',
      }
    },

    userListSuccess: (state, action: PayloadAction<UserStatusMessagesType[]>) => {
      return {
        ...state,
        loading: false,
        userList: action.payload,
      }
    },

    selectUser: (state, action: PayloadAction<number | null>) => {
      return {
        ...state,
        userSelected: action.payload,
      }
    },

    currentChatAddHistory: (state, action: PayloadAction<MessageType[]>) => {
      const messages = action.payload

      return { ...state, loading: false, currentChat: messages }
    },

    currentChatAddMessage: (state, action: PayloadAction<MessageType>) => {
      const message = action.payload

      const messages = state.currentChat.concat(message)

      return { ...state, loading: false, currentChat: messages }
    },

    userFilter: (state, action: PayloadAction<string>) => {
      return { ...state, loading: false, userFilter: action.payload }
    },
  },
})

// Actions
export const {
  actionWaiting,
  userListSuccess,
  selectUser,
  userFilter,
  currentChatAddHistory,
  currentChatAddMessage,
} = chatSlice.actions

// Reducer
export default chatSlice.reducer