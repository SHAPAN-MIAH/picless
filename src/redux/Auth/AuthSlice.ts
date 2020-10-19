import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActionFail, AuthState, Screen, UserAuthorization } from '../../types/AuthTypeSlice.d'

const initialState: AuthState = {
  operation: {
    action: 'UNKNOWN',
    status: 'PENDING',
  },
  user: {
    email: '',
    token: '',
  },
  listDevices: [],
  message: '',
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    actionFail: (state, action: PayloadAction<ActionFail>) => {
      return {
        ...state,
        operation: {
          action: action.payload.actionName,
          status: 'ERROR',
        },
        error: action.payload.errorMessage,
        message: '',
      }
    },

    actionWaiting: (state, action: PayloadAction<Screen>) => {
      return {
        ...state,
        operation: {
          action: action.payload,
          status: 'WAITING',
        },
        error: '',
      }
    },

    loginSuccess: (state, action: PayloadAction<UserAuthorization>) => {
      return {
        ...state,
        operation: {
          action: 'LOGIN',
          status: 'FINISHED',
        },
        user: action.payload,
        error: '',
        message: 'authentication.messages.successfullyLoggedIn',
      }
    },

    listDevicesSuccess: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        listDevices: action.payload,
        operation: {
          action: 'LOGIN',
          status: 'FINISHED',
        },

        error: '',
        message: '',
      }
    },

    loginReady: (state) => {
      return {
        ...state,
        operation: {
          action: 'LOGIN',
          status: 'PENDING',
        },
        error: '',
        message: 'authentication.messages.successfullyPasswordReset',
      }
    },

    registerSuccess: (state, action: PayloadAction<{ email: string; message: string }>) => {
      return {
        ...state,
        operation: {
          action: 'CONFIRM_EMAIL',
          status: 'PENDING',
        },
        user: {
          email: action.payload.email,
        },
        message: action.payload.message,
        error: '',
      }
    },

    confirmSignUpSuccess: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        operation: {
          action: 'CONFIRM_EMAIL',
          status: 'FINISHED',
        },
        message: action.payload,
        error: '',
      }
    },

    signOutSuccess: () => {
      return initialState
    },

    forgotPasswordEmail: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        operation: {
          action: 'FORGOT_PASSWORD_EMAIL',
          status: 'PENDING',
        },
        user: {
          email: action.payload,
        },
        message: '',
        error: '',
      }
    },

    forgotPasswordNewPassword: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        operation: {
          action: 'FORGOT_PASSWORD_NEW_PASSWORD',
          status: 'PENDING',
        },
        user: {
          email: action.payload,
        },
        message: '',
        error: '',
      }
    },

    changePasswordSuccess: (state) => {
      return {
        ...state,
        operation: {
          action: 'CHANGE_PASSWORD',
          status: 'FINISHED',
        },
        message: 'changePassword.messageSuccessfully',
        error: '',
      }
    },

    checkUserAuthenticatedSuccess: (state, action: PayloadAction<UserAuthorization>) => {
      return {
        ...state,
        user: action.payload,
        message: '',
        error: '',
      }
    },
  },
})

// Actions
export const {
  actionWaiting,
  actionFail,
  loginReady,
  loginSuccess,
  registerSuccess,
  confirmSignUpSuccess,
  forgotPasswordEmail,
  forgotPasswordNewPassword,
  changePasswordSuccess,
  listDevicesSuccess,
  checkUserAuthenticatedSuccess,
  signOutSuccess,
} = authSlice.actions

// Reducer
export default authSlice.reducer
