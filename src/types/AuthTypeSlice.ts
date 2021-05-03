export type Screen =
  | 'LOGIN'
  | 'REGISTER'
  | 'CONFIRM_EMAIL'
  | 'CHANGE_PASSWORD'
  | 'FORGOT_PASSWORD_EMAIL'
  | 'FORGOT_PASSWORD_NEW_PASSWORD'
  | 'SIGNOUT'
  | 'ISAUTHENTICATED'
  | 'LIST_DEVICES'
  | 'UNKNOWN'

export type Status = 'PENDING' | 'WAITING' | 'FINISHED' | 'ERROR'

export type UserAuthorization = {
  email: string
  token?: string
}

export type ActuallyActionState = {
  action: Screen
  status: Status
}

export interface AuthState {
  operation: ActuallyActionState
  user: UserAuthorization
  error: string
  message: string
  listDevices: any
}

export interface ActionFail {
  actionName: Screen
  errorMessage: string
}
