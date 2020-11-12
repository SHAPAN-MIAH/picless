// import { RootState } from '../store'

export const listOfUserSelector = (state: any) => state.chat.userList
export const loadingSelector = (state: any) => state.chat.loading
export const errorSelector = (state: any) => state.chat.error
