import React, { FunctionComponent, useState } from 'react'
import Revenue from './Charts/Revenue';
import DailyIncome from './Charts/DailyIncome';

import './metrics.css';

const Metrics: FunctionComponent<{}> = () => {

  return (
    <>
      <div className="content-grid">
        <DailyIncome/>
      </div>
    </>
  )
}

export default Metrics
