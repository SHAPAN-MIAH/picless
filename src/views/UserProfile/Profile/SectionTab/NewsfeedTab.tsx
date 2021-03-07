import Alert from 'components/Common/Alerts/Alerts'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import useProfile from '../../../../hooks/useProfile'
import { simpleKeyGenerator } from '../../../../utils/Functions'
import Post from '../../../Home/Post/Post'

const NewsfeedTab: FunctionComponent<{}> = () => {
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
        {posts.length === 0 && <Alert alertType="PRIMARY" message="Nothing to show" style={{ width: '100%' }} />}
        {posts.map((item) => {
          return (
            <div key={simpleKeyGenerator(5)}>
              <Post data={item} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default NewsfeedTab
