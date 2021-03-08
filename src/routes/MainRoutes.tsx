import React, { FunctionComponent, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Contact from 'views/HelpCenter/Contact/Contact'
import Faq from 'views/HelpCenter/Faq/Faq'
import AuthorizationContext from '../context/AuthorizationContext'
import AddCard from '../views/Account/Card/AddCard'
import Movements from '../views/Account/Movements'
import Home from '../views/Home/Home'
import LayoutMain from '../views/LayoutMain/LayoutMain'
import LayoutUnauthorize from '../views/LayoutUnauthorize/LayoutUnauthorize'
import Messages from '../views/Messages/Messages'
import PaymentCallback from '../views/Payments/PaymentCallback'
import TestView from '../views/TestView/TestView'
import UserProfile from '../views/UserProfile/UserProfile'
import routes from './MenuRoutes'
import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute'

const NoMatchPage = () => {
  return (
    <>
      <div style={{ paddingLeft: '180px' }}>
        <h3>404 - Not found</h3>
        <a href="/user/home">Go to home</a>
      </div>
    </>
  )
}

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

              <ProtectedRoute {...routerProps} path="/u/:username" component={UserProfile} />
              {/* <ProtectedRoute
                {...routerProps}
                path={['/u/:username', '/u/:username/', '/u/:username/:tab']}
                component={UserProfile}
              />
              <ProtectedRoute {...routerProps} exact path={['/u/not-exist']} component={ProfileNotExist} /> */}

              <ProtectedRoute {...routerProps} exact path="/testview" component={TestView} />

              <Route path="/support/faq" component={Faq} />
              <Route path="/support/contact" component={Contact} />
              {/* <Route path="/support/privacy" render={() => <h1>asdf</h1>} /> */}
              {/* <Route path={[`/support/terms-conditions`]} render={() => <h1>asdf</h1>} />
              <Route
                path="/support/"
                render={() => {
                  return <Redirect to="/support" />
                }}
              /> */}

              <Route path="/">
                <Redirect to="/user/home" />
              </Route>
              <Route component={NoMatchPage} />
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
