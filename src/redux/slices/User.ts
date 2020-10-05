import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Auth } from '@aws-amplify/auth'

import { AppThunk, RootState } from '../store'
import { UserAuthType } from '../../types/UserType'
//import UserService from 'services/UserService'

interface UserState {
  operation: string
  auth: UserAuthType
  data?: any
}

// interface ActionFail {
//   actionName: Action
//   errorMessage: string
// }

const initialState: UserState = {
  operation: '',
  auth: {
    token: '',
    email: '',
  },
}

export const userslice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    currentUserAuthenticatedSuccess: (state, action: PayloadAction<UserAuthType>) => {
      return {
        ...state,
        auth: action.payload,
      }
    },
  },
})

// Actions
export const { currentUserAuthenticatedSuccess } = userslice.actions

// Functions
export const currentUserAuthenticated = (): AppThunk => async (dispatch) => {
  await Auth.currentAuthenticatedUser()
    .then((user: any) => {
      if (user) {
        dispatch(currentUserAuthenticatedSuccess({ token: '', email: '' }))
      } else {
        dispatch(currentUserAuthenticatedSuccess({ token: '', email: '' }))
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

// export const getUserProfile = (): AppThunk => async (dispatch) => {
//   UserService.getUserProfile()
// }

// Values
export const user = (state: RootState) => state.user.auth

// Reducer
export default userslice.reducer
