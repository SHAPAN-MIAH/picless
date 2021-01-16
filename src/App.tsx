import React from 'react'
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
  faStar,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons'
import { faCcVisa, faCcMastercard, faCcAmex, faCcDinersClub, faCcJcb } from '@fortawesome/free-brands-svg-icons'

import './assets/css/vendor/bootstrap.min.css'
import './assets/css/vendor/simplebar.css'
import './assets/css/vendor/tiny-slider.css'
import './assets/css/styles.min.css'
import './App.css'

import MainRoutes from './routes/MainRoutes'

import { UserContextProvider } from './context/UserContext'
import { AuthorizationContextProvider } from './context/AuthorizationContext'

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
  faCcJcb,
  faStar,
  faCreditCard
)

declare global {
  interface Window {
    tpl: { core: any; plugin: any; load: (modulesNames?: string[]) => void }
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
