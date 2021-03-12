import _ from 'lodash'
import React, { FunctionComponent, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import PostService from '../../services/PostService'
import { PostType, ServicePostType } from '../../types/PostType.d'
import { simpleKeyGenerator } from '../../utils/Functions'
import CreatePost, { TabNamesType } from './CreatePost/CreatePost'
import Post from './Post/Post'

const LoaderDiv = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const Home: FunctionComponent<{}> = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [showPost, setShowPosts] = useState<boolean>(true)

  const [page, setPage] = useState<number>(0)

  const getPosts = () => {
    PostService.getPosts(page).then((info: ServicePostType) => {
      setPosts([...posts, ..._.reverse(info.posts)])

      setPage(page + 1)
      if (window.tpl) {
        window.tpl.load(['user-avatar'])
      }
    })
  }

  useEffect(() => {
    getPosts()
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
                <InfiniteScroll dataLength={posts.length} next={getPosts} hasMore loader={LoaderDiv}>
                  {posts.map((item) => {
                    return (
                      <div key={simpleKeyGenerator(5)}>
                        <Post data={item} />
                      </div>
                    )
                  })}
                </InfiniteScroll>
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
