import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import _ from 'lodash'

import PostService from '../../../../services/PostService'

import Post from '../../../Home/Post/Post'

import { PostType } from '../../../../types/PostType.d'
import { simpleKeyGenerator } from '../../../../utils/Functions'

const Newsfeed: FunctionComponent<{ posts: PostType[] }> = (props) => {
  const { posts } = props

  useEffect(() => {
    if (window.tpl) {
      window.tpl.load(['dropdown', 'user-avatar'])
    }
  }, [posts])

  return (
    <>
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
    </>
  )
}

export default Newsfeed
