import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { SourceType } from '../../types/PostType.d'

const ImageImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  const contentStyle = { width: '75%', height: '75%' }
  return (
    <>
      <Popup modal {...contentStyle} trigger={<img loading="lazy" decoding="async" src={image?.resized} alt={image.name} />}>
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
              <a href={image?.resized} target="_blank" rel="noopener noreferrer">
                Open Original
              </a>
            </>
          )
        }}
      </Popup>
    </>
  )
}
export default ImageWithPopupView
