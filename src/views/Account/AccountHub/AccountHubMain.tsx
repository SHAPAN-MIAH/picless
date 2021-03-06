import React, { FunctionComponent, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import UploadBox from '../../../components/Common/UploadBox'
import UserAvatar from '../../../components/UserAvatar'
import useUser from '../../../hooks/useUser'

const GridDiv = styled.div`
  justify-content: center;
  display: ${isMobile ? 'contents' : 'flex'};
  flex-direction: row;
`

const AccountHubMain: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const { user } = useUser()
  const [imageCover, setImageCover] = useState()
  const [imageProfile, setImageProfile] = useState('')

  useEffect(() => {
    setImageCover(process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture)
    setImageProfile(user.profilePicture)
  }, [user])

  const styleMobile: React.CSSProperties = {}

  if (!isMobile) {
    styleMobile.flex = 1
  }

  return (
    <div style={{ marginTop: '25px' }}>
      <GridDiv className="grid grid-3-3-3">
        <div className="user-preview small fixed-height account-hub-cards cover-container" style={styleMobile}>
          <div
            className="user-preview-cover cover-page"
            style={{ background: `url(${imageCover}) center center / cover no-repeat` }}
          >
            <img src={imageCover} alt="cover-01" style={{ display: 'none' }} />
          </div>

          <div className="user-short-description" style={{ marginBottom: '20px !important' }}>
            <div className="user-short-description-avatar user-avatar medium" style={{ marginLeft: '-49px' }}>
              <UserAvatar size="L" imageName={imageProfile || ''} removeContainerStyle />
            </div>
          </div>
        </div>

        <UploadBox
          id="upload-avatar"
          className="update-pic"
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
      </GridDiv>
    </div>
  )
}

export default AccountHubMain
