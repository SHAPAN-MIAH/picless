// import { RootState } from '../store'

export const loadingSelector = (state: any) => {
  return state.user.loading
}
export const userSelector = (state: any) => state.user.data
export const errorSelector = (state: any) => state.user.error
export const messageSelector = (state: any) => state.user.message
