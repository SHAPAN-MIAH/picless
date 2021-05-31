import EmptyPost from 'components/EmptyPost/EmptyPost'
import PostList from 'components/PostComponent/PostList/PostList'
import React, { FunctionComponent, Suspense, useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import usePosts from '../../../hooks/usePosts'

const notPostsMessage = 'you have not bought any content yet'
const notPostsFooterMessage = 'when you buy some content, it will appear here'

const NewsfeedTab: FunctionComponent<{}> = () => {
  const { getPosts, cleanPost, posts, hasMore, loading } = usePosts()

  useEffect(() => {
    getPosts()

    return () => cleanPost()
  }, [])

  return (
    <>
      {!loading && posts.length === 0 && <EmptyPost message={notPostsMessage} footer={notPostsFooterMessage} />}

      <PostList getItems={getPosts} hasMore={hasMore} loading={loading} posts={posts} />
    </>
  )
}

export default NewsfeedTab
