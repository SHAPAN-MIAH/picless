import React, { FunctionComponent, useEffect, ReactNode, useState } from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

import useUser from '../../hooks/useUser'

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

const ChildrenContainer = styled.div`
  ${isMobile ? '' : 'padding-top: 80px;'}
  ${isMobile ? '' : 'min-height: 100vh !important'};
`

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

        <Header />
        <FloatyBar />

        <ChildrenContainer>{children}</ChildrenContainer>

        <Footer />
      </ApplicationContextProvider>
    </>
  )
}

export default LayoutMain
