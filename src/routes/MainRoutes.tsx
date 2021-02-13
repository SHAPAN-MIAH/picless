import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute'

import LayoutUnauthorize from '../views/LayoutUnauthorize/LayoutUnauthorize'
import Account from '../views/Account/Account'
import ProfileInfo from '../views/Account/ProfileInfo'
import AccountDevices from '../views/Account/AccountDevices/AccountDevices'
import ChangePassword from '../views/Account/ChangePassword/ChangePassword'
import UserProfile from '../views/UserProfile/UserProfile'
import Messages from '../views/Messages/Messages'
import UserSettings from '../views/Account/UserSettings'
import Home from '../views/Home/Home'
import Wallet from '../views/Account/Wallet'
import Movements from '../views/Account/Movements'
import PaymentMethods from '../views/Account/PaymentMethods'
import AddCard from '../views/Account/Card/AddCard'
import Subscriptions from '../views/Account/Subscriptions/Subscriptions'
import TestView from '../views/TestView/TestView'
import Verification from '../views/Account/Verification/Verification'
import HelpSupport from '../views/HelpSupport/HelpSupport'

const MainRoutes: FunctionComponent<{}> = () => {
  const routerProps: ProtectedRouteProps = {
    authenticationPath: '/',
  }

  return (
    <>
      <Router>
        <Switch>
          <ProtectedRoute {...routerProps} exact path="/account/profile-info" component={ProfileInfo} />
          <ProtectedRoute {...routerProps} exact path="/account/account-info" component={Account} />
          <ProtectedRoute {...routerProps} exact path="/account/my-subscriptions" component={Subscriptions} />
          <ProtectedRoute {...routerProps} exact path="/account/account-devices" component={AccountDevices} />
          <ProtectedRoute {...routerProps} exact path="/account/change-password" component={ChangePassword} />
          <ProtectedRoute {...routerProps} exact path="/account/settings" component={UserSettings} />
          <ProtectedRoute {...routerProps} exact path="/account/verification" component={Verification} />
          <ProtectedRoute {...routerProps} exact path="/account/wallet" component={Wallet} />

          <ProtectedRoute {...routerProps} exact path="/wallet/payments" component={PaymentMethods} />
          <ProtectedRoute {...routerProps} exact path="/wallet/payments/add-card" component={AddCard} />
          <ProtectedRoute {...routerProps} exact path="/wallet/movements" component={Movements} />

          <ProtectedRoute {...routerProps} exact path="/user/home" component={Home} />
          <ProtectedRoute {...routerProps} exact path="/user/messages/:userid" component={Messages} />
          <ProtectedRoute {...routerProps} exact path="/user/messages" component={Messages} />
          <ProtectedRoute {...routerProps} exact path="/user/:username" component={UserProfile} />

          <ProtectedRoute {...routerProps} exact path="/testview" component={TestView} />

          <ProtectedRoute {...routerProps} exact path="/help" component={HelpSupport} />

          <Route exact path="/">
            <LayoutUnauthorize />
          </Route>
          <Route path="/">
            <h1>ERROR</h1>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default MainRoutes
