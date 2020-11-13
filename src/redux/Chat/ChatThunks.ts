import { AppThunk } from '../store'
import ChatService from '../../services/ChatService'

import * as Actions from './ChatSlice'

export const getFavoriteUsers = (): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  ChatService.getFavoriteUsers()
    .then((data) => {
      dispatch(Actions.userListSuccess(data))
    })
    .catch((err) => {
      console.error(err)
    })
}

export const setUserSelected = (userId: number | null): AppThunk => async (dispatch) => {
  dispatch(Actions.selectUser(userId))
}

export const setUsersFilter = (filter: string): AppThunk => async (dispatch) => {
  dispatch(Actions.userFilter(filter))
}
