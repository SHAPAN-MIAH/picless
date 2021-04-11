import EmptyPost from 'components/EmptyPost/EmptyPost'
import React, { FunctionComponent, Suspense, useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import usePost from '../../../hooks/usePost'
import { simpleKeyGenerator } from '../../../utils/Functions'

import Post from '../Post/Post'

const LoaderDiv = (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)
const notPostsMessage = 'you have not bought any content yet'
const notPostsFooterMessage = 'when you buy some content, it will appear here'

const NewsfeedTab: FunctionComponent<{}> = () => {
  const [page, setPage] = useState<number>(0)

  const { getPosts, posts } = usePost()

  const getPostList = useCallback(() => {
    getPosts(page).then(() => {
      setPage(page + 1)
    })
  }, [getPosts, setPage, page])

  useEffect(() => {
    getPostList()
  }, [])

  return (
    <>
      <Suspense fallback="">
        {posts.length > 0 && (
          <InfiniteScroll dataLength={posts.length} next={getPostList} hasMore loader={LoaderDiv}>
            {posts.length === 0 && <EmptyPost message={notPostsMessage} footer={notPostsFooterMessage} />}
            {posts.map((item) => {
              return <Post key={simpleKeyGenerator(5)} data={item} />
            })}
          </InfiniteScroll>
        )}
      </Suspense>
    </>
  )
}

export default NewsfeedTab
