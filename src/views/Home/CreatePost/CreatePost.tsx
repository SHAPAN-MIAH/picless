import classNames from 'classnames'
import React, { FunctionComponent, useState } from 'react'
import CreateLive from './Live/CreateLive'
import CreateStatus from './Status/CreateStatus'

export type TabNamesType = 'STATUS' | 'LIVE' | 'POLL'

const CreatePost: FunctionComponent<{ selectedTab: (tabName: TabNamesType) => void }> = (props) => {
  const { selectedTab } = props
  const [currentTab, setCurrentTab] = useState<TabNamesType>('STATUS')

  const changeTab = (tabName: TabNamesType) => {
    setCurrentTab(tabName)
    selectedTab(tabName)
  }

  return (
    <>
      <div className="quick-post">
        <div className="quick-post-header">
          <div className="option-items" style={{ justifyContent: 'center' }}>
            <div
              className={classNames('option-item', currentTab === 'STATUS' ? 'active' : '')}
              onClick={() => {
                changeTab('STATUS')
              }}
            >
              <svg className="option-item-icon icon-status">
                <use xlinkHref="#svg-status"> </use>
              </svg>

              <p className="option-item-title">Status</p>
            </div>
            <div
              className={classNames('option-item', currentTab === 'LIVE' ? 'active' : '')}
              onClick={() => {
                changeTab('LIVE')
              }}
            >
              <svg className="option-item-icon icon-streams">
                <use xlinkHref="#svg-streams"> </use>
              </svg>

              <p className="option-item-title">Live</p>
            </div>
          </div>
        </div>
        {currentTab === 'STATUS' && <CreateStatus />}
        {currentTab === 'LIVE' && <CreateLive />}
        {currentTab === 'POLL' && <h1>POLL</h1>}
      </div>
    </>
  )
}

export default CreatePost
