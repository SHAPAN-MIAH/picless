import React, { FunctionComponent, Suspense } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import { PostType } from 'types/PostType'
import Post from '../Post/Post'

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

type PostListProps = {
  loading: boolean
  posts: PostType[]
  hasMore: boolean
  getItems: () => {}
}

const PostList: FunctionComponent<PostListProps> = (props) => {
  const { loading, posts, hasMore, getItems } = props

  return (
    <>
      {loading && LoaderDiv}
      <Suspense fallback="">
        {posts.length > 0 && (
          <InfiniteScroll
            style={{ overflow: 'hidden' }}
            dataLength={posts.length}
            next={getItems}
            hasMore={hasMore}
            endMessage={EndDiv}
            loader={LoaderDiv}
          >
            {posts.map((item) => {
              return <Post key={item.id} data={item} />
            })}
          </InfiniteScroll>
        )}
      </Suspense>
    </>
  )
}

export default React.memo(PostList)
