/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FunctionComponent, useState } from 'react'
import classNames from 'classnames'
import useRouter from '../../../../hooks/useRouter'
import { Link, useParams } from 'react-router-dom'
import { Tabs } from '../Profile'

// interface SectionMenuProps {
//   onChangeTab: (tab: TabNamesType) => void
//   selectedTab: TabNamesType
// }

export type TabNamesType = 'ABOUT' | 'FRIENDS' | 'PHOTOS' | 'VIDEOS' | 'POSTS' | 'LIVE'

const SectionMenu: FunctionComponent<{}> = () => {
  // const { selectedTab, onChangeTab } = props
  const { username, tab } = useParams<{ username: string; tab: string }>()

  const router = useRouter()

  const [currentTab, setCurrentTab] = useState(tab)

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

          {/* <div
            className={classNames(sectionMenuClasses, selectedTab === 'VIDEOS' ? 'active' : '')}
            onClick={() => {
              onChangeTab('VIDEOS')
            }}
          >
            <svg className="section-menu-item-icon icon-videos">
              <use xlinkHref="#svg-videos" />
            </svg>

            <p className="section-menu-item-text">Videos</p>
          </div> */}

          {/* <div
            className={classNames(sectionMenuClasses, selectedTab === 'LIVE' ? 'active' : '')}
            onClick={() => {
              onChangeTab('LIVE')
            }}
          >
            <svg className="section-menu-item-icon icon-streams">
              <use xlinkHref="#svg-streams" />
            </svg>

            <p className="section-menu-item-text">Live</p>
          </div> */}

          {/* <div
            className={classNames(sectionMenuClasses, selectedTab === 'ABOUT' ? 'active' : '')}
            onClick={() => {
              onChangeTab('ABOUT')
            }}
          >
            <svg className="section-menu-item-icon icon-profile">
              <use xlinkHref="#svg-profile" />
            </svg>

            <p className="section-menu-item-text">About</p>
          </div> */}
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
