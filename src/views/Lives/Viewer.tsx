import ProviderProfileContextProvider from 'context/ProviderProfileContext'
import React, { FunctionComponent, useContext } from 'react'
import LiveViewer from './BroadcastViewer/LiveViewer'

const Viewer: FunctionComponent<{}> = () => {
  return (
    <>
      <ProviderProfileContextProvider>
        <div className="grid mobile-prefer-content">
          <div className="liveView" style={{ margin: "auto", width: "60%" }}>
            <LiveViewer />
          </div>
        </div>
      </ProviderProfileContextProvider>
    </>
  )
}

export default Viewer
