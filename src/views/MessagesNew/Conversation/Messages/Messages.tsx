import React, { FunctionComponent, useState } from 'react'
import Loader from 'react-loader-spinner'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'

import useChatMessages from 'hooks/useChatMessages'
import { MessageType } from 'types/MessagesType'
import * as Utils from '../../../../utils/Functions'

import useUser from 'hooks/useUser'

const LoadingContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e4e4;
  margin-top: -20px;
`

const Messages: FunctionComponent<{}> = () => {
  const { loadingMessages, currentConversation } = useChatMessages()
  const { user } = useUser()

  return (
    <>
      <Fade duration={400} collapse top when={loadingMessages}>
        <LoadingContainerDiv>
          <Loader type="TailSpin" color="#615dfa" height={20} width={20} visible />
          <h6 style={{ paddingTop: '6px', paddingLeft: '10px' }}>Loading ...</h6>
        </LoadingContainerDiv>
      </Fade>

      {currentConversation && (
        <>
          {currentConversation.map((msg: MessageType) => {
            const key = msg.id || Utils.simpleKeyGenerator(5)

            if (msg.fromUserId === user.id) {
              return (
                <div key={key} className="chat-widget-speaker right">
                  <p className="chat-widget-speaker-message">{msg.content}</p>
                </div>
              )
            }

            return (
              <div key={key} className="chat-widget-speaker left">
                <p className="chat-widget-speaker-message">{msg.content}</p>
              </div>
            )
          })}
        </>
      )}
    </>
  )
}

export default Messages
