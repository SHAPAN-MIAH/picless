import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

interface SectionMenuProps {
  onChangeTab: (tab: TabNamesType) => void
  selectedTab: TabNamesType
}

export type TabNamesType = 'ABOUT' | 'FRIENDS' | 'PHOTOS' | 'VIDEOS' | 'POSTS'

const SectionMenu: FunctionComponent<SectionMenuProps> = (props) => {
  const { selectedTab, onChangeTab } = props

  const sectionMenuClasses = 'section-menu-item tns-item tns-slide-active'
  return (
    <>
      <nav className="section-navigation">
        <div id="section-navigation-slider" className="section-menu">
          <div
            className={classNames(sectionMenuClasses, selectedTab === 'ABOUT' ? 'active' : '')}
            onClick={() => {
              onChangeTab('ABOUT')
            }}
          >
            <svg className="section-menu-item-icon icon-profile">
              <use xlinkHref="#svg-profile" />
            </svg>

            <p className="section-menu-item-text">About</p>
          </div>

          <div
            className={classNames(sectionMenuClasses, selectedTab === 'POSTS' ? 'active' : '')}
            onClick={() => {
              onChangeTab('POSTS')
            }}
          >
            <svg className="section-menu-item-icon icon-timeline">
              <use xlinkHref="#svg-timeline" />
            </svg>

            <p className="section-menu-item-text">Posts</p>
          </div>

          <div
            className={classNames(sectionMenuClasses, selectedTab === 'FRIENDS' ? 'active' : '')}
            onClick={() => {
              onChangeTab('FRIENDS')
            }}
          >
            <svg className="section-menu-item-icon icon-friend">
              <use xlinkHref="#svg-friend" />
            </svg>

            <p className="section-menu-item-text">Friends</p>
          </div>

          <div
            className={classNames(sectionMenuClasses, selectedTab === 'PHOTOS' ? 'active' : '')}
            onClick={() => {
              onChangeTab('PHOTOS')
            }}
          >
            <svg className="section-menu-item-icon icon-photos">
              <use xlinkHref="#svg-photos" />
            </svg>

            <p className="section-menu-item-text">Photos</p>
          </div>

          <div
            className={classNames(sectionMenuClasses, selectedTab === 'VIDEOS' ? 'active' : '')}
            onClick={() => {
              onChangeTab('VIDEOS')
            }}
          >
            <svg className="section-menu-item-icon icon-videos">
              <use xlinkHref="#svg-videos" />
            </svg>

            <p className="section-menu-item-text">Videos</p>
          </div>
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
