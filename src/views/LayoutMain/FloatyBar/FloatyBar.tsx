import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const FloatyBar: FunctionComponent<{}> = () => {
  return (
    <>
      <aside className="floaty-bar">
        <div className="bar-actions"> </div>

        <div className="bar-actions">
          <div className="action-list dark">
            <a className="action-list-item" href="">
              <FontAwesomeIcon icon="home" size="lg" color="#8b88ff " />
            </a>

            <a className="action-list-item" href="/user/home">
              <FontAwesomeIcon icon="bars" size="lg" color="#8b88ff " />
            </a>

            <Link className="action-list-item" to="/user/home">
              <svg className="action-list-item-icon icon-plus">
                <use xlinkHref="#svg-plus" />
              </svg>
            </Link>

            <a className="action-list-item unread" href="">
              <svg className="action-list-item-icon icon-notification">
                <use xlinkHref="#svg-notification" />
              </svg>
            </a>
          </div>

          <Link className="action-item-wrap" to="/user/messages">
            <div className="action-item">
              <svg className="action-item-icon icon-messages">
                <use xlinkHref="#svg-messages" />
              </svg>
            </div>
          </Link>
        </div>
      </aside>
    </>
  )
}

export default FloatyBar
