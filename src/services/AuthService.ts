import { Auth } from '@aws-amplify/auth'

import * as Utils from '../utils/Functions'

const login = async (username: string, password: string) => {
  username = Utils.SanitizeEmail(username)

  return Auth.signIn(username, password)
}

const register = async (username: string, password: string): Promise<any> => {
  username = Utils.SanitizeEmail(username)

  return Auth.signUp({
    username,
    password,
    attributes: {
      email: username,
    },
  })
  //         .then(() => {
  //           dispatch(
  //             Actions.registerSuccess({
  //               email: username,
  //               message: '',
  //             })
  //           )
  //         })
  //         .catch((err) => {
  //           if (err.code) {
  //             dispatch(Actions.actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'REGISTER' }))
  //           } else {
  //             dispatch(Actions.actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'REGISTER' }))
  //           }
  //         })
  //     } else {
  //       dispatch(Actions.actionFail({ errorMessage: `authentication.errors.passwordDoesntMatch`, actionName: 'REGISTER' }))
  //     }
  //   } else {
  //     dispatch(Actions.actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'REGISTER' }))
  //   }
  // } else {
  //   dispatch(Actions.actionFail({ errorMessage: `authentication.errors.enterValidEmailAddress`, actionName: 'REGISTER' }))
  // }
}

const signOut = async (): Promise<void> => {
  return Auth.signOut()

  // .then(() => {
  //   // dispatch(Actions.signOutSuccess())
  //   // dispatch(UserActions.cleanSignOutSuccess())
  // })
}

const forgotPasswordSendCode = async (username: string): Promise<any> => {
  username = Utils.SanitizeEmail(username)

  return Auth.forgotPassword(username)
}

const resetPassword = async (username: string, code: string, newPassword: string): Promise<any> => {
  username = Utils.SanitizeEmail(username)

  return Auth.forgotPasswordSubmit(username, code, newPassword)
}

const currentSession = async (): Promise<any> => {
  return Auth.currentSession()
}

export default {
  login,
  register,
  forgotPasswordSendCode,
  resetPassword,
  currentSession,
  signOut,
}
