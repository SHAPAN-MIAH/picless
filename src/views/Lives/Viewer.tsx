import ProviderProfileContextProvider from 'context/ProviderProfileContext'
import React, { FunctionComponent, useContext } from 'react'
import LiveViewer from './BroadcastViewer/LiveViewer'

const Viewer: FunctionComponent<{}> = () => {
  return (
    <>
      <ProviderProfileContextProvider>
        <div className="grid grid-8-4 mobile-prefer-content">
          <LiveViewer />
        </div>
      </ProviderProfileContextProvider>
    </>
  )
}

export default Viewer
