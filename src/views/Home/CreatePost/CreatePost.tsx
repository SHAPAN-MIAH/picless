import classNames from 'classnames'
import useUser from 'hooks/useUser'
import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import CreateLive from './Live/CreateLive'
import CreateStatus from './Status/CreateStatus'

export type TabNamesType = 'STATUS' | 'LIVE' | 'POLL'

const BlockedDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 310px;
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: #212529;
  opacity: 0.5;
  border-radius: 14px;
  margin-top: -326px;
`

const CreatePost: FunctionComponent<{ selectedTab: (tabName: TabNamesType) => void }> = (props) => {
  const { selectedTab } = props
  const [currentTab, setCurrentTab] = useState<TabNamesType>('STATUS')
  const [blocked, setBlocked] = useState<boolean>(true)

  const { getUser } = useUser()

  const changeTab = (tabName: TabNamesType) => {
    setCurrentTab(tabName)
    selectedTab(tabName)
  }

  useEffect(() => {
    getUser().then((user) => {
      setBlocked(user?.verifiedAccount || true)
    })
  }, [])

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

      {blocked && (
        <BlockedDiv>
          <h3 style={{ color: 'whitesmoke', marginTop: '145px' }}>Need verify account</h3>
        </BlockedDiv>
      )}
    </>
  )
}

export default CreatePost
