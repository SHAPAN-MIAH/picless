import React, { FunctionComponent } from 'react'
import PieCharts from './PieCharts'
import Barcharts from './BarCharts'

const FollowersSummary: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="widget-box" style={{ margin: '10px 0 5px 0' }}>
        <h4 className="section-title">Followers summary</h4>
        <div className="grid grid-3-9 change-on-desktop centered">
          <PieCharts />
          <Barcharts />
        </div>
      </div>
    </>
  )
}

export default FollowersSummary
