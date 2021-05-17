import useChatMessages from 'hooks/useChatMessages'
import useChatSignalR from 'hooks/useChatSignalR'
import React, { FunctionComponent, useEffect } from 'react'
import SimpleBar from 'simplebar-react'
import Conversation from './Conversation/Conversation'
import Users from './Users/Users'

const Chat: FunctionComponent<{}> = () => {
  useChatSignalR()

  return (
    <>
      <div className="content-grid">
        <div className="grid fixed-grid">
          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">My Profile</p>

                <h2 className="section-title">Messages</h2>
              </div>
            </div>

            <div className="chat-widget-wrap">
              <div className="chat-widget static">
                <SimpleBar className="chat-widget-messages">
                  <Users />
                </SimpleBar>

                {/* <form className="chat-widget-form" style={{ marginTop: '31px' }}>
                    <div className="interactive-input small">
                      <input
                        type="text"
                        id="chat-widget-search-2"
                        name="chat_widget_search_2"
                        placeholder="Search users..."
                        // onChange={handleFilterByUsers}
                      />

                      <div className="interactive-input-icon-wrap">
                        <svg className="interactive-input-icon icon-magnifying-glass">
                          <use xlinkHref="#svg-magnifying-glass" />
                        </svg>
                      </div>

                      <div className="interactive-input-action">
                        <svg className="interactive-input-action-icon icon-cross-thin">
                          <use xlinkHref="#svg-cross-thin" />
                        </svg>
                      </div>
                    </div>
                  </form> */}
              </div>

              <div className="chat-widget">
                <Conversation />
                {/*  {!!userSelected && <Conversation key={userSelected.userId} sendMessage={sendMessageToUser} />}

                {!userSelected && (
                  <div className="chat-widget-header">
                    <h2>No user Selected</h2>
                  </div>
                )}*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
