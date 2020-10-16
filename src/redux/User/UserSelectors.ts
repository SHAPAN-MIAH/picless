import { RootState } from '../store'

export const loadingSelector = (state: RootState) => state.user.loading
export const userSelector = (state: RootState) => state.user.data
export const errorSelector = (state: RootState) => state.user.error
export const messageSelector = (state: RootState) => state.user.message
