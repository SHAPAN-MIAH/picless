import React, { FunctionComponent, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute'

import LayoutMain from '../views/LayoutMain/LayoutMain'
import LayoutUnauthorize from '../views/LayoutUnauthorize/LayoutUnauthorize'
import Account from '../views/Account/Account'
import ProfileInfo from '../views/Account/ProfileInfo'
import UserProfile from '../views/UserProfile/UserProfile'
import Messages from '../views/Messages/Messages'
import UserSettings from '../views/Account/UserSettings'
import Home from '../views/Home/Home'
import Wallet from '../views/Account/Wallet'
import Movements from '../views/Account/Movements'
import AddCard from '../views/Account/Card/AddCard'
import Subscriptions from '../views/Account/Subscriptions/Subscriptions'
import TestView from '../views/TestView/TestView'
import Verification from '../views/Account/Verification/Verification'
import HelpSupport from '../views/HelpSupport/HelpSupport'
import PaymentCallback from '../views/Payments/PaymentCallback'
import routes from './MenuRoutes'

import AuthorizationContext from '../context/AuthorizationContext'
import ProfileNotExist from '../views/UserProfile/Profile/ProfileNotExist'
import { useTranslation } from 'react-i18next'

const MainRoutes: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const { isAuthenticated } = useContext(AuthorizationContext.context)

  const routerProps: ProtectedRouteProps = {
    authenticationPath: '/#login',
  }

  return (
    <>
      <Router>
        {isAuthenticated && (
          <LayoutMain>
            <Switch>
              {routes.map((route) => {
                if (route.component) {
                  return (
                    <ProtectedRoute
                      {...routerProps}
                      title={t(route.title)}
                      key={`${route.name}`}
                      exact={route.exact}
                      path={route.path}
                      component={route.component}
                    />
                  )
                }

                return null
              })}

              <ProtectedRoute {...routerProps} exact path="/wallet/payments/add-card" component={AddCard} />
              <ProtectedRoute {...routerProps} exact path="/wallet/movements" component={Movements} />

              <ProtectedRoute {...routerProps} path="/payment/stripe/wallet" component={PaymentCallback} />
              <ProtectedRoute {...routerProps} path="/payment/stripe/subscription" component={PaymentCallback} />

              <ProtectedRoute {...routerProps} exact path="/user/home" component={Home} />
              <ProtectedRoute {...routerProps} exact path="/user/messages/:userid" component={Messages} />
              <ProtectedRoute {...routerProps} exact path="/user/messages" component={Messages} />

              <ProtectedRoute
                {...routerProps}
                exact
                path={['/user/:username', '/user/:username/', '/user/:username/:tab', '/user/']}
                component={UserProfile}
              />
              <ProtectedRoute {...routerProps} exact path={['/user/not-exist']} component={ProfileNotExist} />

              <ProtectedRoute {...routerProps} exact path="/testview" component={TestView} />

              <Route exact path="/">
                <Redirect to="/user/home" />
              </Route>
            </Switch>
          </LayoutMain>
        )}
        {!isAuthenticated && (
          <Switch>
            <Route exact path="/">
              <LayoutUnauthorize />
            </Route>
            <Route path="/">
              <h1>ERROR</h1>
            </Route>
          </Switch>
        )}
        {/* <Switch>
          <Route path="/">
            <h1>ERROR</h1>
          </Route>
        </Switch> */}
      </Router>
    </>
  )
}

export default MainRoutes
