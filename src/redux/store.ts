import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import authReducer from './slices/Auth'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
