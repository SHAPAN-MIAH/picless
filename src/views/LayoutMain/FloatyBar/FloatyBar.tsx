import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import useMenu from '../../../hooks/useMenu'
import useUser from '../../../hooks/useUser'

const FloatyBar: FunctionComponent<{}> = () => {
  const { user } = useUser()
  const { showMenu, setShowMenu } = useMenu()

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()
    setShowMenu(!showMenu)
  }

  const handleCloseMenu = () => {
    showMenu && setShowMenu(false);
  }

  return (
    <>
      <aside className="floaty-bar" style={{ zIndex: 999999, backgroundColor: '#FFF', borderTop: '1px solid #eaeaf5'}}>
        <div className="bar-actions"> </div>

        <div className="bar-actions">
          <div className="action-list dark" onClick={handleCloseMenu}>
            <Link className="action-list-item" to="/user/home">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#000000"
                  d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"
                />
              </svg>
            </Link>

            <Link className="action-list-item unread" to="/user/notification">
              <svg className="action-list-item-icon icon-notification">
                <use xlinkHref="#svg-notification" style={{ fill: "#000000"}}/>
              </svg>
            </Link>

            {user.verifiedAccount ? (
              <Link className="action-list-item" to="/user/create-post">
                <svg className="action-list-item-icon icon-plus">
                  <use xlinkHref="#svg-plus" style={{ fill: "#000000"}}/>
                </svg>
              </Link>
            ) : (
              <Link className="action-list-item" to="/user/discover">
                <svg className="action-list-item-icon icon-magnifying-glass">
                  <use xlinkHref="#svg-magnifying-glass" style={{ fill: "#000000"}}/>
                </svg>
              </Link>
            )}

            <Link className="action-item-wrap" to="/user/messages">
              <div className="action-item">
                <svg className="action-item-icon icon-messages">
                  <use xlinkHref="#svg-messages" style={{ fill: "#000000"}}/>
                </svg>
              </div>
            </Link>

            <a className="action-list-item" href="" onClick={handleMenu}>
              <div className="menu-item-link-icon icon-members">
                <svg className="icon-members">
                  <use xlinkHref="#svg-members" style={{ fill: "#000000"}}/>
                </svg>
                <div className="burger-icon-bar" />

                <div className="burger-icon-bar" />

                <div className="burger-icon-bar" />
              </div>
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}

export default FloatyBar
