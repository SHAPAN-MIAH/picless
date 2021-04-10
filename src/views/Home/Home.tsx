import { runInContext } from 'lodash'
import React, { FunctionComponent, useState } from 'react'
import { PostContextProvider } from '../../context/PostContext'
import CreatePost, { TabNamesType } from '../CreatePost/CreatePost'
import Posts from './Posts'

const Home: FunctionComponent<{}> = () => {
  return (
    <>
      <PostContextProvider>
        <div className="content-grid" style={{ maxWidth: '800px' }}>
          <div className="grid grid-2-7-2 mobile-prefer-content">
            <div className="grid-column" />
            <div className="grid-column">
              <Posts />
            </div>
            <div className="grid-column"> </div>
          </div>
        </div>
      </PostContextProvider>
    </>
  )
}

export default Home
