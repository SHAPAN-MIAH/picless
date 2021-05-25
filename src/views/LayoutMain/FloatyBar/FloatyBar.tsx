import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import useMenu from '../../../hooks/useMenu'
import useUser from '../../../hooks/useUser'

import './FloatyBar.css'

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
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <path
                  fill="#000000"
                  d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"
                />
              </svg>
            </Link>

            <Link className="action-list-item unread" to="/user/notification">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <path
                  fill="#000000"
                  d="M18.583,14.127c-0.023-0.018-2.241-1.758-2.241-7.52C16.342,2.964,13.497,0,10.004,0C6.511,0,3.668,2.964,3.668,6.607c0,5.762-2.22,7.502-2.228,7.508c-0.365,0.254-0.525,0.725-0.397,1.158c0.129,0.434,0.517,0.73,0.957,0.73h16.007c0.433,0,0.81-0.293,0.943-0.719C19.086,14.861,18.932,14.389,18.583,14.127zM4.086,13.939C4.873,12.527,5.67,10.21,5.67,6.607c0-2.505,1.945-4.542,4.334-4.542c2.391,0,4.335,2.038,4.335,4.542c0,3.603,0.796,5.92,1.583,7.333H4.086z M12.418,17.146c-0.57-0.283-1.293-0.115-1.619,0.381c-0.126,0.191-0.327,0.326-0.567,0.383c-0.234,0.051-0.478,0.023-0.688-0.084c-0.138-0.07-0.255-0.174-0.336-0.297c-0.325-0.496-1.05-0.668-1.618-0.385c-0.568,0.283-0.766,0.914-0.44,1.408c0.286,0.438,0.7,0.803,1.194,1.055C8.854,19.867,9.421,20,9.997,20c0.281,0,0.564-0.031,0.843-0.096c0.856-0.197,1.573-0.676,2.016-1.348C13.182,18.061,12.984,17.432,12.418,17.146z"
                />
              </svg>
            </Link>

            {user.verifiedAccount ? (
              <Link className="action-list-item" to="/user/create-post">
                <svg className="action-list-item-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M20,11h-9v9H9v-9H0V9h9V0h2v9h9V11z"
                  />
                </svg>
              </Link>
            ) : (
              <Link className="action-list-item" to="/user/discover">
                <svg className="action-list-item-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M8,2c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S4.691,2,8,2 M8,0C3.582,0,0,3.582,0,8c0,4.418,3.582,8,8,8c4.418,0,8-3.582,8-8C16,3.582,12.418,0,8,0L8,0z"
                  />
                </svg>
              </Link>
            )}

            <Link className="action-item-wrap" to="/user/messages">
              <div className="action-item">
                <svg className="action-list-item-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M12,2c1.103,0,2,0.897,2,2v5c0,1.103-0.897,2-2,2H8H7.754l-0.239,0.06L2,12.438V9V4c0-1.103,0.897-2,2-2H12M12,0H4C1.791,0,0,1.791,0,4v5v6l8-2h4c2.209,0,4-1.791,4-4V4C16,1.791,14.209,0,12,0L12,0z"
                  />
                  <path
                    fill="#000000"
                    d="M12,5.012C12,5.558,11.558,6,11.013,6H4.987C4.442,6,4,5.558,4,5.012V4.988C4,4.442,4.442,4,4.987,4h6.025C11.558,4,12,4.442,12,4.988V5.012z"
                  />
                  <path
                    fill="#000000"
                    d="M10,8.047C10,8.574,9.573,9,9.047,9H4.953C4.427,9,4,8.574,4,8.047V7.953C4,7.426,4.427,7,4.953,7h4.094C9.573,7,10,7.426,10,7.953V8.047z"
                  />
                  <path 
                    fill="#000000"
                    d="M17,5.142v2.136C17.595,7.625,18,8.263,18,9v5v3.438l-5.516-1.379L12.246,16H12H8c-0.737,0-1.375-0.405-1.722-1H4.142C4.588,16.722,6.139,18,8,18h4l8,2v-6V9C20,7.139,18.722,5.588,17,5.142z"
                  />
                </svg>
              </div>
            </Link>

            <a className="action-list-item" href="" onClick={handleMenu}>
              <div className="menu-item-link-icon">
                <svg className="action-list-item-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M10,10c2.762,0,5-2.238,5-5c0-2.762-2.238-5-5-5S5,2.238,5,5C5,7.761,7.238,10,10,10z M10,2c1.654,0,3,1.346,3,3s-1.346,3-3,3S7,6.654,7,5S8.346,2,10,2z M13,12H7c-3.313,0-6,2.686-6,6v2h2v-2c0-2.205,1.794-4,4-4h6c2.206,0,4,1.795,4,4v2h2v-2C19,14.686,16.313,12,13,12z"
                  />
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
