import React, { FunctionComponent } from 'react'
// import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const FloatyBar: FunctionComponent<{}> = () => {
  // const { t } = useTranslation()

  return (
    <>
      <aside className="floaty-bar">
        <div className="bar-actions">
          <div className="progress-stat">
            <div className="bar-progress-wrap">
              <p className="bar-progress-info">
                Next: <span className="bar-progress-text" />
              </p>
            </div>

            <div id="logged-user-level-cp" className="progress-stat-bar" />
          </div>
        </div>

        <div className="bar-actions">
          <div className="action-list dark">
            <a className="action-list-item" href="marketplace-cart.html">
              <svg className="action-list-item-icon icon-shopping-bag">
                <use xlinkHref="#svg-shopping-bag" />
              </svg>
            </a>

            <a className="action-list-item" href="hub-profile-requests.html">
              <svg className="action-list-item-icon icon-friend">
                <use xlinkHref="#svg-friend" />
              </svg>
            </a>

            <Link className="action-list-item" to="/user/messages">
              <svg className="action-list-item-icon icon-messages">
                <use xlinkHref="#svg-messages" />
              </svg>
            </Link>

            <a className="action-list-item unread" href="hub-profile-notifications.html">
              <svg className="action-list-item-icon icon-notification">
                <use xlinkHref="#svg-notification" />
              </svg>
            </a>
          </div>

          <a className="action-item-wrap" href="hub-profile-info.html">
            <div className="action-item dark">
              <svg className="action-item-icon icon-settings">
                <use xlinkHref="#svg-settings" />
              </svg>
            </div>
          </a>
        </div>
      </aside>
    </>
  )
}

export default FloatyBar
