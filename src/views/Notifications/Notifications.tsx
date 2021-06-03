import classNames from 'classnames'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import useRouter from '../../hooks/commons/useRouter'
import useNotifications from '../../hooks/useNotification'
import { NotificationsTabs } from './NotificationsTabs'

const Metrics = React.lazy(() => import('../Metrics/Metrics'))
//const Saved = React.lazy(() => import('./SavedTab'))
//const Purchased = React.lazy(() => import('./PurchasedTab'))

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

const Notifications: FunctionComponent<{}> = () => {
  const { notifications } = useNotifications()

  const { url } = useRouteMatch()
  const router = useRouter()
  const { match } = router

  const [currentTab, setCurrentTab] = useState<NotificationsTabs>()

  useEffect(() => {
    if (router.pathname.includes(NotificationsTabs.All)) setCurrentTab(NotificationsTabs.All)
    //else if (router.pathname.includes(NotificationsTabs.PURCHASED)) setCurrentTab(NotificationsTabs.PURCHASED)
    //else setCurrentTab(NotificationsTabs.TIMELINE)
  }, [])
  return (
    <>
      <TabContainerDiv className="option-items" style={{ justifyContent: 'center', position: 'sticky', top: 0, zIndex: 10, marginBottom: '-20px'}}>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.All ? 'active' : '')}
          to={`${url}/${NotificationsTabs.All}`}
          onClick={() => setCurrentTab(NotificationsTabs.All)}
        >
          <svg className={classNames('option-item-icon icon-status', currentTab !== NotificationsTabs.All ? 'margins-svg' : '')}>
            <use xlinkHref="#svg-status"> </use>
          </svg>
        </TabLink>
      </TabContainerDiv>

      <ContentContainerDiv>
        {/*<React.Suspense fallback={Loading}>
          <Switch>
            <Route path={`${match.path}/${NotificationsTabs.All}`} component={Metrics} />
            
            <Route
              path={`${match.path}/`}
              render={() => {
                return <Redirect to={`${match.url}/${NotificationsTabs.All}`} />
              }}
            />
          </Switch>
        </React.Suspense>*/}
      </ContentContainerDiv>
    </>
  )
  /*useEffect(() => {
    window.tpl.load(['sidebar'])
  }, [])

  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px' }}>
        <div className="grid grid-2-7-2">
          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">My profile</p>

                <h2 className="section-title">Notifications</h2>
              </div>
              <div className="section-header-actions">
                <Link to="/account/settings" className="section-header-action">
                  Settings
                </Link>
              </div>
            </div>

            <div className="grid-column">
              <div className="notification-box-list">
                {notifications.map((notification) => {
                  return <Notification key={notification.id} notification={notification} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )*/
}

export default Notifications
