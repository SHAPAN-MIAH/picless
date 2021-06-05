import classNames from 'classnames'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import useRouter from '../../../hooks/commons/useRouter'
import { NotificationsTabs } from '../NotificationsTabs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NotificationsAll = React.lazy(() => import('./Notification'))

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

const NotificationsRoutes: FunctionComponent<{}> = () => {
  const { url } = useRouteMatch()
  const router = useRouter()
  const { match } = router

  const [currentTab, setCurrentTab] = useState<NotificationsTabs>()

  useEffect(() => {
    if (router.pathname.includes(NotificationsTabs.ALL)) setCurrentTab(NotificationsTabs.ALL)
    //else if (router.pathname.includes(NotificationsTabs.PURCHASED)) setCurrentTab(NotificationsTabs.PURCHASED)
    //else setCurrentTab(NotificationsTabs.TIMELINE)
  }, [])
  
  return (
    <>
      <TabContainerDiv className="option-items" style={{ justifyContent: 'center', position: 'sticky', top: 0, zIndex: 10, marginBottom: '-20px'}}>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.ALL ? 'active' : '')}
          to={`${url}/${NotificationsTabs.ALL}`}
          onClick={() => setCurrentTab(NotificationsTabs.ALL)}
        >
          <h4>All</h4>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.LIKES ? 'active' : '')}
          to={`${url}/${NotificationsTabs.LIKES}`}
          onClick={() => setCurrentTab(NotificationsTabs.LIKES)}
        >
          <svg className={classNames('option-item-icon icon-status user-status-icon', currentTab !== NotificationsTabs.LIKES ? 'margins-svg' : '')}>
            <FontAwesomeIcon icon="heart" color="tomato" />
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.SUSCRIBER ? 'active' : '')}
          to={`${url}/${NotificationsTabs.SUSCRIBER}`}
          onClick={() => setCurrentTab(NotificationsTabs.SUSCRIBER)}
        >
          <svg className={classNames('option-item-icon icon-status icon-join-group', currentTab !== NotificationsTabs.SUSCRIBER ? 'margins-svg' : '')}>
            <use xlinkHref="#svg-join-group" />
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.MONEY ? 'active' : '')}
          to={`${url}/${NotificationsTabs.MONEY}`}
          onClick={() => setCurrentTab(NotificationsTabs.MONEY)}
        >
          <svg className={classNames('option-item-icon icon-status', currentTab !== NotificationsTabs.MONEY ? 'margins-svg' : '')} viewBox="0 0 14 14">
            <path
            d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.ALERTS ? 'active' : '')}
          to={`${url}/${NotificationsTabs.ALERTS}`}
          onClick={() => setCurrentTab(NotificationsTabs.ALERTS)}
        >
          <svg className={classNames('option-item-icon icon-status', currentTab !== NotificationsTabs.ALERTS ? 'margins-svg' : '')} >
            <FontAwesomeIcon icon="exclamation-triangle" color="#adafca"/>
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabs.SETTINGS ? 'active' : '')}
          to={`${url}/${NotificationsTabs.SETTINGS}`}
          onClick={() => setCurrentTab(NotificationsTabs.SETTINGS)}
        >
          <svg className={classNames('option-item-icon icon-settings', currentTab !== NotificationsTabs.SETTINGS ? 'margins-svg' : '')}>
            <use xlinkHref="#svg-settings"> </use>
          </svg>
        </TabLink>
      </TabContainerDiv>
      <ContentContainerDiv>
        <React.Suspense fallback={Loading}>
          <Switch>
            <Route path={`${match.path}/${NotificationsTabs.ALL}`} component={NotificationsAll} />
            {/*<Route
              path={`${match.path}/`}
              render={() => {
                return <Redirect to={`${match.url}/${NotificationsTabs.ALL}`} />
              }}
            />*/}
          </Switch>
        </React.Suspense>
      </ContentContainerDiv>
    </>
  )
}

export default NotificationsRoutes
