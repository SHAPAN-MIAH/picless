import classNames from 'classnames'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import useUser from '../../../hooks/useUser'

import useRouter from '../../../hooks/commons/useRouter'
import Home from '../Home'
import { HomeTabs } from '../Posts'

import PhotoGallery from './../../../components/LiveSectionFeatures/PhotoGallery/PhotoGallery';
import VideoGallery from './../../../components/LiveSectionFeatures/VideoGallery/VideoGallery';
import About from './../../../components/LiveSectionFeatures/About/About';
import { Tabs } from 'hooks/useProfile'

const Newsfeed = React.lazy(() => import('./NewsfeedTab'))
const Saved = React.lazy(() => import('./SavedTab'))
const Purchased = React.lazy(() => import('./PurchasedTab'))
// const PhotoGalleryTab = React.lazy(() => import('./SectionTab/PhotoGalleryTab'))
// const VideoGalleryTab = React.lazy(() => import('./SectionTab/VideoGalleryTab'))
// const AboutTab = React.lazy(() => import('./SectionTab/AboutTab'))



type HomeRoutesProps = {
  //   isSubscribed: boolean
  //   isOwner: boolean
  // username: string
}

const Loading = (
  <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const TabContainerDiv = styled.div`
  width: 100%;
  border-bottom: 1px solid #eaeaf5;

  background-color: #fff;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  @media screen and (max-width: 680px) {
    border-radius: 0;
  }
`

const TabLink = styled(Link)`
  height: 65px;
  width: 33.33333333333333333333333%;
`

const ContentContainerDiv = styled.div``

const HomeRoutes: FunctionComponent<HomeRoutesProps> = () => {
  //   const { isSubscribed, isOwner } = props
  const { url } = useRouteMatch()
  const router = useRouter()
  const { user } = useUser()
  const { match } = router

  const [currentTab, setCurrentTab] = useState<HomeTabs>()

  useEffect(() => {
    if (router.pathname.includes(HomeTabs.SAVED)) setCurrentTab(HomeTabs.SAVED)
    else if (router.pathname.includes(HomeTabs.PURCHASED)) setCurrentTab(HomeTabs.PURCHASED)
    else setCurrentTab(HomeTabs.TIMELINE)
  }, [])

  const hanleStyles = (tab: any) => {
    let width = {width: '20%'}
    if(tab === currentTab) {
      width = user.verifiedAccount ? {width: '40%'} : {width: '60%'}  
    }
    return width;
  }

  return (
    <>
      <TabContainerDiv className="option-items" style={{ justifyContent: 'center', position: 'sticky', top: 0, zIndex: 10, marginBottom: '-20px'}}>
        <TabLink
          className={classNames('option-item', currentTab === HomeTabs.TIMELINE ? 'active' : '')}
          to={`${url}/${HomeTabs.TIMELINE}`}
          onClick={() => setCurrentTab(HomeTabs.TIMELINE)}
          style={hanleStyles(HomeTabs.TIMELINE)}
        >
          <svg className={classNames('option-item-icon icon-status', currentTab !== HomeTabs.TIMELINE ? 'margins-svg' : '')}>
            <use xlinkHref="#svg-status"> </use>
          </svg>

          <p className={classNames("option-item-title", currentTab !== HomeTabs.TIMELINE ? 'hidden' : '')}>Timeline</p>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === HomeTabs.SAVED ? 'active' : '')}
          to={`${url}/${HomeTabs.SAVED}`}
          onClick={() => setCurrentTab(HomeTabs.SAVED)}
          style={hanleStyles(HomeTabs.SAVED)}
        >
          <svg className={classNames('option-item-icon icon-pinned', currentTab !== HomeTabs.SAVED ? 'margins-svg' : '')}>
            <use xlinkHref="#svg-pinned"> </use>
          </svg>
          <p className={classNames("option-item-title", currentTab !== HomeTabs.SAVED ? 'hidden' : '')}>Saved</p>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === HomeTabs.PURCHASED ? 'active' : '')}
          to={`${url}/${HomeTabs.PURCHASED}`}
          onClick={() => setCurrentTab(HomeTabs.PURCHASED)}
          style={hanleStyles(HomeTabs.PURCHASED)}
        >
          <svg className={classNames('option-item-icon icon-revenue', currentTab !== HomeTabs.PURCHASED ? 'margins-svg' : '')}>
            <use xlinkHref="#svg-revenue"> </use>
          </svg>
          <p className={classNames("option-item-title", currentTab !== HomeTabs.PURCHASED ? 'hidden' : '')}>Purchased</p>
        </TabLink>
        {user.verifiedAccount &&
          <TabLink
            className={classNames('option-item')}
            to={`/user/create-post`}
            style={{width: '20%'}}
          >
            <svg className="option-item-icon icon-plus" style={{marginLeft: 'auto', marginRight: 'auto'}}>
              <use xlinkHref="#svg-plus"> </use>
            </svg>
        </TabLink>
        }
      </TabContainerDiv>

      <ContentContainerDiv>
        <React.Suspense fallback={Loading}>
          <Switch>
            <Route path={`${match.path}/${HomeTabs.TIMELINE}`} component={Newsfeed} />
            <Route path={`${match.path}/${HomeTabs.SAVED}`} component={Saved} />
            <Route path={`${match.path}/${HomeTabs.PURCHASED}`} component={Purchased} />
            
            <Route path={`${match.path}/${Tabs.ABOUT}`} component={About} />
            <Route path={`${match.path}/${Tabs.PHOTOS}`} component={PhotoGallery} />
            <Route path={`${match.path}/${Tabs.VIDEOS}`} component={VideoGallery} />

            <Route
              path={`${match.path}/`}
              render={() => {
                return <Redirect to={`${match.url}/${HomeTabs.TIMELINE}`} />
              }}
            />
          </Switch>
        </React.Suspense>
      </ContentContainerDiv>
    </>
  )
}

export default HomeRoutes
