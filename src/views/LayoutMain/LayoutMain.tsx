import React, { FunctionComponent, ReactNode } from 'react'
import NavigationLeftMenu from './NavLeftMenu/NavigationLeftMenu'

import Header from './Header/Header'
import FloatyBar from './FloatyBar/FloatyBar'
import MainLoader from '../../components/MainLoading/MainLoading'
import { ApplicationContextProvider } from '../../context/ApplicationContext'
import { UserProfileContextProvider } from '../../context/UserProfileContext'

interface LayoutMainProps {
  children: ReactNode
}

const LayoutMain: FunctionComponent<LayoutMainProps> = (props) => {
  const { children } = props

  return (
    <>
      <MainLoader />
      <ApplicationContextProvider>
        <UserProfileContextProvider>
          <NavigationLeftMenu />
          {/* CHAT WIDGET */}
          <Header />
          <FloatyBar />
          {children}
        </UserProfileContextProvider>
      </ApplicationContextProvider>
    </>
  )
}

export default LayoutMain
