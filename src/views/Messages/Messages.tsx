import React, { FunctionComponent } from 'react'
import LayoutMain from '../LayoutMain/LayoutMain'
import Message from './Message/Message'
import UserStatus from './UserStatus/UserStatus'
import UserAvatar from '../../components/UserAvatar'

const Messages: FunctionComponent<{}> = () => {
  const fieldRef = React.useRef<HTMLDivElement>(null)

  const showMessages = () => {
    const { current } = fieldRef
    if (current) {
      current.scrollIntoView()
    }
  }

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid ">
            <div className="account-hub-content">
              <div className="section-header">
                <div className="section-header-info">
                  <p className="section-pretitle">My Profile</p>

                  <h2 className="section-title">Messages</h2>
                </div>

                <div className="section-header-actions">
                  <p className="section-header-action">Mark all as Read</p>

                  <p className="section-header-action">Settings</p>
                </div>
              </div>

              <div className="chat-widget-wrap">
                <div className="chat-widget static">
                  <div className="chat-widget-messages" data-simplebar>
                    <UserStatus active={false} onClick={showMessages} />
                    <UserStatus active={false} />
                    <UserStatus active={false} />
                    <UserStatus
                      active={true}
                      lastMessage={
                        "You're right, it's been a really long time! I think the last time we saw was at Neko's party"
                      }
                    />
                    <UserStatus active={false} />
                  </div>

                  <form className="chat-widget-form">
                    <div className="interactive-input small">
                      <input
                        type="text"
                        id="chat-widget-search-2"
                        name="chat_widget_search_2"
                        placeholder="Search users..."
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
                  </form>
                </div>

                <div className="chat-widget" ref={fieldRef}>
                  <div className="chat-widget-header">
                    <div className="chat-widget-settings">
                      <div className="post-settings-wrap">
                        <div className="post-settings widget-box-post-settings-dropdown-trigger">
                          <svg className="post-settings-icon icon-more-dots">
                            <use xlinkHref="#svg-more-dots" />
                          </svg>
                        </div>

                        <div className="simple-dropdown widget-box-post-settings-dropdown">
                          <p className="simple-dropdown-link">Report</p>

                          <p className="simple-dropdown-link">Block</p>

                          <p className="simple-dropdown-link">Mute</p>
                        </div>
                      </div>
                    </div>

                    <div className="user-status">
                      <UserAvatar image={`${process.env.PUBLIC_URL}/assets/img/avatar/04.jpg`} />

                      <p className="user-status-title">
                        <span className="bold">Nick Grissom</span>
                      </p>

                      <p className="user-status-tag online">Online</p>
                    </div>
                  </div>

                  <div className="chat-widget-conversation" data-simplebar>
                    <div className="chat-widget-speaker left">
                      <div className="chat-widget-speaker-avatar">
                        <div className="user-avatar tiny no-border">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-24-26" data-src="img/avatar/03.jpg" />
                          </div>
                        </div>
                      </div>

                      <p className="chat-widget-speaker-message">Hi Marina! It's been a long time!</p>

                      <p className="chat-widget-speaker-timestamp">Yesterday at 8:36PM</p>
                    </div>

                    <div className="chat-widget-speaker right">
                      <p className="chat-widget-speaker-message">Hey Nick!</p>

                      <p className="chat-widget-speaker-message">
                        You're right, it's been a really long time! I think the last time we saw was at Neko's party
                      </p>

                      <p className="chat-widget-speaker-timestamp">10:05AM</p>
                    </div>

                    <div className="chat-widget-speaker left">
                      <div className="chat-widget-speaker-avatar">
                        <div className="user-avatar tiny no-border">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-24-26" data-src="img/avatar/03.jpg" />
                          </div>
                        </div>
                      </div>

                      <p className="chat-widget-speaker-message">Yeah! I remember now! The stream launch party</p>

                      <p className="chat-widget-speaker-message">That reminds me that I wanted to ask you something</p>

                      <p className="chat-widget-speaker-message">Can you stream the new game?</p>
                    </div>
                  </div>

                  <form className="chat-widget-form">
                    <div className="form-row split">
                      <div className="form-item">
                        <div className="interactive-input small">
                          <input
                            type="text"
                            id="chat-widget-message-text-2"
                            name="chat_widget_message_text_2"
                            placeholder="Write a message..."
                          />

                          <div className="interactive-input-icon-wrap actionable">
                            <div className="tooltip-wrap text-tooltip-tft" data-title="Send Photo">
                              <svg className="interactive-input-icon icon-camera">
                                <use xlinkHref="#svg-camera" />
                              </svg>
                            </div>
                          </div>

                          <div className="interactive-input-action">
                            <svg className="interactive-input-action-icon icon-cross-thin">
                              <use xlinkHref="#svg-cross-thin" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="form-item auto-width">
                        <p className="button primary padded">
                          <svg className="button-icon no-space icon-send-message">
                            <use xlinkHref="#svg-send-message" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}

export default Messages
