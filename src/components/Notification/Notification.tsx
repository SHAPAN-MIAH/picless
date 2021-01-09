import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { Toaster } from 'react-hot-toast'

const Notifications = () => {
  return (
    <>
      <BrowserView>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              margin: '90px',
              background: '#3e3f5e',
              color: '#fff',
              zIndex: 1,
            },
            duration: 4000,
          }}
        />
      </BrowserView>

      <MobileView>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              margin: '73px',
              background: '#3e3f5e',
              color: '#fff',
              zIndex: 1,
            },
            duration: 4000,
          }}
        />
      </MobileView>
    </>
  )
}

export default Notifications
