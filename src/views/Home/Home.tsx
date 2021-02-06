import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import _ from 'lodash'

import PostService from '../../services/PostService'

import LayoutMain from '../LayoutMain/LayoutMain'
import CreatePost, { TabNamesType } from './CreatePost/CreatePost'

import { PostType } from '../../types/PostType.d'
import { simpleKeyGenerator } from '../../utils/Functions'
import Post from './Post/Post'

const Home: FunctionComponent<{}> = () => {
  const [posts, setPosts] = useState<PostType[]>()
  const [showPost, setShowPosts] = useState<boolean>(true)
  const [showLiveChat, setShowLiveChat] = useState<boolean>(true)

  useEffect(() => {
    PostService.getPosts().then((data: PostType[]) => {
      setPosts(_.reverse(data))

      if (window.tpl) {
        window.tpl.load(['user-avatar'])
      }
    })
  }, [])

  const selectedTab = (tabName: TabNamesType) => {
    if (tabName === 'LIVE') setShowPosts(false)
    else setShowPosts(true)
  }

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid grid-3-6-3 mobile-prefer-content">
            <div className="grid-column">{'  '}</div>
            <div className="grid-column">
              <CreatePost selectedTab={selectedTab} />
              {showPost && (
                <>
                  {!posts ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
                    </div>
                  ) : (
                    posts.map((item) => {
                      return (
                        <div key={simpleKeyGenerator(5)}>
                          <Post data={item} />
                        </div>
                      )
                    })
                  )}
                </>
              )}
            </div>
            <div className="grid-column"> </div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}

export default Home
