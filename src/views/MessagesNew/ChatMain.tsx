import ChatContextProvider from 'context/ChatReducerContext'
import React, { FunctionComponent } from 'react'
import Chat from './Chat'

const ChatMain: FunctionComponent<{}> = () => {
  return (
    <>
      <ChatContextProvider>
        <Chat />
      </ChatContextProvider>
    </>
  )
}

export default ChatMain
