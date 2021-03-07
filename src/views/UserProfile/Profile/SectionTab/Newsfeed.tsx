import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import useProfile from '../../../../hooks/useProfile'
import { simpleKeyGenerator } from '../../../../utils/Functions'
import Post from '../../../Home/Post/Post'

const Newsfeed: FunctionComponent<{}> = () => {
  const { provider, posts, getPosts } = useProfile({ disableMount: true })

  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    setLoading(true)
    if (provider && posts && posts.length === 0) {
      getPosts().then(() => {
        setLoading(false)

        if (window.tpl) {
          window.tpl.load(['dropdown', 'user-avatar'])
        }
      })
    } else setLoading(false)
  }, [])

  return (
    <>
      <div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
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
      </div>
    </>
  )
}

export default Newsfeed
