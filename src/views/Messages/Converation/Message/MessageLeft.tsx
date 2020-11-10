import React, { FunctionComponent } from 'react'
import { MessageType } from '../../../../types/MessagesType.d'
import UserAvatar from '../../../../components/UserAvatar'

const MessageLeft: FunctionComponent<{ message: MessageType }> = (props) => {
  const { message } = props

  return (
    <>
      <div className="chat-widget-speaker left">
        <div className="chat-widget-speaker-avatar">
          <UserAvatar image={`${process.env.PUBLIC_URL}/assets/img/avatar/03.jpg`} />

          {/* <div className="user-avatar tiny no-border">
              <div className="user-avatar-content">
                <div className="hexagon-image-24-26" data-src="img/avatar/03.jpg" />
              </div>
            </div> */}
        </div>

        <p className="chat-widget-speaker-message">{message.message}</p>

        <p className="chat-widget-speaker-timestamp">Yesterday at 8:36PM</p>
      </div>
    </>
  )
}

export default MessageLeft
