import EmptyPost from 'components/EmptyPost/EmptyPost'
import PostList from 'components/PostComponent/PostList/PostList'
import usePosts from 'hooks/usePosts'
import React, { FunctionComponent, useEffect } from 'react'

const notPostsMessage = 'you have not bought any content yet'
const notPostsFooterMessage = 'when you buy some content, it will appear here'

const PurchasedTab: FunctionComponent<{}> = () => {
  const { getPurchasedPosts, cleanPost, posts, hasMore, loading } = usePosts()

  useEffect(() => {
    getPurchasedPosts()

    return () => cleanPost()
  }, [])

  return (
    <>
      {!loading && posts.length === 0 && <EmptyPost message={notPostsMessage} footer={notPostsFooterMessage} />}
      <PostList getItems={getPurchasedPosts} hasMore={hasMore} loading={loading} posts={posts} />
    </>
  )
}

export default PurchasedTab
