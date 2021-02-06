import React from 'react'
import MainRoutes from './routes/MainRoutes'

import { UserContextProvider } from './context/UserContext'
import { AuthorizationContextProvider } from './context/AuthorizationContext'

import './assets/css/vendor/bootstrap.min.css'
import './assets/css/vendor/simplebar.css'
import './assets/css/vendor/tiny-slider.css'
import './assets/css/styles.min.css'
import 'reactjs-popup/dist/index.css'
import './App.css'

import './utils/Icons'


declare global {
  interface Window {
    tpl: { core: any; plugin: any; load: (modulesNames?: string[]) => void }
    stream: any
    soundMeter: any
    Securionpay: any
  }
}

function App() {
  return (
    <>
      <AuthorizationContextProvider>
        <UserContextProvider>
          <MainRoutes />
        </UserContextProvider>
      </AuthorizationContextProvider>
    </>
  )
}

export default App
