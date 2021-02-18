import React, { FunctionComponent, useEffect, ReactNode, useState } from 'react'

import useUser from '../../hooks/useUser'
import useRouter from '../../hooks/useRouter'

import NavigationLeftMenu from './NavLeftMenu/NavigationLeftMenu'

import Header from './Header/Header'
import FloatyBar from './FloatyBar/FloatyBar'
import MainLoader from '../../components/MainLoading/MainLoading'
import Notifications from '../../components/Notification/Notification'

import { ApplicationContextProvider } from '../../context/ApplicationContext'
import Footer from './Footer/Footer'

interface LayoutMainProps {
  children: ReactNode
}

const LayoutMain: FunctionComponent<LayoutMainProps> = (props) => {
  const { children } = props

  const [showLoading, setShowLoading] = useState<boolean>(true)

  const { getUser, getSettings } = useUser()

  useEffect(() => {
    getUser().then(() => {
      getSettings().then(() => {
        setShowLoading(false)

        if (window.tpl) {
          window.tpl.load()

          dispatchEvent(new Event('load'))
        }
      })
    })
  }, [])

  return (
    <>
      <MainLoader show={showLoading} />
      <ApplicationContextProvider>
        <NavigationLeftMenu />

        <Notifications />

        {/* CHAT WIDGET */}
        <Header />
        <FloatyBar />
        {children}
        <Footer />
      </ApplicationContextProvider>
    </>
  )
}

export default LayoutMain
