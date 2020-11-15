import React, { forwardRef } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import UserAvatar from '../../../../components/UserAvatar'

import { getUserSelector } from '../../../../redux/Chat/ChatSelectors'

import { MessageType, UserStatusMessagesType } from '../../../../types/MessagesType.d'

const MessageLeft = forwardRef<HTMLDivElement | null, { message: MessageType }>((props, ref) => {
  const userSelected: UserStatusMessagesType | undefined = useSelector(getUserSelector)

  const { message } = props

  const contentMsg = message.content || message.message

  let urlAvatar = ''

  if (userSelected) {
    urlAvatar = process.env.REACT_APP_BUCKET_IMAGES + userSelected.coverPicture
  }
  return (
    <>
      <div ref={ref} className="chat-widget-speaker left">
        <div className="chat-widget-speaker-avatar">
          <UserAvatar image={urlAvatar} size="TINY" />
        </div>

        <p className="chat-widget-speaker-message">{contentMsg}</p>

        <p className="chat-widget-speaker-timestamp">{moment(message.registerDate).fromNow()}</p>
      </div>
    </>
  )
})

export default MessageLeft
