import React, { FunctionComponent } from 'react'

import HomeRoutes from './SectionTabs/HomeRoutes'

export enum HomeTabs {
  TIMELINE = 'timeline',
  SAVED = 'saved',
  PURCHASED = 'purchased',
}

const Posts: FunctionComponent<{}> = () => {
  return (
    <>
      <HomeRoutes />
    </>
  )
}

export default Posts
