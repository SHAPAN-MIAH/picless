// import { RootState } from '../store'
import { UserAuthorization } from '../../types/AuthTypeSlice.d'

export const getAction = (state: any) => state.auth.operation
export const userAuthSelector = (state: any): UserAuthorization => state.auth.user
export const messageSelector = (state: any) => state.auth.message
export const errorSelector = (state: any) => state.auth.error
export const listDevicesSelector = (state: any) => state.auth.listDevices
