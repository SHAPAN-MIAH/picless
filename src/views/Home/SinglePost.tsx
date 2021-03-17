import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'

const DivContainer = styled.div`
  width: 100%;
  height: 560px;
`

const LivePromotion: FunctionComponent<{}> = () => {
  useEffect(() => {
    alert('asdfd')
  }, [])

  return (
    <>
      <DivContainer>
        <h1>adsa</h1>
      </DivContainer>
    </>
  )
}

export default LivePromotion
