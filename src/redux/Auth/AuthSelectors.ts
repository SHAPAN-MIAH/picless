import { RootState } from '../store'
import { UserAuthorization } from '../../types/AuthTypeSlice'

export const getAction = (state: RootState) => state.auth.operation
export const userAuthSelector = (state: RootState): UserAuthorization => state.auth.user
export const messageSelector = (state: RootState) => state.auth.message
export const errorSelector = (state: RootState) => state.auth.error
export const listDevicesSelector = (state: RootState) => state.auth.listDevices
