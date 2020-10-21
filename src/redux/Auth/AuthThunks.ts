import { Auth } from '@aws-amplify/auth'
import { AppThunk } from '../store'
import * as Actions from './AuthSlice'

import { getProfile } from '../User/UserThunks'
import * as UserActions from '../User/UserSlice'

import * as Utils from '../../utils/Functions'

export const checkUserAuthenticated = (): AppThunk => async (dispatch) => {
  try {
    await Auth.currentSession()
      .then(async (user) => {
        const userTokenId = await user.getIdToken()

        const token = userTokenId.getJwtToken()
        const { email } = userTokenId.payload

        dispatch(Actions.checkUserAuthenticatedSuccess({ email, token }))
      })
      .catch((err) => {
        console.log(err)
        dispatch(Actions.signOutSuccess())
        dispatch(UserActions.cleanSignOutSuccess())
      })
  } catch (err) {
    console.log(err)
  }
}

export const showForgotPasswordEmail = (email: string): AppThunk => async (dispatch) => {
  dispatch(Actions.forgotPasswordEmail(email))
}

export const forgotPasswordSendCode = (email: string): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting('FORGOT_PASSWORD_EMAIL'))

  if (email) {
    if (Utils.ValidateEmail(email)) {
      await Auth.forgotPassword(email)
        .then(() => {
          dispatch(Actions.forgotPasswordNewPassword(email))
        })
        .catch((err) => {
          dispatch(
            Actions.actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'FORGOT_PASSWORD_EMAIL' })
          )
        })
    } else {
      dispatch(
        Actions.actionFail({
          errorMessage: `authentication.errors.enterValidEmailAddress`,
          actionName: 'FORGOT_PASSWORD_EMAIL',
        })
      )
    }
  } else {
    dispatch(
      Actions.actionFail({
        errorMessage: `authentication.errors.enterValidEmailAddress`,
        actionName: 'FORGOT_PASSWORD_EMAIL',
      })
    )
  }
}

export const resetPassword = (
  email: string,
  code: string,
  newPassword: string,
  repeatedPassword: string
): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting('FORGOT_PASSWORD_NEW_PASSWORD'))

  if (code) {
    if (newPassword === repeatedPassword) {
      await Auth.forgotPasswordSubmit(email, code, newPassword)
        .then(() => {
          dispatch(Actions.loginReady())
        })
        .catch((err) => {
          if (err.code) {
            dispatch(
              Actions.actionFail({
                errorMessage: `authentication.errors.${err.code}`,
                actionName: 'FORGOT_PASSWORD_NEW_PASSWORD',
              })
            )
          } else {
            dispatch(
              Actions.actionFail({
                errorMessage: `authentication.errors.UnknownError`,
                actionName: 'FORGOT_PASSWORD_NEW_PASSWORD',
              })
            )
          }
        })
    } else {
      dispatch(
        Actions.actionFail({
          errorMessage: `authentication.errors.passwordDoesntMatch`,
          actionName: 'FORGOT_PASSWORD_NEW_PASSWORD',
        })
      )
    }
  } else {
    dispatch(
      Actions.actionFail({
        errorMessage: `authentication.errors.emptyVerificationCode`,
        actionName: 'FORGOT_PASSWORD_NEW_PASSWORD',
      })
    )
  }
}

export const changePassword = (oldPassword: string, newPassword: string, repeatedPassword: string): AppThunk => async (
  dispatch
) => {
  dispatch(Actions.actionWaiting('CHANGE_PASSWORD'))

  if (oldPassword) {
    if (newPassword === repeatedPassword) {
      await Auth.currentAuthenticatedUser().then((user) => {
        Auth.changePassword(user, oldPassword, newPassword)
          .then(() => {
            dispatch(Actions.changePasswordSuccess())
          })
          .catch((err) => {
            if (err.code) {
              dispatch(
                Actions.actionFail({ errorMessage: `changePassword.errors.${err.code}`, actionName: 'CHANGE_PASSWORD' })
              )
            } else {
              dispatch(
                Actions.actionFail({ errorMessage: `changePassword.errors.UnknownError`, actionName: 'CHANGE_PASSWORD' })
              )
            }
          })
      })
    } else {
      dispatch(
        Actions.actionFail({ errorMessage: `changePassword.errors.passwordDoesntMatch`, actionName: 'CHANGE_PASSWORD' })
      )
    }
  } else {
    dispatch(Actions.actionFail({ errorMessage: `changePassword.errors.emptyOldPassword`, actionName: 'CHANGE_PASSWORD' }))
  }
}

export const login = (username: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting('LOGIN'))

  username = Utils.SanitizeEmail(username)

  if (username && password) {
    if (Utils.ValidateEmail(username)) {
      // SignIn cognito
      await Auth.signIn(username, password)
        .then(async (user) => {
          if (user.attributes.email_verified) {
            user.getCachedDeviceKeyAndPassword()

            const token = user.signInUserSession.idToken.jwtToken
            const userAuth = { email: username, token }

            // Remember device
            if (rememberMe) {
              user.setDeviceStatusRemembered({
                onSuccess: (): void => {
                  dispatch(Actions.loginSuccess(userAuth))
                  dispatch(getProfile())
                },
                onFailure: (err: any) => {
                  dispatch(Actions.signOutSuccess())
                  dispatch(Actions.actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'LOGIN' }))
                },
              })
            } else {
              user.setDeviceStatusNotRemembered({
                onSuccess: (): void => {
                  dispatch(Actions.loginSuccess(userAuth))
                },
                onFailure: (err: any) => {
                  dispatch(Actions.signOutSuccess())
                  dispatch(Actions.actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'LOGIN' }))
                },
              })
            }
          } else {
            dispatch(
              Actions.actionFail({ errorMessage: `authentication.errors.confirmYourEmailAccount`, actionName: 'LOGIN' })
            )
          }
        })
        .catch((err) => {
          if (err.code) {
            dispatch(Actions.actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'LOGIN' }))
          } else {
            dispatch(Actions.actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'LOGIN' }))
          }
        })
    } else {
      dispatch(Actions.actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'LOGIN' }))
    }
  } else {
    dispatch(Actions.actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'LOGIN' }))
  }
}

export const signOut = (): AppThunk => async (dispatch) => {
  await Auth.signOut().then(() => {
    dispatch(Actions.signOutSuccess())
    dispatch(UserActions.cleanSignOutSuccess())
  })
}

export const getListDevices = (): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting('LIST_DEVICES'))

  await Auth.currentAuthenticatedUser()
    .then((data) => {
      data.listDevices(20, null, {
        onSuccess: (list: any): void => {
          dispatch(Actions.listDevicesSuccess(list.Devices))
        },
        onFailure: (err: any) => {
          dispatch(Actions.actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'LIST_DEVICES' }))
        },
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

export const register = (username: string, password: string, repeatedPassword: string): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting('REGISTER'))

  username = Utils.SanitizeEmail(username)

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
              Actions.registerSuccess({
                email: username,
                message: '',
              })
            )
          })
          .catch((err) => {
            if (err.code) {
              dispatch(Actions.actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'REGISTER' }))
            } else {
              dispatch(Actions.actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'REGISTER' }))
            }
          })
      } else {
        dispatch(Actions.actionFail({ errorMessage: `authentication.errors.passwordDoesntMatch`, actionName: 'REGISTER' }))
      }
    } else {
      dispatch(Actions.actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'REGISTER' }))
    }
  } else {
    dispatch(Actions.actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'REGISTER' }))
  }
}

export const confirmSignUp = (email: string, code: string): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting('CONFIRM_EMAIL'))

  if (email) {
    if (code) {
      await Auth.confirmSignUp(email, code)
        .then(() => {
          dispatch(Actions.confirmSignUpSuccess('authentication.messageRegisterSuccessfully'))
        })
        .catch((err) => {
          if (err.code) {
            dispatch(Actions.actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'CONFIRM_EMAIL' }))
          } else {
            dispatch(Actions.actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'CONFIRM_EMAIL' }))
          }
        })
    } else {
      dispatch(
        Actions.actionFail({ errorMessage: `authentication.errors.emptyVerificationCode`, actionName: 'CONFIRM_EMAIL' })
      )
    }
  }
}

export const resendConfirmationCode = (email: string): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting('CONFIRM_EMAIL'))

  if (email) {
    await Auth.resendSignUp(email)
      .then(() => {
        dispatch(
          Actions.registerSuccess({
            email,
            message: 'authentication.resendVerificationCodeSuccess',
          })
        )
      })
      .catch((err) => {
        if (err.code) {
          dispatch(Actions.actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'CONFIRM_EMAIL' }))
        } else {
          dispatch(Actions.actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'CONFIRM_EMAIL' }))
        }
      })
  }
}
