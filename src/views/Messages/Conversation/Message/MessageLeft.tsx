import React, { forwardRef } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import UserAvatar from '../../../../components/UserAvatar'

import { getUserSelector } from '../../../../redux/Chat/ChatSelectors'

import { SingleMessageType, UserStatusMessagesType } from '../../../../types/MessagesType.d'

const MessageLeft = forwardRef<HTMLDivElement | null, SingleMessageType>((props, ref) => {
  const userSelected: UserStatusMessagesType | undefined = useSelector(getUserSelector)

  const { message, showAvatar = true, showTime = false } = props

  const contentMsg = message.content || message.message

  let urlAvatar = ''

  if (userSelected) {
    urlAvatar = userSelected.avatarPicture
  }
  return (
    <>
      <div ref={ref} className="chat-widget-speaker left">
        {showAvatar && (
          <div className="chat-widget-speaker-avatar">
            <UserAvatar imageName={urlAvatar} size="TINY" />
          </div>
        )}

        <p className="chat-widget-speaker-message">{contentMsg}</p>
        {showTime && <p className="chat-widget-speaker-timestamp">{moment(message.registerDate).fromNow()}</p>}
      </div>
    </>
  )
})

export default MessageLeft
