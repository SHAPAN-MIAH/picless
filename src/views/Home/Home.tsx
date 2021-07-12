import React, { FunctionComponent } from 'react'
import { PostsContextProvider } from '../../context/PostsReducerContext'

import Posts from './Posts'
import HomeRoutes from './SectionTabs/HomeRoutes'

import './Home.css'
import LiveList from 'components/LiveList/LiveList'
import LivesContextProvider from 'context/LivesContext'

const Home: FunctionComponent<{}> = () => {
  return (
    <>
      <PostsContextProvider>
        <LivesContextProvider>
          <div className="content-grid" style={{ maxWidth: '800px' }}>
            <div className="grid grid-2-7-2 mobile-prefer-content">
              <div className="grid-column" />
              <div className="grid-column">
                <LiveList />

                <Posts />
              </div>
              <div className="grid-column"> </div>
            </div>
          </div>
        </LivesContextProvider>
      </PostsContextProvider>
    </>
  )
}

export default Home
