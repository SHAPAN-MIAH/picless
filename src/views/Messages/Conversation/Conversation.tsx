import React, { FunctionComponent, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { loadingSelector, getCurrentChat, getUserSelector } from '../../../redux/Chat/ChatSelectors'

import Chat from './Message/Chat'
import SendMessage from './SendMessage/SendMessage'
import HeaderConversation from './HeaderConversation/HeaderConversation'

import { UserStatusMessagesType, MessageType } from '../../../types/MessagesType'

type ConversationProps = {
  sendMessage: (value: string) => void
}

const Conversation: FunctionComponent<ConversationProps> = (props) => {
  const { sendMessage } = props

  const loading: boolean = useSelector(loadingSelector)
  const userSelected: UserStatusMessagesType | undefined = useSelector(getUserSelector)

  const currentChat: MessageType[] = useSelector(getCurrentChat)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading && chatContainerRef && chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentChat, loading])

  return (
    <>
      <div className="chat-widget-header">{userSelected && <HeaderConversation user={userSelected} />}</div>
      {currentChat && <Chat ref={chatContainerRef} messages={currentChat} />}
      <SendMessage sendMessage={sendMessage} />
    </>
  )
}

export default Conversation
