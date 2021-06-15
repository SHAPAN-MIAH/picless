import EmptyPost from 'components/EmptyPost/EmptyPost'
import PostList from 'components/PostComponent/PostList/PostList'
import usePosts from 'hooks/usePosts'
import React, { FunctionComponent, Suspense, useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'

const LoaderDiv = (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const EndDiv = (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
    <h3>End of Line</h3>
  </div>
)

const notPostsMessage = 'you have not saved any content yet'
const notPostsFooterMessage = 'when you save some content, it will appear here'

const SavedTab: FunctionComponent<{}> = () => {
  const { getSavedPosts, cleanPost, posts, hasMore, loading } = usePosts()

  useEffect(() => {
    getSavedPosts()

    return () => cleanPost()
  }, [])

  return (
    <>
      {!loading && posts.length === 0 && <EmptyPost message={notPostsMessage} footer={notPostsFooterMessage} />}
      <PostList getItems={getSavedPosts} hasMore={hasMore} loading={loading} posts={posts} />
    </>
  )
}

export default SavedTab
