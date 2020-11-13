// import { RootState } from '../store'
import { createSelector } from 'reselect'
import { UserStatusMessagesType } from '../../types/ChatType.d'

const usersSelector = (state: any): UserStatusMessagesType[] => state.chat.userList
const userIdSelector = (state: any): number | null => state.chat.userSelected
const usersFilter = (state: any): string => state.chat.userFilter

export const loadingSelector = (state: any): boolean => state.chat.loading
export const errorSelector = (state: any): string => state.chat.error

export const getUserSelector = createSelector(
  [usersSelector, userIdSelector],
  (userList: UserStatusMessagesType[], userSelected: number | null) => {
    return userList.find((user) => {
      return user.userId === userSelected
    })
  }
)

export const getUserListSelector = createSelector(
  [usersSelector, usersFilter],
  (userList: UserStatusMessagesType[], filter: string) => {
    if (filter && filter !== '') {
      return userList.filter((user) => user.fullName.includes(filter))
    }

    return userList
  }
)
