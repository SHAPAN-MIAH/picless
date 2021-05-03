import React, { FunctionComponent, useState } from 'react'

import Revenue from './Charts/Revenue';
import DailyIncome from './Charts/DailyIncome';


const Metrics: FunctionComponent<{}> = () => {

  return (
    <>
      <div className="content-grid">
        <Revenue/>
        <DailyIncome/>
      </div>
    </>
  )
}

export default Metrics
