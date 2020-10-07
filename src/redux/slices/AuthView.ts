import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Auth } from '@aws-amplify/auth'
import Utils from '../../utils/Functions'

import { AppThunk, RootState } from '../store'
import { currentUserAuthenticated } from './User'

type Action =
  | 'LOGIN'
  | 'REGISTER'
  | 'CONFIRM_EMAIL'
  | 'CHANGE_PASSWORD'
  | 'FORGOT_PASSWORD_EMAIL'
  | 'FORGOT_PASSWORD_NEW_PASSWORD'
  | 'SIGNOUT'
  | 'ISAUTHENTICATED'
  | 'LIST_DEVICES'
  | 'UNKNOWN'

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
  listDevices: any
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
  listDevices: [],
}

export const authViewSlice = createSlice({
  name: 'authView',
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

    listDevicesSuccess: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        listDevices: action.payload,
        operation: {
          action: 'LOGIN',
          status: 'FINISHED',
        },
        isAuthenticated: true,
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
        isAuthenticated: true,
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

    forgotPasswordEmail: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        operation: {
          action: 'FORGOT_PASSWORD_EMAIL',
          status: 'PENDING',
        },
        isAuthenticated: false,
        email: action.payload,
        message: '',
        error: '',
      }
    },

    forgotPasswordNewPassword: (state) => {
      return {
        ...state,
        operation: {
          action: 'FORGOT_PASSWORD_NEW_PASSWORD',
          status: 'PENDING',
        },
        isAuthenticated: false,
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
        isAuthenticated: false,
        message: 'changePassword.messageSuccessfully',
        error: '',
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
  loginReady,
  forgotPasswordEmail,
  forgotPasswordNewPassword,
  changePasswordSuccess,
  listDevicesSuccess,
} = authViewSlice.actions

// Functions
export const showForgotPasswordEmail = (email: string): AppThunk => async (dispatch) => {
  dispatch(forgotPasswordEmail(email))
}

export const forgotPasswordSendCode = (email: string): AppThunk => async (dispatch) => {
  dispatch(actionWaiting('FORGOT_PASSWORD_EMAIL'))

  if (email) {
    if (Utils.ValidateEmail(email)) {
      await Auth.forgotPassword(email)
        .then(() => {
          dispatch(forgotPasswordNewPassword())
        })
        .catch((err) => {
          dispatch(actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'FORGOT_PASSWORD_EMAIL' }))
        })
    } else {
      dispatch(
        actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'FORGOT_PASSWORD_EMAIL' })
      )
    }
  } else {
    dispatch(
      actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'FORGOT_PASSWORD_EMAIL' })
    )
  }
}

export const resetPassword = (
  email: string,
  code: string,
  newPassword: string,
  repeatedPassword: string
): AppThunk => async (dispatch) => {
  dispatch(actionWaiting('FORGOT_PASSWORD_NEW_PASSWORD'))

  if (code) {
    if (newPassword === repeatedPassword) {
      await Auth.forgotPasswordSubmit(email, code, newPassword)
        .then(() => {
          dispatch(loginReady())
        })
        .catch((err) => {
          if (err.code) {
            dispatch(
              actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'FORGOT_PASSWORD_NEW_PASSWORD' })
            )
          } else {
            dispatch(
              actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'FORGOT_PASSWORD_NEW_PASSWORD' })
            )
          }
        })
    } else {
      dispatch(
        actionFail({ errorMessage: `authentication.errors.passwordDoesntMatch`, actionName: 'FORGOT_PASSWORD_NEW_PASSWORD' })
      )
    }
  } else {
    dispatch(
      actionFail({ errorMessage: `authentication.errors.emptyVerificationCode`, actionName: 'FORGOT_PASSWORD_NEW_PASSWORD' })
    )
  }
}

export const changePassword = (oldPassword: string, newPassword: string, repeatedPassword: string): AppThunk => async (
  dispatch
) => {
  dispatch(actionWaiting('CHANGE_PASSWORD'))

  if (oldPassword) {
    if (newPassword === repeatedPassword) {
      await Auth.currentAuthenticatedUser().then((user) => {
        Auth.changePassword(user, oldPassword, newPassword)
          .then(() => {
            dispatch(changePasswordSuccess())
          })
          .catch((err) => {
            if (err.code) {
              dispatch(actionFail({ errorMessage: `changePassword.errors.${err.code}`, actionName: 'CHANGE_PASSWORD' }))
            } else {
              dispatch(actionFail({ errorMessage: `changePassword.errors.UnknownError`, actionName: 'CHANGE_PASSWORD' }))
            }
          })
      })
    } else {
      dispatch(actionFail({ errorMessage: `changePassword.errors.passwordDoesntMatch`, actionName: 'CHANGE_PASSWORD' }))
    }
  } else {
    dispatch(actionFail({ errorMessage: `changePassword.errors.emptyOldPassword`, actionName: 'CHANGE_PASSWORD' }))
  }
}

export const login = (username: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
  dispatch(actionWaiting('LOGIN'))

  if (username && password) {
    if (Utils.ValidateEmail(username)) {
      // SignIn cognito
      await Auth.signIn(username, password)
        .then(async (user) => {
          // await Auth.currentSession().then((u) => {
          //   console.log(u)
          //   console.log(u.getIdToken().payload.email)
          // })

          // console.log('COGNITO_USER')
          // console.log(user)
          if (user.attributes.email_verified) {
            user.getCachedDeviceKeyAndPassword()

            // Remember device
            if (rememberMe) {
              user.setDeviceStatusRemembered({
                onSuccess: (): void => {
                  dispatch(loginSuccess())
                  // dispatch(currentUserAuthenticated())
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

export const getListDevices = (): AppThunk => async (dispatch) => {
  dispatch(actionWaiting('LIST_DEVICES'))

  await Auth.currentAuthenticatedUser()
    .then((data) => {
      data.listDevices(20, null, {
        onSuccess: (list: any): void => {
          dispatch(listDevicesSuccess(list.Devices))
        },
        onFailure: (err: any) => {
          dispatch(actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'LIST_DEVICES' }))
        },
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

// https://docs.amplify.aws/lib/auth/device_features/q/platform/ios#remember-device
// solo es posible olvidar este dispositivo en el que estoy logueado
// export const forgetDevice = (): AppThunk => async () => {
//   await Auth.currentAuthenticatedUser()
//     .then((data) => {
//       data.forgetDevice({
//         onSuccess: (data: any): void => {
//           console.log(data)
//         },
//         onFailure: (err: any) => {
//           console.error(err)
//         },
//       })
//     })
//     .catch((err) => {
//       console.error(err)
//     })
// }

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
    if (code) {
      await Auth.confirmSignUp(email, code)
        .then(() => {
          //dispatch(confirmSignUpSuccess('authentication.messages.RegisterSuccessfully'))
          dispatch(confirmSignUpSuccess('authentication.messageRegisterSuccessfully'))
        })
        .catch((err) => {
          if (err.code) {
            dispatch(actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'CONFIRM_EMAIL' }))
          } else {
            dispatch(actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'CONFIRM_EMAIL' }))
          }
        })
    } else {
      dispatch(actionFail({ errorMessage: `authentication.errors.emptyVerificationCode`, actionName: 'CONFIRM_EMAIL' }))
    }
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
export const getAction = (state: RootState) => state.authView.operation
export const emailSelected = (state: RootState): string => state.authView.email
export const messages = (state: RootState) => state.authView.message
export const errors = (state: RootState) => state.authView.error
export const listDevices = (state: RootState) => state.authView.listDevices

// Reducer
export default authViewSlice.reducer
