import React, { FunctionComponent } from 'react'
import NavigationLeftMenu from './NavLeftMenu/NavigationLeftMenu'
import Header from './Header/Header'

const LayoutMain: FunctionComponent<{}> = () => {
  return (
    <div>
      <NavigationLeftMenu />

      {/* CHAT WIDGET */}
      <Header />
    </div>
  )
}

export default LayoutMain
