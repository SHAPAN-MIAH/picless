import React, { FunctionComponent } from 'react'

const UserHeader: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="profile-header">
        <figure className="profile-header-cover liquid">
          <img src={`${process.env.PUBLIC_URL}/assets/img/cover/01.jpg`} alt="cover-01" />
        </figure>

        <div className="profile-header-info">
          <div className="user-short-description big">
            <a className="user-short-description-avatar user-avatar big" href="profile-timeline.html">
              <div className="user-avatar-border">
                <div className="hexagon-148-164" />
              </div>

              <div className="user-avatar-content">
                <div className="hexagon-image-100-110" data-src={`${process.env.PUBLIC_URL}/assets/img/avatar/01.jpg`} />
              </div>

              <div className="user-avatar-progress">
                <div className="hexagon-progress-124-136" />
              </div>

              <div className="user-avatar-progress-border">
                <div className="hexagon-border-124-136" />
              </div>

              <div className="user-avatar-badge">
                <div className="user-avatar-badge-border">
                  <div className="hexagon-40-44" />
                </div>

                <div className="user-avatar-badge-content">
                  <div className="hexagon-dark-32-34" />
                </div>

                <p className="user-avatar-badge-text">24</p>
              </div>
            </a>

            <a
              className="user-short-description-avatar user-short-description-avatar-mobile user-avatar medium"
              href="profile-timeline.html"
            >
              <div className="user-avatar-border">
                <div className="hexagon-120-132" />
              </div>

              <div className="user-avatar-content">
                <div className="hexagon-image-82-90" data-src="img/avatar/01.jpg" />
              </div>

              <div className="user-avatar-progress">
                <div className="hexagon-progress-100-110" />
              </div>

              <div className="user-avatar-progress-border">
                <div className="hexagon-border-100-110" />
              </div>

              <div className="user-avatar-badge">
                <div className="user-avatar-badge-border">
                  <div className="hexagon-32-36" />
                </div>

                <div className="user-avatar-badge-content">
                  <div className="hexagon-dark-26-28" />
                </div>

                <p className="user-avatar-badge-text">24</p>
              </div>
            </a>

            <p className="user-short-description-title">
              <a href="profile-timeline.html">USERNAME</a>
            </p>

            <p className="user-short-description-text">
              <a href="#/">www.gamehuntress.com</a>
            </p>
          </div>

          <div className="profile-header-social-links-wrap">
            <div id="profile-header-social-links-slider" className="profile-header-social-links">
              <div className="profile-header-social-link">
                <a className="social-link facebook" href="#/">
                  <svg className="icon-facebook">
                    <use xlinkHref="#svg-facebook" />
                  </svg>
                </a>
              </div>

              <div className="profile-header-social-link">
                <a className="social-link twitter" href="#/">
                  <svg className="icon-twitter">
                    <use xlinkHref="#svg-twitter" />
                  </svg>
                </a>
              </div>

              <div className="profile-header-social-link">
                <a className="social-link instagram" href="#/">
                  <svg className="icon-instagram">
                    <use xlinkHref="#svg-instagram" />
                  </svg>
                </a>
              </div>

              <div className="profile-header-social-link">
                <a className="social-link twitch" href="#/">
                  <svg className="icon-twitch">
                    <use xlinkHref="#svg-twitch" />
                  </svg>
                </a>
              </div>

              <div className="profile-header-social-link">
                <a className="social-link youtube" href="#/">
                  <svg className="icon-youtube">
                    <use xlinkHref="#svg-youtube" />
                  </svg>
                </a>
              </div>

              <div className="profile-header-social-link">
                <a className="social-link patreon" href="#/">
                  <svg className="icon-patreon">
                    <use xlinkHref="#svg-patreon" />
                  </svg>
                </a>
              </div>

              <div className="profile-header-social-link">
                <a className="social-link discord" href="#/">
                  <svg className="icon-discord">
                    <use xlinkHref="#svg-discord" />
                  </svg>
                </a>
              </div>
            </div>

            <div id="profile-header-social-links-slider-controls" className="slider-controls">
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
          </div>

          <div className="user-stats">
            <div className="user-stat big">
              <p className="user-stat-title">930</p>

              <p className="user-stat-text">posts</p>
            </div>

            <div className="user-stat big">
              <p className="user-stat-title">82</p>

              <p className="user-stat-text">friends</p>
            </div>

            <div className="user-stat big">
              <p className="user-stat-title">5.7k</p>

              <p className="user-stat-text">visits</p>
            </div>

            <div className="user-stat big">
              <img className="user-stat-image" src="img/flag/usa.png" alt="flag-usa" />

              <p className="user-stat-text">usa</p>
            </div>
          </div>

          <div className="profile-header-info-actions">
            <p className="profile-header-info-action button secondary">
              <span className="hide-text-mobile">Add</span> Friend +
            </p>

            <p className="profile-header-info-action button primary">
              <span className="hide-text-mobile">Send</span> Message
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserHeader
