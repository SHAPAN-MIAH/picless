import React, { FunctionComponent } from 'react'

const SectionMenu: FunctionComponent<{}> = () => {
  return (
    <>
      <nav className="section-navigation">
        <div id="section-navigation-slider" className="section-menu">
          <a className="section-menu-item active" href="profile-about.html">
            <svg className="section-menu-item-icon icon-profile">
              <use xlinkHref="#svg-profile" />
            </svg>

            <p className="section-menu-item-text">About</p>
          </a>

          <a className="section-menu-item" href="profile-timeline.html">
            <svg className="section-menu-item-icon icon-timeline">
              <use xlinkHref="#svg-timeline" />
            </svg>

            <p className="section-menu-item-text">Timeline</p>
          </a>

          <a className="section-menu-item" href="profile-friends.html">
            <svg className="section-menu-item-icon icon-friend">
              <use xlinkHref="#svg-friend" />
            </svg>

            <p className="section-menu-item-text">Friends</p>
          </a>

          <a className="section-menu-item" href="profile-photos.html">
            <svg className="section-menu-item-icon icon-photos">
              <use xlinkHref="#svg-photos" />
            </svg>

            <p className="section-menu-item-text">Photos</p>
          </a>

          <a className="section-menu-item" href="profile-videos.html">
            <svg className="section-menu-item-icon icon-videos">
              <use xlinkHref="#svg-videos" />
            </svg>

            <p className="section-menu-item-text">Videos</p>
          </a>
        </div>

        <div id="section-navigation-slider-controls" className="slider-controls">
          <div className="slider-control left">
            <svg className="slider-control-icon icon-small-arrow">
              <use xlinkHref="#svg-small-arrow" />
            </svg>
          </div>

          <div className="slider-control right">
            <svg className="slider-control-icon icon-small-arrow">
              <use xlinkHref="#svg-small-arrow" />
            </svg>
          </div>
        </div>
      </nav>
    </>
  )
}

export default SectionMenu
