import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const ContainerDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NoUserSelected: FunctionComponent<{}> = () => {
  return (
    <>
      <ContainerDiv>Select an user to start a conversation</ContainerDiv>
    </>
  )
}

export default NoUserSelected
