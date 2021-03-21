import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import Alert from '../../../../components/Common/Alerts/Alerts'
import useProfile from '../../../../hooks/useProfile'
import { simpleKeyGenerator } from '../../../../utils/Functions'
import Post from '../../../Home/Post/Post'

const LoaderDiv = (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const NewsfeedTab: FunctionComponent<{}> = () => {
  const { provider, posts, getPosts } = useProfile({ disableMount: true })
  const [loading, setLoading] = useState<boolean>()
  const [page, setPage] = useState<number>(0)

  const getPostList = useCallback(() => {
    getPosts(page).then(() => {
      setLoading(false)
      setPage(page + 1)
    })
  }, [getPosts, setPage])

  useEffect(() => {
    setLoading(true)
    if (provider && posts && posts.length === 0) {
      getPostList()
      if (window.tpl) {
        window.tpl.load(['dropdown'])
      }
    } else setLoading(false)
  }, [getPostList])

  if (loading) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
          <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        {posts.length === 0 && (
          <Alert alertType="PRIMARY" message="Nothing to show" style={{ width: '100%', textAlign: 'center' }} />
        )}

        <InfiniteScroll dataLength={posts.length} next={getPostList} hasMore loader={LoaderDiv}>
          {posts.map((item) => {
            return (
              <div key={simpleKeyGenerator(5)}>
                <Post data={item} />
              </div>
            )
          })}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default NewsfeedTab
