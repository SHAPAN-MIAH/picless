import React, { FunctionComponent } from 'react'
import MainRoutes from './routes/MainRoutes'
import { UserContextProvider } from './context/UserContext'
import { AuthorizationContextProvider } from './context/AuthorizationContext'
import 'reactjs-popup/dist/index.css'
import './assets/css/vendor/bootstrap.min.css'
import './assets/css/vendor/simplebar.css'
import './assets/css/vendor/tiny-slider.css'
import './assets/css/styles.min.css'
import './App.css'
import './utils/Icons'
// import LiveSectionRoutes from 'components/LiveSectionFeatures/LivesectionRoutes/LiveSectionRoutes'

declare global {
  interface Window {
    tpl: { core: any; plugin: any; load: (modulesNames?: string[]) => void }
    stream: any
    soundMeter: any
    Securionpay: any
  }
}

const App: FunctionComponent<{}> = () => {
  return (
    <>
      <AuthorizationContextProvider>
        <UserContextProvider>
          <MainRoutes />
          {/* <LiveSectionRoutes/> */}
        </UserContextProvider>
      </AuthorizationContextProvider>
    </>
  )
}

export default App