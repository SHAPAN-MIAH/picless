import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom'
import useRouter from '../../../hooks/commons/useRouter'
import { Tabs } from '../../../hooks/useProfile'
import Loader from 'react-loader-spinner'
import './LiveSectionMenu.css';
import About from './../About/About';
import VideoGallery from './../VideoGallery/VideoGallery';
import PhotoGallery from './../PhotoGallery/PhotoGallery';



const Loading = (
  <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const LiveSectionMenu: React.FunctionComponent<{ onToggleChat: any }> = (props) => {

  console.log(props);

  const { url } = useRouteMatch()
  const router = useRouter()
  const { match } = router
  const [currentTabs, setCurrentTabs] = useState<Tabs>()


  useEffect(() => {
    if (router.pathname.includes(Tabs.CHAT)) setCurrentTabs(Tabs.CHAT)
    else if (router.pathname.includes(Tabs.PHOTOS)) setCurrentTabs(Tabs.PHOTOS)
    else if (router.pathname.includes(Tabs.VIDEOS)) setCurrentTabs(Tabs.VIDEOS)
    else setCurrentTabs(Tabs.ABOUT)

    window.tpl.load(['slider'])
  }, [])

  const sectionMenuClasses = 'section-menu-item tns-item tns-slide-active'
  return (
    <>
      <nav className="section-navigation">
        <div id="section-navigation-slider" className="section-menu">
          <button
            style={{ background: "none", borderRadius: '0px' }}
            className={classNames(sectionMenuClasses, currentTabs === Tabs.CHAT ? 'active' : '')}
            onClick={() => props.onToggleChat()}
          >

            <svg xmlns="http://www.w3.org/2000/svg" className="section-menu-item-icon icon-chat" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>

            <p className="section-menu-item-text">Chat</p>
          </button>

          <Link
            className={classNames(sectionMenuClasses, currentTabs === Tabs.PHOTOS ? 'active' : '')}
            to={`${url}/${Tabs.PHOTOS}`}
            onClick={() => setCurrentTabs(Tabs.PHOTOS)}
          >
            <svg className="section-menu-item-icon icon-photos">
              <use xlinkHref="#svg-photos" />
            </svg>

            <p className="section-menu-item-text">Photos</p>
          </Link>

          <Link
            className={classNames(sectionMenuClasses, currentTabs === Tabs.VIDEOS ? 'active' : '')}
            to={`${url}/${Tabs.VIDEOS}`}
            onClick={() => setCurrentTabs(Tabs.VIDEOS)}
          >
            <svg className="section-menu-item-icon icon-videos">
              <use xlinkHref="#svg-videos" />
            </svg>

            <p className="section-menu-item-text">Videos</p>
          </Link>

          <Link
            className={classNames(sectionMenuClasses, currentTabs === Tabs.ABOUT ? 'active' : '')}
            to={`${url}/${Tabs.ABOUT}`}
            onClick={() => setCurrentTabs(Tabs.ABOUT)}
          >
            <svg className="section-menu-item-icon icon-profile">
              <use xlinkHref="#svg-profile" />
            </svg>

            <p className="section-menu-item-text">About</p>
          </Link>

        </div>

        <div>
          <React.Suspense fallback={Loading}>
            <Switch>
              <Route path={`${match.path}/${Tabs.ABOUT}`} component={About} />
              <Route path={`${match.path}/${Tabs.PHOTOS}`} component={PhotoGallery} />
              <Route path={`${match.path}/${Tabs.VIDEOS}`} component={VideoGallery} />
            </Switch>
          </React.Suspense>
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