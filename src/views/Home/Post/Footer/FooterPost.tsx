import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent } from 'react'
import toast from 'react-hot-toast'
import Popup from 'reactjs-popup'
import SendATip from '../../../UserProfile/Profile/Header/SendATip/SendATip'

const FooterPost: FunctionComponent<{ user?: any }> = React.memo((props) => {
  const { user } = props

  const handleCallback = (status: string, message?: string) => {
    if (status === 'SUCCESS') {
      toast.success(`Tip sended, ${user.userName} is grateful`)
    } else if (status === 'ERROR') {
      toast.error(message || 'Unknown error')
    }
  }

  return (
    <>
      <div className="post-options">
        <div className="post-option-wrap">
          <div className="post-option reaction-options-dropdown-trigger">
            <svg className="post-option-icon icon-thumbs-up">
              <use xlinkHref="#svg-thumbs-up" />
            </svg>

            <p className="post-option-text">Like</p>
          </div>
        </div>

        {/* <div className="post-option">
          <svg className="post-option-icon icon-comment">
            <use xlinkHref="#svg-comment" />
          </svg>

          <p className="post-option-text">Comment</p>
        </div> */}

        <Popup
          modal
          contentStyle={{ width: '330px', borderRadius: '5px', minWidth: '' }}
          position="center center"
          trigger={
            <div className="post-option">
              <div className="post-option-icon">
                <FontAwesomeIcon color="#adafca" icon="dollar-sign" />
              </div>

              <p className="post-option-text">Send a tip</p>
            </div>
          }
        >
          {(close: any) => <SendATip user={user} callback={handleCallback} onClose={close} />}
        </Popup>
      </div>
    </>
  )
})

export default FooterPost
