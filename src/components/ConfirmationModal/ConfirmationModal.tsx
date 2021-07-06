import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import ButtonWithLoader from '../Common/ButtonWithLoader'
import StyledPopup from '../StyledPopup/StyledPopup'

const ContainerMessage = styled.div`
  padding: 0 10px 10px 10px;
`

const ContainerButtons = styled.div`
  display: flex;
`
const ContainerButton = styled.div`
  flex: 1;
  margin-left: 8px;
  margin-right: 8px;
`
const MessageH6 = styled.h6`
  text-align: center;
  padding-top: 5px;
  padding-bottom: 20px;
`

type ConfirmationModalProps = {
  message: string
  okHandler: () => void
  cancelHandler: () => void
  closeHandler: () => void
  buttonOkText?: string
  buttonCancelText?: string
}

const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = (props) => {
  const { message, okHandler, cancelHandler, closeHandler, buttonOkText = 'OK', buttonCancelText = 'Cancel' } = props

  const onCancelHandler = () => {
    cancelHandler()
    closeHandler()
  }

  const onOkHandler = () => {
    okHandler()
    closeHandler()
  }

  return (
    <>
      <StyledPopup show onClose={closeHandler} header="Message" trigger={undefined}>
        <ContainerMessage>
          <MessageH6>{message}</MessageH6>

          <ContainerButtons>
            <ContainerButton>
              <ButtonWithLoader type="button" className="small secondary" onClick={onCancelHandler} showLoader={false}>
                {buttonCancelText}
              </ButtonWithLoader>
            </ContainerButton>
            <ContainerButton>
              <ButtonWithLoader type="button" className="small primary" onClick={onOkHandler} showLoader={false}>
                {buttonOkText}
              </ButtonWithLoader>
            </ContainerButton>
          </ContainerButtons>
        </ContainerMessage>
      </StyledPopup>
    </>
  )
}

export default ConfirmationModal
