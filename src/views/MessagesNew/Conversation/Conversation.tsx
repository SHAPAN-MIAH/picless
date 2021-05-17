import React, { FunctionComponent, useEffect, useRef } from 'react'
import SimpleBar from 'simplebar-react'
import useChatMessages from 'hooks/useChatMessages'
import Header from './Header/Header'
import NoUserSelected from './NoUserSelected'
import Messages from './Messages/Messages'
import WriteMessage from './WriteMessage/WriteMessage'

const Conversation: FunctionComponent<{}> = () => {
  const { userSelected, loadingMessages, currentConversation } = useChatMessages()

  const messageRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (messageRef.current) {
      const message = messageRef.current
      message.scrollTop = messageRef.current?.scrollHeight
    }
  }, [currentConversation])

  if (!userSelected) return <NoUserSelected />

  return (
    <>
      {/* HEADER */}
      <div className="chat-widget-header">{userSelected && <Header user={userSelected} loading={loadingMessages} />}</div>

      {/* MESSAGES */}
      <SimpleBar scrollableNodeProps={{ ref: messageRef }} className="chat-widget-conversation">
        <Messages />
      </SimpleBar>

      {/* WRITE MESSAGE */}
      <WriteMessage />
    </>
  )
}

export default Conversation
