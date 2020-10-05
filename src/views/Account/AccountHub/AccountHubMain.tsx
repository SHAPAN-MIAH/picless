import React, { FunctionComponent } from 'react'
import UploadBox from '../../../components/Common/UploadBox'

const AccountHubMain: FunctionComponent<{}> = () => {
  return (
    <div className="grid grid-3-3-3 centered">
      <div className="user-preview small fixed-height">
        <figure className="user-preview-cover liquid">
          <img src={`${process.env.PUBLIC_URL}/assets/img/cover/01.jpg`} alt="cover-01" />
        </figure>

        <div className="user-preview-info">
          <div className="user-short-description small">
            <div className="user-short-description-avatar user-avatar">
              <div className="user-avatar-border">
                <div className="hexagon-100-110" />
              </div>

              <div className="user-avatar-content">
                <div className="hexagon-image-68-74" data-src={`${process.env.PUBLIC_URL}/assets/img/avatar/01.jpg`} />
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
        uploadTitleName="Change Avatar"
        imageType="PROFILE"
        uploadText="110x110px size minimum"
      />

      <UploadBox
        id="upload-cover"
        iconName="photos"
        uploadTitleName="Change Cover"
        imageType="COVER"
        uploadText="1184x300px size minimum"
      />
    </div>
  )
}

export default AccountHubMain
