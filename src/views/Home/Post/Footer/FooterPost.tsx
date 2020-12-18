import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent } from 'react'
import Popup from 'reactjs-popup'
import SendATip from '../../../UserProfile/Header/SendATip/SendATip'
import Reactions from './Reactions'

const FooterPost: FunctionComponent<{ user?: any }> = (props) => {
  const { user } = props
  return (
    <>
      <div className="post-options">
        <div className="post-option-wrap">
          <div className="post-option reaction-options-dropdown-trigger">
            <svg className="post-option-icon icon-thumbs-up">
              <use xlinkHref="#svg-thumbs-up" />
            </svg>

            <p className="post-option-text">React!</p>
          </div>

          <Reactions />
        </div>

        <div className="post-option">
          <svg className="post-option-icon icon-comment">
            <use xlinkHref="#svg-comment" />
          </svg>

          <p className="post-option-text">Comment</p>
        </div>

        <Popup
          modal
          trigger={
            <div className="post-option">
              <div className="post-option-icon">
                <FontAwesomeIcon color="#adafca" icon="dollar-sign" />
              </div>

              <p className="post-option-text">Send a tip</p>
            </div>
          }
        >
          <SendATip user={user} />
        </Popup>
      </div>
    </>
  )
}

export default FooterPost
