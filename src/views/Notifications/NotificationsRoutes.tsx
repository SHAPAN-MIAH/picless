import classNames from 'classnames'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import useRouter from '../../hooks/commons/useRouter'
import { NotificationsTabsNames } from './NotificationsTabs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AllTab = React.lazy(() => import('./SectionTabs/AllTab'))
const UserSettings = React.lazy(() => import('../Account/UserSettings'))
const SettingsTab = React.lazy(() => import('./SectionTabs/SettingsTab'))

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

  const [currentTab, setCurrentTab] = useState<NotificationsTabsNames>()

  const notificationsContainer = <ContentContainerDiv>{UserSettings}</ContentContainerDiv>

  useEffect(() => {
    if (router.pathname.includes(NotificationsTabsNames.ALL)) setCurrentTab(NotificationsTabsNames.ALL)
    //else if (router.pathname.includes(NotificationsTabs.PURCHASED)) setCurrentTab(NotificationsTabs.PURCHASED)
    //else setCurrentTab(NotificationsTabs.TIMELINE)
  }, [])

  return (
    <>
      <TabContainerDiv
        className="option-items"
        style={{ justifyContent: 'center', position: 'sticky', top: 0, zIndex: 10, marginBottom: '-20px' }}
      >
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabsNames.ALL ? 'active' : '')}
          to={`${url}/${NotificationsTabsNames.ALL}`}
          onClick={() => setCurrentTab(NotificationsTabsNames.ALL)}
        >
          <h4>All</h4>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabsNames.LIKES ? 'active' : '')}
          to={`${url}/${NotificationsTabsNames.LIKES}`}
          onClick={() => setCurrentTab(NotificationsTabsNames.LIKES)}
        >
          <svg
            className={classNames(
              'option-item-icon icon-status user-status-icon',
              currentTab !== NotificationsTabsNames.LIKES ? 'margins-svg' : ''
            )}
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          >
            <FontAwesomeIcon icon="heart" color="tomato" />
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabsNames.SUSCRIBER ? 'active' : '')}
          to={`${url}/${NotificationsTabsNames.SUSCRIBER}`}
          onClick={() => setCurrentTab(NotificationsTabsNames.SUSCRIBER)}
        >
          <svg
            className={classNames(
              'option-item-icon icon-status icon-join-group',
              currentTab !== NotificationsTabsNames.SUSCRIBER ? 'margins-svg' : ''
            )}
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          >
            <use xlinkHref="#svg-join-group" />
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabsNames.MONEY ? 'active' : '')}
          to={`${url}/${NotificationsTabsNames.MONEY}`}
          onClick={() => setCurrentTab(NotificationsTabsNames.MONEY)}
        >
          <svg
            className={classNames(
              'option-item-icon icon-status',
              currentTab !== NotificationsTabsNames.MONEY ? 'margins-svg' : ''
            )}
            viewBox="0 0 14 14"
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          >
            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabsNames.ALERTS ? 'active' : '')}
          to={`${url}/${NotificationsTabsNames.ALERTS}`}
          onClick={() => setCurrentTab(NotificationsTabsNames.ALERTS)}
        >
          <svg
            className={classNames(
              'option-item-icon icon-status',
              currentTab !== NotificationsTabsNames.ALERTS ? 'margins-svg' : ''
            )}
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          >
            <FontAwesomeIcon icon="exclamation-triangle" color="#adafca" />
          </svg>
        </TabLink>
        <TabLink
          className={classNames('option-item', currentTab === NotificationsTabsNames.SETTINGS ? 'active' : '')}
          to={`${url}/${NotificationsTabsNames.SETTINGS}`}
          onClick={() => setCurrentTab(NotificationsTabsNames.SETTINGS)}
        >
          <svg
            className={classNames(
              'option-item-icon icon-settings',
              currentTab !== NotificationsTabsNames.SETTINGS ? 'margins-svg' : ''
            )}
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          >
            <use xlinkHref="#svg-settings"> </use>
          </svg>
        </TabLink>
      </TabContainerDiv>

      <ContentContainerDiv>
        <React.Suspense fallback={Loading}>
          <Switch>
            <Route exact path={`${match.path}/${NotificationsTabsNames.ALL}`} component={AllTab} />
            <Route exact path={`${match.path}/${NotificationsTabsNames.SETTINGS}`} component={SettingsTab} />
            <Route
              path={`${match.path}/`}
              render={() => {
                return <Redirect to={`${match.url}/${NotificationsTabsNames.ALL}`} />
              }}
            />
          </Switch>
        </React.Suspense>
      </ContentContainerDiv>
    </>
  )
}

export default NotificationsRoutes
