import React, { FunctionComponent, ReactNode, useEffect } from 'react'
import NavigationLeftMenu from './NavLeftMenu/NavigationLeftMenu'

import Header from './Header/Header'
import FloatyBar from './FloatyBar/FloatyBar'
import MainLoader from '../../components/MainLoading/MainLoading'

interface LayoutMainProps {
  children: ReactNode
}

const LayoutMain: FunctionComponent<LayoutMainProps> = (props) => {
  const { children } = props

  return (
    <>
      <MainLoader />

      <NavigationLeftMenu />
      {/* CHAT WIDGET */}
      <Header />
      <FloatyBar />
      {children}
    </>
  )
}

export default LayoutMain
