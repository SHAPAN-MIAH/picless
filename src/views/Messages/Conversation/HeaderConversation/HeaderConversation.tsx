import React, { FunctionComponent, useState, useEffect, useRef, forwardRef } from 'react'
import { useSelector } from 'react-redux'

import Loader from 'react-loader-spinner'

import { loadingSelector } from '../../../../redux/Chat/ChatSelectors'

import UserAvatar from '../../../../components/UserAvatar'

import { UserStatusMessagesType } from '../../../../types/MessagesType.d'

type HeaderConversationProps = { user: UserStatusMessagesType }

const HeaderConversation: FunctionComponent<HeaderConversationProps> = (props) => {
  const loading: boolean = useSelector(loadingSelector)

  const { user } = props
  // const [coverPicture, setCoverPicture] = useState<string>(process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture)

  const status = (user.connectionId !== null && user.connectionId) !== '' ? 'online' : 'offline'

  useEffect(() => {
    // setCoverPicture(user.coverPicture)
  }, [user])

  return (
    <>
      <div className="user-status">
        <UserAvatar
          key={`avatar-${user.userId}`}
          image={process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture}
          size="SMALL"
        />
        <div className="chat-widget-settings">
          {loading && <Loader type="TailSpin" color="#615dfa" height={25} width={25} visible />}
        </div>
        <p className="user-status-title">
          <span className="bold">{user.fullName}</span>
        </p>

        <p className={`user-status-tag ${status}`}>{status}</p>
      </div>
    </>
  )
}

export default HeaderConversation
