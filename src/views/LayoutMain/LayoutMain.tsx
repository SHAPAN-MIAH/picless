import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import MainLoader from '../../components/MainLoading/MainLoading'
import Notifications from '../../components/Notification/Notification'
import { ApplicationContextProvider } from '../../context/ApplicationContext'
import useUser from '../../hooks/useUser'
import FloatyBar from './FloatyBar/FloatyBar'
import Header from './Header/Header'
import NavigationLeftMenu from './NavLeftMenu/NavigationLeftMenu'

interface LayoutMainProps {
  children: ReactNode
}

const ChildrenContainer = styled.div`
  ${isMobile ? '' : 'padding-top: 100px;'}
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
          window.tpl.load(['sidebar', 'header-dropdown'])
        }
      })
    })
  }, [])

  return (
    <>
      <ApplicationContextProvider>
        {showLoading && <MainLoader show />}
        {!showLoading && (
          <>
            <NavigationLeftMenu />

            <Notifications />
            {!isMobile && <Header />}
            <FloatyBar />

            <ChildrenContainer>{children}</ChildrenContainer>
          </>
        )}
      </ApplicationContextProvider>
    </>
  )
}

export default LayoutMain
