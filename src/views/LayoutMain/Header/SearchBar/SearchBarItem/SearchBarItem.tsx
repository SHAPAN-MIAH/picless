import React, { FunctionComponent } from 'react'

const SearchBarItem: FunctionComponent<{ data: any }> = (props) => {
  const { data } = props
  return (
    <>
      <a className="dropdown-box-list-item" href="profile-timeline.html">
        <div className="user-status notification">
          <div className="user-status-avatar">
            <div className="user-avatar small no-outline">
              <div className="user-avatar-content">
                <div className="hexagon-image-30-32" data-src="img/avatar/15.jpg" />
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

                <p className="user-avatar-badge-text">7</p>
              </div>
            </div>
          </div>

          <p className="user-status-title">
            <span className="bold">Tim Rogers</span>
          </p>

          <div className="user-status-icon">
            <svg className="icon-friend">
              <use xlinkHref="#svg-friend" />
            </svg>
          </div>
        </div>
      </a>
    </>
  )
}

export default SearchBarItem
