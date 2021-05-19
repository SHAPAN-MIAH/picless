import React, { FunctionComponent, ReactNode } from 'react'
import Popup from 'reactjs-popup'

/* This component should be between the widget-box and widget-box-status */

interface ThreeDotsMenuProps {
  children: ReactNode
}

const ThreeDotsMenu: FunctionComponent<ThreeDotsMenuProps> = React.memo((props) => {
  const { children } = props

  return (
    <div className="widget-box-settings">
      <div className="post-settings-wrap">
        <Popup
          trigger={
            <div className="post-settings widget-box-post-settings-dropdown-trigger">
              <svg className="post-settings-icon icon-more-dots">
                <use xlinkHref="#svg-more-dots" />
              </svg>
            </div>
          }
          position="bottom left"
          on="click"
          closeOnDocumentClick={false}
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: '0px', border: 'none', width: '140px', borderRadius: '12px', marginLeft: '-100px' }}
          arrow={false}
        >
          {children}
        </Popup>
      </div>
    </div>
  )
})

export default ThreeDotsMenu
