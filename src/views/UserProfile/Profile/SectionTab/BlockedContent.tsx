import React, { FunctionComponent } from 'react'

const BlockedContent: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="grid">
        <div className="grid-column">
          <div className="widget-box">
            <h3>Blocked content</h3>
            <p>To See this content you must be subscribed </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlockedContent
