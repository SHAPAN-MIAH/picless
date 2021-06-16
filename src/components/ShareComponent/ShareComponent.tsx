import React, { FunctionComponent, useState, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

import { toast } from 'react-hot-toast'
import Popup from 'reactjs-popup'

import SocialLinkList from './SocialLinkList/SocialLinkList'
import FormRowItem from 'components/Common/Form/FormRowItem'
import UserAvatar from 'components/UserAvatar'

import styles from './ShareComponent.module.css'
// import SocialLink from './SocialLinks/SocialLink'

interface ShareProps {
  // user: UserType,
  // children: ReactNode,
  // onClose: true
}

const ShareComponent: FunctionComponent<ShareProps> = React.memo(({}) => {
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
            closeOnDocumentClick={true}
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            contentStyle={{ padding: '0px', border: 'none', width: '140px', borderRadius: '12px', marginLeft: '100px' }}
            arrow={false}
          >
            <Popup
              modal
              contentStyle={{ width: 'auto', borderRadius: '5px', minWidth: '' }}
              position="center center"
              trigger={
                <span className="post-option">
                  <FontAwesomeIcon icon={faShare} size="1x" />
                </span>
                // <div className={styles.mainPopup}>
                //   <div className={styles.closePopup}>
                //     <FontAwesomeIcon icon="times" color="white" size="1x" />
                //   </div>
                //   <form action="">
                /* <FormRowItem>
                        <div className={styles.userInfoContainer}>
                          <div className={styles.userInfoName}>
                            <p className="user-status-title">
                              <span className="bold">Share to</span>
                            </p>
                            <p className="user-status-text small">
                              <a href={`/u/hello`}>Options</a>
                            </p>
                          </div>
                        </div>
                      </FormRowItem> */
                /* Share Button */
                //   </form>
                // </div>
              }
            >
              <SocialLinkList />
            </Popup>
          </Popup>
        </div>
      </div>
    </>
  )
})

export default ShareComponent
