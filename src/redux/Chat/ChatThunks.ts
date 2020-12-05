import { AppThunk } from '../store'
import ChatService from '../../services/ChatService'

import * as Actions from './ChatSlice'

import { UserStatusMessagesType, MessageType } from '../../types/MessagesType.d'

export const getFavoriteUsers = (): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  dispatch(setUserSelected(null))
  ChatService.getFavoriteUsers()
    .then((data: UserStatusMessagesType[]) => {
      dispatch(Actions.userListSuccess(data))
    })
    .catch((err) => {
      console.error(err)
    })
}

export const getChatHistory = (userId: number): AppThunk => async (dispatch) => {
  try {
    ChatService.getChatHistoryByUser(userId)
      .then((messages: MessageType[]) => {
        dispatch(Actions.currentChatAddHistory(messages))
      })
      .catch((err) => {
        console.log('getChatHistory - catch Service')
        console.error(err)
      })
  } catch (err) {
    console.error(err)
  }
}

export const setUserSelected = (userId: number | null): AppThunk => async (dispatch) => {
  dispatch(Actions.currentChatAddHistory([]))

  if (userId) {
    dispatch(Actions.selectUser(userId))
    dispatch(Actions.actionWaiting())
    dispatch(getChatHistory(userId))
  }
}

export const setUsersFilter = (filter: string): AppThunk => async (dispatch) => {
  dispatch(Actions.userFilter(filter))
}

export const addMessageChat = (message: MessageType): AppThunk => async (dispatch) => {
  dispatch(Actions.currentChatAddMessage(message))
}

export const sendMessageChat = (message: MessageType): AppThunk => async (dispatch) => {
  try {
    ChatService.sendMessage(message)
      .then(() => {
        dispatch(Actions.currentChatAddOwnMessage(message))
      })
      .catch((err) => {
        console.log('addMessageChat - catch Service')
        console.error(err)
      })
  } catch (err) {
    console.error(err)
  }
}

export const changeStatus = (userId: number): AppThunk => async (dispatch) => {
  dispatch(Actions.changeStatusOnline(userId))
}
