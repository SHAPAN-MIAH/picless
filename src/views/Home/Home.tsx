import React, { FunctionComponent, useEffect, useState } from 'react'
import _ from 'lodash'

import PostService from '../../services/PostService'

import LayoutMain from '../LayoutMain/LayoutMain'
import CreatePost from './CreatePost/CreatePost'

import { PostType } from '../../types/PostType.d'
import { simpleKeyGenerator } from '../../utils/Functions'
import Post from './Post/Post'
import Loader from 'react-loader-spinner'

const Home: FunctionComponent<{}> = () => {
  const [posts, setPosts] = useState<PostType[]>()
  useEffect(() => {
    PostService.getPosts().then((data: PostType[]) => {
      setPosts(_.reverse(data))
    })
  }, [])

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid grid-3-6-3 mobile-prefer-content">
            <div className="grid-column">{'  '}</div>
            <div className="grid-column">
              <CreatePost />

              {!posts ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Loader type="TailSpin" color="#615dfa" height={80} width={80} visible />
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
            </div>
            <div className="grid-column">{'  '}</div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}

export default Home
