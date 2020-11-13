import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserStatusMessagesType } from '../../types/ChatType.d'

interface ChatState {
  userList: UserStatusMessagesType[]
  selectUser: number | null
  userFilter: string
  loading: boolean
  message: string
  error: string
}

const initialState: ChatState = {
  userList: [],
  selectUser: null,
  userFilter: '',
  loading: false,
  message: '',
  error: '',
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // actionFail: (state, action: PayloadAction<ActionFail>) => {
    //   return {
    //     ...state,
    //     operation: {
    //       action: action.payload.actionName,
    //       status: 'ERROR',
    //     },
    //     error: action.payload.errorMessage,
    //     message: '',
    //   }
    // },

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
        userList: action.payload,
      }
    },

    selectUser: (state, action: PayloadAction<number | null>) => {
      return {
        ...state,
        userSelected: action.payload,
      }
    },

    userFilter: (state, action: PayloadAction<string>) => {
      return { ...state, userFilter: action.payload }
    },
  },
})

// Actions
export const { actionWaiting, userListSuccess, selectUser, userFilter } = chatSlice.actions

// Reducer
export default chatSlice.reducer
