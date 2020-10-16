import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType, UserStateType } from '../../types/UserType.d'

const initialState: UserStateType = {
  loading: false,
  error: '',
  message: '',
  data: {
    id: -1,
    email: '',
    emailConfirmed: false,
    emailRecovery: null,
    phoneNumber: null,
    phoneNumberConfirmed: false,
    userName: null,
    firstName: null,
    lastName: null,
    fullName: null,
    profilePicture: null,
    coverPicture: null,
    birthDate: null,
    profileDescription: null,
    genderId: null,
    countryId: null,
    cityName: null,
    numberOfFollowers: 0,
    languageId: null,
    registrationDate: '',
    country: null,
    gender: null,
    language: null,
    userInterest: [],
    userTimeLine: [],
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    actionClean: (state) => {
      return {
        ...state,
        loading: false,
        error: '',
        message: '',
      }
    },

    actionWaiting: (state) => {
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      }
    },

    actionFail: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    },

    getProfileSuccess: (state, action: PayloadAction<UserType>) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    },

    updateProfileSuccess: (state) => {
      return {
        ...state,
        loading: false,
        message: 'profile.userUpdated',
      }
    },
  },
})

// Actions
export const { updateProfileSuccess, getProfileSuccess, actionClean, actionWaiting, actionFail } = userSlice.actions

// Reducer
export default userSlice.reducer
