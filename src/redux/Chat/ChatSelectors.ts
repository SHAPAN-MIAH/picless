// import { RootState } from '../store'
import { createSelector } from 'reselect'
import { MessageType, UserStatusMessagesType } from '../../types/MessagesType'

const usersSelector = (state: any): UserStatusMessagesType[] => state.chat.userList
const userIdSelector = (state: any): number | null => state.chat.userSelected
const usersFilter = (state: any): string => state.chat.userFilter

export const getUserSelector = createSelector(
  [usersSelector, userIdSelector],
  (userList: UserStatusMessagesType[], userSelected: number | null): UserStatusMessagesType | undefined => {
    return userList.find((user) => {
      return user.userId === userSelected
    })
  }
)

// PARTIALLY WORKING - FILTER PROBLEM
export const getUserListSelector = createSelector(
  [usersSelector, usersFilter],
  (userList: UserStatusMessagesType[], filter: string) => {
    if (filter && filter !== '') {
      return userList.filter((user) => user.fullName.includes(filter))
    }

    return userList
  }
)

export const getCurrentChat = (state: any): MessageType[] => state.chat.currentChat
export const loadingSelector = (state: any): boolean => state.chat.loading
export const errorSelector = (state: any): string => state.chat.error
