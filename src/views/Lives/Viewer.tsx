import ProviderProfileContextProvider from 'context/ProviderProfileContext'
import React, { FunctionComponent, useContext } from 'react'
import LiveViewer from './BroadcastViewer/LiveViewer'

const Viewer: FunctionComponent<{}> = () => {
  return (
    <>
      <ProviderProfileContextProvider>
        <div className="grid grid-9-3 mobile-prefer-content liveView">
          <LiveViewer />
        </div>
      </ProviderProfileContextProvider>
    </>
  )
}

export default Viewer
