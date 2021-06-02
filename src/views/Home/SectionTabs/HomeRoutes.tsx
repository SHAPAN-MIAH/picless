import classNames from 'classnames'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import useUser from '../../../hooks/useUser'

import useRouter from '../../../hooks/commons/useRouter'
import Home from '../Home'
import { HomeTabs } from '../Posts'


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

  return (
    <>
      <TabContainerDiv className="option-items" style={{ justifyContent: 'center', position: 'sticky', top: 0, zIndex: 10}}>
        <TabLink
          className={classNames('option-item', currentTab === HomeTabs.TIMELINE ? 'active' : '')}
          to={`${url}/${HomeTabs.TIMELINE}`}
          onClick={() => setCurrentTab(HomeTabs.TIMELINE)}
          style={{width: '40%'}}
        >
          <svg className="option-item-icon icon-status">
            <use xlinkHref="#svg-status"> </use>
          </svg>

          <p className="option-item-title">Timeline</p>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === HomeTabs.SAVED ? 'active' : '')}
          to={`${url}/${HomeTabs.SAVED}`}
          onClick={() => setCurrentTab(HomeTabs.SAVED)}
          style={{width: '20%'}}
        >
          <svg className="option-item-icon icon-pinned">
            <use xlinkHref="#svg-pinned"> </use>
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === HomeTabs.PURCHASED ? 'active' : '')}
          to={`${url}/${HomeTabs.PURCHASED}`}
          onClick={() => setCurrentTab(HomeTabs.PURCHASED)}
          style={{width: '20%'}}
        >
          <svg className="option-item-icon icon-revenue">
            <use xlinkHref="#svg-revenue"> </use>
          </svg>
        </TabLink>
        {user.verifiedAccount &&
          <Link to="/user/create-post" className='option-item' style={{width: '20%'}}>
            <svg 
            className="action-list-item-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            style={{marginTop: 'auto', marginLeft: '40%'}}
            >
              <path
                fill="#000000"
                d="M20,11h-9v9H9v-9H0V9h9V0h2v9h9V11z"
              />
            </svg>
          </Link>
        }
      </TabContainerDiv>

      <ContentContainerDiv>
        <React.Suspense fallback={Loading}>
          <Switch>
            <Route path={`${match.path}/${HomeTabs.TIMELINE}`} component={Newsfeed} />
            <Route path={`${match.path}/${HomeTabs.SAVED}`} component={Saved} />
            <Route path={`${match.path}/${HomeTabs.PURCHASED}`} component={Purchased} />

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
