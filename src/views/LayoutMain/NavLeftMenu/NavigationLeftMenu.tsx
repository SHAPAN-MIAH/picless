import React, { FunctionComponent } from 'react'
import { isMobile } from 'react-device-detect'

import BrowserMenu from './BrowserMenu/BrowserMenu'
import MobileMenu from './MobileMenu/MobileMenu'

const NavigationLeftMenu: FunctionComponent<{}> = () => {
  return (
    <>
      {/* DESKTOP MENU */}
      {!isMobile && <BrowserMenu />}

      {/* MOBILE MENU */}
      {isMobile && <MobileMenu />}
    </>
  )
}

export default NavigationLeftMenu
