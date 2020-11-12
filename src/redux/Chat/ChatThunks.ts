import { Auth } from '@aws-amplify/auth'
import { AppThunk } from '../store'
import ChatService from '../../services/ChatService'

import * as Actions from './ChatSlice'

export const getFavoriteUsers = (): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  ChatService.getFavoriteUsers()
    .then((data) => {
      console.log(data)
      dispatch(Actions.userListSuccess(data)) // TODO: DEFINE TYPE FOR THE LIST OF USERS
    })
    .catch((err) => {
      console.error(err)
    })
}

export const resendConfirmationCode = (): AppThunk => async (dispatch) => {
  // dispatch(Actions.actionWaiting('CONFIRM_EMAIL'))
  // if (email) {
  //   await Auth.resendSignUp(email)
  //     .then(() => {
  //       dispatch(
  //         Actions.registerSuccess({
  //           email,
  //           message: 'authentication.resendVerificationCodeSuccess',
  //         })
  //       )
  //     })
  //     .catch((err) => {
  //       if (err.code) {
  //         dispatch(Actions.actionFail({ errorMessage: `authentication.errors.${err.code}`, actionName: 'CONFIRM_EMAIL' }))
  //       } else {
  //         dispatch(Actions.actionFail({ errorMessage: `authentication.errors.UnknownError`, actionName: 'CONFIRM_EMAIL' }))
  //       }
  //     })
  // }
}
