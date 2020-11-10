import React, { FunctionComponent } from 'react'
import LayoutMain from '../LayoutMain/LayoutMain'
import ChatMessages from './Converation/Conversation'
import UserStatus from './UserStatus/UserStatus'
import UserAvatar from '../../components/UserAvatar'
import Conversation from './Converation/Conversation'

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

                  <Conversation />
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
