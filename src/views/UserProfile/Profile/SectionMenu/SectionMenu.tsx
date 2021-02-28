import React, { FunctionComponent } from 'react'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

import { Tabs } from '../Profile'

const SectionMenu: FunctionComponent<{}> = () => {
  const { username, tab } = useParams<{ username: string; tab: string }>()

  const sectionMenuClasses = 'section-menu-item tns-item tns-slide-active'
  return (
    <>
      <nav className="section-navigation">
        <div id="section-navigation-slider" className="section-menu">
          <Link
            className={classNames(sectionMenuClasses, tab === Tabs.POSTS ? 'active' : '')}
            to={`/user/${username}/posts`}
          >
            <svg className="section-menu-item-icon icon-timeline">
              <use xlinkHref="#svg-timeline" />
            </svg>

            <p className="section-menu-item-text">Posts</p>
          </Link>

          <Link
            className={classNames(sectionMenuClasses, tab === Tabs.PHOTOS ? 'active' : '')}
            to={`/user/${username}/${Tabs.PHOTOS}`}
          >
            <svg className="section-menu-item-icon icon-photos">
              <use xlinkHref="#svg-photos" />
            </svg>

            <p className="section-menu-item-text">Photos</p>
          </Link>

          <Link
            className={classNames(sectionMenuClasses, tab === Tabs.VIDEOS ? 'active' : '')}
            to={`/user/${username}/${Tabs.VIDEOS}`}
          >
            <svg className="section-menu-item-icon icon-videos">
              <use xlinkHref="#svg-videos" />
            </svg>

            <p className="section-menu-item-text">Videos</p>
          </Link>

          <Link
            className={classNames(sectionMenuClasses, tab === Tabs.ABOUT ? 'active' : '')}
            to={`/user/${username}/${Tabs.ABOUT}`}
          >
            <svg className="section-menu-item-icon icon-profile">
              <use xlinkHref="#svg-profile" />
            </svg>

            <p className="section-menu-item-text">Profile</p>
          </Link>
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
