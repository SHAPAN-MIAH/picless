import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import _ from 'lodash'

import PostService from '../../services/PostService'

import CreatePost, { TabNamesType } from './CreatePost/CreatePost'
import Post from './Post/Post'

import { simpleKeyGenerator } from '../../utils/Functions'

import { ServicePostType, PostType } from '../../types/PostType.d'

const Home: FunctionComponent<{}> = () => {
  const [posts, setPosts] = useState<PostType[]>()
  const [showPost, setShowPosts] = useState<boolean>(true)

  useEffect(() => {
    PostService.getPosts().then((info: ServicePostType) => {
      setPosts(_.reverse(info.posts))

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
      <div className="content-grid" style={{ maxWidth: '800px' }}>
        <div className="grid grid-2-7-2 mobile-prefer-content">
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
    </>
  )
}

export default Home
