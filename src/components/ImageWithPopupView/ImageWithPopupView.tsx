import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { SourceType } from '../../types/PostType.d'

const StyledPopup = styled(Popup)`
  &-content {
    width: auto;
    background-color: rgba(0, 0, 0, 0);
    padding: 0px;
    border: 0px;
  }
`

const ImageImg = styled.img`
  max-width: 78vh;
  max-height: 78vh;
`

const CloseButtonDiv = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  background-color: #615dfa;
  margin-left: calc(100% - 30px);
  top: 0;
  margin-top: -10px;
  border-radius: 5px;
  text-align: center;
  padding-top: 5px;
  cursor: pointer;
`

const ImageWithPopupView: FunctionComponent<{ image: SourceType }> = (props) => {
  const { image } = props

  return (
    <>
      <StyledPopup modal trigger={<img loading="lazy" decoding="async" src={image?.resized} alt={image.name} />}>
        {(close: any) => {
          return (
            <>
              <CloseButtonDiv
                onClick={() => {
                  close()
                }}
              >
                <FontAwesomeIcon icon="times" color="white" size="1x" />
              </CloseButtonDiv>
              <ImageImg loading="lazy" decoding="async" src={image?.resized} alt={image.name} />
            </>
          )
        }}
      </StyledPopup>
    </>
  )
}
export default ImageWithPopupView