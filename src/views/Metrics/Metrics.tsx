import React, { FunctionComponent, useState } from 'react'
import Revenue from './Charts/Revenue'
import DailyIncome from './Charts/DailyIncome'
import ContentAndInteractios from './Charts/ContentAndInteractions'
import PostTable from './Charts/PostTable'
import FollowersSummary from './Charts/FollowersSummary'
import FollowersTable from './Charts/FollowersTable'

import './metrics.css'

const Metrics: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="content-grid">
        <Revenue />
        <DailyIncome />
        <ContentAndInteractios />
        <PostTable />
        <FollowersSummary />
        <FollowersTable />
      </div>
    </>
  )
}

export default Metrics
