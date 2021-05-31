import ButtonWithLoader from 'components/Common/ButtonWithLoader'
import StyledPopup from 'components/StyledPopup/StyledPopup'
import usePosts from 'hooks/usePosts'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { PostType } from 'types/PostType'

const ContainerLockedContentDiv = styled.div`
  margin: 25px 25% 15px 25%;
`
type LockedProps = { post: PostType }

const Locked: FunctionComponent<LockedProps> = (props) => {
  const { post } = props

  const { unlockPost } = usePosts()

  const payForContentLocked = () => {
    unlockPost(post.id).then((data) => {
      if (data.action === 'redirect' && data.redirect) {
        window.location.href = data.redirect
      }
    })
  }
  return (
    <>
      <ContainerLockedContentDiv>
        <StyledPopup
          header="Unblock content"
          size="S"
          trigger={
            <ButtonWithLoader type="button" className="small primary" showLoader={false}>
              Unlock Content for $ {post.amount}
            </ButtonWithLoader>
          }
        >
          <ButtonWithLoader type="button" className="small primary" onClick={payForContentLocked} showLoader={false}>
            Pay $ {post.amount}
          </ButtonWithLoader>
        </StyledPopup>
      </ContainerLockedContentDiv>
    </>
  )
}

export default React.memo(Locked)
