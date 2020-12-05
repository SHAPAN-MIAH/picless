import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheck,
  faPlus,
  faTimes,
  faDollarSign,
  faShareAlt,
  faComments,
  faLock,
  faHeart,
  faRedo,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { faCcVisa, faCcMastercard, faCcAmex, faCcDinersClub, faCcJcb } from '@fortawesome/free-brands-svg-icons'

import ProtectedRoute, { ProtectedRouteProps } from './routes/ProtectedRoute'

import { checkUserAuthenticated } from './redux/Auth/AuthThunks'

import LayoutUnauthorize from './views/LayoutUnauthorize/LayoutUnauthorize'
import AccountInfo from './views/Account/AccountInfo'
import ProfileInfo from './views/Account/ProfileInfo'
import AccountDevices from './views/Account/AccountDevices'
import ChangePassword from './views/Account/ChangePassword'
import UserProfile from './views/UserProfile/UserProfile'
import Messages from './views/Messages/Messages'
import UserSettings from './views/Account/UserSettings'
import Home from './views/Home/Home'

import './assets/css/vendor/bootstrap.min.css'
import './assets/css/vendor/simplebar.css'
import './assets/css/vendor/tiny-slider.css'
import './assets/css/styles.min.css'
import './App.css'
import WalletOverview from './views/Account/WalletOverview'
import Movements from './views/Account/Movements'
import PaymentMethods from './views/Account/PaymenMethod'
import AddCard from './views/Account/Card/AddCard'

library.add(
  faPlus,
  faTimes,
  faCheck,
  faDollarSign,
  faShareAlt,
  faComments,
  faLock,
  faHeart,
  faRedo,
  faExclamationTriangle,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDinersClub,
  faCcJcb
)

function App() {
  const dispatch = useDispatch()

  const routerProps: ProtectedRouteProps = {
    authenticationPath: '/',
  }

  useEffect(() => {
    // const hexagonScript = document.createElement('script')
    // hexagonScript.src = '/assets/js/xm_hexagon.min.js'
    // hexagonScript.async = true
    // document.body.appendChild(hexagonScript)

    // const accordionScript = document.createElement('script')
    // accordionScript.src = '/assets/js/xm_accordion.min.js'
    // accordionScript.async = true
    // document.body.appendChild(accordionScript)

    // const dropdownScript = document.createElement('script')
    // dropdownScript.src = '/assets/js/xm_dropdown.min.js'
    // dropdownScript.async = true
    // document.body.appendChild(dropdownScript)

    // const popupScript = document.createElement('script')
    // popupScript.src = '/assets/js/xm_popup.min.js'
    // popupScript.async = true
    // document.body.appendChild(popupScript)

    // const progressBarScript = document.createElement('script')
    // progressBarScript.src = '/assets/js/xm_progressBar.min.js'
    // progressBarScript.async = true
    // document.body.appendChild(progressBarScript)

    // const tabScript = document.createElement('script')
    // tabScript.src = '/assets/js/xm_tab.min.js'
    // tabScript.async = true
    // document.body.appendChild(tabScript)

    // const tooltipScript = document.createElement('script')
    // tooltipScript.src = '/assets/js/xm_tooltip.min.js'
    // tooltipScript.async = true
    // document.body.appendChild(tooltipScript)

    const script = document.createElement('script')
    script.setAttribute('id', 'mainScript')
    script.src = '/assets/js/app.bundle.min.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    dispatch(checkUserAuthenticated())
  }, [dispatch])

  return (
    <>
      <Router forceRefresh>
        <Switch>
          <ProtectedRoute {...routerProps} exact path="/account/account-info" component={AccountInfo} />
          <ProtectedRoute {...routerProps} exact path="/account/profile-info" component={ProfileInfo} />
          <ProtectedRoute {...routerProps} exact path="/account/account-devices" component={AccountDevices} />
          <ProtectedRoute {...routerProps} exact path="/account/change-password" component={ChangePassword} />
          <ProtectedRoute {...routerProps} exact path="/account/settings" component={UserSettings} />

          <ProtectedRoute {...routerProps} exact path="/wallet/overview" component={WalletOverview} />
          <ProtectedRoute {...routerProps} exact path="/wallet/payments" component={PaymentMethods} />
          <ProtectedRoute {...routerProps} exact path="/wallet/payments/add-card" component={AddCard} />
          <ProtectedRoute {...routerProps} exact path="/wallet/movements" component={Movements} />

          <ProtectedRoute {...routerProps} exact path="/user/home" component={Home} />
          <ProtectedRoute {...routerProps} exact path="/user/messages/:userid" component={Messages} />
          <ProtectedRoute {...routerProps} exact path="/user/messages" component={Messages} />
          <ProtectedRoute {...routerProps} exact path="/user/:username" component={UserProfile} />
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

export default App
