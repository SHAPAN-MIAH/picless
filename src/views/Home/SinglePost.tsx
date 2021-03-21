import Alert from 'components/Common/Alerts/Alerts'
import _ from 'lodash'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PostService from '../../services/PostService'
import { PostType, ServiceSinglePostType } from '../../types/PostType.d'
import Post from './Post/Post'

const DivContainer = styled.div`
  width: 100%;
  height: 560px;
`

const noPost = 'Nothing to show'

const SinglePost: FunctionComponent<{}> = () => {
  const { id } = useParams<{ username?: string; id?: string }>()
  const [singlePost, setSinglePost] = useState<PostType>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    PostService.getPostById(_.toInteger(id))
      .then((data: ServiceSinglePostType) => {
        if (data.post) setSinglePost(data.post)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [setSinglePost])

  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px' }}>
        <div className="grid grid-2-7-2 mobile-prefer-content">
          <div className="grid-column">{'  '}</div>
          <div className="grid-column" />
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
              <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
            </div>
          )}

          {!singlePost && !loading && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
              <Alert alertType="PRIMARY" message={noPost} style={{ width: '100%', textAlign: 'center' }} />
            </div>
          )}

          {singlePost && !loading && (
            <DivContainer>
              <Post data={singlePost} />
            </DivContainer>
          )}
        </div>
      </div>
    </>
  )
}

export default SinglePost
