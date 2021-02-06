import React, { FunctionComponent, ReactNode } from 'react'
import NavigationLeftMenu from './NavLeftMenu/NavigationLeftMenu'

import Header from './Header/Header'
import FloatyBar from './FloatyBar/FloatyBar'
import MainLoader from '../../components/MainLoading/MainLoading'
import Notifications from '../../components/Notification/Notification'

import { ApplicationContextProvider } from '../../context/ApplicationContext'

interface LayoutMainProps {
  children: ReactNode
}

const LayoutMain: FunctionComponent<LayoutMainProps> = (props) => {
  const { children } = props

  return (
    <>
      <MainLoader />
      <ApplicationContextProvider>
        <NavigationLeftMenu />

        <Notifications />

        {/* CHAT WIDGET */}
        <Header />
        <FloatyBar />
        {children}
      </ApplicationContextProvider>
    </>
  )
}

export default LayoutMain
