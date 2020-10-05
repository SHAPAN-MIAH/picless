import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authViewReducer from './slices/AuthView'
import userReducer from './slices/User'

export const store = configureStore({
  reducer: {
    authView: authViewReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
