import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ChatState {
  userList: []
  loading: boolean
  message: string
  error: string
}

const initialState: ChatState = {
  userList: [],
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

    userListSuccess: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        userList: action.payload,
      }
    },
  },
})

// Actions
export const { actionWaiting, userListSuccess } = chatSlice.actions

// Reducer
export default chatSlice.reducer
