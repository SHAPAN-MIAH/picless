import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'

import ProtectedRoute, { ProtectedRouteProps } from './routes/ProtectedRoute'

import LayoutUnauthorize from './views/LayoutUnauthorize/LayoutUnauthorize'
import AccountInfo from './views/Account/AccountInfo'
import ProfileInfo from './views/Account/ProfileInfo'
import AccountDevices from './views/Account/AccountDevices'

import { store } from './redux/store'
import ChangePassword from './views/Account/ChangePassword'

const persistor = persistStore(store)

function App() {
  const routerProps: ProtectedRouteProps = {
    authenticationPath: '/',
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<div>Loading ...</div>} persistor={persistor}>
          <Router forceRefresh>
            <Switch>
              <ProtectedRoute {...routerProps} exact path="/user/account-info" component={AccountInfo} />
              <ProtectedRoute {...routerProps} exact path="/user/profile-info" component={ProfileInfo} />
              <ProtectedRoute {...routerProps} exact path="/user/account-devices" component={AccountDevices} />
              <ProtectedRoute {...routerProps} exact path="/user/change-password" component={ChangePassword} />
              <Route exact path="/">
                <LayoutUnauthorize />
              </Route>
              <Route path="/">
                <h1>ERROR</h1>
              </Route>
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
