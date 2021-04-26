import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import useUser from '../../../hooks/useUser'
import useAppContext from '../../../hooks/useAppContext'
import useMenu from '../../../hooks/useMenu'
import NotificationPopup from './NotificationPopup/NotificationPopup'
import SearchBar from './SearchBar/SearchBar'

const Header: FunctionComponent<{}> = () => {
  const { showMenu, setShowMenu } = useMenu()
  const { user } = useUser()
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
          </div>
        </div>

        <SearchBar />

        <div className="header-actions">
          <div className="action-list dark">
            <div className="action-list-item-wrap">
              <Link to="/user/home" className="action-list-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#8b88ff"
                    d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"
                  />
                </svg>
              </Link>
            </div>

            <div className="action-list-item-wrap">
              <div className="action-list-item unread header-dropdown-trigger">
                <svg className="action-list-item-icon icon-notification">
                  <use xlinkHref="#svg-notification" />
                </svg>
              </div>

              <NotificationPopup />
            </div>

            {user.verifiedAccount && (
              <div className="action-list-item-wrap">
                <Link to="/user/create-post" className="action-list-item">
                  <FontAwesomeIcon icon="plus" size="lg" color="#8b88ff" />
                </Link>
              </div>
            )}
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
