import { AppThunk } from '../store'

import * as Actions from './UserSlice'
import { UploadImageType, UserType } from '../../types/UserType.d'

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
    dispatch(Actions.actionFail('profile.errors.fetchingData'))
  }
}

export const updateProfile = (userData: UserType): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  try {
    const data = await UserService.updateUserProfile(userData)

    dispatch(Actions.updateProfileSuccess())
    dispatch(Actions.getProfileSuccess(data))
  } catch (err) {
    dispatch(Actions.actionFail('profile.errors.updatingData'))
  }
}

export const uploadUserImages = (imageData: UploadImageType): AppThunk => async (dispatch) => {
  dispatch(Actions.actionWaiting())

  try {
    const data = await UserService.uploadUserImages(imageData)

    dispatch(Actions.getProfileSuccess(data))
  } catch (err) {
    dispatch(Actions.actionFail('profile.errors.uploadingAnImage'))
  }
}
