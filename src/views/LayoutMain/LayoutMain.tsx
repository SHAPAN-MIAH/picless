import React, { FunctionComponent, ReactNode } from 'react'
import NavigationLeftMenu from './NavLeftMenu/NavigationLeftMenu'

import Header from './Header/Header'
import FloatyBar from './FloatyBar/FloatyBar'

interface LayoutMainProps {
  children: ReactNode
}

const LayoutMain: FunctionComponent<LayoutMainProps> = (props) => {
  const { children } = props
  return (
    <>
      <NavigationLeftMenu />

      {/* CHAT WIDGET */}

      <Header />

      <FloatyBar />

      {children}
    </>
  )
}

export default LayoutMain
