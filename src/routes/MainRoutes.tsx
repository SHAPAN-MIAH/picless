import React, { FunctionComponent, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import AuthorizationContext from '../context/AuthorizationContext'

import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute'

import LayoutMain from '../views/LayoutMain/LayoutMain'
import LayoutUnauthorize from '../views/LayoutUnauthorize/LayoutUnauthorize'

import UserProfile from '../views/UserProfile/UserProfile'
import Messages from '../views/Messages/Messages'
import Home from '../views/Home/Home'
import Movements from '../views/Account/Movements'
import AddCard from '../views/Account/Card/AddCard'
import TestView from '../views/TestView/TestView'
import PaymentCallback from '../views/Payments/PaymentCallback'
import ProfileNotExist from '../views/UserProfile/Profile/ProfileNotExist'
import Faq from '../views/HelpCenter/Faq/Faq'

import routes from './MenuRoutes'

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

              <ProtectedRoute {...routerProps} exact path={['/user/not-exist']} component={ProfileNotExist} />

              <ProtectedRoute
                {...routerProps}
                exact
                path={['/user/:username', '/user/:username/', '/user/:username/:tab', '/user/']}
                component={UserProfile}
              />

              <ProtectedRoute {...routerProps} exact path="/testview" component={TestView} />
              <ProtectedRoute {...routerProps} exact path="/support/faq" component={Faq} />

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
      </Router>
    </>
  )
}

export default MainRoutes
