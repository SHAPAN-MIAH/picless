import React, { FunctionComponent } from 'react'

const Message: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="chat-widget-message active">
        <div className="user-status">
          <div className="user-status-avatar">
            <div className="user-avatar small no-outline">
              <div className="user-avatar-content">
                <div className="hexagon-image-30-32" data-src={`${process.env.PUBLIC_URL}/assets/img/avatar/04.jpg`} />
              </div>

              <div className="user-avatar-progress">
                <div className="hexagon-progress-40-44" />
              </div>

              <div className="user-avatar-progress-border">
                <div className="hexagon-border-40-44" />
              </div>

              <div className="user-avatar-badge">
                <div className="user-avatar-badge-border">
                  <div className="hexagon-22-24" />
                </div>

                <div className="user-avatar-badge-content">
                  <div className="hexagon-dark-16-18" />
                </div>

                <p className="user-avatar-badge-text">6</p>
              </div>
            </div>
          </div>

          <p className="user-status-title" style={{ margin: '0px' }}>
            <span className="bold">Bearded Wonder</span>
          </p>

          <p className="user-status-text">Great! Then we'll meet with them at the party...</p>

          <p className="user-status-timestamp floaty">2 hours ago</p>
        </div>
      </div>
    </>
  )
}

export default Message
