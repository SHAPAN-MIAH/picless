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
              <FontAwesomeIcon icon="home" size="lg" color="#8b88ff " />
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
