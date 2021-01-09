import toast from 'react-hot-toast'
import { AppThunk } from '../store'

import * as Actions from './UserSlice'
import { UploadImageType, UserType, UserInterestType, UserTimeLineType } from '../../types/UserType.d'

import UserService from '../../services/UserService'

export const cleanState = (): AppThunk => async (dispatch) => {
  dispatch(Actions.actionClean())
}

export const getProfile = (): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  try {
    const userData = await UserService.getUserProfile()

    dispatch(Actions.getProfileSuccess(userData))
  } catch (err) {
    dispatch(Actions.actionFail({ uiMessage: 'profileInfo.errors.fetchingData', err }))
  }
}

export const updateProfile = (userData: UserType): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  try {
    const updateProfilePromise = UserService.updateUserProfile(userData)

    toast.promise(updateProfilePromise, { loading: 'Saving data ...', success: 'Saved', error: 'Error Saving the data' })

    const data = await updateProfilePromise

    dispatch(Actions.updateProfileSuccess())
    dispatch(Actions.getProfileSuccess(data))
  } catch (err) {
    dispatch(Actions.actionFail({ uiMessage: 'profileInfo.errors.updatingData', err }))
  }
}

export const uploadUserImages = (imageData: UploadImageType): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  try {
    const data = await UserService.uploadUserImages(imageData)

    dispatch(Actions.getProfileSuccess(data))
  } catch (err) {
    dispatch(Actions.actionFail({ uiMessage: 'profileInfo.errors.uploadingAnImage', err }))
  }
}

/* INTERESTS */
export const addInterest = (interest: UserInterestType): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  try {
    dispatch(Actions.addInterest(interest))
  } catch (err) {
    dispatch(Actions.actionFail({ uiMessage: 'profileInfo.interests.errors.updatingData', err }))
  }
}

export const removeInterest = (interest: UserInterestType): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  try {
    dispatch(Actions.removeInterest(interest))
  } catch (err) {
    dispatch(Actions.actionFail({ uiMessage: 'profileInfo.interests.errors.updatingData', err }))
  }
}

export const updateInterest = (interest: UserInterestType): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  try {
    dispatch(Actions.updateInterest(interest))
  } catch (err) {
    console.log(err)
    dispatch(Actions.actionFail({ uiMessage: 'profileInfo.interests.errors.updatingData', err }))
  }
}

/* TimeLine */
export const addTimelineEvent = (timeline: UserTimeLineType): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  try {
    dispatch(Actions.addTimelineEvent(timeline))
  } catch (err) {
    dispatch(Actions.actionFail({ uiMessage: 'profileInfo.timeline.errors.addingTimeLine', err }))
  }
}

export const removeTimelineEvent = (timeline: UserTimeLineType): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  try {
    dispatch(Actions.removeTimelineEvent(timeline))
  } catch (err) {
    dispatch(Actions.actionFail({ uiMessage: 'profileInfo.timeline.errors.removingTimeLine', err }))
  }
}

export const updateTimelineEvent = (timeline: UserTimeLineType): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  try {
    dispatch(Actions.updateTimelineEvent(timeline))
  } catch (err) {
    dispatch(Actions.actionFail({ uiMessage: 'profileInfo.timeline.errors.updatingTimeline', err }))
  }
}
