import { configureStore, ThunkAction, Action, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import authReducer from './Auth/AuthSlice'
import userReducer from './User/UserSlice'

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  //  stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({ serializableCheck: { ignoredActions: ['persist/PERSIST'] } }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
