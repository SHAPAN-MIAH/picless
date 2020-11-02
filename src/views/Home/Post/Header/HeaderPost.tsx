import React, { FunctionComponent } from 'react'

const HeaderPost: FunctionComponent<{}> = () => {
  return (
    <div className="user-status">
      <a className="user-status-avatar" href="profile-timeline.html">
        <div className="user-avatar small no-outline">
          <div className="user-avatar-content">
            <div className="hex">
              <img
                alt="asd"
                style={{ width: '40px', height: '42px' }}
                src={`${process.env.PUBLIC_URL}/assets/img/avatar/05.jpg`}
              />
            </div>
          </div>

          <div className="user-avatar-progress">
            <div className="hexagon-progress-40-44" />
          </div>

          <div className="user-avatar-progress-border">
            <div className="hexagon-border-40-44" />
          </div>
        </div>
      </a>

      <p className="user-status-title medium">
        <a className="bold" href="profile-timeline.html">
          Neko Bebop
        </a>
        uploaded a <span className="bold">video</span>
      </p>

      <p className="user-status-text small">2 minutes ago</p>
    </div>
  )
}

export default HeaderPost
