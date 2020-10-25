import React, { FunctionComponent } from 'react'

import LayoutMain from '../LayoutMain/LayoutMain'
import CreatePost from './CreatePost/CreatePost'

const Home: FunctionComponent<{}> = () => {
  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid">
            <div className="grid-column">
              <CreatePost />
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}

export default Home
