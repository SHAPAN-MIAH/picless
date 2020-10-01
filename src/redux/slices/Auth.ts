import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Auth } from '@aws-amplify/auth'
import Utils from '../../utils/Functions'

import { AppThunk, RootState } from '../store'

type Action = 'LOGIN' | 'REGISTER' | 'CONFIRM_EMAIL' | 'SIGNOUT' | 'ISAUTHENTICATED' | 'UNKNOWN'

type Status = 'PENDING' | 'WAITING' | 'FINISHED' | 'ERROR'

interface ActuallyActionState {
  action: Action
  status: Status
}

interface AuthState {
  operation: ActuallyActionState
  isAuthenticated: boolean
  email: string | string
  error: string
  message: string
}

interface ActionFail {
  actionName: Action
  errorMessage: string
}

const initialState: AuthState = {
  operation: {
    action: 'UNKNOWN',
    status: 'PENDING',
  },
  isAuthenticated: false,
  error: '',
  message: '',
  email: '',
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

    actionWaiting: (state, action: PayloadAction<Action>) => {
      return {
        ...state,
        operation: {
          action: action.payload,
          status: 'WAITING',
        },
        error: '',
      }
    },

    loginSuccess: (state) => {
      localStorage.setItem('isAuthenticated', JSON.stringify(true))

      return {
        ...state,
        operation: {
          action: 'LOGIN',
          status: 'FINISHED',
        },
        isAuthenticated: true,
        error: '',
        message: 'authentication.messages.successfullyLoggedIn',
      }
    },

    registerSuccess: (state, action: PayloadAction<{ email: string; message: string }>) => {
      return {
        ...state,
        operation: {
          action: 'CONFIRM_EMAIL',
          status: 'PENDING',
        },
        isAuthenticated: false,
        email: action.payload.email,
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
        isAuthenticated: false,
        message: action.payload,
        error: '',
      }
    },

    signOutSuccess: (state) => {
      return {
        ...state,
        operation: {
          action: 'SIGNOUT',
          status: 'FINISHED',
        },
        isAuthenticated: false,
        message: 'Signed out',
        error: '',
      }
    },

    haveAccessSuccess: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        operation: {
          action: 'ISAUTHENTICATED',
          status: 'FINISHED',
        },
        isAuthenticated: action.payload,
      }
    },
  },
})

// Actions
export const {
  actionWaiting,
  actionFail,
  loginSuccess,
  registerSuccess,
  confirmSignUpSuccess,
  signOutSuccess,
  haveAccessSuccess,
} = authSlice.actions

// Functions
export const login = (username: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
  dispatch(actionWaiting('LOGIN'))

  if (username && password) {
    if (Utils.ValidateEmail(username)) {
      // SignIn cognito
      await Auth.signIn(username, password)
        .then((user): void => {
          if (user.attributes.email_verified) {
            user.getCachedDeviceKeyAndPassword()

            // Remember device
            if (rememberMe) {
              user.setDeviceStatusRemembered({
                onSuccess: (): void => {
                  dispatch(loginSuccess())
                },
                onFailure: (err: any) => {
                  dispatch(signOutSuccess())
                  dispatch(actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'LOGIN' }))
                },
              })
            } else {
              user.setDeviceStatusNotRemembered({
                onSuccess: (): void => {
                  dispatch(loginSuccess())
                },
                onFailure: (err: any) => {
                  dispatch(signOutSuccess())
                  dispatch(actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'LOGIN' }))
                },
              })
            }
          } else {
            dispatch(actionFail({ errorMessage: `authentication.errors.confirmYourEmailAccount`, actionName: 'LOGIN' }))
          }
        })
        .catch((err) => {
          if (err.code) {
            dispatch(actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'LOGIN' }))
          } else {
            dispatch(actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'LOGIN' }))
          }
        })
    } else {
      dispatch(actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'LOGIN' }))
    }
  } else {
    dispatch(actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'LOGIN' }))
  }
}

export const signOut = (): AppThunk => async (dispatch) => {
  await Auth.signOut().then(() => {
    dispatch(signOutSuccess())
  })
}

export const onlyAuth = (): AppThunk => async () => {
  await Auth.currentAuthenticatedUser()
    .then((data) => {
      data.listDevices(5, null, {
        onSuccess: (list: any): void => {
          console.log(list)
        },
        onFailure: (err: any) => {
          console.error(err)
        },
      })
    })
    .catch((err) => {
      console.error(err)
    })

  // await Auth.currentAuthenticatedUser()
  //   .then((data) => {
  //     console.log(data)
  //   })6
  //   .catch((err) => {
  //     console.error(err)
  //   })
}

export const haveAccess = (): AppThunk => async (dispatch) => {
  dispatch(actionWaiting('ISAUTHENTICATED'))

  await Auth.currentAuthenticatedUser()
    .then((user: any) => {
      if (user) {
        dispatch(haveAccessSuccess(true))
      } else {
        dispatch(haveAccessSuccess(false))
      }
    })
    .catch((err) => {
      dispatch(haveAccessSuccess(false))

      dispatch(actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'ISAUTHENTICATED' }))
    })
}

export const register = (username: string, password: string, repeatedPassword: string): AppThunk => async (dispatch) => {
  dispatch(actionWaiting('REGISTER'))

  if (username && password) {
    if (Utils.ValidateEmail(username)) {
      if (password === repeatedPassword) {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email: username,
          },
        })
          .then(() => {
            dispatch(
              registerSuccess({
                email: username,
                message: '',
              })
            )
          })
          .catch((err) => {
            if (err.code) {
              dispatch(actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'REGISTER' }))
            } else {
              dispatch(actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'REGISTER' }))
            }
          })
      } else {
        dispatch(actionFail({ errorMessage: `authentication.errors.passwordDoesntMatch`, actionName: 'REGISTER' }))
      }
    } else {
      dispatch(actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'REGISTER' }))
    }
  } else {
    dispatch(actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'REGISTER' }))
  }
}

export const confirmSignUp = (email: string, code: string): AppThunk => async (dispatch) => {
  dispatch(actionWaiting('CONFIRM_EMAIL'))

  if (email) {
    await Auth.confirmSignUp(email, code)
      .then(() => {
        dispatch(confirmSignUpSuccess(''))
      })
      .catch((err) => {
        if (err.code) {
          dispatch(actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'CONFIRM_EMAIL' }))
        } else {
          dispatch(actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'CONFIRM_EMAIL' }))
        }
      })
  }
}

export const resendConfirmationCode = (email: string): AppThunk => async (dispatch) => {
  dispatch(actionWaiting('CONFIRM_EMAIL'))

  if (email) {
    await Auth.resendSignUp(email)
      .then(() => {
        dispatch(
          registerSuccess({
            email,
            message: '',
          })
        )
      })
      .catch((err) => {
        if (err.code) {
          dispatch(actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'CONFIRM_EMAIL' }))
        } else {
          dispatch(actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'CONFIRM_EMAIL' }))
        }
      })
  }
}

// Values
export const getAction = (state: RootState) => state.auth.operation
export const emailSelected = (state: RootState): string => state.auth.email
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const messages = (state: RootState) => state.auth.message
export const errors = (state: RootState) => state.auth.error

// Reducer
export default authSlice.reducer
