import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import useRouter from '../../../hooks/commons/useRouter'
import { Tabs } from '../../../hooks/useProfile'
import './LiveSectionMenu.css';


const LiveSectionMenu: React.FunctionComponent<{}> = () => {
  
  const { url } = useRouteMatch()
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState<Tabs>()

  useEffect(() => {
    if (router.pathname.includes(Tabs.CHAT)) setCurrentTab(Tabs.CHAT)
    else if (router.pathname.includes(Tabs.PHOTOS)) setCurrentTab(Tabs.PHOTOS)
    else if (router.pathname.includes(Tabs.VIDEOS)) setCurrentTab(Tabs.VIDEOS)
    else setCurrentTab(Tabs.ABOUT)

    window.tpl.load(['slider'])
  }, [])

  const sectionMenuClasses = 'section-menu-item tns-item tns-slide-active'
  return (
    <>
      <nav className="section-navigation">
        <div id="section-navigation-slider" className="section-menu">
          <Link
            className={classNames(sectionMenuClasses, currentTab === Tabs.CHAT ? 'active' : '')}
            to={`${url}/${Tabs.CHAT}`}
            onClick={() => setCurrentTab(Tabs.CHAT)}
          >
            
            <svg xmlns="http://www.w3.org/2000/svg" className="section-menu-item-icon icon-chat" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>

            <p className="section-menu-item-text">Chat</p>
          </Link>

          <Link
            className={classNames(sectionMenuClasses, currentTab === Tabs.PHOTOS ? 'active' : '')}
            to={`${url}/${Tabs.PHOTOS}`}
            onClick={() => setCurrentTab(Tabs.PHOTOS)}
          >
            <svg className="section-menu-item-icon icon-photos">
              <use xlinkHref="#svg-photos" />
            </svg>

            <p className="section-menu-item-text">Photos</p>
          </Link>

          <Link
            className={classNames(sectionMenuClasses, currentTab === Tabs.VIDEOS ? 'active' : '')}
            to={`${url}/${Tabs.VIDEOS}`}
            onClick={() => setCurrentTab(Tabs.VIDEOS)}
          >
            <svg className="section-menu-item-icon icon-videos">
              <use xlinkHref="#svg-videos" />
            </svg>

            <p className="section-menu-item-text">Videos</p>
          </Link>

          <Link
            className={classNames(sectionMenuClasses, currentTab === Tabs.ABOUT ? 'active' : '')}
            to={`${url}/${Tabs.ABOUT}`}
            onClick={() => setCurrentTab(Tabs.ABOUT)}
          >
            <svg className="section-menu-item-icon icon-profile">
              <use xlinkHref="#svg-profile" />
            </svg>

            <p className="section-menu-item-text">About</p>
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

export default LiveSectionMenu