import FormRow from 'components/Common/Form/FormRow'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { PostType } from 'types/PostType.d'
import { simpleKeyGenerator } from 'utils/Functions'
import PostService from '../../services/PostService'

import LayoutMain from '../LayoutMain/LayoutMain'
import CreatePost from './CreatePost/CreatePost'

const Home: FunctionComponent<{}> = () => {
  const [posts, setPosts] = useState<PostType[]>()
  useEffect(() => {
    PostService.getPosts().then((data: PostType[]) => {
      setPosts(data)
    })
  }, [])

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid">
            <div className="grid-column">
              <CreatePost />

              {posts &&
                posts.map((item) => {
                  return (
                    <div key={simpleKeyGenerator(5)}>
                      <FormRow>{item.content}</FormRow>
                      <FormRow>{JSON.stringify(item.hashTags)}</FormRow>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}

export default Home
