import ButtonWithLoader from 'components/Common/ButtonWithLoader'
import FormRowItem from 'components/Common/Form/FormRowItem'
import TextInput from 'components/Common/TextInput'
import StyledPopup from 'components/StyledPopup/StyledPopup'
import usePosts from 'hooks/usePosts'
import useUser from 'hooks/useUser'
import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { PostType } from 'types/PostType'

const ContainerLockedContentDiv = styled.div`
  margin: 25px 25% 15px 25%;
`

const ResumeContainerDiv = styled.div`
  text-align: right;
  margin-right: 10px;
  margin-bottom: 15px;
`

type LockedProps = { post: PostType }

const Locked: FunctionComponent<LockedProps> = (props) => {
  const { post } = props

  const [loading, setLoading] = useState<boolean>(false)

  const { unlockPost } = usePosts()
  const { user } = useUser()

  const payForContentLocked = () => {
    setLoading(true)
    unlockPost(post.id).then((data) => {
      if (data.action === 'redirect' && data.redirect) {
        window.location.href = data.redirect
      }
    })
  }

  const tax = user.countryTax && user.countryTax > 0 ? user.countryTax + 1 : 0
  const total = (post.amount || 0) * tax
  const taxCalculated = total === 0 ? 0 : total - (post.amount || 0)

  return (
    <>
      <ContainerLockedContentDiv>
        <StyledPopup
          header="Purchase"
          size="S"
          trigger={
            <ButtonWithLoader type="button" className="small primary" showLoader={false}>
              Unlock Content for $ {(post.amount || 0).toFixed(2)} + tax({taxCalculated.toFixed(2)})
            </ButtonWithLoader>
          }
        >
          <FormRowItem>
            <TextInput
              type="text"
              name="username"
              value={`${(post.amount || 0).toFixed(2)}  EUR`}
              readOnly
              style={{ textAlign: 'right' }}
            />
          </FormRowItem>
          <FormRowItem>
            <ResumeContainerDiv>
              <p>
                <strong>Tax: </strong> {taxCalculated.toFixed(2)} EUR
              </p>
              <p>
                <strong>Total: </strong> {total.toFixed(2)} EUR
              </p>
            </ResumeContainerDiv>
          </FormRowItem>

          <ButtonWithLoader type="button" className="small primary" onClick={payForContentLocked} showLoader={loading}>
            Pay $ {total.toFixed(2)}
          </ButtonWithLoader>
        </StyledPopup>
      </ContainerLockedContentDiv>
    </>
  )
}

export default React.memo(Locked)
