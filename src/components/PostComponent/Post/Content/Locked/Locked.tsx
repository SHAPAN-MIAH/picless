import ButtonWithLoader from 'components/Common/ButtonWithLoader'
import FormRowItem from 'components/Common/Form/FormRowItem'
import TextInput from 'components/Common/TextInput'
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
  console.log(post)
  return (
    <>
      <ContainerLockedContentDiv>
        <StyledPopup
          header="Purchase"
          size="S"
          trigger={
            <ButtonWithLoader type="button" className="small primary" showLoader={false}>
              Unlock Content for $ {post.amount}
            </ButtonWithLoader>
          }
        >
          <FormRowItem>
            <TextInput type="text" name="username" defaultValue="" placeholder={'dfsd'} />
          </FormRowItem>
          <FormRowItem>
            {/* <div className={styles.resumeContainer}>
              <p>
                <strong>Tax: </strong> {0 * tax} {selectedPlan?.currency.toLocaleUpperCase()}
              </p>
              <p>
                <strong>Total: </strong> {((selectedPlan?.amount || 0) * (tax + 1)).toFixed(2)}{' '}
                {selectedPlan?.currency.toLocaleUpperCase()}
              </p>
            </div> */}
          </FormRowItem>

          <ButtonWithLoader type="button" className="small primary" onClick={payForContentLocked} showLoader={false}>
            Pay $ {post.amount}
          </ButtonWithLoader>
        </StyledPopup>
      </ContainerLockedContentDiv>
    </>
  )
}

export default React.memo(Locked)
