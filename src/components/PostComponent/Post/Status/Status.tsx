import React, { FunctionComponent } from 'react'

type MenuProps = {}

const Menu: FunctionComponent<MenuProps> = (props) => {
  const {} = props

  return <></>
}

const arePropsEqual = (prev: any, next: any) => {
  return true
}

export default React.memo(Menu, arePropsEqual)
