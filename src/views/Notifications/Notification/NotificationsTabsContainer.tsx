import classNames from 'classnames'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import useRouter from '../../../hooks/commons/useRouter'
import useNotifications from '../../../hooks/useNotification'
import { NotificationsTabs } from '../NotificationsTabs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Saved = React.lazy(() => import('../../Home/SectionTabs/SavedTab'))
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

const NotificationsTabsContainer: FunctionComponent<{}> = () => {
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
          <h4>All</h4>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.Likes ? 'active' : '')}
          to={`${url}/${NotificationsTabs.Likes}`}
          onClick={() => setCurrentTab(NotificationsTabs.Likes)}
        >
          <svg className={classNames('option-item-icon icon-status user-status-icon', currentTab !== NotificationsTabs.Likes ? 'margins-svg' : '')}>
            <FontAwesomeIcon icon="heart" color="tomato" />
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.Subscriber ? 'active' : '')}
          to={`${url}/${NotificationsTabs.Subscriber}`}
          onClick={() => setCurrentTab(NotificationsTabs.Subscriber)}
        >
          <svg className={classNames('option-item-icon icon-status icon-join-group', currentTab !== NotificationsTabs.Subscriber ? 'margins-svg' : '')}>
            <use xlinkHref="#svg-join-group" />
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.Money ? 'active' : '')}
          to={`${url}/${NotificationsTabs.Money}`}
          onClick={() => setCurrentTab(NotificationsTabs.Money)}
        >
          <svg className={classNames('option-item-icon icon-status', currentTab !== NotificationsTabs.Money ? 'margins-svg' : '')} viewBox="0 0 14 14">
            <path
            d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.Alerts ? 'active' : '')}
          to={`${url}/${NotificationsTabs.Alerts}`}
          onClick={() => setCurrentTab(NotificationsTabs.Alerts)}
        >
          <svg className={classNames('option-item-icon icon-status', currentTab !== NotificationsTabs.Alerts ? 'margins-svg' : '')} >
            <FontAwesomeIcon icon="exclamation-triangle" color="#adafca"/>
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.Settings ? 'active' : '')}
          to={`${url}/${NotificationsTabs.Settings}`}
          onClick={() => setCurrentTab(NotificationsTabs.Settings)}
        >
          <svg className={classNames('option-item-icon icon-settings', currentTab !== NotificationsTabs.Settings ? 'margins-svg' : '')}>
            <use xlinkHref="#svg-settings"> </use>
          </svg>
        </TabLink>
      </TabContainerDiv>

      <ContentContainerDiv>
        {<React.Suspense fallback={Loading}>
          <Switch>
            <Route path={`${match.path}/${NotificationsTabs.All}`} component={Saved} />
            {console.log(currentTab)}
            {/*<Route
              path={`${match.path}/`}
              render={() => {
                return <Redirect to={`${match.url}/${NotificationsTabs.All}`} />
              }}
            />*/}
          </Switch>
        </React.Suspense>}
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

export default NotificationsTabsContainer
