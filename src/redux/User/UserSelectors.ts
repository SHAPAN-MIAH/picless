// import { RootState } from '../store'

export const loadingSelector = (state: any) => state.user.loading
export const userSelector = (state: any) => state.user.data
export const userIdSelector = (state: any): number => state.user.data.id
export const userInterestSelector = (state: any) => state.user.data.userInterest
export const userTimelineSelector = (state: any) => state.user.data.userTimeLine
export const errorSelector = (state: any) => state.user.error
export const messageSelector = (state: any) => state.user.message
