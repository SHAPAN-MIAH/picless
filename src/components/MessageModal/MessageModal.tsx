import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import ButtonWithLoader from '../Common/ButtonWithLoader'
import StyledPopup from '../StyledPopup/StyledPopup'

const ContainerMessage = styled.div`
  padding: 0 10px 10px 10px;
`

const MessageH6 = styled.h6`
  text-align: center;
  padding-top: 5px;
  padding-bottom: 20px;
`

type MessageModalProps = {
  message: string
  onClose: (ok?: boolean) => void // The ok parameter is used to know if the user click the button
  buttonText?: string
}

const MessageModal: FunctionComponent<MessageModalProps> = (props) => {
  const { message, onClose, buttonText = 'OK' } = props

  const onCloseHandler = () => {
    onClose(true)
  }

  return (
    <>
      <StyledPopup show onClose={onClose} header="Message" trigger={undefined}>
        <ContainerMessage>
          <MessageH6>{message}</MessageH6>

          <ButtonWithLoader type="submit" className="small secondary" onClick={onCloseHandler} showLoader={false}>
            {buttonText}
          </ButtonWithLoader>
        </ContainerMessage>
      </StyledPopup>
    </>
  )
}

export default MessageModal
