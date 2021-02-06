import React, { FunctionComponent, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import useUser from '../../../hooks/useUser'

import UploadBox from '../../../components/Common/UploadBox'

const AccountHubMain: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { getUser } = useUser()

  const [imageCover, setImageCover] = useState()
  const [imageProfile, setImageProfile] = useState()

  useEffect(() => {
    getUser().then((user) => {
      setImageCover(process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture)
      setImageProfile(process.env.REACT_APP_BUCKET_IMAGES + user.profilePicture)
    })
  }, [getUser])

  return (
    <div className="grid grid-3-3-3">
      <div className="user-preview small fixed-height">
        <div className="user-preview-cover" style={{ background: `url(${imageCover}) center center / cover no-repeat` }}>
          <img src={imageCover} alt="cover-01" style={{ display: 'none' }} />
        </div>

        <div className="user-preview-info">
          <div className="user-short-description small">
            <div className="user-short-description-avatar user-avatar">
              <div className="user-avatar-border">
                <div className="hexagon-100-110" />
              </div>

              <div className="user-avatar-content">
                <div
                  className="hex"
                  style={{
                    width: '68px',
                    height: '74px',
                    background: `url(${imageProfile}) center center / cover no-repeat`,
                  }}
                >
                  <img src={imageProfile} alt="cover-01" style={{ display: 'none' }} />
                </div>
              </div>

              <div className="user-avatar-progress">
                <div className="hexagon-progress-84-92" />
              </div>

              <div className="user-avatar-progress-border">
                <div className="hexagon-border-84-92" />
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
