import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType, UserStateType, UserInterestType, UserTimeLineType } from '../../types/UserType.d'

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

    actionFail: (state, action: PayloadAction<{ uiMessage: string; err: string }>) => {
      console.error(action.payload.err)

      return {
        ...state,
        loading: false,
        error: action.payload.uiMessage,
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
        message: 'profileInfo.userUpdated',
      }
    },

    addInterest: (state, action: PayloadAction<UserInterestType>) => {
      const interest = action.payload

      return {
        ...state,
        loading: false,
        message: 'profileInfo.interests.AddedSuccessfully',
        data: {
          ...state.data,
          userInterest: state.data.userInterest?.concat(interest),
        },
      }
    },

    removeInterest: (state, action: PayloadAction<UserInterestType>) => {
      const interestToRemove = action.payload

      return {
        ...state,
        loading: false,
        message: 'profileInfo.interests.RemovedSuccessfully',
        data: {
          ...state.data,
          userInterest: state.data.userInterest?.filter((interest) => interest.id !== interestToRemove.id),
        },
      }
    },

    updateInterest: (state, action: PayloadAction<UserInterestType>) => {
      const interestToUpdate = action.payload

      const updatedInterestList = state.data.userInterest?.map((interest) => {
        if (interest.id === interestToUpdate.id) {
          return interestToUpdate
        }

        return interest
      })

      return {
        ...state,
        loading: false,
        message: 'profileInfo.interests.RemovedSuccessfully',
        data: {
          ...state.data,
          userInterest: updatedInterestList,
        },
      }
    },

    addTimelineEvent: (state, action: PayloadAction<UserTimeLineType>) => {
      const timelineEvent = action.payload

      return {
        ...state,
        loading: false,
        message: 'profileInfo.timeline.AddedSuccessfully',
        data: {
          ...state.data,
          userTimeLine: state.data.userTimeLine?.concat(timelineEvent),
        },
      }
    },

    removeTimelineEvent: (state, action: PayloadAction<UserTimeLineType>) => {
      const timelineEventToRemove = action.payload

      return {
        ...state,
        loading: false,
        message: 'profileInfo.timeline.RemovedSuccessfully',
        data: {
          ...state.data,
          userTimeLine: state.data.userTimeLine?.filter((event) => event.id !== timelineEventToRemove.id),
        },
      }
    },

    updateTimelineEvent: (state, action: PayloadAction<UserTimeLineType>) => {
      const timelineEventToUpdate = action.payload

      const timelineEventList = state.data.userInterest?.map((event) => {
        if (event.id === timelineEventToUpdate.id) {
          return timelineEventToUpdate
        }

        return event
      })

      return {
        ...state,
        loading: false,
        message: 'profileInfo.timeline.UpdatedSuccessfully',
        data: {
          ...state.data,
          userTimeLine: timelineEventList,
        },
      }
    },

    cleanSignOutSuccess: () => {
      console.log('LOGOUT USER')
      return initialState
    },
  },
})

// Actions
export const {
  cleanSignOutSuccess,
  updateProfileSuccess,
  getProfileSuccess,
  addInterest,
  removeInterest,
  updateInterest,
  addTimelineEvent,
  removeTimelineEvent,
  updateTimelineEvent,
  actionClean,
  actionWaiting,
  actionFail,
} = userSlice.actions

// Reducer
export default userSlice.reducer
