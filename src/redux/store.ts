import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistCombineReducers, persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

// import userReducer from './User/UserSlice'
import chatReducer from './Chat/ChatSlice'

const reducers = {
  // user: userReducer,
  chat: chatReducer,
}

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
}
const persistedReducer = persistCombineReducers(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({ serializableCheck: { ignoredActions: ['persist/PERSIST'] } }),
})
const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
