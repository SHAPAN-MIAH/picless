import ButtonWithLoader from 'components/Common/ButtonWithLoader'
import StyledPopup from 'components/StyledPopup/StyledPopup'
import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { PostType } from 'types/PostType'

const ContainerBlockedContentDiv = styled.div`
  margin: 25px 25% 15px 25%;
`

const BlockedSection: FunctionComponent<{ post: PostType }> = (props) => {
  const { post } = props

  const [loading, setLoading] = useState(false)

  const showUnblockContent = () => {}
  return (
    <>
      <ContainerBlockedContentDiv>
        <StyledPopup
          header="Unblock content"
          size="S"
          trigger={
            <ButtonWithLoader type="button" className="small primary" showLoader={false}>
              Unblock Content for $ {post.amount}
            </ButtonWithLoader>
          }
        >
          <ButtonWithLoader type="button" className="small primary" showLoader={loading}>
            Pay $ {post.amount}
          </ButtonWithLoader>
        </StyledPopup>
      </ContainerBlockedContentDiv>
    </>
  )
}

export default React.memo(BlockedSection)
