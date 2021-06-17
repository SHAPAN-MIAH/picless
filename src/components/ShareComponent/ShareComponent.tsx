import React, { FunctionComponent, useState, ReactNode, Children } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popup from 'reactjs-popup'

import useProfile from 'hooks/useProfile'
import FormRowItem from 'components/Common/Form/FormRowItem'
import SocialLinkList from './SocialLinkList/SocialLinkList'
import CopyToClipboardComponent from './CopyToClipboard/CopyToClipboard'

import styles from './ShareComponent.module.css'

interface ShareProps {
  // user: UserProfileType,
  // children: ReactNode,
  // onClose: true
}

const ShareComponent: FunctionComponent<ShareProps> = React.memo(() => {
  const { provider } = useProfile()

  return (
    <>
      <div className="widget-box-settings">
        <div className="post-settings-wrap">
          <Popup
            trigger={
              <div className="post-settings widget-box-post-settings-dropdown-trigger">
                <svg className="post-settings-icon icon-more-dots">
                  <use xlinkHref="#svg-more-dots" />
                </svg>
              </div>
            }
            position="bottom right"
            on="click"
            closeOnDocumentClick={false}
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            contentStyle={{ padding: '0px', border: 'none', width: '140px', borderRadius: '12px', marginLeft: '100px' }}
            arrow={false}
          >
            <SharePopup username={provider.userName} />
          </Popup>
        </div>
      </div>
    </>
  )
})

const SharePopup = (username: any) => {
  if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return (
      <button
        className="post-option"
        onClick={() => {
          navigator.share({
            title: 'Hi my friend, You want to Join US!',
            text: 'Join us in PicLess',
            url: `michael.lup20.uk/u/${username}`,
          })
        }}
      >
        Share Profile
      </button>
    )
  } else {
    return (
      <Popup
        modal
        contentStyle={{ width: 'auto', borderRadius: '5px', minWidth: '' }}
        position="center center"
        trigger={
          <span className="post-option">
            <p>Share Profile</p>
          </span>
        }
      >
        <div className={styles.mainPopup}>
          <div className={styles.closePopup}>
            <FontAwesomeIcon icon="times" color="white" size="1x" />
          </div>
          <form>
            <FormRowItem>
              <div className={styles.userInfoContainer}>
                <div className={styles.userInfoName}>
                  <CopyToClipboardComponent userProfile={username} />
                  {/* <p className="user-status-title">
                <span className="bold">Share to</span>
              </p>
              <p className="user-status-text small">
                <a href={`/u/hello`}>https://michael.lup20.uk/u/{provider.userName}</a>
              </p> */}
                </div>
              </div>
            </FormRowItem>
            <FormRowItem>
              <h4>Share To</h4>
              <SocialLinkList userProfile={username} />
            </FormRowItem>
          </form>
        </div>
      </Popup>
    )
  }
}

export default ShareComponent
