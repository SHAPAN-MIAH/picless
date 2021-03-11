import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const DivContainer = styled.div`
  width: 100%;
  height: 440px;
`

const DivMain = styled.div`
  background-color: #565656;
  height: 370px;
  margin: 15px 15px 0 15px;
  padding: 15px;
  border-radius: 8px 8px 0 0;
`

const DivFooter = styled.div`
  height: 80px;
  background-color: #fcfcfd;
  border-radius: 0 0 8px 8px;
  margin: 0 15px 15px 15px;
  padding: 25px 30px 25px 30px;
`

const LivePromotion: FunctionComponent<{}> = () => {
  return (
    <>
      <DivContainer>
        <DivMain>ad</DivMain>
        <DivFooter>
          <h5>I'm playing Athenas Goddess Story...</h5>
          <p>@goddess</p>
        </DivFooter>
      </DivContainer>
    </>
  )
}

export default LivePromotion
