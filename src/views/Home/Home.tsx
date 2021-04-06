import React, { FunctionComponent, useState } from 'react'
import { PostContextProvider } from '../../context/PostContext'
import CreatePost, { TabNamesType } from './CreatePost/CreatePost'
import Posts from './Posts'

const Home: FunctionComponent<{}> = () => {
  const [showPosts, setShowPosts] = useState<boolean>(true)

  const selectedTab = (tabName: TabNamesType) => {
    if (tabName === 'LIVE') setShowPosts(false)
    else setShowPosts(true)
  }

  return (
    <>
      <PostContextProvider>
        <div className="content-grid" style={{ maxWidth: '800px' }}>
          <div className="grid grid-2-7-2 mobile-prefer-content">
            <div className="grid-column" />
            <div className="grid-column">
              <CreatePost selectedTab={selectedTab} />

              <Posts showPosts={showPosts} />
            </div>
            <div className="grid-column"> </div>
          </div>
        </div>
      </PostContextProvider>
    </>
  )
}

export default Home
