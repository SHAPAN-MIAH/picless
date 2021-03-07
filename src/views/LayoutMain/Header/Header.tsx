import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import useAppContext from '../../../hooks/useAppContext'
import useMenu from '../../../hooks/useMenu'
import SearchBar from './SearchBar/SearchBar'

const Header: FunctionComponent<{}> = () => {
  const { showMenu, setShowMenu } = useMenu()
  const { title } = useAppContext()

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <header className="header">
        <div className="header-actions">
          <div className="header-brand">
            <div className="logo">
              <svg className="icon-logo-vikinger small">
                <use xlinkHref="#svg-logo-vikinger" />
              </svg>
            </div>

            <h1 className="header-brand-text">{process.env.REACT_APP_WEBSITE_NAME}</h1>

            <div className="sidemenu-trigger" onClick={handleMenu}>
              <svg className="icon-grid">
                <use xlinkHref="#svg-grid" />
              </svg>
            </div>

            <div className="mobilemenu-trigger" onClick={handleMenu}>
              <div className="burger-icon inverted">
                <div className="burger-icon-bar" />

                <div className="burger-icon-bar" />

                <div className="burger-icon-bar" />
              </div>
            </div>
          </div>
        </div>

        <SearchBar />

        <div className="header-actions">
          <div className="action-list dark">
            <div className="action-list-item-wrap">
              <Link to="/user/home" className="action-list-item">
                <FontAwesomeIcon icon="bars" size="lg" color="#8b88ff" />
              </Link>
            </div>

            <div className="action-list-item-wrap">
              <Link to="/user/home" className="action-list-item">
                <FontAwesomeIcon icon="plus" size="lg" color="#8b88ff" />
              </Link>
            </div>

            <div className="action-list-item-wrap">
              <div className="action-list-item unread header-dropdown-trigger">
                <svg className="action-list-item-icon icon-notification">
                  <use xlinkHref="#svg-notification" />
                </svg>
              </div>

              <div className="dropdown-box header-dropdown">
                <div className="dropdown-box-header">
                  <p className="dropdown-box-header-title">Notifications</p>

                  <div className="dropdown-box-header-actions">
                    <p className="dropdown-box-header-action">Mark all as Read</p>

                    <p className="dropdown-box-header-action">Settings</p>
                  </div>
                </div>

                <div className="dropdown-box-list" data-simplebar>
                  <div className="dropdown-box-list-item unread">
                    <div className="user-status notification">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/03.jpg" />
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

                            <p className="user-avatar-badge-text">16</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          Nick Grissom
                        </a>{' '}
                        posted a comment on your{' '}
                        <a className="highlighted" href="profile-timeline.html">
                          status update
                        </a>
                      </p>

                      <p className="user-status-timestamp">2 minutes ago</p>

                      <div className="user-status-icon">
                        <svg className="icon-comment">
                          <use xlinkHref="#svg-comment" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="user-status notification">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/07.jpg" />
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

                            <p className="user-avatar-badge-text">26</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          Sarah Diamond
                        </a>
                        left a like{' '}
                        <img
                          className="reaction"
                          src={`${process.env.PUBLIC_URL}/assets/img/reaction/like.png`}
                          alt="reaction-like"
                        />
                        reaction on your{' '}
                        <a className="highlighted" href="profile-timeline.html">
                          status update
                        </a>
                      </p>

                      <p className="user-status-timestamp">17 minutes ago</p>

                      <div className="user-status-icon">
                        <svg className="icon-thumbs-up">
                          <use xlinkHref="#svg-thumbs-up" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="user-status notification">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/02.jpg" />
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

                            <p className="user-avatar-badge-text">13</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          Destroy Dex
                        </a>{' '}
                        posted a comment on your{' '}
                        <a className="highlighted" href="profile-photos.html">
                          photo
                        </a>
                      </p>

                      <p className="user-status-timestamp">31 minutes ago</p>

                      <div className="user-status-icon">
                        <svg className="icon-comment">
                          <use xlinkHref="#svg-comment" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="user-status notification">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/10.jpg" />
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

                            <p className="user-avatar-badge-text">5</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          The Green Goo
                        </a>{' '}
                        left a love{' '}
                        <img
                          className="reaction"
                          src={`${process.env.PUBLIC_URL}/assets/img/reaction/love.png`}
                          alt="reaction-love"
                        />{' '}
                        reaction on your{' '}
                        <a className="highlighted" href="profile-timeline.html">
                          status update
                        </a>
                      </p>

                      <p className="user-status-timestamp">2 hours ago</p>

                      <div className="user-status-icon">
                        <svg className="icon-thumbs-up">
                          <use xlinkHref="#svg-thumbs-up" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="user-status notification">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/05.jpg" />
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

                            <p className="user-avatar-badge-text">12</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          Neko Bebop
                        </a>{' '}
                        posted a comment on your{' '}
                        <a className="highlighted" href="profile-timeline.html">
                          status update
                        </a>
                      </p>

                      <p className="user-status-timestamp">3 hours ago</p>

                      <div className="user-status-icon">
                        <svg className="icon-comment">
                          <use xlinkHref="#svg-comment" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <a className="dropdown-box-button secondary" href="hub-profile-notifications.html">
                  View all Notifications
                </a>
              </div>
            </div>
          </div>

          <div className="action-item-wrap">
            <div className="action-item dark">
              <Link to="/user/messages" data-title="Messages">
                <svg className="action-item-icon icon-messages">
                  <use xlinkHref="#svg-messages" />
                </svg>
              </Link>
            </div>
          </div>

          {/* <AccountSettings /> */}
        </div>
      </header>
    </>
  )
}

export default Header
