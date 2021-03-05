import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'

import Post from '../../../Home/Post/Post'

import { PostType } from '../../../../types/PostType.d'
import { simpleKeyGenerator } from '../../../../utils/Functions'
import useProfile from '../../../../hooks/useProfile'

const Newsfeed: FunctionComponent<{}> = () => {
  const { provider, getPosts } = useProfile({ disableMount: true })

  const [posts, setPosts] = useState<PostType[]>()

  useEffect(() => {
    if (provider) {
      getPosts().then((pa: PostType[]) => setPosts(pa))
    }

    if (window.tpl) {
      window.tpl.load(['dropdown', 'user-avatar'])
    }
  }, [])

  return (
    <>
      <div>
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
      </div>
    </>
  )
}

export default Newsfeed
