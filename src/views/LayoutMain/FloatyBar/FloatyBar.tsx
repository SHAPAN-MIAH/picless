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

  return (
    <>
      <aside className="floaty-bar">
        <div className="bar-actions"> </div>

        <div className="bar-actions">
          <div className="action-list dark">
            <Link className="action-list-item" to="/user/home">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#8b88ff"
                  d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"
                />
              </svg>
            </Link>

            <Link className="action-list-item unread" to="/user/notification">
              <svg className="action-list-item-icon icon-notification">
                <use xlinkHref="#svg-notification" />
              </svg>
            </Link>

            {user.verifiedAccount ? (
              <Link className="action-list-item" to="/user/create-post">
                <svg className="action-list-item-icon icon-plus">
                  <use xlinkHref="#svg-plus" />
                </svg>
              </Link>
            ) : (
              <Link className="action-list-item" to="/user/discover">
                <svg className="action-list-item-icon icon-magnifying-glass">
                  <use xlinkHref="#svg-magnifying-glass" />
                </svg>
              </Link>
            )}

            <Link className="action-item-wrap" to="/user/messages">
              <div className="action-item">
                <svg className="action-item-icon icon-messages">
                  <use xlinkHref="#svg-messages" />
                </svg>
              </div>
            </Link>

            <a className="action-list-item" href="" onClick={handleMenu}>
              <div className="burger-icon inverted">
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
