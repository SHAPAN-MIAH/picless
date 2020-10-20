import React, { FunctionComponent, useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import { userSelector } from '../../../redux/User/UserSelectors'

import UploadBox from '../../../components/Common/UploadBox'

const AccountHubMain: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const userData = useSelector(userSelector)

  const [imageCover, setImageCover] = useState(userData.coverPicture)
  const [imageProfile, setImageProfile] = useState(userData.profilePicture)

  const prevUserDataRef = useRef(userData)

  useEffect(() => {
    if (!_.isEqual(userData, prevUserDataRef.current)) {
      setImageCover(userData.coverPicture)
      setImageProfile(userData.profilePicture)

      prevUserDataRef.current = userData
    }
  }, [userData])

  return (
    <div className="grid grid-3-3-3 centered">
      <div className="user-preview small fixed-height">
        <div className="user-preview-cover" style={{ background: `url(${process.env.REACT_APP_BUCKET_IMAGES}${imageCover}) center center / cover no-repeat` }}>
          <img src={process.env.REACT_APP_BUCKET_IMAGES + imageCover} alt="cover-01" style={{ display: 'none' }} />
        </div>

        <div className="user-preview-info">
          <div className="user-short-description small">
            <div className="user-short-description-avatar user-avatar">
              <div className="user-avatar-border">
                <div className="hexagon-100-110" />
              </div>

              <div className="user-avatar-content">
                <div
                  className="hexagon-image-68-74"
                  style={{
                    background: `url(${process.env.REACT_APP_BUCKET_IMAGES}${imageProfile}) center center / cover no-repeat`,
                  }}
                />
              </div>

              <div className="user-avatar-progress">
                <div className="hexagon-progress-84-92" />
              </div>

              <div className="user-avatar-progress-border">
                <div className="hexagon-border-84-92" />
              </div>

              <div className="user-avatar-badge">
                <div className="user-avatar-badge-border">
                  <div className="hexagon-28-32" />
                </div>

                <div className="user-avatar-badge-content">
                  <div className="hexagon-dark-22-24" />
                </div>

                <p className="user-avatar-badge-text" style={{ height: '0px' }}>
                  24
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UploadBox
        id="upload-avatar"
        iconName="members"
        uploadTitleName={t('profileInfo.changeAvatar')}
        imageType="PROFILE"
        uploadText={t('profileInfo.changeAvatarDescription')} // "110x110px size minimum"
      />

      <UploadBox
        id="upload-cover"
        iconName="photos"
        uploadTitleName={t('profileInfo.changeCover')}
        imageType="COVER"
        uploadText={t('profileInfo.changeCoverDescription')} // "1184x300px size minimum"
      />
    </div>
  )
}

export default AccountHubMain
